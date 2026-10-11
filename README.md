# AfricanArtists.com

A domain-for-sale site that is also a real, multilingual guide to African art —
art forms and traditions, artists, movements and regions — and to African music. The sale page converts buyers; the guide gives the
domain search visibility, traffic and links, which is what makes a name like
this look valuable to a buyer.

- **Sale page:** `/buy` — pitch, use cases, how buying works, FAQ, offer form, optional marketplace link.
- **Guide:** 56 fact-checked articles — 15 art forms and traditions (masks, sculpture, textiles,
  kente, adinkra, mudcloth, the Benin Bronzes, beadwork, pottery, rock art, photography…),
  14 artists, 6 movements, 5 regions, 10 music genres and 6 guides — in **English** (`/`),
  **French** (`/fr`), **Spanish** (`/es`), **Portuguese** (`/pt`) and **Arabic** (`/ar`, right-to-left).
- **Search strategy:** the art-form, region and history pages target the broad searches
  ("African masks", "kente cloth", "West African art", "history of African art") that bring
  far more visitors than artists' names; region pages list every article from their countries
  automatically, so new articles are linked from their region without manual edits.
- **Stack:** Next.js 16 (App Router), Tailwind CSS 4, fully prerendered; one serverless route (`/api/offer`).

Built following the universal SEO playbook (`docs/UNIVERSAL-SEO-PLAYBOOK.md` in the CGP repo):
real 404s, one URL per page, hreflang clusters, honest `lastmod`, structured data that matches
the page, no fabricated facts, every article reachable within three clicks.

## Deploy on Vercel

