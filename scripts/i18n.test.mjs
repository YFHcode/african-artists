// URL helpers for the five editions. Run: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { LOCALES, localePath, splitLocalePath } from '../src/lib/i18n.ts';

test('English is unprefixed, other editions use a folder', () => {
    assert.equal(localePath('en', '/'), '/');
    assert.equal(localePath('en', '/artists/el-anatsui'), '/artists/el-anatsui');
    assert.equal(localePath('fr', '/'), '/fr');
    assert.equal(localePath('ar', '/music/rai'), '/ar/music/rai');
    assert.equal(localePath('es', '/art-forms/kente-cloth'), '/es/art-forms/kente-cloth');
    assert.throws(() => localePath('fr', 'artists'));
});

test('splitLocalePath inverts localePath for every edition', () => {
    for (const locale of LOCALES) {
        for (const p of ['/', '/buy', '/artists/el-anatsui']) {
            assert.deepEqual(splitLocalePath(localePath(locale, p)), { locale, path: p });
        }
    }
});

test('a path that merely starts with a locale code is not an edition', () => {
    assert.deepEqual(splitLocalePath('/french'), { locale: 'en', path: '/french' });
    assert.deepEqual(splitLocalePath('/arts'), { locale: 'en', path: '/arts' });
    assert.deepEqual(splitLocalePath('/essays'), { locale: 'en', path: '/essays' });
});
