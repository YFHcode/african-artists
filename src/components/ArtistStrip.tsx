import Image from 'next/image';
import Link from 'next/link';

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
 * Profiled for their work in or about Africa, not as African artists (their
 * profiles say so), so not among the "faces of African art".
 */
const NOT_AFRICAN_ARTISTS = new Set(['leni-riefenstahl', 'web-du-bois']);

/**
 * "Faces of African art": a row of portraits of the artists profiled in this
 * edition, full profiles first and then the most looked-up. It drifts slowly
 * and stops whenever the visitor hovers, touches, scrolls or tabs into it,
 * with a pause button (StripControls.tsx); with a reduced-motion preference it
 * stays still and scrolls by hand. Every card is an ordinary link to the
 * profile; the pictures' credits are on /credits, linked from the footer.
 */
export function ArtistStrip({ locale }: { locale: Locale }) {
    const t = dictionary(locale);
    const items = entriesIn('artists')
        .filter((e) => isAvailable(e, locale) && !NOT_AFRICAN_ARTISTS.has(e.slug))
        .map((entry) => ({ entry, portrait: artistPictures(entry.qid)?.portrait }))
        .filter((x): x is typeof x & { portrait: Picture } => Boolean(x.portrait))
        .map((x) => ({ ...x, full: x.entry.kind === 'full', views: (x.entry.qid && dataArtist(x.entry.qid)?.views) || 0 }))
        // Full profiles first: pageviews alone would open with people best known for something else.
        .sort((a, b) => Number(b.full) - Number(a.full) || b.views - a.views || a.entry.slug.localeCompare(b.entry.slug))
        .slice(0, MAX);
    if (items.length < MIN) return null;

    const cards = items.map(({ entry, portrait }) => ({
        entry,
        portrait,
        label: getArticle(locale, 'artists', entry.slug)!.label,
        details: [entry.countries.map((c) => t.countries[c]).join(' · '), entry.years].filter(Boolean).join(' · '),
    }));
    // StripControls adds a second, hidden set of these cards in the browser for
    // the drift to loop through, so the page carries them only once.
    const card = ({ entry, portrait, label, details }: (typeof cards)[number]) => (
        <li key={entry.slug} className="group relative w-40 shrink-0 snap-start sm:w-52">
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
            <Link prefetch={false}
                href={localePath(locale, entryPath(entry))}
                className="mt-3 block font-display text-lg font-semibold leading-snug after:absolute after:inset-0 group-hover:text-clay"
            >
                {label}
            </Link>
            <p className="text-sm text-muted">{details}</p>
        </li>
    );

    return (
        <section aria-labelledby="home-faces" className="mx-auto mt-8 max-w-6xl px-4 sm:mt-14">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
                <div>
                    <h2 id="home-faces" className="font-display text-3xl font-semibold tracking-tight">
                        {t.home.facesTitle}
                    </h2>
                    <p className="mt-2 text-muted">{t.home.facesText}</p>
                </div>
                <StripControls
                    target="artist-strip"
                    labels={{ prev: t.home.facesPrev, next: t.home.facesNext, pause: t.home.facesPause, play: t.home.facesPlay }}
                />
            </div>
            <ul id="artist-strip" className="artist-strip mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3" tabIndex={0} aria-label={t.home.facesTitle}>
                {cards.map(card)}
            </ul>
        </section>
    );
}
