// The pattern library and the map (src/lib/motifs.ts, src/app/motifs.css,
// src/content/africa-map.ts). Run: npm test
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import { REGIONS } from '../src/content/catalog.ts';
import { AFRICA_COUNTRIES } from '../src/content/africa-map.ts';
import { ACCENT_TILES, PALETTES, TILES, quilt, weave } from '../src/lib/motifs.ts';
import { motifsCss } from './build-motifs.mjs';

const ROOT = path.join(import.meta.dirname, '..');
const css = fs.readFileSync(path.join(ROOT, 'src/app/motifs.css'), 'utf8');
const defined = new Set([...css.matchAll(/^\.(mtf-\d+-\d+)\{/gm)].map((m) => m[1]));

test('motifs.css is up to date with src/lib/motifs.ts', () => {
    assert.ok(motifsCss() === css, 'src/app/motifs.css is stale: run node scripts/build-motifs.mjs and commit the result');
    assert.equal(defined.size, TILES.length * PALETTES.length);
});

test('a slug always gives the same composition, and different slugs differ', () => {
    assert.deepEqual(weave('el-anatsui'), weave('el-anatsui'));
    assert.deepEqual(quilt('home', 16), quilt('home', 16));
    const slugs = ['el-anatsui', 'kente-cloth', 'baya', 'afrobeat', 'west-africa', 'chaibia-talal'];
    assert.equal(new Set(slugs.map((s) => JSON.stringify(weave(s)))).size, slugs.length);
});

test('every composition uses only classes the stylesheet defines', () => {
    for (let i = 0; i < 500; i += 1) {
        for (const strip of weave(`slug-${i}`)) assert.ok(defined.has(strip.motif), strip.motif);
        for (const motif of quilt(`seed-${i}`, 16)) assert.ok(defined.has(motif), motif);
    }
});

test('a weave alternates wide strips with narrow accents, and no neighbouring tiles repeat', () => {
    for (let i = 0; i < 500; i += 1) {
        const strips = weave(`slug-${i}`);
        const wide = strips.filter((_, j) => j % 2 === 0);
        assert.ok(wide.length >= 3 && wide.length <= 5);
        strips.forEach((s, j) => {
            if (j % 2 === 1) assert.ok(ACCENT_TILES.includes(Number(s.motif.split('-')[1])) && s.grow === 1);
        });
        for (let j = 1; j < wide.length; j += 1) assert.notEqual(wide[j].motif.split('-')[1], wide[j - 1].motif.split('-')[1]);
        const tiles = quilt(`seed-${i}`, 16);
        for (let j = 1; j < tiles.length; j += 1) assert.notEqual(tiles[j], tiles[j - 1]);
    }
});

test('the map draws every country the site tags, except islands below its scale', () => {
    const drawn = new Set(AFRICA_COUNTRIES.map((c) => c.code));
    const missing = Object.values(REGIONS).flat().filter((c) => !drawn.has(c));
    assert.deepEqual(missing.sort(), ['CV', 'MU']);
});

test('on the map, every tagged country sits in the region the site gives it', () => {
    for (const [region, codes] of Object.entries(REGIONS)) {
        for (const code of codes) {
            const country = AFRICA_COUNTRIES.find((c) => c.code === code);
            if (country) assert.equal(country.region, region, code);
        }
    }
    assert.equal(AFRICA_COUNTRIES.find((c) => c.code === 'EH').region, null, 'Western Sahara belongs to no region');
});

test('map paths are well formed and inside the view box', () => {
    for (const c of AFRICA_COUNTRIES) {
        assert.match(c.d, /^M[\d.,LZM-]+Z$/, c.code);
        const numbers = c.d.match(/-?\d+(\.\d+)?/g).map(Number);
        assert.ok(numbers.every((n) => n >= 0 && n <= 430), `${c.code} leaves the view box`);
    }
});
