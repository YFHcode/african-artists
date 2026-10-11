// Content integrity: every article exists in each edition it declares (English
// always), with the fields the templates need; every internal link points at a
// page that exists in the same edition; hubs have their introductions and
// enough artists. Run: npm test
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import { CATALOG, REGIONS, STATIC_PAGES, entryPath, indexablePaths, localesOf, regionOf } from '../src/content/catalog.ts';
import {
    COUNTRY_SLUGS,
    HUBS,
    HUB_MIN_SIZE,
    MEDIA,
    MEDIUM_SLUGS,
    OCCUPATION_MEDIUM,
    WIKIDATA_COUNTRIES,
    hubContentDir,
    hubIncludes,
    hubKind,
    hubPath,
    releasedHubs,
} from '../src/content/hubs.ts';
import { ORIGINAL_ARTISTS, ROSTER } from '../src/content/roster.ts';
import { WAVES } from '../src/content/waves.ts';
import { parseFrontmatter } from '../src/lib/frontmatter.ts';
import { LOCALES } from '../src/lib/i18n.ts';

const ROOT = path.join(import.meta.dirname, '..', 'content');
const DATA = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, '..', 'data', 'artists', 'artists.json'), 'utf8')).artists;
const PAGES = ['index-art-forms', 'index-artists', 'index-movements', 'index-regions', 'index-music', 'index-guides', 'about', 'privacy'];

/** Every path that exists in one edition. */
function knownIn(locale) {
    return new Set([
        ...STATIC_PAGES.map((p) => p.path),
        ...CATALOG.filter((e) => localesOf(e).includes(locale)).map(entryPath),
        ...releasedHubs().filter((h) => h.locales.includes(locale)).map(hubPath),
    ]);
}
const known = knownIn('en');

/** [file segments, locale] for every article edition, page and released hub introduction. */
const ALL_FILES = [
    ...CATALOG.flatMap((e) => localesOf(e).map((l) => [[e.collection, e.slug, `${l}.md`], l])),
    ...PAGES.flatMap((p) => LOCALES.map((l) => [['pages', p, `${l}.md`], l])),
    ...releasedHubs().flatMap((h) => h.locales.map((l) => [[...hubContentDir(h), `${l}.md`], l])),
];

const words = (text) => text.split(/\s+/).filter(Boolean).length;

const PROFILED = new Set([...Object.values(ORIGINAL_ARTISTS).map((o) => o.qid), ...ROSTER.map((r) => r.qid)]);
const CORRECTIONS = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, '..', 'data', 'artists', 'corrections.json'), 'utf8'));
const bornOf = (a) => (CORRECTIONS[a.qid] && 'birthYear' in CORRECTIONS[a.qid] ? CORRECTIONS[a.qid].birthYear : a.birthYear) ?? null;
const EXCLUDED = new Set(fs.readFileSync(path.join(import.meta.dirname, '..', 'data', 'artists', 'exclude.txt'), 'utf8').split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean));

/** The artists a hub lists, as the site computes them (src/lib/artist-data.ts). */
function hubMembers(hub) {
    return DATA.filter(
        (a) =>
            (a.tier === 'page' || a.tier === 'list' || PROFILED.has(a.qid)) &&
            !EXCLUDED.has(a.qid) &&
            !/^Q\d+$/.test(a.name) &&
            (!hub.country || a.countries.some((c) => WIKIDATA_COUNTRIES[c] === hub.country)) &&
            (!hub.medium || a.occupations.some((o) => OCCUPATION_MEDIUM[o] === hub.medium)) &&
            (!hub.bornFrom || (bornOf(a) !== null && bornOf(a) >= hub.bornFrom))
    );
}

function read(...segments) {
    const file = path.join(ROOT, ...segments);
    return { file, ...parseFrontmatter(fs.readFileSync(file, 'utf8'), file) };
}

function internalLinks(body) {
    return [...body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1].split('#')[0] || '/');
}

test('the catalog is not empty and slugs are unique', () => {
    assert.ok(CATALOG.length >= 30, `only ${CATALOG.length} entries`);
    const keys = CATALOG.map((e) => `${e.collection}/${e.slug}`);
    assert.equal(new Set(keys).size, keys.length);
});

