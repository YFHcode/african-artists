# Artist profiles: expansion plan

**Status: approved 27 October 2026, with 600+ and 300+ words as the targets. Batch 0 done; batch 1
(the pilot) live on 27 October 2026; its four-week check is due on 24 November 2026. Batches 2–4 were
held on side branches, then published on 27 October 2026 at the owner's request; later batches go
straight to `main`.** Word counts are for the English pages as of that date; yearly views are
from the first data run (October 2025 – September 2026, five Wikipedias).

## The two problems

1. **Short profiles are thin.** The 61 short profiles average 184 words (133–247) in English.
   They are what Google is holding back: almost every example in Search Console's "Crawled –
   currently not indexed" report is a short profile in a translation. Part of that report comes
   from the www/bare-domain conflict fixed on 27 October, so read it again in December before
   drawing conclusions from it.
2. **Full profiles fall short of the rollout plan.** `docs/artist-pages-rollout.md` promises
   600+ words and "where to see the work". The 49 full profiles (the original fourteen included)
   average 351 words of text, about 450 on the page with the summary and facts box. Only El
   Anatsui reaches 500, and only one profile has a section on where to see the work.

## Targets

Counted in English, in the text below the header (not the summary or the facts box). The
content tests enforce them (`src/content/expansion.ts`).

| Kind | Words | Must contain |
|---|---|---|
| Full | 600+ | Life and training; the work, with at least two named and dated works or series; recognition (exhibitions, prizes, collections); where to see the work; related artists |
| Short | 300+ | The kind of work, with one named work or series; at least one dated milestone; links to related pages |

Translations must stay within 85% of the English length in French, Spanish and Portuguese, and
70% in Arabic. Today the lowest are 94% (Portuguese) and 73% (Arabic), so the check only catches
a dropped paragraph.

## Worth reading, not a Wikipedia summary

Length is the floor, not the point. Every expanded profile gives readers something a Wikipedia
article does not:

- **How to look at the work.** What to notice in specific pieces: materials, technique, scale,
  how they were made, what changed over time. Described from sources that show or discuss them.
- **Where to see it,** confirmed on each museum's own website.
- **Context across the site.** How the artist relates to the people, movements, places and art
  forms covered here, with links. Comparisons the site draws are framed as its own reading;
  claims of influence or teaching need a source.
- **The artist's own words,** when an interview gives them: a short quotation, copied from the
  source itself.
- **Sources beyond Wikipedia:** museum and gallery texts, interviews, catalogues, obituaries and
  serious press. Wikipedia can point to them, but it is never the only source for a fact, and its
  structure and wording are never followed.
- **Plain, specific writing:** names, dates, places and works; no praise without a reason.

## Rules

- **No fact without a source.** Each new fact is checked against two independent reliable
  sources, or one authoritative source: the artist's gallery, a museum's own collection page, a
  major newspaper or obituary. Wikipedia points to sources but is not one.
- **Where to see the work** names only holdings confirmed on the museum's own website. It says
  a museum holds the work, not that it is on display, unless the display is confirmed.
