// Helpers of the profile-image fetch, and the stored data. Run: npm test
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import {
    MAX_WORKS,
    acceptedLicense,
    cleanDescription,
    collect,
    commonsFileName,
    creditOf,
    descriptionQuery,
    listedArtists,
    plainText,
    worksQuery,
} from './artist-images-lib.mjs';

const ROOT = path.join(import.meta.dirname, '..');

test('only public domain, CC0, CC BY and CC BY-SA licences are used', () => {
    for (const ok of ['Public domain', 'PD-US', 'CC0', 'CC BY 4.0', 'CC BY-SA 3.0', 'CC BY-SA 2.0 de', 'CC BY-SA 3.0 IGO', 'cc-by-sa-4.0']) {
        assert.equal(acceptedLicense(ok), true, ok);
    }
    for (const no of ['CC BY-NC 4.0', 'CC BY-ND 2.0', 'CC BY-NC-SA 3.0', 'GFDL', 'Fair use', 'Copyrighted', '', undefined]) {
        assert.equal(acceptedLicense(no), false, String(no));
    }
});

test('Commons HTML becomes a short plain-text credit', () => {
    assert.equal(plainText('<a href="//commons.wikimedia.org/wiki/User:X">Jane&nbsp;Doe</a> &amp; <span>Co</span>'), 'Jane Doe & Co');
    assert.equal(plainText('Caf&#233; &#x2014; ok'), 'Café — ok');
    assert.equal(plainText('x'.repeat(200), 20).length, 20);
});

test('Wikidata file paths become Commons file names', () => {
    assert.equal(commonsFileName('http://commons.wikimedia.org/wiki/Special:FilePath/El%20Anatsui_2015.jpg'), 'El Anatsui 2015.jpg');
    assert.throws(() => commonsFileName('https://example.com/a.jpg'));
});

test('works: one per work, most-linked first, never the portrait, at most MAX_WORKS', () => {
    const fp = (f) => `http://commons.wikimedia.org/wiki/Special:FilePath/${f}`;
    const wd = (q) => `http://www.wikidata.org/entity/${q}`;
    const row = (work, file, links, extra = {}) => ({ artist: wd('Q1'), work: wd(work), image: fp(file), links: String(links), label_en: `Work ${work}`, ...extra });
    const out = collect(
        [{ artist: wd('Q1'), image: fp('Portrait.jpg') }],
        [
            row('Q10', 'A.jpg', 3, { inception: '1970-01-01T00:00:00Z', precision: '9', label_fr: 'Œuvre' }),
            row('Q10', 'A2.jpg', 3),
            row('Q11', 'Portrait.jpg', 9),
            row('Q12', 'B.jpg', 7),
            row('Q13', 'C.jpg', 1, { label_en: 'Q13' }),
            row('Q14', 'D.jpg', 0, { inception: '1900-01-01T00:00:00Z', precision: '7' }),
            row('Q15', 'E.jpg', 0),
            row('Q16', 'F.jpg', 0),
        ]
    );
    const a = out.get('Q1');
    assert.equal(a.portrait, 'Portrait.jpg');
    assert.deepEqual(a.works.map((w) => w.qid), ['Q12', 'Q10', 'Q14', 'Q15']);
    assert.equal(a.works.length, MAX_WORKS);
    assert.deepEqual(a.works[1], { qid: 'Q10', file: 'A.jpg', year: 1970, title: { en: 'Work Q10', fr: 'Œuvre' } });
    assert.equal(a.works[2].year, null, 'a century is not a year');
    assert.match(worksQuery(['Q1', 'Q2']), /VALUES \?artist \{ wd:Q1 wd:Q2 \}/);
});

test('credits: licence checked, author required unless public domain', () => {
    const info = (license, artist) => ({
        thumburl: 'https://upload.wikimedia.org/x.jpg',
        descriptionurl: 'https://commons.wikimedia.org/wiki/File:X.jpg',
        extmetadata: { LicenseShortName: { value: license }, ...(artist ? { Artist: { value: artist } } : {}), LicenseUrl: { value: 'https://creativecommons.org/licenses/by-sa/4.0' } },
    });
    assert.deepEqual(creditOf(info('CC BY-SA 4.0', '<b>Ann</b>')), {
        author: 'Ann',
        license: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        page: 'https://commons.wikimedia.org/wiki/File:X.jpg',
        thumb: 'https://upload.wikimedia.org/x.jpg',
    });
    assert.ok(creditOf(info('CC BY-SA 4.0')).error);
    assert.equal(creditOf(info('Public domain', '<span>Unknown author</span> <span>Unknown author</span>')).author, 'Unknown author');
    assert.equal(creditOf(info('Public domain')).author, null);
    assert.ok(creditOf(info('CC BY-NC 2.0', 'Ann')).error);
    assert.ok(creditOf(null).error);
});

