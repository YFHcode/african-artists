// URL helpers for the five editions. Run: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { LOCALES, localePath, splitLocalePath, toLocale } from '../src/lib/i18n.ts';

test('English is unprefixed, other editions use a folder', () => {
    assert.equal(localePath('en', '/'), '/');
    assert.equal(localePath('en', '/artists/el-anatsui'), '/artists/el-anatsui');
    assert.equal(localePath('fr', '/'), '/fr');
    assert.equal(localePath('ar', '/music/rai'), '/ar/music/rai');
    assert.equal(localePath('es', '/art-forms/kente-cloth'), '/es/art-forms/kente-cloth');
    assert.throws(() => localePath('fr', 'artists'));
});

test('toLocale returns the LOCALES constant itself, and nothing for anything else', () => {
    for (const locale of LOCALES) {
        // A string built at runtime, as Next.js builds route params from the URL.
        const built = `/${locale}/x`.split('/')[1];
        assert.equal(LOCALES.indexOf(toLocale(built)), LOCALES.indexOf(locale));
        assert.equal(localePath(toLocale(built), '/artists'), localePath(locale, '/artists'));
    }
    for (const bad of ['EN', 'en-US', '', 'api', undefined, null, 1, ['en']]) assert.equal(toLocale(bad), undefined);
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
