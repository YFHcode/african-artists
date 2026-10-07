/**
 * A decorative geometric band, different for every article.
 *
 * The site shows no photographs of artworks — those belong to the artists and
 * their estates — so cards get colour and rhythm from this instead. The
 * pattern and palette are derived from the slug, so a card always looks the
 * same and no two neighbours are likely to match. Purely decorative:
 * aria-hidden, no text.
 */

import type { ReactNode } from 'react';

const PALETTES = [
    ['#a63d16', '#e0a83a', '#1d1915'],
    ['#1f2a5c', '#e0a83a', '#fbf7f0'],
    ['#8a5a12', '#1f2a5c', '#f6dccd'],
    ['#1d1915', '#a63d16', '#efe6d6'],
    ['#2f5d50', '#e0a83a', '#1d1915'],
    ['#6b2a3a', '#e8c48a', '#1f2a5c'],
];

function hash(seed: string): number {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i += 1) {
        h ^= seed.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

export function Motif({ seed, className = '' }: { seed: string; className?: string }) {
    const h = hash(seed);
    const [a, b, c] = PALETTES[h % PALETTES.length];
    const kind = (h >>> 3) % 4;
    const id = `m${h.toString(36)}`;

    let tile: ReactNode;
    let size = 24;
    switch (kind) {
        case 0: // triangles
            tile = (
                <>
                    <rect width="24" height="24" fill={c} />
                    <path d="M0 24 L12 4 L24 24 Z" fill={a} />
                    <path d="M6 24 L12 14 L18 24 Z" fill={b} />
                </>
            );
            break;
        case 1: // stripes with dots
            size = 20;
            tile = (
                <>
                    <rect width="20" height="20" fill={a} />
                    <rect x="0" y="0" width="6" height="20" fill={c} />
                    <circle cx="13" cy="10" r="3" fill={b} />
                </>
            );
            break;
        case 2: // diamonds
            tile = (
                <>
                    <rect width="24" height="24" fill={b} />
                    <path d="M12 2 L22 12 L12 22 L2 12 Z" fill={a} />
                    <path d="M12 8 L16 12 L12 16 L8 12 Z" fill={c} />
                </>
            );
            break;
        default: // chevrons
            size = 16;
            tile = (
                <>
                    <rect width="16" height="16" fill={c} />
                    <path d="M0 10 L8 2 L16 10 L16 16 L8 8 L0 16 Z" fill={a} />
                    <rect y="14" width="16" height="2" fill={b} />
                </>
            );
    }

    return (
        <svg aria-hidden="true" focusable="false" className={className} preserveAspectRatio="none">
            <defs>
                <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
                    {tile}
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
    );
}
