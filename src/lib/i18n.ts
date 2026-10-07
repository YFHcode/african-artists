/**
 * The four editions of the site and how their URLs are built.
 *
 * English lives at the root (/artists/el-anatsui); the other editions live in
 * a subfolder (/fr/artists/el-anatsui). Every page exists in every edition
 * under the same slug, which is what lets each page list all four versions of
 * itself as hreflang alternates without a lookup table.
 *
 * Internally every route is served from app/[locale]/…; next.config.ts
 * rewrites unprefixed paths to /en/… and redirects /en/… back to the root, so
 * the English edition has exactly one public URL per page.
 *
 * Free of runtime imports so node can run it directly in the tests.
 */

export const LOCALES = ['en', 'fr', 'pt', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Editions served from a subfolder. The rewrite in next.config.ts excludes these. */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

export interface LocaleInfo {
    /** The language's own name, as shown in the language switcher. */
    endonym: string;
    /** BCP 47 code for <html lang>, hreflang and content-language. */
    lang: string;
    dir: 'ltr' | 'rtl';
    /** Open Graph locale (language_TERRITORY). */
    ogLocale: string;
}

export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
    en: { endonym: 'English', lang: 'en', dir: 'ltr', ogLocale: 'en_US' },
    fr: { endonym: 'Français', lang: 'fr', dir: 'ltr', ogLocale: 'fr_FR' },
    pt: { endonym: 'Português', lang: 'pt', dir: 'ltr', ogLocale: 'pt_PT' },
    ar: { endonym: 'العربية', lang: 'ar', dir: 'rtl', ogLocale: 'ar_AR' },
};

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * The public path of a page in one edition.
 *
 * `path` is the edition-independent form, always starting with a slash:
 * '/', '/artists', '/artists/el-anatsui'.
 */
export function localePath(locale: Locale, path: string): string {
    if (!path.startsWith('/')) throw new Error(`path must start with "/": ${path}`);
    if (locale === DEFAULT_LOCALE) return path;
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/**
 * The inverse of localePath: which edition a public path belongs to, and its
 * edition-independent form.
 */
const PREFIX_PATTERN = new RegExp(`^/(${PREFIXED_LOCALES.join('|')})(?=/|$)(.*)$`);

export function splitLocalePath(pathname: string): { locale: Locale; path: string } {
    const match = PREFIX_PATTERN.exec(pathname);
    if (!match) return { locale: DEFAULT_LOCALE, path: pathname || '/' };
    return { locale: match[1] as Locale, path: match[2] || '/' };
}
