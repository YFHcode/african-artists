// Pure helpers for scripts/place-images.mjs, tested in place-images.test.mjs.

/** Pictures kept per page, at most, unless the page's config says otherwise. */
export const DEFAULT_MAX = 3;

/** Width the stored copies are made at: a standard Wikimedia thumbnail step, sharp in a 3-column grid. */
export const PLACE_WIDTH = 800;

/** Originals narrower than this look soft once stored at PLACE_WIDTH. */
export const MIN_WIDTH = 900;

const EXTENSION = /\.(jpe?g|png)$/i;
// Wikipedia articles list logos, flags, maps, scanned documents and icons
// among their files; none of them is a photograph of a place.
const NOT_A_PHOTO =
    /(logo|flag|icon|map|locator|coat[ _]of|seal|signature|symbol|plan\b|diagram|chart|stamp|banknote|poster|affiche|screenshot|ambox|stub|question|disambig|wikidata|commons-|portal|location|blason|carte|drapeau|armoiries)/i;

/** True for a Commons file name that could be a photograph: not an SVG, logo, flag, map, icon or the like. */
export function isCandidateName(name) {
    return EXTENSION.test(name) && !NOT_A_PHOTO.test(name);
}

/** Wide enough to be sharp, and a shape that sits in a grid: not a strip, not a tall column. */
export function fitsGrid(width, height) {
    if (!width || !height || width < MIN_WIDTH) return false;
    const ratio = width / height;
    return ratio >= 0.9 && ratio <= 2.2;
}

/** A page spec "fr:Gorée" or "Gorée" (English): { lang, title }. */
export function parsePageSpec(spec) {
    const m = /^([a-z]{2,3}):(.+)$/.exec(spec);
    return m ? { lang: m[1], title: m[2] } : { lang: 'en', title: spec };
}

/** Commons file name with spaces, as the API reports it, from a stored or typed one. */
export function normalizeFile(name) {
    return String(name).replace(/^(File|Fichier):/i, '').replace(/_/g, ' ').trim();
}

/** The stored file name of the nth picture of a page key such as "guides/dakar-biennale". */
export function placeStoredName(key, n) {
    return `${key.replace('/', '-')}-${n}.webp`;
}
