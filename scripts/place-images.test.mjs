import assert from 'node:assert/strict';
import { test } from 'node:test';

import { fitsGrid, isCandidateName, normalizeFile, parsePageSpec, placeStoredName } from './place-images-lib.mjs';

test('only photographs are candidates', () => {
    assert.equal(isCandidateName('Musée des civilisations noires 02.jpg'), true);
    assert.equal(isCandidateName('Ile goree1.JPG'), true);
    for (const bad of ['Flag of Senegal.svg', 'Logo Dak\'Art.png', 'Dakar locator map.png', 'Commons-logo.svg', 'Biennale de Dakar affiche.jpg', 'Carte de Gorée.jpg', 'Plan.gif']) {
        assert.equal(isCandidateName(bad), false, bad);
    }
});

test('pictures must be wide enough and fit a grid', () => {
    assert.equal(fitsGrid(1600, 1000), true);
    assert.equal(fitsGrid(800, 600), false);
    assert.equal(fitsGrid(4000, 900), false);
    assert.equal(fitsGrid(1000, 2000), false);
    assert.equal(fitsGrid(0, 0), false);
});

test('page specs, file names and stored names', () => {
    assert.deepEqual(parsePageSpec('fr:Gorée'), { lang: 'fr', title: 'Gorée' });
    assert.deepEqual(parsePageSpec('Museum of Black Civilisations'), { lang: 'en', title: 'Museum of Black Civilisations' });
    assert.equal(normalizeFile('File:Ile_goree1.jpg'), 'Ile goree1.jpg');
    assert.equal(placeStoredName('guides/dakar-biennale', 2), 'guides-dakar-biennale-2.webp');
});
