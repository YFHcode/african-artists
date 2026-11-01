# Content batches — the working plan

*Started 31 October 2026. This is the batch-by-batch version of [growth-plan.md](growth-plan.md):
what each batch covers, which pages it adds or changes, the keywords each page targets, and its
status. Batches 0–9 (artist profiles) and Museums batch 1 are done; numbering carries on from 10.*

*Keywords: Semrush, US database unless a market is named (UK, FR, BR, PT, ES, MX, EG, NG, ZA),
pulled on 31 October 2026. Each figure is **monthly searches / keyword difficulty (KD, 0–100)**.
Secondary keywords come from Semrush broad-match pulls the same day. "Not checked" means no
Semrush data yet — pull it before writing.*

---

## How every batch runs

1. **Check the keywords.** If Semrush is still available, re-pull the batch's main keywords; check
   Search Console for queries the site already gets on the topic.
2. **Research.** Facts from sources, logged in `data/sources/<collection>/<slug>.md`. Nothing
   invented; uncertain points stated as uncertain or left out.
3. **Write the English pages.**
   - The **primary keyword** goes in the title (≤ 70 characters), the heading, the first sentence
     of the summary and the slug.
   - **Secondary keywords** become section headings or sit in the text where they read naturally;
     never stuffed.
   - Questions people search get short, direct answers in their own section.
4. **Translate** into the languages listed for each page. Each edition links only to pages that
   exist in that edition.
5. **Link.** At least three inbound links from related English pages, plus the hub; links out to
   related art forms, artists, museums.
6. **Release.** Tests, build, crawl, push to `main`. Tick the batch here with the date and commit.
7. **Index.** Request indexing in Search Console for new hubs; check positions four and eight
   weeks later and note them under the batch.

**Status:** ☐ planned · ◐ in progress · ☑ shipped

---

## Keyword traps found in the data

| Looks like | Really | Target instead |
|---|---|---|
| *ankara* 22,200 | Mostly the Turkish capital | *ankara fabric* 2,900 / 47 |
| *sankofa* 12,100 | Shared with a person's name (adult content) | *sankofa meaning* 3,600 / 28 · *sankofa symbol* 1,300 / 21 |
| *kente* | Broad match returns "Kent" | *kente cloth* 12,100 / 47 and its variants |
| *kora* | Broad match returns Korean instruments | *kora instrument* 3,600 / 30 · *kora musical instrument* 2,400 / 28 |
| *ankh shield* 5,400 | A Terraria game item | *ankh meaning* 18,100 / 39 |
| *african mask plant* 1,600 | A houseplant | Ignore |
| *black artists* 8,100 | About half are country-music artists | *famous black artists* 2,900 / 36 · *art by black artists* 2,400 / 32 |
| *mud cloth* | Mixed with "mud pie" and mud stains | *mud cloth fabric* 480 / 3 · *african mud cloth* 390 / 8 |
| *anansi boys*, *skunk anansie* | A novel, a band | *anansi the spider* 6,600 / 45 |
| *berber* rugs at home stores | Also a carpet weave | *moroccan berber rug* 390 / 13 · *what is a berber rug* 390 / 5 |
| *kanga* 12,100 | Several meanings | *kanga* with *kitenge* and *kikoi* on one page |
| *national museum of african american music* 9,900 | Nashville | Out of scope |

---

## Tracker

