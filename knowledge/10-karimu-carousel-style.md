# 10 — Karimu pinned-post carousel style ("Posts fixados")

> Source: *Karimu — Posts fixados (2nd version)*, the approved design for the
> four pinned Instagram carousels (Quem somos · O que fazemos · Nosso impacto ·
> Antes e depois). This file covers **layout and voice only**.
>
> ⚠ **The figures printed in that deck are NOT an approved source.** Several
> conflict with `07-impact-facts.md` (the deck says "+96%" of funds reach
> Tanzania, the facts file says 99%; it says "up to +183%" income, the approved
> figure is +342% median / +195% average). Every number on a slide must come
> from `07-impact-facts.md`, or be written as `[VERIFY: ...]`.

---

## The look, in one line
Clean, confident, editorial: big bold sentence-case headlines, a yellow
eyebrow rule, lots of white or solid brand colour, real photos with rounded
corners, numbers set large, and the horizontal Karimu logo in the footer.
No textures, no script fonts, no rotation, no doodles.

## Palette

| Token | Hex | Use |
|---|---|---|
| Navy | `#2B5B7E` | Headlines on white; navy slide background `#2D5D80` |
| Blue | `#3A74B0` | Blue slide background; highlight words on white (`#3D76B5`) |
| Yellow | `#F2C14E` | Eyebrow rule, stat rules, numbered circles, highlight words on dark slides |
| Rust | `#C0592B` | Income / money figures, "post fixado" pin |
| Green | `#3E8A48` | Green slide background (awards), "after/depois" chips, savings figures |
| Purple | `#6C57A5` | Purple slide background (education) |
| Light | `#EEF3F9` | Callout boxes on white slides |

Pillar colours (icon circles, phase cards, table headers): water/sanitation blue ·
health green · education purple · income orange · financial services teal-green.
Phase colours: Dabil = purple (seed) · Arri = blue (seedling) · Ayalagaya = green (tree).

## Type
Figtree throughout. Headline 800, ~70px, sentence case, ends with a full stop.
Eyebrow 800, 22px, uppercase, wide tracking, preceded by a short yellow rule.
Body 400, ~29px. Numbers 800.

## Slide anatomy
Every slide except the cover: eyebrow (top left) · page counter "02 / 07" (top
right) · headline · content · footer (logo left, `karimufoundation.org` right;
"Link na bio" on the CTA slide). The cover has a "POST FIXADO" pin badge (or
another short badge), a full-width photo on top, a 5-colour bar, then eyebrow,
headline and one-sentence subtitle, and "Arraste →" (Swipe →) in the footer.

## Two-tone headline
Most headlines are two short sentences, and the second (or the payoff phrase) is
coloured: blue on white slides, yellow on dark slides. Put that phrase in
`highlight` exactly as it appears in `title`.
- "A comunidade lidera. **Nós caminhamos junto.**"
- "Atacar uma causa alivia a pobreza. **Atacar todas elimina.**"
- "A mesma comunidade. **Outra realidade.**"
- "Do chão de terra batida **ao pódio nacional.**"

## Layout catalogue (`layout` values)

| layout | What it is | Best for |
|---|---|---|
| `cover` | Photo top, badge, eyebrow, headline, subtitle, swipe cue | Slide 1 of every carousel |
| `photo-text` | Headline, short paragraph, wide photo, up to 3 stats in a row | Origin story, context + key numbers |
| `split` | Headline, paragraph, photo beside a light "belief" box | Mission, a principle, a quote-like line |
| `numbered` | Up to 5 numbered principles (title + one line) | How we work, steps |
| `icon-list` | Up to 5 coloured icon circles (title + one line) | The pillars, programme overview |
| `side-photo` | Photo fills the left 40%; icon bullets on the right; "next post" teaser | Where we work, people/place intro |
| `stats` | Headline, optional photo, 2–6 stats in two columns | Results by pillar, "the year in numbers" |
| `before-after` | Two photos labelled Antes / Depois, callout box, one line | One transformation with one figure |
| `phases` | Up to 3 coloured phase cards | Seed → seedling → tree methodology |
| `compare` | Two columns, Antes (muted) vs Hoje (bold, check) | Same community then and now |
| `table` | Up to 3 coloured column headers × up to 5 rows | Dabil vs Arri vs Ayalagaya |
| `big-stat` | One giant figure + label, 3 supporting stats, light box | Transparency, a headline number |
| `timeline` | Year + title + sub, up to 6 rows, footer banner | Awards, milestones |
| `cta` | Headline, photo, up to 3 white action cards | Last slide: follow / share / volunteer |
| `ba-rows` | Up to 4 rows of before/after thumbnails + a coloured figure | Many transformations at once |
| `ba-full` | Full-bleed before (top) and after (bottom), blue band with one figure | Single high-impact standalone post |

