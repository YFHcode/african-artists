import type { MetadataRoute } from 'next';

import { findEntry, indexablePaths } from '@/content/catalog';
import { artistPictures } from '@/lib/artist-images';
import { localePath } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/site';

/** The pictures an artist profile shows, for Google Images: portrait first, then the works. */
function imagesFor(path: string): string[] | undefined {
    const [, collection, slug, more] = path.split('/');
    if (collection !== 'artists' || !slug || more) return undefined;
    const pictures = artistPictures(findEntry('artists', slug)?.qid);
    if (!pictures) return undefined;
    return [pictures.portrait, ...pictures.works].flatMap((p) => (p ? [absoluteUrl(p.src)] : []));
}

/**
 * Every indexable page in each edition it exists in, with the date its content last
 * changed, and on artist profiles the pictures they show. hreflang is declared in
 * each page's <head>, not here: one method, used consistently.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    return indexablePaths().flatMap(({ path, updated, locales }) => {
        const images = imagesFor(path);
        return locales.map((locale) => ({
            url: absoluteUrl(localePath(locale, path)),
            lastModified: updated,
            ...(images?.length ? { images } : {}),
        }));
    });
}