- **When the sources run out, stop.** A profile stays below target rather than being padded: no
  generic praise, no filler questions and answers. The sources log records why ("sources
  exhausted at 420 words"), and the test's exception list names the profile.
- **English first.** Translations follow the checked English with the same facts, the same links
  and the same number of facts lines.
- **Sources log.** `data/sources/<slug>.md`, one line per new fact with its URLs. It is not
  published; it is there for review and for the next update.
- **Honest dates.** An expanded profile's `updated` date moves to the day it goes live, which
  updates the sitemap's `lastmod` and the schema's `dateModified`. It is a real change, so this is
  not fake freshness.

## What each profile gets

- **Full profiles (49): expand to the full target.** Most need 200–350 more words, and the "where
  to see the work" section supplies part of that. Seven are already at 400–501 words.
- **Short profiles of artists (47): a source check splits them.**
  - **Promote to full (26, provisional):** artists with 10,000+ yearly views or articles in 11+
    Wikipedias. Marked † in the batches below.
  - **Enrich and keep short (21):** to 300+ words. The source check moves any of them up to full
    when the material is there. That is likely for well-documented names such as James Barnor,
    Wael Shawky, Youssef Nabil and Hassan Hajjaj. Moves are recorded in this file.
- **Short profiles of people known mainly for something else (14): enrich and keep short**
  (decided 27 October). Art is one part of a career known for writing, politics, television or
  film. Expand the art part to 300+ words, and don't turn these pages into general biographies,
  which would drift off the site's subject.

## Batches

Ten pages a batch, highest demand first. Each batch goes live in all five languages at once.

**Batch 0: code, before any writing. Done 27 October 2026.**

- `src/content/expansion.ts`: the targets, the frozen list of the 110 profiles written before
  them, and `EXPANSION_BATCHES`. A batch lists its date, the profiles it expanded and the articles
  it linked to them; `catalog.ts` moves their `updated` dates to the batch's date.
- Content tests:
  - every profile meets its target unless it was written before the targets and no batch has
    expanded it yet, so no new profile can ship below target;
  - every translation keeps at least 85% of its English word count (70% in Arabic).
- `data/sources/`, one file per expanded profile.
- The rollout plan, `roster.ts` and the README describe the targets.

Promoted profiles become `kind: 'full'` in `roster.ts` in their own batch, with hand-written facts
in every edition and links from at least three other articles (a test checks both).

**Batch 1: pilot.** Ibrahim Mahama, João Silva, Vladimir Tretchikoff, Ladi Kwali, Twins
Seven-Seven, Misan Harriman†, Leon Botha†, Dan Eldon†, Sharon Dede Padi†, Bruno Catalano†.

Done 27 October 2026: the nine full profiles run 600–690 words. Leon Botha moved to "enrich and
keep short" (312 words): reliable sources cover his life in about 450 words, so a full profile
would have needed padding. Tretchikoff's facts box had an outdated auction record, now corrected.
Each promoted profile gained links from three related articles, translated in all five
languages.

Before the pilot goes live, export Search Console's Page indexing report as a baseline. Four
weeks after, compare the pilot's 50 URLs (ten profiles in five languages) with the profiles not
yet touched:

- **Go ahead** if at least 70% of the pilot is indexed and it does better than the untouched
  profiles.
- **Otherwise,** rethink before publishing more.

Writing batch 2 can overlap the wait, as in the rollout plan.

**Batch 2.** Kevin Carter, William Kentridge, Ken Oosterbroek, Farouk Hosny, Yinka Shonibare,
Baya, El Anatsui, Njideka Akunyili Crosby, Zanele Muholi, Marlene Dumas, Lubaina Himid.

Written 27 October 2026 on the branch `batch-2-profiles` and published the same day. All eleven were already full profiles and now run 602–722 words in English. The source check
corrected several things the old pages had wrong, and the sources logs in `data/sources/` record each:
Ken Oosterbroek died nine days (not eleven) before the election and his birth year is 1962; Zanele
Muholi's *Somnyama Ngonyama* props were scouring pads, latex gloves and tyres (no clothes pegs in the
sources); Marlene Dumas's retrospective ran at MOCA from June 2008 and at MoMA from December 2008,
and her auction record is now *Miss January* (2025). Set the batch's `date` in
`src/content/expansion.ts` to the day it goes live, then do the four closing steps below.

**Batch 3.** Mahmoud Mokhtar, Esther Mahlangu, Greg Marinovich, Wangechi Mutu, Mohamed Amin, Yto
Barrada, Ernest Cole, Hassan El Glaoui, Chaïbia Talal, Sani Maikatanga†, Roger Ballen†.

Written 27 October 2026 on the branch `batch-3-profiles` (built on `batch-2-profiles`); published 27 October 2026.
Nine were already full profiles and now run 603–679 words in English. Roger Ballen was promoted to a
full profile (611 words, hand-written facts in five languages, linked from David Goldblatt, Southern
Africa and African photography). Sani Maikatanga stays short at 314 words: the only independent
coverage is the 2022 Global Landscapes Forum prize and the Argungu festival, and a full profile would
have needed padding. The source check corrected older pages: Mohamed Amin's page said his sound
recordist was killed in the 1991 blast (no source says so; removed); Greg Marinovich's Pulitzer
pictures were taken at the Nancefield hostel in Soweto in 1990; Ernest Cole's birthplace is Pretoria,
not Eastwood; Wangechi Mutu's Met facade commission ran into 2020, not to January 2020; Roger Ballen
has lived in Johannesburg since 1982, not "since the 1970s"; and Esther Mahlangu's Rolls-Royce
collaboration and "school at her home" rest on single sources and were removed.

**Batch 4.** Ousmane Sow, Ben Enwonwu, Austin Stevens†, Magdalene Odundo, Laetitia Ky†, Otobong
Nkanga, Irma Stern, Khadija Saye†, Sam Nzima, Ibrahim El-Salahi, Mahmoud Saïd.

