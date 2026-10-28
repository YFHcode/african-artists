/**
 * docs/profile-expansion-plan.md in code: the length targets for artist
 * profiles, the profiles written before them, and the batches that expand
 * those profiles. The content tests enforce the targets; the catalog dates each
 * expanded profile by its batch, so the sitemap's lastmod reflects the change.
 *
 * Free of runtime imports so the tests and the browser can load it.
 */

/** Minimum words of English text below the header (not the summary or the facts box). */
export const PROFILE_TARGET_WORDS = { full: 600, short: 300 } as const;

/** Words as the targets count them: link targets left out, numbers included. */
export function countProfileWords(markdown: string): number {
    return markdown.replace(/\]\([^)]*\)/g, ']').match(/[\p{L}\p{N}_]+/gu)?.length ?? 0;
}

/**
 * The 110 profiles that existed when the targets were set (27 October 2026).
 * Frozen: it never grows, so every later profile must meet its target. A
 * profile on it is exempt only until a batch expands it.
 */
export const WRITTEN_BEFORE_TARGETS: ReadonlySet<string> = new Set([
    'adam-henein', 'adel-abdessemed', 'afewerk-tekle', 'ahmed-umar', 'aina-onabolu', 'amoako-boafo',
    'amon-kotei', 'anna-boghiguian', 'anton-hammerl', 'augustus-washington', 'austin-stevens',
    'bachir-yelles', 'baya', 'ben-enwonwu', 'boniface-mwangi', 'breyten-breytenbach',
    'bruce-onobrakpeya', 'bruno-catalano', 'caleb-azumah-nelson', 'caleb-femi', 'chaibia-talal',
    'cheri-cherin', 'cheri-samba', 'coert-steynberg', 'dan-eldon', 'david-goldblatt', 'dumile-feni',
    'effat-nagy', 'el-anatsui', 'el-seed', 'ernest-cole', 'esther-mahlangu', 'farid-belkahia',
    'farida-of-egypt', 'farouk-hosny', 'foday-sankoh', 'frank-edoho', 'george-lilanga', 'ghada-amer',
    'greg-marinovich', 'hamza-yassin', 'hassan-el-glaoui', 'hassan-hajjaj', 'hussein-bicar',
    'hussein-shariffe', 'ibrahim-el-salahi', 'ibrahim-mahama', 'inji-aflatoun', 'irma-stern',
    'james-barnor', 'jh-pierneef', 'joao-silva', 'ken-oosterbroek', 'kevin-carter', 'khadija-saye',
    'kofi-antubam', 'kwame-akoto-bamfo', 'ladi-kwali', 'laetitia-ky', 'leila-alaoui',
    'leni-riefenstahl', 'leon-botha', 'lubaina-himid', 'magdalene-odundo', 'mahi-binebine',
    'mahjoubi-aherdane', 'mahmoud-mokhtar', 'mahmoud-said', 'malangatana', 'malick-sidibe',
    'marlene-dumas', 'mhamed-issiakhem', 'misan-harriman', 'mohamed-amin', 'mohamed-hamidi',
    'mohamed-maradji', 'mohamed-mrabet', 'mohammed-khadda', 'njideka-akunyili-crosby', 'nnenna-okore',
    'ntare-mwine', 'nzante-spee', 'otobong-nkanga', 'ousmane-sow', 'peter-magubane', 'rabah-driassa',
    'roger-ballen', 'romuald-hazoume', 'sam-nzima', 'samuel-fosso', 'sani-maikatanga',
    'seni-awa-camara', 'seydou-keita', 'sharon-dede-padi', 'skunder-boghossian', 'tahar-ben-jelloun',
    'twins-seven-seven', 'ty-bello', 'uche-okeke', 'vladimir-tretchikoff', 'wael-shawky',
    'wangechi-mutu', 'web-du-bois', 'william-kentridge', 'yinka-shonibare', 'youssef-nabil',
    'yto-barrada', 'zanele-muholi', 'zoubeir-turki', 'zwelethu-mthethwa',
]);

/**
 * Each batch as it goes live: the day (its profiles' `updated` date), the
 * profiles it expanded, and other articles it changed (links to the expanded
 * profiles), as 'collection/slug'.
 */
