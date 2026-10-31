/**
 * Museum pages: one per museum, in content/museums/<slug>/<locale>.md.
 *
 * The facts every edition shares live here; the catalog turns each into an
 * entry of the 'museums' collection. A museum page exists in English and in
 * the languages its visitors are most likely to read (French for Senegal,
 * Mali and Morocco, Arabic for Morocco and Egypt…), so `locales` varies.
 *
 * Opening hours, prices and temporary closures change too often to keep
 * here: the pages send readers to the museum's own website for them.
 *
 * Imports only other pure modules, so the content tests can load it.
 */

import type { Locale } from '../lib/i18n.ts';
import type { CountryCode } from './catalog.ts';

export interface Museum {
    slug: string;
    country: CountryCode;
    /** The year shown on cards: when the museum (or the institution it grew from) opened. */
    opened: string;
    /** In English, for the schema's address. */
    city: string;
    locales: readonly Locale[];
    /** Up to six related articles, as 'collection/slug'. */
    related: string[];
    /** The museum's own site, or its operator's, where opening hours are kept. */
    website?: string;
    /** The English Wikipedia article's title, for sameAs and further reading. */
    wikipedia?: string;
}

/** When the first museum pages were published. */
export const MUSEUMS_RELEASE = '2026-10-31';

export const MUSEUMS: Museum[] = [
    {
        slug: 'nigerian-national-museum',
        country: 'NG',
        opened: '1957',
        city: 'Lagos',
        locales: ['en', 'fr'],
        related: ['museums/benin-city-national-museum', 'art-forms/benin-bronzes', 'artists/ben-enwonwu', 'guides/where-to-see-african-art'],
        wikipedia: 'Nigerian_National_Museum',
    },
    {
        slug: 'benin-city-national-museum',
        country: 'NG',
        opened: '1973',
        city: 'Benin City',
        locales: ['en', 'fr'],
        related: ['art-forms/benin-bronzes', 'museums/nigerian-national-museum', 'art-forms/african-sculpture', 'regions/west-africa'],
        wikipedia: 'Benin_City_National_Museum',
    },
    {
        slug: 'national-museum-of-ghana',
        country: 'GH',
        opened: '1957',
        city: 'Accra',
        locales: ['en', 'fr'],
        related: ['artists/kofi-antubam', 'art-forms/kente-cloth', 'art-forms/adinkra-symbols', 'museums/nigerian-national-museum'],
        website: 'https://gmmb.gov.gh/',
        wikipedia: 'National_Museum_of_Ghana',
    },
    {
        slug: 'national-museum-of-ethiopia',
        country: 'ET',
        opened: '1958',
        city: 'Addis Ababa',
        locales: ['en', 'fr'],
        related: ['art-forms/ethiopian-art', 'artists/afewerk-tekle', 'artists/skunder-boghossian', 'regions/east-africa'],
        wikipedia: 'National_Museum_of_Ethiopia',
    },
    {
        slug: 'national-museum-of-mali',
        country: 'ML',
        opened: '1953',
        city: 'Bamako',
        locales: ['en', 'fr'],
        related: ['art-forms/mudcloth', 'artists/seydou-keita', 'artists/malick-sidibe', 'art-forms/african-photography'],
        wikipedia: 'National_Museum_of_Mali',
    },
    {
        slug: 'theodore-monod-museum',
        country: 'SN',
        opened: '1936',
        city: 'Dakar',
        locales: ['en', 'fr'],
        related: ['museums/museum-of-black-civilisations', 'art-forms/african-masks', 'guides/african-art-fairs-and-biennales', 'movements/ecole-de-dakar'],
        wikipedia: 'Théodore_Monod_African_Art_Museum',
    },
    {
        slug: 'museum-of-black-civilisations',
        country: 'SN',
        opened: '2018',
        city: 'Dakar',
        locales: ['en', 'fr'],
        related: ['museums/theodore-monod-museum', 'guides/african-art-fairs-and-biennales', 'movements/ecole-de-dakar', 'guides/where-to-see-african-art'],
        wikipedia: 'Museum_of_Black_Civilisations',
    },
    {
        slug: 'zeitz-mocaa',
        country: 'ZA',
        opened: '2017',
        city: 'Cape Town',
        locales: ['en', 'fr', 'es', 'pt'],
        related: ['guides/contemporary-african-art', 'artists/william-kentridge', 'artists/el-anatsui', 'artists/zanele-muholi'],
        website: 'https://zeitzmocaa.museum/',
        wikipedia: 'Zeitz_Museum_of_Contemporary_Art_Africa',
    },
    {
        slug: 'mohammed-vi-museum',
        country: 'MA',
        opened: '2014',
        city: 'Rabat',
        locales: ['en', 'fr', 'ar'],
        related: ['movements/casablanca-school', 'artists/chaibia-talal', 'artists/hassan-el-glaoui', 'artists/farid-belkahia'],
        website: 'https://fnm.ma/',
        wikipedia: 'Mohammed_VI_Museum_of_Modern_and_Contemporary_Art',
    },
    {
        slug: 'museum-of-modern-egyptian-art',
        country: 'EG',
        opened: '1927',
        city: 'Cairo',
        locales: ['en', 'fr', 'ar'],
        related: ['artists/mahmoud-said', 'artists/mahmoud-mokhtar', 'artists/adam-henein', 'regions/north-africa'],
        wikipedia: 'Museum_of_Modern_Egyptian_Art',
    },
];

/** An English Wikipedia article's address from its title. */
export function wikipediaArticleUrl(title: string): string {
    return `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}
