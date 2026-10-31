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
    /** Editions this page exists in, when not all five (some artist profiles and hubs). */
    locales?: readonly Locale[];
    /** Articles and hubs have their own share image (app/share); other pages use the site card. */
    shareCard?: boolean;
}

/** Every edition of a page, plus x-default (English, which every page has), as absolute URLs. */
export function alternateUrls(path: string, locales: readonly Locale[] = LOCALES): Record<string, string> {
    const languages: Record<string, string> = {};
    for (const locale of locales) languages[LOCALE_INFO[locale].lang] = absoluteUrl(localePath(locale, path));
    languages['x-default'] = absoluteUrl(localePath(DEFAULT_LOCALE, path));
    return languages;
}

/**
 * Results show roughly 60 characters of a title, and Google prints the site
 * name above every result anyway. A title that would run past that with the
 * " | AfricanArtists.com" suffix drops the suffix, so the cut falls on nothing
 * (or on the title's last words) rather than always on its own last words.
 */
const MAX_TITLE = 60;
const SUFFIX = ` | ${SITE_NAME}`;

export function documentTitle(title: string, absolute = false): string {
    return absolute || title.length + SUFFIX.length > MAX_TITLE ? title : title + SUFFIX;
}

export function ogImage(locale: Locale): string {
    return absoluteUrl(`/og/${locale}.png`);
}

/** The share image of an article or hub in one edition (app/share/[locale]/[...path]). */
export function shareCardUrl(locale: Locale, path: string): string {
    return absoluteUrl(`/share/${locale}${path}.png`);
}

export function pageMetadata(input: PageMetaInput): Metadata {
    const { locale, path, title, description, absoluteTitle, noindex, article, ogAlt, locales = LOCALES, shareCard } = input;
    const url = absoluteUrl(localePath(locale, path));
    const image = { url: shareCard ? shareCardUrl(locale, path) : ogImage(locale), width: 1200, height: 630, alt: ogAlt };

    return {
        title: { absolute: documentTitle(title, absoluteTitle) },
        description,
        alternates: {
            canonical: url,
            // A noindex page is not part of a cluster: hreflang to it would
            // point search engines at pages they are told not to index.
            languages: noindex ? undefined : alternateUrls(path, locales),
        },
        openGraph: {
            type: article ? 'article' : 'website',
            url,
            title,
            description,
            siteName: SITE_NAME,
            locale: LOCALE_INFO[locale].ogLocale,
            alternateLocale: locales.filter((l) => l !== locale).map((l) => LOCALE_INFO[l].ogLocale),
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
