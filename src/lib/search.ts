/**
 * Matching for the site search. Pure, with no imports, so the tests and the
 * browser load the same code.
 *
 * Names are compared after normalisation: lower case, no accents ("Chaïbia" =
 * "chaibia"), and for Arabic no vowel marks or tatweel and the common letter
 * variants folded together (أ إ آ → ا, ى → ي, ة → ه) so a reader can type
 * either spelling.
 */

export function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ًͯ-ٰٟـ]/g, '')
        .replace(/[أإآٱ]/g, 'ا')
        .replace(/ى/g, 'ي')
        .replace(/ة/g, 'ه')
        .replace(/ı/g, 'i')
        .replace(/ø/g, 'o')
        .replace(/æ/g, 'ae')
        .replace(/œ/g, 'oe')
        .replace(/ß/g, 'ss')
        .replace(/[^\p{L}\p{N}]+/gu, ' ')
        // The Arabic definite article is not part of a name: الشعيبية = شعيبية.
        .replace(/(^| )ال(?=[\u0621-\u064a]{3})/g, '$1')
        .trim();
}

/** What a search result is; the order is also the tie-break order. */
export type SearchKind = 'profile' | 'page' | 'list' | 'wikipedia';

/** One entry of the per-edition index served at /api/search/<locale>. Short keys: the file is sent to every searcher. */
export interface SearchEntry {
    /** profile (our profile), page (art form, movement, region, music, guide), list (a list of artists), wikipedia (an artist we only list). */
    k: SearchKind;
    /** What to show. */
    l: string;
    /** A path on this site, or for `wikipedia` the article as 'lang:Title'. */
    h: string;
    /** A short line under the name: country and years, or the section. */
    m: string;
    /** Normalised search text: the label plus other spellings and names in other editions. */
    s: string;
}

const KIND_ORDER: Record<SearchKind, number> = { profile: 0, list: 1, page: 2, wikipedia: 3 };

/**
 * Entries matching a query, best first, at most `limit`.
 *
 * Every word of the query must be the start of a word in the entry's search
 * text ("ben" finds "Ben Enwonwu" but not "Reuben"). Rank: a label equal to
 * the query first, whatever the kind; then profiles before lists before pages
 * before Wikipedia-only names; within a kind, a label that starts with the
 * query, then one with a word that does, then a match through another
 * spelling; then the index order (most-read first).
 */
export function searchEntries(entries: readonly SearchEntry[], query: string, limit = 8): SearchEntry[] {
    const q = normalize(query);
    if (q.length < 2) return [];
    const words = q.split(' ');
    const scored: { e: SearchEntry; rank: number; order: number }[] = [];
    entries.forEach((e, order) => {
        const tokens = e.s.split(' ');
        if (!words.every((w) => tokens.some((token) => token.startsWith(w)))) return;
        const label = normalize(e.l);
        const rank =
            label === q ? 0 : label.startsWith(q) ? 1 : label.split(' ').some((w) => w.startsWith(words[0])) ? 2 : 3;
        scored.push({ e, rank, order });
    });
    scored.sort(
        (a, b) =>
            Number(a.rank > 0) - Number(b.rank > 0) ||
            KIND_ORDER[a.e.k] - KIND_ORDER[b.e.k] ||
            a.rank - b.rank ||
            a.order - b.order
    );
    return scored.slice(0, limit).map((x) => x.e);
}

/** The Wikipedia article URL of an index entry's 'lang:Title'. */
export function wikipediaArticleUrl(ref: string): string {
    const i = ref.indexOf(':');
    const lang = ref.slice(0, i);
    const title = ref.slice(i + 1).replaceAll(' ', '_');
    return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}

/** Wikipedia's own search page for a query, in one edition's language. */
export function wikipediaSearchUrl(lang: string, query: string): string {
    return `https://${lang}.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`;
}
