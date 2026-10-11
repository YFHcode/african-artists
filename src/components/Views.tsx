import Link from 'next/link';

import { Breadcrumbs, CardGrid, EntryCard, FactFile, RelatedArticles } from '@/components/Blocks';
import { JsonLd } from '@/components/JsonLd';
import { Locator, locatorKey } from '@/components/Locator';
import { Motif } from '@/components/Motif';
import { Portrait, WorksGallery } from '@/components/Pictures';
import { dictionary } from '@/i18n';
import { COLLECTIONS, REGIONS, type Collection, type CountryCode, entriesInRegion, entryPath, isAvailable } from '@/content/catalog';
import { type Article, getArticle, getPage, listArticles, relatedArticles } from '@/lib/content';
import { LOCALE_INFO, type Locale, localePath } from '@/lib/i18n';
import { articleSchema, collectionSchema } from '@/lib/schema';
import { type Hub, hubPath, hubsListing, liveHubs } from '@/content/hubs';
import { dataArtist, wikidataUrl, wikipediaUrl } from '@/lib/artist-data';
import { artistPictures, workTitle } from '@/lib/artist-images';
import { getHubPage } from '@/lib/content';
import type { Fact } from '@/lib/content';

/**
 * Dates in the reader's language, with Western digits in every edition to
 * match the years on the page. English uses day-month-year, like the
 * British spelling of the articles.
 */
const DATE_LOCALES: Record<Locale, string> = { en: 'en-GB', fr: 'fr', es: 'es', pt: 'pt-PT', ar: 'ar-u-nu-latn' };

export function formatDate(locale: Locale, iso: string): string {
    const lang = DATE_LOCALES[locale];
    return new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
}

