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
 * dropped first and both sides produce the same links.
 *
 * Most pages exist in all five editions. The few that do not (some artist
 * profiles and hubs, by design) are listed in `partial`; for an edition a page
 * lacks, the link goes to that edition's section index (/fr/artists) rather
 * than to a 404.
 *
 * Plain <a> rather than next/link: changing edition changes the root layout's
 * <html lang dir>, which needs a full document load anyway.
 */
export function LanguageSwitcher({ locale, label, partial }: { locale: Locale; label: string; partial: Record<string, Locale[]> }) {
    const pathname = usePathname() ?? '/';
    const publicPath = pathname === '/en' ? '/' : pathname.startsWith('/en/') ? pathname.slice(3) : pathname;
    const { path } = splitLocalePath(publicPath);
    const editions = partial[path] ?? LOCALES;
    const section = `/${path.split('/')[1] ?? ''}`;

    return (
        <nav aria-label={label}>
            <ul className="flex items-center gap-1 text-sm">
                {LOCALES.map((l) => {
                    const info = LOCALE_INFO[l];
                    const current = l === locale;
                    return (
                        <li key={l}>
                            <a
                                href={localePath(l, editions.includes(l) ? path : section)}
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
