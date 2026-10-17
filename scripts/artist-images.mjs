// Pictures for the artist profiles: a portrait and a few works per artist,
// from Wikimedia Commons, freely licensed, each with its credit. Runs in GitHub
// Actions (.github/workflows/artist-images.yml); it can also run locally from
// any machine that can reach Wikidata and Commons, after `npm ci`.
//
//   node scripts/artist-images.mjs
//
// 1. Asks Wikidata for each profiled artist's image (P18, a picture of the
//    person) and works they created (P170) that have an image.
// 2. Asks Commons for each file's licence and author; keeps public domain,
//    CC0, CC BY and CC BY-SA only (see acceptedLicense).
// 3. Downloads a 500px copy, stores it as WebP in public/images/artists/, and
//    writes data/images/images.json with the credits. Files no longer listed
//    are deleted.
//
// 4. Does the same, portraits only, at 120px, for the artists the lists show
//    without a profile: public/images/list/ and data/images/list-portraits.json.
//
// A picture that turns out wrong goes in data/images/exclude.txt (its Commons
// file name, or a Wikidata ID to skip a whole work or artist). An artist's
// image that shows a work rather than the person goes in
// data/images/as-works.json with the work's title, and is shown as that work
// on a profile, and not at all in the lists.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

import { ORIGINAL_ARTISTS, ROSTER } from '../src/content/roster.ts';
import {
    LIST_THUMB_WIDTH,
    MAX_WORKS,
    THUMB_WIDTH,
    collect,
    commonsFileName,
    creditOf,
    listedArtists,
    parseBindings,
    portraitQuery,
    qidOf,
    storedName,
    worksQuery,
} from './artist-images-lib.mjs';

const DATA = new URL('../data/images/', import.meta.url);
const PUBLIC = new URL('../public/images/artists/', import.meta.url);
const LIST = new URL('../public/images/list/', import.meta.url);
const HEADERS = { 'User-Agent': 'AfricanArtistsBot/1.0 (https://africanartists.com; profile images)' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, init = {}, tries = 5) {
    for (let attempt = 1; ; attempt++) {
        try {
            const res = await fetch(url, { ...init, headers: { ...HEADERS, ...init.headers }, signal: AbortSignal.timeout(90_000) });
            if (res.ok) return res;
            if (res.status !== 429 && res.status < 500) throw new Error(`${res.status} ${res.statusText} for ${url}`);
            if (attempt >= tries) throw new Error(`${res.status} after ${tries} tries for ${url}`);
            await sleep(Number(res.headers.get('retry-after')) * 1000 || 2000 * 2 ** attempt);
        } catch (err) {
            if (attempt >= tries || /^\d{3} /.test(err.message)) throw err;
            await sleep(2000 * 2 ** attempt);
        }
    }
}

const sparql = async (query) =>
    parseBindings(
        await (
            await get('https://query.wikidata.org/sparql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/sparql-results+json' },
                body: new URLSearchParams({ query }),
            })
        ).json()
    );