test('stored images: every entry has its file, credit and size; no stray files', () => {
    const { artists } = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/images/images.json'), 'utf8'));
    const listed = new Set();
    for (const [qid, a] of Object.entries(artists)) {
        assert.match(qid, /^Q\d+$/);
        for (const pic of [a.portrait, ...a.works].filter(Boolean)) {
            assert.ok(fs.existsSync(path.join(ROOT, 'public', pic.src)), pic.src);
            assert.ok(acceptedLicense(pic.license), `${pic.src}: ${pic.license}`);
            assert.match(pic.page, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
            assert.ok(pic.width > 0 && pic.height > 0);
            listed.add(path.basename(pic.src));
        }
        for (const w of a.works) assert.ok(w.title.en, `${w.qid} has no English title`);
    }
    const dir = path.join(ROOT, 'public/images/artists');
    const stored = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
    assert.deepEqual(stored.filter((f) => !listed.has(f)), []);
});

test('listed artists: page and list tiers, minus exclusions, unlabelled items and profiles', () => {
    const raw = { artists: [
        { qid: 'Q1', name: 'Ann', tier: 'page' },
        { qid: 'Q2', name: 'Ben', tier: 'list' },
        { qid: 'Q3', name: 'Cy', tier: 'review' },
        { qid: 'Q4', name: 'Q4', tier: 'list' },
        { qid: 'Q5', name: 'Dee', tier: 'list' },
        { qid: 'Q6', name: 'Eve', tier: 'list' },
    ] };
    assert.deepEqual(listedArtists(raw, new Set(['Q5']), new Set(['Q6'])).map((a) => a.qid), ['Q1', 'Q2']);
});

test('Wikidata descriptions: one clean line or nothing', () => {
    assert.equal(cleanDescription('  Ghanaian   sculptor. ', 'Ann'), 'Ghanaian sculptor');
    assert.equal(cleanDescription('peintre nigérian', 'Ann'), 'peintre nigérian');
    assert.equal(cleanDescription('Ann', 'Ann'), null);
    assert.equal(cleanDescription('see https://example.com', 'Ann'), null);
    assert.equal(cleanDescription('Wikimedia disambiguation page', 'Ann'), null);
    assert.equal(cleanDescription('x'.repeat(121), 'Ann'), null);
    assert.equal(cleanDescription('', 'Ann'), null);
    assert.match(descriptionQuery(['Q1']), /schema:description/);
});

test('list portraits and descriptions: files exist, licences hold, no strays, known languages', () => {
    const { artists: pics } = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/images/list-portraits.json'), 'utf8'));
    const listed = new Set();
    for (const [qid, pic] of Object.entries(pics)) {
        assert.match(qid, /^Q\d+$/);
        assert.equal(pic.src, `/images/list/${qid.toLowerCase()}.webp`);
        assert.ok(fs.existsSync(path.join(ROOT, 'public', pic.src)), pic.src);
        assert.ok(acceptedLicense(pic.license), `${pic.src}: ${pic.license}`);
        assert.match(pic.page, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
        listed.add(path.basename(pic.src));
    }
    const dir = path.join(ROOT, 'public/images/list');
    const stored = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f !== '.gitkeep') : [];
    assert.deepEqual(stored.filter((f) => !listed.has(f)), []);

    const { artists: descriptions } = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/artists/descriptions.json'), 'utf8'));
    for (const [qid, byLang] of Object.entries(descriptions)) {
        assert.match(qid, /^Q\d+$/);
        for (const [lang, d] of Object.entries(byLang)) {
            assert.ok(['en', 'fr', 'es', 'pt', 'ar'].includes(lang), `${qid}: ${lang}`);
            assert.ok(d.length > 2 && d.length <= 120, `${qid} ${lang}`);
        }
    }
});
