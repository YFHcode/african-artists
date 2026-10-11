import Image from 'next/image';

import { dictionary } from '@/i18n';
import { type Picture, type Work, isPublicDomain, workTitle } from '@/lib/artist-images';
import type { Locale } from '@/lib/i18n';

/*
 * Freely licensed pictures from Wikimedia Commons (src/lib/artist-images.ts).
 * The stored copies are already 500px WebP, so they are served as they are.
 * The credits the licences ask for (author, licence, source) are on the
 * credits page, linked from every page's footer, and in each profile's
 * structured data; each picture links to its Commons page.
 */

export function Credit({ pic, locale, className = '' }: { pic: Picture; locale: Locale; className?: string }) {
    const t = dictionary(locale).pictures;
    const license = isPublicDomain(pic.license) && /^public domain$/i.test(pic.license) ? t.publicDomain : pic.license;
    return (
        <span className={`text-xs leading-snug text-muted [overflow-wrap:anywhere] ${className}`}>
            {t.credit}: {pic.author ? `${pic.author} · ` : ''}
            {pic.licenseUrl && !isPublicDomain(pic.license) ? (
                <a href={pic.licenseUrl} rel="noopener license" className="underline underline-offset-2">
                    {license}
                </a>
            ) : (
                license
            )}
            {' · '}
            <a href={pic.page} rel="noopener" className="underline underline-offset-2">
                {t.commons}
            </a>
        </span>
    );
}

export function Portrait({ pic, name, className = 'max-h-[26rem]' }: { pic: Picture; name: string; className?: string }) {
    return (
        <a href={pic.page} rel="noopener" className="block overflow-hidden rounded-xl border border-line bg-sand">
            <Image
                src={pic.src}
                alt={name}
                width={pic.width}
                height={pic.height}
                unoptimized
                loading="eager"
                className={`w-full object-cover object-top ${className}`}
            />
        </a>
    );
}

export function WorksGallery({ works, artist, locale }: { works: Work[]; artist: string; locale: Locale }) {
    const t = dictionary(locale).pictures;
    return (
        <section aria-labelledby="works" className="mt-12">
            <h2 id="works" className="font-display text-2xl font-semibold tracking-tight">
                {t.works}
            </h2>
            <p className="mt-2 text-sm text-muted">{t.worksNote}</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {works.map((w) => {
                    const title = workTitle(w, locale);
                    return (
                        <figure key={w.qid} className="reveal flex flex-col overflow-hidden rounded-xl border border-line bg-white/60">
                            <a href={w.page} rel="noopener" className="relative block aspect-[4/3] bg-sand">
                                <Image
                                    src={w.src}
                                    alt={t.workAlt(title, artist)}
                                    width={w.width}
                                    height={w.height}
                                    unoptimized
                                    className="absolute inset-0 h-full w-full object-contain p-3"
                                />
                            </a>
                            <figcaption className="flex flex-1 flex-col gap-1 px-4 py-3">
                                <span className="font-medium">
                                    <cite className="not-italic">{title}</cite>
                                    {w.year ? `${locale === 'ar' ? '، ' : ', '}${w.year}` : ''}
                                </span>
                            </figcaption>
                        </figure>
                    );
                })}
            </div>
        </section>
    );
}
