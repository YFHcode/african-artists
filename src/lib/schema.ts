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

/** For artist profiles: the person the article is about, tied to Wikidata and Wikipedia. */
export interface PersonFacts {
    sameAs: string[];
    birthDate?: string;
    deathDate?: string;
    /** Site path of a portrait. */
    image?: string;
}

export function articleSchema(article: Article, path: string, person?: PersonFacts): Json {
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
        ...(article.entry.collection === 'artists'
            ? {
                  about: {
                      '@type': 'Person',
                      name: article.label,
                      ...(person?.sameAs.length ? { sameAs: person.sameAs } : {}),
                      ...(person?.birthDate ? { birthDate: person.birthDate } : {}),
                      ...(person?.deathDate ? { deathDate: person.deathDate } : {}),
                      ...(person?.image ? { image: absoluteUrl(person.image) } : {}),
                  },
              }
            : {}),
    };
}

/** A list item is a page on this site (`path`) or elsewhere (`url`, e.g. Wikipedia for artists without a profile). */
export function collectionSchema(
    locale: Locale,
    path: string,
    name: string,
    description: string,
    items: ({ name: string; path: string } | { name: string; url: string })[]
): Json {
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
                url: 'url' in item ? item.url : absoluteUrl(localePath(locale, item.path)),
            })),
        },
    };
}
