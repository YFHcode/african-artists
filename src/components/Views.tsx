import Link from 'next/link';

import { Breadcrumbs, CardGrid, EntryCard, FactFile, RelatedArticles } from '@/components/Blocks';
import { JsonLd } from '@/components/JsonLd';
import { Motif } from '@/components/Motif';
import { dictionary } from '@/i18n';
import { type Collection, type CountryCode, entryPath } from '@/content/catalog';
import { type Article, getPage, listArticles, relatedArticles } from '@/lib/content';
import { LOCALE_INFO, type Locale, localePath } from '@/lib/i18n';
import { articleSchema, collectionSchema } from '@/lib/schema';

/**
 * Dates in the reader's language, with Western digits in every edition to
 * match the years on the page. English uses day-month-year, like the
 * British spelling of the articles.
 */
const DATE_LOCALES: Record<Locale, string> = { en: 'en-GB', fr: 'fr', pt: 'pt-PT', ar: 'ar-u-nu-latn' };

export function formatDate(locale: Locale, iso: string): string {
    const lang = DATE_LOCALES[locale];
    return new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
}

function SaleNote({ locale }: { locale: Locale }) {
    const t = dictionary(locale);
    return (
        <aside className="mx-auto mt-16 max-w-6xl px-4">
            <div className="flex flex-col items-start gap-4 rounded-xl bg-indigo p-6 text-paper sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="font-display text-xl font-semibold">{t.home.saleTitle}</p>
                    <p className="mt-1 max-w-2xl text-sm text-paper/85">{t.home.saleText}</p>
                </div>
                <Link
                    href={localePath(locale, '/buy')}
                    className="shrink-0 rounded-full bg-ochre px-5 py-2.5 font-semibold text-ink hover:bg-paper"
                >
                    {t.saleBar.cta}
                </Link>
            </div>
        </aside>
    );
}

export function ArticleView({ article }: { article: Article }) {
    const { entry, locale } = article;
    const t = dictionary(locale);
    const path = entryPath(entry);
    const minutes = Math.max(2, Math.round(article.words / 220));

    return (
        <>
            <JsonLd data={articleSchema(article, path)} />
            <Breadcrumbs
                locale={locale}
                label={t.nav.breadcrumb}
                trail={[
                    { name: t.nav.home, path: '/' },
                    { name: t.nav[entry.collection], path: `/${entry.collection}` },
                    { name: article.label, path },
                ]}
            />

            <article className="mx-auto max-w-6xl px-4">
                <header className="mt-6 max-w-3xl">
                    <Motif seed={entry.slug} className="mb-6 block h-3 w-40 rounded-full" />
                    <p className="text-sm font-semibold uppercase tracking-wide text-clay">
                        {[article.kicker, ...entry.countries.map((c) => t.countries[c])].join(' · ')}
                    </p>
                    <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                        {article.heading}
                    </h1>
                    <p className="mt-5 text-xl leading-relaxed text-ink/90">{article.summary}</p>
                    <p className="mt-4 text-sm text-muted">
                        {entry.updated !== entry.published ? (
                            <>
                                {t.article.updated}{' '}
                                <time dateTime={entry.updated}>{formatDate(locale, entry.updated)}</time>
                            </>
                        ) : (
                            <>
                                {t.article.published}{' '}
                                <time dateTime={entry.published}>{formatDate(locale, entry.published)}</time>
                            </>
                        )}
                        <span aria-hidden="true"> · </span>
                        {t.article.minutes(minutes)}
                    </p>
                </header>

                <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
                    <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
                    <div className="lg:sticky lg:top-6 lg:self-start">
                        <FactFile facts={article.facts} title={t.article.facts} />
                    </div>
                </div>
            </article>

            <RelatedArticles articles={relatedArticles(locale, entry)} title={t.article.related} t={t} />
            <SaleNote locale={locale} />
        </>
    );
}

export function CollectionView({ locale, collection }: { locale: Locale; collection: Collection }) {
    const t = dictionary(locale);
    const page = getPage(locale, `index-${collection}`);
    const articles = listArticles(locale, collection);
    const path = `/${collection}`;

    // Artists: a compact country index under the cards, so every profile is
    // also reachable by the question "which artists are from Mali?".
    const byCountry = new Map<CountryCode, Article[]>();
    if (collection === 'artists') {
        for (const article of articles) {
            for (const code of article.entry.countries) {
                byCountry.set(code, [...(byCountry.get(code) ?? []), article]);
            }
        }
    }
    const countries = [...byCountry.keys()].sort((a, b) => t.countries[a].localeCompare(t.countries[b], LOCALE_INFO[locale].lang));

    return (
        <>
            <JsonLd
                data={collectionSchema(
                    locale,
                    path,
                    page.heading,
                    page.description,
                    articles.map((a) => ({ name: a.label, path: entryPath(a.entry) }))
                )}
            />
            <Breadcrumbs
                locale={locale}
                label={t.nav.breadcrumb}
                trail={[
                    { name: t.nav.home, path: '/' },
                    { name: t.nav[collection], path },
                ]}
            />

            <section className="mx-auto max-w-6xl px-4">
                <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{page.heading}</h1>
                <div className="prose mt-5 text-lg" dangerouslySetInnerHTML={{ __html: page.html }} />
            </section>

            <section className="mx-auto mt-10 max-w-6xl px-4">
                <CardGrid count={articles.length}>
                    {articles.map((article) => (
                        <EntryCard key={article.entry.slug} article={article} t={t} headingLevel="h2" />
                    ))}
                </CardGrid>
            </section>

            {countries.length > 0 && (
                <section aria-labelledby="by-country" className="mx-auto mt-14 max-w-6xl px-4">
                    <h2 id="by-country" className="font-display text-2xl font-semibold">
                        {t.collections.byCountry}
                    </h2>
                    <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                        {countries.map((code) => (
                            <div key={code}>
                                <dt className="font-semibold">{t.countries[code]}</dt>
                                <dd className="text-[0.95rem]">
                                    {byCountry.get(code)!.map((a, i) => (
                                        <span key={a.entry.slug}>
                                            {i > 0 && ', '}
                                            <Link href={localePath(locale, entryPath(a.entry))} className="text-clay underline underline-offset-4">
                                                {a.label}
                                            </Link>
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>
            )}

            <SaleNote locale={locale} />
        </>
    );
}

export function TextPageView({ locale, name, path }: { locale: Locale; name: string; path: string }) {
    const t = dictionary(locale);
    const page = getPage(locale, name);
    return (
        <>
            <Breadcrumbs
                locale={locale}
                label={t.nav.breadcrumb}
                trail={[
                    { name: t.nav.home, path: '/' },
                    { name: page.heading, path },
                ]}
            />
            <article className="mx-auto max-w-6xl px-4">
                <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{page.heading}</h1>
                <div className="prose mt-8" dangerouslySetInnerHTML={{ __html: page.html }} />
            </article>
        </>
    );
}
