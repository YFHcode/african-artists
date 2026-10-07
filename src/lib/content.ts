import fs from 'node:fs';
import path from 'node:path';

import { Marked } from 'marked';

import { CATALOG, type Collection, type Entry, entriesIn, findEntry } from '@/content/catalog';
import { parseFrontmatter } from '@/lib/frontmatter';
import { type Locale, localePath } from '@/lib/i18n';

/**
 * Reads the article files at build time.
 *
 * Every page that uses this is prerendered (generateStaticParams with
 * dynamicParams = false), so the filesystem is only touched during the build
 * and nothing here runs per request.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface Fact {
    label: string;
    value: string;
}

export interface Article {
    entry: Entry;
    locale: Locale;
    /** <title>, without the site-name suffix. */
    title: string;
    /** The <h1>. */
    heading: string;
    /** Meta description; also the card text on index pages. */
    description: string;
    /** Short label above the heading: "Sculptor", "Music genre". */
    kicker: string;
    /** The answer-first opening paragraph, shown before the body. */
    summary: string;
    /** Short name for cards, breadcrumbs and links: "El Anatsui", "Afrobeat". For artists, the person's name. */
    label: string;
    facts: Fact[];
    html: string;
    words: number;
}

export interface Page {
    title: string;
    heading: string;
    description: string;
    html: string;
}

/**
 * French typography puts a space before : ; ? ! and inside « », and that
 * space must not break, or a lone "?" wraps onto the next line. Authors type
 * an ordinary space; this swaps in a no-break space when the file is read.
 */
export function frenchSpacing(text: string): string {
    return text
        .replace(/ ([:;?!»])/g, ' $1')
        .replace(/« /g, '« ');
}

function readFile(...segments: string[]): { data: Record<string, string | string[]>; body: string; file: string } {
    const file = path.join(CONTENT_DIR, ...segments);
    let source = fs.readFileSync(file, 'utf8');
    if (segments.at(-1) === 'fr.md') {
        // The header's own "key: value" separators have no space before the
        // colon, so they are untouched.
        source = frenchSpacing(source);
    }
    const parsed = parseFrontmatter(source, file);
    return { ...parsed, file };
}

function field(data: Record<string, string | string[]>, key: string, file: string): string {
    const value = data[key];
    if (typeof value !== 'string' || value === '') throw new Error(`${file}: missing "${key}"`);
    return value;
}

/**
 * Markdown to HTML, with internal links moved into the reader's edition.
 *
 * Articles link to each other by edition-independent path — [El Anatsui]
 * (/artists/el-anatsui) — so that the four translations can share link
 * targets. Rendering a French article turns that into /fr/artists/el-anatsui.
 */
function renderer(locale: Locale): Marked {
    return new Marked({
        gfm: true,
        renderer: {
            link({ href, title, tokens }) {
                const text = this.parser.parseInline(tokens);
                const internal = href.startsWith('/') && !href.startsWith('//');
                const target = internal ? localePath(locale, href) : href;
                const titleAttr = title ? ` title="${escapeAttr(title)}"` : '';
                const rel = internal ? '' : ' rel="noopener"';
                return `<a href="${escapeAttr(target)}"${titleAttr}${rel}>${text}</a>`;
            },
        },
    });
}

function escapeAttr(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

const renderers = new Map<Locale, Marked>();

export function renderMarkdown(locale: Locale, markdown: string): string {
    let marked = renderers.get(locale);
    if (!marked) {
        marked = renderer(locale);
        renderers.set(locale, marked);
    }
    return marked.parse(markdown, { async: false }) as string;
}

function countWords(text: string): number {
    return text.split(/\s+/).filter(Boolean).length;
}

const articles = new Map<string, Article>();

export function getArticle(locale: Locale, collection: string, slug: string): Article | null {
    const entry = findEntry(collection, slug);
    if (!entry) return null;

    const key = `${locale}:${collection}/${slug}`;
    const cached = articles.get(key);
    if (cached) return cached;

    const { data, body, file } = readFile(collection, slug, `${locale}.md`);
    const facts = (Array.isArray(data.facts) ? data.facts : []).map((line) => {
        const [label, ...rest] = line.split('|');
        if (rest.length === 0) throw new Error(`${file}: fact "${line}" needs "Label | Value"`);
        return { label: label.trim(), value: rest.join('|').trim() };
    });

    const summary = field(data, 'summary', file);
    const article: Article = {
        entry,
        locale,
        title: field(data, 'title', file),
        heading: field(data, 'heading', file),
        description: field(data, 'description', file),
        kicker: field(data, 'kicker', file),
        summary,
        label: field(data, 'label', file),
        facts,
        html: renderMarkdown(locale, body),
        words: countWords(summary) + countWords(body),
    };
    articles.set(key, article);
    return article;
}

export function listArticles(locale: Locale, collection: Collection): Article[] {
    return entriesIn(collection).map((entry) => getArticle(locale, entry.collection, entry.slug)!);
}

export function relatedArticles(locale: Locale, entry: Entry): Article[] {
    return entry.related.map((key) => {
        const [collection, slug] = key.split('/');
        const article = getArticle(locale, collection, slug);
        if (!article) throw new Error(`${entry.collection}/${entry.slug}: related "${key}" does not exist`);
        return article;
    });
}

export function getPage(locale: Locale, name: string): Page {
    const { data, body, file } = readFile('pages', name, `${locale}.md`);
    return {
        title: field(data, 'title', file),
        heading: field(data, 'heading', file),
        description: field(data, 'description', file),
        html: renderMarkdown(locale, body),
    };
}

/** The newest `updated` date among a set of entries — a hub changes when an article in it does. */
export function latestUpdate(entries: Entry[] = CATALOG): string {
    return entries.map((e) => e.updated).sort().at(-1) ?? '';
}
