import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CardGrid, EntryCard } from '@/components/Blocks';
import { AfricaMap } from '@/components/AfricaMap';
import { ArtistStrip } from '@/components/ArtistStrip';
import { LoomBand, Motif, MotifQuilt } from '@/components/Motif';
import { HubDirectory } from '@/components/Views';
import { dictionary } from '@/i18n';
import { type Collection, entriesIn, entryPath } from '@/content/catalog';
import { getArticle, listArticles } from '@/lib/content';
import { type Locale, localePath, toLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

/** Which articles the home page features, in order. Everything else is one click away on its index. */
const FEATURED: Partial<Record<Collection, string[]>> = {
    'art-forms': ['african-masks', 'kente-cloth', 'benin-bronzes', 'mudcloth', 'african-rock-art', 'adinkra-symbols'],
    artists: ['el-anatsui', 'ibrahim-el-salahi', 'cheri-samba', 'malick-sidibe', 'esther-mahlangu', 'farid-belkahia'],
    movements: ['zaria-art-society', 'khartoum-school', 'casablanca-school'],
    music: ['afrobeat', 'amapiano', 'congolese-rumba', 'rai', 'morna', 'highlife'],
};

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
    const locale = toLocale((await params).locale) ?? notFound();
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

/** The five region pages as a compact strip: names only, so the row stays one line on a laptop. */
function Regions({ locale }: { locale: Locale }) {
    const t = dictionary(locale);
    const regions = entriesIn('regions').map((e) => getArticle(locale, e.collection, e.slug)!);
    return (
        <section aria-labelledby="home-regions" className="mx-auto mt-16 max-w-6xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 id="home-regions" className="font-display text-3xl font-semibold tracking-tight">
                    {t.home.regionsTitle}
                </h2>
                <Link href={localePath(locale, '/regions')} className="font-medium text-clay underline underline-offset-4">
                    {t.home.regionsMore} <span aria-hidden="true" className="inline-block rtl:rotate-180">→</span>
                </Link>
            </div>
            <div className="region-explorer mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,22rem)_1fr] lg:grid-cols-[minmax(0,26rem)_1fr]">
                <AfricaMap
                    className="reveal mx-auto block w-full max-w-sm md:max-w-none"
                    regions={regions.map((r) => ({ slug: r.entry.slug, label: r.label, href: localePath(locale, entryPath(r.entry)) }))}
                />
                <ul className="grid gap-3 sm:grid-cols-2">
                    {regions.map((region) => (
                        <li
                            key={region.entry.slug}
                            data-region-card={region.entry.slug}
                            className="group card-lift relative overflow-hidden rounded-xl border border-line bg-paper transition-colors hover:shadow-md"
                        >
                            <Motif seed={region.entry.slug} className="h-3 w-full" />
                            <div className="p-4">
                                <Link
                                    href={localePath(locale, entryPath(region.entry))}
                                    className="font-display text-lg font-semibold after:absolute after:inset-0"
                                >
                                    {region.label}
                                </Link>
                                <p className="mt-1 line-clamp-2 text-sm text-muted">{region.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default async function Home({ params }: PageProps<'/[locale]'>) {
    const locale = toLocale((await params).locale) ?? notFound();
    const t = dictionary(locale);

    return (
        <>
            <section className="relative overflow-hidden border-b border-line">
                <LoomBand seed="africanartists-home" className="absolute inset-x-0 top-0" />
                <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <div>
                        <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
                            {t.home.heading}
                        </h1>
                        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/85 sm:text-xl">{t.home.lead}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href={localePath(locale, '/guides/african-art-history')}
                                className="rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-clay"
                            >
                                {t.home.exploreHistory}
                            </Link>
                            <Link
                                href={localePath(locale, '/art-forms')}
                                className="rounded-full border-2 border-ink px-6 py-3 font-semibold text-ink hover:bg-ink hover:text-paper"
                            >
                                {t.home.exploreArtForms}
                            </Link>
                            <Link
                                href={localePath(locale, '/buy')}
                                className="rounded-full border-2 border-indigo px-6 py-3 font-semibold text-indigo hover:bg-indigo hover:text-paper"
                            >
                                {t.home.buyDomain}
                            </Link>
                        </div>
                    </div>
                    <MotifQuilt seed="africanartists-hero" count={16} animate className="hidden lg:grid" />
                </div>
            </section>

            <ArtistStrip locale={locale} />
            <Section locale={locale} collection="art-forms" title={t.home.artFormsTitle} more={t.home.artFormsMore} slugs={FEATURED['art-forms']} />
            <Section locale={locale} collection="artists" title={t.home.artistsTitle} more={t.home.artistsMore} slugs={FEATURED.artists} />
            <section aria-labelledby="home-lists" className="mx-auto mt-10 max-w-6xl px-4">
                <h2 id="home-lists" className="font-display text-2xl font-semibold tracking-tight">
                    {t.profile.lists}
                </h2>
                <HubDirectory locale={locale} compact />
            </section>

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

            <Regions locale={locale} />
            <Section locale={locale} collection="movements" title={t.home.movementsTitle} more={t.home.movementsMore} slugs={FEATURED.movements} />
            <Section locale={locale} collection="music" title={t.home.musicTitle} more={t.home.musicMore} slugs={FEATURED.music} />
            <Section locale={locale} collection="guides" title={t.home.guidesTitle} more={t.home.guidesMore} />
        </>
    );
}