test('every article exists in each edition it declares, English included, with the required fields', () => {
    for (const entry of CATALOG) {
        const locales = localesOf(entry);
        assert.ok(locales.includes('en'), `${entry.slug}: every article needs an English edition`);
        const dir = path.join(ROOT, entry.collection, entry.slug);
        const stray = fs.readdirSync(dir).filter((f) => f.endsWith('.md') && !locales.includes(f.slice(0, -3)));
        assert.deepEqual(stray, [], `${entry.slug}: files for editions it does not declare`);
        const factCounts = new Set();
        for (const locale of locales) {
            const { file, data, body } = read(entry.collection, entry.slug, `${locale}.md`);
            for (const key of ['title', 'label', 'heading', 'kicker', 'description', 'summary']) {
                assert.ok(typeof data[key] === 'string' && data[key].length > 0, `${file}: missing ${key}`);
            }
            // A short profile is about 200 words written once; everything else is a full article.
            const min = entry.kind === 'short' ? 700 : 1500;
            assert.ok(body.length > min, `${file}: body is only ${body.length} characters`);
            factCounts.add(Array.isArray(data.facts) ? data.facts.length : 0);
        }
        assert.equal(factCounts.size, 1, `${entry.slug}: editions disagree on the number of facts`);
    }
});

test('every page exists in every edition', () => {
    for (const page of PAGES) {
        for (const locale of LOCALES) {
            const { file, data } = read('pages', page, `${locale}.md`);
            for (const key of ['title', 'heading', 'description']) assert.ok(data[key], `${file}: missing ${key}`);
        }
    }
});

test('titles and descriptions fit in search results', () => {
    const problems = [];
    for (const [segments] of ALL_FILES) {
        const { file, data } = read(...segments);
        if (data.title.length > 75) problems.push(`${file}: title ${data.title.length} chars`);
        if (data.description.length > 185) problems.push(`${file}: description ${data.description.length} chars`);
    }
    assert.deepEqual(problems, []);
});

test('every internal link resolves to a page that exists in the same edition', () => {
    const broken = [];
    const knownBy = Object.fromEntries(LOCALES.map((l) => [l, knownIn(l)]));
    for (const [segments, locale] of ALL_FILES) {
        const { file, body } = read(...segments);
        for (const href of internalLinks(body)) if (!knownBy[locale].has(href)) broken.push(`${file}: ${href}`);
    }
    assert.deepEqual(broken, []);
});

test('the link checker catches a broken link (negative control)', () => {
    assert.deepEqual(internalLinks('see [x](/artists/nobody) and [y](/buy#offer)'), ['/artists/nobody', '/buy']);
    assert.ok(!known.has('/artists/nobody'));
});

test('related articles exist and are not self-references', () => {
    const keys = new Set(CATALOG.map((e) => `${e.collection}/${e.slug}`));
    for (const entry of CATALOG) {
        for (const key of entry.related) {
            assert.ok(keys.has(key), `${entry.slug}: related ${key} does not exist`);
            assert.notEqual(key, `${entry.collection}/${entry.slug}`);
        }
    }
});

test('every full article is linked from three other articles; every short profile is on a hub', () => {
    const inbound = new Map(CATALOG.map((e) => [entryPath(e), new Set()]));
    for (const entry of CATALOG) {
        const { body } = read(entry.collection, entry.slug, 'en.md');
        for (const href of internalLinks(body)) {
            if (inbound.has(href) && href !== entryPath(entry)) inbound.get(href).add(entry.slug);
        }
    }
    const weak = CATALOG.filter((e) => e.kind !== 'short')
        .filter((e) => inbound.get(entryPath(e)).size < 3)
        .map((e) => `${entryPath(e)} (${inbound.get(entryPath(e)).size})`);
    assert.deepEqual(weak, []);

    const hubs = releasedHubs();
    const unlisted = CATALOG.filter((e) => e.kind === 'short')
        .filter((e) => {
            const born = ROSTER.find((r) => r.qid === e.qid)?.born ?? null;
            return !hubs.some((h) => hubIncludes(h, { countries: e.countries, media: e.media ?? [], born }));
        })
        .map(entryPath);
    assert.deepEqual(unlisted, [], 'short profiles that no released hub lists');
});

test('every country belongs to exactly one region, and every region has a page', () => {
    const regionPages = new Set(CATALOG.filter((e) => e.collection === 'regions').map((e) => e.slug));
    assert.deepEqual([...regionPages].sort(), Object.keys(REGIONS).sort());
    const counts = new Map();
    for (const countries of Object.values(REGIONS)) for (const c of countries) counts.set(c, (counts.get(c) ?? 0) + 1);
    assert.deepEqual([...counts].filter(([, n]) => n > 1), []);
    const orphans = CATALOG.flatMap((e) => e.countries.filter((c) => !regionOf(c)).map((c) => `${e.slug}: ${c}`));
    assert.deepEqual(orphans, []);
});

