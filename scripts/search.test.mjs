// The site search's matching (src/lib/search.ts): accents, Arabic letter
// variants, ranking, and the Wikipedia URLs. Run: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { normalize, searchEntries, wikipediaArticleUrl, wikipediaSearchUrl } from '../src/lib/search.ts';

const entry = (k, l, s = l, h = `/x/${l}`, m = '') => ({ k, l, h, m, s: normalize(s) });

test('accents, case and punctuation do not matter', () => {
    assert.equal(normalize('Chaïbia Talal'), 'chaibia talal');
    assert.equal(normalize("M'hamed Issiakhem"), 'm hamed issiakhem');
    assert.equal(normalize('Kader  Attia — Œuvre'), 'kader attia oeuvre');
    assert.equal(normalize('Hazoumè'), 'hazoume');
});

test('Arabic spellings that readers mix up match each other', () => {
    assert.equal(normalize('الشُّعيبية'), normalize('الشعيبيه'));
    assert.equal(normalize('أحمد'), normalize('احمد'));
    assert.equal(normalize('مصطفى'), normalize('مصطفي'));
});

const index = [
    entry('profile', 'Chaïbia Talal', 'Chaïbia Talal chaibia talal الشعيبية طلال'),
    entry('profile', 'Ben Enwonwu'),
    entry('list', 'Nigerian artists'),
    entry('page', 'Kente cloth'),
    entry('wikipedia', 'Talal Derki', 'Talal Derki'),
    entry('wikipedia', 'Benedict Enwonwu', 'Benedict Enwonwu'),
];

test('finds a name typed without accents, and in another edition\'s script', () => {
    assert.equal(searchEntries(index, 'chaibia')[0].l, 'Chaïbia Talal');
    assert.equal(searchEntries(index, 'الشعيبيه')[0].l, 'Chaïbia Talal');
});

test('every word of the query must start a word of the entry, not sit in the middle of one', () => {
    assert.deepEqual(searchEntries(index, 'ben enwonwu').map((e) => e.l), ['Ben Enwonwu', 'Benedict Enwonwu']);
    assert.deepEqual(searchEntries(index, 'enwonwu ben').map((e) => e.l), ['Ben Enwonwu', 'Benedict Enwonwu']);
    assert.deepEqual(searchEntries(index, 'ben zzz'), []);
    assert.deepEqual(searchEntries(index, 'nwonwu'), []);
});

test('the Arabic article ال is optional', () => {
    assert.equal(normalize('الشعيبية'), normalize('شعيبية'));
    assert.equal(searchEntries(index, 'شعيبية')[0].l, 'Chaïbia Talal');
    assert.equal(normalize('الله'), 'الله');
});

test('ranking: an exact label first, then our own pages before Wikipedia-only names', () => {
    assert.deepEqual(searchEntries(index, 'talal').map((e) => e.l), ['Chaïbia Talal', 'Talal Derki']);
    assert.equal(searchEntries(index, 'ben')[0].l, 'Ben Enwonwu');
    const rows = [entry('profile', 'Talal Akbar'), entry('wikipedia', 'Talal')];
    assert.equal(searchEntries(rows, 'talal')[0].l, 'Talal');
});

test('a query shorter than two characters finds nothing, and nothing is returned for no match', () => {
    assert.deepEqual(searchEntries(index, 'b'), []);
    assert.deepEqual(searchEntries(index, 'qqqq'), []);
});

test('results are capped', () => {
    const many = Array.from({ length: 30 }, (_, i) => entry('profile', `Artist ${i}`));
    assert.equal(searchEntries(many, 'artist').length, 8);
    assert.equal(searchEntries(many, 'artist', 3).length, 3);
});

test('Wikipedia links are built in the right language and escaped', () => {
    assert.equal(wikipediaArticleUrl('fr:Chaïbia Talal'), 'https://fr.wikipedia.org/wiki/Cha%C3%AFbia_Talal');
    assert.equal(wikipediaArticleUrl("en:M'hamed Issiakhem"), "https://en.wikipedia.org/wiki/M'hamed_Issiakhem".replace("'", '%27').replace('%27', "'"));
    assert.equal(wikipediaSearchUrl('ar', 'الشعيبية & طلال'), 'https://ar.wikipedia.org/w/index.php?search=%D8%A7%D9%84%D8%B4%D8%B9%D9%8A%D8%A8%D9%8A%D8%A9%20%26%20%D8%B7%D9%84%D8%A7%D9%84');
});

test('negative control: a plain substring search would miss the accented name', () => {
    assert.equal(index.filter((e) => e.l.toLowerCase().includes('chaibia')).length, 0);
    assert.equal(searchEntries(index, 'chaibia').length, 1);
});
