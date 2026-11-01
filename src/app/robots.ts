import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';

/**
 * Everything is open to every crawler, AI and SEO-tool crawlers included:
 * this is a site whose job is to be found, and the people valuing a domain
 * look at what those tools report about it. The pages are prerendered, so
 * crawling them costs next to nothing.
 *
 * Closed: the offer form endpoint, and the per-edition search indexes, which
 * are only fetched when someone searches and are not pages. Open: the locator
 * maps under /api/map/, which pages show as images; blocking them left crawlers
 * rendering pages with a missing resource (a Semrush Site Audit warning on 66
 * pages in November 2026).
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: '*', allow: '/', disallow: ['/api/offer', '/api/search/'] }],
        sitemap: absoluteUrl('/sitemap.xml'),
    };
}
