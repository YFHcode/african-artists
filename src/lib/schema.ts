import type { Article } from '@/lib/content';
import { LOCALE_INFO, type Locale, localePath } from '@/lib/i18n';
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/site';

/**
 * JSON-LD builders. One connected graph: the Organization and WebSite are
 * defined once, in the layout, with an @id; pages refer to them by that id
 * instead of repeating them. Everything described here is visible on the
 * page it is attached to.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type Json = Record<string, unknown>;

export function siteSchema(locale: Locale): Json {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': ORGANIZATION_ID,
                name: SITE_NAME,
                url: SITE_URL,
                logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png'), width: 512, height: 512 },
            },
            {
                '@type': 'WebSite',
                '@id': WEBSITE_ID,
                name: SITE_NAME,
                alternateName: 'African Artists',
                url: SITE_URL,
                inLanguage: LOCALE_INFO[locale].lang,
                publisher: { '@id': ORGANIZATION_ID },
            },
        ],
    };
}

export function breadcrumbSchema(locale: Locale, trail: { name: string; path: string }[]): Json {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: crumb.name,
            item: absoluteUrl(localePath(locale, crumb.path)),
        })),
    };
}

export function articleSchema(article: Article, path: string): Json {
    const url = absoluteUrl(localePath(article.locale, path));
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.heading,
        description: article.description,
        url,
        mainEntityOfPage: url,
        inLanguage: LOCALE_INFO[article.locale].lang,
        datePublished: article.entry.published,
        dateModified: article.entry.updated,
        image: absoluteUrl(`/og/${article.locale}.png`),
        author: { '@id': ORGANIZATION_ID },
        publisher: { '@id': ORGANIZATION_ID },
        isPartOf: { '@id': WEBSITE_ID },
        ...(article.entry.collection === 'artists' ? { about: { '@type': 'Person', name: article.label } } : {}),
    };
}

export function collectionSchema(locale: Locale, path: string, name: string, description: string, items: { name: string; path: string }[]): Json {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name,
        description,
        url: absoluteUrl(localePath(locale, path)),
        inLanguage: LOCALE_INFO[locale].lang,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: items.length,
            itemListElement: items.map((item, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: item.name,
                url: absoluteUrl(localePath(locale, item.path)),
            })),
        },
    };
}
