/**
 * Decorative pattern compositions, different for every page.
 *
 * The site shows no photographs of artworks — those belong to the artists and
 * their estates — so pages get colour and rhythm from geometric patterns
 * instead. Everything here only picks class names from the pattern library
 * (src/lib/motifs.ts, compiled to src/app/motifs.css), seeded by the page's
 * slug, so a page always looks the same, neighbours rarely match, and the
 * HTML carries no SVG. Purely decorative: aria-hidden, no text.
 *
 * Motion lives in globals.css and applies only when the reader has not asked
 * for reduced motion.
 */

import type { CSSProperties } from 'react';

import { quilt, weave } from '@/lib/motifs';

/** A strip-weave: wide patterned strips side by side with narrow accents between them. */
export function Motif({ seed, className = '' }: { seed: string; className?: string }) {
    return (
        <div aria-hidden="true" className={`mtf-weave ${className}`}>
            {weave(seed).map((strip, i) => (
                <span key={i} className={`mtf-strip ${strip.motif}${strip.reverse ? ' mtf-rev' : ''}`} style={{ flexGrow: strip.grow }} />
            ))}
        </div>
    );
}

/**
 * A quilt of square tiles. With `animate`, the tiles weave in one after the
 * other when the page loads and a few drift slowly afterwards.
 */
export function MotifQuilt({ seed, count, className = '', animate = false }: { seed: string; count: number; className?: string; animate?: boolean }) {
    return (
        <div aria-hidden="true" className={`mtf-quilt ${className}`}>
            {quilt(seed, count).map((motif, i) => (
                <span
                    key={i}
                    className={`mtf-tile ${motif}${animate ? ' mtf-weave-in' : ''}${animate && i % 5 === 2 ? ' mtf-drift' : ''}${i % 2 ? ' mtf-rev' : ''}`}
                    style={animate ? ({ animationDelay: `${(i % 4) * 70 + Math.floor(i / 4) * 90}ms` } as CSSProperties) : undefined}
                />
            ))}
        </div>
    );
}

/** Three thin rows of pattern drifting at different speeds, like threads on a loom. */
export function LoomBand({ seed, className = '' }: { seed: string; className?: string }) {
    const [a, b, c] = quilt(seed, 3);
    return (
        <div aria-hidden="true" className={`mtf-loom ${className}`}>
            <span className={`mtf-drift ${a}`} style={{ '--mtf-speed': '90s' } as CSSProperties} />
            <span className={`mtf-drift mtf-rev ${b}`} style={{ '--mtf-speed': '70s' } as CSSProperties} />
            <span className={`mtf-drift ${c}`} style={{ '--mtf-speed': '110s' } as CSSProperties} />
        </div>
    );
}
