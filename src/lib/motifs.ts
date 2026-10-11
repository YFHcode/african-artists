/**
 * The site's pattern library: palettes and repeating tiles, and the planner
 * that turns a page's slug into a composition. scripts/build-motifs.mjs
 * writes one CSS class per tile and palette (src/app/motifs.css); the
 * components only choose class names, so pages carry no SVG of their own.
 *
 * The shapes are plain geometry — stripes, steps, diamonds, zigzags, dot rows,
 * rings — in the site's earth palette. They do not copy any particular
 * textile, artwork or symbol.
 *
 * No imports: the build script, the tests and the components all load it.
 */

/** [ground, figure, accent]: the same palettes as before, plus two lighter ones. */
export const PALETTES: [string, string, string][] = [
    ['#a63d16', '#e0a83a', '#1d1915'], // clay, ochre, ink
    ['#1f2a5c', '#e0a83a', '#fbf7f0'], // indigo, ochre, paper
    ['#8a5a12', '#1f2a5c', '#f6dccd'], // umber, indigo, blush
    ['#1d1915', '#a63d16', '#efe6d6'], // ink, clay, linen
    ['#2f5d50', '#e0a83a', '#1d1915'], // green, ochre, ink
    ['#6b2a3a', '#e8c48a', '#1f2a5c'], // wine, sand, indigo
    ['#e0a83a', '#1d1915', '#a63d16'], // ochre, ink, clay
    ['#efe6d6', '#8a5a12', '#1d1915'], // linen, umber, ink
];

/** Tiles: [width, height, svg body(a, b, c)]. Each repeats seamlessly. */
export const TILES: [number, number, (a: string, b: string, c: string) => string][] = [
    // 0 triangles
    [24, 24, (a, b, c) => `<rect width="24" height="24" fill="${c}"/><path d="M0 24L12 4L24 24Z" fill="${a}"/><path d="M6 24L12 14L18 24Z" fill="${b}"/>`],
    // 1 stripe and dot
    [20, 20, (a, b, c) => `<rect width="20" height="20" fill="${a}"/><rect width="6" height="20" fill="${c}"/><circle cx="13" cy="10" r="3" fill="${b}"/>`],
    // 2 diamonds
    [24, 24, (a, b, c) => `<rect width="24" height="24" fill="${b}"/><path d="M12 2L22 12L12 22L2 12Z" fill="${a}"/><path d="M12 8L16 12L12 16L8 12Z" fill="${c}"/>`],
    // 3 chevrons
    [16, 16, (a, b, c) => `<rect width="16" height="16" fill="${c}"/><path d="M0 10L8 2L16 10L16 16L8 8L0 16Z" fill="${a}"/><rect y="14" width="16" height="2" fill="${b}"/>`],
    // 4 zigzag
    [24, 12, (a, b, c) => `<rect width="24" height="12" fill="${c}"/><path d="M0 9L6 3L12 9L18 3L24 9" fill="none" stroke="${a}" stroke-width="3"/><path d="M0 12L6 6L12 12L18 6L24 12" fill="none" stroke="${b}" stroke-width="1.2"/>`],
    // 5 blocks and bars (strip-woven cloth)
    [32, 16, (a, b, c) => `<rect width="32" height="16" fill="${a}"/><rect width="16" height="16" fill="${b}"/><rect x="16" y="3" width="16" height="2" fill="${c}"/><rect x="16" y="7" width="16" height="2" fill="${c}"/><rect x="16" y="11" width="16" height="2" fill="${c}"/><rect x="5" y="5" width="6" height="6" fill="${c}"/>`],
    // 6 rings
    [24, 24, (a, b, c) => `<rect width="24" height="24" fill="${b}"/><circle cx="12" cy="12" r="8" fill="none" stroke="${a}" stroke-width="3"/><circle cx="12" cy="12" r="2.5" fill="${c}"/>`],
    // 7 dot rows and dashes
    [24, 24, (a, b, c) => `<rect width="24" height="24" fill="${c}"/><circle cx="4" cy="6" r="1.8" fill="${b}"/><circle cx="12" cy="6" r="1.8" fill="${b}"/><circle cx="20" cy="6" r="1.8" fill="${b}"/><rect x="2" y="15" width="8" height="2" fill="${a}"/><rect x="14" y="15" width="8" height="2" fill="${a}"/>`],
    // 8 ladder
    [16, 16, (a, b, c) => `<rect width="16" height="16" fill="${a}"/><rect x="2" width="2" height="16" fill="${c}"/><rect x="12" width="2" height="16" fill="${c}"/><rect x="4" y="7" width="8" height="2" fill="${c}"/><circle cx="8" cy="3" r="1.5" fill="${b}"/>`],
    // 9 nested squares
    [20, 20, (a, b, c) => `<rect width="20" height="20" fill="${a}"/><rect x="4" y="4" width="12" height="12" fill="${b}"/><rect x="8" y="8" width="4" height="4" fill="${c}"/>`],
];

/** Thin, quiet tiles used for the narrow accent strips between wider ones. */
export const ACCENT_TILES = [1, 4, 8];


/** A small seeded random generator, so a slug always gives the same picture. */
export function seeded(seed: string): () => number {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i += 1) {
        h ^= seed.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    let s = h >>> 0;
    return () => {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export interface Strip {
    /** The CSS class of the tile: mtf-<tile>-<palette>. */
    motif: string;
    /** Relative width. */
    grow: number;
    /** Drift direction when the strip moves. */
    reverse: boolean;
}

/**
 * A strip-weave: wide patterned strips sewn side by side with narrow accent
 * strips between them, in one palette with a second for contrast. Three to
 * five wide strips; neighbours never repeat a tile.
 */
export function weave(seed: string): Strip[] {
    const random = seeded(seed);
    const pick = <T>(list: readonly T[]) => list[Math.floor(random() * list.length)];
    const main = Math.floor(random() * PALETTES.length);
    const second = (main + 1 + Math.floor(random() * (PALETTES.length - 1))) % PALETTES.length;
    const wide = 3 + Math.floor(random() * 3);
    const strips: Strip[] = [];
    let last = -1;
    for (let i = 0; i < wide; i += 1) {
        let tile = Math.floor(random() * TILES.length);
        if (tile === last) tile = (tile + 1) % TILES.length;
        last = tile;
        strips.push({ motif: `mtf-${tile}-${i % 2 === 0 ? main : second}`, grow: 3 + Math.floor(random() * 4), reverse: i % 2 === 1 });
        if (i < wide - 1) strips.push({ motif: `mtf-${pick(ACCENT_TILES)}-${second}`, grow: 1, reverse: i % 2 === 0 });
    }
    return strips;
}

/** A quilt: `count` tiles in a seeded sequence of tiles and palettes, no tile next to its twin. */
export function quilt(seed: string, count: number): string[] {
    const random = seeded(seed);
    const out: string[] = [];
    for (let i = 0; i < count; i += 1) {
        let motif: string;
        do motif = `mtf-${Math.floor(random() * TILES.length)}-${Math.floor(random() * PALETTES.length)}`;
        while (motif === out[i - 1]);
        out.push(motif);
    }
    return out;
}
