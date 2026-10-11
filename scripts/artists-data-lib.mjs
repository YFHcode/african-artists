// Pure helpers for scripts/artists-data.mjs: the Wikidata query, row merging,
// pageview windows and ranking. No network here, so the tests can cover it.

// Visual-art occupations (Wikidata P106 values). Anyone holding at least one
// of these, with citizenship of a present-day African country, is a candidate.
export const OCCUPATIONS = {
    Q1028181: 'painter',
    Q1281618: 'sculptor',
    Q33231: 'photographer',
    Q3391743: 'visual artist',
    Q11569986: 'printmaker',
    Q7541856: 'ceramicist',
};

// The five editions of the site; pageviews are summed across these Wikipedias.
export const WIKIS = ['en', 'fr', 'es', 'pt', 'ar'];

// Words in the English Wikidata description that say the person is known for
// art. Without one, the row is flagged for review: Wikidata lists W. E. B. Du
// Bois as a photographer, but nobody searches for him as one.
const ART_WORDS = /\b(painter|sculptor|photographer|photojournalist|artist|printmaker|ceramicist|potter|illustrator|muralist|draughtsman|draftsman)\b/i;

const occValues = () => Object.keys(OCCUPATIONS).map((q) => `wd:${q}`).join(' ');

// Step 1: the IDs of everyone holding one occupation. Kept deliberately light
// (no labels, no sorting, no OFFSET) so Wikidata answers well inside its
// 60-second limit; one query per occupation keeps each result small.
export function buildIdsQuery({ occupation, minSitelinks }) {
    return `SELECT DISTINCT ?p WHERE {
  ?p wdt:P106 wd:${occupation}; wdt:P27 ?c; wikibase:sitelinks ?l.
  ?c wdt:P30 wd:Q15; wdt:P31 wd:Q6256.
  FILTER(?l >= ${Number(minSitelinks)})
}`;
}

// Step 2: details for one batch of people, named by QID. The rows may repeat a
// person (several countries, occupations or birth dates); mergeRows folds them.
export function buildDetailsQuery(qids) {
    const wikis = WIKIS.map(
        (w) => `  OPTIONAL { ?${w}Page schema:about ?p; schema:isPartOf <https://${w}.wikipedia.org/>; schema:name ?${w} }`
    ).join('\n');
    return `SELECT ?p ?pLabel ?desc ?countryLabel ?occ ?birth ?death ?links ?bornAfrica ${WIKIS.map((w) => `?${w}`).join(' ')} WHERE {
  VALUES ?p { ${qids.map((q) => `wd:${q}`).join(' ')} }
  VALUES ?occ { ${occValues()} }
  ?p wdt:P106 ?occ; wdt:P27 ?country; wikibase:sitelinks ?links.
  ?country wdt:P30 wd:Q15; wdt:P31 wd:Q6256.
  OPTIONAL { ?p wdt:P569 ?birth }
  OPTIONAL { ?p wdt:P570 ?death }
  OPTIONAL { ?p schema:description ?desc FILTER(LANG(?desc) = "en") }
  BIND(EXISTS { ?p wdt:P19/wdt:P17/wdt:P30 wd:Q15 } AS ?bornAfrica)
${wikis}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,fr". }
}`;
}

// SPARQL JSON results -> flat rows of plain strings.
export function parseBindings(json) {
    return json.results.bindings.map((b) => Object.fromEntries(Object.entries(b).map(([k, v]) => [k, v.value])));
}

export const qidOf = (uri) => uri.slice(uri.lastIndexOf('/') + 1);
// '1943-01-01T00:00:00Z' -> 1943; '-0500-…' -> -500. Wikidata sometimes holds
// several dates for one person; the earliest is kept.
const yearOf = (date) => (date ? Number(date.slice(0, date.indexOf('-', 1))) : null);
const earliest = (a, b) => (b === null || !Number.isFinite(b) ? a : a === null ? b : Math.min(a, b));
const add = (list, value) => (value && !list.includes(value) ? [...list, value] : list);

