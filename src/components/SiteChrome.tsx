import Link from 'next/link';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import type { Dictionary } from '@/i18n';
import { LOCALES, LOCALE_INFO, type Locale, localePath } from '@/lib/i18n';

/** The for-sale strip above the header, on every page: the site's commercial purpose, stated once and plainly. */
export function SaleBar({ locale, t }: { locale: Locale; t: Dictionary }) {
    return (
        <div className="bg-ink text-paper">
            <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-sm">
                <span>{t.saleBar.text}</span>
                <Link
                    href={localePath(locale, '/buy')}
                    className="font-semibold text-ochre underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                    {t.saleBar.cta} <span aria-hidden="true" className="inline-block rtl:rotate-180">→</span>
                </Link>
            </p>
        </div>
    );
}

function Wordmark({ locale }: { locale: Locale }) {
    return (
        <Link
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

const NAV = ['art-forms', 'artists', 'movements', 'regions', 'music', 'guides'] as const;

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
    const links = NAV.map((key) => ({ href: localePath(locale, `/${key}`), label: t.nav[key] }));

    return (
        <header className="border-b border-line bg-paper">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
                <Wordmark locale={locale} />

                <nav aria-label={t.nav.menu} className="hidden xl:block">
                    <ul className="flex items-center gap-5 whitespace-nowrap text-[0.95rem]">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-ink hover:text-clay">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href={localePath(locale, '/buy')}
                                className="rounded-full bg-indigo px-4 py-2 font-medium text-paper hover:bg-ink"
                            >
                                {t.nav.buy}
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="hidden xl:block">
                    <LanguageSwitcher locale={locale} label={t.nav.language} />
                </div>

                {/* Small screens: a native disclosure, so the menu works before (and without) JavaScript. */}
                <details className="group relative xl:hidden">
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
                                        <Link href={link.href} className="block rounded px-2 py-2 hover:bg-sand">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        href={localePath(locale, '/buy')}
                                        className="mt-2 block rounded-md bg-indigo px-3 py-2 text-center font-medium text-paper"
                                    >
                                        {t.nav.buy}
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="mt-4 border-t border-line pt-3">
                            <LanguageSwitcher locale={locale} label={t.nav.language} />
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
                    <p className="mt-4 text-sm">
                        {t.footer.forSale}{' '}
                        <Link href={localePath(locale, '/buy')} className="font-medium text-clay underline underline-offset-4">
                            {t.saleBar.cta}
                        </Link>
                    </p>
                </div>

                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{t.footer.explore}</h2>
                    <ul className="mt-3 space-y-2 text-sm">
                        {explore.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="hover:text-clay">
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
                            <Link href={localePath(locale, '/about')} className="hover:text-clay">
                                {t.footer.about}
                            </Link>
                        </li>
                        <li>
                            <Link href={localePath(locale, '/privacy')} className="hover:text-clay">
                                {t.footer.privacy}
                            </Link>
                        </li>
                        <li>
                            <Link href={localePath(locale, '/buy')} className="hover:text-clay">
                                {t.nav.buy}
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
