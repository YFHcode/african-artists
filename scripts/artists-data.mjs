// Build the ranked list of African visual artists that programmatic pages are
// generated from. Runs monthly in GitHub Actions (.github/workflows/artist-data.yml);
// it can also run locally from any machine that can reach Wikidata.
//
//   node scripts/artists-data.mjs
//
// 1. Pages through Wikidata 500 people at a time until a short page says the end
//    has been reached: painters, sculptors, photographers, visual artists,
//    printmakers and ceramicists with citizenship of a present-day African country
//    and at least MIN_SITELINKS Wikipedia/Wikimedia articles.
// 2. Sums the last twelve months of Wikipedia pageviews in the site's five
//    languages, which is the best free measure of how often people look someone up.
// 3. Ranks by those views and writes data/artists/artists.{json,csv}.
//
// Settings (environment): MIN_SITELINKS (default 4), PAGE_COUNT (artists that
// get their own page, default 150), MIN_VIEWS (default 5000 a year).
import { readFile, writeFile, mkdir, appendFile } from 'node:fs/promises';
import {
    WIKIS,
    buildQuery,
    mergeRows,
    pageviewUrl,
    pageviewWindow,
    parseBindings,
    parseExclude,
    peopleOn,
    rank,
    toCsv,
} from './artists-data-lib.mjs';

const MIN_SITELINKS = Number(process.env.MIN_SITELINKS || 4);
const PAGE_COUNT = Number(process.env.PAGE_COUNT || 150);
const MIN_VIEWS = Number(process.env.MIN_VIEWS || 5000);
const PAGE_SIZE = 500;
const OUT = new URL('../data/artists/', import.meta.url);

// Wikimedia asks every client to identify itself with a contact.
const HEADERS = { 'User-Agent': 'AfricanArtistsBot/1.0 (https://africanartists.com; data refresh)', Accept: 'application/json' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// GET with retries on rate limits, server errors and network failures.
// 404 is a real answer (no pageviews recorded), returned as null.
async function getJson(url, tries = 5) {
    for (let attempt = 1; ; attempt++) {
        try {
            const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(90_000) });
            if (res.status === 404) return null;
            if (res.ok) return await res.json();
            if (res.status !== 429 && res.status < 500) throw new Error(`${res.status} ${res.statusText} for ${url}`);
            if (attempt >= tries) throw new Error(`${res.status} after ${tries} tries for ${url}`);
            const wait = Number(res.headers.get('retry-after')) * 1000 || 2000 * 2 ** attempt;
            await sleep(wait);
        } catch (err) {
            if (attempt >= tries || /^\d{3} /.test(err.message)) throw err;
            await sleep(2000 * 2 ** attempt);
        }
    }
}

// 1. Wikidata, page by page.
const people = new Map();
for (let offset = 0; ; offset += PAGE_SIZE) {
    const query = buildQuery({ minSitelinks: MIN_SITELINKS, limit: PAGE_SIZE, offset });
    const json = await getJson(`https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(query)}`);
    const rows = parseBindings(json);
    mergeRows(rows, people);
    const count = peopleOn(rows);
    console.log(`Wikidata offset ${offset}: ${count} people (${people.size} total)`);
    if (count < PAGE_SIZE) break;
    await sleep(1000);
}
if (people.size === 0) throw new Error('Wikidata returned nobody; refusing to overwrite the data');

// 2. Pageviews, a few requests at a time.
const span = pageviewWindow();
const jobs = [...people.values()].flatMap((p) => WIKIS.filter((w) => p.titles[w]).map((w) => ({ p, w })));
for (const p of people.values()) p.views = { total: 0 };
let done = 0;
async function worker() {
    for (let job = jobs.shift(); job; job = jobs.shift()) {
        const json = await getJson(pageviewUrl(job.w, job.p.titles[job.w], span));
        const views = (json?.items ?? []).reduce((sum, item) => sum + item.views, 0);
        job.p.views[job.w] = views;
        job.p.views.total += views;
        if (++done % 250 === 0) console.log(`pageviews: ${done} articles`);
    }
}
await Promise.all(Array.from({ length: 8 }, worker));
console.log(`pageviews: ${done} articles, ${span.start}–${span.end}`);

// 3. Rank and write.
const exclude = parseExclude(await readFile(new URL('exclude.txt', OUT), 'utf8').catch(() => ''));
const ranked = rank([...people.values()], { pageCount: PAGE_COUNT, minViews: MIN_VIEWS, exclude });

await mkdir(OUT, { recursive: true });
const meta = { source: 'Wikidata (CC0) and Wikimedia pageviews', window: span, minSitelinks: MIN_SITELINKS, pageCount: PAGE_COUNT, minViews: MIN_VIEWS };
await writeFile(new URL('artists.json', OUT), JSON.stringify({ ...meta, artists: ranked }, null, 1) + '\n');
await writeFile(new URL('artists.csv', OUT), toCsv(ranked));

const tiers = Object.groupBy(ranked, (p) => p.tier);
const summary = [
    `## Artist data: ${ranked.length} people`,
    '',
    `Pageviews ${span.start}–${span.end}, at least ${MIN_SITELINKS} sitelinks.`,
    '',
    `| Tier | Count |`,
    `| --- | --- |`,
    ...['page', 'list', 'review', 'excluded'].map((t) => `| ${t} | ${tiers[t]?.length ?? 0} |`),
    '',
    `### Top 40`,
    '',
    `| # | Name | Country | Views (12 mo) | Tier |`,
    `| --- | --- | --- | --- | --- |`,
    ...ranked.slice(0, 40).map((p) => `| ${p.rank} | ${p.name} | ${p.countries.join(', ')} | ${p.views.total.toLocaleString('en')} | ${p.tier} |`),
].join('\n');
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary + '\n');
