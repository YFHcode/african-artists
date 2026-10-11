import Image from 'next/image';
import Link from 'next/link';

import { Credit } from '@/components/Pictures';
import { StripControls } from '@/components/StripControls';
import { dictionary } from '@/i18n';
import { entriesIn, entryPath, isAvailable } from '@/content/catalog';
import { dataArtist } from '@/lib/artist-data';
import { type Picture, artistPictures } from '@/lib/artist-images';
import { getArticle } from '@/lib/content';
import { type Locale, localePath } from '@/lib/i18n';

/** How many portraits the strip shows at most, and the fewest worth a strip. */
const MAX = 24;
const MIN = 4;

/**
 * "Faces of African art": a row of portraits of the artists profiled in this
 * edition, full profiles first and then the most looked-up, that scrolls
 * sideways under the visitor's own hand (swipe, trackpad, keyboard, or the
 * arrow buttons). It never moves by itself. Every card is an ordinary link to the profile, with its credit.
 */
export function ArtistStrip({ locale }: { locale: Locale }) {
    const t = dictionary(locale);
    const items = entriesIn('artists')
        .filter((e) => isAvailable(e, locale))
        .map((entry) => ({ entry, portrait: artistPictures(entry.qid)?.portrait }))
        .filter((x): x is typeof x & { portrait: Picture } => Boolean(x.portrait))
        .map((x) => ({ ...x, full: x.entry.kind === 'full', views: (x.entry.qid && dataArtist(x.entry.qid)?.views) || 0 }))
        // Full profiles first: pageviews alone would open with people best known for something else.
        .sort((a, b) => Number(b.full) - Number(a.full) || b.views - a.views || a.entry.slug.localeCompare(b.entry.slug))
        .slice(0, MAX);
    if (items.length < MIN) return null;

    return (
        <section aria-labelledby="home-faces" className="mx-auto mt-14 max-w-6xl px-4">
            <div className="flex items-end justify-between gap-6">
                <div>
                    <h2 id="home-faces" className="font-display text-3xl font-semibold tracking-tight">
                        {t.home.facesTitle}
                    </h2>
                    <p className="mt-2 text-muted">{t.home.facesText}</p>
                </div>
                <StripControls target="artist-strip" prev={t.home.facesPrev} next={t.home.facesNext} />
            </div>
            <ul
                id="artist-strip"
                className="artist-strip mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
                tabIndex={0}
                aria-label={t.home.facesTitle}
            >
                {items.map(({ entry, portrait }) => {
                    const article = getArticle(locale, 'artists', entry.slug)!;
                    const countries = entry.countries.map((c) => t.countries[c]).join(' · ');
                    return (
                        <li key={entry.slug} className="group relative w-44 shrink-0 snap-start sm:w-52">
                            <div className="overflow-hidden rounded-xl bg-sand">
                                <Image
                                    src={portrait.src}
                                    alt=""
                                    width={portrait.width}
                                    height={portrait.height}
                                    unoptimized
                                    loading="lazy"
                                    className="strip-photo aspect-[4/5] w-full object-cover object-[50%_25%]"
                                />
                            </div>
                            <Link
                                href={localePath(locale, entryPath(entry))}
                                className="mt-3 block font-display text-lg font-semibold leading-snug after:absolute after:inset-0 group-hover:text-clay"
                            >
                                {article.label}
                            </Link>
                            <p className="text-sm text-muted">{[countries, entry.years].filter(Boolean).join(' · ')}</p>
                            <Credit pic={portrait} locale={locale} className="relative z-10 mt-1 block text-[0.7rem]" />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
