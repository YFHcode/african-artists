import Link from 'next/link';
import type { ReactNode } from 'react';

import { JsonLd } from '@/components/JsonLd';
import { Motif } from '@/components/Motif';
import type { Dictionary } from '@/i18n';
import { entryPath } from '@/content/catalog';
import type { Article, Fact } from '@/lib/content';
import { type Locale, localePath } from '@/lib/i18n';
import { breadcrumbSchema } from '@/lib/schema';

export interface Crumb {
    name: string;
    path: string;
}

/** Visible breadcrumbs plus the matching BreadcrumbList, built from one list so they cannot disagree. */
export function Breadcrumbs({ locale, trail, label }: { locale: Locale; trail: Crumb[]; label: string }) {
    return (
        <>
            <JsonLd data={breadcrumbSchema(locale, trail)} />
            <nav aria-label={label} className="mx-auto max-w-6xl px-4 pt-6 text-sm text-muted">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {trail.map((crumb, i) => {
                        const last = i === trail.length - 1;
                        return (
                            <li key={crumb.path} className="flex items-center gap-2">
                                {last ? (
                                    <span aria-current="page" className="text-ink">
                                        {crumb.name}
                                    </span>
                                ) : (
                                    <>
                                        <Link href={localePath(locale, crumb.path)} className="hover:text-clay">
                                            {crumb.name}
                                        </Link>
                                        <span aria-hidden="true" className="rtl:rotate-180">
                                            ›
                                        </span>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}

/** One article as a card: decorative band, kicker, name, one-line description. */
export function EntryCard({ article, t, headingLevel = 'h3' }: { article: Article; t: Dictionary; headingLevel?: 'h2' | 'h3' }) {
    const Heading = headingLevel;
    const { entry } = article;
    const countries = entry.countries.map((c) => t.countries[c]).join(' · ');

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper transition-shadow hover:shadow-md">
            <Motif seed={entry.slug} className="block h-16 w-full" />
            <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-clay">{article.kicker}</p>
                <Heading className="mt-1 font-display text-xl font-semibold leading-snug text-ink">
                    <Link href={localePath(article.locale, entryPath(entry))} className="after:absolute after:inset-0">
                        {article.label}
                    </Link>
                </Heading>
                {(countries || entry.years) && (
                    <p className="mt-1 text-sm text-muted">
                        {[countries, entry.years].filter(Boolean).join(' · ')}
                    </p>
                )}
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/85">{article.description}</p>
            </div>
        </article>
    );
}

/** Three columns, or four when there are exactly four cards, so none is left alone on a row. */
export function CardGrid({ children, count }: { children: ReactNode; count?: number }) {
    const columns = count === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
    return <div className={`grid gap-5 sm:grid-cols-2 ${columns}`}>{children}</div>;
}

export function FactFile({ facts, title }: { facts: Fact[]; title: string }) {
    if (facts.length === 0) return null;
    return (
        <aside className="rounded-xl border border-line bg-sand p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h2>
            <dl className="mt-3 space-y-3 text-[0.95rem]">
                {facts.map((fact) => (
                    <div key={fact.label}>
                        <dt className="font-semibold">{fact.label}</dt>
                        <dd className="text-ink/85">{fact.value}</dd>
                    </div>
                ))}
            </dl>
        </aside>
    );
}

/** In-content links to related articles — the main source of internal links between articles. */
export function RelatedArticles({ articles, title, t }: { articles: Article[]; title: string; t: Dictionary }) {
    if (articles.length === 0) return null;
    return (
        <section aria-labelledby="related-heading" className="mx-auto mt-16 max-w-6xl px-4">
            <h2 id="related-heading" className="font-display text-2xl font-semibold">
                {title}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {articles.map((article) => (
                    <EntryCard key={article.entry.slug} article={article} t={t} />
                ))}
            </div>
        </section>
    );
}
