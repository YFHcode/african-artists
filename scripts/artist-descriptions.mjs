// Short descriptions of the artists in the lists, from Wikidata ("Ghanaian
// sculptor", "peintre nigérian"), in the site's five languages. Wikidata is
// CC0. Runs in the Artist images workflow (.github/workflows/artist-images.yml)
// after the pictures; it can also run from any machine that can reach Wikidata.
//
//   node scripts/artist-descriptions.mjs
//
// Writes data/artists/descriptions.json: { "Q123": { "en": "…", "fr": "…" } }.
// A description that is wrong on Wikidata is best fixed there; to hide one
// here, add the artist's QID to data/images/exclude.txt.
import { readFile, writeFile } from 'node:fs/promises';

import { ORIGINAL_ARTISTS, ROSTER } from '../src/content/roster.ts';
import { LANGS, cleanDescription, descriptionQuery, listedArtists, parseBindings, qidOf } from './artist-images-lib.mjs';

const ROOT = new URL('../', import.meta.url);
const HEADERS = { 'User-Agent': 'AfricanArtistsBot/1.0 (https://africanartists.com; list descriptions)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sparql(query, tries = 5) {
    for (let attempt = 1; ; attempt++) {
        try {
            const res = await fetch('https://query.wikidata.org/sparql', {
                method: 'POST',
                headers: { ...HEADERS, 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/sparql-results+json' },
                body: new URLSearchParams({ query }),
                signal: AbortSignal.timeout(90_000),
            });
            if (res.ok) return parseBindings(await res.json());
            if (res.status !== 429 && res.status < 500) throw new Error(`${res.status} ${res.statusText}`);
            if (attempt >= tries) throw new Error(`${res.status} after ${tries} tries`);
            await sleep(Number(res.headers.get('retry-after')) * 1000 || 2000 * 2 ** attempt);
        } catch (err) {
            if (attempt >= tries || /^\d{3} /.test(err.message)) throw err;
            await sleep(2000 * 2 ** attempt);
        }
    }
}

const lines = async (path) => (await readFile(new URL(path, ROOT), 'utf8').catch(() => '')).split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean);
const raw = JSON.parse(await readFile(new URL('data/artists/artists.json', ROOT), 'utf8'));
const exclude = new Set([...(await lines('data/artists/exclude.txt')), ...(await lines('data/images/exclude.txt'))]);
const profiled = new Set([...Object.values(ORIGINAL_ARTISTS).map((a) => a.qid), ...ROSTER.map((r) => r.qid)]);
const listed = listedArtists(raw, exclude, profiled);
const nameOf = new Map(listed.map((a) => [a.qid, a.name]));

const out = {};
for (let i = 0; i < listed.length; i += 100) {
    for (const r of await sparql(descriptionQuery(listed.slice(i, i + 100).map((a) => a.qid)))) {
        const qid = qidOf(r.p);
        const d = cleanDescription(r.d, nameOf.get(qid));
        if (!d || !LANGS.includes(r.lang)) continue;
        (out[qid] ??= {})[r.lang] = d;
    }
    await sleep(1000);
}
const sorted = Object.fromEntries(Object.keys(out).sort().map((q) => [q, Object.fromEntries(LANGS.filter((l) => out[q][l]).map((l) => [l, out[q][l]]))]));
await writeFile(new URL('data/artists/descriptions.json', ROOT), `${JSON.stringify({ source: 'Wikidata descriptions (CC0)', artists: sorted }, null, 1)}\n`);
const per = Object.fromEntries(LANGS.map((l) => [l, Object.values(sorted).filter((d) => d[l]).length]));
console.log(`Descriptions for ${Object.keys(sorted).length} of ${listed.length} listed artists:`, per);
