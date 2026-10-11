# Artist pages: rollout plan

How the 978 artists in `data/artists/artists.json` become pages: the 102 in the `page` tier get
their own profiles, and the 786 in the `list` tier fill hub pages (by country, by medium, by both).
Numbers below come from the first data run (pageviews October 2025 – September 2026, five
Wikipedias). Re-check them against the latest monthly run before each wave.

## Principles

- **Two kinds of profile.**
  - **Full profile (A):** hand-researched, like the 14 existing ones. It has 600+ words, facts, and
    where to see the work.
  - **Short profile (B):** about 200 words written once, plus Wikidata facts, related artists and
    hub links.
  - No page is only database fields.
- **List-tier artists never get their own page.** Each one is a single line on its hubs, with
  name, medium, dates and a link to Wikipedia. When the monthly job promotes one to `page`, it
  joins the next wave as a short profile.
- **Language rule for profiles.** EN always. FR, ES, PT or AR only if that Wikipedia has an
  article on the person and it gets 1,000+ views a year. The existing 14 profiles stay in all
  five languages.
- **Language rule for hubs.** A hub gets a language version when its artists' views in that
  language total 10,000+ a year.
- **Hubs need a minimum size.** A country hub needs 8+ artists, and a country-and-medium hub
  needs 10+. Smaller countries stay on the region pages.
- **Gate between waves.** Publish the next wave only when, 3–4 weeks after the previous one:
  - at least 70% of that wave's URLs are indexed (Search Console, Page indexing);
  - "Crawled – currently not indexed" is not growing.

  If either check fails, improve those pages first. Writing the next wave can overlap the
  waiting.
- **Every wave ends the same way:**
  1. Tests and build pass.
  2. Deploy.
  3. Sitemap `lastmod` stays honest.
  4. Run `npm run indexnow --` with the new paths.
  5. In Search Console, Request indexing for the hubs.

## Wave 0: foundations (no new public pages)

**Status: built 11 October 2026.** The roster (`src/content/roster.ts`), hubs
(`src/content/hubs.ts`), release switch (`src/content/waves.ts`), hub routes, short-profile
template, Person schema, partial-language support and tests are in place. A preview build of a
cut-down wave 1 was checked end to end: pages, 404s for missing editions, hreflang, sitemap and
language switcher. One step remains for the owner: export a Search Console baseline before
wave 1 goes live.


- **Curation (decided).** All 7 "pending" artists are kept as short profiles in their waves.
  Each is known partly for something besides visual art (writing, television, music, politics),
  so their paragraphs should say so plainly.
- **URLs.** Profiles stay at `/artists/<slug>`. Hubs go where they can't clash with a profile slug:
  - `/artists/country/<country>`
  - `/artists/country/<country>/<medium>`
  - `/artists/medium/<medium>`

  Breadcrumbs follow the same path: Home › Artists › South Africa › Photographers.
- **Generator.** A script reads `artists.json` and the hand-written text, and produces:
  - **Short profiles:** facts, related artists, hub links.
  - **Hubs:** written intro, then artists sorted by views.
  - **Related artists:** same country, then same medium, then same generation, then most viewed.
    4–6 per page.
- **Templates.**
  - **Short profile:** heading, written paragraph, facts box (born, country, medium, Wikidata and
    Wikipedia links), related artists, "more from <country>" link.
  - **Hub:** written intro, then the profiled artists as cards, then every other artist as a
    one-line entry, then links to sibling hubs.
- **Structured data.**
  - **Profiles:** `Person`, with `sameAs` pointing to Wikidata and Wikipedia.
  - **Hubs:** `CollectionPage`, with an `ItemList` of the artists.
- **Partial-language support.** Today every article must exist in all five languages. That needs
  to change:
  - the tests require EN only, plus whatever the language rule calls for;
  - hreflang and the sitemap list only the versions that exist;
  - the language switcher falls back to the section index when a version is missing.
- **Tests.**
  - Every generated page has its written paragraph, with a minimum word count.
  - Every hub reaches its minimum size.
  - No orphans; this already exists.
  - Every profile links to its country hub.
- **Baseline.** Export Search Console queries and pages, so each wave can be measured against it.

## Wave 1: photographers

