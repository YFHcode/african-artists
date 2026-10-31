import Link from 'next/link';

import { Breadcrumbs, CardGrid, EntryCard } from '@/components/Blocks';
import { JsonLd } from '@/components/JsonLd';
import { dictionary } from '@/i18n';
import { CATALOG, entryPath, findEntry, isAvailable, regionOf } from '@/content/catalog';
import { type Hub, findHub, hubKind, hubPath, liveHubs } from '@/content/hubs';
import { ROSTER } from '@/content/roster';
import { type DataArtist, artistDescription, displayName, hubMembers, lifeYears, wikipediaLanguage, wikipediaUrl } from '@/lib/artist-data';
import { listPortrait } from '@/lib/artist-images';
import { quilt } from '@/lib/motifs';
import { type Article, getArticle, getHubPage } from '@/lib/content';
import { type Locale, joinList, localePath } from '@/lib/i18n';
import { collectionSchema } from '@/lib/schema';
import { Locator, locatorKey } from '@/components/Locator';
import { Motif } from '@/components/Motif';
import { SaleNote } from '@/components/Views';

/**
 * The hubs a reader of this one may want next: for a country, its medium
 * lists; for a country and medium, the country, the medium across Africa and
 * the same country's other media; for a medium, the countries' lists of it.
 */
/** People known mainly for other work: listed after the artists, under their own heading (roster.ts). */
const OTHER_WORK = new Set(ROSTER.filter((r) => r.knownForOtherWork).map((r) => r.qid));

function relatedHubs(hub: Hub, locale: Locale): Hub[] {
    const live = liveHubs(locale).filter((h) => h !== hub);
    const kind = hubKind(hub);
    if (kind === 'country') return live.filter((h) => h.country === hub.country);
    if (kind === 'medium' || kind === 'contemporary')
        return live.filter((h) => (kind === 'medium' && h.medium === hub.medium) || hubKind(h) === 'medium' || hubKind(h) === 'contemporary');
    return live.filter(
        (h) =>
            (h.country === hub.country && (!h.medium || h.medium !== hub.medium)) ||
            (hubKind(h) === 'medium' && h.medium === hub.medium) ||
            (hubKind(h) === 'country-medium' && h.medium === hub.medium)
    );
}