Background (`theme`): `white`, `blue`, `navy`, `green`, `purple`. Alternate them so
no two neighbouring slides share a background — the decks run roughly
white cover → blue → white → navy → white, and so on.

## Carousel shapes that work
- **Explainer (5–6 slides):** cover → photo-text → split → numbered → side-photo.
- **Programme (6 slides):** cover → icon-list → stats (water/health) → before-after
  (education) → stats (income) → phases.
- **Impact (7 slides):** cover → compare → table → big-stat → timeline → stats → cta.
- **Single post:** `ba-full` or `before-after`, or a `stats` slide on its own.

## Text budget (hard limits)
- Headline ≤ 12 words, two short sentences at most.
- Eyebrow ≤ 4 words. Subtitle / paragraph ≤ 40 words.
- List items: title ≤ 5 words, line ≤ 16 words.
- Stat value ≤ 8 characters ("14 mil+", "Nº 1", "4,9%"); stat label ≤ 12 words,
  and it states cohort, ward and year where relevant.
- Never a paragraph *and* a list on the same slide.

## Voice in Portuguese
Short declarative sentences, present tense, community as the subject:
"A comunidade decide." · "Não saímos numa data marcada. Saímos quando a
comunidade se sustenta sozinha." · "Quem vive o problema conhece as soluções
melhor do que qualquer pessoa de fora." Use "nós" for Karimu. No rescue language
(*salvar, resgatar, carentes, coitados*). Brazilian number format: `4,9%`,
`3.236`, `14 mil+`, `US$ 1`. Places and school names stay in their original form
(Ayalagaya, Dareda Kati, Ayalagaya Secondary School).

---

## Beyond the carousel: single images, Stories, Reel covers, LinkedIn

Same palette, type and voice; one idea per image. Sizes and layouts:

| Format | Size | Layouts |
|---|---|---|
| Single image (feed) | 1080×1350 | `photo-headline`, `stat-card`, `quote`, `news`, `event`, `award`, plus `before-after`, `ba-full`, `stats`, `big-stat`, `compare`, `timeline` on their own |
| Square | 1080×1080 | `photo-headline`, `stat-card`, `quote`, `news`, `event`, `award` |
| Story | 1080×1920, 1–5 frames | `photo-headline`, `stat-card`, `quote`, `event`, `story-cta`, `story-poll` |
| Reel cover | 1080×1920 | `reel-cover` |
| LinkedIn / Facebook | 1200×628 | `photo-headline`, `stat-card` |

| layout | What it is | Best for |
|---|---|---|
| `photo-headline` | Full-bleed photo, dark fade, headline and short line over it, optional badge ("Em obra") | A strong photo of people doing the work |
| `stat-card` | One figure set huge, its label, a context line, the source | The single number that tells the story |
| `quote` | Photo, large quotation mark, the quote, name and role | Words of a community member, staff or volunteer — **verbatim only** |
| `news` | Rust "Novidade" tag, date, headline, photo, two lines | Something that just happened: a survey finished, a grant matched |
| `event` | Photo band, white date block, up to 3 detail rows, yellow CTA pill | Trips, campaigns, deadlines, live sessions |
| `award` | Star badge, year, award title, who received it | Government recognitions and rankings |
| `reel-cover` | Full-bleed frame, "Assista" pill, hook headline inside the 4:5 grid crop | The cover of every Reel |
| `story-cta` | Headline, photo, "Toque no link" with room for the link sticker | Newsletter sign-up, report, site |
| `story-poll` | A question in big type, room for the poll / quiz sticker | Engagement: ask, then answer in the next frame |

Rules for these formats:
- One message per image. A single image that needs three ideas is a carousel.
- Stories: text stays out of the top 250px and bottom 300px (Instagram UI). A
  sequence can ask (`story-poll`), answer (`stat-card`) and invite (`story-cta`).
- Reel covers: hook ≤ 8 words; the profile grid crops to 4:5, so the headline
  sits in the middle.
- LinkedIn / Facebook: lead with result + method, professional tone.
- Quotes are never invented or reworded. In Portuguese they are a faithful
  translation and the notes say so.