**Status: released 11 October 2026.**
- **Pages:** 26 profiles in 46 language editions, 7 hubs in 16 editions, and the Bang-Bang Club guide in 4 editions — 66 new URLs.
- **Links:** new links in the photography page, the Southern and East Africa region pages, the women artists and contemporary art guides, and the Sidibé and Keïta profiles.
- **Gate for wave 2:** check indexing of these 66 URLs in Search Console in early November.
- **Added on 11 October 2026, by decision:** short profiles of five people the data job had excluded or flagged for review — W. E. B. Du Bois, Leni Riefenstahl, Foday Sankoh, Hamza Yassin and Ntare Guma Mbaho Mwine — 17 more editions. Each profile says plainly what the person is mainly known for and what their link to photography is. Tahar Ben Jelloun and Queen Farida, both painters, were added the same day to waves 4 and 5; their texts are written and wait for those waves.

Photographers draw 1.24M yearly views, almost as many as painters, and far fewer sites cover them.
The Bang-Bang Club (Carter, Oosterbroek, Marinovich, Silva) is a search topic of its own.

| Type | Artist | Country | Views/yr | Languages |
| --- | --- | --- | --- | --- |
| A | Kevin Carter | South Africa | 335,170 | EN FR ES PT AR |
| A | Ken Oosterbroek | South Africa | 66,773 | EN PT |
| A | Zanele Muholi | South Africa | 31,547 | EN FR ES PT |
| A | Greg Marinovich | South Africa | 20,514 | EN |
| A | Mohamed Amin | Kenya | 20,081 | EN |
| A | Ernest Cole | South Africa | 18,460 | EN FR |
| A | João Silva | South Africa | 18,316 | EN |
| A | Sam Nzima | South Africa | 11,915 | EN |
| A | David Goldblatt | South Africa | 11,413 | EN |
| A | Peter Magubane | South Africa | 5,107 | EN |
| B | Misan Harriman | Nigeria | 57,040 | EN |
| B | Dan Eldon | Somalia | 27,723 | EN |
| B | Sani Maikatanga | Nigeria | 16,523 | EN |
| B | Roger Ballen | South Africa | 15,552 | EN FR |
| B | Austin Stevens | South Africa | 13,286 | EN ES |
| B | Laetitia Ky | Ivory Coast | 12,445 | EN FR |
| B | Khadija Saye | The Gambia | 12,060 | EN FR |
| B | Leila Alaoui | Morocco | 10,013 | EN FR |
| B | Hassan Hajjaj | Morocco | 9,460 | EN FR |
| B | Boniface Mwangi | Kenya | 8,372 | EN |
| B | Augustus Washington | Liberia | 7,221 | EN |
| B | Samuel Fosso | Nigeria, Cameroon | 5,863 | EN FR |
| B | Anton Hammerl | South Africa | 5,855 | EN |
| B | James Barnor | Ghana | 5,667 | EN FR |
| B | Youssef Nabil | Egypt | 5,558 | EN FR |
| B | Mohamed Maradji | Morocco | 5,154 | EN FR AR |
| Update | Malick Sidibé, Seydou Keïta | Mali | | already in 5 |

**Hubs** (artists in each):
- African photographers (276)
- South African photographers (81)
- Nigerian photographers (57)
- Egyptian photographers (18)
- Moroccan photographers (14)
- Congolese photographers (11)
- Ghanaian photographers (10)

**Guide:** *The Bang-Bang Club*.

**Also update:** the African photography art-form page, the Southern Africa region page, and the
`/artists` index.

## Wave 2: South Africa and Southern Africa

**Status: released 11 October 2026, the same day as wave 1, by decision (without waiting for the indexing gate).**
- **Pages:** 10 profiles in 18 editions and 9 hubs in 15 editions — 33 new URLs.
- **Links:** new links from the Southern Africa region page, the contemporary art and women artists guides, the Shona sculpture page, and the Esther Mahlangu and Malangatana profiles.
- **Gate:** check indexing of waves 1 and 2 together before wave 3.

South Africa has the most demand of any country: 1.07M views a year across 226 artists.

| Type | Artist | Country | Views/yr | Languages |
| --- | --- | --- | --- | --- |
| A | William Kentridge | South Africa | 75,996 | EN FR ES |
| A | Marlene Dumas | South Africa | 27,466 | EN FR ES |
| A | Vladimir Tretchikoff | South Africa | 17,113 | EN |
| A | Irma Stern | South Africa | 12,063 | EN |
| B | Leon Botha | South Africa | 30,836 | EN FR ES |
| B | Dumile Feni | South Africa | 6,581 | EN |
| B | Coert Steynberg | South Africa | 6,376 | EN |
| B | Jacobus Hendrik Pierneef | South Africa | 6,204 | EN |
| B | Zwelethu Mthethwa | South Africa | 5,615 | EN |
| B | Breyten Breytenbach | South Africa | 57,393 | EN FR ES |
| Update | Esther Mahlangu, Malangatana | | | already in 5 |

