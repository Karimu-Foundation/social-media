# Karimu Content Studio — working notes for Claude Code

Internal tool for the Karimu social media team: review, approve and AI-draft
posts. Nothing here publishes anywhere. Every draft needs a human to approve it.

## Non-negotiable content rules

These come from the Karimu Comms Agent knowledge base in `knowledge/`. Any
change to generation logic must keep them intact:

- **Never invent a statistic, name, place, date, quote or currency figure.**
  The only approved numbers live in `knowledge/07-impact-facts.md`. If a figure
  isn't there, it must be written as `[VERIFY: ...]`, never guessed.
- **Never claim an asset exists.** If no photo matches, the output says
  `ASSET NEEDED: <shot brief>`.
- **Dignity, never rescue.** No "we saved / rescued / poor helpless". Write
  "the community built", "families achieved", "community-led".
- **Stories carry numbers; numbers carry names.** Every story-led post needs a
  verified figure; every number-led post needs a human name or face.
- **CTAs are follow / subscribe / share / read / watch** — never "Donate now"
  unless the request is explicitly a fundraising campaign.
- **Child safety:** never combine a child's full name + school + location.
- US English spelling. USD unless quoting a Tanzanian source. Exception: the
  Karimu carousel style can be requested in Brazilian Portuguese; figures are
  translated, never changed, and use pt-BR formatting (4,9% · 3.236).
- The "Posts fixados" deck is a **layout** reference only. Its printed figures
  are not a source and several conflict with `07-impact-facts.md`.

## Architecture

Static site + one serverless function. No build step; Vercel zero-config.

- `index.html` / `styles.css` / `app.js` — the review UI. State (approvals,
  AI drafts, removed posts) lives in `localStorage` only, per browser. There
  is no shared backend.
- `posts-data.js` — the seed post queue.
- `posts-karimu.js` — Karimu-style artwork for the seed queue: per post id,
  its format, English slides and a Portuguese version. Loaded right after
  `posts-data.js`. Figures come from the posts themselves; change a number in
  `posts-data.js` (and `07-impact-facts.md`) first, then here.
- `posts-batch-2026-11.js` — 14 Instagram drafts (two per pillar) written
  directly in the Karimu templates, English + Portuguese, inserted after the
  last post of their pillar. Figures carry source tags in `notes`.
- `api/generate-posts.js` — calls the Anthropic API to draft new posts. Reads
  every file in `knowledge/` at request time and the photo library index.
  Needs `ANTHROPIC_API_KEY`; add `ANTHROPIC_WORKSPACE_ID` too if the key is
  org-scoped rather than workspace-scoped.
- `kraft-kit.js` — browser port of `templates/kraft_kit.py` from the design
  package. Renders the kraft/scrapbook artwork as HTML+CSS at 1080×1350,
  1080×1080 and 1080×1920. **If the Python original changes, this must be
  updated to match** — they are two copies of the same layout.
- `kraft-render.js` — maps a post's `artwork` spec to a component recipe per
  format, mirroring `examples/format-gallery/build.py`.
- `karimu-kit.js` — the second visual style, "Posts fixados" (clean Karimu
  carousel, Figtree, white/blue/navy/green/purple slides, 1080×1350). A post
  with `style: "karimu"` carries `slides: [{layout, theme, ...}]` instead of
  `artwork`; 16 layouts, documented in `knowledge/10-karimu-carousel-style.md`.
  Photos are CSS background-images (html2canvas has no object-fit). Upload
  slots are keyed `s<slide>.<path>`, e.g. `s3.rows.1.beforePhotoFile`.
  Logos: `images/logo-h.png` (light slides) and `images/logo-h-white.png`
  (dark slides), cut from the approved deck.
- **Karimu formats.** Besides the carousel, the Karimu style has single-image
  layouts (`photo-headline`, `stat-card`, `quote`, `news`, `event`, `award`,
  `reel-cover`, `story-cta`, `story-poll`) in four sizes: feed 1080×1350,
  square 1080×1080, story 1080×1920, landscape 1200×628. A post carries
  `kformat` (`carousel` | `single` | `square` | `story` | `reel-cover` |
  `landscape`) and `size`. The format → size → allowed layouts table exists
  twice, `FORMATS` in `karimu-kit.js` and `KARIMU_FORMATS` in
  `api/generate-posts.js`: **change both together.** Story layouts keep text
  out of the top 250px / bottom 300px; the Reel cover keeps its headline
  inside the 4:5 grid crop.
- The generator takes `style` (`kraft` | `karimu`), `kformat`, `language`
  (`both` | `pt-BR` | `en-US`) and `slideCount`. Posts per request are capped
  per format (carousel 2, story 3, others 4) so the 60-second limit holds.
- **Bilingual carousels.** A Karimu post has `language` (the version it was
  drafted in) and `versions: { "en-US": { title, copy, cta, hashtags,
  altText, slides } }` for the other one. English is the primary
  language: with `language: "both"` (the default) the generator drafts English
  and the browser then calls `api/translate-post.js` for Portuguese (a second
  call, so each stays under 60s). English always comes first in tabs, badges
  and zip folders; the app UI is English. The translator only replaces strings: layouts, themes, colours, icons
  and photos are copied from the source server-side. Photos, uploads and
  approval state are shared by both versions. `lib/anthropic.js` holds the
  shared API call. The header's language filter shows each card in that
  language; kraft and seed posts count as English.
- `photo-index.json` + `images/library/` — curated photos pulled from the
  Karimu shared Drive, resized. Committed to the repo on purpose: rendering
  from Drive URLs would break the PNG export (tainted canvas / CORS).
- `knowledge/` — copies of the agent's guardrails, voice, pillars, channel
  playbooks, format catalogue and approved facts.

## Weekly routine

A scheduled session runs every Monday ~7:00 (São Paulo) and follows
`routines/weekly-posts.md`: reads the newest report, updates
`07-impact-facts.md` if it is newer, writes 5 posts (rotating pillars via
`routines/rotation.json`, never Fundraising), picks Drive photos, merges to
production as Pending and emails Edu for approval. Change the procedure in that
file, not in the scheduled task.

## Known gaps

- The photo library is a seeded subset (18 photos: sanitation, water before
  and the 2026 Arri expansion, education, health, the 2026 Dabil survey, a 2025
  volunteer trip). Savings groups and entrepreneurship are not covered yet, so
  posts on those correctly fall back to `ASSET NEEDED`.
- The library is a snapshot. New photos on the Drive do not appear
  automatically. A durable fix is a Google service account + an `/api/photo`
  proxy endpoint so the app can query Drive at runtime.
- No shared state: two team members don't see each other's approvals or drafts.

## When updating knowledge

Update `knowledge/07-impact-facts.md` first, then redeploy — the generator
reads the files bundled in the deployment, so a stale file means stale drafts.
Retired figures (e.g. "$124,252 in loans", "98% of donations") must not come
back; check the "Retired figures" section before adding any number.