export function HubView({ locale, hub }: { locale: Locale; hub: Hub }) {
    const t = dictionary(locale);
    const page = getHubPage(locale, hub);
    const path = hubPath(hub);
    const kind = hubKind(hub);
    const members = hubMembers(hub);
    const mapKey = hub.country ? locatorKey([hub.country]) : null;

    // Artists with a profile in this edition are shown as cards; the rest as one line each.
    const profiles = new Map<string, Article>();
    for (const e of CATALOG) {
        if (e.collection === 'artists' && e.qid && isAvailable(e, locale)) profiles.set(e.qid, getArticle(locale, 'artists', e.slug)!);
    }
    const profiled = members.filter((m) => profiles.has(m.qid) && !OTHER_WORK.has(m.qid)).map((m) => profiles.get(m.qid)!);
    const otherWork = members.filter((m) => profiles.has(m.qid) && OTHER_WORK.has(m.qid)).map((m) => profiles.get(m.qid)!);
    const others = members.filter((m) => !profiles.has(m.qid));

    const countryHub = kind === 'country-medium' ? findHub(hub.country, undefined) : undefined;
    const trail = [
        { name: t.nav.home, path: '/' },
        { name: t.nav.artists, path: '/artists' },
        ...(countryHub && liveHubs(locale).includes(countryHub)
            ? [{ name: getHubPage(locale, countryHub).label, path: hubPath(countryHub) }]
            : []),
        { name: page.label, path },
    ];

    const related = relatedHubs(hub, locale);
    const region = hub.country ? regionOf(hub.country) : undefined;
    const regionArticle = region && findEntry('regions', region) ? getArticle(locale, 'regions', region) : null;

    const line = (a: DataArtist) => {
        const details = [
            kind === 'medium' || kind === 'contemporary' ? joinList(a.countries.map((c) => t.countries[c]), locale) : '',
            kind === 'country' || kind === 'contemporary' ? joinList(a.media.map((m) => t.media[m]), locale) : '',
            // A word joiner keeps '1904–2002' on one line.
            lifeYears(a).replace('–', '–\u2060'),
        ].filter(Boolean);
        const href = wikipediaUrl(a, locale);
        const lang = wikipediaLanguage(a, locale);
        const pic = listPortrait(a.qid);
        const description = artistDescription(a.qid, locale);
        // Styled from the <ul>: a list of 400 names repeats nothing per line,
        // and each line is as few elements as it can be, which keeps the HTML,
        // its hydration and its layout cheap. A free portrait from Commons
        // where there is one, else the artist's pattern, set in the line's
        // padding; the Wikidata description in the reader's language; "EN"
        // when the link has to fall back to English Wikipedia.
        return (
            <li key={a.qid}>
                {pic ? (
                    // eslint-disable-next-line @next/next/no-img-element -- 120px copies already, served as they are
                    <img src={pic.src} alt="" width={40} height={40} loading="lazy" />
                ) : (
                    <span className={quilt(a.qid, 1)[0]} />
                )}
                {href ? (
                    <a href={href} rel="noopener" hrefLang={lang ?? undefined}>
                        {displayName(a, locale)}
                    </a>
                ) : (
                    <b>{displayName(a, locale)}</b>
                )}
                {lang && lang !== locale && (
                    <abbr title={t.hub.inEnglish} lang="en">
                        EN
                    </abbr>
                )}
                {details.length > 0 && <small>{` · ${details.join(' · ')}`}</small>}
                {description && <p>{description}</p>}
            </li>
        );
    };

    return (
        <>
            <JsonLd
                data={collectionSchema(locale, path, page.heading, page.description, [
                    ...profiled.map((a) => ({ name: a.label, path: entryPath(a.entry) })),
                    ...others.flatMap((a) => {
                        const url = wikipediaUrl(a, locale);
                        return url ? [{ name: displayName(a, locale), url }] : [];
                    }),
                    ...otherWork.map((a) => ({ name: a.label, path: entryPath(a.entry) })),
                ])}
            />
            <Breadcrumbs locale={locale} label={t.nav.breadcrumb} trail={trail} />

            <section className={`mx-auto max-w-6xl px-4 ${mapKey ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-10' : ''}`}>
                <div>
                    <Motif seed={path} className="mt-6 h-3 w-40 rounded-full" />
                    <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{page.heading}</h1>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-clay">{t.hub.count(members.length)}</p>
                    <div className="prose mt-5 text-lg" dangerouslySetInnerHTML={{ __html: page.html }} />
                </div>
                {mapKey && <Locator mapKey={mapKey} className="mt-8 hidden lg:block" />}
            </section>

            {profiled.length > 0 && (
                <section aria-labelledby="hub-profiles" className="mx-auto mt-12 max-w-6xl px-4">
                    <h2 id="hub-profiles" className="font-display text-2xl font-semibold">
                        {t.hub.profiles}
                    </h2>
                    <div className="mt-6">
                        <CardGrid count={profiled.length}>
                            {profiled.map((article) => (
                                <EntryCard key={article.entry.slug} article={article} t={t} />
                            ))}
                        </CardGrid>
                    </div>
                </section>
            )}

            {others.length > 0 && (
                <section aria-labelledby="hub-more" className="mx-auto mt-14 max-w-6xl px-4">
                    <h2 id="hub-more" className="font-display text-2xl font-semibold">
                        {t.hub.more}
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                        {t.hub.moreNote} {t.hub.sources}{' '}
                        <Link prefetch={false} href={localePath(locale, '/credits')} className="underline underline-offset-2">
                            {t.footer.credits}
                        </Link>
                    </p>
                    <ul className="mt-5 gap-x-8 sm:columns-2 lg:columns-3 [&_a]:font-medium [&_a]:text-clay [&_a]:underline [&_a]:underline-offset-4 [&_abbr]:ms-1.5 [&_abbr]:[unicode-bidi:isolate] [&_abbr]:rounded [&_abbr]:border [&_abbr]:border-line [&_abbr]:px-1 [&_abbr]:align-middle [&_abbr]:text-[0.65rem] [&_abbr]:font-semibold [&_abbr]:text-muted [&_abbr]:no-underline [&_b]:font-medium [&_img]:absolute [&_img]:start-0 [&_img]:top-1.5 [&_img]:size-10 [&_img]:rounded-full [&_img]:bg-sand [&_img]:object-cover [&_img]:object-[50%_20%] [&_li]:relative [&_li]:min-h-13 [&_li]:break-inside-avoid [&_li]:py-1.5 [&_li]:ps-13 max-sm:[&_li]:[content-visibility:auto] max-sm:[&_li]:[contain-intrinsic-size:auto_3.75rem] [&_li>span]:absolute [&_li>span]:start-0 [&_li>span]:top-1.5 [&_li>span]:size-10 [&_li>span]:rounded-full [&_p]:text-sm [&_p]:leading-snug [&_p]:text-ink/75 [&_small]:text-sm [&_small]:text-muted">
                        {others.map(line)}
                    </ul>
                </section>
            )}

            {otherWork.length > 0 && (
                <section aria-labelledby="hub-other-work" className="mx-auto mt-14 max-w-6xl px-4">
                    <h2 id="hub-other-work" className="font-display text-2xl font-semibold">
                        {t.hub.otherWork}
                    </h2>
                    <p className="mt-2 text-sm text-muted">{t.hub.otherWorkNote}</p>
                    <div className="mt-6">
                        <CardGrid count={otherWork.length}>
                            {otherWork.map((article) => (
                                <EntryCard key={article.entry.slug} article={article} t={t} />
                            ))}
                        </CardGrid>
                    </div>
                </section>
            )}

            {(related.length > 0 || regionArticle) && (
                <nav aria-labelledby="hub-related" className="mx-auto mt-14 max-w-6xl px-4">
                    <h2 id="hub-related" className="font-display text-2xl font-semibold">
                        {t.hub.related}
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-3">
                        {related.map((h) => (
                            <li key={hubPath(h)}>
                                <Link prefetch={false} href={localePath(locale, hubPath(h))} className="block rounded-full border border-line px-4 py-2 hover:bg-sand">
                                    {getHubPage(locale, h).label}
                                </Link>
                            </li>
                        ))}
                        {regionArticle && (
                            <li>
                                <Link prefetch={false} href={localePath(locale, entryPath(regionArticle.entry))} className="block rounded-full border border-line px-4 py-2 hover:bg-sand">
                                    {regionArticle.label}
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            )}

            <SaleNote locale={locale} />
        </>
    );
}