**Hubs:**
- South African artists (226; EN FR)
- South African painters (108)
- South African sculptors (55)
- South African printmakers (12)
- Zimbabwean artists (59)
- Zimbabwean sculptors (51), linked both ways with the Shona sculpture page
- Mozambican artists (8; EN PT)
- Zambian artists (9)
- Namibian artists (8)

## Wave 3: Nigeria and Ghana

**Status: released 11 October 2026, by decision on the same day as waves 1 and 2.**
- **Pages:** 18 profiles in 21 editions and 6 hubs in 9 editions — 30 new URLs.
- **Change from the plan:** "Toyin Sokefun-Bello" is the photographer and singer TY Bello; her profile is at /artists/ty-bello.
- **Links:** new links from the contemporary art and women artists guides, the pottery page, the Oshogbo and Zaria pages, the West Africa region page, and the El Anatsui, Akunyili Crosby and Enwonwu profiles.

Second and fifth in demand: Nigeria has 470K views a year across 138 artists, Ghana 181K across 45.

| Type | Artist | Country | Views/yr | Languages |
| --- | --- | --- | --- | --- |
| A | Yinka Shonibare | Nigeria | 40,529 | EN FR |
| A | Ibrahim Mahama | Ghana | 25,268 | EN |
| A | Ladi Kwali | Nigeria | 13,423 | EN |
| A | Twins Seven-Seven | Nigeria | 13,037 | EN |
| A | Otobong Nkanga | Nigeria | 12,203 | EN FR |
| A | Amoako Boafo | Ghana | 10,491 | EN FR |
| B | Sharon Dede Padi | Ghana | 26,199 | EN |
| B | Bruce Onobrakpeya | Nigeria | 10,056 | EN |
| B | Amon Kotei | Ghana | 7,655 | EN |
| B | Kofi Antubam | Ghana | 7,487 | EN |
| B | Kwame Akoto-Bamfo | Ghana | 6,376 | EN |
| B | Nnenna Okore | Nigeria | 6,222 | EN |
| B | Uche Okeke | Nigeria | 6,034 | EN |
| B | Aina Onabolu | Nigeria | 5,986 | EN |
| B | Frank Edoho | Nigeria | 41,686 | EN |
| B | Caleb Azumah Nelson | Ghana | 10,406 | EN |
| B | Toyin Sokefun-Bello | Nigeria | 8,463 | EN |
| B | Caleb Femi | Nigeria | 5,807 | EN |
| Update | El Anatsui, Njideka Akunyili Crosby, Ben Enwonwu | | | already in 5 |

**Hubs:**
- Nigerian artists (138; EN FR)
- Nigerian painters (56)
- Nigerian sculptors (29)
- Ghanaian artists (45)
- Ghanaian painters (24)
- Ghanaian sculptors (16)

**Also update:** the Zaria Art Society and Oshogbo School pages (Twins Seven-Seven belongs to
Oshogbo), and the pottery page (Ladi Kwali).

## Wave 4: Morocco, Algeria, Tunisia (EN, FR and AR)

This is the strongest French and Arabic demand on the list:
- Morocco: 84K views a year in French, 49K in Arabic.
- Algeria: 71K in French, 21K in Arabic.

It's also the home market.

| Type | Artist | Country | Views/yr | Languages |
| --- | --- | --- | --- | --- |
| A | Yto Barrada | Morocco | 19,698 | EN FR |
| A | Hassan El Glaoui | Morocco | 17,521 | EN FR AR |
| A | Chaïbia Talal | Morocco | 17,111 | EN FR AR |
| A | M'hamed Issiakhem | Algeria | 11,396 | EN FR AR |
| A | Mahi Binebine | Morocco | 11,313 | EN FR AR |
| A | Mohammed Khadda | Algeria | 5,390 | EN FR AR |
| B | Bruno Catalano | Morocco | 19,772 | EN FR |
| B | Adel Abdessemed | Algeria | 7,915 | EN FR |
| B | Mohamed Mrabet | Morocco | 7,342 | EN FR |
| B | Bachir Yellès | Algeria | 6,940 | EN FR AR |
| B | Mohamed Hamidi | Morocco | 6,409 | EN FR |
| B | Zoubeir Turki | Tunisia | 5,426 | EN FR AR |
| B | eL Seed | Tunisia | 5,321 | EN FR |
| B | Mahjoubi Aherdane | Morocco | 22,207 | EN FR AR |
| B | Rabah Driassa | Algeria | 18,117 | EN FR AR |
| Update | Baya, Farid Belkahia | | | already in 5 |

