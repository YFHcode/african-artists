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
| [10](#batch-10--dakart-2026) | Dak'Art 2026 | 2 | 3 | 12 Nov 2026 | ☐ |
| [11](#batch-11--quick-wins-on-existing-pages) | Quick wins on existing pages | 0 | 11 | 21 Nov 2026 | ☐ |
| [12](#batch-12--instruments-1) | Instruments 1 | 7 | 6 | 30 Nov 2026 | ☐ |
| [13](#batch-13--symbols-1) | Symbols 1 | 6 | 2 | 15 Dec 2026 | ☐ |
| [14](#batch-14--patterns-and-dress-1) | Patterns and dress 1 | 7 | 3 | 31 Dec 2026 | ☐ |
| [15](#batch-15--black-history-month) | Black History Month (US) | 3 | 3 | 10 Jan 2027 | ☐ |
| [16](#batch-16--artists-of-the-diaspora-and-today) | Artists of the diaspora and today | 9–10 | 4 | 31 Jan 2027 | ☐ |
| [17](#batch-17--instruments-2) | Instruments 2 | 6 | 2 | 10 Feb 2027 | ☐ |
| [18](#batch-18--museums-2) | Museums 2 | 10 | 4 | 28 Feb 2027 | ☐ |
| [19](#batch-19--art-travel) | Art travel | 7 | 3 | 15 Mar 2027 | ☐ |
| [20](#batch-20--dress-2) | Dress 2 | 9 | 1 | 31 Mar 2027 | ☐ |
| [21](#batch-21--buying-guides) | Buying guides | 6 | 1 | 15 Apr 2027 | ☐ |
| [22](#batch-22--music-genres-1) | Music genres 1 | 8 | 1 | 30 Apr 2027 | ☐ |
| [23](#batch-23--music-genres-2) | Music genres 2 | 7 | 2 | 15 May 2027 | ☐ |
| [24](#batch-24--heritage) | Heritage (Africa Day) | 11 | 2 | 20 May 2027 | ☐ |
| [25](#batch-25--restitution-tracker) | Restitution tracker | 1 | 4 | 15 Jun 2027 | ☐ |
| [26](#batch-26--musicians-1) | Musicians 1 | 10 | 3 | 30 Jun 2027 | ☐ |
| [27](#batch-27--musicians-2) | Musicians 2 | 9 | 2 | 15 Jul 2027 | ☐ |
| [28](#batch-28--egypt-and-nubia) | Egypt and Nubia | 8 | 3 | 31 Jul 2027 | ☐ |
| [29](#batch-29--remaining-profiles-and-home-markets) | Remaining profiles and home markets | 8 | 5 | 15 Aug 2027 | ☐ |
| [30](#batch-30--brazilian-portuguese-and-latin-american-spanish) | Brazilian Portuguese and Latin American Spanish | 0 | 20+ | 31 Aug 2027 | ☐ |
| [31](#batch-31--culture-and-meaning-through-art) | Culture and meaning through art | 5 | 2 | 15 Sep 2027 | ☐ |
| [32](#batch-32--country-art-overviews) | Country art overviews | 9 | 2 | 30 Sep 2027 | ☐ |
| [33](#batch-33--uk-october) | UK October | 2 | 5 | 15 Sep 2027 | ☐ |
| [34](#batch-34--yearly-review) | Yearly review | 0 | — | Oct 2027 | ☐ |
| [Backlog](#backlog) | Museums 3 and later ideas | — | — | — | ☐ |

About 155 new English pages in twelve months, plus their translations. Batches 15 and 33 are tied
to fixed dates, so they jump the queue if anything slips.

**Owner tasks before batch 11:** confirm Search Console is a Domain property; add Bing Webmaster
Tools. (The `www` → bare-domain redirect has been live in Vercel since 27 October 2026.)

---

## Batch 10 — Dak'Art 2026

**Target:** live by 12 November 2026, a week before the biennale opens (19 November–19 December
2026, artistic director Morad Montazami, main venue the Museum of Black Civilisations).

| Page | Primary keyword | Secondary keywords | Languages |
|---|---|---|---|
| `guides/dakar-biennale-2026` — Dak'Art 2026 visitor guide: dates, venues, what to see | *dakar biennale* 170 | *dak'art* 90 · FR *biennale de dakar* 90 / 37 | EN FR |
| `guides/dakar-for-art-lovers` — museums, galleries, Gorée, the École de Dakar | *things to do in dakar* 1,600 / 20 | *goree island* 3,600 / 42 (link to its page in batch 18) | EN FR |

**Links in:** `guides/african-art-fairs-and-biennales`, `museums/museum-of-black-civilisations`,
`museums/theodore-monod-museum`, `movements/ecole-de-dakar`, `artists/country/senegal`.
**Earns:** a later home for tour affiliates (batch 19).
**Done when:** ☐ sources logged · ☐ EN · ☐ FR · ☐ links in · ☐ released · ☐ indexing requested

---

## Batch 11 — Quick wins on existing pages

**Target:** 21 November 2026. No new pages: retitles and new sections on pages that already rank
40–90.

| Page | Primary keyword | Change | Secondary keywords to work in |
|---|---|---|---|
| `art-forms/adinkra-symbols` | *adinkra symbols* 9,900 / 31 (now #88 for *adinkra*) | Title "Adinkra Symbols and Their Meanings"; a symbol-by-symbol list (the full dictionary comes in batch 13) | *adinkra symbols and meanings* 2,400 / 21 · *akan adinkra* 1,900 / 27 · *adinkra cloth* 1,300 / 25 · *adinkra meaning* 880 / 21 · *adinkra fabric* 880 / 19 · *adinkra symbols meaning* 720 / 28 |
| `art-forms/kente-cloth` | *kente cloth* 12,100 / 47 (#13 for *hand woven kente cloth*) | Sections on patterns and colours, hand-woven vs printed, silk kente | *kente cloth patterns* 1,300 / 26 · *ghana kente material* 1,000 / 21 · *silk kente cloth* 880 / 24 · *kente cloth meaning* 720 / 36 · *what is kente cloth* 590 / 36 · UK *kente cloth* 2,900 / 27 |
| `art-forms/african-masks` | *african masks* 6,600 / 22 (#59–78) | Title "African Masks: Types, Meanings and Uses"; types by people; what masks are for; misconceptions | *african mask* 6,600 / 26 · *mask of africa* 5,400 / 23 · *tribal masks africa* 3,600 / 24 · *traditional african masks* 2,400 / 22 · *african tribal masks* 1,600 / 31 · questions: *what are African tribal masks used for*, *why were African masks made*, *are African masks evil* |
| `art-forms/mudcloth` | *mud cloth* 1,300 / 12 (#81) | Title "Mud Cloth (Bogolanfini): Meaning and History"; symbols; handmade vs printed | *mudcloth* 720 / 5 · *mud cloth fabric* 480 / 3 · *african mud cloth* 390 / 8 · *african bogolan mud cloth* 390 / 18 · *what is mud cloth* 110 / 3 · FR *bogolan* 1,000 / 20 |
| `art-forms/african-pottery` | *african pottery* 590 / 8 (#48 for *pottery of africa*) | Techniques; potters (Ladi Kwali, Magdalene Odundo); images | *pottery of africa* 320 / 23 |
| `artists/kevin-carter` | *kevin carter* 5,400 / 48 (#37–88) | A sourced section on the 1993 photograph and the debate over it | *kevin carter photo* 390 / 34 |
| `museums/museum-of-modern-egyptian-art` | *egyptian museum of modern art* 110 / 33 | English title in the form people search | AR *متحف الفن المصري الحديث* 590 / 27 |
| `art-forms/african-rock-art` (PT, ES) | BR *arte rupestre* 22,200 / 39 | Portuguese and Spanish titles and summaries that use *arte rupestre* | MX *arte rupestre* 5,400 / 41 · ES 1,900 / 36 · PT 1,300 / 40 |
| `artists/country/south-africa`, `nigeria`, `ghana`, `egypt`, `morocco`, `ethiopia` | *south african artists* 390 / 13 (ZA 2,900 / 20) | Titles and intros that say "painters, sculptors and photographers" | *south african painters* 260 / 19 · *nigerian artists* 390 / 31 · *ghanaian artists* 210 / 20 · *egyptian artists* 170 / 33 · *moroccan artists* 110 / 14 · *ethiopian artists* 110 / 21 |
| `guides/african-women-artists` | *black female artists* 1,600 / 33 | Grow towards a ranked list of 30 names (more in batch 15) | *famous female artists* 2,900 / 30 |

**Done when:** ☐ all ten pages · ☐ translations updated where titles change · ☐ released ·
☐ positions noted after four weeks

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
**Done when:** ☐ collection code and tests · ☐ 7 EN pages · ☐ translations · ☐ links in · ☐ nav ·
☐ released

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
| `african-baskets` — Bolga and Zulu baskets | *african baskets* 1,000 / 25 | *bolga basket* 880 / 10 | — | EN |
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

**Updated for their home markets:** `artists/esther-mahlangu` (ZA 4,400 / 42),
`artists/william-kentridge` (ZA 3,600 / 46), `artists/irma-stern` (ZA 2,400 / 36),
`artists/ben-enwonwu` (NG 880 / 40), `museums/nigerian-national-museum` (NG 880 / 49).
**Done when:** ☐ 8 EN pages · ☐ translations · ☐ updates · ☐ released

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
| `countries/south-africa` | *south african art* 390 / 33 | ZA 720 / 17 |
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
