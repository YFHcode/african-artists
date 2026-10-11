import type { MetadataRoute } from 'next';

import { indexablePaths } from '@/content/catalog';
import { localePath } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/site';

/**
 * Every indexable page in each edition it exists in, with the date its content last
 * changed. hreflang is declared in each page's <head>, not here: one method,
 * used consistently.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    return indexablePaths().flatMap(({ path, updated, locales }) =>
        locales.map((locale) => ({ url: absoluteUrl(localePath(locale, path)), lastModified: updated }))
    );
}
