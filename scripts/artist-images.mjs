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
// A picture that turns out wrong goes in data/images/exclude.txt (its Commons
// file name, or a Wikidata ID to skip a whole work or artist). An artist's
// image that shows a work rather than the person goes in
// data/images/as-works.json with the work's title, and is shown as that work.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

import { ORIGINAL_ARTISTS, ROSTER } from '../src/content/roster.ts';
import { MAX_WORKS, THUMB_WIDTH, collect, creditOf, parseBindings, portraitQuery, storedName, worksQuery } from './artist-images-lib.mjs';

const DATA = new URL('../data/images/', import.meta.url);
const PUBLIC = new URL('../public/images/artists/', import.meta.url);
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
const info = new Map();
const list = [...files];
for (let i = 0; i < list.length; i += 50) {
    const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        formatversion: '2',
        prop: 'imageinfo',
        iiprop: 'url|size|mime|extmetadata',
        iiurlwidth: String(THUMB_WIDTH),
        iiextmetadatafilter: 'Artist|LicenseShortName|LicenseUrl',
        titles: list.slice(i, i + 50).map((f) => `File:${f}`).join('|'),
    });
    const json = await (await get(`https://commons.wikimedia.org/w/api.php?${params}`)).json();
    const normalized = new Map((json.query?.normalized ?? []).map((n) => [n.to, n.from]));
    for (const page of json.query?.pages ?? []) {
        const asked = (normalized.get(page.title) ?? page.title).replace(/^File:/, '');
        info.set(asked, page.imageinfo?.[0] ?? null);
    }
    await sleep(500);
}

// 3. Download, convert and record.
await mkdir(PUBLIC, { recursive: true });
const skipped = [];
const kept = new Set();
async function store(file, slug, what) {
    const credit = creditOf(info.get(file));
    if (credit.error) {
        skipped.push(`${slug} ${what}: ${file} (${credit.error})`);
        return null;
    }
    const name = storedName(slug, what);
    const source = Buffer.from(await (await get(credit.thumb)).arrayBuffer());
    const { data, info: out } = await sharp(source)
        .rotate()
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toBuffer({ resolveWithObject: true });
    await writeFile(new URL(name, PUBLIC), data);
    kept.add(name);
    await sleep(300);
    return { src: `/images/artists/${name}`, width: out.width, height: out.height, file, author: credit.author, license: credit.license, licenseUrl: credit.licenseUrl, page: credit.page };
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
if (skipped.length) console.log(`Skipped ${skipped.length}:\n  ${skipped.join('\n  ')}`);
