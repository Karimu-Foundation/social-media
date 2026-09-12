# Post Format Catalogue

**Pick the format before writing a word.** The pillar says *what* the post is
about (`knowledge/05-content-pillars.md`); this file says *what shape it takes*.
Rendered examples of every format: `examples/format-gallery/`.

## What the feed actually publishes

Sampled from @karimufoundation, Aug–Sep 2026 (last 12 posts):

| | Share |
|---|---|
| **Video / Reel** | **9 of 12** |
| Photo or carousel | 3 of 12 |

**The feed is video-first**, and — this is the part that is easy to miss — many of
the "cards" in the grid are *designed graphics animated and posted as Reels*, not
static posts. A finished card is therefore rarely the end of the job: ask whether
it should ship as a Reel with motion and a voiceover.

Cadence in that sample: a post every 2–3 days.

---

## Decision table

| If the story is… | Use | Why |
|---|---|---|
| A visible physical change | ⭐ **Before / After** | The photos do the work. Least copy, highest proof. |
| Results, reach, efficiency | ⭐ **Data card** | Numbers at scale, no paragraphs. |
| One completed thing worth celebrating | **Announcement card** | Single frame, no swipe needed. |
| Something a Tanzanian said | **Quote card** | Trust transfers person-to-person. |
| One figure that stands alone | **Single-stat card** (1:1) | Square, scroll-stopping, endlessly reusable. |
| A question that needs an answer | **Hook + payoff carousel** (2–3 slides) | The feed's most-used carousel shape. |
| A layered story with several beats | **Full carousel** (5–6 slides) | Only when the beats genuinely differ. |
| External validation | **News / milestone card** | Third-party voice is worth its own frame. |
| A pure ask | **CTA card** | Never bury the ask inside a story post. |
| Anything with motion, a face, or a place | **Reel** | The default. See below. |

---

## The formats

### ⭐ 1. Before / After
Two images, one figure, almost no copy.
`tab · headline ≤8 words · BEFORE/AFTER pair · one result line ≤12 words`
Works as a **single frame** (both photos side by side) or as slide 2 of a carousel.
**Never** add a bullet list to this frame — it competes with the photos.
Both photos must be the same subject, comparable angle, correct ward.

### ⭐ 2. Data card
`tab · 2–3 stat rows (numeral + label ≤6 words) · script payoff ≤10 words · CTA`
No body paragraph. Every figure states its cohort, ward and year.
A **zero** is the strongest number Karimu has — use it when true.

### 3. Announcement card
One completed thing. `tab · headline ≤8 words · script · 2–3 bullets · photo · thanks`
Ends in gratitude, not an ask.

### 4. Quote card
`tab "Karimu Talks" · the quote in Caveat · name · role · portrait`
Quote verbatim, ≤25 words. Always name and title the speaker. Never paraphrase a
Tanzanian colleague into better English.

### 5. Single-stat card — 1080×1080
One dominant figure, one line of context, logo. Square so it also works as a
LinkedIn image and a WhatsApp send. The cheapest post to make and the easiest to
reuse.

### 6. Hook + payoff carousel — 2–3 slides
The feed's signature shape (the `$0.50 a day` post).
`Slide 1: question on a brush banner + photo. Slide 2: the answer, with data.`
Optional slide 3: CTA. Do not stretch it to six slides because you can.

### 7. News / milestone card
`rust tab "In the national news" · headline · pulled quote with a lime rule ·
source line · photo · script`
The external voice is the whole point — quote it, attribute it, do not rewrite it.

### 8. CTA card
`rust panel: headline ≤6 words · script sub · one chip · 2 bullets · payoff`
On Instagram and Facebook the chip is **never** "Donate" unless the pillar is
Fundraising Support.

### 9. Reel / Short — 1080×1920
The feed's default. Three sub-types actually in use:

| Sub-type | Shape |
|---|---|
| **Animated card** | A designed graphic with motion — the most common. Build the frame, then specify the animation. |
| **Talking head** | Edu, a staff lead, or a Tanzanian colleague to camera. Burned-in captions, name/role card. |
| **Before/After walkthrough** | Walking from the old structure to the new, narrating. |

Rules: hook in the first 2 seconds · burned-in captions (most viewing is muted) ·
one idea · keep text out of the **bottom 20% and top 10%** (platform UI) ·
open most videos with *"Comment and share! We need your engagement to keep
fighting extreme poverty!"*

### 10. Story — 1080×1920
Reposts of feed content, polls, countdowns, link stickers. The only place a link
sticker works on Instagram — use it for the newsletter every month.

---

## Aspect ratios

| Format | Size |
|---|---|
| Feed card, carousel, Before/After | 1080 × 1350 (4:5) |
| Single-stat, LinkedIn image | 1080 × 1080 (1:1) |
| Reel, Short, Story | 1080 × 1920 (9:16) |
| YouTube thumbnail | 1280 × 720 (16:9), face, **no text** |

## Building any of them
`templates/kraft_kit.py` — `page(inner, w, h)` renders any of the three sizes.
Components: `brush` · `badge` · `well` · `beforeafter` · `statrow` · `quote` ·
`cta_panel` · `bigstat` · `heart` · `leaf`, plus `.tab` `.sticky` `.rbox` `.chip`
`.dots` in CSS.
