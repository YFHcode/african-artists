import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';

/**
 * Everything is open to every crawler, AI and SEO-tool crawlers included:
 * this is a site whose job is to be found, and the people valuing a domain
 * look at what those tools report about it. The pages are prerendered, so
 * crawling them costs next to nothing. Only the form endpoint is closed.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
        sitemap: absoluteUrl('/sitemap.xml'),
    };
}
