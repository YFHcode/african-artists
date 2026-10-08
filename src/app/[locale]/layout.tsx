import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Fraunces, IBM_Plex_Sans_Arabic, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';

import '../globals.css';

import { JsonLd } from '@/components/JsonLd';
import { Footer, Header, SaleBar } from '@/components/SiteChrome';
import { dictionary } from '@/i18n';
import { LOCALES, LOCALE_INFO, isLocale } from '@/lib/i18n';
import { siteSchema } from '@/lib/schema';
import { SITE_NAME, SITE_URL } from '@/lib/site';

/**
 * The root layout for all five editions. It lives under [locale] because the
 * root layout is the only place <html> is rendered, and each edition needs its
 * own `lang` and, for Arabic, `dir="rtl"`.
 */

const fraunces = Fraunces({ subsets: ['latin', 'latin-ext'], variable: '--font-fraunces', display: 'swap', axes: ['opsz'] });
const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
// Only the Arabic edition uses it; without preload the browser fetches it only
// when Arabic text actually needs it.
const arabic = IBM_Plex_Sans_Arabic({
    subsets: ['arabic'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-arabic',
    display: 'swap',
    preload: false,
});

export function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    applicationName: SITE_NAME,
    // Search Console and Bing verification, if set in the environment.
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
        other: process.env.NEXT_PUBLIC_BING_VERIFICATION
            ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
            : undefined,
    },
};

export const viewport: Viewport = {
    themeColor: '#fbf7f0',
    colorScheme: 'light',
};

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    const info = LOCALE_INFO[locale];
    const t = dictionary(locale);

    return (
        <html lang={info.lang} dir={info.dir} className={`${fraunces.variable} ${inter.variable} ${arabic.variable}`}>
            <head>
                {/* Bing reads the language from <html lang> and this tag. */}
                <meta httpEquiv="content-language" content={info.lang} />
            </head>
            <body className="min-h-screen antialiased">
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-paper focus:px-4 focus:py-2"
                >
                    {t.skip}
                </a>
                <SaleBar locale={locale} t={t} />
                <Header locale={locale} t={t} />
                <main id="main">{children}</main>
                <Footer locale={locale} t={t} />
                <JsonLd data={siteSchema(locale)} />
                <Analytics />
            </body>
        </html>
    );
}
