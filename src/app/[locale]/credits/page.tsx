import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Credit } from '@/components/Pictures';
import { dictionary } from '@/i18n';
import { entriesIn, entryPath, isAvailable } from '@/content/catalog';
import { artistPictures, workTitle } from '@/lib/artist-images';
import { getArticle } from '@/lib/content';
import { localePath, toLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

/**
 * The credits of every picture in this edition, linked from the footer of
 * every page: the attribution the Creative Commons licences ask for, kept off
 * the pages themselves. noindex and outside the sitemap.
 */
export async function generateMetadata({ params }: PageProps<'/[locale]/credits'>): Promise<Metadata> {
    const locale = toLocale((await params).locale) ?? notFound();
    const t = dictionary(locale);
    return pageMetadata({
        locale,
        path: '/credits',
        title: t.pictures.creditsTitle,
        description: t.pictures.creditsText,
        noindex: true,
        ogAlt: t.meta.ogAlt,
    });
}

export default async function CreditsPage({ params }: PageProps<'/[locale]/credits'>) {
    const locale = toLocale((await params).locale) ?? notFound();
    const t = dictionary(locale);
    const artists = entriesIn('artists')
        .filter((e) => isAvailable(e, locale))
        .map((entry) => ({ entry, pictures: artistPictures(entry.qid), label: getArticle(locale, 'artists', entry.slug)!.label }))
        .filter((a) => a.pictures)
        .sort((a, b) => a.label.localeCompare(b.label, locale));

    return (
        <section className="mx-auto max-w-3xl px-4 py-16">
            <h1 className="font-display text-4xl font-semibold tracking-tight">{t.pictures.creditsTitle}</h1>
            <p className="mt-4 text-lg text-ink/85">{t.pictures.creditsText}</p>
            <ul className="mt-10 divide-y divide-line">
                {artists.map(({ entry, pictures, label }) => (
                    <li key={entry.slug} id={entry.slug} className="py-4">
                        <Link href={localePath(locale, entryPath(entry))} className="font-semibold text-clay underline underline-offset-4">
                            {label}
                        </Link>
                        <ul className="mt-2 space-y-1">
                            {pictures!.portrait && (
                                <li>
                                    <span className="text-sm">{t.pictures.portrait}. </span>
                                    <Credit pic={pictures!.portrait} locale={locale} />
                                </li>
                            )}
                            {pictures!.works.map((w) => (
                                <li key={w.qid}>
                                    <cite className="text-sm not-italic">{workTitle(w, locale)}. </cite>
                                    <Credit pic={w} locale={locale} />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
}
