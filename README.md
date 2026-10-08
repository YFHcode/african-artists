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
npm run build      production build (prerenders all 330 indexable pages)
npm start          serve the production build
npm test           content integrity, offer validation, URL helpers
npm run lint
npm run typecheck
npm run indexnow -- <paths> | --all
```

## Notes for future work

- The 404 page is `src/app/global-not-found.tsx`, which needs `experimental.globalNotFound`
  (Next.js 16.4). With the root layout under `[locale]`, the regular `not-found.tsx` rendered an
  empty body on the server. Re-check `/does-not-exist` after every Next.js upgrade.
- English lives at the root through an `afterFiles` rewrite to `/en/…` in `next.config.ts`;
  `/en/…` redirects back. Keep the `(?:/|$)` in the rewrite pattern — see the comment there.
- Translations were written for this site, not machine-translated in bulk, but a native-speaker
  review of the French, Spanish, Portuguese and especially Arabic editions is worth doing.
- After deploying new pages, ping IndexNow with just those paths (see "After launch").
