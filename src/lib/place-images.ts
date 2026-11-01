import fs from 'node:fs';
import path from 'node:path';

import type { Picture } from '@/lib/artist-images';
import type { Locale } from '@/lib/i18n';

/**
 * data/images/places.json, read once at build time: freely licensed Commons
 * photographs of the places and events our guides describe, stored under
 * public/images/places/ (scripts/place-images.mjs, run by hand from GitHub
 * Actions). Keyed by 'collection/slug'. Absent or empty: no gallery.
 */
export interface PlacePicture extends Picture {
    /** Caption per edition; English is what Commons describes the file as. */
    caption: Partial<Record<Locale, string>>;
}

let cache: Record<string, PlacePicture[]> | undefined;

function load(): Record<string, PlacePicture[]> {
    if (!cache) {
        try {
            const file = path.join(process.cwd(), 'data', 'images', 'places.json');
            cache = (JSON.parse(fs.readFileSync(file, 'utf8')) as { pages?: Record<string, PlacePicture[]> }).pages ?? {};
        } catch {
            cache = {};
        }
    }
    return cache;
}

/** The photographs of one page, by 'collection/slug'. */
export function placePictures(key: string): PlacePicture[] {
    return load()[key] ?? [];
}

/** Every page that has photographs, for the credits page. */
export function allPlacePictures(): [string, PlacePicture[]][] {
    return Object.entries(load()).filter(([, pics]) => pics.length > 0);
}

export function placeCaption(pic: PlacePicture, locale: Locale): string | undefined {
    return pic.caption[locale] ?? (locale === 'en' ? pic.caption.en : undefined);
}
