// Checks the live site the way visitors and crawlers reach it, so a broken
// deploy or domain setting is caught the same day instead of a week later
// (in October 2026 a www redirect looped against Vercel's for six days).
//
//   node scripts/site-check.mjs            SITE=https://africanartists.com by default
//
// Fails (exit 1) on a redirect loop, more than one redirect to reach a page,
// the bare domain and www ending on different addresses, an error status, or
// any sitemap URL that does not answer 200 directly. Warns when a page's
// canonical is not the address it was served from (the domain settings point
// the other way from NEXT_PUBLIC_SITE_URL; see the README, "Domain"), and when
// Vercel Web Analytics' script does not answer.
// Run by .github/workflows/site-check.yml after each production deploy and
// daily; a failed run is what sends the email.
import { appendFileSync } from 'node:fs';

const SITE = (process.env.SITE || 'https://africanartists.com').replace(/\/+$/, '');
const HOST = new URL(SITE).host;
const WWW = `https://www.${HOST}`;
const HEADERS = { 'User-Agent': 'AfricanArtistsSiteCheck/1.0 (+https://github.com/YFHcode/african-artists)' };
const MAX_HOPS = 6;

const failures = [];
const warnings = [];
const notes = [];

/** Follows redirects by hand, recording each hop, and stops at a loop. */
async function trace(url) {
    const hops = [];
    let current = url;
    for (let i = 0; i <= MAX_HOPS; i++) {
        const res = await fetch(current, { redirect: 'manual', headers: HEADERS, signal: AbortSignal.timeout(20_000) });
        const location = res.headers.get('location');
        if (res.status >= 300 && res.status < 400 && location) {
            const next = new URL(location, current).href;
            hops.push(`${res.status} ${next}`);
            if (next === url || hops.slice(0, -1).some((h) => h.endsWith(` ${next}`))) {
                return { url, hops, loop: true };
            }
            current = next;
            continue;
        }
        return { url, hops, final: current, status: res.status, body: res.headers.get('content-type')?.includes('text/html') ? await res.text() : '' };
    }
    return { url, hops, loop: true };
}

const canonicalOf = (html) => html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1] ?? html.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/)?.[1];
const bare = (u) => u.replace(/\/+$/, '');

async function check(url, { status = 200, maxHops = 1 } = {}) {
    let t;
    try {
        t = await trace(url);
    } catch (err) {
        return { url, problem: `no answer (${err.cause?.code ?? err.name}: ${err.message})` };
    }
    if (t.loop) return { url, problem: `redirect loop: ${[url, ...t.hops].join(' → ')}` };
    if (t.status !== status) return { url, problem: `${t.status} at ${t.final} (expected ${status})${t.hops.length ? ` after ${t.hops.join(' → ')}` : ''}` };
    if (t.hops.length > maxHops) return { url, problem: `${t.hops.length} redirects: ${[url, ...t.hops].join(' → ')}` };
    const canonical = t.body && status === 200 ? canonicalOf(t.body) : undefined;
    if (canonical && bare(canonical) !== bare(t.final)) {
        warnings.push(`${t.final} declares canonical ${canonical}`);
    }
    return { url, final: t.final, hops: t.hops };
}

/** Runs the checks, retrying anything that failed once after a pause (a deploy can take a moment to settle). */
async function run(items) {
    let results = await pool(items, (i) => check(i.url, i.options));
    if (results.some((r) => r.problem)) {
        await new Promise((r) => setTimeout(r, 20_000));
        results = await pool(items, async (i, n) => (results[n].problem ? check(i.url, i.options) : results[n]));
    }
    return results;
}

async function pool(items, fn, size = 6) {
    const out = new Array(items.length);
    let next = 0;
    await Promise.all(
        Array.from({ length: size }, async () => {
            while (next < items.length) {
                const n = next++;
                out[n] = await fn(items[n], n);
            }
        }),
    );
    return out;
}

