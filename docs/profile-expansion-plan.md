# Artist profiles: expansion plan

**Status: proposed, 27 October 2026.** Word counts are for the English pages as of that date;
yearly views are from the first data run (October 2025 – September 2026, five Wikipedias).

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
content tests enforce them.

| Kind | Words | Must contain |
|---|---|---|
| Full | 500+ (about 600+ on the page) | Life and training; the work, with at least two named and dated works or series; recognition (exhibitions, prizes, collections); where to see the work; related artists |
| Short | 250+ | The kind of work, with one named work or series; at least one dated milestone; links to related pages |

Translations must stay within 85% of the English length in French, Spanish and Portuguese, and
70% in Arabic. Today the lowest are 94% (Portuguese) and 73% (Arabic), so the check only catches
a dropped paragraph.

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

- **Full profiles (49): expand to the full target.** Most need 100–250 more words, and the "where
  to see the work" section supplies much of that. Six are already at 400–499 words and El Anatsui
  is at 501; they mainly need that section.
- **Short profiles of artists (47): a source check splits them.**
  - **Promote to full (26, provisional):** artists with 10,000+ yearly views or articles in 11+
    Wikipedias. Marked † in the batches below.
  - **Enrich and keep short (21):** to 250+ words. The source check moves any of them up to full
    when the material is there. That is likely for well-documented names such as James Barnor,
    Wael Shawky, Youssef Nabil and Hassan Hajjaj. Moves are recorded in this file.
- **Short profiles of people known mainly for something else (14): enrich and keep short.** Art
  is one part of a career known for writing, politics, television or film. Expand the art part to
  250+ words, and don't turn these pages into general biographies, which would drift off the
  site's subject.

## Batches

Ten pages a batch, highest demand first. Each batch goes live in all five languages at once.

**Batch 0: code, before any writing.**

- Content tests:
  - the word targets, with a list of profiles not yet expanded that each batch shrinks, so no
    new profile can ship below target;
  - the translation-length check.
- Promoted profiles become `kind: 'full'` in `roster.ts`, with hand-written facts in every
  edition.
- A per-profile `updated` date for expanded profiles, like `REVISED_IN_WAVE` in `catalog.ts`.
- `data/sources/`.
- The rollout plan and `roster.ts` describe the targets above.

**Batch 1: pilot.** Ibrahim Mahama, João Silva, Vladimir Tretchikoff, Ladi Kwali, Twins
Seven-Seven, Misan Harriman†, Leon Botha†, Dan Eldon†, Sharon Dede Padi†, Bruno Catalano†.

Before the pilot goes live, export Search Console's Page indexing report as a baseline. Four
weeks after, compare the pilot's 50 URLs (ten profiles in five languages) with the profiles not
yet touched:

- **Go ahead** if at least 70% of the pilot is indexed and it does better than the untouched
  profiles.
- **Otherwise,** rethink before publishing more.

Writing batch 2 can overlap the wait, as in the rollout plan.

**Batch 2.** Kevin Carter, William Kentridge, Ken Oosterbroek, Farouk Hosny, Yinka Shonibare,
Baya, El Anatsui, Njideka Akunyili Crosby, Zanele Muholi, Marlene Dumas, Lubaina Himid.

**Batch 3.** Mahmoud Mokhtar, Esther Mahlangu, Greg Marinovich, Wangechi Mutu, Mohamed Amin, Yto
Barrada, Ernest Cole, Hassan El Glaoui, Chaïbia Talal, Sani Maikatanga†, Roger Ballen†.

**Batch 4.** Ousmane Sow, Ben Enwonwu, Austin Stevens†, Magdalene Odundo, Laetitia Ky†, Otobong
Nkanga, Irma Stern, Khadija Saye†, Sam Nzima, Ibrahim El-Salahi, Mahmoud Saïd.

**Batch 5.** David Goldblatt, M'hamed Issiakhem, Mahi Binebine, Afewerk Tekle, Hussein Shariffe†,
Chéri Samba, Malick Sidibé, Amoako Boafo, Bruce Onobrakpeya†, Leila Alaoui†, Seyni Awa Camara†.

**Batch 6.** Malangatana, Adam Henein, Seydou Keïta, Hussein Bicar, Adel Abdessemed†, Inji
Aflatoun, Skunder Boghossian†, Ghada Amer, George Lilanga†, Romuald Hazoumè†, Dumile Feni†.

**Batch 7.** Kwame Akoto-Bamfo†, Nnenna Okore†, J. H. Pierneef†, Uche Okeke†, Aina Onabolu†,
Samuel Fosso†, Effat Nagy†, Mohammed Khadda, Peter Magubane, Farid Belkahia.

**Batch 8: enrich, keep short (smaller edits).** Hassan Hajjaj, Boniface Mwangi, Nzante Spee, Amon
Kotei, Kofi Antubam, Mohamed Mrabet, Augustus Washington, Bachir Yellès, Anna Boghiguian, Chéri
Chérin, Mohamed Hamidi, Coert Steynberg, Anton Hammerl, Wael Shawky, James Barnor, Zwelethu
Mthethwa, Youssef Nabil, Zoubeir Turki, eL Seed, Mohamed Maradji, Ahmed Umar.

**Batch 9: known mainly for something else (smaller edits).** W. E. B. Du Bois, Leni Riefenstahl,
Foday Sankoh, Hamza Yassin, Ntare Mwine, Breyten Breytenbach, Frank Edoho, TY Bello, Caleb
Azumah Nelson, Caleb Femi, Mahjoubi Aherdane, Rabah Driassa, Tahar Ben Jelloun, Farida of Egypt.

**Every batch ends the same way:**

1. Tests, build and crawl pass.
2. Deploy.
3. Run `npm run indexnow --` with its paths.
4. Request indexing for its English pages, at most ten a day.

## Size

- **English:** about 18,000 new words at the minimum targets (full profiles 7,300, promotions
  8,400, enriched short profiles 2,200), and likely over 20,000 in practice.
- **With the four translations:** about 100,000 words, roughly a third of what the site holds
  today (285,000 words across all languages).

## Measuring

- **Search Console, Page indexing:** the indexed share of each batch's URLs four weeks after it
  goes live.
- **"Crawled – currently not indexed":** should shrink.
- **Search Console, Performance:** impressions and clicks on expanded profiles, 28 days before
  against 28 days after.
- **Vercel Analytics:** page views of expanded profiles.