Written 27 October 2026 on the branch `batch-4-profiles` (built on `batch-3-profiles`); published 27 October 2026.
Eight were already full profiles and now run 602–653 words in English
(Sow 602, Enwonwu 650, Odundo 603, Nkanga 653, Stern 608, Nzima 603, El-Salahi 636, Saïd 607).
Khadija Saye was promoted to a full profile (657 words, hand-written facts in five languages, linked
from Misan Harriman, African photography, African art fairs and biennales and African women
artists). Laetitia Ky (321 words) and Austin Stevens (307) stay short: the independent coverage
runs out at about 300 words. The source check corrected older pages: Enwonwu's *Tutu* is dated
1973–74; Sam Nzima was born on 8 August 1934 in Lillydale; Mahmoud Saïd's auction record is *The
Whirling Dervishes* (1929, $2.55 million, October 2010), not *Les Chadoufs*, and he was born and
died on 8 April; Otobong Nkanga's foundation claim about an art space in Athens rests on one
source and was removed; Laetitia Ky's "reached millions" and Austin Stevens's cobra bite and
conservation motive were removed as unsourced. Austin Stevens's record is 107 days in most sources
and 170 in one, and the page says so.

**Batch 5.** David Goldblatt, M'hamed Issiakhem, Mahi Binebine, Afewerk Tekle, Hussein Shariffe†,
Chéri Samba, Malick Sidibé, Amoako Boafo, Bruce Onobrakpeya†, Leila Alaoui†, Seyni Awa Camara†.

Written and published on `main` on 27 October 2026. These pages started well short of the targets (170–390
words), so each needed more verified material than the earlier batches. Seven full profiles now run
611–690 words in English (Goldblatt 690, Issiakhem 634, Binebine 633, Tekle 611, Samba 628, Sidibé 677,
Boafo 686). Hussein Shariffe (341), Bruce Onobrakpeya (316), Leila Alaoui (321) and Seyni Awa Camara (364)
stay short; none was promoted.
The source check corrected older pages: Goldblatt's page said he worked in a "clothing shop" and that
the KwaNdebele commuters were photographed "through the night" (the sources say a men's wear store and
do not say night); Issiakhem's page said he "died of cancer" and designed banknotes "from 1965" (neither
sourced) and its prize was a Golden Lion; Shariffe's page named the Slade and Victor Musgrave (not
confirmed) and the 1989 coup (sources say late 1980s); Boafo's page placed his childhood in Osu (not
found), dated the Dior collaboration to 2020 (it is Spring/Summer 2021) and said Wiley "encouraged
collectors" in 2019 (the sources say Wiley found him on Instagram); Alaoui's page gave her birthplace and
schooling (not confirmed); Camara's page said a London memorial exhibition was planned (not found).
Sidibé's birth year is given as 1935 or 1936 and the studio year as 1958, 1960 or 1962, because
sources disagree.

**Batch 6.** Malangatana, Adam Henein, Seydou Keïta, Hussein Bicar, Adel Abdessemed†, Inji
Aflatoun, Skunder Boghossian†, Ghada Amer, George Lilanga†, Romuald Hazoumè†, Dumile Feni†.

Written and published on `main` on 28 October 2026. Six full profiles now run 603–658 words in English
(Malangatana 603, Henein 628, Keïta 658, Bicar 605, Aflatoun 604, Amer 609). Adel Abdessemed (348), Skunder
Boghossian (312), George Lilanga (432), Romuald Hazoumè (378) and Dumile Feni (343) stay short; none was
promoted. The source check corrected older pages: Henein's page said he lived in Paris for twenty-five years
and that the Sphinx work began in 1989 without noting that sources give 1996 or 1998 as the end; Keïta's
official-photographer date is 1962 in one source and 1963 in another, and his birth year is 1921 or 1923;
Bicar's page said he became a professor at the Faculty of Fine Arts in Cairo (accounts of his teaching
conflict) and gave his birth year as 1913 where two sources say 1912; Aflatoun's page said she was educated
at the French Lycée (not confirmed) and gave her release as July 1963 (Al Jazeera says 1962); Abdessemed's
page said *Coup de tête* was removed "within weeks" and first shown at the Centre Pompidou (neither
confirmed); Boghossian's page said he moved to the United States in 1969 (not confirmed); Hazoumè's page
said he took part in documenta 12 (no source) and described his upbringing (not found); Feni's page said he
grew up in the Eastern Cape and was largely self-taught (sources say he trained at the Jubilee Art Centre),
and its *African Guernica* entry now carries the Museo Reina Sofía show of 2026; Malangatana's arrest date
and the length of his imprisonment differ between sources and the page says so.

**Batch 7.** Kwame Akoto-Bamfo†, Nnenna Okore†, J. H. Pierneef†, Uche Okeke†, Aina Onabolu†,
Samuel Fosso†, Effat Nagy†, Mohammed Khadda, Peter Magubane, Farid Belkahia.

