// Pure helpers for scripts/artist-images.mjs, tested in artist-images.test.mjs.

export const LANGS = ['en', 'fr', 'es', 'pt', 'ar'];

/** Works shown per artist, at most. */
export const MAX_WORKS = 4;

/** Width the stored copies are made at: a Wikimedia standard thumbnail step, enough for a 2x sidebar. */
export const THUMB_WIDTH = 500;

/**
 * Licences the site can use with a credit line: public domain, CC0, CC BY and
 * CC BY-SA, any version or port. Everything else — GFDL alone, NC or ND
 * variants, fair use, unknown — is left out.
 */
export function acceptedLicense(shortName) {
    const name = String(shortName ?? '').trim();
    if (/\b(nc|nd)\b/i.test(name)) return false;
    return /^(public domain|pd\b|pdm\b|cc0\b|cc[- ]zero\b|cc[- ]by(-sa)?[- ]\d)/i.test(name);
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/** Commons metadata fields are HTML; the credit line wants plain text. */
export function plainText(html, max = 120) {
    const text = String(html ?? '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
            if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
            return ENTITIES[e.toLowerCase()] ?? m;
        })
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** 'http://commons.wikimedia.org/wiki/Special:FilePath/El%20Anatsui.jpg' -> 'El Anatsui.jpg' */
export function commonsFileName(url) {
    const tail = String(url).split('/Special:FilePath/')[1];
    if (!tail) throw new Error(`not a Commons file path: ${url}`);
    return decodeURIComponent(tail).replace(/_/g, ' ');
}

export const qidOf = (uri) => String(uri).split('/').pop();

const values = (qids) => qids.map((q) => `wd:${q}`).join(' ');

/** Each artist's own image (P18), which for a person is a picture of them. */
export function portraitQuery(qids) {
    return `SELECT ?artist ?image WHERE { VALUES ?artist { ${values(qids)} } ?artist wdt:P18 ?image . }`;
}

/**
 * Works with an image whose creator (P170) is one of the artists, with a label
 * per language, the date and its precision, and how many Wikipedia articles
 * they have.
 */
export function worksQuery(qids) {
    const labels = LANGS.map((l) => `OPTIONAL { ?work rdfs:label ?label_${l} FILTER(LANG(?label_${l}) = "${l}") }`).join('\n  ');
    return `SELECT ?artist ?work ?image ?inception ?precision ?links ${LANGS.map((l) => `?label_${l}`).join(' ')} WHERE {
  VALUES ?artist { ${values(qids)} }
  ?work wdt:P170 ?artist ; wdt:P18 ?image ; wikibase:sitelinks ?links .
  OPTIONAL { ?work p:P571/psv:P571 ?date . ?date wikibase:timeValue ?inception ; wikibase:timePrecision ?precision . }
  ${labels}
}`;
}

export function parseBindings(json) {
    return (json?.results?.bindings ?? []).map((b) => Object.fromEntries(Object.entries(b).map(([k, v]) => [k, v.value])));
}

/**
 * Per artist: the portrait file and up to MAX_WORKS works, one per work (a
 * work can have several images), most Wikipedia-linked first, never the
 * portrait's own file, and only works with an English title to caption them.
 */
export function collect(portraitRows, workRows) {
    const out = new Map();
    const of = (qid) => {
        if (!out.has(qid)) out.set(qid, { portrait: null, works: [] });
        return out.get(qid);
    };
    for (const r of portraitRows) {
        const a = of(qidOf(r.artist));
        a.portrait ??= commonsFileName(r.image);
    }
    const works = new Map();
    for (const r of workRows) {
        const key = `${qidOf(r.artist)} ${qidOf(r.work)}`;
        if (works.has(key)) continue;
        // A year only when the date is known to the year (precision 9 or finer), never a decade or century.
        const year = r.inception && Number(r.precision) >= 9 ? Number.parseInt(r.inception.replace(/^\+/, ''), 10) : null;
        const title = Object.fromEntries(LANGS.map((l) => [l, r[`label_${l}`]]).filter(([, v]) => v && !/^Q\d+$/.test(v)));
        works.set(key, {
            artist: qidOf(r.artist),
            qid: qidOf(r.work),
            file: commonsFileName(r.image),
            year: Number.isFinite(year) && year > 0 ? year : null,
            title,
            links: Number(r.links) || 0,
        });
    }
    for (const w of [...works.values()].sort((a, b) => b.links - a.links || a.qid.localeCompare(b.qid))) {
        const a = of(w.artist);
        if (!w.title.en || w.file === a.portrait || a.works.some((x) => x.file === w.file)) continue;
        if (a.works.length < MAX_WORKS) a.works.push({ qid: w.qid, file: w.file, year: w.year, title: w.title });
    }
    return out;
}

/** The credit and licence of one Commons file, or the reason it cannot be used. */
export function creditOf(info) {
    const meta = info?.extmetadata ?? {};
    const license = plainText(meta.LicenseShortName?.value, 60);
    if (!acceptedLicense(license)) return { error: `licence "${license || 'none'}"` };
    if (!info.thumburl) return { error: 'no thumbnail' };
    // Commons sometimes renders the same name twice ("Unknown author Unknown author").
    const author = plainText(meta.Artist?.value).replace(/^(.+) \1$/, '$1') || null;
    const isPublicDomain = /^(public domain|pd|pdm|cc0|cc[- ]zero)/i.test(license);
    if (!author && !isPublicDomain) return { error: 'no author for an attribution licence' };
    return {
        author,
        license,
        licenseUrl: meta.LicenseUrl?.value || null,
        page: info.descriptionurl,
        thumb: info.thumburl,
    };
}

/** File name for a stored copy: the profile slug, then 'portrait' or the work's Wikidata ID. */
export function storedName(slug, what) {
    return `${slug}-${what.toLowerCase()}.webp`;
}
