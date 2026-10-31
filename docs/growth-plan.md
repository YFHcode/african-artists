# AfricanArtists.com — growth and monetisation plan

*31 October 2026. Keyword data from Semrush (US database unless a market is named: UK, France,
Brazil, Portugal, Spain, Mexico, Egypt, Nigeria, South Africa), pulled the same day through the
Semrush connector — about 14,000 API units in all — plus the owner's Search Console export of
17 October. Earlier findings are in [competitor-research-2026-10.md](competitor-research-2026-10.md).*

**How to read the numbers.** *Volume* is average monthly searches. *KD* is Semrush's keyword
difficulty, 0–100: under 30 is realistic for a young site with good pages; 30–50 needs strong
pages and some links; over 60 needs real authority. Volumes are estimates — use them to rank
priorities, not to promise traffic.

---

## Contents

1. [Where we stand](#1-where-we-stand)
2. [Fix first](#2-fix-first)
3. [What to publish: the keyword map](#3-what-to-publish-the-keyword-map)
4. [The next 30 pages, in order](#4-the-next-30-pages-in-order)
5. [Improve what already exists](#5-improve-what-already-exists)
6. [Languages and markets: where the demand really is](#6-languages-and-markets-where-the-demand-really-is)
7. [Site structure and features](#7-site-structure-and-features)
8. [Authority and links](#8-authority-and-links)
9. [Trust](#9-trust)
10. [Monetisation](#10-monetisation)
11. [Seasonal calendar and 12-month roadmap](#11-seasonal-calendar-and-12-month-roadmap)
12. [Measurement](#12-measurement)
13. [Decisions only the owner can make](#13-decisions-only-the-owner-can-make)
14. [Appendix: standards for every new page](#14-appendix-standards-for-every-new-page)

---

## 1. Where we stand

| Measure | Now |
|---|---|
| Site | 945 pages across 5 languages: 15 art forms, 110 artist profiles, 7 guides, 6 movements, 10 music genres, 5 regions, 10 museums, artist lists by country and medium |
| Ranking keywords (US) | 89, almost all at positions 40–96 |
| Estimated organic visits (Semrush, US) | about 1 a month |
| Search Console, first week (8–14 October) | 22 clicks, 804 impressions; most clicks from France and Brazil (6 each), then the US (2) |
| Indexed hosts | 43 keywords rank on `africanartists.com`, 46 on `www.africanartists.com` — Google has two copies |
| Launched | October 2026 (first commit 7 October) |

Closest to page one: *hand woven kente cloth* #13 (170), *farouk hosny* #22, *amazwi contemporary
art* #27 (140), *ethio artist* #32 (140), *mohamed mrabet* #32, *south african photographer kevin
carter* #37 (5,400), *kwame akoto bamfo* #38, *moroccan artist* #40, *greg marinovich
photographer* #44, *pottery of africa* #48 (320).

**Competitors that matter**

| Site | Keywords | Visits/month (Semrush) | What wins for them |
|---|---|---|---|
| contemporary-african-art.com | 3,329 (US) | ~9,500 | One plain explainer per broad topic, many at #1: African patterns, African musical instruments, traditional African clothing, traditional crafts, Kuba cloth, African pottery, ancient African art; #5–6 for African masks. Linked from Wikipedia, LibreTexts, universities, The Conversation, Smithsonian Magazine. |
| momaa.org | 5,800 (US), 13,400 worldwide | 7,100 (US), 17,200 worldwide | Museum directory (#1–5 for national museums), "50 most influential female artists", African printmaking (#1). Most of its traffic is off topic (Mona Lisa, calculators); many of its top links look bought or spammy. |

**What this means.** A site launched this month sits at positions 40–96; that is normal. Three
things move it: (1) many more pages on topics people actually search, where difficulty is low;
(2) authority — links and brand searches; (3) technical hygiene, starting with the duplicate host.
The biggest gap is not artists but *culture explainers* — instruments, symbols, textiles, dress —
the topics contemporary-african-art.com wins with old, simple pages.

The head terms in the domain name — *african art* 5,400 (KD 41; UK 2,400, South Africa 1,300) and
*african artists* 1,000 (KD 27) — come last: they follow authority, and every cluster below feeds
them.

---

## 2. Fix first

| # | Task | Who | Why |
|---|---|---|---|
| 1 | **Vercel → Domains:** make `africanartists.com` primary and `www` redirect to it (308). Test: `https://www.africanartists.com/art-forms/kente-cloth` must land on `https://africanartists.com/art-forms/kente-cloth`. | Owner | Google ranks two copies of each page and splits their signals. |
| 2 | **Search Console** already runs (export of 17 October): check the property is a *Domain* property, so it covers both hosts, and resubmit `/sitemap.xml` after the redirect. Add **Bing Webmaster Tools** (it can import sites from Search Console); ping IndexNow after each release. | Owner | Data on real queries and clicks; faster indexing. |
| 3 | **Analytics and consent:** GA4 (ad networks ask for it) or a privacy-first tool plus GA4; a consent banner for EU readers (Google requires a certified consent platform for ads shown in the EEA and UK); update `/privacy`. | Owner + us | Needed before ads, and to measure anything. |
| 4 | **Quick-win retitles** (section 5): Cairo museum, mud cloth, masks, adinkra, kente, Kevin Carter. | Us | Pages already exist; titles miss the words people type. |
| 5 | **Rank tracking:** a Semrush Position Tracking project with ~150 keywords from this plan, if the subscription is kept; otherwise Search Console. | Owner decides | Know what works. |

---

## 3. What to publish: the keyword map

Eleven clusters, ordered by priority. Each becomes a hub page plus child pages that link to each
other and to the existing site.

### 3.1 Musical instruments — priority 1 (new collection `/instruments`)

The largest low-difficulty gap, and it sits next to our music genres. contemporary-african-art.com
is #1 for *african musical instruments* with a single old page.

| Query | Volume | KD | Note |
|---|---:|---:|---|
| marimba | 40,500 | 32 | Page on its African roots (Chopi timbila, Zimbabwean marimba bands) |
| kalimba | 33,100 | 23 | Today's common name for thumb pianos of the mbira family; strongly commercial |
| djembe | 14,800 | 18 | Plus *djembe drum* 8,100 (KD 35) |
| mbira | 4,400 | 47 | |
| kora instrument | 3,600 | 30 | |
| balafon | 2,400 | 25 | Plus *african xylophone* 1,000 (KD 16) |
| talking drum | 2,400 | 28 | |
| african drums | 2,400 | 41 | Plus *types of african drums* 210 (KD 12) |
| african musical instruments / african instruments | 2,400 / 2,400 | 28 / 28 | The hub |
| shekere | 1,900 | 18 | |
| ngoni | 1,300 | 45 | |
| djembe for sale | 1,300 | 28 | Buying intent |
| udu drum | 590 | 9 | |
| krar | 480 | 30 | Ethiopian lyre; pair with the masenqo |
| how to play djembe | 260 | 18 | |

Other markets: **Mexico** kalimba 33,100, marimba 18,100, djembe 1,300 · **Brazil** kalimba 12,100,
marimba 8,100, *instrumentos musicais africanos* 4,400, *tambor africano* 1,300, *djembê* 880 ·
**France** *djembé* 6,600, *balafon* 4,400, *instruments africains* 1,000, *instrument de musique
africain* 720, *tambour africain* 720, *kora* 22,200 (mixed meanings) · **Spain** marimba 5,400,
kalimba 3,600, djembe 1,600 · **UK** kalimba 5,400 (KD 17), djembe 4,400 (KD 30), *african musical
instruments* 720 (KD 16).

**Pages:** hub *African musical instruments*; djembe; kalimba; mbira (and "kalimba vs mbira");
kora; balafon; talking drum; marimba; shekere; ngoni; udu; krar and masenqo; later valiha, xalam,
goje, and *Types of African drums*.
**Template:** what it is (answer first) · origins and history (sourced) · how it is made · how it
is played (embedded performances) · great players (link to musician pages) · where to hear it ·
choosing one (buying guide on commercial pages) · questions · sources.

### 3.2 Symbols and their meanings — priority 1 (new collection `/symbols`)

Very large demand, much of it in Brazil, Mexico and Egypt.

| Query | Volume | KD | Note |
|---|---:|---:|---|
| ankh | 49,500 | 31 | Plus *ankh symbol* 9,900 (KD 27) |
| eye of horus | 40,500 | 50 | Easier in other languages (below) |
| sankofa | 12,100 | 47 | Plus *sankofa symbol* 1,300 (KD 21) |
| adinkra symbols | 9,900 | 31 | **Page exists** — plus *adinkra symbols and meanings* 2,400 (KD 21) |
| gye nyame | 2,400 | 19 | Plus *gye nyame symbol* 880 (KD 25) |
| african symbols | 1,900 | 28 | The hub; plus *african symbols and meanings* 480 |
| nsibidi | 1,000 | 36 | Nigerian ideographic script |
| african tattoo | 720 | 26 | Handle with care: sourced meanings only |
| akan symbols | 320 | 25 | |

Other markets: **Brazil** *olho de horus* 14,800, sankofa 12,100 (KD 29), adinkra 6,600, ankh 6,600,
*símbolos adinkra* 2,900 · **Mexico** *ojo de horus* 18,100 (KD 33), ankh 2,900, sankofa 1,000 ·
**Spain** *ojo de horus* 6,600, ankh 2,400 · **France** ankh 4,400, *croix d'Agadez* 880, sankofa 590 ·
**Egypt (Arabic)** *مفتاح الحياة* (ankh) 6,600, *عين حورس* 6,600 · **UK** ankh 8,100, *adinkra symbols*
2,400, sankofa 1,600.

**Pages:** hub *African symbols and their meanings*; a full **adinkra dictionary** (each symbol
drawn as our own SVG, with name, meaning and proverb, all sourced; a printable chart); sankofa;
gye nyame; nsibidi; ankh; eye of Horus; Tuareg crosses (*croix d'Agadez*); Amazigh signs (the yaz);
Ethiopian crosses.

### 3.3 Textiles, dress and adornment — priority 1

Huge demand, low difficulty in places, and the most natural home for affiliate revenue.

| Query | Volume | KD | Note |
|---|---:|---:|---|
| dashiki | 22,200 | 15 | |
| ankara | 22,200 | 52 | Plus *ankara fabric* 2,900 (KD 47) |
| kente cloth | 12,100 | 47 | **Page exists** |
| kanga | 12,100 | 49 | Mixed meanings |
| gele | 2,900 | 38 | Head-tie; plus *african head wrap* 590 |
| agbada | 2,900 | 32 | |
| african patterns | 2,400 | 26 | Competitor is #1 |
| boubou | 2,400 | 27 | **France 9,900 (KD 23)** |
| african jewelry | 2,400 | 27 | Plus *african beads* 1,300 (KD 21), *maasai jewelry* 260 (KD 2), *zulu beadwork* 210 (KD 6) |
| african fabric | 1,900 | 31 | Plus *african print fabric* 1,000 |
| kente stole | 1,900 | **5** | CPC $2.74; peaks April–May (graduation) |
| vlisco | 1,900 | 38 | The wax-print story |
| african wedding attire | 1,900 | 33 | |
| traditional african clothing | 1,600 | 28 | A hub |
| barkcloth | 1,300 | 18 | |
| mud cloth / mudcloth | 1,300 / 720 | 12 / 5 | **Page exists** — retitle (section 5) |
| aso oke / adire | 1,000 / 1,000 | 27 / 36 | Yoruba cloths |
| kuba cloth | 880 | 33 | Plus *where is kuba* 3,600 (KD 27) |
| kitenge | 720 | 41 | |
| zulu / nigerian traditional attire, ghanaian traditional clothing | 390 each | 13 / 28 / 25 | |
| kikoi | 320 | 5 | |
| shweshwe | 260 | 23 | |

Other markets: **France** *boubou* 9,900, *tissu wax* 2,400, *pagne africain* 1,900, *tissu africain*
1,900, *wax tissu africain* 1,000, *motif africain* 720 · **Brazil** *roupas africanas* 4,400,
*tecido africano* 2,400 (KD 10), *turbante africano* 2,400, *capulana* 2,400, *estampa africana* 1,900
· **Portugal** *capulana* 1,300 · **Nigeria** *aso oke* 3,600, *adire* 3,600, *agbada* 2,900, *gele*
2,400, *aso ebi* 2,400 · **South Africa** *shweshwe* 2,900 (KD 24) · **UK** *kente cloth* 2,900 (KD 27 —
easier than in the US), dashiki 2,400, *african patterns* 1,900.

**Pages:** hubs *African patterns* and *Traditional African clothing*; dashiki; agbada; boubou; gele
and head wraps; aso oke; adire; aso ebi; wax print and ankara (with Vlisco); kanga and kitenge; kente
stoles; Kuba cloth; barkcloth; African beads and jewellery (built on the existing beadwork page);
shweshwe; capulana.

### 3.4 Museums and art travel — priority 1–2

| Query | Volume | KD | Note |
|---|---:|---:|---|
| grand egyptian museum | 14,800 | 68 | Hard in English; **135,000 in Arabic (Egypt, KD 69)** |
| jardin majorelle | 4,400 | 49 | **France 22,200 (KD 51)** — with the YSL Museum |
| national museum of african art | 3,600 | 33 | Smithsonian, Washington |
| goree island | 3,600 | 42 | Plus *house of slaves* 1,300 (KD 44); France *Gorée* 1,600 |
| egyptian museum cairo | 2,400 | 85 | Arabic *المتحف المصري* 18,100 (KD 43) |
| things to do in dakar | 1,600 | 20 | An art lover's Dakar |
| african art museum | 880 | 47 | |
| nike art gallery (Lagos) | 720 | 48 | **Nigeria 14,800 (KD 55)** |
| ysl museum marrakech | 590 | 43 | France 2,400 (KD 41) |
| nairobi national museum | 390 | 49 | Plus *national museum of kenya* 320 |
| luxor museum | 390 | 34 | Arabic 720 |
| things to do in lagos | 390 | 18 | |
| mowaa / museum of west african art | 140 / 110 | 47 / 35 | Benin City |
| johannesburg art gallery | 140 | 48 | |
| liberia national museum, uganda museum, macaal, norval foundation | 110 each | 29–44 | |
| national gallery of zimbabwe, iziko south african national gallery | 90 each | 22 / 53 | |

Our current museum pages, for comparison: national museum of Ethiopia 480 + 390, Zeitz MOCAA
480 + 390, national museum of Ghana 210 + 40, national museum Lagos 170 + 110, Benin City 140.
Their home markets search far more: *zeitz mocaa* 8,100 in South Africa (KD 51), *national museum
lagos* 880 in Nigeria. **South Africa:** *norval foundation* 2,400 (KD 47). **France:** *musée du quai
Branly* 27,100 (KD 51) — worth a page in French. **Brazil:** *museu afro brasil* 6,600. **Egypt:**
Mokhtar Museum 1,000, Mohamed Mahmoud Khalil Museum 320.

**Pages:** museums batch 2 (Gorée, Smithsonian NMAfA, Nike Art Gallery — a gallery, but visited
like a museum — Nairobi, Luxor, MOWAA, Johannesburg Art Gallery, Norval Foundation, Liberia,
Uganda, MACAAL, YSL Museum Marrakech, Grand Egyptian Museum); **art-travel city guides** (Dakar,
Marrakech, Cape Town, Lagos, Accra, Addis Ababa, Cairo, Nairobi); a **Dak'Art 2026 visitor guide**
(the biennale runs 19 November–19 December 2026).

### 3.5 Artists — new profiles and the ones to strengthen

New profiles with real demand (US):

| Artist | Volume | KD | Link to Africa |
|---|---:|---:|---|
| Kehinde Wiley | 22,200 | 53 | American, Nigerian father; founded the Black Rock residency in Dakar — *owner's call (diaspora scope)* |
| Julie Mehretu | 8,100 | 49 | Born in Addis Ababa |
| Toyin Ojih Odutola | 1,900 | 43 | Born in Ife, Nigeria |
| Chris Ofili | 1,600 | 28 | British, Nigerian parents — **UK 2,900 (KD 28)** |
| Lynette Yiadom-Boakye | 1,600 | 36 | British, Ghanaian parents — UK 1,600 |
| Michael Armitage | 720 | 39 | Born in Nairobi |
| Rotimi Fani-Kayode | 590 | 28 | Born in Lagos |
| Lalla Essaydi | 480 | 30 | Moroccan |
| Pieter Hugo | 480 | 38 | South African photographer |
| Kader Attia | 390 | 28 | French-Algerian |
| Mary Sibande | 260 | 35 | South Africa |
| Aboudia, Omar Victor Diop, Ouattara Watts, Cyrus Kabiru | 210 each | 18–31 | Côte d'Ivoire, Senegal, Côte d'Ivoire, Kenya |
| Gerard Sekoto | 170 | 28 | South Africa — **1,900 searches there (KD 33)** |
| Susanne Wenger, Sokari Douglas Camp | 140 each | 27 / 14 | Osogbo; Nigeria/UK |

Arabic (Egypt): **Gazbia Sirry** *جاذبية سري* 880 (KD 31); **Abdel Hadi El-Gazzar** 320 (KD 22).

Existing profiles with the most demand — strengthen first: Kevin Carter 5,400 (we are #37–88);
Wangechi Mutu 4,400; El Anatsui, Marlene Dumas, William Kentridge, Njideka Akunyili Crosby 3,600
each; Yinka Shonibare 2,900; Zanele Muholi 2,400; Magdalene Odundo 1,900; Seydou Keïta 1,600
(France 2,400); Ibrahim Mahama 1,300; Amoako Boafo 1,000. **France:** Ousmane Sow 1,900, *Baya
peintre* 1,300. **Egypt (Arabic):** Farouk Hosny 8,100, Mahmoud Mokhtar 1,900, Mahmoud Saïd 1,300,
Hussein Bicar 1,000. **UK:** Yinka Shonibare 5,400 (more than in the US), El Anatsui 2,400.
**South Africa:** Esther Mahlangu 4,400, William Kentridge 3,600, Irma Stern 2,400, Kevin Carter 880.
**Nigeria:** Ben Enwonwu 880.

### 3.6 Music — genres and legends — priority 2

The domain name covers musicians; legends have steady demand and moderate difficulty. Current chart
stars are out of reach (Tyla KD 91, Burna Boy 90, Davido 89).

New genre pages:

| Genre | Volume | KD | Other markets |
|---|---:|---:|---|
| african music (hub) | 3,600 | 44 | France 1,600, Brazil 1,600 |
| kizomba | 3,600 | **9** | Portugal 3,600, Brazil 2,400 |
| gqom | 880 | 37 | |
| kuduro | 720 | 28 | Brazil 2,900 |
| soukous / ethio-jazz | 480 each | 31 / 35 | |
| desert blues, makossa | 390 each | 30 / 40 | |
| kwaito | 320 | 40 | **South Africa 1,900** |
| juju music, mbaqanga, fuji music | 260 / 210 / 210 | 35 / 40 / 28 | |
| coupé-décalé, bongo flava, taarab, benga music | 170 / 170 / 140 / 110 | 37 / 36 / 20 / 26 | |
| mbalax | not checked | | France 320 (KD 36) |

Legends (profiles): Fela Kuti 18,100 (KD 72) · Miriam Makeba 6,600 (60) · Angélique Kidjo 5,400 (77)
· Tinariwen 4,400 (73) · Ladysmith Black Mambazo 4,400 (46) · Hugh Masekela 3,600 (62) · Cesária
Évora 2,900 (67) · Mulatu Astatke 2,900 (60) · Salif Keita 1,900 (43) · Koffi Olomide 1,900 (45) ·
Ali Farka Touré 1,600 (52) · King Sunny Adé 1,300 (33) · Manu Dibango 1,300 (41) · Oumou Sangaré
1,300 (41) · Youssou N'Dour 1,300 (69) · Papa Wemba 880 (35) · Orchestra Baobab 590 (46) · Toumani
Diabaté 480 (47) · Franco Luambo 320 (33). Fela Kuti is searched 14,800 times a month in Nigeria too.

Existing genre pages and their demand: amapiano 9,900 (KD 53), afrobeats 8,100 (50), afrobeat 3,600
(48), highlife 3,600 (53), gnawa 590 (34), raï 590 (30; France 1,900; Egypt *الراي* 2,400),
Congolese rumba 260 (32; France 880). Home markets: amapiano 18,100 in South Africa and 4,400 in
the UK; afrobeats 9,900 in Nigeria and 2,900 in the UK; highlife 1,600 in the UK.

### 3.7 Heritage sites and ancient art — priority 2–3

| Query | Volume | KD |
|---|---:|---:|
| great zimbabwe | 9,900 | 61 |
| lalibela | 8,100 | 61 |
| egyptian art | 8,100 | 40 |
| kingdom of kush | 6,600 | 68 |
| great mosque of djenne | 3,600 | 40 |
| ancient egyptian art | 2,900 | 47 |
| nok culture | 1,900 | 36 |
| african architecture | 1,300 | 50 |
| ndebele (house painting 260, KD 23; art 210, KD 11 — South Africa 720) | 1,300 | 34 |
| ait benhaddou | 880 | 36 |
| ancient african art | 590 | 36 |
| timbuktu manuscripts | 480 | 46 |
| ife head (+ *ife bronze head* 210, KD 22) | 390 | 40 |
| golden stool / asante stool (Asante regalia) | 1,000 / 590 | 31 / 28 |
| nubian art, igbo ukwu, nok terracotta, aksum obelisk | 210–260 | 24–43 |

Other markets: **Brazil** *arte rupestre* **22,200** (our rock-art page needs a Portuguese title
that says it), *arte egípcia* 3,600 · **Mexico** *arte rupestre* 5,400, *arte egipcio* 4,400 ·
**Egypt** *النوبة* 2,900, *الفن المصري القديم* 1,600.

### 3.8 Culture and meaning — priority 3 (always through art)

| Query | Volume | KD | Angle |
|---|---:|---:|---|
| orisha | 14,800 | 42 | The orishas in Yoruba art: Osogbo, Susanne Wenger, the sacred grove |
| anansi | 12,100 | 42 | Anansi in Akan storytelling and the kente legend |
| afrofuturism | 9,900 | 49 | Afrofuturism in African art (*afrofuturism art* 590, KD 27) |
| african mythology / african proverbs | 2,400 / 2,400 | 35 / 33 | Proverbs behind adinkra and textile names |
| yoruba gods / african folktales | 1,000 / 880 | 31 / 44 | |

Other markets: Brazil *cultura africana* 12,100, *orixás* 8,100 · Mexico *orishas* 6,600 · Spain 3,600 ·
France *proverbes africains* 1,300.

### 3.9 Buying and collecting — priority 2 (the commercial cluster)

| Query | Volume | KD | CPC |
|---|---:|---:|---:|
| moroccan rugs | 4,400 | 45 | $1.19 |
| berber rug | 1,600 | **13** | $1.02 |
| beni ourain rug | 1,300 | 37 | $1.23 |
| djembe for sale | 1,300 | 28 | $0.35 |
| african beads | 1,300 | 21 | $0.37 |
| african baskets / bolga basket | 1,000 / 880 | 25 / **10** | $0.73 / $0.38 |
| african wall art | 880 | 16 | $0.39 |
| african decor / african home decor | 720 / 590 | **7** / 13 | |
| african masks for sale | 590 | 19 | $0.41 |
| african art for sale | 320 | 33 | |
| african art gallery | 210 | 35 | $0.99 |

France: *tapis berbère* 2,900 (KD 28), *tapis beni ouarain* 590 (KD 7), *estimation art africain* 110
(CPC $1.24 — people with objects to value). UK: *berber rug* 2,400 (KD 13), *moroccan rugs* 1,300
(KD 14), *african wall art* 320 (KD 9). Semrush gives CPC in US dollars for every market.

### 3.10 Learning and seasonal — priority 2 (deadline: mid-January)

| Query | Volume | KD | When |
|---|---:|---:|---|
| famous black artists | 2,900 | 36 | February, about 5× a usual month |
| african american artists | 1,900 | 36 | February, about 7× |
| kwanzaa symbols | 1,900 | 43 | December |
| african printmaking | 1,000 | 16 | February, about 4× (MoMAA #1) |
| black history month art | 880 | 14 | January–February only; *…art projects* 390 |
| africa day | 720 | 31 | May (25 May) |
| **UK:** black history month | 18,100 | 38 | **October** — the UK month; *black history month art* 210 and *famous black artists* 260 peak then too |

Children's and lesson-plan queries are tiny (*african art for kids* 10, *african mask craft* 30):
serve teachers with **printables and a teaching pack**, not separate pages. Questions people ask
about masks (US): *what was the primary role of masks in sub-Saharan Africa*, *how to draw/make an
African mask*, *what are African tribal masks used for*, *why were African masks made*, *are African
masks evil / demonic / dangerous* — a sourced section on misconceptions would be rare and useful.

### 3.11 Country art overviews — priority 3

We have *[country] artists* lists and five region pages (the West Africa page already targets
*west african art*, 390 / KD 31), but no *[country] art* overviews.

| Query | US volume | KD | Elsewhere |
|---|---:|---:|---|
| egyptian art | 8,100 | 40 | Mexico *arte egipcio* 4,400 · Brazil *arte egípcia* 3,600 |
| ethiopian art | 1,000 | 26 | Page exists |
| moroccan art | 590 | 13 | |
| nigerian art | 590 | 29 | Nigeria 210 |
| south african art | 390 | 33 | South Africa 720 (KD 17) |
| kenyan art / somali art | 210 / 210 | 8 / 12 | |
| congolese / algerian / eritrean art | 140 each | 16 / 17 / 21 | MoMAA is #1 for *eritrean art* |
| ghanaian / zimbabwean / tunisian art | 90 each | 23 / 17 / 17 | |
| senegalese, cameroonian, mozambican, rwandan, zambian, tanzanian, ivorian, ugandan, malian, sudanese, angolan art | 0–50 | — | Too small: leave to the region pages |

**Write overviews for:** Egypt, Morocco, Nigeria, South Africa, Kenya, Somalia, then Congo, Algeria
and Eritrea. Each links to its artist list, museums and art forms.

**Country artist lists** (pages exist): *south african artists* 390 (KD 13) — **2,900 in South
Africa (KD 20)**; *nigerian artists* 390 (31); *ghanaian artists* 210 (20); *egyptian artists* 170
(33); *moroccan artists* 110 (14); *ethiopian artists* 110 (21); *ugandan artists* 110 (15);
*south african painters* 260 (19). Searches for "[country] artists" mostly return musicians, so
titles should say "painters, sculptors and photographers".

---

## 4. The next 30 pages, in order

| # | Page | Main query (US volume / KD) | Other markets | First languages | Earns from |
|---|---|---|---|---|---|
| 1 | Djembe | 14,800 / 18 (+ *djembe drum* 8,100) | FR 6,600 · UK 4,400 · ES 1,600 · MX 1,300 | EN FR ES PT | Instrument affiliate |
| 2 | Kalimba (live before the December peak, about 2×: gifts) | 33,100 / 23 | MX 33,100 · BR 12,100 · UK 5,400 · ES 3,600 | EN ES PT FR | Instrument affiliate |
| 3 | Mbira | 4,400 / 47 | BR 590 | EN FR PT | Affiliate |
| 4 | African musical instruments (hub) | 2,400 / 28 (×2) | BR 4,400 · FR 1,000 | all 5 | Ads |
| 5 | Adinkra dictionary (upgrade) + printable chart | 9,900 / 31 + 2,400 / 21 | BR 6,600 + 2,900 · UK 2,400 | all 5 | Email sign-ups, prints |
| 6 | Sankofa | 12,100 / 47 | BR 12,100 / 29 · UK 1,600 · MX 1,000 | EN PT ES FR | Ads, prints |
| 7 | Ankh | 49,500 / 31 | UK 8,100 · BR 6,600 · EG 6,600 · FR 4,400 · MX 2,900 | all 5 | Ads |
| 8 | Dashiki | 22,200 / 15 | UK 2,400 | EN FR | Fashion affiliate |
| 9 | Kora | 3,600 / 30 | FR 22,200 (mixed) | EN FR | Ads, affiliate |
| 10 | Balafon | 2,400 / 25 (+ *african xylophone* 1,000 / 16) | FR 4,400 / 23 | EN FR | Ads |
| 11 | Talking drum | 2,400 / 28 | — | EN FR | Ads |
| 12 | Dak'Art 2026 visitor guide | *things to do in dakar* 1,600 / 20 · *dakar biennale* 170 | FR | EN FR | Travel affiliate (time-bound) |
| 13 | African patterns (hub) | 2,400 / 26 | UK 1,900 · FR *motif africain* 720 | EN FR PT | Ads, prints |
| 14 | Traditional African clothing (hub) | 1,600 / 28 | BR *roupas africanas* 4,400 | EN PT FR | Affiliate |
| 15 | Gye Nyame | 2,400 / 19 (+ 880 / 25) | — | EN PT | Ads, prints |
| 16 | Teaching African art: a Black History Month pack | *black history month art* 880 / 14 | — | EN | Email list, teaching products |
| 17 | Famous Black artists from Africa and its diaspora | 2,900 / 36 (February) | — | EN | Ads |
| 18 | Julie Mehretu | 8,100 / 49 | — | EN FR | Ads |
| 19 | Toyin Ojih Odutola, Chris Ofili, Lynette Yiadom-Boakye, Michael Armitage | 1,900 / 1,600 / 1,600 / 720 | UK: Ofili 2,900 · Yiadom-Boakye 1,600 | EN | Ads |
| 20 | Boubou | 2,400 / 27 | **FR 9,900 / 23** | FR EN | Affiliate |
| 21 | Kente stoles: meaning and buying an authentic one | 1,900 / **5** (CPC $2.74) | — | EN | Affiliate (publish by March) |
| 22 | Agbada, gele, aso oke, adire, aso ebi | 2,900 / 32 · 2,900 / 38 · 1,000 / 27 · 1,000 / 36 | NG: aso oke 3,600 · adire 3,600 · agbada 2,900 · gele 2,400 · aso ebi 2,400 | EN | Affiliate |
| 23 | Wax print and ankara (with Vlisco) | *ankara* 22,200 / 52 · *african fabric* 1,900 / 31 | FR *tissu wax* 2,400 · *pagne* 1,900 | EN FR PT | Affiliate |
| 24 | Gorée Island and the House of Slaves | 3,600 / 42 + 1,300 / 44 | FR 1,600 | EN FR | Tours |
| 25 | Jardin Majorelle, the YSL Museum and MACAAL: Marrakech for art lovers | 4,400 / 49 + 590 / 43 | **FR 22,200 + 2,400** | FR EN | Tickets, tours |
| 26 | Smithsonian National Museum of African Art | 3,600 / 33 | — | EN | — |
| 27 | Kizomba | 3,600 / **9** | PT 3,600 · BR 2,400 | EN PT FR | Ads |
| 28 | Eye of Horus | 40,500 / 50 | MX 18,100 / 33 · BR 14,800 / 34 · ES 6,600 · EG 6,600 | ES PT AR EN | Ads |
| 29 | Amazigh (Berber) rugs: how to tell real from fake | *berber rug* 1,600 / 13 · *beni ourain rug* 1,300 / 37 | FR *tapis berbère* 2,900 / 28 · UK *berber rug* 2,400 / 13 | EN FR | Affiliate |
| 30 | African baskets (Bolga and Zulu) | 1,000 / 25 · *bolga basket* 880 / **10** | — | EN | Affiliate |

After these: shekere, ngoni, udu, krar, marimba; nsibidi, Tuareg crosses; Kuba cloth, barkcloth,
beads and jewellery, shweshwe; museums batch 2, led by the Nike Art Gallery (14,800 searches in
Nigeria); Gerard Sekoto (1,900 in South Africa); music genres and legends; Djenné, Nok, Great
Zimbabwe, Lalibela, the Golden Stool; Egyptian art; orishas in art; Anansi; country overviews.

---

## 5. Improve what already exists

| Page | Target query (US) | Now | Change |
|---|---|---|---|
| art-forms/adinkra-symbols | *adinkra symbols* 9,900 / 31; *…and meanings* 2,400 / 21 | #88 for *adinkra* | Full dictionary with our own drawings, proverb for each, printable chart; title "Adinkra Symbols and Their Meanings" |
| art-forms/kente-cloth | *kente cloth* 12,100 / 47 (UK 2,900 / 27); *ghana kente material* 1,000 / 21; *meaning* 720 / 36 | #13 for *hand woven kente cloth* | Named designs and colours (sourced), hand-woven vs printed, kente stoles, images |
| art-forms/african-masks | *african masks* 6,600 / 22; *traditional african masks* 2,400 / 17 | #59–78 | Types by people with freely licensed photos; uses; myths ("are masks evil?"); buying responsibly; title "African Masks: Types, Meanings and Uses" |
| art-forms/mudcloth | *mud cloth* 1,300 / 12; *mudcloth* 720 / 5; *what is mud cloth* 110 / 3 | #81 | Title "Mud Cloth (Bogolanfini): Meaning and History"; symbols; handmade vs printed |
| art-forms/african-pottery | 590 / **8** | #48 for *pottery of africa* | Images, techniques, potters (Ladi Kwali, Magdalene Odundo) |
| art-forms/benin-bronzes | 4,400 / 55 | #79 | Keep the return story current; plaque gallery |
| art-forms: textiles, sculpture, tingatinga, shona | 590 / 18 · 590 / 23 · 480 / 19 · 320 / 16 | — | Images and depth; all low difficulty |
| art-forms/african-rock-art | BR *arte rupestre* 22,200 | — | Portuguese title and summary that use *arte rupestre* |
| artists/kevin-carter | 5,400 / 48 | #37–88 | Deeper section on the 1993 photograph and its ethics; links from the Bang-Bang Club guide and photography pages |
| artists: Akunyili Crosby, Dumas, Keïta, Shonibare | 3,600 / 3,600 / 1,600 / 2,900 | #79–91 | Exhibitions, works, sourced quotations, freely licensed images |
| museums/museum-of-modern-egyptian-art | *egyptian museum of modern art* 110 vs 50 | — | Retitle to the form people search |
| music: amapiano, afrobeats, highlife | 9,900 / 8,100 / 3,600 | — | Listening guides, key artists (link musician pages), timelines |
| guides/african-women-artists | *famous female artists* 2,900 / 30 · *black female artists* 1,600 / 33 | — | Grow into a ranked list of 30+ names (MoMAA's list of 50 is #4 for *famous female artists*); aim at *black female artists* if the diaspora scope is approved |
| guides/how-to-buy-african-art | *african art for sale* 320 / 33 | — | Make it the hub of the buying guides (section 10.3) |
| artists/country/* | *south african artists* 390 / 13 (South Africa 2,900 / 20) · *nigerian artists* 390 / 31 · *ghanaian artists* 210 / 20 | — | Titles and intros that say "painters, sculptors and photographers" (section 3.11) |

---

## 6. Languages and markets: where the demand really is

| Edition | Biggest opportunities | Decision |
|---|---|---|
| **Portuguese** | Brazil dwarfs Portugal: *arte africana* 8,100 vs 110; *máscara africana* 9,900 vs 170; *sankofa* 12,100 vs 170; *cultura africana* 12,100 vs 140; also *kalimba* 12,100, *olho de horus* 14,800, *orixás* 8,100, *instrumentos musicais africanos* 4,400, *roupas africanas* 4,400, *museu afro brasil* 6,600, *arte rupestre* 22,200 | **Move the edition to Brazilian Portuguese** for new pages, then convert the top 20 existing ones. Keep the `pt` hreflang; switch `og:locale` to `pt_BR`. Portugal keeps a few strong topics: *kizomba* 3,600, *capulana* 1,300, *Malangatana* 590. |
| **Spanish** | Mexico dwarfs Spain: *kalimba* 33,100, *marimba* 18,100, *ojo de horus* 18,100, *orishas* 6,600, *arte rupestre* 5,400, *arte egipcio* 4,400, *máscaras africanas* 1,300 | Write neutral Latin American Spanish. |
| **French** | *musée du quai Branly* 27,100, *jardin Majorelle* 22,200, *boubou* 9,900, *djembé* 6,600, *balafon* 4,400, *ankh* 4,400, *masque africain* 2,900, *tapis berbère* 2,900, *tissu wax* 2,400, *Seydou Keïta* 2,400, *musée YSL* 2,400, *raï* 1,900, *Ousmane Sow* 1,900, *pagne africain* 1,900 | French goes out with every cluster that has French demand (instruments, textiles, symbols, Marrakech). |
| **Arabic** | Egypt: *المتحف المصري الكبير* 135,000, *المتحف المصري* 18,100, *فاروق حسني* 8,100, *مفتاح الحياة* 6,600, *عين حورس* 6,600, *النوبة* 2,900, *الراي* 2,400, *محمود مختار* 1,900, *الفن المصري القديم* 1,600 | Centre the Arabic edition on Egypt: museums, modern Egyptian artists (add Gazbia Sirry, El-Gazzar), ancient symbols, Nubia. |
| **English** | All clusters; the US dominates ad value | Every page starts in English. |
| **English — UK** | *black history month* 18,100 (October) · ankh 8,100 · kalimba 5,400 · Yinka Shonibare 5,400 · djembe 4,400 · amapiano 4,400 · Benin Bronzes 3,600 · *kente cloth* 2,900 (KD 27) · Chris Ofili 2,900 (KD 28) · *african masks* 2,900 · *african art* 2,400 · *berber rug* 2,400 (KD 13) | A high-value ad market, and the site already uses British spelling. Earn UK links (museums, diaspora media, 1-54) and plan for October. |
| **English — Nigeria** | Nike Art Gallery 14,800 · Fela Kuti 14,800 · afrobeats 9,900 · *aso oke* 3,600 · *adire* 3,600 · *agbada* 2,900 · *gele* 2,400 · *aso ebi* 2,400 · *national museum lagos* 880 · Ben Enwonwu 880 | Lower ad value, but these are the readers the site is about. Nigerian dress and Lagos art pages first. |
| **English — South Africa** | amapiano 18,100 · Zeitz MOCAA 8,100 · Esther Mahlangu 4,400 · William Kentridge 3,600 · *south african artists* 2,900 (KD 20) · *shweshwe* 2,900 · Irma Stern 2,400 · Norval Foundation 2,400 · Gerard Sekoto 1,900 · kwaito 1,900 | Strengthen the South African profiles and museums; add Sekoto, shweshwe and kwaito. |

**Search Console agrees.** In the first week, France and Brazil sent 6 clicks each and the US 2;
Spain, the UK, Morocco, Portugal, Ghana, Canada, Tunisia and Guinea sent 1 each.

---

## 7. Site structure and features

**New collections** (same pattern as `museums`): `/instruments`, `/symbols`, `/musicians`,
`/heritage`, `/travel`, and `/learn` for teaching resources. Textiles and dress stay in
`/art-forms`, grouped on its index under "Textiles and dress".

**Navigation.** With more than eight sections, the header needs groups: *Art* (art forms, symbols,
movements, heritage) · *Artists* (artists, musicians) · *Music* (genres, instruments) · *Visit*
(museums, travel, events) · *Guides*. Index pages carry the detail.

**Features, in order of value:**

1. **Sources shown on every page** — we already keep them in `data/sources/`; show them. Trust, and
   teachers and journalists cite pages that cite.
2. **Images on art-form pages** — freely licensed photographs from Wikimedia Commons (the artist
   pipeline already does this). Google Images is a large source of visits for masks, kente,
   adinkra and patterns.
3. **Adinkra and symbols dictionary** with our own SVG drawings, search, and a printable PDF chart.
4. **Newsletter** — one monthly letter; sign-up on every page; the printable chart as the welcome gift.
5. **Events calendar** — fairs, biennales, major exhibitions, with `Event` structured data.
6. **Museum map** — the museum pages on the Africa map we already draw.
7. **Timeline of African art** — interactive; MoMAA's timeline page ranks #12 for *art movements*
   (8,100 searches a month) and also for *art movements timeline*.
8. **"Where to buy" boxes** — one component for affiliate links: disclosure, `rel="sponsored"`, and
   only on pages where buying is the reader's question.
9. **Restitution tracker** — every return of looted African objects since 2017, sourced: linkable
   and newsworthy.
10. **Glossary** of African art terms (`DefinedTermSet`).
11. Later: quizzes, an instrument sound gallery (licensed recordings or embeds), an African-pattern
    colouring generator built on our motif system.

**Structured data to add:** `ItemList` on list pages; `DefinedTerm` for symbols and glossary;
`Person` for musicians; `Event` for fairs and biennales; `TouristAttraction` for heritage sites.
Google limited FAQ rich results to government and health sites in 2023 — keep question sections
for readers and AI answers, but expect no special display.

**AI search.** Keep answer-first summaries, tables, consistent names and visible sources;
`llms.txt` is already generated. Bing Webmaster Tools reports how often Copilot cites the site;
paid tools (Semrush among them) track mentions in other AI assistants.

---

## 8. Authority and links

The competitor that wins is linked by **teachers, universities and explainer media**:
LibreTexts, university course pages, The Conversation, Smithsonian Magazine, My Modern Met,
Nation Africa, Morocco World News, Briefly. That is our target list.

**Linkable assets to build:**
- The **adinkra chart** and **Black History Month teaching pack** — for teachers, librarians,
  school districts.
- The **restitution tracker** — for journalists covering returns.
- **"African art at auction"** — record prices from public auction results, updated yearly.
- **"Most-searched African artists"** — an original data story from Semrush and Google Trends data.
- **Museum and art-travel guides** — for tourism boards, cultural centres, embassies' culture pages.
- **Interviews with living artists** — they and their galleries link back.

**Outreach:** African studies centres and art-history departments; museum education teams;
diaspora media (OkayAfrica, Face2Face Africa, Pulse, BellaNaija, Afropop Worldwide); fairs and
biennales (1-54, ART X Lagos, Investec Cape Town Art Fair, Dak'Art) for listings and press pages.

**Social:** Pinterest first (patterns, textiles, masks and symbols are visual and evergreen);
Instagram; short videos for instruments and symbols.

**Never:** buy links (MoMAA's top anchor text is a link seller's), add our own links to Wikipedia,
comment or forum spam, or link networks.

---

## 9. Trust

- **Real people.** Recruit an editor and expert reviewers (art historians, curators, musicians) and
  show their names and credentials. No invented personas, ever.
- **Visible sources** on every page (section 7, feature 1).
- **Original material.** Commissioned photographs in Dakar, Lagos, Accra, Marrakech; museum press
  images with permission; interviews; maps and data we make.
- **Editorial and monetisation policy page:** how pages are researched, how affiliates are chosen,
  that payment never buys a place in a list or a profile, how to report errors. Link it from the
  footer next to the corrections section of `/about`.
- **Quality over volume.** Google's spam policies target mass-produced pages that add nothing.
  Every page here must carry facts checked against sources, structure and links that a reader
  would miss if the page did not exist.

---

## 10. Monetisation

### 10.1 Principles

1. Earn from what the reader came for: a djembe buyer gets a buying guide; a student reading about
   the Benin Bronzes gets no shop links.
2. Disclose every affiliate link; mark it `rel="sponsored"`. Payment never changes a ranking, list
   or profile; sponsored items are labelled.
3. **No trade in antiquities or sacred objects** without documented provenance; point collectors
   to provenance checks and the ICOM Red Lists. Favour living artists, fair-trade makers and
   contemporary work — the same values as our restitution coverage.
4. Ads arrive only when traffic justifies them, and never at the cost of page speed or layout shifts.

### 10.2 Revenue streams

Rates below are the figures reported publicly in October 2026 (partner directories, network
pages); several sources disagree — **confirm in each programme's dashboard before relying on them.**

| Stream | Start | Feeds on | Partners and reported terms |
|---|---|---|---|
| **Book affiliate** | Now | "Further reading" on every guide and profile | Bookshop.org (~10%; supports independent bookshops); Amazon (physical books reported at 3–4.5%) |
| **Instrument affiliate** | With the instruments cluster | Djembe, kalimba, mbira, kora, balafon pages and buying guides | Amazon Associates (musical instruments reported ~3%); specialist music shops' own programmes; direct deals with West African instrument makers |
| **Crafts, textiles and decor affiliate** | With the textiles and decor guides | Kente stoles, mud cloth, wax print, baskets, beads, rugs | Etsy via Awin (~4%); Novica via Impact (~10%, check it is open); direct partnerships with African weavers and makers (better rates, better story) |
| **Art affiliate** | With profiles of living artists and the buying guide | Prints and works by profiled artists | Saatchi Art via CJ (reported 2–13%); check Artsper and Singulart programmes |
| **Travel affiliate** | With museum and city guides | Gorée, Marrakech, Cape Town, Cairo, Dak'Art | GetYourGuide (base reported ~7–8%, varies by market); Viator; hotel booking programmes |
| **Display ads** | ~1,000 qualifying sessions a month | Explainers and lists | **Journey by Mediavine** — Mediavine's help page says over 1,000 sessions (reported: premium-country sessions in 30 days, GA4 connected). **Raptive** — 25,000 monthly pageviews since October 2025, most traffic from the US, UK, Canada, Australia, New Zealand. AdSense as a fallback. |
| **Newsletter sponsorship** | Once the list interests sponsors | The monthly letter | Galleries, fairs, auction houses, travel operators |
| **Digital products** | After the free chart proves demand | Printables and guides | Adinkra posters, teaching packs, pattern colouring books, an e-book *Collecting African Art Responsibly* — sold on our own store, Etsy or Teachers Pay Teachers |
| **Labelled listings** | When traffic shows | Events calendar, gallery directory | Galleries, fairs, residencies ("Sponsored") |
| **Referrals** | When partners agree | "Have an African object to value?" | Auction houses with African art departments, appraisers; France *estimation art africain* shows the intent |
| **Art trips** | Year two | Dak'Art, 1-54 Marrakech | Revenue share with tour operators |

### 10.3 Content that earns

| Type | Examples | Demand (US unless noted) | How it earns |
|---|---|---|---|
| Buying guides | How to choose a djembe · kalimba guide · kente stoles · Amazigh rugs · Bolga baskets · buying African masks responsibly | *djembe for sale* 1,300 · *kente stole* 1,900 (KD 5) · *berber rug* 1,600 (KD 13) · *bolga basket* 880 (KD 10) · *african masks for sale* 590 | Affiliate |
| Art-travel guides | Dakar, Marrakech, Cape Town, Cairo; Gorée; Majorelle and the YSL Museum; Dak'Art 2026 | *things to do in dakar* 1,600 · *jardin majorelle* 4,400 (FR 22,200) | Tours, tickets, hotels |
| Printables | Adinkra chart; Black History Month pack; pattern colouring pages | *adinkra symbols* 9,900 · *black history month art* 880 | Email list → products |
| Lists | Famous Black artists from Africa and its diaspora; painters; photographers; instruments | *famous black artists* 2,900 | Ads (many pages per visit) |
| Reference | Instruments, symbols, textiles, heritage | *ankh* 49,500 · *kalimba* 33,100 · *dashiki* 22,200 · *djembe* 14,800 | Ads + affiliate |
| Data and stories | Restitution tracker; auction records | — | Links → rankings |

### 10.4 Phases

| Phase | Trigger | Do |
|---|---|---|
| 0 — Foundations | Now | Analytics and consent; affiliate accounts (Bookshop.org, Amazon, Awin/Etsy, Impact/Novica, GetYourGuide); disclosure page; newsletter with the printable chart |
| 1 — First revenue | ~1,000 qualifying sessions a month | Apply to Journey by Mediavine; buying and travel guides live; first digital product |
| 2 — Scale | ~25,000 pageviews a month | Raptive or Mediavine's main programme; newsletter sponsorship; labelled listings |
| 3 — Own products | ~100,000 sessions a month | Maker partnerships, an online course, art trips, paid membership (ad-free extras) |

### 10.5 Monetisation and the sale

A site with a year of traffic and revenue sells as a business, not only as a domain: buyers of
content sites price them on profit history. Keep `/buy` and the sale notice; consider a quieter
sale bar once ads run.

---

## 11. Seasonal calendar and 12-month roadmap

### 11.1 When demand peaks (Semrush trends, August 2025–July 2026)

| Query | Peak | Size of the peak |
|---|---|---|
| *black history month art* | January–February | Over 90% of the year's searches |
| *famous black artists* | February | ~5× a usual month |
| *african printmaking* | February | ~4× |
| *kente cloth* | February | Over 2× |
| *african masks* | February | ~2× |
| *kente stole* | April–May (graduations) | ~4× |
| *africa day* | May (25 May) | ~10× |
| *kwanzaa symbols* | November–December | ~80% of the year's searches |
| *kalimba* | December (gifts) | ~2× |
| *adinkra symbols* | August and April (school terms) | ~1.5× |
| UK: *black history month*, *famous black artists*, *1-54 art fair* | October | 40–80% of the year's searches in that one month |
| *djembe, dashiki, sankofa, moroccan rugs* | Year-round | Steady |

**Rule:** a seasonal page must be live and indexed **six weeks before** its peak — the February
pages by mid-January, the kente stole guide by March. Other dates: Black History Month is in
October in the UK; Dak'Art 2026 runs 19 November–19 December; 1-54 London is in October, 1-54
Marrakech and the Cape Town Art Fair usually in February (check each year).

### 11.2 Roadmap

| Month | Content | Site and business |
|---|---|---|
| **Nov 2026** | Dak'Art 2026 guide (before 19 Nov); instruments hub + djembe, kalimba (first, for the December peak), mbira, kora, balafon, talking drum (EN, FR; ES and PT for djembe and kalimba); quick-win retitles | www redirect; Search Console check and Bing; analytics and consent; Bookshop.org and Amazon accounts |
| **Dec 2026** | Adinkra dictionary and chart; sankofa, gye nyame, ankh, nsibidi; African patterns and traditional clothing hubs; dashiki, boubou | Sources shown on pages; newsletter and welcome chart; `/instruments` and `/symbols` collections |
| **Jan 2027** | Black History Month pack; *Famous Black artists from Africa and its diaspora*; refresh kente, masks, printmaking; Mehretu, Ojih Odutola, Ofili, Yiadom-Boakye, Armitage (Wiley if approved) | Images on art-form pages; Etsy (Awin) and Novica (Impact) accounts |
| **Feb 2027** | Museums batch 2; art-travel guides (Dakar, Marrakech, Cape Town); Gorée; Smithsonian NMAfA | Apply to Journey by Mediavine at ~1,000 sessions; GetYourGuide account |
| **Mar 2027** | Kente stole guide; Nigerian dress (agbada, gele, aso oke, adire, aso ebi); wax print and ankara; Amazigh rugs; Bolga baskets | "Where to buy" component; editorial and monetisation policy page |
| **Apr 2027** | Music genres batch (kizomba, kuduro, soukous, ethio-jazz, gqom, kwaito, makossa, desert blues, juju, fuji, mbaqanga, coupé-décalé, taarab, bongo flava, benga) | Portuguese: Brazilian for new pages; convert the top 20 |
| **May 2027** | Africa Day feature; heritage (Djenné, Nok, Great Zimbabwe, Lalibela, Aït Benhaddou, Ndebele painting); restitution tracker | Outreach to journalists for the tracker |
| **Jun 2027** | Musician legends (Fela Kuti, Miriam Makeba, Hugh Masekela, Cesária Évora, Ali Farka Touré, Salif Keita, King Sunny Adé, Manu Dibango, Oumou Sangaré, Mulatu Astatke, Tinariwen, Ladysmith Black Mambazo) | `/musicians` collection; navigation groups |
| **Jul 2027** | Ancient Egypt and Nubia; ankh and eye of Horus in Arabic, Spanish, Portuguese; Gazbia Sirry, El-Gazzar; Mokhtar Museum (Arabic) | Events calendar |
| **Aug 2027** | Back-to-school refresh of symbols and adinkra; Spanish (Latin America) push: kalimba, marimba, ojo de horus, orishas in art | Teacher outreach for links |
| **Sep 2027** | Orishas in Yoruba art; Anansi; proverbs; country overviews where demand exists | First paid product (e-book or teaching pack) |
| **Oct 2027** | UK Black History Month; 1-54 London | Raptive at ~25,000 pageviews; yearly content audit |

---

## 12. Measurement

**Every month:** Search Console impressions and clicks by cluster and language; keywords in the
top 10 and top 3; referring domains (new, lost, quality); indexed pages; newsletter sign-ups;
affiliate clicks and revenue; revenue per 1,000 sessions once ads run.

**Targets to steer by** (aims, not forecasts — rankings for a young site are slow and uneven):

| By | Target |
|---|---|
| End of December 2026 | One host indexed; 60+ new pages live; Search Console and analytics running |
| March 2027 | 500+ US ranking keywords; ~1,000 qualifying sessions a month (Journey threshold) |
| June 2027 | 50 keywords in the top 10; 30+ quality referring domains; 1,000 newsletter subscribers |
| December 2027 | 25,000 monthly pageviews (Raptive threshold); revenue from ads, affiliates and one product |

**Every quarter:** prune or merge pages that get no impressions after six months; refresh pages
that slip; re-run the keyword gap against contemporary-african-art.com and momaa.org.

---

## 13. Decisions only the owner can make

- [ ] Fix the www redirect in Vercel.
- [ ] Check that Search Console is a Domain property; add Bing Webmaster Tools.
- [ ] Choose analytics and the consent banner.
- [ ] **Scope:** diaspora artists such as Kehinde Wiley and Chris Ofili? musicians? ancient Egypt?
      myths and religion through art (orishas)? *Recommended: yes to all, always through art.*
- [ ] **Portuguese:** switch to Brazilian Portuguese. *Recommended.*
- [ ] **Spanish:** neutral Latin American Spanish. *Recommended.*
- [ ] Open affiliate accounts in the owner's name: Bookshop.org, Amazon Associates, Awin (Etsy),
      Impact (Novica), GetYourGuide — tax and payment details are the owner's.
- [ ] Newsletter tool and sender name.
- [ ] Budget for expert reviewers, photography and printable design.
- [ ] Keep Semrush after the trial (rank tracking) or rely on Search Console.
- [ ] How visible the sale notice stays once the site earns.

---

## 14. Appendix: standards for every new page

1. **Answer first:** a 2–3 sentence summary that uses the words people search.
2. **Title ≤ 70 characters, description ≤ 160** (the content tests enforce both).
3. **Facts from sources**, logged in `data/sources/`, shown on the page; nothing invented —
   uncertain points are stated as uncertain or left out.
4. **Links:** at least three inbound links from related pages, a link to its hub, links out to
   related art forms, artists, museums.
5. **Images:** freely licensed, credited, with descriptive alt text; our own drawings where none exist.
6. **Translations** in the languages where section 6 shows demand, each linking only to pages in
   its own edition.
7. **Structured data** for the page type.
8. **Monetisation** below the main content, disclosed, `rel="sponsored"`, only where buying is the
   reader's question.
9. **Honest dates:** *Updated* changes only when a reader would notice the change.
