import type { Metadata } from 'next';

import { DEFAULT_LOCALE, LOCALES, LOCALE_INFO, type Locale, localePath } from '@/lib/i18n';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

/**
 * Per-page metadata. Every page goes through this helper, and the helper sets
 * every field it takes ownership of — title, description, canonical,
 * hreflang, Open Graph (with its image), Twitter and robots — because Next.js
 * replaces, rather than merges, an `openGraph` object a page declares. A
 * helper that declared Open Graph without an image would silently strip the
 * image from every page.
 */

export interface PageMetaInput {
    locale: Locale;
    /** Edition-independent path: '/', '/artists/el-anatsui'. */
    path: string;
    title: string;
    description: string;
    /** The home page names the site itself, so it skips the " | AfricanArtists.com" suffix. */
    absoluteTitle?: boolean;
    noindex?: boolean;
    article?: { published: string; modified: string };
    ogAlt: string;
}

/** Every edition of a page, plus x-default, as absolute URLs. */
export function alternateUrls(path: string): Record<string, string> {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) languages[LOCALE_INFO[locale].lang] = absoluteUrl(localePath(locale, path));
    languages['x-default'] = absoluteUrl(localePath(DEFAULT_LOCALE, path));
    return languages;
}

export function ogImage(locale: Locale): string {
    return absoluteUrl(`/og/${locale}.png`);
}

export function pageMetadata(input: PageMetaInput): Metadata {
    const { locale, path, title, description, absoluteTitle, noindex, article, ogAlt } = input;
    const url = absoluteUrl(localePath(locale, path));
    const image = { url: ogImage(locale), width: 1200, height: 630, alt: ogAlt };

    return {
        title: absoluteTitle ? { absolute: title } : title,
        description,
        alternates: {
            canonical: url,
            // A noindex page is not part of a cluster: hreflang to it would
            // point search engines at pages they are told not to index.
            languages: noindex ? undefined : alternateUrls(path),
        },
        openGraph: {
            type: article ? 'article' : 'website',
            url,
            title,
            description,
            siteName: SITE_NAME,
            locale: LOCALE_INFO[locale].ogLocale,
            alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_INFO[l].ogLocale),
            images: [image],
            ...(article ? { publishedTime: article.published, modifiedTime: article.modified } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [{ url: image.url, alt: ogAlt }],
        },
        robots: noindex
            ? { index: false, follow: true }
            : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    };
}
