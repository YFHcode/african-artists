import { CATALOG, entryPath, localesOf } from '@/content/catalog';
import { hubPath, releasedHubs } from '@/content/hubs';
import { dictionary } from '@/i18n';
import { type Picture, artistPictures } from '@/lib/artist-images';
import { hubMembers } from '@/lib/artist-data';
import { getArticle, getHubPage } from '@/lib/content';
import type { Locale } from '@/lib/i18n';

/**
 * The share images (app/share): one 1200×630 card per article and per hub, in
 * each edition the page exists in, with the page's heading and, on an artist
 * profile, the portrait. Open Graph, Twitter and the Article schema point to
 * it (seo.ts, schema.ts); the home page and the other fixed pages keep the
 * site card in public/og/.
 */

export interface ShareCard {
    /** The page's <h1>. */
    heading: string;
    /** The rest of the <title> after "Heading: " (or "Heading : "), when the title starts that way. */
    tagline: string;
    /** "Sculptor", "Music genre", or the number of artists on a hub. */
    kicker: string;
    /** The portrait, shown whole (not cropped) with its credit. */
    picture?: Picture;
}

/** Every page that has a card, edition-independent path first. */
export function shareCardPages(): { locale: Locale; path: string }[] {
    const articles = CATALOG.flatMap((e) => localesOf(e).map((locale) => ({ locale, path: entryPath(e) })));
    const hubs = releasedHubs().flatMap((h) => h.locales.map((locale) => ({ locale, path: hubPath(h) })));
    return [...articles, ...hubs];
}

function capitalise(text: string, locale: Locale): string {
    return text.charAt(0).toLocaleUpperCase(locale) + text.slice(1);
}

/** The card's text and picture, or null when the page has no card in that edition. */
export function shareCard(locale: Locale, path: string): ShareCard | null {
    const entry = CATALOG.find((e) => entryPath(e) === path);
    if (entry) {
        const article = getArticle(locale, entry.collection, entry.slug);
        if (!article) return null;
        // "Heading: tagline", or "Heading : tagline" in French.
        const rest = article.title.startsWith(article.heading) ? article.title.slice(article.heading.length).match(/^\s*:\s*(.+)$/)?.[1] : undefined;
        return {
            heading: article.heading,
            // "el político amazigh…" after a colon in a title reads better capitalised on its own.
            tagline: rest ? capitalise(rest, locale) : '',
            kicker: article.kicker,
            picture: entry.collection === 'artists' ? (artistPictures(entry.qid)?.portrait ?? undefined) : undefined,
        };
    }
    const hub = releasedHubs().find((h) => hubPath(h) === path);
    if (hub && hub.locales.includes(locale)) {
        const page = getHubPage(locale, hub);
        return { heading: page.heading, tagline: '', kicker: dictionary(locale).hub.count(hubMembers(hub).length) };
    }
    return null;
}