export function SaleNote({ locale }: { locale: Locale }) {
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

/**
 * The facts box of a short profile, from Wikidata: life dates, country and
 * disciplines. Full profiles keep their hand-written facts.
 */
function generatedFacts(article: Article): Fact[] {
    const { entry, locale } = article;
    const t = dictionary(locale);
    const artist = entry.qid ? dataArtist(entry.qid) : undefined;
    const facts: Fact[] = [];
    if (artist?.born != null) facts.push({ label: t.profile.born, value: String(artist.born) });
    if (artist?.died != null) facts.push({ label: t.profile.died, value: String(artist.died) });
    if (entry.countries.length > 0) facts.push({ label: t.profile.country, value: entry.countries.map((c) => t.countries[c]).join(', ') });
    if (entry.media?.length) facts.push({ label: t.profile.disciplines, value: entry.media.map((m) => t.media[m]).join(', ') });
    return facts;
}

export function ArticleView({ article }: { article: Article }) {
    const { entry, locale } = article;
    const t = dictionary(locale);
    const path = entryPath(entry);
    const minutes = Math.max(2, Math.round(article.words / 220));
    const artist = entry.qid ? dataArtist(entry.qid) : undefined;
    const facts = article.facts.length > 0 || !entry.qid ? article.facts : generatedFacts(article);
    const mapKey = locatorKey(entry.countries, entry.collection === 'regions' ? entry.slug : undefined);
    const pictures = entry.collection === 'artists' ? artistPictures(entry.qid) : undefined;
    const links = entry.qid
        ? [
              ...(artist && wikipediaUrl(artist, locale) ? [{ label: 'Wikipedia', href: wikipediaUrl(artist, locale)! }] : []),
              { label: 'Wikidata', href: wikidataUrl(entry.qid) },
          ]
        : [];
    const lists =
        entry.collection === 'artists'
            ? hubsListing({ countries: entry.countries, media: entry.media ?? [], born: artist?.born ?? null }, locale)
            : [];
    const person = entry.qid
        ? {
              sameAs: [wikidataUrl(entry.qid), ...(artist?.titles.en ? [wikipediaUrl(artist, 'en')!] : [])],
              birthDate: artist?.born != null ? String(artist.born) : undefined,
              deathDate: artist?.died != null ? String(artist.died) : undefined,
              image: pictures?.portrait ?? undefined,
              works: pictures?.works.map((w) => ({ pic: w, title: workTitle(w, locale) })),
          }
        : undefined;

    return (
        <>
            <JsonLd data={articleSchema(article, path, person)} />
            <Breadcrumbs
                locale={locale}
                label={t.nav.breadcrumb}
                trail={[
                    { name: t.nav.home, path: '/' },
                    { name: t.nav[entry.collection], path: `/${entry.collection}` },
                    { name: article.label, path },
                ]}
            />

            <div className="reading-progress" aria-hidden="true" />
            <article className="mx-auto max-w-6xl px-4">
                <header className="mt-6 max-w-3xl">
                    <Motif seed={entry.slug} className="mb-8 h-20 w-full rounded-xl sm:h-28" />
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
                    <div>
                        <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
                        {pictures && pictures.works.length > 0 && <WorksGallery works={pictures.works} artist={article.label} locale={locale} />}
                    </div>
                    <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
                        {pictures?.portrait && <Portrait pic={pictures.portrait} name={article.label} />}
                        {mapKey && <Locator mapKey={mapKey} />}
                        <FactFile facts={facts} title={t.article.facts} />
                        {lists.length > 0 && (
                            <nav aria-labelledby="artist-lists" className="rounded-xl border border-line p-5">
                                <h2 id="artist-lists" className="text-sm font-semibold uppercase tracking-wide text-muted">
                                    {t.profile.lists}
                                </h2>
                                <ul className="mt-3 space-y-2 text-[0.95rem]">
                                    {lists.map((hub) => (
                                        <li key={hubPath(hub)}>
                                            <Link href={localePath(locale, hubPath(hub))} className="text-clay underline underline-offset-4">
                                                {getHubPage(locale, hub).label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                        {links.length > 0 && (
                            <aside className="rounded-xl border border-line p-5">
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{t.profile.links}</h2>
                                <ul className="mt-3 space-y-2 text-[0.95rem]">
                                    {links.map((l) => (
                                        <li key={l.href}>
                                            <a href={l.href} rel="noopener" className="text-clay underline underline-offset-4">
                                                {l.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        )}
                    </div>
                </div>
            </article>

            {entry.collection === 'regions' && <RegionIndex locale={locale} slug={entry.slug} />}
            <RelatedArticles articles={relatedArticles(locale, entry)} title={t.article.related} t={t} />
            <SaleNote locale={locale} />
        </>
    );
}

/**
 * On a region page: every article on the site from that region's countries,
 * grouped by collection. Generated from the catalog, so a new article tagged
 * with a country appears on its region page without anyone editing it.
 */
function RegionIndex({ locale, slug }: { locale: Locale; slug: string }) {
    const t = dictionary(locale);
    const entries = entriesInRegion(slug);
    const groups = COLLECTIONS.map((collection) => ({
        collection,
        articles: entries
            .filter((e) => e.collection === collection && isAvailable(e, locale))
            .map((e) => getArticle(locale, e.collection, e.slug)!),
    })).filter((g) => g.articles.length > 0);
    const hubs = liveHubs(locale).filter((h) => h.country && REGIONS[slug]?.includes(h.country));
    if (groups.length === 0 && hubs.length === 0) return null;

    return (
        <section aria-labelledby="region-index" className="mx-auto mt-16 max-w-6xl px-4">
            <h2 id="region-index" className="font-display text-2xl font-semibold">
                {t.article.inRegion}
            </h2>
            <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {groups.map(({ collection, articles }) => (
                    <div key={collection}>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{t.nav[collection]}</h3>
                        <ul className="mt-3 space-y-2">
                            {articles.map((a) => (
                                <li key={a.entry.slug}>
                                    <Link href={localePath(locale, entryPath(a.entry))} className="font-medium text-clay underline underline-offset-4">
                                        {a.label}
                                    </Link>
                                    <span className="text-sm text-muted"> · {a.entry.countries.map((c) => t.countries[c]).join(', ')}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {hubs.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{t.profile.lists}</h3>
                        <ul className="mt-3 space-y-2">
                            {hubs.map((h) => (
                                <li key={hubPath(h)}>
                                    <Link href={localePath(locale, hubPath(h))} className="font-medium text-clay underline underline-offset-4">
                                        {getHubPage(locale, h).label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}

/**
 * Every list of artists in an edition: the Africa-wide lists first, then each
 * country's list with its lists by medium. On the artists index this is the
 * way into the hubs; the home page shows the compact version (wide lists and
 * country lists only).
 */
export function HubDirectory({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
    const t = dictionary(locale);
    const live = liveHubs(locale);
    const wide = live.filter((h) => !h.country);
    const byCountry = new Map<CountryCode, Hub[]>();
    for (const h of live.filter((h) => h.country)) {
        // The country's own list first, then its lists by medium.
        const list = byCountry.get(h.country!) ?? [];
        byCountry.set(h.country!, h.medium ? [...list, h] : [h, ...list]);
    }
    const countries = [...byCountry.keys()].sort((a, b) => t.countries[a].localeCompare(t.countries[b], LOCALE_INFO[locale].lang));
    const pill = (h: Hub) => (
        <li key={hubPath(h)}>
            <Link href={localePath(locale, hubPath(h))} className="block rounded-full border border-line px-4 py-2 hover:bg-sand">
                {getHubPage(locale, h).label}
            </Link>
        </li>
    );

    if (compact) {
        const countryLists = countries.flatMap((c) => byCountry.get(c)!.filter((h) => !h.medium));
        return <ul className="mt-6 flex flex-wrap gap-3">{[...wide, ...countryLists].map(pill)}</ul>;
    }

    return (
        <>
            {wide.length > 0 && (
                <>
                    <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">{t.collections.acrossAfrica}</h3>
                    <ul className="mt-3 flex flex-wrap gap-3">{wide.map(pill)}</ul>
                </>
            )}
            {countries.length > 0 && (
                <>
                    <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted">{t.collections.byCountry}</h3>
                    <dl className="mt-3 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                        {countries.map((code) => (
                            <div key={code}>
                                <dt className="font-semibold">{t.countries[code]}</dt>
                                <dd className="text-[0.95rem]">
                                    {byCountry.get(code)!.map((h, i) => (
                                        <span key={hubPath(h)}>
                                            {i > 0 && ', '}
                                            <Link href={localePath(locale, hubPath(h))} className="text-clay underline underline-offset-4">
                                                {getHubPage(locale, h).label}
                                            </Link>
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </>
            )}
        </>
    );
}

export function CollectionView({ locale, collection }: { locale: Locale; collection: Collection }) {
    const t = dictionary(locale);
    const page = getPage(locale, `index-${collection}`);
    const articles = listArticles(locale, collection);
    const path = `/${collection}`;
    // The artists index is the way into 100+ profiles and every list, so its
    // introduction is split: the opening paragraphs, then the lists and the
    // profiles, then the longer "names that matter" text.
    const lists = collection === 'artists' && liveHubs(locale).length > 0;
    const split = lists ? page.html.indexOf('<h2') : -1;
    const intro = split > 0 ? page.html.slice(0, split) : page.html;
    const more = split > 0 ? page.html.slice(split) : '';

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
                <Motif seed={path} className="mt-6 h-3 w-40 rounded-full" />
                <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{page.heading}</h1>
                <div className="prose mt-5 text-lg" dangerouslySetInnerHTML={{ __html: intro }} />
            </section>

            {lists && (
                <section aria-labelledby="artist-lists" className="mx-auto mt-10 max-w-6xl px-4">
                    <h2 id="artist-lists" className="font-display text-2xl font-semibold">
                        {t.profile.lists}
                    </h2>
                    <HubDirectory locale={locale} />
                </section>
            )}

            <section aria-labelledby={lists ? 'all-profiles' : undefined} className="mx-auto mt-10 max-w-6xl px-4">
                {lists && (
                    <h2 id="all-profiles" className="mb-6 font-display text-2xl font-semibold">
                        {t.hub.profiles}
                    </h2>
                )}
                <CardGrid count={articles.length}>
                    {articles.map((article) => (
                        <EntryCard key={article.entry.slug} article={article} t={t} headingLevel={lists ? 'h3' : 'h2'} />
                    ))}
                </CardGrid>
            </section>

            {more && (
                <section className="mx-auto mt-14 max-w-6xl px-4">
                    <div className="prose text-lg" dangerouslySetInnerHTML={{ __html: more }} />
                </section>
            )}

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
