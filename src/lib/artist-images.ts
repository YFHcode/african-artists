import fs from 'node:fs';
import path from 'node:path';

import type { Locale } from '@/lib/i18n';

/**
 * data/images/images.json, read once at build time: a portrait and up to four
 * works per profiled artist, freely licensed pictures from Wikimedia Commons
 * stored under public/images/artists/ (scripts/artist-images.mjs, refreshed
 * monthly). Every picture carries the credit its licence asks for.
 */

export interface Picture {
    /** Public path of the stored 500px WebP copy. */
    src: string;
    width: number;
    height: number;
    /** Commons file name. */
    file: string;
    /** Plain-text author, or null for some public-domain files. */
    author: string | null;
    license: string;
    licenseUrl: string | null;
    /** The file's page on Commons. */
    page: string;
}

export interface Work extends Picture {
    qid: string;
    title: Partial<Record<Locale, string>> & { en: string };
    year: number | null;
}

export interface ArtistPictures {
    slug: string;
    portrait: Picture | null;
    works: Work[];
}

let cache: Map<string, ArtistPictures> | undefined;

function load(): Map<string, ArtistPictures> {
    if (!cache) {
        const file = path.join(process.cwd(), 'data', 'images', 'images.json');
        const raw = JSON.parse(fs.readFileSync(file, 'utf8')) as { artists: Record<string, ArtistPictures> };
        cache = new Map(Object.entries(raw.artists));
    }
    return cache;
}

/** The pictures of an artist, by Wikidata ID; undefined when there are none. */
export function artistPictures(qid: string | undefined): ArtistPictures | undefined {
    return qid ? load().get(qid) : undefined;
}

/** The one picture that stands for an artist on cards: the portrait, else the best-known work. */
export function coverPicture(qid: string | undefined): (Picture & { work?: Work }) | undefined {
    const p = artistPictures(qid);
    if (!p) return undefined;
    if (p.portrait) return p.portrait;
    const work = p.works[0];
    return work ? { ...work, work } : undefined;
}

export function workTitle(work: Work, locale: Locale): string {
    return work.title[locale] ?? work.title.en;
}

/** True for public domain and CC0, which need no licence link in the credit. */
export function isPublicDomain(license: string): boolean {
    return /^(public domain|pd|pdm|cc0|cc[- ]zero)/i.test(license);
}