// Profiled artists, released or not, so a wave's pictures are ready when it is.
const artists = [
    ...Object.entries(ORIGINAL_ARTISTS).map(([slug, a]) => ({ slug, qid: a.qid })),
    ...ROSTER.map((r) => ({ slug: r.slug, qid: r.qid })),
];
const slugOf = new Map(artists.map((a) => [a.qid, a.slug]));
const exclude = new Set(
    (await readFile(new URL('exclude.txt', DATA), 'utf8').catch(() => ''))
        .split('\n')
        .map((l) => l.replace(/#.*/, '').trim().replace(/^File:/i, '').replace(/_/g, ' '))
        .filter(Boolean)
);

// 1. Wikidata.
const portraitRows = [];
const workRows = [];
const qids = artists.map((a) => a.qid).filter((q) => !exclude.has(q));
for (let i = 0; i < qids.length; i += 50) {
    const batch = qids.slice(i, i + 50);
    portraitRows.push(...(await sparql(portraitQuery(batch))));
    await sleep(1000);
    workRows.push(...(await sparql(worksQuery(batch))));
    await sleep(1000);
}
const found = collect(portraitRows, workRows);
const asWorks = JSON.parse(await readFile(new URL('as-works.json', DATA), 'utf8'));
for (const a of found.values()) {
    const title = a.portrait && asWorks[a.portrait];
    if (!title) continue;
    a.works = [{ qid: 'P18', file: a.portrait, year: null, title }, ...a.works.filter((w) => w.file !== a.portrait)].slice(0, MAX_WORKS);
    a.portrait = null;
}
console.log(`Wikidata: ${portraitRows.length} portrait rows, ${workRows.length} work rows for ${qids.length} artists`);

// 2. Commons: licence, author and a thumbnail URL, 50 files a request.
const files = new Set();
for (const a of found.values()) {
    if (a.portrait && !exclude.has(a.portrait)) files.add(a.portrait);
    for (const w of a.works) if (!exclude.has(w.file) && !exclude.has(w.qid)) files.add(w.file);
}
async function commonsInfo(names, width) {
    const info = new Map();
    for (let i = 0; i < names.length; i += 50) {
        const params = new URLSearchParams({
            action: 'query',
            format: 'json',
            formatversion: '2',
            prop: 'imageinfo',
            iiprop: 'url|size|mime|extmetadata',
            iiurlwidth: String(width),
            iiextmetadatafilter: 'Artist|LicenseShortName|LicenseUrl',
            titles: names.slice(i, i + 50).map((f) => `File:${f}`).join('|'),
        });
        const json = await (await get(`https://commons.wikimedia.org/w/api.php?${params}`)).json();
        const normalized = new Map((json.query?.normalized ?? []).map((n) => [n.to, n.from]));
        for (const page of json.query?.pages ?? []) {
            const asked = (normalized.get(page.title) ?? page.title).replace(/^File:/, '');
            info.set(asked, page.imageinfo?.[0] ?? null);
        }
        await sleep(500);
    }
    return info;
}
const info = await commonsInfo([...files], THUMB_WIDTH);

// 3. Download, convert and record.
await mkdir(PUBLIC, { recursive: true });
const skipped = [];
const kept = new Set();
async function download(credit, file, dir, path, name, width) {
    const source = Buffer.from(await (await get(credit.thumb)).arrayBuffer());
    const { data, info: out } = await sharp(source)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toBuffer({ resolveWithObject: true });
    await writeFile(new URL(name, dir), data);
    await sleep(300);
    return { src: `${path}${name}`, width: out.width, height: out.height, file, author: credit.author, license: credit.license, licenseUrl: credit.licenseUrl, page: credit.page };
}

async function store(file, slug, what) {
    const credit = creditOf(info.get(file));
    if (credit.error) {
        skipped.push(`${slug} ${what}: ${file} (${credit.error})`);
        return null;
    }
    const name = storedName(slug, what);
    kept.add(name);
    return download(credit, file, PUBLIC, '/images/artists/', name, THUMB_WIDTH);
}

const result = {};
for (const [qid, a] of found) {
    const slug = slugOf.get(qid);
    if (!slug) continue;
    const portrait = a.portrait && !exclude.has(a.portrait) ? await store(a.portrait, slug, 'portrait') : null;
    const works = [];
    for (const w of a.works) {
        if (exclude.has(w.file) || exclude.has(w.qid)) continue;
        const pic = await store(w.file, slug, w.qid);
        if (pic) works.push({ ...pic, qid: w.qid, title: w.title, year: w.year });
    }
    if (portrait || works.length > 0) result[qid] = { slug, portrait, works };
}

// Stored copies that are no longer listed go.
for (const name of await readdir(PUBLIC)) if (!kept.has(name)) await rm(new URL(name, PUBLIC));

const sorted = Object.fromEntries(Object.entries(result).sort(([, a], [, b]) => a.slug.localeCompare(b.slug)));
await writeFile(
    new URL('images.json', DATA),
    `${JSON.stringify({ source: 'Wikidata (P18, P170) and Wikimedia Commons', artists: sorted }, null, 1)}\n`
);
const portraits = Object.values(sorted).filter((a) => a.portrait).length;
const works = Object.values(sorted).reduce((n, a) => n + a.works.length, 0);
console.log(`Stored ${portraits} portraits and ${works} works for ${Object.keys(sorted).length} of ${artists.length} artists.`);

// 4. Small portraits for the artists the lists show without a profile.
const listExclude = (await readFile(new URL('../data/artists/exclude.txt', import.meta.url), 'utf8').catch(() => ''))
    .split('\n')
    .map((l) => l.replace(/#.*/, '').trim())
    .filter(Boolean);
const raw = JSON.parse(await readFile(new URL('../data/artists/artists.json', import.meta.url), 'utf8'));
const listed = listedArtists(raw, new Set([...listExclude, ...exclude]), new Set(slugOf.keys()));
const listFile = new Map();
for (let i = 0; i < listed.length; i += 50) {
    for (const r of await sparql(portraitQuery(listed.slice(i, i + 50).map((a) => a.qid)))) {
        const qid = qidOf(r.artist);
        const file = commonsFileName(r.image);
        // One picture per artist; never one that is excluded or known to show a work.
        if (!listFile.has(qid) && !exclude.has(file) && !asWorks[file]) listFile.set(qid, file);
    }
    await sleep(1000);
}
const listInfo = await commonsInfo([...new Set(listFile.values())], LIST_THUMB_WIDTH);
await mkdir(LIST, { recursive: true });
const listResult = {};
const listKept = new Set();
for (const [qid, file] of [...listFile].sort(([a], [b]) => a.localeCompare(b))) {
    const credit = creditOf(listInfo.get(file));
    if (credit.error) {
        skipped.push(`list ${qid}: ${file} (${credit.error})`);
        continue;
    }
    const name = `${qid.toLowerCase()}.webp`;
    listKept.add(name);
    listResult[qid] = await download(credit, file, LIST, '/images/list/', name, LIST_THUMB_WIDTH);
}
for (const name of await readdir(LIST)) if (!listKept.has(name) && name !== '.gitkeep') await rm(new URL(name, LIST));
await writeFile(
    new URL('list-portraits.json', DATA),
    `${JSON.stringify({ source: 'Wikidata (P18) and Wikimedia Commons', artists: listResult }, null, 1)}\n`
);
console.log(`Stored ${Object.keys(listResult).length} list portraits for ${listed.length} listed artists.`);
if (skipped.length) console.log(`Skipped ${skipped.length}:\n  ${skipped.join('\n  ')}`);
