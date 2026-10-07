/**
 * Site-wide constants. Free of runtime imports so tests can load it.
 */

/**
 * The canonical origin. Every canonical, hreflang, sitemap and Open Graph URL
 * is built from it, so it must be the host the site is actually served on —
 * set the same one as the primary domain in Vercel and redirect the other
 * (www or bare) to it.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://africanartists.com').replace(/\/+$/, '');

/** The domain as a name: what the site is called and what is for sale. */
export const SITE_NAME = 'AfricanArtists.com';

/**
 * Where to send buyers who prefer a marketplace (Afternic, Sedo, Dan.com…).
 * Both must be set for the button to appear; the page never shows a link to
 * a listing that was not configured.
 */
export const MARKETPLACE =
    process.env.NEXT_PUBLIC_MARKETPLACE_URL && process.env.NEXT_PUBLIC_MARKETPLACE_NAME
        ? { url: process.env.NEXT_PUBLIC_MARKETPLACE_URL, name: process.env.NEXT_PUBLIC_MARKETPLACE_NAME }
        : null;

/** Absolute URL for a public path. */
export function absoluteUrl(path: string): string {
    return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}
