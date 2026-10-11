// Tests for the artist-data helpers. The network side (Wikidata, pageviews)
// runs in GitHub Actions; everything it relies on is checked here offline.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildQuery, mergeRows, pageviewUrl, pageviewWindow, parseExclude, peopleOn, rank, toCsv } from './artists-data-lib.mjs';

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

test('the query pages through people in a stable order', () => {
    const q = buildQuery({ minSitelinks: 4, limit: 500, offset: 1500 });
    assert.match(q, /ORDER BY \?p\s+LIMIT 500 OFFSET 1500/);
    assert.match(q, /FILTER\(\?l >= 4\)/);
    assert.match(q, /wdt:P31 wd:Q6256/, 'present-day countries only, not empires');
});

test('rows for one person merge into one record', () => {
    const people = mergeRows([
        row({}),
        row({ occ: 'http://www.wikidata.org/entity/Q1281618', countryLabel: 'Togo', birth: '1969-01-01T00:00:00Z', fr: 'Ama' }),
        row({ p: 'http://www.wikidata.org/entity/Q2', pLabel: 'Kofi', birth: undefined, en: undefined }),
    ]);
    assert.equal(people.size, 2);
    const ama = people.get('Q1');
    assert.deepEqual(ama.countries, ['Ghana', 'Togo']);
    assert.deepEqual(ama.occupations, ['painter', 'sculptor']);
    assert.equal(ama.birthYear, 1969, 'the earliest recorded birth year wins');
    assert.deepEqual(ama.titles, { en: 'Ama (painter)', fr: 'Ama' });
    assert.equal(people.get('Q2').birthYear, null);
    assert.equal(peopleOn([row({}), row({}), row({ p: 'x/Q9' })]), 2);
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
    const person = (qid, total, description = 'painter') => ({ qid, name: qid, description, countries: [], occupations: [], birthYear: null, sitelinks: 5, bornInAfrica: true, titles: {}, views: { total } });
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
    const csv = toCsv([{ rank: 1, tier: 'page', qid: 'Q1', name: 'A "B", C', description: '', countries: ['Ghana', 'Togo'], occupations: ['painter'], birthYear: 1970, bornInAfrica: true, sitelinks: 3, titles: { en: 'A B' }, views: { en: 10, total: 10 } }]);
    const [header, line] = csv.trim().split('\n');
    assert.ok(header.startsWith('rank,tier,qid,name,'));
    assert.ok(line.startsWith('1,page,Q1,"A ""B"", C",Ghana; Togo,painter,1970,true,3,10,0,0,0,0,10,,https://en.wikipedia.org/wiki/A_B'));
});