1. **Import** this repository in Vercel (Add New → Project). No build settings to change.
2. **Environment variables** (Project → Settings → Environment Variables), see `.env.example`:

   | Variable | Required | What it does |
   |---|---|---|
   | `RESEND_API_KEY` | yes, for offers | API key from [resend.com](https://resend.com) (free tier is enough) |
   | `OFFER_TO_EMAIL` | yes, for offers | Where offers are delivered. Never shown on the site |
   | `OFFER_FROM_EMAIL` | no | Sender. The default `onboarding@resend.dev` only delivers to your own Resend account address — fine for this. Verify the domain in Resend to send from `offers@africanartists.com` |
   | `NEXT_PUBLIC_MARKETPLACE_URL` + `NEXT_PUBLIC_MARKETPLACE_NAME` | no | Adds a "See the listing on …" button (Afternic, Sedo, Dan.com…). Both must be set |
   | `NEXT_PUBLIC_SITE_URL` | no | Canonical origin, default `https://africanartists.com` |
   | `NEXT_PUBLIC_GOOGLE_VERIFICATION` / `NEXT_PUBLIC_BING_VERIFICATION` | no | Search Console / Bing Webmaster verification codes (or verify by DNS instead) |

   Without the two Resend variables the form answers "offers cannot be sent at the moment" —
   it never pretends an offer went through. `NEXT_PUBLIC_*` values are baked in at build time:
   redeploy after changing them.

3. **Domain** (Project → Settings → Domains): add `africanartists.com` **and** `www.africanartists.com`,
   make the **bare domain primary** and let `www` redirect to it. If you change that choice, set
   `NEXT_PUBLIC_SITE_URL` to match, or every canonical will point at the wrong host.
   The production `*.vercel.app` address redirects to the real domain automatically.
4. **Analytics:** enable Web Analytics in the Vercel project. A successful offer is recorded as the
   custom event `offer_sent`.

> **If the domain is currently parked at a marketplace** (Sedo, Dan.com, Afternic landing page), pointing
> its DNS at Vercel replaces that parking page with this site. Afternic's "Fast Transfer" network keeps
> working without parking; check your marketplace's rules before switching.

## After launch (playbook D.1 / 17.1)

1. Open `https://africanartists.com/buy` and send yourself a test offer. Confirm the email arrives and
   that replying goes to the address you entered.
2. Verify the site in **Google Search Console** and **Bing Webmaster Tools**; submit `https://africanartists.com/sitemap.xml`.
3. In Search Console, request indexing for `/`, `/buy`, `/artists`, `/music`, `/fr`, `/pt`, `/ar`.
4. Ping IndexNow once (Bing, Yandex, Naver, Seznam, Yep): `npm run indexnow -- --all`.
   Afterwards submit only pages you change: `npm run indexnow -- /artists/el-anatsui /fr/artists/el-anatsui`.
5. Watch Search Console → Pages weekly for the first two months.

## Getting buyers (what the site can and cannot do)

Search visibility for a new site builds over months, and most domain sales start elsewhere.
Do these in parallel:

- **List the name on the marketplaces buyers browse** (Afternic, Sedo, Dan.com/GoDaddy). Set
  `NEXT_PUBLIC_MARKETPLACE_*` so the site links to the listing.
- **Reach out directly** to organisations the name would suit: African art marketplaces and
  galleries, music labels and distributors with African rosters, art fairs and festivals,
  foundations. Send them to `/buy`.
- **Earn links to the guide** — the playbook's Part 13: offer the articles to African art and
  music newsletters, university course pages, and Wikipedia talk pages where a cited source is
  missing (as a source, never as self-promotion). Each link raises what the domain is worth.

## Editing content

```
content/<collection>/<slug>/<locale>.md   one article, one language
content/pages/<name>/<locale>.md          index intros, about, privacy
src/content/catalog.ts                    what exists: slugs, countries, years, related links, dates
src/i18n/<locale>.ts                      interface text (menus, buy page, form)
```

- Every article must exist in **all five** languages; `npm test` fails otherwise.
- Tag each article with its countries in `catalog.ts`. Every country must belong to one region in
  `REGIONS` (a test checks it); the region page then lists the article automatically.
- Every article needs at least three links from other articles' English bodies (a test checks it),
  so a new page is never an orphan.
- Link between articles with edition-independent paths — `[El Anatsui](/artists/el-anatsui)` — and
  each edition rewrites them to its own folder.
- When an article meaningfully changes, update its `updated` date in `catalog.ts` (feeds the sitemap
  and `dateModified`). Do not bump dates without a real change.
- **Check facts against sources before publishing.** Every claim in the launch articles was checked;
  keep it that way — this guide's value to a buyer is that it is trustworthy.
- French: type ordinary spaces before `: ; ? !`; they become no-break spaces automatically.

## Commands

```
npm run dev        local development
npm run build      production build (prerenders every indexable page; 618 after wave 7)
npm start          serve the production build
npm test           content integrity, offer validation, URL helpers
npm run lint
npm run typecheck
npm run indexnow -- <paths> | --all
node scripts/artists-data.mjs   refresh data/artists/ (needs access to Wikidata)
```

## Artist data

`data/artists/artists.{json,csv}` lists every African painter, sculptor, photographer, visual
artist, printmaker and ceramicist on Wikidata (present-day African citizenship, at least four
Wikipedia/Wikimedia articles), ranked by twelve months of Wikipedia pageviews in the site's five
languages. It is the source for programmatic artist pages. The `Artist data` GitHub Action
rebuilds it on the 3rd of each month and commits only when something changed; run it by hand from
the Actions tab to change the thresholds.

Each row has a tier:

- `page`: among the 150 most viewed artists with 5,000+ views a year; worth its own page.
- `list`: a real artist with less search demand; appears on country and medium lists only.
- `review`: the Wikidata description does not mention art. Check by hand, then either leave
  it or add the QID to `data/artists/exclude.txt`.
- `excluded`: on the exclude list (Wikidata calls Du Bois a photographer; nobody searches for
  him as one).

Wikidata is CC0; facts on generated pages still need a sanity check before publishing.

Wikidata errors go in `data/artists/corrections.json` (a wrong birth or death year) or
`data/artists/exclude.txt` (not a visual artist). The site applies both at build time, so a fix
is live with the next deploy; the data job applies them too on its next run. The job runs only
on its monthly schedule or when started by hand from the Actions tab — never on push.

The monthly job's summary also lists page-tier artists with no planned profile: candidates for
the next wave.

## Artist pages and hubs (released in waves)

The plan is `docs/artist-pages-rollout.md`. Three files drive it:

- `src/content/roster.ts`: every planned profile beyond the original fourteen, with its wave,
  its type (`full` or `short`) and the editions it exists in.
- `src/content/hubs.ts`: every hub (by country, by medium, or both, plus the contemporary hub of
  everyone born since 1960), with its wave and
  editions.
- `src/content/waves.ts`: release dates. A wave is public once it has one.

**Content.**

- **Profiles** go in `content/artists/<slug>/<locale>.md`, only for the editions the roster
  declares.
  - A full profile is written like the original fourteen.
  - A short profile has the same header fields but no `facts`: its facts box (life dates,
    country, disciplines) is generated from the data. Its body needs 700+ characters.
- **Hub introductions** go in one of:
  - `content/hubs/country/<country>/<locale>.md`
  - `content/hubs/country/<country>/<medium>/<locale>.md`
  - `content/hubs/medium/<medium>/<locale>.md`
  - `content/hubs/contemporary/<locale>.md`

  Each has `title`, `label` (the short link text, e.g. "South African photographers"),
  `heading` and `description`, and an English introduction of 80+ words.

**Release a wave:**

1. Write its profiles and hub introductions.
2. Preview it with `NEXT_PUBLIC_PREVIEW_WAVE=<n> npm run build && npm start`, or set the
   variable in Vercel's *Preview* environment only.
3. Add links to the new full profiles from existing articles; the tests want three each.
4. Set `WAVES[n]` to the release date.
5. Run `npm test`, then build and deploy.
6. `npm run indexnow --` with the new paths, and request indexing for the hubs in Search Console.

**Editions.**

- Not every page exists in all five languages.
- hreflang, the sitemap and `llms.txt` list only the editions that exist.
- The language switcher sends a missing edition to that language's section index.
- A missing edition answers 404.
- The tests check every internal link against the editions of its own page.

## Site search

The search box in the header (`src/components/SearchBox.tsx`) searches in the browser, with no
results page, so there are no crawlable search URLs.

- **Index.** `src/lib/search-index.ts` builds one JSON file per edition at build time, served
  at `/api/search/<locale>` (about 120 KB, 30 KB compressed; under `/api/`, which robots.txt
  disallows). It holds our pages and lists, and every artist the lists name that has no
  profile in that edition, linked to Wikipedia. The browser fetches it the first time the box
  is focused. A new profile or hub is in it after the next build; nothing to maintain.
- **Matching.** `src/lib/search.ts` (tested in `scripts/search.test.mjs`): accents folded, Arabic
  letter variants and the article ال folded, every query word must start a word of the entry.
- **Wikipedia.** A name not in the index is looked up through Wikipedia's search API, called
  from the browser (once, 300 ms after typing stops, three characters or more, in the
  edition's language). Results are links labelled "Wikipedia", never an automatic redirect;
  a "Search Wikipedia for …" link is always offered. This is disclosed in the privacy notice.
- **Routing note.** `next.config.ts` keeps `/api/` out of the English-edition rewrite: Next.js
  matches dynamic routes after the rewrites, so `/api/search/fr` would otherwise become
  `/en/api/search/fr` and 404.

## Notes for future work

- The 404 page is `src/app/global-not-found.tsx`, which needs `experimental.globalNotFound`
  (Next.js 16.4). With the root layout under `[locale]`, the regular `not-found.tsx` rendered an
  empty body on the server. Re-check `/does-not-exist` after every Next.js upgrade.
- English lives at the root through an `afterFiles` rewrite to `/en/…` in `next.config.ts`;
  `/en/…` redirects back. Keep the `(?:/|$)` in the rewrite pattern — see the comment there.
- Translations were written for this site, not machine-translated in bulk, but a native-speaker
  review of the French, Spanish, Portuguese and especially Arabic editions is worth doing.
- After deploying new pages, ping IndexNow with just those paths (see "After launch").
- `generateStaticParams` must never return `[]` for one locale while returning pages for
  another: Next.js 16 then drops the whole route in every locale. The hub routes list every
  released hub in every edition and answer 404 for a missing edition (see `hubRoute` in
  `src/lib/routes.tsx`).
- Read a locale from params or a form with `toLocale()` (`src/lib/i18n.ts`), never by checking
  the incoming string and keeping it. During `next build` the optimized code has been seen to
  answer `'en' !== 'en'` for the string Next.js passes in params, at random, so English hub
  pages got `/en/…` links (redirects). The crawl in the playbook audit catches this as 308s.
