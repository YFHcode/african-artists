// Photographs for guides and places (Dak'Art, Dakar, museums...), from
// Wikimedia Commons, freely licensed, each with its credit. Runs in GitHub
// Actions (.github/workflows/place-images.yml), or locally from any machine
// that can reach Wikipedia and Commons, after `npm ci`:
//
//   node scripts/place-images.mjs
//
// For each page in data/images/places-config.json:
// 1. Reads the file list of its Wikipedia articles, in order of appearance
//    (the lead picture first), and keeps names that could be photographs.
// 2. Asks Commons for each file's size, licence, author and description; keeps
//    public domain, CC0, CC BY and CC BY-SA (acceptedLicense), wide enough and
//    a grid-friendly shape (fitsGrid).
// 3. Stores an 800px WebP in public/images/places/ and writes
//    data/images/places.json with the credits. Pictures no longer listed are deleted.
//
// A picture that turns out wrong goes in the page's "exclude" in the config; a
// better one in "files". Captions in each language go in "captions".
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

import { acceptedLicense, creditOf, plainText } from './artist-images-lib.mjs';
import { DEFAULT_MAX, PLACE_WIDTH, fitsGrid, isCandidateName, normalizeFile, parsePageSpec, placeStoredName } from './place-images-lib.mjs';

const DATA = new URL('../data/images/', import.meta.url);
const PUBLIC = new URL('../public/images/places/', import.meta.url);
const HEADERS = { 'User-Agent': 'AfricanArtistsBot/1.0 (https://africanartists.com; place photographs)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, tries = 5) {
    for (let attempt = 1; ; attempt++) {
        try {
            const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(90_000) });
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

/** Files used on a Wikipedia article, in page order; [] when the article does not exist. */
async function articleFiles(spec) {
    const { lang, title } = parsePageSpec(spec);
    const params = new URLSearchParams({ action: 'parse', page: title, prop: 'images', redirects: '1', format: 'json', formatversion: '2' });
    try {
        const json = await (await get(`https://${lang}.wikipedia.org/w/api.php?${params}`)).json();
        if (json.error) {
            console.log(`  ${spec}: ${json.error.code}`);
            return [];
        }
        return (json.parse?.images ?? []).map(normalizeFile);
    } catch (err) {
        console.log(`  ${spec}: ${err.message}`);
        return [];
    }
}

async function commonsInfo(names) {
    const info = new Map();
    for (let i = 0; i < names.length; i += 50) {
        const params = new URLSearchParams({
            action: 'query',
            format: 'json',
            formatversion: '2',
            prop: 'imageinfo',
            iiprop: 'url|size|mime|extmetadata',
            iiurlwidth: String(PLACE_WIDTH),
            iiextmetadatafilter: 'Artist|LicenseShortName|LicenseUrl|ImageDescription',
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

const config = JSON.parse(await readFile(new URL('places-config.json', DATA), 'utf8'));
const keys = Object.keys(config).filter((k) => !k.startsWith('_'));

// 1. Candidate files per page.
const candidates = new Map();
for (const key of keys) {
    const c = config[key];
    const exclude = new Set((c.exclude ?? []).map(normalizeFile));
    const ordered = [...(c.files ?? []).map(normalizeFile)];
    for (const spec of c.pages ?? []) {
        for (const f of await articleFiles(spec)) if (isCandidateName(f)) ordered.push(f);
        await sleep(300);
    }
    candidates.set(key, [...new Set(ordered)].filter((f) => !exclude.has(f)));
    console.log(`${key}: ${candidates.get(key).length} candidate files`);
}

// 2. Commons details for every candidate.
const info = await commonsInfo([...new Set([...candidates.values()].flat())]);

// 3. Pick, download, convert, record.
await mkdir(PUBLIC, { recursive: true });
const kept = new Set();
const pages = {};
for (const key of keys) {
    const c = config[key];
    const pinned = new Set((c.files ?? []).map(normalizeFile));
    const max = c.max ?? DEFAULT_MAX;
    const pictures = [];
    for (const file of candidates.get(key)) {
        if (pictures.length >= max) break;
        const i = info.get(file);
        if (!i) continue;
        const credit = creditOf(i);
        if (credit.error) {
            console.log(`  skip ${file}: ${credit.error}`);
            continue;
        }
        if (!pinned.has(file) && !fitsGrid(i.width, i.height)) {
            console.log(`  skip ${file}: ${i.width}x${i.height}`);
            continue;
        }
        const name = placeStoredName(key, pictures.length + 1);
        const source = Buffer.from(await (await get(credit.thumb)).arrayBuffer());
        const { data, info: out } = await sharp(source).rotate().resize({ width: PLACE_WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer({ resolveWithObject: true });
        await writeFile(new URL(name, PUBLIC), data);
        kept.add(name);
        await sleep(300);
        const described = plainText(i.extmetadata?.ImageDescription?.value, 160).replace(/\s+([.,;:!?])/g, '$1');
        pictures.push({
            src: `/images/places/${name}`,
            width: out.width,
            height: out.height,
            file,
            author: credit.author,
            license: credit.license,
            licenseUrl: credit.licenseUrl,
            page: credit.page,
            caption: { ...(described ? { en: described } : {}), ...(c.captions?.[file] ?? {}) },
        });
        console.log(`  keep ${file} (${credit.license})`);
    }
    pages[key] = pictures;
}

for (const name of await readdir(PUBLIC)) if (name.endsWith('.webp') && !kept.has(name)) await rm(new URL(name, PUBLIC));
await writeFile(new URL('places.json', DATA), `${JSON.stringify({ source: 'Wikipedia article image lists and Wikimedia Commons', pages }, null, 1)}\n`);
console.log(`Stored ${kept.size} pictures for ${keys.length} pages.`);
