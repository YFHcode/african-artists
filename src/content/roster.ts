/**
 * Every artist profile in docs/artist-pages-rollout.md beyond the original
 * fourteen, with the wave it belongs to. An entry becomes a page when its
 * wave is released (waves.ts) and its content files exist.
 *
 * - kind 'full': researched profile like the original fourteen (600+ words, hand-written facts).
 * - kind 'short': about 200 words written once; the facts box is generated from the data.
 *
 * `locales` follows the plan's rule: English always, plus each language whose
 * Wikipedia has an article on the person with 1,000+ views a year.
 * `countries`, `media` and the years come from Wikidata and may be corrected
 * here by hand; a correction belongs in Wikidata too.
 *
 * Free of runtime imports so the tests and the browser can load it.
 */

import type { CountryCode } from './catalog.ts';
import type { Medium } from './hubs.ts';
import type { Locale } from '../lib/i18n.ts';

export interface RosterEntry {
    qid: string;
    slug: string;
    name: string;
    wave: number;
    kind: 'full' | 'short';
    locales: readonly Locale[];
    countries: CountryCode[];
    media: Medium[];
    born: number | null;
    died: number | null;
}

/** The original fourteen profiles (wave 0, all five editions): their Wikidata items and media. */
export const ORIGINAL_ARTISTS: Record<string, { qid: string; media: Medium[] }> = {
    'el-anatsui': { qid: 'Q1323876', media: ['sculpture', 'painting', 'ceramics'] },
    'ben-enwonwu': { qid: 'Q4885605', media: ['sculpture', 'painting'] },
    'njideka-akunyili-crosby': { qid: 'Q21284874', media: ['painting', 'visual-art'] },
    'wangechi-mutu': { qid: 'Q457420', media: ['sculpture', 'painting', 'visual-art'] },
    'esther-mahlangu': { qid: 'Q3733455', media: ['painting', 'visual-art'] },
    'ibrahim-el-salahi': { qid: 'Q2662098', media: ['painting', 'visual-art'] },
    'cheri-samba': { qid: 'Q2617109', media: ['painting'] },
    'malick-sidibe': { qid: 'Q781717', media: ['photography'] },
    'seydou-keita': { qid: 'Q962958', media: ['photography'] },
    'ousmane-sow': { qid: 'Q2784081', media: ['sculpture'] },
    malangatana: { qid: 'Q384560', media: ['painting', 'sculpture'] },
    'farid-belkahia': { qid: 'Q3066863', media: ['painting'] },
    baya: { qid: 'Q542171', media: ['painting'] },
    'mahmoud-said': { qid: 'Q6734398', media: ['painting'] },
};

