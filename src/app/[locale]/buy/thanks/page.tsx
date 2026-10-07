import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { dictionary } from '@/i18n';
import { isLocale, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

/** Where a sent offer lands. noindex and outside the sitemap: nothing here for a searcher. */
export async function generateMetadata({ params }: PageProps<'/[locale]/buy/thanks'>): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const t = dictionary(locale);
    return pageMetadata({
        locale,
        path: '/buy/thanks',
        title: t.thanks.title,
        description: t.thanks.text,
        noindex: true,
        ogAlt: t.meta.ogAlt,
    });
}

export default async function ThanksPage({ params }: PageProps<'/[locale]/buy/thanks'>) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const t = dictionary(locale);

    return (
        <section className="mx-auto max-w-3xl px-4 py-20">
            <h1 className="font-display text-4xl font-semibold tracking-tight">{t.thanks.heading}</h1>
            <p className="mt-4 text-lg text-ink/85">{t.thanks.text}</p>
            <Link href={localePath(locale, '/')} className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-clay">
                {t.thanks.back}
            </Link>
        </section>
    );
}