// 1. The ways in: both hosts, plain http, a page per edition, the old /en/ form, a missing page.
const entry = [
    { url: `${SITE}/` },
    { url: `${WWW}/` },
    { url: `http://${HOST}/`, options: { maxHops: 2 } },
    { url: `${WWW}/artists/el-anatsui` },
    { url: `${SITE}/artists/el-anatsui` },
    { url: `${SITE}/fr` },
    { url: `${SITE}/es/artists` },
    { url: `${SITE}/pt/guides` },
    { url: `${SITE}/ar/artists` },
    { url: `${SITE}/en/artists` },
    { url: `${SITE}/robots.txt` },
    { url: `${SITE}/sitemap.xml` },
    { url: `${SITE}/does-not-exist-${Date.now()}`, options: { status: 404 } },
];
const entryResults = await run(entry);
for (const r of entryResults) if (r.problem) failures.push(`${r.url}: ${r.problem}`);

const home = entryResults[0];
const wwwHome = entryResults[1];
if (home.final && wwwHome.final && bare(home.final) !== bare(wwwHome.final)) {
    failures.push(`${SITE}/ ends at ${home.final} but ${WWW}/ ends at ${wwwHome.final}: one host should redirect to the other`);
}
if (home.final) notes.push(`Home page served from ${home.final}${home.hops.length ? ` (via ${home.hops.join(' → ')})` : ''}`);

// Vercel Web Analytics: its script answers only once Web Analytics is enabled in
// the project and a deploy has happened since. Missing analytics is not an
// outage, so this warns instead of failing.
const [insights] = await run([{ url: `${SITE}/_vercel/insights/script.js` }]);
if (insights.problem) warnings.unshift(`Vercel Web Analytics is not collecting: ${insights.url}: ${insights.problem}. Enable Web Analytics in the Vercel project, then redeploy.`);
else notes.push('Vercel Web Analytics script answers 200');

// 2. Every URL in the sitemap answers 200 directly: no redirect, no error.
let sitemapUrls = [];
try {
    const xml = await (await fetch(`${SITE}/sitemap.xml`, { headers: HEADERS, signal: AbortSignal.timeout(20_000) })).text();
    sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
} catch (err) {
    failures.push(`sitemap: ${err.message}`);
}
if (sitemapUrls.length > 0) {
    const results = await run(sitemapUrls.map((url) => ({ url, options: { maxHops: 0 } })));
    const bad = results.filter((r) => r.problem);
    for (const r of bad.slice(0, 25)) failures.push(`sitemap ${r.url}: ${r.problem}`);
    if (bad.length > 25) failures.push(`…and ${bad.length - 25} more sitemap URLs`);
    notes.push(`${sitemapUrls.length - bad.length} of ${sitemapUrls.length} sitemap URLs answer 200 directly`);
} else if (!failures.some((f) => f.startsWith('sitemap'))) {
    failures.push('sitemap.xml lists no URLs');
}

// Report: to the console, and as annotations and a summary on GitHub.
const uniqueWarnings = [...new Set(warnings)];
const shownWarnings = uniqueWarnings.slice(0, 10);
if (uniqueWarnings.length > 10) shownWarnings.push(`…and ${uniqueWarnings.length - 10} more pages whose canonical is not where they were served`);
for (const n of notes) console.log(n);
for (const w of shownWarnings) console.log(process.env.GITHUB_ACTIONS ? `::warning::${w}` : `warning: ${w}`);
for (const f of failures) console.log(process.env.GITHUB_ACTIONS ? `::error::${f}` : `FAIL: ${f}`);
console.log(failures.length === 0 ? `OK: ${SITE} is up${shownWarnings.length ? `, with ${uniqueWarnings.length} warning(s)` : ''}.` : `${failures.length} problem(s) on ${SITE}.`);

if (process.env.GITHUB_STEP_SUMMARY) {
    const list = (title, items) => (items.length ? `### ${title}\n\n${items.map((i) => `- ${i}`).join('\n')}\n\n` : '');
    appendFileSync(
        process.env.GITHUB_STEP_SUMMARY,
        `## ${failures.length === 0 ? '✅' : '❌'} ${SITE}\n\n` + list('Problems', failures) + list('Warnings', shownWarnings) + list('Checked', notes),
    );
}
process.exit(failures.length === 0 ? 0 : 1);
