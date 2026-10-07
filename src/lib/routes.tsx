import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleView, CollectionView, TextPageView } from '@/components/Views';
import { dictionary } from '@/i18n';
import { type Collection, entriesIn, entryPath } from '@/content/catalog';
import { getArticle, getPage } from '@/lib/content';
import { type Locale, isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

/**
 * The route files under app/[locale]/ are one-liners over these factories:
 * four collections share one article template and one index template, and
 * keeping the logic here means a fix lands on all of them at once.
 *
 * Each route file still declares `dynamicParams = false` itself — Next.js
 * reads segment config statically from the route file — so an unknown slug
 * is a 404 at the routing layer rather than a page rendered on demand.
 */

type LocaleParams = { params: Promise<{ locale: string }> };
type SlugParams = { params: Promise<{ locale: string; slug: string }> };

function requireLocale(value: string): Locale {
    if (!isLocale(value)) notFound();
    return value;
}

export function articleRoute(collection: Collection) {
    return {
        generateStaticParams() {
            return entriesIn(collection).map((entry) => ({ slug: entry.slug }));
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
