/**
 * The article file format, parsed without a YAML dependency.
 *
 *     ---
 *     title: El Anatsui: bottle-cap tapestries and a life in Nsukka
 *     description: …
 *     facts:
 *       - Born | 1944, Anyako, Ghana
 *       - Based in | Nsukka, Nigeria
 *     ---
 *     Markdown body…
 *
 * Deliberately small: `key: value` on one line, or a key with an empty value
 * followed by `  - item` lines for a list. Values are taken verbatim to the
 * end of the line — colons inside them are fine, quotes are not stripped.
 * Anything else in the header is an error rather than a silent guess,
 * because a mistyped field would otherwise ship as a missing title.
 *
 * Free of imports so the content tests can run it directly under node.
 */

export type FrontmatterValue = string | string[];

export interface ParsedFile {
    data: Record<string, FrontmatterValue>;
    body: string;
}

export function parseFrontmatter(source: string, file = '<input>'): ParsedFile {
    const text = source.replace(/^﻿/, '').replace(/\r\n/g, '\n');
    if (!text.startsWith('---\n')) throw new Error(`${file}: missing frontmatter`);

    const end = text.indexOf('\n---\n', 4);
    if (end === -1) throw new Error(`${file}: unterminated frontmatter`);

    const header = text.slice(4, end).split('\n');
    const body = text.slice(end + 5).trim();
    const data: Record<string, FrontmatterValue> = {};

    let listKey: string | null = null;
    header.forEach((line, i) => {
        if (line.trim() === '') return;

        const item = /^\s+-\s+(.*)$/.exec(line);
        if (item) {
            if (!listKey) throw new Error(`${file}:${i + 2}: list item outside a list`);
            (data[listKey] as string[]).push(item[1].trim());
            return;
        }

        const pair = /^([A-Za-z][\w-]*):(?:\s+(.*))?$/.exec(line);
        if (!pair) throw new Error(`${file}:${i + 2}: cannot parse "${line}"`);

        const [, key, value] = pair;
        if (key in data) throw new Error(`${file}:${i + 2}: duplicate key "${key}"`);

        if (value === undefined || value.trim() === '') {
            data[key] = [];
            listKey = key;
        } else {
            data[key] = value.trim();
            listKey = null;
        }
    });

    return { data, body };
}
