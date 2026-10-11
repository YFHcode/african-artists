/**
 * Hub pages: lists of artists by country, by medium, or both, built from
 * data/artists/artists.json (every African visual artist on Wikidata, ranked
 * by Wikipedia pageviews). Each hub has a hand-written introduction in
 * content/hubs/…/<locale>.md; the list under it is generated, so the monthly
 * data refresh keeps it current.
 *
 * Which hubs exist, in which wave and which languages, follows
 * docs/artist-pages-rollout.md: a country hub needs 8+ artists, a
 * country-and-medium or medium hub 10+ (a content test checks), and a hub gets
 * a language when its artists draw 10,000+ yearly views in that language.
 *
 * Imports only other pure modules, so the tests and the browser can load it.
 */

import type { CountryCode } from './catalog.ts';
import type { Locale } from '../lib/i18n.ts';
import { isReleased } from './waves.ts';

/** Disciplines, from Wikidata occupations. */
export const MEDIA = ['painting', 'photography', 'sculpture', 'printmaking', 'ceramics', 'visual-art'] as const;
export type Medium = (typeof MEDIA)[number];

/** Occupation label in data/artists -> medium. */
export const OCCUPATION_MEDIUM: Record<string, Medium> = {
    painter: 'painting',
    photographer: 'photography',
    sculptor: 'sculpture',
    printmaker: 'printmaking',
    ceramicist: 'ceramics',
    'visual artist': 'visual-art',
};

/** Media that can have a hub, and the URL slug of that hub. "Visual artist" is too vague to be one. */
export const MEDIUM_SLUGS: Partial<Record<Medium, string>> = {
    photography: 'photographers',
    painting: 'painters',
    sculpture: 'sculptors',
    printmaking: 'printmakers',
    ceramics: 'ceramic-artists',
};

/** Country names as Wikidata labels them in data/artists -> our codes. */
export const WIKIDATA_COUNTRIES: Record<string, CountryCode> = {
    Algeria: 'DZ',
    Angola: 'AO',
    Benin: 'BJ',
    Botswana: 'BW',
    'Burkina Faso': 'BF',
    Cameroon: 'CM',
    'Cape Verde': 'CV',
    'Central African Republic': 'CF',
    Chad: 'TD',
    'Democratic Republic of the Congo': 'CD',
    Egypt: 'EG',
    'Equatorial Guinea': 'GQ',
    Eritrea: 'ER',
    Ethiopia: 'ET',
    Gabon: 'GA',
    Ghana: 'GH',
    Guinea: 'GN',
    'Ivory Coast': 'CI',
    Kenya: 'KE',
    Liberia: 'LR',
    Libya: 'LY',
    Madagascar: 'MG',
    Malawi: 'MW',
    Mali: 'ML',
    Mauritius: 'MU',
    Morocco: 'MA',
    Mozambique: 'MZ',
    Namibia: 'NA',
    Nigeria: 'NG',
    'Republic of the Congo': 'CG',
    Rwanda: 'RW',
    Senegal: 'SN',
    'Sierra Leone': 'SL',
    Somalia: 'SO',
    'South Africa': 'ZA',
    Sudan: 'SD',
    Tanzania: 'TZ',
    'The Gambia': 'GM',
    Togo: 'TG',
    Tunisia: 'TN',
    Uganda: 'UG',
    Zambia: 'ZM',
    Zimbabwe: 'ZW',
};

/** URL slug of each country hub. */
export const COUNTRY_SLUGS: Partial<Record<CountryCode, string>> = {
    BJ: 'benin',
    CD: 'dr-congo',
    CI: 'cote-divoire',
    CM: 'cameroon',
    DZ: 'algeria',
    EG: 'egypt',
    ET: 'ethiopia',
    GH: 'ghana',
    KE: 'kenya',
    MA: 'morocco',
    ML: 'mali',
    MZ: 'mozambique',
    NA: 'namibia',
    NG: 'nigeria',
    SD: 'sudan',
    SN: 'senegal',
    TN: 'tunisia',
    UG: 'uganda',
    ZA: 'south-africa',
    ZM: 'zambia',
    ZW: 'zimbabwe',
};

export type HubKind = 'country' | 'country-medium' | 'medium';

export interface Hub {
    country?: CountryCode;
    medium?: Medium;
    wave: number;
    locales: readonly Locale[];
}

/** Smallest list each kind of hub may have; below it the artists stay on the region page. */
export const HUB_MIN_SIZE: Record<HubKind, number> = { country: 8, 'country-medium': 10, medium: 10 };

