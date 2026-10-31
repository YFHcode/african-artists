# Sources for expanded profiles

One file per expanded artist profile, `<slug>.md`, written while researching it
(docs/profile-expansion-plan.md). Not published: it is here so every fact on the page can be
traced, reviewed and updated.

- One line per fact that the expansion added, with the sources that support it: two
  independent reliable ones, or one authoritative one (the artist's gallery, a museum's own
  collection page, a major newspaper or obituary). Wikipedia can point to sources but is not one.
- Quotations are copied from the source itself, never from a summary of it.
- "Where to see the work" lines link the museum's own collection page.
- If the sources ran out before the length target, say so at the end, with the word count; the
  profile is then listed in `SOURCES_EXHAUSTED` in `src/content/expansion.ts`.

`museums/` holds the same kind of log for each museum page (src/content/museums.ts), one file per museum.