// BEGIN GENERATED (from the rollout plan and data/artists; edit by hand from here on)
export const ROSTER: RosterEntry[] = [
    // Wave 1
    { qid: 'Q262660', slug: 'kevin-carter', name: 'Kevin Carter', wave: 1, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['ZA'], media: ['photography'], born: 1960, died: 1994 },
    { qid: 'Q3195075', slug: 'ken-oosterbroek', name: 'Ken Oosterbroek', wave: 1, kind: 'full', locales: ['en', 'pt'], countries: ['ZA'], media: ['photography'], born: 1963, died: 1994 },
    { qid: 'Q3116258', slug: 'greg-marinovich', name: 'Greg Marinovich', wave: 1, kind: 'full', locales: ['en'], countries: ['ZA'], media: ['photography'], born: 1962, died: null },
    { qid: 'Q3179715', slug: 'joao-silva', name: 'João Silva', wave: 1, kind: 'full', locales: ['en'], countries: ['ZA'], media: ['photography'], born: 1966, died: null },
    { qid: 'Q5392913', slug: 'ernest-cole', name: 'Ernest Cole', wave: 1, kind: 'full', locales: ['en', 'fr'], countries: ['ZA'], media: ['photography'], born: 1940, died: 1990 },
    { qid: 'Q1514491', slug: 'peter-magubane', name: 'Peter Magubane', wave: 1, kind: 'full', locales: ['en'], countries: ['ZA'], media: ['photography'], born: 1932, died: 2024 },
    { qid: 'Q146776', slug: 'zanele-muholi', name: 'Zanele Muholi', wave: 1, kind: 'full', locales: ['en', 'fr', 'es', 'pt'], countries: ['ZA'], media: ['photography'], born: 1972, died: null },
    { qid: 'Q569669', slug: 'david-goldblatt', name: 'David Goldblatt', wave: 1, kind: 'full', locales: ['en'], countries: ['ZA'], media: ['photography'], born: 1930, died: 2018 },
    { qid: 'Q2216589', slug: 'sam-nzima', name: 'Sam Nzima', wave: 1, kind: 'full', locales: ['en'], countries: ['ZA'], media: ['photography'], born: 1934, died: 2018 },
    { qid: 'Q3182608', slug: 'mohamed-amin', name: 'Mohamed Amin', wave: 1, kind: 'full', locales: ['en'], countries: ['KE'], media: ['photography'], born: 1943, died: 1996 },
    { qid: 'Q1550279', slug: 'roger-ballen', name: 'Roger Ballen', wave: 1, kind: 'short', locales: ['en', 'fr'], countries: ['ZA'], media: ['photography', 'visual-art'], born: 1950, died: null },
    { qid: 'Q661238', slug: 'austin-stevens', name: 'Austin Stevens', wave: 1, kind: 'short', locales: ['en', 'es'], countries: ['ZA'], media: ['photography'], born: 1950, died: null },
    { qid: 'Q5213449', slug: 'dan-eldon', name: 'Dan Eldon', wave: 1, kind: 'short', locales: ['en'], countries: ['KE'], media: ['photography'], born: 1970, died: 1993 },
    { qid: 'Q64627129', slug: 'laetitia-ky', name: 'Laetitia Ky', wave: 1, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['CI'], media: ['photography'], born: 1996, died: null },
    { qid: 'Q30501964', slug: 'khadija-saye', name: 'Khadija Saye', wave: 1, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['GM'], media: ['photography'], born: 1992, died: 2017 },
    { qid: 'Q22083293', slug: 'leila-alaoui', name: 'Leila Alaoui', wave: 1, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['MA'], media: ['photography'], born: 1982, died: 2016 },
    { qid: 'Q19976007', slug: 'hassan-hajjaj', name: 'Hassan Hajjaj', wave: 1, kind: 'short', locales: ['en', 'fr'], countries: ['MA'], media: ['photography'], born: 1961, died: null },
    { qid: 'Q4023104', slug: 'youssef-nabil', name: 'Youssef Nabil', wave: 1, kind: 'short', locales: ['en', 'fr'], countries: ['EG'], media: ['photography'], born: 1972, died: null },
    { qid: 'Q3471115', slug: 'samuel-fosso', name: 'Samuel Fosso', wave: 1, kind: 'short', locales: ['en', 'fr'], countries: ['NG', 'CM'], media: ['photography'], born: 1962, died: null },
    { qid: 'Q16091114', slug: 'james-barnor', name: 'James Barnor', wave: 1, kind: 'short', locales: ['en', 'fr'], countries: ['GH'], media: ['photography'], born: 1929, died: null },
    { qid: 'Q4775789', slug: 'anton-hammerl', name: 'Anton Hammerl', wave: 1, kind: 'short', locales: ['en'], countries: ['ZA'], media: ['photography'], born: 1969, died: 2011 },
    { qid: 'Q3318688', slug: 'mohamed-maradji', name: 'Mohamed Maradji', wave: 1, kind: 'short', locales: ['en', 'fr', 'ar'], countries: ['MA'], media: ['photography'], born: 1939, died: null },
    { qid: 'Q2411298', slug: 'boniface-mwangi', name: 'Boniface Mwangi', wave: 1, kind: 'short', locales: ['en'], countries: ['KE'], media: ['photography'], born: 1983, died: null },
    { qid: 'Q460639', slug: 'augustus-washington', name: 'Augustus Washington', wave: 1, kind: 'short', locales: ['en'], countries: ['LR'], media: ['photography'], born: 1820, died: 1875 },
    { qid: 'Q113865925', slug: 'sani-maikatanga', name: 'Sani Maikatanga', wave: 1, kind: 'short', locales: ['en'], countries: ['NG'], media: ['photography'], born: 1975, died: null },
    { qid: 'Q99528599', slug: 'misan-harriman', name: 'Misan Harriman', wave: 1, kind: 'short', locales: ['en'], countries: ['NG'], media: ['photography'], born: 1977, died: null },
    // Wave 1, added later: people the data job had excluded or flagged, kept by decision
    { qid: 'Q158060', slug: 'web-du-bois', name: 'W. E. B. Du Bois', wave: 1, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['GH'], media: ['photography'], born: 1868, died: 1963 },
    { qid: 'Q55415', slug: 'leni-riefenstahl', name: 'Leni Riefenstahl', wave: 1, kind: 'short', locales: ['en', 'fr', 'es', 'pt'], countries: ['SD'], media: ['photography'], born: 1902, died: 2003 },
    { qid: 'Q443070', slug: 'foday-sankoh', name: 'Foday Sankoh', wave: 1, kind: 'short', locales: ['en', 'fr', 'es', 'pt'], countries: ['SL'], media: ['photography'], born: 1937, died: 2003 },
    { qid: 'Q109680685', slug: 'hamza-yassin', name: 'Hamza Yassin', wave: 1, kind: 'short', locales: ['en'], countries: ['SD'], media: ['photography'], born: 1990, died: null },
    { qid: 'Q3345980', slug: 'ntare-mwine', name: 'Ntare Guma Mbaho Mwine', wave: 1, kind: 'short', locales: ['en', 'fr', 'es'], countries: ['UG'], media: ['photography'], born: 1967, died: null },
    // Wave 2
    { qid: 'Q666092', slug: 'william-kentridge', name: 'William Kentridge', wave: 2, kind: 'full', locales: ['en', 'fr', 'es'], countries: ['ZA'], media: ['printmaking', 'sculpture', 'painting', 'visual-art'], born: 1955, died: null },
    { qid: 'Q260617', slug: 'marlene-dumas', name: 'Marlene Dumas', wave: 2, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['ZA'], media: ['sculpture', 'painting', 'visual-art'], born: 1953, died: null },
    { qid: 'Q281203', slug: 'irma-stern', name: 'Irma Stern', wave: 2, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['ZA'], media: ['painting'], born: 1894, died: 1966 },
    { qid: 'Q716596', slug: 'vladimir-tretchikoff', name: 'Vladimir Tretchikoff', wave: 2, kind: 'full', locales: ['en'], countries: ['ZA'], media: ['painting', 'visual-art'], born: 1913, died: 2006 },
    { qid: 'Q2700036', slug: 'leon-botha', name: 'Leon Botha', wave: 2, kind: 'short', locales: ['en', 'fr', 'es'], countries: ['ZA'], media: ['painting'], born: 1985, died: 2011 },
    { qid: 'Q23020546', slug: 'dumile-feni', name: 'Dumile Feni', wave: 2, kind: 'short', locales: ['en'], countries: ['ZA'], media: ['painting', 'sculpture'], born: 1942, died: 1991 },
    { qid: 'Q2743155', slug: 'coert-steynberg', name: 'Coert Steynberg', wave: 2, kind: 'short', locales: ['en'], countries: ['ZA'], media: ['sculpture'], born: 1905, died: 1982 },
    { qid: 'Q3157630', slug: 'jh-pierneef', name: 'J. H. Pierneef', wave: 2, kind: 'short', locales: ['en'], countries: ['ZA'], media: ['painting'], born: 1886, died: 1957 },
    { qid: 'Q243830', slug: 'zwelethu-mthethwa', name: 'Zwelethu Mthethwa', wave: 2, kind: 'short', locales: ['en'], countries: ['ZA'], media: ['painting', 'photography', 'visual-art'], born: 1960, died: null },
    { qid: 'Q364207', slug: 'breyten-breytenbach', name: 'Breyten Breytenbach', wave: 2, kind: 'short', locales: ['en', 'fr', 'es'], countries: ['ZA'], media: ['painting', 'visual-art'], born: 1939, died: 2024 },
    // Wave 3
    { qid: 'Q4526104', slug: 'yinka-shonibare', name: 'Yinka Shonibare', wave: 3, kind: 'full', locales: ['en', 'fr'], countries: ['NG'], media: ['sculpture', 'painting', 'photography'], born: 1962, died: null },
    { qid: 'Q19800726', slug: 'ibrahim-mahama', name: 'Ibrahim Mahama', wave: 3, kind: 'full', locales: ['en'], countries: ['GH'], media: ['painting', 'visual-art'], born: 1987, died: null },
    { qid: 'Q16010963', slug: 'ladi-kwali', name: 'Ladi Kwali', wave: 3, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['NG'], media: ['ceramics'], born: 1925, died: 1984 },
    { qid: 'Q357005', slug: 'twins-seven-seven', name: 'Twins Seven-Seven', wave: 3, kind: 'full', locales: ['en'], countries: ['NG'], media: ['sculpture', 'painting'], born: 1944, died: 2011 },
    { qid: 'Q3887122', slug: 'otobong-nkanga', name: 'Otobong Nkanga', wave: 3, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['NG'], media: ['photography', 'painting', 'sculpture', 'visual-art'], born: 1974, died: null },
    { qid: 'Q80220002', slug: 'amoako-boafo', name: 'Amoako Boafo', wave: 3, kind: 'full', locales: ['en', 'fr'], countries: ['GH'], media: ['painting', 'visual-art'], born: 1984, died: null },
    { qid: 'Q3645490', slug: 'bruce-onobrakpeya', name: 'Bruce Onobrakpeya', wave: 3, kind: 'short', locales: ['en'], countries: ['NG'], media: ['printmaking', 'painting', 'sculpture'], born: 1932, died: null },
    { qid: 'Q15461959', slug: 'uche-okeke', name: 'Uche Okeke', wave: 3, kind: 'short', locales: ['en'], countries: ['NG'], media: ['painting'], born: 1933, died: 2016 },
    { qid: 'Q4697376', slug: 'aina-onabolu', name: 'Aina Onabolu', wave: 3, kind: 'short', locales: ['en'], countries: ['NG'], media: ['painting'], born: 1882, died: 1963 },
    { qid: 'Q3877421', slug: 'nnenna-okore', name: 'Nnenna Okore', wave: 3, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['NG'], media: ['sculpture'], born: 1975, died: null },
    { qid: 'Q21467258', slug: 'kofi-antubam', name: 'Kofi Antubam', wave: 3, kind: 'short', locales: ['en'], countries: ['GH'], media: ['painting'], born: 1922, died: 1964 },
    { qid: 'Q4747518', slug: 'amon-kotei', name: 'Amon Kotei', wave: 3, kind: 'short', locales: ['en'], countries: ['GH'], media: ['sculpture', 'painting'], born: 1915, died: 2011 },
    { qid: 'Q52203720', slug: 'kwame-akoto-bamfo', name: 'Kwame Akoto-Bamfo', wave: 3, kind: 'short', locales: ['en'], countries: ['GH'], media: ['sculpture'], born: 1983, died: null },
    { qid: 'Q123111935', slug: 'sharon-dede-padi', name: 'Sharon Dede Padi', wave: 3, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['GH'], media: ['painting'], born: 1976, died: 2026 },
    { qid: 'Q97657288', slug: 'frank-edoho', name: 'Frank Edoho', wave: 3, kind: 'short', locales: ['en'], countries: ['NG'], media: ['photography'], born: 1972, died: null },
    { qid: 'Q20687449', slug: 'ty-bello', name: 'TY Bello', wave: 3, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['NG'], media: ['photography'], born: 1978, died: null },
    { qid: 'Q105357569', slug: 'caleb-azumah-nelson', name: 'Caleb Azumah Nelson', wave: 3, kind: 'short', locales: ['en'], countries: ['GH'], media: ['photography'], born: 1993, died: null },
    { qid: 'Q101982384', slug: 'caleb-femi', name: 'Caleb Femi', wave: 3, kind: 'short', locales: ['en'], countries: ['NG'], media: ['photography'], born: 1990, died: null },
    // Wave 4
    { qid: 'Q2016818', slug: 'chaibia-talal', name: 'Chaïbia Talal', wave: 4, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['MA'], media: ['painting', 'visual-art'], born: 1929, died: 2004 },
    { qid: 'Q1384960', slug: 'hassan-el-glaoui', name: 'Hassan El Glaoui', wave: 4, kind: 'full', locales: ['en', 'fr', 'ar'], countries: ['MA'], media: ['painting'], born: 1923, died: 2018 },
    { qid: 'Q3272339', slug: 'mhamed-issiakhem', name: 'M\'hamed Issiakhem', wave: 4, kind: 'full', locales: ['en', 'fr', 'ar'], countries: ['DZ'], media: ['painting'], born: 1928, died: 1985 },
    { qid: 'Q3277719', slug: 'mahi-binebine', name: 'Mahi Binebine', wave: 4, kind: 'full', locales: ['en', 'fr', 'ar'], countries: ['MA'], media: ['painting', 'sculpture'], born: 1959, died: null },
    { qid: 'Q453931', slug: 'yto-barrada', name: 'Yto Barrada', wave: 4, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['MA'], media: ['photography', 'visual-art'], born: 1971, died: null },
    { qid: 'Q3319034', slug: 'mohammed-khadda', name: 'Mohammed Khadda', wave: 4, kind: 'full', locales: ['en', 'fr', 'ar'], countries: ['DZ'], media: ['painting'], born: 1930, died: 1991 },
    { qid: 'Q3318577', slug: 'mohamed-hamidi', name: 'Mohamed Hamidi', wave: 4, kind: 'short', locales: ['en', 'fr'], countries: ['MA'], media: ['painting', 'visual-art'], born: 1941, died: 2025 },
    { qid: 'Q2878328', slug: 'bachir-yelles', name: 'Bachir Yellès', wave: 4, kind: 'short', locales: ['en', 'fr', 'ar'], countries: ['DZ'], media: ['painting'], born: 1921, died: 2022 },
    { qid: 'Q353674', slug: 'adel-abdessemed', name: 'Adel Abdessemed', wave: 4, kind: 'short', locales: ['en', 'fr'], countries: ['DZ'], media: ['photography', 'sculpture', 'painting', 'visual-art'], born: 1971, died: null },
    { qid: 'Q3027520', slug: 'zoubeir-turki', name: 'Zoubeir Turki', wave: 4, kind: 'short', locales: ['en', 'fr', 'ar'], countries: ['TN'], media: ['sculpture', 'painting'], born: 1924, died: 2009 },
    { qid: 'Q12955922', slug: 'el-seed', name: 'eL Seed', wave: 4, kind: 'short', locales: ['en', 'fr'], countries: ['TN'], media: ['sculpture', 'painting'], born: 1981, died: null },
    { qid: 'Q3319051', slug: 'mohamed-mrabet', name: 'Mohamed Mrabet', wave: 4, kind: 'short', locales: ['en', 'fr'], countries: ['MA'], media: ['painting'], born: 1936, died: null },
    { qid: 'Q17183810', slug: 'bruno-catalano', name: 'Bruno Catalano', wave: 4, kind: 'short', locales: ['en', 'fr'], countries: ['MA'], media: ['sculpture'], born: 1960, died: null },
    { qid: 'Q3277762', slug: 'mahjoubi-aherdane', name: 'Mahjoubi Aherdane', wave: 4, kind: 'short', locales: ['en', 'fr', 'ar'], countries: ['MA'], media: ['painting'], born: 1921, died: 2020 },
    { qid: 'Q3415851', slug: 'rabah-driassa', name: 'Rabah Driassa', wave: 4, kind: 'short', locales: ['en', 'fr', 'ar'], countries: ['DZ'], media: ['painting'], born: 1934, died: 2021 },
    { qid: 'Q334989', slug: 'tahar-ben-jelloun', name: 'Tahar Ben Jelloun', wave: 4, kind: 'short', locales: ['en', 'fr', 'es', 'ar'], countries: ['MA'], media: ['painting'], born: 1944, died: null },
    // Wave 5
    { qid: 'Q1459134', slug: 'mahmoud-mokhtar', name: 'Mahmoud Mokhtar', wave: 5, kind: 'full', locales: ['en', 'fr', 'ar'], countries: ['EG'], media: ['sculpture'], born: 1891, died: 1934 },
    { qid: 'Q980418', slug: 'farouk-hosny', name: 'Farouk Hosny', wave: 5, kind: 'full', locales: ['en', 'ar'], countries: ['EG'], media: ['painting'], born: 1938, died: null },
    { qid: 'Q20381812', slug: 'adam-henein', name: 'Adam Henein', wave: 5, kind: 'full', locales: ['en', 'ar'], countries: ['EG'], media: ['painting', 'sculpture'], born: 1929, died: 2020 },
    { qid: 'Q4118622', slug: 'hussein-bicar', name: 'Hussein Bicar', wave: 5, kind: 'full', locales: ['en', 'ar'], countries: ['EG'], media: ['painting'], born: 1913, died: 2002 },
    { qid: 'Q6034343', slug: 'inji-aflatoun', name: 'Inji Aflatoun', wave: 5, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['EG'], media: ['painting'], born: 1924, died: 1989 },
    { qid: 'Q288793', slug: 'ghada-amer', name: 'Ghada Amer', wave: 5, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['EG'], media: ['sculpture', 'painting'], born: 1963, died: null },
    { qid: 'Q20988972', slug: 'effat-nagy', name: 'Effat Nagy', wave: 5, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['EG'], media: ['painting', 'visual-art'], born: 1905, died: 1994 },
    { qid: 'Q28059083', slug: 'wael-shawky', name: 'Wael Shawky', wave: 5, kind: 'short', locales: ['en', 'fr'], countries: ['EG'], media: ['painting', 'visual-art'], born: 1971, died: null },
    { qid: 'Q20724924', slug: 'anna-boghiguian', name: 'Anna Boghiguian', wave: 5, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['EG'], media: ['painting'], born: 1946, died: null },
    { qid: 'Q20394418', slug: 'hussein-shariffe', name: 'Hussein Shariffe', wave: 5, kind: 'short', locales: ['en'], countries: ['SD'], media: ['painting'], born: 1934, died: 2005 },
    { qid: 'Q115109888', slug: 'ahmed-umar', name: 'Ahmed Umar', wave: 5, kind: 'short', locales: ['en'], countries: ['SD'], media: ['visual-art'], born: 1988, died: null },
    { qid: 'Q2319146', slug: 'farida-of-egypt', name: 'Farida of Egypt', wave: 5, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['EG'], media: ['painting'], born: 1921, died: 1988 },
    // Wave 6
    { qid: 'Q6729929', slug: 'magdalene-odundo', name: 'Magdalene Odundo', wave: 6, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['KE'], media: ['ceramics'], born: 1950, died: null },
    { qid: 'Q382165', slug: 'afewerk-tekle', name: 'Afewerk Tekle', wave: 6, kind: 'full', locales: ['en'], countries: ['ET'], media: ['painting'], born: 1932, died: 2012 },
    { qid: 'Q6695060', slug: 'lubaina-himid', name: 'Lubaina Himid', wave: 6, kind: 'full', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['TZ'], media: ['sculpture', 'painting'], born: 1954, died: null },
    { qid: 'Q966300', slug: 'skunder-boghossian', name: 'Skunder Boghossian', wave: 6, kind: 'short', locales: ['en'], countries: ['ET'], media: ['painting', 'visual-art'], born: 1937, died: 2003 },
    { qid: 'Q1507782', slug: 'george-lilanga', name: 'George Lilanga', wave: 7, kind: 'short', locales: ['en'], countries: ['TZ'], media: ['painting', 'sculpture'], born: 1934, died: 2005 },
    { qid: 'Q3481056', slug: 'seni-awa-camara', name: 'Seni Awa Camara', wave: 6, kind: 'short', locales: ['en', 'fr', 'es', 'pt', 'ar'], countries: ['SN'], media: ['sculpture'], born: 1945, died: 2026 },
    { qid: 'Q3676169', slug: 'cheri-cherin', name: 'Chéri Cherin', wave: 6, kind: 'short', locales: ['en', 'fr'], countries: ['CD'], media: ['painting'], born: 1955, died: 2025 },
    { qid: 'Q3346742', slug: 'nzante-spee', name: 'Nzante Spee', wave: 6, kind: 'short', locales: ['en'], countries: ['CM'], media: ['painting'], born: 1953, died: 2005 },
    { qid: 'Q320622', slug: 'romuald-hazoume', name: 'Romuald Hazoumè', wave: 6, kind: 'short', locales: ['en', 'fr'], countries: ['BJ'], media: ['sculpture', 'painting', 'photography', 'visual-art'], born: 1962, died: null },
];
// END GENERATED
