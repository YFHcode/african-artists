import Link from 'next/link';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SearchBox } from '@/components/SearchBox';
import type { Dictionary } from '@/i18n';
import { entriesIn, isAvailable, partialEditions } from '@/content/catalog';
import { LOCALES, LOCALE_INFO, type Locale, localePath } from '@/lib/i18n';

function Wordmark({ locale }: { locale: Locale }) {
    return (
        <Link prefetch={false}
            href={localePath(locale, '/')}
            className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
            // The brand is a Latin-script name in every edition.
            dir="ltr"
            lang="en"
        >
            AfricanArtists<span className="text-clay">.com</span>
        </Link>
    );
}

const NAV = ['art-forms', 'artists', 'movements', 'regions', 'museums', 'music', 'instruments', 'guides'] as const;

/**
 * The header leaves out a collection that is still thin in an edition (the
 * museum pages start in English and French): its index stays reachable from
 * the footer and from the pages that link to it.
 */
const HEADER_MIN_ARTICLES = 3;

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
    const links = NAV.filter((key) => entriesIn(key).filter((e) => isAvailable(e, locale)).length >= HEADER_MIN_ARTICLES).map((key) => ({
        href: localePath(locale, `/${key}`),
        label: t.nav[key],
    }));
    // The few pages that exist in only some editions; computed at build time.
    const partial = partialEditions();

    // One grid, so the search box is rendered once and only moves. Small
    // screens: wordmark and menu, then the search box on a row of its own.
    // Wide screens: wordmark, search and languages, then the sections on a
    // row of their own, which wraps rather than pushing the languages off the
    // screen (as the single row did at 1280px once there were eight sections).
    return (
        <header className="border-b border-line bg-paper">
            <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-4">
                <Wordmark locale={locale} />

                <div className="col-span-3 row-start-2 sm:max-w-md lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:w-full lg:justify-self-end">
                    <SearchBox locale={locale} labels={t.search} />
                </div>

                <div className="hidden lg:col-start-3 lg:row-start-1 lg:block">
                    <LanguageSwitcher locale={locale} label={t.nav.language} partial={partial} />
                </div>

                <nav aria-label={t.nav.menu} className="hidden lg:col-span-3 lg:row-start-2 lg:block">
                    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem]">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link prefetch={false} href={link.href} className="whitespace-nowrap text-ink hover:text-clay">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Small screens: a native disclosure, so the menu works before (and without) JavaScript. */}
                <details className="group relative col-start-3 row-start-1 justify-self-end lg:hidden">
                    <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
                        {t.nav.menu}
                        <span aria-hidden="true" className="transition-transform group-open:rotate-180">
                            ▾
                        </span>
                    </summary>
                    <div className="absolute end-0 z-20 mt-2 w-64 rounded-lg border border-line bg-paper p-4 shadow-lg">
                        <nav aria-label={t.nav.menu}>
                            <ul className="space-y-1">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link prefetch={false} href={link.href} className="block rounded px-2 py-2 hover:bg-sand">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="mt-4 border-t border-line pt-3">
                            <LanguageSwitcher locale={locale} label={t.nav.language} partial={partial} />
                        </div>
                    </div>
                </details>
            </div>
        </header>
    );
}

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
    const explore = NAV.map((key) => ({ href: localePath(locale, `/${key}`), label: t.nav[key] }));

    return (
        <footer className="mt-20 border-t border-line bg-sand">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-span-2">
                    <Wordmark locale={locale} />
                    <p className="mt-3 max-w-sm text-sm text-muted">{t.footer.tagline}</p>
                </div>

                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{t.footer.explore}</h2>
                    <ul className="mt-3 space-y-2 text-sm">
                        {explore.map((link) => (
                            <li key={link.href}>
                                <Link prefetch={false} href={link.href} className="hover:text-clay">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{t.footer.site}</h2>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li>
                            <Link prefetch={false} href={localePath(locale, '/about')} className="hover:text-clay">
                                {t.footer.about}
                            </Link>
                        </li>
                        <li>
                            <Link prefetch={false} href={localePath(locale, '/privacy')} className="hover:text-clay">
                                {t.footer.privacy}
                            </Link>
                        </li>
                        <li>
                            <Link prefetch={false} href={localePath(locale, '/credits')} className="hover:text-clay">
                                {t.footer.credits}
                            </Link>
                        </li>
                        <li>
                            <Link prefetch={false} href={localePath(locale, '/contact')} className="hover:text-clay">
                                {t.footer.contact}
                            </Link>
                        </li>
                    </ul>
                    <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">{t.footer.languages}</h2>
                    <ul className="mt-3 space-y-2 text-sm">
                        {LOCALES.map((l) => (
                            <li key={l}>
                                <a href={localePath(l, '/')} hrefLang={LOCALE_INFO[l].lang} lang={LOCALE_INFO[l].lang} className="hover:text-clay">
                                    {LOCALE_INFO[l].endonym}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