test('no placeholder text ships', () => {
    const hits = [];
    for (const dir of fs.readdirSync(ROOT, { recursive: true })) {
        const file = path.join(ROOT, dir);
        if (!file.endsWith('.md')) continue;
        const text = fs.readFileSync(file, 'utf8');
        // Case-sensitive on purpose: Portuguese "todo" means "all".
        if (/\b(STUB|TODO|TBD)\b/.test(text) || /lorem ipsum/i.test(text)) hits.push(file);
    }
    assert.deepEqual(hits, []);
});

test('released hubs have an introduction in each of their editions and enough artists', () => {
    for (const hub of releasedHubs()) {
        for (const locale of hub.locales) {
            const { file, data, body } = read(...hubContentDir(hub), `${locale}.md`);
            for (const key of ['title', 'label', 'heading', 'description']) assert.ok(data[key], `${file}: missing ${key}`);
            assert.ok(words(body) >= 80, `${file}: introduction is only ${words(body)} words`);
        }
        const size = hubMembers(hub).length;
        assert.ok(size >= HUB_MIN_SIZE[hubKind(hub)], `${hubPath(hub)}: only ${size} artists`);
    }
});

test('hub definitions are unique, routable and start in English', () => {
    const paths = HUBS.map(hubPath);
    assert.equal(new Set(paths).size, paths.length);
    for (const hub of HUBS) {
        assert.ok(hub.locales.includes('en'), `${hubPath(hub)}: no English edition`);
        if (hub.country) assert.ok(COUNTRY_SLUGS[hub.country], `${hub.country}: no URL slug`);
        if (hub.medium) assert.ok(MEDIUM_SLUGS[hub.medium], `${hub.medium}: no URL slug`);
        assert.ok(hub.wave in WAVES, `${hubPath(hub)}: unknown wave ${hub.wave}`);
    }
});

test('the roster is consistent with the data and the catalog', () => {
    const slugs = [...Object.keys(ORIGINAL_ARTISTS), ...ROSTER.map((r) => r.slug)];
    assert.equal(new Set(slugs).size, slugs.length, 'duplicate artist slug');
    assert.ok(!slugs.includes('country') && !slugs.includes('medium'), 'a slug would shadow the hub routes');
    const qids = [...Object.values(ORIGINAL_ARTISTS).map((o) => o.qid), ...ROSTER.map((r) => r.qid)];
    assert.equal(new Set(qids).size, qids.length, 'duplicate Wikidata item');
    const inData = new Set(DATA.map((a) => a.qid));
    for (const r of ROSTER) {
        assert.ok(inData.has(r.qid), `${r.slug}: ${r.qid} is not in data/artists`);
        assert.ok(r.locales.includes('en'), `${r.slug}: no English edition`);
        assert.ok(r.wave in WAVES, `${r.slug}: unknown wave ${r.wave}`);
        assert.ok(r.countries.length > 0 && r.countries.every((c) => regionOf(c)), `${r.slug}: country without a region`);
        assert.ok(r.media.length > 0 && r.media.every((m) => MEDIA.includes(m)), `${r.slug}: bad media`);
    }
});

test('every country in the data maps to a code with a region', () => {
    const missing = [...new Set(DATA.flatMap((a) => a.countries))].filter((c) => !WIKIDATA_COUNTRIES[c] || !regionOf(WIKIDATA_COUNTRIES[c]));
    assert.deepEqual(missing, []);
});

test('the sitemap lists each path once, only in editions that exist', () => {
    const paths = indexablePaths();
    assert.equal(new Set(paths.map((p) => p.path)).size, paths.length);
    for (const p of paths) assert.ok(p.locales.includes('en'), `${p.path}: no English edition`);
});

test('with every wave previewed, roster profiles join the catalog with valid related links', () => {
    // A fresh process, because the wave switch is read when the catalog loads.
    const script = `
        const { CATALOG, entryPath } = await import('./src/content/catalog.ts');
        const keys = new Set(CATALOG.map((e) => e.collection + '/' + e.slug));
        const bad = CATALOG.flatMap((e) => e.related.filter((k) => !keys.has(k) || k === e.collection + '/' + e.slug).map((k) => entryPath(e) + ' -> ' + k));
        console.log(JSON.stringify({ artists: CATALOG.filter((e) => e.collection === 'artists').length, bad }));
    `;
    const out = execFileSync(process.execPath, ['--input-type=module', '-e', script], {
        cwd: path.join(import.meta.dirname, '..'),
        env: { ...process.env, NEXT_PUBLIC_PREVIEW_WAVE: '7' },
        encoding: 'utf8',
    });
    const { artists, bad } = JSON.parse(out.trim().split('\n').at(-1));
    assert.equal(artists, Object.keys(ORIGINAL_ARTISTS).length + ROSTER.length);
    assert.deepEqual(bad, []);
});
