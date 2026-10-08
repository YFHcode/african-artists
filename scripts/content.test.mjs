// Content integrity: every article exists in every edition, with the fields
// the templates need, and every internal link points at a page that exists.
// Run: npm test
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import { CATALOG, REGIONS, STATIC_PAGES, entryPath, regionOf } from '../src/content/catalog.ts';
import { parseFrontmatter } from '../src/lib/frontmatter.ts';
import { LOCALES } from '../src/lib/i18n.ts';

const ROOT = path.join(import.meta.dirname, '..', 'content');
const PAGES = ['index-art-forms', 'index-artists', 'index-movements', 'index-regions', 'index-music', 'index-guides', 'about', 'privacy'];

const known = new Set([...STATIC_PAGES.map((p) => p.path), ...CATALOG.map(entryPath)]);

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

test('every article exists in every edition with the required fields', () => {
    for (const entry of CATALOG) {
        const factCounts = new Set();
        for (const locale of LOCALES) {
            const { file, data, body } = read(entry.collection, entry.slug, `${locale}.md`);
            for (const key of ['title', 'label', 'heading', 'kicker', 'description', 'summary']) {
                assert.ok(typeof data[key] === 'string' && data[key].length > 0, `${file}: missing ${key}`);
            }
            assert.ok(body.length > 1500, `${file}: body is only ${body.length} characters`);
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
    const files = [
        ...CATALOG.flatMap((e) => LOCALES.map((l) => [e.collection, e.slug, `${l}.md`])),
        ...PAGES.flatMap((p) => LOCALES.map((l) => ['pages', p, `${l}.md`])),
    ];
    for (const segments of files) {
        const { file, data } = read(...segments);
        if (data.title.length > 75) problems.push(`${file}: title ${data.title.length} chars`);
        if (data.description.length > 185) problems.push(`${file}: description ${data.description.length} chars`);
    }
    assert.deepEqual(problems, []);
});

test('every internal link resolves to a page that exists', () => {
    const broken = [];
    for (const segments of [
        ...CATALOG.flatMap((e) => LOCALES.map((l) => [e.collection, e.slug, `${l}.md`])),
        ...PAGES.flatMap((p) => LOCALES.map((l) => ['pages', p, `${l}.md`])),
    ]) {
        const { file, body } = read(...segments);
        for (const href of internalLinks(body)) if (!known.has(href)) broken.push(`${file}: ${href}`);
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

test('every article is linked from at least three other articles\' bodies', () => {
    const inbound = new Map(CATALOG.map((e) => [entryPath(e), new Set()]));
    for (const entry of CATALOG) {
        const { body } = read(entry.collection, entry.slug, 'en.md');
        for (const href of internalLinks(body)) {
            if (inbound.has(href) && href !== entryPath(entry)) inbound.get(href).add(entry.slug);
        }
    }
    const weak = [...inbound].filter(([, from]) => from.size < 3).map(([p, from]) => `${p} (${from.size})`);
    assert.deepEqual(weak, []);
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
