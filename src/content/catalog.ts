/**
 * Everything about an article that does not depend on the language.
 *
 * The words live in content/<collection>/<slug>/<locale>.md; this file holds
 * the facts every edition shares — which countries, which years, what it links
 * to, when it was published and last meaningfully revised — so that five
 * translations cannot drift apart on them.
 *
 * `updated` is the date the article's content last changed in a way a reader
 * would notice. It feeds the sitemap's lastmod and the Article schema's
 * dateModified; bumping it without a real change is fake freshness.
 *
 * Free of runtime imports so the content tests can load it under node.
 */

export const COLLECTIONS = ['art-forms', 'artists', 'movements', 'regions', 'music', 'guides'] as const;
export type Collection = (typeof COLLECTIONS)[number];

export type CountryCode =
    | 'AO' | 'BF' | 'BJ' | 'CD' | 'CG' | 'CI' | 'CM' | 'CV' | 'DZ' | 'EG'
    | 'ET' | 'GA' | 'GH' | 'KE' | 'MA' | 'ML' | 'MZ' | 'NG' | 'SD' | 'SN'
    | 'TZ' | 'ZA' | 'ZW';

/**
 * Which countries each region page gathers. Every country an article is
 * tagged with belongs to exactly one region (a test checks it), so a region
 * page lists everything on the site from that part of the continent.
 * Conventional groupings, not the UN's: Mozambique and Zimbabwe sit with
 * Southern Africa, Sudan with North Africa, Angola with Central Africa.
 */
export const REGIONS: Record<string, CountryCode[]> = {
    'north-africa': ['DZ', 'EG', 'MA', 'SD'],
    'west-africa': ['BF', 'BJ', 'CI', 'CV', 'GH', 'ML', 'NG', 'SN'],
    'central-africa': ['AO', 'CD', 'CG', 'CM', 'GA'],
    'east-africa': ['ET', 'KE', 'TZ'],
    'southern-africa': ['MZ', 'ZA', 'ZW'],
};

export interface Entry {
    collection: Collection;
    slug: string;
    countries: CountryCode[];
    /** Years shown on cards: '1917–1994', '1944–', '1958–1962', '1970s–'. */
    years?: string;
    /** Up to six related articles, as 'collection/slug'. Rendered in order. */
    related: string[];
    published: string;
    updated: string;
}

const LAUNCH = '2026-10-07';
/** Art forms, regions, two guides and the Spanish edition. */
const EXPANSION = '2026-10-08';

function entry(
    collection: Collection,
    slug: string,
    countries: CountryCode[],
    years: string | undefined,
    related: string[],
    published: string = LAUNCH
): Entry {
    return { collection, slug, countries, years, related, published, updated: published };
}

const REGION_SLUGS = Object.keys(REGIONS);
const region = (slug: string) =>
    entry('regions', slug, [], undefined, REGION_SLUGS.filter((s) => s !== slug).map((s) => `regions/${s}`), EXPANSION);

