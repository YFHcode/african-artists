import fs from 'node:fs';
import path from 'node:path';

import type { CountryCode } from '@/content/catalog';
import { type Hub, type Medium, OCCUPATION_MEDIUM, WIKIDATA_COUNTRIES, hubIncludes } from '@/content/hubs';
import { ORIGINAL_ARTISTS, ROSTER } from '@/content/roster';
import type { Locale } from '@/lib/i18n';

/**
 * data/artists/artists.json, read once at build time: every African visual
 * artist on Wikidata, ranked by Wikipedia pageviews (scripts/artists-data.mjs,
 * refreshed monthly). Hub lists and the generated facts on profiles come from
 * here. The `page` and `list` tiers are used, plus anyone with a planned
 * profile; other `review` rows and everyone on exclude.txt are left out.
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

const PROFILED = new Set([...Object.values(ORIGINAL_ARTISTS).map((o) => o.qid), ...ROSTER.map((r) => r.qid)]);

const DATA_DIR = path.join(process.cwd(), 'data', 'artists');

/**
 * corrections.json and exclude.txt are applied here as well as in the monthly
 * data job, so a fix goes live with the next deploy instead of waiting for the
 * job to run.
 */
function readFixes(): { corrections: Record<string, { birthYear?: number | null; deathYear?: number | null }>; exclude: Set<string> } {
    const corrections = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'corrections.json'), 'utf8'));
    const exclude = new Set(
        fs
            .readFileSync(path.join(DATA_DIR, 'exclude.txt'), 'utf8')
            .split('\n')
            .map((line) => line.replace(/#.*/, '').trim())
            .filter(Boolean)
    );
    return { corrections, exclude };
}

function load(): Map<string, DataArtist> {
    if (cache) return cache;
    const raw = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'artists.json'), 'utf8')) as { artists: RawArtist[] };
    const { corrections, exclude } = readFixes();
    cache = new Map();
    for (const original of raw.artists) {
        // The page and list tiers, plus anyone with a planned profile: a person
        // the job flagged for review (or that an old exclude list removed) is
        // in once someone decided to profile them.
        if (original.tier !== 'page' && original.tier !== 'list' && !PROFILED.has(original.qid)) continue;
        // Excluded people, and Wikidata items with no English label (the name is the QID).
        if (exclude.has(original.qid) || /^Q\d+$/.test(original.name)) continue;
        const a = { ...original, ...corrections[original.qid] };
        cache.set(a.qid, {
            qid: a.qid,
            name: a.name,
            countries: a.countries.map((c) => WIKIDATA_COUNTRIES[c]).filter(Boolean),
            media: a.occupations.map((o) => OCCUPATION_MEDIUM[o]).filter(Boolean),
            born: a.birthYear ?? null,
            // The data job already drops impossible death years; this is a safety net.
            died: a.deathYear != null && (a.birthYear == null || a.deathYear > a.birthYear) ? a.deathYear : null,
            views: a.views.total,
            titles: a.titles,
        });
    }
    return cache;
}

export function dataArtist(qid: string): DataArtist | undefined {
    return load().get(qid);
}

/** Everyone the site lists, most looked-up first (the search index is built from this). */
export function allDataArtists(): DataArtist[] {
    return [...load().values()].sort((a, b) => b.views - a.views || a.name.localeCompare(b.name));
}

/** Everyone a hub lists, most looked-up first. */
export function hubMembers(hub: Hub): DataArtist[] {
    return [...load().values()]
        .filter((a) => hubIncludes(hub, a))
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
