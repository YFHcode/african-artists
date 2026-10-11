# SEO, structure and UX audit — 11 October 2026

Run after all seven artist-page waves, against a production build (`next build && next start`),
with the Appendix B scripts of the Universal SEO Playbook (CGP repo,
`docs/UNIVERSAL-SEO-PLAYBOOK.md`). Re-run the same scripts for the quarterly audit (playbook D.6).

## Results

| Check (playbook) | Result |
| --- | --- |
| Status probe (B.1) | Real 404s for unknown slugs, languages, countries, media and bot probes (`/wp-admin`, `/.env`); `/en/…` and trailing slashes 308 to the clean URL in one hop |
| robots.txt (B.2) | Everything crawlable except `/api/`; sitemap referenced. Tester self-test 15/15 |
| Page audit, one URL per template (B.3) | One self-canonical, one H1, `og:image`, `<html lang>`, viewport, valid JSON-LD without duplicate keys on every template; no `noindex` |
| Sitemap (B.4, all 618 URLs) | Every URL 200, indexable and self-canonical. 81% of `lastmod` values are 2026-10-11 — honest, since waves 1–7 were all published that day; they will spread as pages change |
| Rendered link graph (B.5) | Crawl complete: 618 pages, all within 3 clicks of the home page; no orphans; nothing reachable is missing from the sitemap. Only About and Privacy rely on the footer |
| Full crawl, all pages | 0 broken internal links; every page linked from at least two others; no duplicate titles |
| hreflang (B.7) | All clusters valid, including partial ones (2–4 languages) |
| Template similarity (B.8) | Short profiles 8.4% median, country hubs 5.9% — far below the 80% warning line |
| Page weight (B.6) | Articles 66–102 KB. Long lists are heavy: painters 473 KB, contemporary 405 KB, `/artists` 461 KB (58–72 KB gzipped, served as static files); ~60% is the React hydration payload, normal for the framework |

## Changed

- **Titles (6.1).** 361 of 618 titles were longer than 60 characters before the
  " | AfricanArtists.com" suffix, so results cut the suffix and the title's last words.
  `documentTitle()` in `src/lib/seo.ts` now drops the suffix when it would push a title past
  60 characters (Google shows the site name above each result anyway).
- **`/artists` index.** Its introduction still described the original 42 artists ("Fourteen have
  full profiles…") and named profiled artists without linking them. Rewritten in five languages;
  names with a profile in that edition are linked; a wrong line about Chaïbia Talal (not a
  Casablanca School member) corrected; Arabic name spellings aligned with the profiles. The page
  now shows the intro, then every list of artists, then the profiles, then the longer
  introduction — instead of the lists below 110 cards.
- **Hub list weight.** List lines are styled from the `<ul>` instead of repeating classes 400 times:
  −17 to −20% on the long lists.

## Backlog (not done)

- 384 descriptions are longer than 160 characters and will be truncated in results (not a ranking
  factor). Shorten when pages are next edited; the content test still allows 185.
- 361 titles remain over 60 characters; with the suffix gone they lose only their own last words.
  Shorten the most important (hubs, top profiles) first.
- Search Console and Bing Webmaster Tools data are needed for the next steps (playbook 0.3):
  Performance export (3 months) and Pages report — to find pages at positions 8–20 and
  "Crawled – currently not indexed" patterns.