export const CATALOG: Entry[] = [
    // Art forms and traditions: the broad subjects first, then named traditions.
    entry('art-forms', 'african-masks', [], undefined, ['art-forms/african-sculpture', 'art-forms/african-textiles', 'guides/how-to-buy-african-art', 'guides/african-art-history'], EXPANSION),
    entry('art-forms', 'african-sculpture', [], undefined, ['art-forms/african-masks', 'art-forms/benin-bronzes', 'art-forms/shona-sculpture', 'artists/ousmane-sow'], EXPANSION),
    entry('art-forms', 'african-textiles', [], undefined, ['art-forms/kente-cloth', 'art-forms/mudcloth', 'art-forms/adinkra-symbols', 'artists/el-anatsui'], EXPANSION),
    entry('art-forms', 'african-beadwork', [], undefined, ['artists/esther-mahlangu', 'art-forms/african-textiles', 'art-forms/african-masks', 'regions/southern-africa'], EXPANSION),
    entry('art-forms', 'african-pottery', [], undefined, ['art-forms/african-sculpture', 'guides/african-women-artists', 'art-forms/african-beadwork', 'guides/how-to-buy-african-art'], EXPANSION),
    entry('art-forms', 'african-rock-art', [], undefined, ['guides/african-art-history', 'regions/southern-africa', 'regions/north-africa', 'art-forms/african-sculpture'], EXPANSION),
    entry('art-forms', 'african-photography', [], undefined, ['artists/seydou-keita', 'artists/malick-sidibe', 'guides/contemporary-african-art', 'guides/african-art-fairs-and-biennales'], EXPANSION),
    entry('art-forms', 'kente-cloth', ['GH'], undefined, ['art-forms/adinkra-symbols', 'art-forms/african-textiles', 'artists/el-anatsui', 'music/highlife'], EXPANSION),
    entry('art-forms', 'adinkra-symbols', ['GH'], undefined, ['art-forms/kente-cloth', 'art-forms/african-textiles', 'regions/west-africa', 'art-forms/mudcloth'], EXPANSION),
    entry('art-forms', 'mudcloth', ['ML'], undefined, ['art-forms/african-textiles', 'art-forms/kente-cloth', 'artists/malick-sidibe', 'regions/west-africa'], EXPANSION),
    entry('art-forms', 'benin-bronzes', ['NG'], undefined, ['art-forms/african-sculpture', 'guides/where-to-see-african-art', 'guides/african-art-history', 'regions/west-africa'], EXPANSION),
    entry('art-forms', 'ethiopian-art', ['ET'], undefined, ['regions/east-africa', 'guides/african-art-history', 'artists/ibrahim-el-salahi', 'art-forms/african-textiles'], EXPANSION),
    entry('art-forms', 'tingatinga', ['TZ'], '1968–', ['movements/congolese-popular-painting', 'art-forms/makonde-art', 'regions/east-africa', 'guides/how-to-buy-african-art'], EXPANSION),
    entry('art-forms', 'makonde-art', ['MZ', 'TZ'], undefined, ['art-forms/tingatinga', 'art-forms/african-masks', 'artists/malangatana', 'art-forms/shona-sculpture'], EXPANSION),
    entry('art-forms', 'shona-sculpture', ['ZW'], '1950s–', ['art-forms/african-sculpture', 'art-forms/makonde-art', 'regions/southern-africa', 'artists/ousmane-sow'], EXPANSION),

    // Visual artists
    entry('artists', 'el-anatsui', ['GH', 'NG'], '1944–', ['movements/zaria-art-society', 'artists/ben-enwonwu', 'artists/esther-mahlangu', 'guides/where-to-see-african-art']),
    entry('artists', 'ben-enwonwu', ['NG'], '1917–1994', ['movements/zaria-art-society', 'artists/el-anatsui', 'artists/njideka-akunyili-crosby', 'guides/how-to-buy-african-art']),
    entry('artists', 'njideka-akunyili-crosby', ['NG'], '1983–', ['artists/wangechi-mutu', 'artists/ben-enwonwu', 'artists/el-anatsui', 'guides/african-art-fairs-and-biennales']),
    entry('artists', 'wangechi-mutu', ['KE'], '1972–', ['artists/njideka-akunyili-crosby', 'artists/el-anatsui', 'guides/where-to-see-african-art', 'guides/african-women-artists']),
    entry('artists', 'esther-mahlangu', ['ZA'], '1935–', ['artists/el-anatsui', 'artists/malangatana', 'guides/where-to-see-african-art', 'music/amapiano']),
    entry('artists', 'ibrahim-el-salahi', ['SD'], '1930–', ['movements/khartoum-school', 'artists/farid-belkahia', 'artists/mahmoud-said', 'guides/where-to-see-african-art']),
    entry('artists', 'cheri-samba', ['CD'], '1956–', ['movements/congolese-popular-painting', 'music/congolese-rumba', 'artists/ousmane-sow', 'guides/african-women-artists']),
    entry('artists', 'malick-sidibe', ['ML'], '1935–2016', ['artists/seydou-keita', 'guides/african-art-fairs-and-biennales', 'music/mbalax', 'guides/where-to-see-african-art']),
    entry('artists', 'seydou-keita', ['ML'], '1921–2001', ['artists/malick-sidibe', 'guides/african-art-fairs-and-biennales', 'guides/african-women-artists', 'guides/how-to-buy-african-art']),
    entry('artists', 'ousmane-sow', ['SN'], '1935–2016', ['movements/ecole-de-dakar', 'artists/cheri-samba', 'artists/el-anatsui', 'guides/where-to-see-african-art']),
    entry('artists', 'malangatana', ['MZ'], '1936–2011', ['artists/esther-mahlangu', 'music/semba', 'artists/ibrahim-el-salahi', 'guides/african-women-artists']),
    entry('artists', 'farid-belkahia', ['MA'], '1934–2014', ['movements/casablanca-school', 'artists/baya', 'artists/ibrahim-el-salahi', 'music/gnawa']),
    entry('artists', 'baya', ['DZ'], '1931–1998', ['artists/farid-belkahia', 'artists/mahmoud-said', 'music/rai', 'guides/african-women-artists']),
    entry('artists', 'mahmoud-said', ['EG'], '1897–1964', ['artists/baya', 'artists/ibrahim-el-salahi', 'artists/farid-belkahia', 'guides/where-to-see-african-art']),

    // Movements
    entry('movements', 'zaria-art-society', ['NG'], '1958–1962', ['artists/ben-enwonwu', 'artists/el-anatsui', 'movements/oshogbo-school', 'movements/khartoum-school']),
    entry('movements', 'oshogbo-school', ['NG'], '1962–1966', ['movements/zaria-art-society', 'music/afrobeat', 'movements/congolese-popular-painting', 'guides/african-women-artists']),
    entry('movements', 'khartoum-school', ['SD'], '1960–1975', ['artists/ibrahim-el-salahi', 'movements/casablanca-school', 'movements/zaria-art-society', 'movements/ecole-de-dakar']),
    entry('movements', 'ecole-de-dakar', ['SN'], '1960–1974', ['artists/ousmane-sow', 'movements/khartoum-school', 'music/mbalax', 'guides/african-art-fairs-and-biennales']),
    entry('movements', 'casablanca-school', ['MA'], '1962–1974', ['artists/farid-belkahia', 'movements/khartoum-school', 'artists/baya', 'music/gnawa']),
    entry('movements', 'congolese-popular-painting', ['CD'], '1970s–', ['artists/cheri-samba', 'music/congolese-rumba', 'movements/oshogbo-school', 'guides/how-to-buy-african-art']),

    // Regions: each page also lists every article from its countries.
    region('north-africa'),
    region('west-africa'),
    region('central-africa'),
    region('east-africa'),
    region('southern-africa'),

    // Music
    entry('music', 'afrobeat', ['NG'], '1970s–', ['music/afrobeats', 'music/highlife', 'movements/oshogbo-school', 'music/mbalax']),
    entry('music', 'afrobeats', ['NG', 'GH'], '2000s–', ['music/afrobeat', 'music/amapiano', 'music/highlife', 'music/congolese-rumba']),
    entry('music', 'highlife', ['GH', 'NG'], '1920s–', ['music/afrobeat', 'music/afrobeats', 'music/congolese-rumba', 'artists/el-anatsui']),
    entry('music', 'amapiano', ['ZA'], '2012–', ['music/afrobeats', 'music/semba', 'artists/esther-mahlangu', 'music/highlife']),
    entry('music', 'congolese-rumba', ['CD', 'CG'], '1940s–', ['movements/congolese-popular-painting', 'artists/cheri-samba', 'music/semba', 'music/highlife']),
    entry('music', 'mbalax', ['SN'], '1970s–', ['music/afrobeat', 'movements/ecole-de-dakar', 'music/congolese-rumba', 'artists/malick-sidibe']),
    entry('music', 'rai', ['DZ'], '1920s–', ['music/gnawa', 'artists/baya', 'music/mbalax', 'music/morna']),
    entry('music', 'gnawa', ['MA'], undefined, ['music/rai', 'artists/farid-belkahia', 'movements/casablanca-school', 'music/mbalax']),
    entry('music', 'morna', ['CV'], '19th c.–', ['music/semba', 'music/congolese-rumba', 'music/rai', 'artists/malangatana']),
    entry('music', 'semba', ['AO'], '1940s–', ['music/morna', 'music/congolese-rumba', 'music/amapiano', 'artists/malangatana']),

    // Guides
    entry('guides', 'african-art-history', [], undefined, ['art-forms/african-rock-art', 'art-forms/african-masks', 'art-forms/benin-bronzes', 'guides/contemporary-african-art'], EXPANSION),
    entry('guides', 'contemporary-african-art', [], undefined, ['guides/african-art-fairs-and-biennales', 'artists/el-anatsui', 'guides/african-women-artists', 'art-forms/african-photography'], EXPANSION),
    entry('guides', 'african-women-artists', [], undefined, ['artists/esther-mahlangu', 'artists/baya', 'artists/wangechi-mutu', 'artists/njideka-akunyili-crosby']),
    entry('guides', 'how-to-buy-african-art', [], undefined, ['guides/african-art-fairs-and-biennales', 'guides/where-to-see-african-art', 'movements/congolese-popular-painting', 'guides/african-women-artists']),
    entry('guides', 'african-art-fairs-and-biennales', [], undefined, ['guides/how-to-buy-african-art', 'guides/where-to-see-african-art', 'artists/malick-sidibe', 'movements/ecole-de-dakar']),
    entry('guides', 'where-to-see-african-art', [], undefined, ['guides/african-art-fairs-and-biennales', 'guides/african-women-artists', 'artists/el-anatsui', 'guides/how-to-buy-african-art']),
];

