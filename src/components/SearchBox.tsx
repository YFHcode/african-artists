'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { type Locale, localePath } from '@/lib/i18n';
import { type SearchEntry, searchEntries, wikipediaArticleUrl, wikipediaSearchUrl } from '@/lib/search';

export interface SearchLabels {
    label: string;
    placeholder: string;
    results: string;
    notHere: string;
    searching: string;
    /** Contains {q}. */
    searchWikipedia: string;
    noMatch: string;
    wikipedia: string;
}

interface Option {
    key: string;
    href: string;
    external: boolean;
    label: string;
    meta: string;
    badge?: string;
}

interface WikiHit {
    title: string;
    description: string;
    url: string;
}

/** One index request per edition per page load, shared by every instance. */
const indexes = new Map<Locale, Promise<SearchEntry[]>>();
function loadIndex(locale: Locale): Promise<SearchEntry[]> {
    let request = indexes.get(locale);
    if (!request) {
        request = fetch(`/api/search/${locale}`)
            .then((r) => (r.ok ? (r.json() as Promise<SearchEntry[]>) : []))
            .catch(() => []);
        indexes.set(locale, request);
        // A failed load is retried on the next focus.
        void request.then((entries) => entries.length === 0 && indexes.delete(locale));
    }
    return request;
}

/**
 * Articles on Wikipedia matching a query, in the reader's language, with the
 * short description Wikidata gives each ("Nigerian sculptor"). Asked only when
 * nothing on this site matches (see the privacy notice); the browser calls
 * Wikipedia directly, so the site pays nothing and keeps nothing.
 */
async function searchWikipedia(locale: Locale, query: string, signal: AbortSignal): Promise<WikiHit[]> {
    const params = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: query,
        gsrnamespace: '0',
        gsrlimit: '5',
        prop: 'description|info',
        inprop: 'url',
        format: 'json',
        formatversion: '2',
        origin: '*',
    });
    const response = await fetch(`https://${locale}.wikipedia.org/w/api.php?${params}`, { signal });
    if (!response.ok) return [];
    const data = (await response.json()) as { query?: { pages?: { title: string; index?: number; description?: string; fullurl?: string }[] } };
    return (data.query?.pages ?? [])
        .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
        .map((p) => ({
            title: p.title,
            description: p.description ?? '',
            url: p.fullurl ?? `https://${locale}.wikipedia.org/wiki/${encodeURIComponent(p.title.replaceAll(' ', '_'))}`,
        }));
}

/**
 * The header search box: a combobox over a per-edition index of this site's
 * pages, artists and lists (a static file, fetched on first focus). It has no
 * results page of its own, so there are no crawlable search URLs.
 *
 * Artists the lists name but that have no profile in this edition are in the
 * index too, linked to Wikipedia. A name not in the index at all is looked up
 * on Wikipedia and shown as links with a label saying so; nothing redirects on
 * its own, so a typo never sends anyone off the site.
 */
