// Tests for the artist-data helpers. The network side (Wikidata, pageviews)
// runs in GitHub Actions; everything it relies on is checked here offline.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyCorrections, buildDetailsQuery, buildIdsQuery, mergeRows, pageviewUrl, pageviewWindow, parseExclude, rank, toCsv } from './artists-data-lib.mjs';

const row = (over) => ({
    p: 'http://www.wikidata.org/entity/Q1',
    pLabel: 'Ama',
    desc: 'Ghanaian painter',
    countryLabel: 'Ghana',
    occ: 'http://www.wikidata.org/entity/Q1028181',
    birth: '1970-05-01T00:00:00Z',
    links: '12',
    bornAfrica: 'true',
    en: 'Ama (painter)',
    ...over,
});

test('the ID query stays light and the details query names its batch', () => {
    const ids = buildIdsQuery({ occupation: 'Q1028181', minSitelinks: 4 });
    assert.match(ids, /wdt:P106 wd:Q1028181/);
    assert.match(ids, /FILTER\(\?l >= 4\)/);
    assert.match(ids, /wdt:P31 wd:Q6256/, 'present-day countries only, not empires');
    assert.doesNotMatch(ids, /ORDER BY|OFFSET|SERVICE/, 'no sorting, paging or labels: those made Wikidata time out');
    assert.match(buildDetailsQuery(['Q1', 'Q22']), /VALUES \?p \{ wd:Q1 wd:Q22 \}/);
});

test('rows for one person merge into one record', () => {
    const people = mergeRows([
        row({}),
        row({ occ: 'http://www.wikidata.org/entity/Q1281618', countryLabel: 'Togo', birth: '1969-01-01T00:00:00Z', death: '2020-03-02T00:00:00Z', fr: 'Ama' }),
        row({ p: 'http://www.wikidata.org/entity/Q2', pLabel: 'Kofi', birth: undefined, en: undefined }),
    ]);
    assert.equal(people.size, 2);
    const ama = people.get('Q1');
    assert.deepEqual(ama.countries, ['Ghana', 'Togo']);
    assert.deepEqual(ama.occupations, ['painter', 'sculptor']);
    assert.equal(ama.birthYear, 1969, 'the earliest recorded birth year wins');
    assert.deepEqual(ama.titles, { en: 'Ama (painter)', fr: 'Ama' });
    assert.equal(ama.deathYear, 2020);
    assert.equal(people.get('Q2').birthYear, null);
    assert.equal(people.get('Q2').deathYear, null);
});

test('the pageview window is the last twelve complete months', () => {
    assert.deepEqual(pageviewWindow(new Date('2026-10-11T12:00:00Z')), { start: '20251001', end: '20260930' });
    assert.deepEqual(pageviewWindow(new Date('2026-01-03T00:00:00Z')), { start: '20250101', end: '20251231' });
    assert.equal(
        pageviewUrl('fr', 'Chéri Samba', { start: '20251001', end: '20260930' }),
        'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/fr.wikipedia/all-access/user/Ch%C3%A9ri_Samba/monthly/2025100100/2026093000'
    );
});

test('ranking puts the most viewed first and assigns tiers', () => {
    const person = (qid, total, description = 'painter') => ({ qid, name: `Artist ${qid}`, description, countries: [], occupations: [], birthYear: null, sitelinks: 5, bornInAfrica: true, titles: {}, views: { total } });
    const ranked = rank([person('Q1', 100), person('Q2', 90000), person('Q3', 50000, 'American sociologist'), person('Q4', 40000), person('Q5', 30000), person('Q6', 20000)], {
        pageCount: 2,
        minViews: 1000,
        exclude: parseExclude('Q5   # not an artist\n\n# comment only\n'),
    });
    assert.deepEqual(
        ranked.map((p) => `${p.qid}:${p.tier}`),
        ['Q2:page', 'Q3:review', 'Q4:page', 'Q5:excluded', 'Q6:list', 'Q1:list']
    );
    assert.equal(ranked[0].rank, 1);
});

test('CSV quotes commas and quotes', () => {
    const csv = toCsv([{ rank: 1, tier: 'page', qid: 'Q1', name: 'A "B", C', description: '', countries: ['Ghana', 'Togo'], occupations: ['painter'], birthYear: 1970, deathYear: null, bornInAfrica: true, sitelinks: 3, titles: { en: 'A B' }, views: { en: 10, total: 10 } }]);
    const [header, line] = csv.trim().split('\n');
    assert.ok(header.startsWith('rank,tier,qid,name,'));
    assert.ok(line.startsWith('1,page,Q1,"A ""B"", C",Ghana; Togo,painter,1970,,true,3,10,0,0,0,0,10,,https://en.wikipedia.org/wiki/A_B'));
});

test('corrections fix known Wikidata errors and impossible death years', () => {
    const people = applyCorrections(
        [
            { qid: 'Q1', birthYear: 1972, deathYear: 1972 },
            { qid: 'Q2', birthYear: 1901, deathYear: null },
            { qid: 'Q3', birthYear: 1930, deathYear: 2014 },
        ],
        { Q2: { birthYear: null } }
    );
    assert.deepEqual(people.map((p) => [p.birthYear, p.deathYear]), [[1972, null], [null, null], [1930, 2014]]);
});

test('an item without an English label goes to review', () => {
    const p = { qid: 'Q9', name: 'Q9', description: 'painter', countries: [], occupations: [], sitelinks: 4, titles: {}, views: { total: 50000 } };
    assert.equal(rank([p], { pageCount: 10, minViews: 1, exclude: new Set() })[0].tier, 'review');
});