**Hubs** (all in EN FR AR):
- Moroccan artists (52)
- Moroccan painters (33)
- Moroccan sculptors (10)
- Algerian artists (33)
- Algerian painters (22)
- Tunisian artists (27)
- Tunisian painters (20)

**Also update:** the Casablanca School page and the North Africa region page.

## Wave 5: Egypt and Sudan (EN and AR first)

Egypt has the largest Arabic demand on the list: 120K views a year.

| Type | Artist | Country | Views/yr | Languages |
| --- | --- | --- | --- | --- |
| A | Farouk Hosny | Egypt | 48,648 | EN AR |
| A | Mahmoud Mokhtar | Egypt | 23,344 | EN FR AR |
| A | Adam Henein | Egypt | 9,488 | EN AR |
| A | Hussein Bicar | Egypt | 8,659 | EN AR |
| A | Inji Aflatoun | Egypt | 7,751 | EN AR |
| A | Ghada Amer | Egypt | 7,030 | EN FR |
| B | Hussein Shariffe | Sudan | 10,930 | EN |
| B | Anna Boghiguian | Egypt | 6,917 | EN |
| B | Wael Shawky | Egypt | 5,674 | EN FR |
| B | Effat Nagy | Egypt | 5,642 | EN AR |
| B | Ahmed Umar | Sudan | 5,108 | EN |
| Update | Mahmoud Saïd, Ibrahim El-Salahi | | | already in 5 |

**Hubs:**
- Egyptian artists (83; EN FR AR)
- Egyptian painters (55; EN AR)
- Egyptian sculptors (16; EN AR)
- Sudanese artists (18; EN AR)

**Also update:** the Khartoum School page.

## Wave 6: East, Central and Francophone West Africa

| Type | Artist | Country | Views/yr | Languages |
| --- | --- | --- | --- | --- |
| A | Lubaina Himid | Tanzania | 24,542 | EN FR |
| A | Magdalene Odundo | Kenya | 12,688 | EN |
| A | Afewerk Tekle | Ethiopia | 11,196 | EN |
| B | Seni Awa Camara | Senegal | 9,733 | EN FR |
| B | Nzante Spee | Cameroon | 8,300 | EN |
| B | Skunder Boghossian | Ethiopia | 7,052 | EN |
| B | George Lilanga | Tanzania | 6,896 | EN |
| B | Chéri Cherin | DR Congo | 6,870 | EN FR |
| B | Romuald Hazoumè | Benin | 6,714 | EN FR |
| Update | Wangechi Mutu, Ousmane Sow, Chéri Samba | | | already in 5 |

**Hubs:**
- Kenyan artists (13)
- Ethiopian artists (16)
- Ugandan artists (11)
- Senegalese artists (20; EN FR)
- Senegalese painters (12)
- Congolese artists (28; EN FR)
- Congolese painters (16)
- Cameroonian artists (16; EN FR)
- Beninese artists (16)
- Ivorian artists (14; EN FR)
- Malian artists (9; EN FR)

Tanzania has 5 artists, below the minimum of 8, so it stays on the East Africa region page, which
links to the Tingatinga page.

**Also update:** the Congolese popular painting and École de Dakar pages.

## Wave 7: medium hubs and the whole-continent lists

These broad terms come last because they need the profiles from earlier waves to link to.

**Hubs:**
- African painters (432)
- African sculptors (242)
- African printmakers (27)
- African ceramic artists (13, linked with the pottery page)
- Contemporary African artists: everyone born 1960 or later (399), linked with the existing guide

**Then a full site pass:**
- Home page features.
- The `/artists` index becomes the entry to all hubs.
- Regions and art forms link to the hubs.
- The women artists guide links to the new women profiles.
- Link-graph crawl and page audit.

## After wave 7: the monthly cycle

1. The data job runs on the 3rd and re-ranks every artist.
2. New `page`-tier artists are queued as short profiles. Short profiles that gain a lot of views
   are queued for full profiles.
3. New `review` rows are sorted into keep or `exclude.txt`.
4. Search Console shows which hubs earn impressions; write more for those. Hubs that never get
   impressions get better intros or are merged into their region page.

## Totals

| | Count |
| --- | --- |
| New full profiles | 35 |
| New short profiles | 61 |
| Existing profiles updated | 13 (plus Farid Belkahia, list tier) |
| Hubs | 49 (wave 1: 7, wave 2: 9, wave 3: 6, wave 4: 7, wave 5: 4, wave 6: 11, wave 7: 5) |
| List-tier artists placed on hubs | 786 |