export function SearchBox({ locale, labels }: { locale: Locale; labels: SearchLabels }) {
    const id = useId();
    const listId = `${id}-list`;
    const root = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [entries, setEntries] = useState<SearchEntry[]>([]);
    // The index has arrived or failed; until then the list stays closed rather than flashing a partial one.
    const [loaded, setLoaded] = useState(false);
    const [wiki, setWiki] = useState<{ query: string; hits: WikiHit[] } | null>(null);
    const [active, setActive] = useState(0);

    const local = useMemo(() => searchEntries(entries, query), [entries, query]);
    const trimmed = query.trim();
    // Look on Wikipedia only for a real query that matched nothing here, once the index has arrived.
    const askWikipedia = loaded && local.length === 0 && trimmed.length >= 3;

    useEffect(() => {
        if (!askWikipedia) return;
        const controller = new AbortController();
        const timer = setTimeout(() => {
            searchWikipedia(locale, trimmed, controller.signal)
                .then((hits) => setWiki({ query: trimmed, hits }))
                .catch(() => controller.signal.aborted || setWiki({ query: trimmed, hits: [] }));
        }, 300);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [askWikipedia, locale, trimmed]);

    useEffect(() => {
        const close = (event: PointerEvent) => {
            if (!root.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener('pointerdown', close);
        return () => document.removeEventListener('pointerdown', close);
    }, []);

    const wikiReady = wiki?.query === trimmed;
    const options: Option[] = [];
    for (const e of local) {
        const external = e.k === 'wikipedia';
        options.push({
            key: `${e.k}:${e.h}`,
            href: external ? wikipediaArticleUrl(e.h) : localePath(locale, e.h),
            external,
            label: e.l,
            meta: e.m,
            badge: external ? labels.wikipedia : undefined,
        });
    }
    if (askWikipedia && wikiReady) {
        for (const hit of wiki.hits) {
            options.push({ key: `w:${hit.url}`, href: hit.url, external: true, label: hit.title, meta: hit.description, badge: labels.wikipedia });
        }
    }
    const showLastResort = loaded && trimmed.length >= 2;
    if (showLastResort) {
        options.push({
            key: 'wikipedia-search',
            href: wikipediaSearchUrl(locale, trimmed),
            external: true,
            label: labels.searchWikipedia.replace('{q}', trimmed),
            meta: '',
        });
    }

    // What to say above the results when nothing on this site matched.
    const status = !askWikipedia ? '' : !wikiReady ? labels.searching : wiki.hits.length > 0 ? labels.notHere : labels.noMatch;

    const current = Math.min(active, options.length - 1);
    const optionId = (i: number) => `${id}-option-${i}`;

    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Escape') {
            setOpen(false);
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            if (options.length === 0) return;
            event.preventDefault();
            setOpen(true);
            const step = event.key === 'ArrowDown' ? 1 : -1;
            setActive((current + step + options.length) % options.length);
        } else if (event.key === 'Enter' && open && options.length > 0) {
            event.preventDefault();
            document.getElementById(optionId(current))?.click();
        }
    }

    return (
        <div ref={root} className="relative" role="search">
            <label htmlFor={`${id}-input`} className="sr-only">
                {labels.label}
            </label>
            <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            >
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="m13 13 4 4" />
            </svg>
            <input
                id={`${id}-input`}
                type="text"
                role="combobox"
                aria-expanded={open && loaded && trimmed.length >= 2}
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={open && options.length > 0 ? optionId(current) : undefined}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="search"
                dir="auto"
                value={query}
                placeholder={labels.placeholder}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setActive(0);
                    setOpen(true);
                }}
                onFocus={() => {
                    setOpen(true);
                    void loadIndex(locale).then((loadedEntries) => {
                        setEntries(loadedEntries);
                        setLoaded(true);
                    });
                }}
                onKeyDown={onKeyDown}
                className="w-full rounded-full border border-line bg-paper py-2 ps-9 pe-3 text-[0.95rem] placeholder:text-muted focus:border-clay"
            />
            {open && loaded && trimmed.length >= 2 && (
                <div className="absolute end-0 z-30 mt-2 w-full min-w-72 overflow-hidden rounded-lg border border-line bg-paper shadow-lg sm:w-96">
                    {status && (
                        <p className="border-b border-line px-4 py-2 text-sm text-muted" role="status">
                            {status}
                        </p>
                    )}
                    <ul id={listId} role="listbox" aria-label={labels.results} className="max-h-[60vh] overflow-y-auto py-1">
                        {options.map((option, i) => {
                            const className = `flex items-baseline justify-between gap-3 px-4 py-2 text-[0.95rem] ${i === current ? 'bg-sand' : 'hover:bg-sand'}`;
                            const body = (
                                <>
                                    <span className="min-w-0">
                                        <span className="block font-medium text-ink">{option.label}</span>
                                        {option.meta && <span className="block truncate text-sm text-muted">{option.meta}</span>}
                                    </span>
                                    {option.badge && <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-clay">{option.badge} ↗</span>}
                                </>
                            );
                            return (
                                <li key={option.key} role="option" aria-selected={i === current} onMouseMove={() => setActive(i)}>
                                    {option.external ? (
                                        <a id={optionId(i)} href={option.href} rel="noopener" tabIndex={-1} className={className}>
                                            {body}
                                        </a>
                                    ) : (
                                        <Link id={optionId(i)} href={option.href} tabIndex={-1} className={className} onClick={() => setOpen(false)}>
                                            {body}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
