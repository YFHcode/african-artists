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
export const EXPANSION_BATCHES: { date: string; expanded: string[]; alsoRevised: string[] }[] = [];

/**
 * Expanded profiles left below target because the reliable sources ran out,
 * with the reason. Padding is worse than a shorter page.
 */
export const SOURCES_EXHAUSTED: Record<string, string> = {};

export const EXPANDED: ReadonlySet<string> = new Set(EXPANSION_BATCHES.flatMap((b) => b.expanded));