/**
 * Launch articles whose text changed in the expansion — each gained links to
 * the new art-form, region and guide pages — so their dates say so.
 */
const REVISED_IN_EXPANSION = [
    'artists/el-anatsui', 'artists/esther-mahlangu', 'artists/ibrahim-el-salahi', 'artists/malick-sidibe',
    'artists/seydou-keita', 'artists/ousmane-sow', 'artists/malangatana', 'artists/mahmoud-said',
    'movements/zaria-art-society', 'movements/oshogbo-school', 'movements/casablanca-school',
    'movements/congolese-popular-painting', 'music/highlife', 'music/congolese-rumba',
    'guides/african-women-artists', 'guides/how-to-buy-african-art', 'guides/african-art-fairs-and-biennales',
    'guides/where-to-see-african-art',
];
for (const e of CATALOG) if (REVISED_IN_EXPANSION.includes(entryKey(e))) e.updated = EXPANSION;

export function entryKey(entry: Pick<Entry, 'collection' | 'slug'>): string {
    return `${entry.collection}/${entry.slug}`;
}

export function entriesIn(collection: Collection): Entry[] {
    return CATALOG.filter((e) => e.collection === collection);
}

export function findEntry(collection: string, slug: string): Entry | undefined {
    return CATALOG.find((e) => e.collection === collection && e.slug === slug);
}

