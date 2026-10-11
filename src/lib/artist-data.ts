import fs from 'node:fs';
import path from 'node:path';

import type { CountryCode } from '@/content/catalog';
import { type Hub, type Medium, OCCUPATION_MEDIUM, WIKIDATA_COUNTRIES } from '@/content/hubs';
import type { Locale } from '@/lib/i18n';

/**
 * data/artists/artists.json, read once at build time: every African visual
 * artist on Wikidata, ranked by Wikipedia pageviews (scripts/artists-data.mjs,
 * refreshed monthly). Hub lists and the generated facts on profiles come from
 * here. Only the `page` and `list` tiers are used; `review` and `excluded`
 * rows are people Wikidata mislabels as visual artists.
 */

export interface DataArtist {
    qid: string;
    name: string;
    countries: CountryCode[];
    media: Medium[];
    born: number | null;
    died: number | null;
    views: number;
    /** Wikipedia article titles by language. */
    titles: Partial<Record<Locale, string>>;
}

interface RawArtist {
    qid: string;
    name: string;
    tier: string;
    countries: string[];
    occupations: string[];
    birthYear: number | null;
    deathYear?: number | null;
    views: { total: number };
    titles: Partial<Record<Locale, string>>;
}

let cache: Map<string, DataArtist> | null = null;

function load(): Map<string, DataArtist> {
    if (cache) return cache;
    const file = path.join(process.cwd(), 'data', 'artists', 'artists.json');
    const raw = JSON.parse(fs.readFileSync(file, 'utf8')) as { artists: RawArtist[] };
    cache = new Map();
    for (const a of raw.artists) {
        if (a.tier !== 'page' && a.tier !== 'list') continue;
        cache.set(a.qid, {
            qid: a.qid,
            name: a.name,
            countries: a.countries.map((c) => WIKIDATA_COUNTRIES[c]).filter(Boolean),
            media: a.occupations.map((o) => OCCUPATION_MEDIUM[o]).filter(Boolean),
            born: a.birthYear,
            died: a.deathYear ?? null,
            views: a.views.total,
            titles: a.titles,
        });
    }
    return cache;
}

export function dataArtist(qid: string): DataArtist | undefined {
    return load().get(qid);
}

/** Everyone a hub lists, most looked-up first. */
export function hubMembers(hub: Hub): DataArtist[] {
    return [...load().values()]
        .filter((a) => (!hub.country || a.countries.includes(hub.country)) && (!hub.medium || a.media.includes(hub.medium)))
        .sort((a, b) => b.views - a.views || a.name.localeCompare(b.name));
}

/**
 * The name to show in an edition. Wikidata labels are in Latin script; on the
 * Arabic edition the Arabic Wikipedia title is used when there is one, without
 * a disambiguation suffix such as "(مصور)".
 */
export function displayName(artist: DataArtist, locale: Locale): string {
    const title = locale === 'ar' ? artist.titles.ar : undefined;
    return title ? title.replace(/\s*\([^)]*\)\s*$/, '') : artist.name;
}

/** The artist's Wikipedia article in the reader's language, or in English. */
export function wikipediaUrl(artist: DataArtist, locale: Locale): string | null {
    const lang = artist.titles[locale] ? locale : artist.titles.en ? 'en' : null;
    if (!lang) return null;
    return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(artist.titles[lang]!.replaceAll(' ', '_'))}`;
}

export function wikidataUrl(qid: string): string {
    return `https://www.wikidata.org/wiki/${qid}`;
}

/**
 * '1960–1994', or '1962–' for the living. Someone born over a century ago with
 * no recorded death gets the birth year alone: Wikidata is missing the date,
 * and an open dash would say they are alive.
 */
export function lifeYears(artist: Pick<DataArtist, 'born' | 'died'>): string {
    if (artist.born === null) return '';
    if (artist.died !== null) return `${artist.born}–${artist.died}`;
    return artist.born < new Date().getUTCFullYear() - 100 ? String(artist.born) : `${artist.born}–`;
}
