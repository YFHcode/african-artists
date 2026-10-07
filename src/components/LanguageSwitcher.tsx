'use client';

import { usePathname } from 'next/navigation';

import { LOCALES, LOCALE_INFO, type Locale, localePath, splitLocalePath } from '@/lib/i18n';

/**
 * Links to the same page in the other editions.
 *
 * A client component only because the layout that renders it is not told
 * which page it wraps. The pathname differs between the server and the
 * browser for English pages — the prerender runs at the internal /en/…
 * route, the browser sits at the public /… URL — so the /en prefix is
 * dropped first and both sides produce the same links. Every page exists in
 * every edition (a content test enforces it), so these never point at a 404
 * except from a 404.
 *
 * Plain <a> rather than next/link: changing edition changes the root layout's
 * <html lang dir>, which needs a full document load anyway.
 */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
    const pathname = usePathname() ?? '/';
    const publicPath = pathname === '/en' ? '/' : pathname.startsWith('/en/') ? pathname.slice(3) : pathname;
    const { path } = splitLocalePath(publicPath);

    return (
        <nav aria-label={label}>
            <ul className="flex items-center gap-1 text-sm">
                {LOCALES.map((l) => {
                    const info = LOCALE_INFO[l];
                    const current = l === locale;
                    return (
                        <li key={l}>
                            <a
                                href={localePath(l, path)}
                                hrefLang={info.lang}
                                lang={info.lang}
                                aria-current={current ? 'page' : undefined}
                                title={info.endonym}
                                className={
                                    current
                                        ? 'block rounded px-2 py-1 font-semibold text-ink underline decoration-clay decoration-2 underline-offset-4'
                                        : 'block rounded px-2 py-1 text-muted hover:bg-sand hover:text-ink'
                                }
                            >
                                {l.toUpperCase()}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
