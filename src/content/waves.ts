/**
 * The artist pages are released in waves (docs/artist-pages-rollout.md).
 * A wave is public once it has a release date here; until then its profiles
 * and hubs are not built, not linked and not in the sitemap.
 *
 * To preview unreleased waves, build with NEXT_PUBLIC_PREVIEW_WAVE=<n>: every
 * wave up to n is built, dated today. Set it on Vercel's Preview environment
 * only (preview deployments are noindex), never on Production.
 *
 * Free of runtime imports so the content tests and the browser can load it.
 */

export const WAVES: Record<number, string | null> = {
    1: '2026-10-11',
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
};

const PREVIEW_WAVE = Number(process.env.NEXT_PUBLIC_PREVIEW_WAVE || 0);
const TODAY = new Date().toISOString().slice(0, 10);

/** Wave 0 is everything published before the waves began. */
export function isReleased(wave: number): boolean {
    return wave === 0 || Boolean(WAVES[wave]) || wave <= PREVIEW_WAVE;
}

/** The date a released wave went live (today, for a preview). */
export function releaseDate(wave: number): string {
    const date = WAVES[wave] ?? (wave <= PREVIEW_WAVE ? TODAY : null);
    if (!date) throw new Error(`wave ${wave} is not released`);
    return date;
}
