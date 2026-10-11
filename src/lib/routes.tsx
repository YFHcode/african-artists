import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HubView } from '@/components/HubView';
import { ArticleView, CollectionView, TextPageView } from '@/components/Views';
import { dictionary } from '@/i18n';
import { type Collection, entriesIn, entryPath, isAvailable, localesOf } from '@/content/catalog';
import {
    COUNTRY_SLUGS,
    type HubKind,
    MEDIUM_SLUGS,
    contemporaryHub,
    countryBySlug,
    findHub,
    hubKind,
    hubPath,
    liveHubs,
    mediumBySlug,
    releasedHubs,
} from '@/content/hubs';
import { getArticle, getHubPage, getPage } from '@/lib/content';
import { type Locale, toLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

/**
 * The route files under app/[locale]/ are one-liners over these factories:
 * six collections share one article template and one index template, and
 * keeping the logic here means a fix lands on all of them at once.
 *
 * Each route file still declares `dynamicParams = false` itself — Next.js
 * reads segment config statically from the route file — so an unknown slug
 * is a 404 at the routing layer rather than a page rendered on demand.
 */

type LocaleParams = { params: Promise<{ locale: string }> };
type SlugParams = { params: Promise<{ locale: string; slug: string }> };

function requireLocale(value: string): Locale {
    return toLocale(value) ?? notFound();
}

export function articleRoute(collection: Collection) {
    return {
        // Runs once per edition (the layout supplies the locale), so a profile
        // that exists in fewer editions is built only in those.
        generateStaticParams({ params }: { params: { locale: string } }) {
            const locale = requireLocale(params.locale);
            return entriesIn(collection)
                .filter((entry) => isAvailable(entry, locale))
                .map((entry) => ({ slug: entry.slug }));
        },

        async generateMetadata({ params }: SlugParams): Promise<Metadata> {
            const { locale, slug } = await params;
            const article = getArticle(requireLocale(locale), collection, slug);
            if (!article) notFound();
            return pageMetadata({
                locale: article.locale,
                path: entryPath(article.entry),
                title: article.title,
                description: article.description,
                article: { published: article.entry.published, modified: article.entry.updated },
                ogAlt: dictionary(article.locale).meta.ogAlt,
                locales: localesOf(article.entry),
            });
        },

        async Page({ params }: SlugParams) {
            const { locale, slug } = await params;
            const article = getArticle(requireLocale(locale), collection, slug);
            if (!article) notFound();
            return <ArticleView article={article} />;
        },
    };
}

export function collectionRoute(collection: Collection) {
    const path = `/${collection}`;
    return {
        async generateMetadata({ params }: LocaleParams): Promise<Metadata> {
            const locale = requireLocale((await params).locale);
            const page = getPage(locale, `index-${collection}`);
            return pageMetadata({ locale, path, title: page.title, description: page.description, ogAlt: dictionary(locale).meta.ogAlt });
        },

        async Page({ params }: LocaleParams) {
            const locale = requireLocale((await params).locale);
            return <CollectionView locale={locale} collection={collection} />;
        },
    };
}

export function textPageRoute(name: string) {
    const path = `/${name}`;
    return {
        async generateMetadata({ params }: LocaleParams): Promise<Metadata> {
            const locale = requireLocale((await params).locale);
            const page = getPage(locale, name);
            return pageMetadata({ locale, path, title: page.title, description: page.description, ogAlt: dictionary(locale).meta.ogAlt });
        },

        async Page({ params }: LocaleParams) {
            const locale = requireLocale((await params).locale);
            return <TextPageView locale={locale} name={name} path={path} />;
        },
    };
}

type HubParams = { params: Promise<{ locale: string; country?: string; medium?: string }> };

/**
 * Hub pages: /artists/country/<country>, /artists/country/<country>/<medium>,
 * /artists/medium/<medium> and /artists/contemporary. Only released hubs, in
 * the editions they exist in, are built; anything else is a 404.
 */
export function hubRoute(kind: HubKind) {
    async function resolve(params: HubParams['params']) {
        const { locale, country, medium } = await params;
        const l = requireLocale(locale);
        const hub =
            kind === 'contemporary'
                ? contemporaryHub()
                : findHub(country ? countryBySlug(country) : undefined, medium ? mediumBySlug(medium) : undefined);
        if (!hub || hubKind(hub) !== kind || !liveHubs(l).includes(hub)) notFound();
        return { locale: l, hub };
    }

    return {
        // Every released hub in every edition: the page answers 404 for an
        // edition a hub does not have. Filtering per edition here instead would
        // break the build: when generateStaticParams returns [] for any one
        // locale (Arabic, with no country hubs yet), Next.js 16 drops the whole
        // route in every locale. The [country] level lists every country with
        // any released hub, including one whose own page comes in a later wave.
        generateStaticParams() {
            const released = releasedHubs();
            // /artists/contemporary is a static segment: its route file exports no params of its own.
            if (kind === 'contemporary') return [];
            if (kind === 'country') {
                const countries = [...new Set(released.filter((h) => h.country).map((h) => h.country!))];
                return countries.map((c) => ({ country: COUNTRY_SLUGS[c]! }));
            }
            return released
                .filter((hub) => hubKind(hub) === kind)
                .map((hub) => ({
                    ...(hub.country ? { country: COUNTRY_SLUGS[hub.country]! } : {}),
                    medium: MEDIUM_SLUGS[hub.medium!]!,
                }));
        },

        async generateMetadata({ params }: HubParams): Promise<Metadata> {
            const { locale, hub } = await resolve(params);
            const page = getHubPage(locale, hub);
            return pageMetadata({
                locale,
                path: hubPath(hub),
                title: page.title,
                description: page.description,
                ogAlt: dictionary(locale).meta.ogAlt,
                locales: hub.locales,
            });
        },

        async Page({ params }: HubParams) {
            const { locale, hub } = await resolve(params);
            return <HubView locale={locale} hub={hub} />;
        },
    };
}