export const EXPANSION_BATCHES: { date: string; expanded: string[]; alsoRevised: string[] }[] = [
    {
        // Batch 1, the pilot. Leon Botha stays short: the sources ran out before the full target.
        date: '2026-10-27',
        expanded: [
            'ibrahim-mahama', 'joao-silva', 'vladimir-tretchikoff', 'ladi-kwali', 'twins-seven-seven',
            'misan-harriman', 'dan-eldon', 'sharon-dede-padi', 'bruno-catalano', 'leon-botha',
        ],
        alsoRevised: [
            'art-forms/african-photography', 'art-forms/african-sculpture', 'artists/james-barnor', 'artists/mohamed-amin',
            'artists/ousmane-sow', 'guides/african-women-artists', 'guides/contemporary-african-art', 'regions/east-africa',
            'regions/north-africa', 'regions/west-africa',
        ],
    },
    {
        // Batch 2. All eleven were already full profiles, so no new links were needed. The date is the day
        // the batch went live.
        date: '2026-10-27',
        expanded: [
            'kevin-carter', 'william-kentridge', 'ken-oosterbroek', 'farouk-hosny', 'yinka-shonibare', 'baya',
            'el-anatsui', 'njideka-akunyili-crosby', 'zanele-muholi', 'marlene-dumas', 'lubaina-himid',
        ],
        alsoRevised: [],
    },
    {
        // Batch 3. Roger Ballen was promoted to a full profile and linked from three articles. Sani Maikatanga
        // stays short: the sources ran out at about 300 words.
        date: '2026-10-27',
        expanded: [
            'mahmoud-mokhtar', 'esther-mahlangu', 'greg-marinovich', 'wangechi-mutu', 'mohamed-amin', 'yto-barrada',
            'ernest-cole', 'hassan-el-glaoui', 'chaibia-talal', 'sani-maikatanga', 'roger-ballen',
        ],
        alsoRevised: ['artists/david-goldblatt', 'regions/southern-africa', 'art-forms/african-photography'],
    },
    {
        // Batch 4. Khadija Saye was promoted to a full profile and linked from three articles. Laetitia Ky and Austin
        // Stevens stay short: the sources ran out at about 300 words.
        date: '2026-10-27',
        expanded: [
            'ousmane-sow', 'ben-enwonwu', 'austin-stevens', 'magdalene-odundo', 'laetitia-ky', 'otobong-nkanga',
            'irma-stern', 'khadija-saye', 'sam-nzima', 'ibrahim-el-salahi', 'mahmoud-said',
        ],
        alsoRevised: ['guides/african-art-fairs-and-biennales', 'guides/african-women-artists', 'art-forms/african-photography'],
    },
    {
        // Batch 5. Nobody was promoted: Hussein Shariffe, Bruce Onobrakpeya, Leila Alaoui and Seyni Awa Camara
        // stay short, because the sources ran out at about 300 to 350 words.
        date: '2026-10-27',
        expanded: [
            'david-goldblatt', 'mhamed-issiakhem', 'mahi-binebine', 'afewerk-tekle', 'hussein-shariffe', 'cheri-samba',
            'malick-sidibe', 'amoako-boafo', 'bruce-onobrakpeya', 'leila-alaoui', 'seni-awa-camara',
        ],
        alsoRevised: [],
    },
    {
        // Batch 6. Nobody was promoted: Adel Abdessemed, Skunder Boghossian, George Lilanga, Romuald Hazoumè and
        // Dumile Feni stay short, because the sources ran out at 310 to 430 words.
        date: '2026-10-28',
        expanded: [
            'malangatana', 'adam-henein', 'seydou-keita', 'hussein-bicar', 'adel-abdessemed', 'inji-aflatoun',
            'skunder-boghossian', 'ghada-amer', 'george-lilanga', 'romuald-hazoume', 'dumile-feni',
        ],
        alsoRevised: [],
    },
    {
        // Batch 7. Mohammed Khadda, Peter Magubane and Farid Belkahia were already full profiles. The other seven stay
        // short: the sources ran out at 309 to 431 words.
        date: '2026-10-28',
        expanded: [
            'kwame-akoto-bamfo', 'nnenna-okore', 'jh-pierneef', 'uche-okeke', 'aina-onabolu', 'samuel-fosso',
            'effat-nagy', 'mohammed-khadda', 'peter-magubane', 'farid-belkahia',
        ],
        alsoRevised: [],
    },
];

/**
 * Expanded profiles left below target because the reliable sources ran out,
 * with the reason. Padding is worse than a shorter page.
 */
export const SOURCES_EXHAUSTED: Record<string, string> = {};

export const EXPANDED: ReadonlySet<string> = new Set(EXPANSION_BATCHES.flatMap((b) => b.expanded));
