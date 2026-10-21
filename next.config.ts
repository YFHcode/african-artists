import type { NextConfig } from 'next';

import { PREFIXED_LOCALES } from './src/lib/i18n';
import { SITE_URL } from './src/lib/site';

/**
 * Routing for four editions served from one route tree.
 *
 * Every page lives under app/[locale]/. The French, Portuguese and Arabic
 * editions are reached directly (/fr/…, /pt/…, /ar/…). The English edition is
 * served at the root: an afterFiles rewrite maps /artists to /en/artists, and
 * a redirect sends anyone who types /en/artists back to /artists, so each
 * English page has one public URL and the /en/ form never competes with it.
 *
 * afterFiles, not beforeFiles: static files, /api routes and the metadata
 * routes (robots.txt, sitemap.xml, llms.txt, icons) are matched first and
 * never rewritten. Redirects are evaluated on the incoming URL only, so the
 * internal /en/… destination of the rewrite does not loop back through them.
 *
 * /api/ is excluded as well. Next.js matches dynamic routes (like
 * /api/search/[locale]) after the afterFiles rewrites, so without the
 * exclusion /api/search/fr would be rewritten to /en/api/search/fr and 404;
 * non-dynamic routes such as /api/offer were never affected.
 *
 * /_vercel/ is excluded too: Vercel Web Analytics loads /_vercel/insights/script.js
 * and posts page views to /_vercel/insights/view, and those must reach Vercel,
 * not /en/_vercel/… and a 404.
 *
 * The lookahead must end in (?:/|$), not $ alone: the parameter's pattern is
 * embedded in a regex over the whole path, so a bare $ means "end of URL" and
 * would only exclude /fr itself — /fr/artists/… would be rewritten to
 * /en/fr/artists/… and 404.
 */
const notAnotherEdition = `(?!(?:${[...PREFIXED_LOCALES, 'api', '_vercel'].join('|')})(?:/|$))[^/]+`;

const nextConfig: NextConfig = {
    poweredByHeader: false,

    // app/global-not-found.tsx — see the note at the top of that file.
    experimental: { globalNotFound: true },

    async redirects() {
        const rules = [
            { source: '/en', destination: '/', permanent: true },
            { source: '/en/:path*', destination: '/:path*', permanent: true },
        ];

        // No www <-> bare-domain redirect here: that belongs to Vercel's domain
        // settings (README, "Domain"). A rule here cannot see which way Vercel
        // redirects, and when the two point opposite ways every page loops
        // (ERR_TOO_MANY_REDIRECTS), as happened in October 2026.

        // The production deployment also answers on <project>.vercel.app — a
        // full duplicate of the site on another host. Send it to the real one.
        // Preview deployments keep their own hosts (Vercel marks them noindex).
        if (process.env.VERCEL_ENV === 'production') {
            rules.unshift({
                source: '/:path*',
                has: [{ type: 'host', value: '.+\\.vercel\\.app' }],
                destination: `${SITE_URL}/:path*`,
                permanent: true,
            } as (typeof rules)[number]);
        }

        return rules;
    },

    async rewrites() {
        return {
            beforeFiles: [],
            afterFiles: [
                { source: '/', destination: '/en' },
                { source: `/:first(${notAnotherEdition})/:rest*`, destination: '/en/:first/:rest*' },
            ],
            fallback: [],
        };
    },

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                    { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
                ],
            },
            // Files in public/ are revalidated on every visit by default. The fonts
            // never change under the same name (rename a file to replace it); the
            // artist pictures may, at the monthly refresh.
            {
                source: '/fonts/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            {
                source: '/images/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
            },
        ];
    },
};

export default nextConfig;
