# 09 — Visual System

> **Important:** the `Brand Manual.pdf` (2021) covers only logo, colors and
> typography. The live Instagram feed uses a fully developed **scrapbook / kraft**
> style that the manual does not document — different palette, different fonts,
> different everything. **The feed is the standard.** This file documents the feed;
> the manual governs the logo only.

---

## The look, in one line
Aged kraft paper with torn edges, hand-painted highlight banners, casual script
notes, circular icon badges, and colour-highlighted keywords — warm, handmade,
optimistic, and dense with information.

## Palette (as used in the feed)

| Token | Hex | Role |
|---|---|---|
| Kraft paper | `#F8EFD9` → `#E4D2AE` | Full-bleed background, warm vignette to the edges |
| Deep olive | `#3B5520` | Headlines, keyword highlights |
| Badge olive | `#4A6B29` | Icon badges, tabs, sticky-note boxes, secondary banners |
| Rust | `#BF4526` | Primary banner, big statistics, hot keywords |
| Orange | `#E0762A` | "Karimu" in body text, secondary accents, hearts |
| Cream | `#FDF6E6` | Type reversed out of olive/rust, photo frames |
| Ink | `#3A362C` | Body copy (warm near-black, never pure black) |
| Lime | `#D6E77C` | Script text inside olive boxes |

**Relationship to the Brand Manual:** rust ≈ manual `#C5552E`, orange ≈ `#F46F42`,
lime ≈ `#DDEB6C`. The **deep olive green and the kraft paper are additions** with no
entry in the manual. Keep the logo exactly as the manual specifies; everything
around it follows the feed.

## Typography (as used in the feed)

| Role | Face | Setting |
|---|---|---|
| Headline | **Montserrat 900**, uppercase | 62–82px, line-height ~0.98, letter-spacing −0.018em |
| Sub-headline | Montserrat 800 | 46–62px, sentence case |
| Script accent | **Caveat 700** | 54–96px, olive or lime — the human voice of the layout |
| Body | **Nunito Sans 400** | 30–35px, line-height ~1.4 |
| Emphasis in body | Nunito Sans 700/800 + a colour | numbers, place names, "Karimu" |
| Tab / label | Montserrat 800 uppercase | 27–29px, letter-spacing 0.06em |

IM Fell and Lexend Peta from the 2021 manual **do not appear in the feed.** Use
them only inside the logo lockup itself.

## Components

**Paper** — full-bleed kraft gradient, warm inset vignette, fine grain overlay
(`feTurbulence`, ~0.45 opacity, multiply), and an irregular torn/deckled edge on
all four sides against a darker kraft ground.

**Brush banner** — a hand-painted highlighter block behind reversed uppercase
Montserrat. Wobbly top and bottom edges, tapered ends, rotated −1° to −2°, soft
drop shadow. Rust for the primary line, olive for the secondary.

**Tab** — small olive rounded rectangle, cream uppercase label, rotated ~−1°.
Sits at the top-left as the slide's category ("Today in Arri Ward").

**Icon badge list** — a filled olive circle (64px) with a white 2.4px stroke icon,
then a line of body copy whose key figures are bold and coloured. Icons in use:
water drop, tap, clock, people, money, check, wrench, envelope, book, shield, leaf.

**Sticky box** — olive rounded rectangle (22px radius), rotated ~−0.7°, holding a
short body line plus a Caveat script payoff in lime. This is where the emotional
turn goes.

**Rust box** — same shape in rust with cream body copy. For context and
before-state framing.

**Photo frame** — cream border with a torn, irregular outer edge, rotated ±1–1.5°,
soft warm drop shadow.

**Doodles** — thin outlined hearts (rust or orange) and translucent leaf shapes in
the corners and margins. Two or three per slide, never more.

**Dotted divider** — 4px dotted warm-brown rule separating headline from list.

**Keyword colouring** — inside body copy, set place names in rust, "Karimu" in
orange, and every statistic in bold rust or olive. This is the feed's most
recognisable habit; do not skip it.

## Text budget per slide  ⚠

The kraft style tolerates density, but the audience does not. Fill the frame with
**scale and image**, not with more sentences.

| Slide type | Allowed |
|---|---|
| Hook | headline ≤8 words · banner ≤3 words · photo · script ≤10 words |
| Before / After | tab · headline ≤8 words · the photo pair · one result line ≤12 words |
| Data card | tab · 2–3 stat rows (numeral + label ≤6 words) · script ≤10 words |
| Detail / list | tab · headline ≤8 words · **3 bullets max**, ≤14 words each |
| CTA | headline ≤8 words · banner · script · one chip |

**Never a body paragraph and a bullet list on the same slide.** If the content
needs both, split it into two slides — slides are free, attention is not.

## Layout rules
- Content **fills the frame.** The feed has no large empty areas — headline block,
  divider, list, photo, payoff box, logo, from top edge to bottom.
- One brush banner per slide, maximum two.
- One script line per slide — it is the punchline, not decoration.
- Rotations stay under 2°.
- Logo lockup centred at the bottom on the first and last slide only.

## Photography direction
- People **doing** things: digging, building, teaching, farming, treating, learning.
- Eye level or slightly below. Never shoot down at people.
- Natural light, real colour — no filters, no desaturated "poverty" grade.
- Always caption with name, role and place where known.
- Ward discipline: an Ayalagaya photo must never illustrate a Dabil story.

## Video / Shorts
9:16, hook in the first 2 seconds, burned-in captions (most viewing is muted),
one idea, one CTA card. On-screen text in Montserrat 900 with the same rust and
olive. Keep text out of the bottom 20% and top 10%. YouTube thumbnails: **face,
no text.**

## Accessibility
Alt text on every image · captions on every video · body contrast ≥ 4.5:1 ·
minimum on-image text 28px at 1080 width · never carry meaning in colour alone.

## Production
Slides are built as HTML and rendered with headless Chrome at 1080×1350.
Working reference implementation, including the brush-stroke, torn-edge and
badge generators: `examples/arri-water-carousel/build.py` and the shared kit `templates/kraft_kit.py`.