// BEGIN GENERATED (hub list, from the rollout plan and the first data run)
export const HUBS: Hub[] = [
    // Wave 1
    { medium: 'photography', wave: 1, locales: ['en', 'fr', 'es', 'pt', 'ar'] },
    { country: 'ZA', medium: 'photography', wave: 1, locales: ['en', 'fr', 'es', 'pt'] },
    { country: 'NG', medium: 'photography', wave: 1, locales: ['en', 'fr'] },
    { country: 'EG', medium: 'photography', wave: 1, locales: ['en'] },
    { country: 'MA', medium: 'photography', wave: 1, locales: ['en', 'fr'] },
    { country: 'CD', medium: 'photography', wave: 1, locales: ['en'] },
    { country: 'GH', medium: 'photography', wave: 1, locales: ['en'] },
    // Wave 2
    { country: 'ZA', wave: 2, locales: ['en', 'fr', 'es', 'pt'] },
    { country: 'ZA', medium: 'painting', wave: 2, locales: ['en', 'fr', 'es'] },
    { country: 'ZA', medium: 'sculpture', wave: 2, locales: ['en', 'fr'] },
    { country: 'ZA', medium: 'printmaking', wave: 2, locales: ['en'] },
    { country: 'ZW', wave: 2, locales: ['en'] },
    { country: 'ZW', medium: 'sculpture', wave: 2, locales: ['en'] },
    { country: 'MZ', wave: 2, locales: ['en'] },
    { country: 'ZM', wave: 2, locales: ['en'] },
    { country: 'NA', wave: 2, locales: ['en'] },
    // Wave 3
    { country: 'NG', wave: 3, locales: ['en', 'fr'] },
    { country: 'NG', medium: 'painting', wave: 3, locales: ['en', 'fr'] },
    { country: 'NG', medium: 'sculpture', wave: 3, locales: ['en', 'fr'] },
    { country: 'GH', wave: 3, locales: ['en'] },
    { country: 'GH', medium: 'painting', wave: 3, locales: ['en'] },
    { country: 'GH', medium: 'sculpture', wave: 3, locales: ['en'] },
    // Wave 4
    { country: 'MA', wave: 4, locales: ['en', 'fr', 'ar'] },
    { country: 'MA', medium: 'painting', wave: 4, locales: ['en', 'fr', 'ar'] },
    { country: 'MA', medium: 'sculpture', wave: 4, locales: ['en', 'fr'] },
    { country: 'DZ', wave: 4, locales: ['en', 'fr', 'ar'] },
    { country: 'DZ', medium: 'painting', wave: 4, locales: ['en', 'fr', 'ar'] },
    { country: 'TN', wave: 4, locales: ['en', 'fr', 'ar'] },
    { country: 'TN', medium: 'painting', wave: 4, locales: ['en', 'fr', 'ar'] },
    // Wave 5
    { country: 'EG', wave: 5, locales: ['en', 'fr', 'ar'] },
    { country: 'EG', medium: 'painting', wave: 5, locales: ['en', 'ar'] },
    { country: 'EG', medium: 'sculpture', wave: 5, locales: ['en', 'ar'] },
    { country: 'SD', wave: 5, locales: ['en'] },
    // Wave 6
    { country: 'KE', wave: 6, locales: ['en'] },
    { country: 'ET', wave: 6, locales: ['en'] },
    { country: 'UG', wave: 6, locales: ['en'] },
    { country: 'SN', wave: 6, locales: ['en', 'fr'] },
    { country: 'SN', medium: 'painting', wave: 6, locales: ['en'] },
    { country: 'CD', wave: 6, locales: ['en', 'fr'] },
    { country: 'CD', medium: 'painting', wave: 6, locales: ['en', 'fr'] },
    { country: 'CM', wave: 6, locales: ['en', 'fr'] },
    { country: 'BJ', wave: 6, locales: ['en'] },
    { country: 'CI', wave: 6, locales: ['en', 'fr'] },
    { country: 'ML', wave: 6, locales: ['en'] },
    // Wave 7
    { medium: 'painting', wave: 7, locales: ['en', 'fr', 'es', 'pt', 'ar'] },
    { medium: 'sculpture', wave: 7, locales: ['en', 'fr', 'es', 'ar'] },
    { medium: 'printmaking', wave: 7, locales: ['en', 'fr'] },
    { medium: 'ceramics', wave: 7, locales: ['en'] },
];
// END GENERATED

export function hubKind(hub: Hub): HubKind {
    return hub.country && hub.medium ? 'country-medium' : hub.country ? 'country' : 'medium';
}

/** Public, edition-independent path: /artists/country/south-africa/photographers. */
export function hubPath(hub: Hub): string {
    const medium = hub.medium ? MEDIUM_SLUGS[hub.medium] : undefined;
    if (hub.country) {
        const base = `/artists/country/${COUNTRY_SLUGS[hub.country]}`;
        return medium ? `${base}/${medium}` : base;
    }
    return `/artists/medium/${medium}`;
}

/** Where the hub's introduction lives under content/: ['hubs', 'country', 'south-africa', 'photographers']. */
export function hubContentDir(hub: Hub): string[] {
    return ['hubs', ...hubPath(hub).split('/').slice(2)];
}

export function releasedHubs(): Hub[] {
    return HUBS.filter((hub) => isReleased(hub.wave));
}

/** Released hubs that exist in an edition. */
export function liveHubs(locale: Locale): Hub[] {
    return releasedHubs().filter((h) => h.locales.includes(locale));
}

/** Live hubs that list an artist with these countries and media (the "Lists of artists" on a profile). */
export function hubsListing(countries: readonly string[], media: readonly string[], locale: Locale): Hub[] {
    return liveHubs(locale).filter(
        (h) => (!h.country || countries.includes(h.country)) && (!h.medium || media.includes(h.medium))
    );
}

export function findHub(country: CountryCode | undefined, medium: Medium | undefined): Hub | undefined {
    return HUBS.find((h) => h.country === country && h.medium === medium);
}

export function countryBySlug(slug: string): CountryCode | undefined {
    return (Object.keys(COUNTRY_SLUGS) as CountryCode[]).find((c) => COUNTRY_SLUGS[c] === slug);
}

export function mediumBySlug(slug: string): Medium | undefined {
    return (Object.keys(MEDIUM_SLUGS) as Medium[]).find((m) => MEDIUM_SLUGS[m] === slug);
}