// Rows -> one record per person, keyed by QID.
export function mergeRows(rows, people = new Map()) {
    for (const r of rows) {
        const qid = qidOf(r.p);
        const prev = people.get(qid) ?? {
            qid,
            name: r.pLabel,
            description: r.desc ?? '',
            countries: [],
            occupations: [],
            birthYear: null,
            deathYear: null,
            sitelinks: Number(r.links),
            bornInAfrica: r.bornAfrica === 'true',
            titles: {},
        };
        prev.countries = add(prev.countries, r.countryLabel);
        prev.occupations = add(prev.occupations, OCCUPATIONS[qidOf(r.occ)]);
        prev.birthYear = earliest(prev.birthYear, yearOf(r.birth));
        prev.deathYear = earliest(prev.deathYear, yearOf(r.death));
        for (const w of WIKIS) if (r[w]) prev.titles[w] = r[w];
        people.set(qid, prev);
    }
    return people;
}

// The last twelve complete months before `now`, in the pageviews API format.
export function pageviewWindow(now = new Date()) {
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0));
    const start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 11, 1));
    const fmt = (d) => d.toISOString().slice(0, 10).replaceAll('-', '');
    return { start: fmt(start), end: fmt(end) };
}

export function pageviewUrl(wiki, title, { start, end }) {
    const article = encodeURIComponent(title.replaceAll(' ', '_'));
    return `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/${wiki}.wikipedia/all-access/user/${article}/monthly/${start}00/${end}00`;
}

export const isArtist = (person) => ART_WORDS.test(person.description);

/** A Wikidata item with no English label shows its QID as its name. */
const unnamed = (person) => /^Q\d+$/.test(person.name);

/**
 * Hand corrections for Wikidata errors ({ QID: { birthYear?, deathYear? } }),
 * then one rule: a death year that is not after the birth year is dropped.
 */
export function applyCorrections(people, corrections = {}) {
    for (const p of people) {
        const fix = corrections[p.qid];
        if (fix) for (const key of ['birthYear', 'deathYear']) if (key in fix) p[key] = fix[key];
        if (p.deathYear !== null && p.birthYear !== null && p.deathYear <= p.birthYear) p.deathYear = null;
    }
    return people;
}

// Exclude list: one QID per line, anything after # is a comment.
export function parseExclude(text) {
    return new Set(
        text
            .split('\n')
            .map((line) => line.replace(/#.*/, '').trim())
            .filter(Boolean)
    );
}

// Sort by total pageviews (sitelinks break ties) and assign a tier:
//   page      - among the top `pageCount` artists with at least `minViews`: worth its own page
//   list      - a real artist, but listed on country/medium pages only
//   review    - description does not mention art; check by hand, then exclude or keep
//   excluded  - on the exclude list
export function rank(people, { pageCount, minViews, exclude }) {
    const sorted = [...people].sort((a, b) => b.views.total - a.views.total || b.sitelinks - a.sitelinks || a.qid.localeCompare(b.qid));
    let pages = 0;
    return sorted.map((p, i) => {
        let tier;
        if (exclude.has(p.qid)) tier = 'excluded';
        else if (!isArtist(p) || unnamed(p)) tier = 'review';
        else if (pages < pageCount && p.views.total >= minViews) {
            tier = 'page';
            pages++;
        } else tier = 'list';
        return { rank: i + 1, tier, ...p };
    });
}

const CSV_COLUMNS = ['rank', 'tier', 'qid', 'name', 'countries', 'occupations', 'birthYear', 'deathYear', 'bornInAfrica', 'sitelinks', ...WIKIS.map((w) => `views_${w}`), 'views_total', 'description', 'wikipedia_en'];

const cell = (v) => {
    const s = v === null || v === undefined ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

export function toCsv(ranked) {
    const rows = ranked.map((p) =>
        [
            p.rank,
            p.tier,
            p.qid,
            p.name,
            p.countries.join('; '),
            p.occupations.join('; '),
            p.birthYear,
            p.deathYear,
            p.bornInAfrica,
            p.sitelinks,
            ...WIKIS.map((w) => p.views[w] ?? 0),
            p.views.total,
            p.description,
            p.titles.en ? `https://en.wikipedia.org/wiki/${encodeURIComponent(p.titles.en.replaceAll(' ', '_'))}` : '',
        ]
            .map(cell)
            .join(',')
    );
    return [CSV_COLUMNS.join(','), ...rows].join('\n') + '\n';
}
