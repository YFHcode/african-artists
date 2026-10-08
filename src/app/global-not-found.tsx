import type { Metadata, Viewport } from 'next';
import { Fraunces, IBM_Plex_Sans_Arabic, Inter } from 'next/font/google';
import Link from 'next/link';

import './globals.css';

import { LOCALES, LOCALE_INFO, localePath } from '@/lib/i18n';
import { SITE_NAME, SITE_URL } from '@/lib/site';

/**
 * The 404 page for every unknown URL, in all five languages at once.
 *
 * Why not app/[locale]/not-found.tsx: with the root layout under a dynamic
 * segment, Next.js 16.4 answers notFound() with the right 404 status but an
 * empty server-rendered body (the not-found UI only appears after client-side
 * rendering). A crawler or a visitor without JavaScript saw a blank page. This
 * file bypasses the layouts and renders a complete document on the server.
 * It needs experimental.globalNotFound in next.config.ts — re-check this page
 * after every Next.js upgrade.
 *
 * It is not told which edition the visitor came from, so it speaks all five:
 * short enough to read at a glance, each block marked with its own language.
 */

const fraunces = Fraunces({ subsets: ['latin', 'latin-ext'], variable: '--font-fraunces', display: 'swap' });
const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '600'], variable: '--font-arabic', display: 'swap', preload: false });

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    // Next.js adds noindex to 404 responses itself; declaring it here too printed it twice.
    title: `Page not found | ${SITE_NAME}`,
};

export const viewport: Viewport = { themeColor: '#fbf7f0', colorScheme: 'light' };

const MESSAGES = {
    en: { heading: 'Page not found', text: 'The address may be mistyped, or the page may have moved.', home: 'Home', artists: 'Artists' },
    fr: { heading: 'Page introuvable', text: 'L’adresse est peut-être mal saisie, ou la page a été déplacée.', home: 'Accueil', artists: 'Artistes' },
    es: { heading: 'Página no encontrada', text: 'Es posible que la dirección esté mal escrita o que la página se haya movido.', home: 'Inicio', artists: 'Artistas' },
    pt: { heading: 'Página não encontrada', text: 'O endereço pode estar errado, ou a página pode ter mudado de lugar.', home: 'Início', artists: 'Artistas' },
    ar: { heading: 'الصفحة غير موجودة', text: 'ربما كُتب العنوان بشكل خاطئ، أو نُقلت الصفحة إلى مكان آخر.', home: 'الرئيسية', artists: 'الفنانون' },
};

export default function GlobalNotFound() {
    return (
        <html lang="en" className={`${fraunces.variable} ${inter.variable} ${arabic.variable}`}>
            <body className="min-h-screen antialiased">
                <header className="border-b border-line">
                    <div className="mx-auto max-w-6xl px-4 py-4">
                        <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
                            AfricanArtists<span className="text-clay">.com</span>
                        </Link>
                    </div>
                </header>
                <main className="mx-auto max-w-6xl px-4 py-16">
                    <p className="text-sm font-semibold uppercase tracking-wide text-clay">404</p>
                    <div className="mt-6 grid gap-10 sm:grid-cols-2">
                        {LOCALES.map((locale) => {
                            const m = MESSAGES[locale];
                            const info = LOCALE_INFO[locale];
                            const Heading = locale === 'en' ? 'h1' : 'h2';
                            return (
                                <section
                                    key={locale}
                                    lang={info.lang}
                                    dir={info.dir}
                                    style={locale === 'ar' ? { fontFamily: 'var(--font-arabic), sans-serif' } : undefined}
                                >
                                    <Heading className="font-display text-3xl font-semibold" style={locale === 'ar' ? { fontFamily: 'inherit' } : undefined}>
                                        {m.heading}
                                    </Heading>
                                    <p className="mt-2 text-ink/85">{m.text}</p>
                                    <p className="mt-3 flex gap-4">
                                        <Link href={localePath(locale, '/')} className="font-medium text-clay underline underline-offset-4">
                                            {m.home}
                                        </Link>
                                        <Link href={localePath(locale, '/artists')} className="font-medium text-clay underline underline-offset-4">
                                            {m.artists}
                                        </Link>
                                    </p>
                                </section>
                            );
                        })}
                    </div>
                </main>
            </body>
        </html>
    );
}