| Batch | Theme | New | Updated | Target | Status |
|---|---|---:|---:|---|---|
| [10](#batch-10--dakart-2026) | Dak'Art 2026 | 2 | 7 | 12 Nov 2026 | ◐ shipped 1 Nov; updates 10 and 19 Nov |
| [11](#batch-11--existing-pages-depth-photographs-sharper-snippets) | Existing pages: depth, photographs, snippets | 0 | 9 | 21 Nov 2026 | ☑ 1 Nov; check 19 Dec |
| [12](#batch-12--instruments-1) | Instruments 1 | 7 | 4 | 30 Nov 2026 | ☑ 1 Nov (photographs and English-only Search Console check to follow) |
| [13](#batch-13--symbols-1) | Symbols 1 | 6 | 2 | 15 Dec 2026 | ☐ |
| [14](#batch-14--patterns-and-dress-1) | Patterns and dress 1 | 7 | 3 | 31 Dec 2026 | ☐ |
| [15](#batch-15--black-history-month) | Black History Month (US) | 3 | 3 | 10 Jan 2027 | ☐ |
| [16](#batch-16--artists-of-the-diaspora-and-today) | Artists of the diaspora and today | 9–10 | 4 | 31 Jan 2027 | ☐ |
| [17](#batch-17--instruments-2) | Instruments 2 | 6 | 2 | 10 Feb 2027 | ☐ |
| [18](#batch-18--museums-2) | Museums 2 | 10 | 4 | 28 Feb 2027 | ☐ |
| [19](#batch-19--art-travel) | Art travel | 7 | 3 | 15 Mar 2027 | ☐ |
| [20](#batch-20--dress-2) | Dress 2 | 9 | 1 | 31 Mar 2027 | ☐ |
| [21](#batch-21--buying-guides) | Buying guides | 7 | 1 | 15 Apr 2027 | ☐ |
| [22](#batch-22--music-genres-1) | Music genres 1 | 8 | 1 | 30 Apr 2027 | ☐ |
| [23](#batch-23--music-genres-2) | Music genres 2 | 7 | 2 | 15 May 2027 | ☐ |
| [24](#batch-24--heritage) | Heritage (Africa Day) | 11 | 2 | 20 May 2027 | ☐ |
| [25](#batch-25--restitution-tracker) | Restitution tracker | 1 | 4 | 15 Jun 2027 | ☐ |
| [26](#batch-26--musicians-1) | Musicians 1 | 10 | 3 | 30 Jun 2027 | ☐ |
| [27](#batch-27--musicians-2) | Musicians 2 | 9 | 2 | 15 Jul 2027 | ☐ |
| [28](#batch-28--egypt-and-nubia) | Egypt and Nubia | 8 | 3 | 31 Jul 2027 | ☐ |
| [29](#batch-29--remaining-profiles-and-home-markets) | Remaining profiles and home markets | 10 | 5 | 15 Aug 2027 | ☐ |
| [30](#batch-30--brazilian-portuguese-and-latin-american-spanish) | Brazilian Portuguese and Latin American Spanish | 0 | 20+ | 31 Aug 2027 | ☐ |
| [31](#batch-31--culture-and-meaning-through-art) | Culture and meaning through art | 5 | 2 | 15 Sep 2027 | ☐ |
| [32](#batch-32--country-art-overviews) | Country art overviews | 8 | 2 | 30 Sep 2027 | ☐ |
| [33](#batch-33--uk-october) | UK October | 2 | 5 | 15 Sep 2027 | ☐ |
| [34](#batch-34--yearly-review) | Yearly review | 0 | — | Oct 2027 | ☐ |
| [Backlog](#backlog) | Museums 3 and later ideas | — | — | — | ☐ |

About 155 new English pages in twelve months, plus their translations. Batches 15 and 33 are tied
to fixed dates, so they jump the queue if anything slips.

**Owner tasks before batch 11:** confirm Search Console is a Domain property; add Bing Webmaster
Tools. (The `www` → bare-domain redirect has been live in Vercel since 27 October 2026.)

---

## Batch 10 — Dak'Art 2026

**Target:** live by 12 November 2026, a week before the biennale opens on 19 November. Google
needs a few days to index a new page, and searches for the biennale peak around the opening.

### Pages

| Page | Primary keyword | Secondary keywords | Languages |
|---|---|---|---|
| `guides/dakar-biennale` — *Dak'Art: the Dakar Biennale, and the 2026 edition* | *dakar biennale* 170 | *dak'art* 90 · *dakar biennale 2026* · FR *biennale de dakar* 90 / 37 | EN FR |
| `guides/dakar-for-art-lovers` — *Dakar for Art Lovers: Museums, Galleries and Gorée* | *things to do in dakar* 1,600 / 20 | *goree island* 3,600 / 42 (its own page comes in batch 18) | EN FR |

**One evergreen URL, not `dakar-biennale-2026`.** Dak'Art comes back every two years. One page
for the event, with a section for the current edition, keeps every link and ranking it earns
for 2028 and beyond. After the closing on 19 December the 2026 section moves to the past tense.

Keyword figures are from 31 October; no new Semrush pull for this batch.

### Facts — status on 1 November 2026

| Fact | Status | Source to log |
|---|---|---|
| 16th edition, 19 November – 19 December 2026 | Confirmed by the organiser and the press | biennaledakar.org; allAfrica (6 October 2026) |
| Artistic director Morad Montazami | Confirmed (already on our Museum of Black Civilisations page) | Organiser; au-senegal.com |
| Theme *« (Anti)fragilité : Arts de la réparation et stratégies du contrecoup »*, the international exhibition organised in five "lines of flight" | Reported by several outlets; check the official English wording before writing it in English | Organiser's September statement |
| Venues: the old Palais de Justice at Cap Manuel, the Museum of Black Civilisations, the Galerie nationale d'art | Listed by the organiser | biennaledakar.org |
| Number of artists ("54" on the organiser's site) | **Unclear** — leave it out unless the official list confirms it | — |
| Opening hours, tickets, full programme | **Not published** as of early October — check on 10 November and again at the opening | biennaledakar.org |
| The OFF: independent shows across the city (registration closed 13 September) | Reported | Organiser |
| History: started 1990, visual art from 1992, contemporary African art only from 1996 | Already sourced in our fairs guide | Existing source log |
| 15th edition, 7 November – 7 December 2024, curator Salimata Diop, theme *The Wake / L'Éveil* | Reported — verify before using | Press |
| Ignore: listings giving May–June 2026 | Contradicts the organiser | — |

Rules: nothing goes into the page that is not confirmed; no admission prices or opening hours
until the organiser publishes them. "Check the official site" is an honest sentence.

### Outline — `guides/dakar-biennale`

1. **Summary (answer first):** what Dak'Art is, the 2026 dates, the venues, who curates it.
2. **Facts box:** edition · dates · artistic director · theme · venues (same number of facts in EN and FR).
3. **Dak'Art 2026:** the theme in plain words; the international exhibition; the national selection, if confirmed.
4. **Where it happens:** the three venues, each with a line; link to `museums/museum-of-black-civilisations`.
5. **The OFF:** what it is and how to find it (the official OFF list, galleries, artists' studios).
6. **Planning a visit:** plan two or three days; the opening week is the busiest; check hours on the official site; combine with the museums in the companion guide.
7. **A short history:** 1990, 1992, 1996; how it grew from Senghor's cultural policy (link `movements/ecole-de-dakar`); recent editions.
8. **Questions:** When is the Dakar Biennale 2026? How often does it take place? Where is it held? What is the OFF?
9. **Sources.**

### Outline — `guides/dakar-for-art-lovers`

Museum of Black Civilisations · Théodore Monod Museum (IFAN) · Gorée and the House of Slaves ·
Galerie nationale d'art · the Village des Arts · contemporary art spaces and galleries · Ousmane
Sow's legacy · the École de Dakar story. **Every venue is checked to be open and named
correctly before it goes in**; spaces that cannot be confirmed are left out. No opening hours or
prices. Moves into the `travel` collection in batch 19 (with a redirect).

### Code

- **Event structured data** (`Event` with name, dates, place, organiser's URL) on the biennale
  guide: a small addition to `src/lib/schema.ts`, driven by optional fields on the guide's
  catalog entry. Google can show it in event results.
- Catalog entries for both guides (related pages, release date).

### Links in (at least three English pages each)

- **Dakar Biennale guide:** `guides/african-art-fairs-and-biennales` (the Dak'Art row and section) ·
  `museums/museum-of-black-civilisations` (the Dak'Art section; the French edition's link moves
  from the fairs guide to this page) · `movements/ecole-de-dakar` · `artists/country/senegal` ·
  `guides/contemporary-african-art`.
- **Dakar guide:** `museums/theodore-monod-museum` · `museums/museum-of-black-civilisations` ·
  `artists/ousmane-sow` · `guides/where-to-see-african-art` · the biennale guide.

### Schedule

| Day | Work |
|---|---|
| 2–3 Nov | Research; source logs in `data/sources/guides/` |
| 4–5 Nov | English pages |
| 6–7 Nov | French pages |
| 8 Nov | Event structured data, catalog entries, inbound links |
| 9–10 Nov | Tests, build, crawl; check the official site again; release; request indexing |
| 19 Nov | Opening: add the confirmed programme, hours and artists |
| 20 Dec | After the closing: 2026 section into the past tense; *Updated* date |

**Done when:** ☑ facts confirmed and logged · ☑ EN (2 pages) · ☑ FR (2 pages) · ☑ Event data ·
☑ links in · ☑ tests, build, crawl · ☑ released (1 Nov 2026, de7b965) · ☑ photographs (2 each,
Commons, via `place-images.yml`) · ☐ indexing requested · ☐ hours and admission (check 10 Nov) ·
☐ opening update (19 Nov) · ☐ closing update (20 Dec)

---

## Batch 11 — Existing pages: depth, photographs, sharper snippets

**Target:** 21 November 2026. No new pages. Detailed plan written 1 November 2026 after reading
every page in the batch.

### What reading the pages changed

The first draft of this batch assumed retitles that the pages **already have**. Titles that
already contain the target words, so they stay as they are:

| Page | Title now | Keyword it already carries |
|---|---|---|
| Adinkra | Adinkra Symbols and Meanings: A Guide to Ghana's Visual Language | *adinkra symbols and meanings* |
| Masks | African Masks: Types, Meanings and the Peoples Who Make Them | *african masks* |
| Mud cloth | Mudcloth (Bogolanfini): How Mali's Mud-Painted Cloth Is Made | *mudcloth*, *bogolanfini* |
| Rock art, PT and ES | *Arte rupestre africana…* / *Arte rupestre africano…* | *arte rupestre* |
| Country lists | "South African Artists: Famous Painters, Sculptors and Photographers" (same for Nigeria, Egypt, Morocco) | *south african artists* |
| Cairo museum, Arabic | متحف الفن المصري الحديث… | the Arabic form people search |

So the work is **more useful text, photographs and better snippets** — not new titles. The
plain truth about the rankings: these pages sit at positions 40–90 because they are new, short
(450–880 words) and unlinked; a better title does not fix that. Depth, photographs and links do.

### 1. Photographs on art-form pages (the main change)

Google Images is a large source of visits for masks, kente, adinkra and mud cloth. Add the
batch-10 photo pipeline to these pages: extend `data/images/places-config.json` with

| Page | Wikipedia articles to draw candidates from (a missing title is skipped) | Photos |
|---|---|---|
| `art-forms/kente-cloth` | Kente cloth · fr:Kente | 3 |
| `art-forms/adinkra-symbols` | Adinkra symbols · fr:Adinkra | 3 |
| `art-forms/african-masks` | African masks · Dogon people · Gelede · fr:Masque africain | 4 |
| `art-forms/mudcloth` | Bògòlanfini · fr:Bogolan | 3 |
| `art-forms/african-pottery` | Ladi Kwali · Magdalene Odundo · African pottery | 3 |

Run `place-images.yml`, **look at every photograph**, exclude the weak ones, write English and
French captions (the same loop as batch 10). Credits appear on the page and in `/credits`.
Rule: a mask photo must say which people made it and where it is held, from the Commons
description; if it cannot, it is not used.

### 2. Content, page by page

Every new claim gets a source in `data/sources/art-forms/<slug>.md` (new folder). Facts to
verify are listed; anything unverified stays out.

| Page | Add | Keywords served | To verify first |
|---|---|---|---|
| **Kente** | An answer-first opening "What is kente cloth?"; "Kente meaning" with the named patterns already on the page, each with its source; a short "kente stoles and graduation" pointer (the full guide is batch 14); silk kente only if sourced | *kente cloth* 12,100 · *what is kente cloth* 590 · *kente cloth meaning* 720 · *kente cloth patterns* 1,300 · *silk kente cloth* 880 · UK 2,900 | Pattern names and meanings; silk and rayon use; who may wear which cloth; the 2024 UNESCO entry already on the page |
| **Adinkra** | "Adinkra cloth and fabric" (how to tell real stamped cloth from print); a short "adinkra jewellery and tattoos: a note on meaning"; "Akan adinkra" wording (adinkra belong to the Akan; the page says Ghana) | *akan adinkra* 1,900 · *adinkra cloth* 1,300 · *adinkra fabric* 880 · *adinkra meaning* 880 · *adinkra symbols meaning* 720 | The Akan/Asante/Gyaman origin account; Adanse and the Gyaman legend; stamp-making from calabash and *badie* dye |
| **Masks** | A "Questions" section: what are African masks used for · why were they made · are they evil or dangerous (misconception) · why "tribal" is a word we explain and avoid; *Mask of Africa* wording in the lead | *african mask* 6,600 · *mask of africa* 5,400 · *tribal masks africa* 3,600 · *african tribal masks* 1,600 | Each answer sourced to museum or scholarly pages; no claims about sacred meaning that we cannot source |
| **Mud cloth** | Answer-first "What is mud cloth?"; "Mud cloth fabric you can buy: handmade vs printed" (already half there); spelling note (*mudcloth*, *mud cloth*, *bogolan*, *bogolanfini*) | *mud cloth* 1,300 · *mudcloth* 720 · *mud cloth fabric* 480 · *african mud cloth* 390 · FR *bogolan* 1,000 | The dyeing sequence; Mali's Dogon, Bamana attributions; the 1970s revival (Chris Seydou, Groupe Bogolan Kasobané) |
| **Pottery** | Photographs; a "Ladi Kwali" and "Magdalene Odundo" image caption each; a "Where to see African pottery" line linking museums | *african pottery* 590 · *pottery of africa* 320 | Museum holdings named (British Museum, V&A) |
| **Kevin Carter** | A fuller, sourced "The photograph" section (date, place, the food camp at Ayod, the Pulitzer in 1994); a "What happened to the child" paragraph **only if reliably sourced**; "Kevin Carter photo" wording | *kevin carter* 5,400 · *kevin carter photo* 390 · *kevin carter journalist* 5,400 | The most careful page in the batch: dates, names and the later reporting about the child need two sources each, and the tone stays factual |
| **Cairo museum** | English title and heading "Egyptian Museum of Modern Art, Cairo" (*egyptian museum of modern art* 110 vs *museum of modern egyptian art* 50); extend the 347-word page to about 500 words from existing sourced material (collection, the Opera House grounds, the Mokhtar Museum link) | *egyptian museum of modern art* 110 · AR 590 | Collection count, reopening in 2020 (already in the source log) |
| **Rock art, PT/ES** | Check summaries and descriptions say *arte rupestre*; the Brazilian-Portuguese spelling (*Saara*, not *Sara*) is handled in batch 30 | BR 22,200 · MX 5,400 · ES 1,900 | Nothing new; note only |

### 3. Snippets that win the click

Titles and descriptions only; **no body change**. These four pages already ranked 5–10 but earned
no clicks in the first week (11–23 impressions each, so the sample is tiny — cheap to try, not proof).

| Page | Now | New title (≤70) | New description (≤160) |
|---|---|---|---|
| `ar/art-forms/african-masks` | الأقنعة الأفريقية: أنواعها ومعانيها والشعوب التي تصنعها | Add the common phrase *الأقنعة الإفريقية التراثية* (Searched at position 11) | Lead with what masks are for and the peoples named |
| `movements/congolese-popular-painting` | Congolese Popular Painting: Kinshasa's Street-Wise Art | Name the artists in the title: *Chéri Samba, Moké and Kinshasa's billboard painters* | Keep; add the decade |
| `es/music/highlife` | Highlife: la primera gran música pop de Ghana y Nigeria | Keep; add *ritmo* and E.T. Mensah | Lead with the question people ask |
| `guides/where-to-see-african-art` | Where to See African Art: Museums in Africa and Beyond | Keep | Name the city list; "Dakar, Cape Town, Cairo, Marrakech, Paris" |

Final wording is written with the page and checked against the length tests.

### 4. Not in this batch

- **Country-list titles and the women-artists guide.** Titles already say "painters, sculptors and
  photographers"; the ranked-list rewrite of the women guide belongs with batch 15.
- **The full adinkra dictionary** with our own drawings and the printable chart: batch 13.
- **New keyword pulls:** none; the Semrush figures of 31 October stand.

### Links and dates

- No new inbound links needed (all nine pages are linked already). Each page links to the new
  guides where it helps: kente → `guides/kente-stoles` (batch 14, add then); masks →
  `guides/contemporary-african-art`; pottery → `guides/where-to-see-african-art`.
- `catalog.ts`: a `BATCH11_RELEASE` date and a list of revised pages, so *Updated* is honest.

### Translations

Only text we change is translated. FR, ES, PT and AR editions get the same sections; the
English page's length governs the ratio test (translations must stay ≥ 0.85, Arabic ≥ 0.7 of
the English). Estimated: 9 pages × 5 editions, about 40 files, plus captions in en and fr.

### Schedule

| Day | Work |
|---|---|
| 2–3 Nov | Run the photo workflow for the five art-form pages; choose photographs; research and source logs for kente, adinkra, mud cloth |
| 4–6 Nov | Research and write masks, pottery, Kevin Carter, Cairo (English) |
| 7–10 Nov | Snippet rewrites (EN, AR, ES); first release (photographs + snippets), request indexing |
| 11–17 Nov | Translations of the added sections (FR, ES, PT, AR) |
| 18–20 Nov | Tests, build, crawl; second release; update the plan |
| 21 Nov | Done. Note positions in Search Console |
| 19 Dec | Four-week check: impressions, clicks and positions for the nine pages versus the first week |

**Success measure:** not a promise of rankings. Look at four weeks of Search Console for these
nine pages: impressions up, average position improving, first clicks on the art-form pages.

**Status 1 November 2026 (shipped in one pass, ahead of the schedule above):**
☑ photographs chosen and captioned (kente 1, adinkra 2, masks 1, mud cloth 3, pottery 2; weak
candidates excluded after looking at each) · ☑ source notes (`data/sources/art-forms/batch-11.md`) ·
☑ kente · ☑ adinkra · ☑ masks · ☑ mud cloth (answer-first and question sections, five editions) ·
☑ pottery (photographs) · ☑ Cairo (description only) · ☑ four snippets · ☑ tests, build ·
**Not changed, on purpose:** Kevin Carter (the page already has the sourced 1993 photograph, the
Times note, the Pulitzer and the debate) and the rock-art PT/ES pages (titles already say
*arte rupestre*). ☐ four-week check in Search Console (19 Dec 2026) · ☑ captions for all nine photographs in
five languages (Spanish, Portuguese and Arabic added 1 November).

---

## Batch 12 — Instruments 1

**Target:** 30 November 2026 — the kalimba page first, ahead of its December peak (about 2×, gifts).
**Code:** new `instruments` collection, with routes, nav, index page, schema, search index,
`llms.txt` and tests (same pattern as `museums`).

| Page | Primary keyword | Secondary keywords | Other markets | Languages |
|---|---|---|---|---|
| `/instruments` (hub) — African musical instruments | *african musical instruments* 2,400 / 28 · *african instruments* 2,400 / 28 | *african music instruments* 1,300 / 16 · *instruments from africa* 880 / 32 · *african traditional instruments* 480 / 15 · *african percussion instruments* 390 / 10 · *west african instruments* 390 / 22 · *african sanza instrument* 480 / 23 | BR *instrumentos musicais africanos* 4,400 / 33 · FR *instruments africains* 1,000 / 19, *instrument de musique africain* 720 / 19 · UK 720 / 16 | EN FR ES PT AR |
| `instruments/kalimba` | *kalimba* 33,100 / 23 | *kalimba instrument* 4,400 / 22 · *kalimba thumb piano* 3,600 / 30 · *karimba kalimba* 3,600 / 8 · *kalimba for beginners* 1,300 / 26 · *instruments kalimba* 1,300 / 24 · *kalimba finger piano* 1,000 / 26 | MX 33,100 / 49 · BR 12,100 / 43 · UK 5,400 / 17 · ES 3,600 / 45 · PT 1,000 / 22 | EN ES PT FR |
| `instruments/djembe` | *djembe* 14,800 / 18 | *djembe drum* 8,100 / 35 · *instruments djembe* 18,100 / 26 · *drumming djembe* 3,600 / 24 · *percussion djembe* 1,600 / 25 · *djembe drums* 1,000 / 27 · *definition of djembe* 720 / 30 · *how to play djembe* 260 / 18 | FR *djembé* 6,600 / 25 · UK 4,400 / 30 · ES 1,600 / 17 · MX 1,300 / 16 · BR *djembê* 880 / 33 | EN FR ES PT |
| `instruments/mbira` | *mbira* 4,400 / 47 | *mbira instrument* 1,000 / 32 · *african mbira* 590 / 38 · *kalimba mbira* 590 / 26 · *mbira thumb piano* 480 / 37 · *african thumb piano mbira* 480 / 38 · *mbira instrument of africa* 480 / 31 | BR 590 / 37 | EN FR PT |
| `instruments/kora` | *kora instrument* 3,600 / 30 | *kora musical instrument* 2,400 / 28 · *instruments kora* 320 / 17 | FR *kora* 22,200 / 52 (several meanings) | EN FR |
| `instruments/balafon` | *balafon* 2,400 / 25 | *balafon instrument* 1,900 / 34 · *african xylophone* 1,000 / 16 · *balafon meaning* 110 / 23 | FR 4,400 / 23 | EN FR |
| `instruments/talking-drum` | *talking drum* 2,400 / 28 | *talking drums* 880 / 23 · *african talking drum* 260 / 23 · *nigerian talking drum* 210 / 31 · *talking drum instrument* 110 / 15 | — | EN FR |

**Kept for batch 21 (buying guides):** *djembe drum for sale* 2,900 / 30 · *djembe for sale* 1,300 / 28
· *djembe drums for sale* 880 / 18 · *balafon for sale* 590 / 23 · *kora instrument for sale* 480 / 4 ·
*mbira for sale* 320 / 8 · *talking drum for sale* 90 / 6. *Kalimba songs* 2,900 / 24 and *kalimba tabs*
2,400 / 11 are a possible later page.
**Links in:** `music` index and genre pages (highlife, afrobeat, Congolese rumba), regions (West,
Southern Africa), country lists (Mali, Guinea, Senegal, Zimbabwe, Nigeria, Ghana).
**Done when:** ☑ collection code and tests · ☑ 7 EN pages · ☑ translations · ☑ links in · ☑ nav ·
☑ released

**Status 1 November 2026 (shipped four weeks ahead of the target):**
☑ `instruments` collection (catalog, routes, nav, search index, `llms.txt`, i18n, tests) ·
☑ hub (five languages) · ☑ kalimba (EN FR ES PT) · ☑ djembe (EN FR ES PT) · ☑ mbira (EN FR PT) ·
☑ kora, balafon, talking drum (EN FR) · ☑ source notes (`data/sources/instruments/batch-12.md`) ·
☑ links in from mbalax, West Africa, Southern Africa, Shona sculpture and the music index ·
☑ tests (65), build, crawl (971 pages, no broken links, no orphans).
**Differences from the plan:** four existing pages were revised, not six (no honest link existed
for highlife, afrobeat or Congolese rumba). The Arabic edition has the hub only, as planned, so
its index shows the introduction without cards, and `/ar/instruments/<slug>` answers 404.
Next.js 16 drops a whole route if `generateStaticParams` returns an empty list for any
language, so the article route now falls back to all slugs for a language with none.
**Left out on purpose:** claims the searches could not confirm (see the source notes): Thomas
Mapfumo and the mbira, Fela Kuti and the talking drum, the "lunsi" spelling.
☐ photographs for the six instruments (same loop as batches 10 and 11) · ☐ request indexing for
`/instruments` and the kalimba page · ☐ Search Console check four and eight weeks on.

---

## Batch 13 — Symbols 1

**Target:** 15 December 2026.
**Code:** new `symbols` collection; a printable adinkra chart (PDF), offered as the newsletter's
welcome gift once the newsletter exists.

| Page | Primary keyword | Secondary keywords | Other markets | Languages |
|---|---|---|---|---|
| `/symbols` (hub) — African symbols and their meanings | *african symbols* 1,900 / 28 | *african symbols meaning* 590 / 22 · *africa symbol* 590 / 28 · *african symbols and meanings* 480 / 22 · *meaning of african symbols* 480 / 35 · *symbol of africa* 480 / 21 · *akan symbols* 320 / 25 | — | EN FR ES PT AR |
| `art-forms/adinkra-symbols` — **upgrade** to a full dictionary (each symbol drawn as our own SVG, with its name, meaning and proverb), plus the printable chart | *adinkra symbols* 9,900 / 31 | as batch 11, plus *adinkra symbol* 720 / 37 · *adinkra jewelry* 1,000 / 7 (a buying box) | BR *adinkra* 6,600 / 34, *símbolos adinkra* 2,900 / 23 · UK 2,400 / 32 · FR 480 / 35 | all 5 |
| `symbols/sankofa` | *sankofa meaning* 3,600 / 28 | *sankofa symbol* 1,300 / 21 · *sankofa* 12,100 / 47 (shared with a person's name) | BR *sankofa* 12,100 / 29 · UK 1,600 / 40 · MX 1,000 / 38 · FR 590 / 26 | EN PT ES FR |
| `symbols/gye-nyame` | *gye nyame* 2,400 / 19 | *gye nyame symbol* 880 / 25 · *gye nyame meaning* 320 / 14 · *meaning of gye nyame* 260 / 12 · *adinkra gye nyame* 210 / 26 · *gye nyame tattoo* 210 / 19 | — | EN PT |
| `symbols/ankh` | *ankh meaning* 18,100 / 39 · *ankh* 49,500 / 31 | *ankh symbol* 9,900 / 27 · *symbol for ankh* 12,100 / 57 · *ankh cross* 4,400 / 37 · buying box: *ankh necklace* 4,400 / 29, *ankh jewelry* 3,600 / 14 | UK 8,100 / 50 · BR 6,600 / 34 · EG *مفتاح الحياة* 6,600 / 33 · FR 4,400 / 26 · MX 2,900 / 44 · ES 2,400 / 33 | all 5 |
| `symbols/eye-of-horus` | *eye of horus* 40,500 / 50 · *eye of horus meaning* 5,400 / 40 | *eye of horus eye of ra* 6,600 / 42 · *eye of horus vs eye of ra* 3,600 / 50 · *eye of horus amulet* 2,400 / 16 · *eye of horus tattoo* 4,400 / 31 | MX *ojo de horus* 18,100 / 33 · BR *olho de horus* 14,800 / 34 · ES 6,600 / 33 · EG *عين حورس* 6,600 / 34 · PT 1,300 / 25 | ES PT AR EN FR |
| `symbols/nsibidi` | *nsibidi* 1,000 / 36 | — | — | EN |

**Links in:** `art-forms/kente-cloth`, `art-forms/adinkra-symbols`, `art-forms/mudcloth`, Ghana and
Egypt country lists, `regions/west-africa`, `regions/north-africa`, Kwame Akoto-Bamfo and other
artists who use adinkra.
**Done when:** ☐ collection code · ☐ SVG drawings · ☐ printable PDF · ☐ 6 EN pages ·
☐ translations · ☐ released

---

## Batch 14 — Patterns and dress 1

**Target:** 31 December 2026. Dress pages live in `art-forms`, grouped on its index under
"Textiles and dress". The kente stoles guide goes live here, well ahead of its April–May peak.

| Page | Primary keyword | Secondary keywords | Other markets | Languages |
|---|---|---|---|---|
| `art-forms/african-patterns` (hub) | *african patterns* 2,400 / 26 | *patterns in africa* 1,600 / 16 · *african pattern* 590 / 32 · *african tribal patterns* 390 / 24 · *patterns of africa* 390 / 12 · *african geometric patterns meaning* 320 / 17 · *african textile patterns* 320 / 18 | UK 1,900 / 25 · BR *estampa africana* 1,900 / 29 · FR *motif africain* 720 / 21 | EN FR PT |
| `art-forms/traditional-african-clothing` (hub) | *traditional african clothing* 1,600 / 28 | *traditional african clothing styles* 1,300 / 33 · *african wedding attire* 1,900 / 33 · *ghana african traditional clothing* 480 / 28 · *traditional african men's clothing* 320 / 15 · *zulu traditional attire* 390 / 13 · *nigerian traditional attire* 390 / 28 · *ghanaian traditional clothing* 390 / 25 · *south african traditional clothing* 210 / 26 | BR *roupas africanas* 4,400 / 34 · UK 320 / 23 | EN PT FR |
| `art-forms/dashiki` | *dashiki* 22,200 / 15 | *dashiki shirt* 2,900 / 26 · *dashikis* 1,900 / 24 · *dashiki for men* 1,900 / 15 · *dashiki dress* 1,600 / 37 · *dashiki clothing* 1,300 / 20 · *african dashiki* 1,000 / 24 | UK 2,400 / 28 | EN FR |
| `art-forms/boubou` | *boubou* 2,400 / 27 | *boubou dress* 880 / 30 · *le boubou* 880 / 26 · *boubou clothing* 720 / 33 | **FR 9,900 / 23** | FR EN |
| `art-forms/wax-print` — wax print and ankara fabric (with the Vlisco story) | *ankara fabric* 2,900 / 47 | *african print* 1,600 / 15 · *african fabric* 1,900 / 31 · *vlisco* 1,900 / 38 · *african print fabric* 1,000 / 30 · *african wax print fabric* 1,000 / 18 · *african prints* 880 / 10 · *african print material* 590 / 13 | FR *tissu wax* 2,400 / 31, *pagne africain* 1,900 / 19, *tissu africain* 1,900 / 26 · BR *tecido africano* 2,400 / 10 | EN FR PT |
| `art-forms/kuba-cloth` | *kuba cloth* 880 / 33 | *where is kuba* 3,600 / 27 | — | EN FR |
| `guides/kente-stoles` — meaning, and how to buy an authentic one | *kente stole* 1,900 / 5 | *kente cloth stole* 1,600 / 18 · *kente graduation stole* 720 / 13 · *kente stoles* 480 / 1 · *kente stole meaning* 260 / 12 · *kente cloth graduation stole* 210 / 7 · *what is a kente stole* 140 / 11 | — | EN |

**Links in:** `art-forms/african-textiles`, `art-forms/kente-cloth`, `art-forms/mudcloth`,
`art-forms/adinkra-symbols`, Yinka Shonibare (wax print), country lists (Ghana, Senegal, Mali, DR Congo).
**Earns:** clothing and fabric affiliate boxes once batch 21's component exists.
**Done when:** ☐ 7 EN pages · ☐ translations · ☐ links in · ☐ "Textiles and dress" group on the
index · ☐ released

---

## Batch 15 — Black History Month

**Target:** live by 10 January 2027; searches peak in February (*famous black artists* about 5×,
*african american artists* about 7×, *african printmaking* about 4×).
**Needs the owner's decision on diaspora scope** (see growth plan, section 13).

| Page | Primary keyword | Secondary keywords | Languages |
|---|---|---|---|
| `guides/famous-black-artists` — from Africa and its diaspora | *famous black artists* 2,900 / 36 | *art by black artists* 2,400 / 32 · *black artist paintings* 1,600 / 37 · *black female artists* 1,600 / 33 · *african american artists* 1,900 / 36 | EN |
| `guides/teaching-african-art` — a Black History Month teaching pack (printables: adinkra chart, mask lesson, kente colouring page) | *black history month art* 880 / 14 | *black history month art projects* 390 / 14 · UK *black history month art* 210 / 21 (October) | EN |
| `art-forms/african-printmaking` | *african printmaking* 1,000 / 16 (MoMAA #1) | — | EN FR |

**Updated:** `art-forms/african-masks` and `art-forms/kente-cloth` (February peaks; check what
batch 11 did); `guides/african-women-artists` as a ranked list.
**Links in:** `guides/contemporary-african-art`, `guides/african-art-history`, the artists index,
the printmaking hubs.
**Done when:** ☐ scope decided · ☐ 3 EN pages · ☐ printables · ☐ released · ☐ outreach to teachers
and librarians (growth plan, section 8)

---

## Batch 16 — Artists of the diaspora and today

**Target:** 31 January 2027 (they feed batch 15's list). Five languages, as for earlier profiles.
Secondary keywords: not checked — pull "<name> art", "<name> paintings" and "<name> exhibition"
before writing.

| Profile (`artists/…`) | Primary keyword | Link to Africa | Other markets |
|---|---|---|---|
| `julie-mehretu` | *julie mehretu* 8,100 / 49 | Born in Addis Ababa | — |
| `toyin-ojih-odutola` | 1,900 / 43 | Born in Ife, Nigeria | — |
| `chris-ofili` | 1,600 / 28 | British, Nigerian parents | **UK 2,900 / 28** |
| `lynette-yiadom-boakye` | 1,600 / 36 | British, Ghanaian parents | UK 1,600 / 40 |
| `michael-armitage` | 720 / 39 | Born in Nairobi | — |
| `rotimi-fani-kayode` | 590 / 28 | Born in Lagos | — |
| `lalla-essaydi` | 480 / 30 | Moroccan | — |
| `pieter-hugo` | 480 / 38 | South African photographer | — |
| `kader-attia` | 390 / 28 | French-Algerian | — |
| `kehinde-wiley` *(if approved)* | 22,200 / 53 | American, Nigerian father; founded Black Rock Senegal in Dakar | — |

**Updated:** country lists (Ethiopia, Nigeria, Ghana, Kenya, Morocco, South Africa, Algeria),
`guides/contemporary-african-art`.
**Done when:** ☐ sources · ☐ EN · ☐ FR ES PT AR · ☐ links in · ☐ released

---

## Batch 17 — Instruments 2

**Target:** 10 February 2027.

| Page | Primary keyword | Secondary keywords | Other markets | Languages |
|---|---|---|---|---|
| `instruments/shekere` | *shekere* 1,900 / 18 | *shekere instrument* 1,000 / 27 · *shekeres* 590 / 25 · *shekere musical instrument* 260 / 14 | — | EN FR |
| `instruments/ngoni` | *ngoni* 1,300 / 45 | not checked | — | EN FR |
| `instruments/marimba` — the marimba's African roots (Chopi timbila, Zimbabwean marimba bands) | *marimba* 40,500 / 32 | not checked | MX 18,100 / 40 · BR 8,100 / 23 · ES 5,400 / 48 | EN ES PT |
| `instruments/udu` | *udu drum* 590 / 9 | — | — | EN |
| `instruments/krar` — with the masenqo | *krar* 480 / 30 | — | — | EN |
| `instruments/african-drums` — types and names | *african drums* 2,400 / 41 | *types of african drums* 210 / 12 | BR *tambor africano* 1,300 / 31 · FR *tambour africain* 720 / 17 | EN FR PT |

**Done when:** ☐ 6 EN pages · ☐ translations · ☐ hub updated · ☐ released

---

## Batch 18 — Museums 2

**Target:** 28 February 2027.
**Decision first:** the collection is headed "Museums in Africa". The Smithsonian is in
Washington; rename the heading "African art museums" (index page, `llms.txt`) or put that page
in `guides/where-to-see-african-art`. Recommended: rename.

| Page (`museums/…`) | Primary keyword | Secondary keywords | Other markets | Languages |
|---|---|---|---|---|
| `national-museum-of-african-art` (Smithsonian) | *national museum of african art* 3,600 / 33 | *african art museum dc* 1,000 / 48 · *african art museum washington* 1,000 / 58 · *smithsonian african art* 880 / 49 · *smithsonian museum of african art* 880 / 53 · *museum of african art* 880 / 57 · *african art museum* 880 / 47 | — | EN |
| `goree-island` — Gorée and the House of Slaves | *goree island* 3,600 / 42 | *goree island senegal* 1,600 / 39 · *island of goree* 1,300 / 31 · *house of slaves* 1,300 / 44 · *island of goree house of slaves* 720 / 42 · *goree island door of no return* 390 / 39 | FR *gorée* 1,600 / 39 · *maison des esclaves* 390 / 38 | EN FR |
| `nike-art-gallery` (a gallery, but visited like a museum) | NG *nike art gallery* 14,800 / 55 | US 720 / 48 | — | EN |
| `nairobi-national-museum` | *nairobi national museum* 390 / 49 | *national museum of kenya* 320 / 57 | — | EN |
| `luxor-museum` | *luxor museum* 390 / 34 | — | EG *متحف الأقصر* 720 / 30 | EN AR |
| `mowaa` — Museum of West African Art, Benin City | *mowaa* 140 / 47 | *museum of west african art* 110 / 35 | — | EN FR |
| `johannesburg-art-gallery` | 140 / 48 | — | — | EN |
| `norval-foundation` | ZA 2,400 / 47 | US 110 / 44 | — | EN |
| `yves-saint-laurent-museum-marrakech` | *ysl museum marrakech* 590 / 43 | *yves saint laurent museum marrakech* 390 / 48 | FR *musée yves saint laurent marrakech* 2,400 / 41 | FR EN |
| `macaal` | *macaal* 110 / 31 | — | — | EN FR |

**Updated:** `guides/where-to-see-african-art`, `museums/benin-city-national-museum`,
`art-forms/benin-bronzes`, `museums/zeitz-mocaa` (ZA *zeitz mocaa* 8,100 / 51).
**Done when:** ☐ heading decision · ☐ 10 EN pages · ☐ translations · ☐ links in · ☐ released

---

## Batch 19 — Art travel

**Target:** 15 March 2027.
**Code:** new `travel` collection; later, a GetYourGuide or Viator box (batch 21's component).

| Page (`travel/…`) | Primary keyword | Secondary keywords | Other markets | Languages |
|---|---|---|---|---|
| `marrakech` — Majorelle, the YSL Museum, MACAAL | *jardin majorelle* 4,400 / 49 | *majorelle jardin* 3,600 / 51 · *jardin majorelle marrakech* 720 / 50 · *jardin majorelle tickets* 390 / 46 | **FR *jardin majorelle* 22,200 / 51** | FR EN AR |
| `lagos` | *things to do in lagos* 390 / 18 | not checked | NG: link the Nike Art Gallery (14,800) | EN |
| `cape-town` | not checked | Zeitz MOCAA, Norval Foundation | ZA | EN |
| `cairo` | not checked | Grand Egyptian Museum (EG 135,000 / 69) | EG | EN AR |
| `accra` | not checked | — | — | EN |
| `addis-ababa` | not checked | National Museum of Ethiopia (480 + 390) | — | EN |
| `nairobi` | not checked | Nairobi National Museum | — | EN |

Move `guides/dakar-for-art-lovers` (batch 10) into this collection, with a redirect.
**Done when:** ☐ keywords pulled for the "not checked" cities · ☐ collection code · ☐ 7 EN pages ·
☐ translations · ☐ released

---

## Batch 20 — Dress 2

**Target:** 31 March 2027. Nigeria searches most of these far more than the US does.

| Page (`art-forms/…`) | Primary keyword | Secondary keywords | Other markets | Languages |
|---|---|---|---|---|
| `agbada` | *agbada* 2,900 / 32 | *agbada for men* 1,000 / 18 · *agbada clothing* 590 / 26 · *agbada styles for men* 320 / 24 · *nigerian agbada* 140 / 28 | NG 2,900 / 28 | EN |
| `gele` — gele and head wraps | *gele* 2,900 / 38 | *african head wrap* 590 / 36 | NG 2,400 / 33 · BR *turbante africano* 2,400 / 30 | EN PT |
| `aso-oke` | *aso oke* 1,000 / 27 | — | **NG 3,600 / 33** | EN |
| `adire` | *adire* 1,000 / 36 | — | **NG 3,600 / 34** | EN |
| `aso-ebi` | NG *aso ebi* 2,400 / 29 | — | — | EN |
| `kanga-and-kitenge` (with the kikoi) | *kanga* 12,100 / 49 (several meanings) | *kitenge* 720 / 41 · *kikoi* 320 / 5 | — | EN |
| `shweshwe` | *shweshwe* 260 / 23 | — | **ZA 2,900 / 24** | EN |
| `barkcloth` | *barkcloth* 1,300 / 18 | — | — | EN FR |
| `capulana` | BR *capulana* 2,400 / 34 | — | PT 1,300 / 27 | PT EN |

**Updated:** `art-forms/african-beadwork` as "African beads and jewellery": *african jewelry*
2,400 / 27 · *african beads* 1,300 / 21 · *men's african jewelry* 590 / 9 · *african gold jewelry*
320 / 12 · *maasai jewelry* 260 / 2 · *zulu beadwork* 210 / 6 (ZA 260 / 11).
**Done when:** ☐ 9 EN pages · ☐ translations · ☐ beadwork update · ☐ released

---

## Batch 21 — Buying guides

**Target:** 15 April 2027.
**Code:** a "Where to buy" component (disclosure line, `rel="sponsored"`, only on these pages);
an editorial and monetisation policy page linked from the footer.

| Page (`guides/…`) | Primary keyword | Secondary keywords | Other markets | Languages |
|---|---|---|---|---|
| `how-to-choose-a-djembe` | *djembe drum for sale* 2,900 / 30 | *djembe for sale* 1,300 / 28 · *djembe drums for sale* 880 / 18 | — | EN FR |
| `kalimba-buying-guide` | *kalimba for beginners* 1,300 / 26 | *kalimba instrument* 4,400 / 22 · *mbira for sale* 320 / 8 | — | EN ES PT |
| `berber-rugs` — Amazigh rugs: how to tell real from fake | *berber rug* 1,600 / 13 · *moroccan rugs* 4,400 / 45 | *berber rugs* 1,600 / 17 · *beni ourain rug* 1,300 / 37 · *wool berber rugs* 480 / 17 · *moroccan berber rug* 390 / 13 · *what is a berber rug* 390 / 5 | UK *berber rug* 2,400 / 13 · FR *tapis berbère* 2,900 / 28, *tapis beni ouarain* 590 / 7 | EN FR |
| `buying-african-baskets` — Bolga and Zulu baskets: how to buy | *bolga basket* 880 / 10 | *african baskets* 1,000 / 25 (the explainer below ranks for it) | — | EN |
| `art-forms/african-baskets` — **explainer**: history, techniques, Bolga, Zulu and other traditions, makers. Wikipedia (five languages) and My Modern Met link to the competitor's page on this | *african baskets* 1,000 / 25 | — | — | EN FR |
| `buying-african-masks` — responsibly: provenance, fakes, no antiquities | *buy african masks* 880 / 14 | *african tribal masks for sale* 720 / 12 · *african masks for sale* 590 / 19 | — | EN FR |
| `african-wall-art-and-decor` | *african wall art* 880 / 16 | *african decor* 720 / 7 · *african home decor* 590 / 13 · *african art prints* 210 / 13 | UK *african wall art* 320 / 9 | EN |

**Updated:** `guides/how-to-buy-african-art` becomes the hub of the buying guides
(*african art for sale* 320 / 33 · *african art gallery* 210 / 35).
**Done when:** ☐ affiliate accounts open (owner) · ☐ component · ☐ policy page · ☐ 6 pages ·
☐ released

---

## Batch 22 — Music genres 1

**Target:** 30 April 2027. Pages in the existing `music` collection.

| Page (`music/…`) | Primary keyword | Secondary keywords | Other markets | Languages |
|---|---|---|---|---|
| `kizomba` | *kizomba* 3,600 / 9 | *kizomba dance* 2,400 / 28 · *kizomba dancing* 720 / 26 · *kizomba music* 320 / 30 | PT 3,600 / 34 · BR 2,400 / 35 | EN PT FR |
| `kuduro` | *kuduro* 720 / 28 | — | BR 2,900 / 41 | EN PT |
| `gqom` | *gqom* 880 / 37 | — | — | EN |
| `soukous` | *soukous* 480 / 31 | — | — | EN FR |
| `ethio-jazz` | *ethio jazz* 480 / 35 | — | — | EN |
| `makossa` | *makossa* 390 / 40 | — | — | EN FR |
| `desert-blues` | *desert blues* 390 / 30 | — | — | EN FR |
| `kwaito` | *kwaito* 320 / 40 | — | **ZA 1,900 / 41** | EN |

**Updated:** the `music` index as the African music hub: *african music* 3,600 / 44 · *african
music from kenya* 2,400 / 41 · *african music from nigeria* 1,300 / 43 (FR *musique africaine*
1,600 / 30 · BR *música africana* 1,600 / 36).
**Done when:** ☐ 8 EN pages · ☐ translations · ☐ hub update · ☐ released

---

## Batch 23 — Music genres 2

**Target:** 15 May 2027.

| Page (`music/…`) | Primary keyword | Languages |
|---|---|---|
| `juju` | *juju music* 260 / 35 | EN |
| `fuji` | *fuji music* 210 / 28 | EN |
| `mbaqanga` | *mbaqanga* 210 / 40 | EN |
| `coupe-decale` | *coupe decale* 170 / 37 | EN FR |
| `bongo-flava` | *bongo flava* 170 / 36 | EN |
| `taarab` | *taarab* 140 / 20 | EN AR |
| `benga` | *benga music* 110 / 26 | EN |

**Updated:** `music/mbalax` (FR *mbalax* 320 / 36) and `music/semba` (BR *semba* 880 / 26, PT
480 / 33), linked from the new pages.
**Done when:** ☐ 7 EN pages · ☐ translations · ☐ released

---

## Batch 24 — Heritage

**Target:** 20 May 2027, before Africa Day (25 May; *africa day* about 10× that month).
**Code:** new `heritage` collection (`TouristAttraction` schema where it fits).

| Page | Primary keyword | Secondary keywords | Languages |
|---|---|---|---|
| `guides/africa-day` | *africa day* 720 / 31 | — | EN FR |
| `heritage/great-zimbabwe` | *great zimbabwe* 9,900 / 61 | *great zimbabwe map* 1,900 / 28 · *map great zimbabwe* 1,600 / 19 · *great zimbabwe ruins* 1,300 / 65 · *great zimbabwe empire* 1,000 / 28 · *great zimbabwe location* 1,000 / 50 | EN PT |
| `heritage/lalibela` | *lalibela* 8,100 / 61 | not checked | EN FR |
| `heritage/great-mosque-of-djenne` | *great mosque of djenne* 3,600 / 40 | — | EN FR |
| `heritage/nok-culture` | *nok culture* 1,900 / 36 | *nok terracotta* 210 / 31 | EN FR |
| `heritage/ait-benhaddou` | *ait benhaddou* 880 / 36 | — | EN FR AR |
| `heritage/ndebele-house-painting` | *ndebele* 1,300 / 34 | *ndebele house painting* 260 / 23 · *ndebele art* 210 / 11 (ZA 720 / 21) | EN |
| `heritage/golden-stool` | *golden stool* 1,000 / 31 | *asante stool* 590 / 28 | EN |
| `heritage/ife-heads` | *ife head* 390 / 40 | *ife bronze head* 210 / 22 | EN FR |
| `heritage/igbo-ukwu` | *igbo ukwu* 210 / 40 | — | EN |
| `heritage/timbuktu-manuscripts` | *timbuktu manuscripts* 480 / 46 | — | EN FR AR |

**Updated:** region pages and `guides/african-art-history`.
**Done when:** ☐ collection code · ☐ 11 EN pages · ☐ translations · ☐ released

---

## Batch 25 — Restitution tracker

**Target:** 15 June 2027. One sourced page and a data file: every return of looted African objects
since 2017. Built to earn links from journalists rather than to rank for a search.
**Keywords around it:** *benin bronzes* 4,400 / 55 (UK 3,600 / 57, NG 720 / 50).
**Updated:** `art-forms/benin-bronzes`, `museums/museum-of-black-civilisations`,
`museums/benin-city-national-museum`, `museums/mowaa`.
**Done when:** ☐ data · ☐ page · ☐ released · ☐ outreach

---

## Batch 26 — Musicians 1

**Target:** 30 June 2027.
**Code:** new `musicians` collection; header navigation groups (growth plan, section 7).
Difficulty is high (33–72): these pages win on depth and links, not quickly.

| Profile (`musicians/…`) | Primary keyword | Other markets |
|---|---|---|
| `fela-kuti` | 18,100 / 72 | NG 14,800 / 67 |
| `miriam-makeba` | 6,600 / 60 | — |
| `hugh-masekela` | 3,600 / 62 | — |
| `cesaria-evora` | 2,900 / 67 | — |
| `mulatu-astatke` | 2,900 / 60 | — |
| `salif-keita` | 1,900 / 43 | — |
| `ali-farka-toure` | 1,600 / 52 | — |
| `king-sunny-ade` | 1,300 / 33 | — |
| `manu-dibango` | 1,300 / 41 | — |
| `oumou-sangare` | 1,300 / 41 | — |

**Updated:** afrobeat, highlife and the instrument pages they relate to.
**Done when:** ☐ collection code · ☐ 10 EN pages · ☐ FR (and PT for Cesária Évora) · ☐ released

---

## Batch 27 — Musicians 2

**Target:** 15 July 2027.

| Profile (`musicians/…`) | Primary keyword |
|---|---|
| `angelique-kidjo` | 5,400 / 77 |
| `tinariwen` | 4,400 / 73 |
| `ladysmith-black-mambazo` | 4,400 / 46 |
| `koffi-olomide` | 1,900 / 45 |
| `youssou-ndour` | 1,300 / 69 |
| `papa-wemba` | 880 / 35 |
| `orchestra-baobab` | 590 / 46 |
| `toumani-diabate` | 480 / 47 |
| `franco-luambo` | 320 / 33 |

**Done when:** ☐ 9 EN pages · ☐ FR · ☐ released

---

## Batch 28 — Egypt and Nubia

**Target:** 31 July 2027. Arabic first for the Cairo museums.

| Page | Primary keyword | Secondary keywords / other markets | Languages |
|---|---|---|---|
| `art-forms/ancient-egyptian-art` | *ancient egyptian art* 2,900 / 47 | *egyptian art* 8,100 / 40 · EG *الفن المصري القديم* 1,600 / 33 · MX *arte egipcio* 4,400 / 29 · BR *arte egípcia* 3,600 / 44 · ES 1,300 / 31 | all 5 |
| `heritage/kingdom-of-kush` — Kush and Nubian art | *kingdom of kush* 6,600 / 68 | *nubian art* 260 / 24 · EG *النوبة* 2,900 / 40 · *الفن النوبي* 110 / 19 | EN AR |
| `museums/grand-egyptian-museum` | EG *المتحف المصري الكبير* 135,000 / 69 | US 14,800 / 68 | AR EN |
| `museums/egyptian-museum-cairo` | EG *المتحف المصري* 18,100 / 43 | US 2,400 / 85 | AR EN |
| `museums/mahmoud-mokhtar-museum` | EG *متحف محمود مختار* 1,000 / 31 | — | AR EN |
| `museums/mohamed-mahmoud-khalil-museum` | EG *متحف محمد محمود خليل* 320 / 31 | — | AR EN |
| `artists/gazbia-sirry` | EG *جاذبية سري* 880 / 31 | — | AR EN FR |
| `artists/abdel-hadi-el-gazzar` | EG *عبد الهادي الجزار* 320 / 22 | — | AR EN FR |

**Updated:** `regions/north-africa`, `artists/mahmoud-mokhtar`, `museums/museum-of-modern-egyptian-art`.
**Done when:** ☐ 8 pages · ☐ translations · ☐ released

---

## Batch 29 — Remaining profiles and home markets

**Target:** 15 August 2027.

| Profile (`artists/…`) | Primary keyword | Other markets |
|---|---|---|
| `gerard-sekoto` | 170 / 28 | **ZA 1,900 / 33** |
| `mary-sibande` | 260 / 35 | — |
| `aboudia` | 210 / 31 | — |
| `omar-victor-diop` | 210 / 23 | — |
| `ouattara-watts` | 210 / 18 | — |
| `cyrus-kabiru` | 210 / 29 | — |
| `susanne-wenger` | 140 / 27 | — |
| `sokari-douglas-camp` | 140 / 14 | — |

**Also in this batch (from the backlink gap):**

| Page | Primary keyword | Why |
|---|---|---|
| `movements/resistance-art` — South African resistance art under apartheid | not checked | DailyArt Magazine and Voice Magazine link to the competitor's page on it |
| South African art overview **with a timeline** (moved here from batch 32; URL pattern as decided there) | *south african art* 390 / 33 · ZA 720 / 17 | The North Carolina Museum of Art's learning site links to the competitor's South African art timeline |

**Updated for their home markets:** `artists/esther-mahlangu` (ZA 4,400 / 42),
`artists/william-kentridge` (ZA 3,600 / 46), `artists/irma-stern` (ZA 2,400 / 36),
`artists/ben-enwonwu` (NG 880 / 40), `museums/nigerian-national-museum` (NG 880 / 49).
**Done when:** ☐ 10 EN pages · ☐ translations · ☐ updates · ☐ released · ☐ NCMA Learn and
DailyArt contacted (see [backlink-gap-2026-11.md](backlink-gap-2026-11.md))

---

## Batch 30 — Brazilian Portuguese and Latin American Spanish

**Target:** 31 August 2027 (earlier if the owner approves the switch sooner).
**Code:** `og:locale` → `pt_BR`; a short style note for each edition.

- Convert the 20 Portuguese pages with the most Search Console impressions to Brazilian Portuguese.
- Write Portuguese and Spanish editions where they are missing, led by: *máscara africana* BR
  9,900 / 36 and *máscaras africanas* BR 8,100 / 38, MX 1,300 / 34; *arte africana* BR 8,100 / 24;
  *cultura africana* BR 12,100 / 33, MX 1,300 / 29; *kalimba*, *djembe*, *sankofa*, *ankh*,
  *olho / ojo de horus*, *adinkra*; *instrumentos musicais africanos* BR 4,400 / 33; *roupas
  africanas* BR 4,400 / 34; *marimba* MX 18,100 / 40.
- Owner decision: *museu afro brasil* 6,600 / 53 and *arte afro-brasileira* 1,600 / 20 are
  diaspora topics in Brazil.

**Done when:** ☐ locale change · ☐ 20 pages converted · ☐ new editions · ☐ released

---

## Batch 31 — Culture and meaning through art

**Target:** 15 September 2027. Every page approaches its subject through art and objects.

| Page | Primary keyword | Secondary keywords | Other markets | Languages |
|---|---|---|---|---|
| `guides/orishas-in-yoruba-art` | *orisha* 14,800 / 42 · *orishas* 12,100 / 31 | *orisha gods* 2,400 / 35 · *shango orisha* 2,400 / 42 · *oshun orisha* 1,900 / 37 · *oya orisha* 1,900 / 14 · *elegua orisha* 1,600 / 27 · *obatala orisha* 1,600 / 31 · *yoruba gods* 1,000 / 31 | BR *orixás* 8,100 / 42 · MX *orishas* 6,600 / 46 · ES 3,600 / 58 | EN PT ES |
| `guides/anansi` — in Akan storytelling and art | *anansi* 12,100 / 42 | *anansi the spider* 6,600 / 45 · *anansi god* 2,900 / 42 · *anansi spider-god* 2,400 / 38 · *african folktales* 880 / 44 | — | EN FR |
| `guides/african-proverbs` — in adinkra, cloth and carving | *african proverbs* 2,400 / 33 | — | FR *proverbes africains* 1,300 / 32 | EN FR |
| `guides/african-mythology-in-art` | *african mythology* 2,400 / 35 | — | FR *mythologie africaine* 210 / 21 | EN FR |
| `movements/afrofuturism` | *afrofuturism* 9,900 / 49 | *afrofuturism art* 590 / 27 | — | EN |

**Updated:** Susanne Wenger (Osogbo), `symbols/*`.
**Done when:** ☐ 5 EN pages · ☐ translations · ☐ released

---

## Batch 32 — Country art overviews

**Target:** 30 September 2027. Each links to its artist list, museums and art forms.

| Page | Primary keyword | Other markets |
|---|---|---|
| `countries/egypt` — Egyptian art, ancient to now | *egyptian art* 8,100 / 40 | — |
| `countries/morocco` | *moroccan art* 590 / 13 | — |
| `countries/nigeria` | *nigerian art* 590 / 29 | NG 210 |
| `countries/south-africa` — moved to batch 29 | *south african art* 390 / 33 | ZA 720 / 17 |
| `countries/kenya` | *kenyan art* 210 / 8 | — |
| `countries/somalia` | *somali art* 210 / 12 | — |
| `countries/dr-congo` | *congolese art* 140 / 16 | — |
| `countries/algeria` | *algerian art* 140 / 17 | — |
| `countries/eritrea` | *eritrean art* 140 / 21 (MoMAA #1) | — |

Ethiopian art already has a page (*ethiopian art* 1,000 / 26). Countries under 100 searches stay
on the region pages. The URL pattern is open: a new `countries` collection, or an overview at the
top of each `artists/country/*` page. Decide before the batch.
**Done when:** ☐ URL pattern decided · ☐ 9 pages · ☐ released

---

## Batch 33 — UK October

**Target:** 15 September 2027, ahead of Black History Month in the UK and 1-54 London (both
October; 40–80% of these searches fall in that one month).

| Page | Primary keyword | Languages |
|---|---|---|
| `guides/1-54-london` — visitor guide | *1-54 art fair* 70 (UK, mostly October) | EN |
| `guides/black-history-month-uk` — African and British-African artists | UK *black history month* 18,100 / 38 | EN |

**Updated for UK searches:** `artists/yinka-shonibare` (UK 5,400 / 52), `artists/el-anatsui` (UK
2,400 / 49), `artists/chris-ofili` (UK 2,900 / 28), `art-forms/benin-bronzes` (UK 3,600 / 57),
`art-forms/kente-cloth` (UK 2,900 / 27).
**Done when:** ☐ 2 pages · ☐ updates · ☐ released · ☐ UK outreach (museums, diaspora media)

---

## Batch 34 — Yearly review

**October 2027.** Re-pull rankings and Search Console for every batch; prune or merge pages with
no impressions after six months; refresh pages that slipped; re-run the keyword gap against
contemporary-african-art.com and momaa.org; write next year's batches.

---

## Backlog

- **Museums 3:** *liberia national museum* 110 / 31 · *uganda museum* 110 / 29 · *iziko south
  african national gallery* 90 / 53 · *national gallery of zimbabwe* 90 / 22 · Lusaka national
  museum 70 · Musée du quai Branly in French (FR 27,100 / 51).
- **Instruments 3:** valiha, xalam, goje; *kalimba songs* 2,900 / 24 and *kalimba tabs* 2,400 / 11.
- **Symbols 2:** Tuareg crosses (FR *croix d'Agadez* 880 / 23), Amazigh signs, Ethiopian crosses.
- **Features:** events calendar, museum map, timeline of African art, glossary (growth plan,
  section 7).

---

## Log

| Date | Batch | Commit | Notes |
|---|---|---|---|
| 31 Oct 2026 | Museums 1 | f1b39f5 | Ten museum pages |
| 31 Oct 2026 | Plan | — | This file; growth plan in 1aeda37 |
| 1 Nov 2026 | Batch 11 | 546a079–463fee2 | Sections on kente, adinkra, masks, mud cloth (5 editions); 9 photos; 5 snippets |
| 1 Nov 2026 | Batch 10 | de7b965 | Dak'Art and Dakar guides (EN, FR); Event data; photo pipeline (`place-images.yml`), 4 photos |