Written and published on `main` on 28 October 2026 (ten profiles, not eleven). Mohammed Khadda (614),
Peter Magubane (614) and Farid Belkahia (621) now run over 600 words in English. Kwame Akoto-Bamfo (346),
Nnenna Okore (321), J. H. Pierneef (332), Uche Okeke (333), Aina Onabolu (309), Samuel Fosso (431) and
Effat Nagy (374) stay short; none was promoted. The source check corrected older pages: Akoto-Bamfo's
page said he was refused a US visa (no source); Nnenna Okore was born in Australia, not Nigeria, and holds
an MA (2004) and an MFA (2005), not one master's degree; Pierneef's page said he worked as a librarian
(not found); Okeke's Zaria and Nsukka dates are now sourced, with the Asele Institute dated 1958 or 1959;
Onabolu's page dated Kenneth Murray's appointment to 1927 (not confirmed) and Paris-then-London study
to the early 1920s (the certificate is 1920–22); Fosso's *Tati* series is 1997 in Britannica and 1994
in a Paris Photo programme; Effat Nagy's page said she studied in Rome only and described zar
ceremonies (not found); Khadda's page said he began in a Mostaganem print shop (the source says Aïn
Séfra in 1944), dated *Éléments pour un art nouveau* to 1972 (a 1964 essay is the first of three) and
the Google Doodle to 2019 (it is March 2020); Magubane's Drum start is 1954 or 1955 depending on the
source; Belkahia's *Présence plastique* year (1969) is not confirmed and the team's arrival dates
differ between Tate and a French catalogue.

**Batch 8: enrich, keep short (smaller edits).** Hassan Hajjaj, Boniface Mwangi, Nzante Spee, Amon
Kotei, Kofi Antubam, Mohamed Mrabet, Augustus Washington, Bachir Yellès, Anna Boghiguian, Chéri
Chérin, Mohamed Hamidi, Coert Steynberg, Anton Hammerl, Wael Shawky, James Barnor, Zwelethu
Mthethwa, Youssef Nabil, Zoubeir Turki, eL Seed, Mohamed Maradji, Ahmed Umar.

Written and published on `main` on 28 October 2026. All 21 stay short, between 322 and 425 words in
English, each with a "How to look" paragraph (the site's own reading) and, where sources allow, a
"Where to see the work" section; none was promoted. The source check corrected older pages: Hajjaj's
move to London is 1973 in one profile and 1975 in another, and his museum shows are worded as one
profile's list; Mwangi's CNN award is 2008 and 2010, and PAWA254 is dated 2010 or 2012; Spee's
training dates (Nigeria 1976 to 1979, Abidjan to 1982), his Bastos Prize (1984) and place of death
(Stockton) are sourced; Kotei's birth and death dates and the Grand Medal (7 March 1997) are sourced
and accounts of the final approval are shown as differing; Antubam's birth year (1922 or 1923) and
place of death are shown as uncertain; Mrabet's unconfirmed 1969 date for *The Lemon* was removed;
Washington's "senator" was dropped (he was Speaker of the House, 1865 to 1869); Yellès's directorship
is dated from one biography and an unconfirmed museum holding was left out; Boghiguian's *The Salt
Traders* was left out as unconfirmed; Chérin's Cartier show and Landry Mulala link were dropped;
Steynberg's "later abstraction" was dropped; Hammerl's page no longer says his passport was held or
that the ICC dropped the case; Shawky's Mecca childhood was removed; Barnor's colour laboratory is
now "helped found", with the 1969 Agfa-Gevaert return; and Mthethwa, Nabil, Turki, eL Seed, Maradji
and Umar gained sourced education, exhibitions and collection details, with differences between
sources stated.

**Batch 9: known mainly for something else (smaller edits).** W. E. B. Du Bois, Leni Riefenstahl,
Foday Sankoh, Hamza Yassin, Ntare Mwine, Breyten Breytenbach, Frank Edoho, TY Bello, Caleb
Azumah Nelson, Caleb Femi, Mahjoubi Aherdane, Rabah Driassa, Tahar Ben Jelloun, Farida of Egypt.

**Every batch ends the same way:**

1. Tests, build and crawl pass.
2. Deploy.
3. Run `npm run indexnow --` with its paths.
4. Request indexing for its English pages, at most ten a day.

## Size

- **English:** about 27,000 new words at the minimum targets (full profiles 12,200, promotions
  11,000, enriched short profiles 3,900), and likely over 30,000 in practice.
- **With the four translations:** about 150,000 words, about half of what the site holds today
  (285,000 words across all languages).

## Measuring

- **Search Console, Page indexing:** the indexed share of each batch's URLs four weeks after it
  goes live.
- **"Crawled – currently not indexed":** should shrink.
- **Search Console, Performance:** impressions and clicks on expanded profiles, 28 days before
  against 28 days after.
- **Vercel Analytics:** page views of expanded profiles.
