import { dictionary } from '@/i18n';
import { CATALOG, isAvailable, type Collection } from '@/content/catalog';
import { hubPath, liveHubs } from '@/content/hubs';
import { allDataArtists, displayName, lifeYears } from '@/lib/artist-data';
import { getArticle, getHubPage } from '@/lib/content';
import { type Locale, joinList } from '@/lib/i18n';
import { entryPath } from '@/content/catalog';
import { type SearchEntry, normalize } from '@/lib/search';

/**
 * The search index of one edition, built at build time and served as a static
 * file (/api/search/<locale>, under the /api/ prefix robots.txt already
 * disallows): our own pages in that edition, our lists of artists, and every
 * artist the lists name that has no profile in this edition, linked to
 * Wikipedia. The browser loads it the first time someone focuses the box.
 *
 * Search text carries every spelling: the label, the English name, and the
 * Wikipedia titles in all editions, so "Chaibia" finds the Arabic profile and
 * "الشعيبية" finds the English one's list entry.
 */

const cache = new Map<Locale, SearchEntry[]>();

export function searchIndex(locale: Locale): SearchEntry[] {
    const cached = cache.get(locale);
    if (cached) return cached;
    const t = dictionary(locale);
    const entries: SearchEntry[] = [];
    const profiled = new Set<string>();
    const dataByQid = new Map(allDataArtists().map((a) => [a.qid, a]));

    // Our own pages, profiles first in the file so ties rank them above the rest.
    const collections: Collection[] = ['artists', 'art-forms', 'movements', 'regions', 'music', 'guides'];
    for (const collection of collections) {
        for (const entry of CATALOG.filter((e) => e.collection === collection && isAvailable(e, locale))) {
            const article = getArticle(locale, collection, entry.slug)!;
            const data = entry.qid ? dataByQid.get(entry.qid) : undefined;
            if (entry.qid) profiled.add(entry.qid);
            const meta =
                collection === 'artists'
                    ? [joinList(entry.countries.map((c) => t.countries[c]), locale), entry.years].filter(Boolean).join(' · ')
                    : t.nav[collection];
            const names = [article.label, article.heading, entry.slug.replaceAll('-', ' ')];
            if (data) names.push(data.name, ...Object.values(data.titles));
            entries.push({
                k: collection === 'artists' ? 'profile' : 'page',
                l: article.label,
                h: entryPath(entry),
                m: meta,
                s: [...new Set(names.map(normalize))].join(' '),
            });
        }
    }

    for (const hub of liveHubs(locale)) {
        const page = getHubPage(locale, hub);
        entries.push({ k: 'list', l: page.label, h: hubPath(hub), m: t.profile.lists, s: normalize(`${page.label} ${page.heading}`) });
    }

    // Artists the lists name but we have no profile of in this edition: Wikipedia, most read first.
    for (const a of allDataArtists()) {
        if (profiled.has(a.qid)) continue;
        const lang = a.titles[locale] ? locale : a.titles.en ? 'en' : null;
        if (!lang) continue;
        const years = lifeYears(a);
        entries.push({
            k: 'wikipedia',
            l: displayName(a, locale),
            h: `${lang}:${a.titles[lang]}`,
            m: [joinList(a.countries.map((c) => t.countries[c]), locale), years].filter(Boolean).join(' · '),
            s: [...new Set([a.name, displayName(a, locale), ...Object.values(a.titles)].map(normalize))].join(' '),
        });
    }

    cache.set(locale, entries);
    return entries;
}

