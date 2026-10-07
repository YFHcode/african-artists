import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CardGrid, EntryCard } from '@/components/Blocks';
import { Motif } from '@/components/Motif';
import { dictionary } from '@/i18n';
import { type Collection } from '@/content/catalog';
import { getArticle, listArticles } from '@/lib/content';
import { type Locale, isLocale, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

/** Which articles the home page features, in order. Everything else is one click away on its index. */
const FEATURED: Record<Collection, string[]> = {
    artists: ['el-anatsui', 'ibrahim-el-salahi', 'cheri-samba', 'malick-sidibe', 'esther-mahlangu', 'farid-belkahia'],
    movements: ['zaria-art-society', 'khartoum-school', 'casablanca-school'],
    music: ['afrobeat', 'amapiano', 'congolese-rumba', 'rai', 'morna', 'highlife'],
    guides: [],
};

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const t = dictionary(locale);
    return pageMetadata({
        locale,
        path: '/',
        title: t.meta.homeTitle,
        description: t.meta.homeDescription,
        absoluteTitle: true,
        ogAlt: t.meta.ogAlt,
    });
}

function Section({
    locale,
    collection,
    title,
    more,
    slugs,
}: {
    locale: Locale;
    collection: Collection;
    title: string;
    more: string;
    slugs?: string[];
}) {
    const t = dictionary(locale);
    const articles = slugs
        ? slugs.map((slug) => getArticle(locale, collection, slug)!)
        : listArticles(locale, collection);

    return (
        <section aria-labelledby={`home-${collection}`} className="mx-auto mt-16 max-w-6xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 id={`home-${collection}`} className="font-display text-3xl font-semibold tracking-tight">
                    {title}
                </h2>
                <Link href={localePath(locale, `/${collection}`)} className="font-medium text-clay underline underline-offset-4">
                    {more} <span aria-hidden="true" className="inline-block rtl:rotate-180">→</span>
                </Link>
            </div>
            <div className="mt-6">
                <CardGrid count={articles.length}>
                    {articles.map((article) => (
                        <EntryCard key={article.entry.slug} article={article} t={t} />
                    ))}
                </CardGrid>
            </div>
        </section>
    );
}

export default async function Home({ params }: PageProps<'/[locale]'>) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const t = dictionary(locale);

    return (
        <>
            <section className="relative overflow-hidden border-b border-line">
                <Motif seed="africanartists-home" className="absolute inset-x-0 top-0 block h-2 w-full" />
                <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
                    <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
                        {t.home.heading}
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/85 sm:text-xl">{t.home.lead}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href={localePath(locale, '/artists')}
                            className="rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-clay"
                        >
                            {t.home.exploreArtists}
                        </Link>
                        <Link
                            href={localePath(locale, '/buy')}
                            className="rounded-full border-2 border-indigo px-6 py-3 font-semibold text-indigo hover:bg-indigo hover:text-paper"
                        >
                            {t.home.buyDomain}
                        </Link>
                    </div>
                </div>
            </section>

            <Section locale={locale} collection="artists" title={t.home.artistsTitle} more={t.home.artistsMore} slugs={FEATURED.artists} />

            <section className="mx-auto mt-16 max-w-6xl px-4">
                <div className="grid overflow-hidden rounded-2xl bg-indigo text-paper md:grid-cols-[1fr_14rem]">
                    <div className="p-8 sm:p-10">
                        <h2 className="font-display text-3xl font-semibold">{t.home.saleTitle}</h2>
                        <p className="mt-3 max-w-2xl text-paper/85">{t.home.saleText}</p>
                        <Link
                            href={localePath(locale, '/buy')}
                            className="mt-6 inline-block rounded-full bg-ochre px-6 py-3 font-semibold text-ink hover:bg-paper"
                        >
                            {t.home.saleCta}
                        </Link>
                    </div>
                    <Motif seed="africanartists-sale" className="hidden h-full w-full md:block" />
                </div>
            </section>

            <Section locale={locale} collection="movements" title={t.home.movementsTitle} more={t.home.movementsMore} slugs={FEATURED.movements} />
            <Section locale={locale} collection="music" title={t.home.musicTitle} more={t.home.musicMore} slugs={FEATURED.music} />
            <Section locale={locale} collection="guides" title={t.home.guidesTitle} more={t.home.guidesMore} />
        </>
    );
}