/** The region a country belongs to, as a slug of REGIONS. */
export function regionOf(country: CountryCode): string | undefined {
    return Object.keys(REGIONS).find((slug) => REGIONS[slug].includes(country));
}

/** Everything on the site from one region, in catalog order, the region pages themselves excluded. */
export function entriesInRegion(slug: string): Entry[] {
    const countries = REGIONS[slug] ?? [];
    return CATALOG.filter((e) => e.collection !== 'regions' && e.countries.some((c) => countries.includes(c)));
}

/** Public, edition-independent path of an article or a collection index. */
export function entryPath(entry: Pick<Entry, 'collection' | 'slug'>): string {
    return `/${entry.collection}/${entry.slug}`;
}

/**
 * Pages that are not articles. Every one exists in every edition. `index`
 * false keeps a page out of the sitemap and adds noindex — the thank-you page
 * after an offer has nothing a searcher wants.
 *
 * `updated` is when the page's own text last changed. Hubs (the home page and
 * the collection indexes) also change whenever an article they list does; the
 * sitemap takes the later of the two.
 */
export const STATIC_PAGES: { path: string; index: boolean; updated: string; lists?: Collection[] }[] = [
    { path: '/', index: true, updated: EXPANSION, lists: [...COLLECTIONS] },
    { path: '/buy', index: true, updated: LAUNCH },
    { path: '/buy/thanks', index: false, updated: LAUNCH },
    { path: '/art-forms', index: true, updated: EXPANSION, lists: ['art-forms'] },
    { path: '/artists', index: true, updated: LAUNCH, lists: ['artists'] },
    { path: '/movements', index: true, updated: LAUNCH, lists: ['movements'] },
    { path: '/regions', index: true, updated: EXPANSION, lists: ['regions'] },
    { path: '/music', index: true, updated: LAUNCH, lists: ['music'] },
    { path: '/guides', index: true, updated: EXPANSION, lists: ['guides'] },
    { path: '/about', index: true, updated: EXPANSION },
    { path: '/privacy', index: true, updated: LAUNCH },
];

/** Every indexable public path, edition-independent: what the sitemap lists in each language. */
export function indexablePaths(): { path: string; updated: string }[] {
    const pages = STATIC_PAGES.filter((p) => p.index).map((page) => {
        const listed = CATALOG.filter((e) => page.lists?.includes(e.collection)).map((e) => e.updated);
        return { path: page.path, updated: [page.updated, ...listed].sort().at(-1)! };
    });
    const articles = CATALOG.map((e) => ({ path: entryPath(e), updated: e.updated }));
    return [...pages, ...articles];
}
