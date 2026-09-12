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
- US English spelling. USD unless quoting a Tanzanian source.

## Architecture

Static site + one serverless function. No build step; Vercel zero-config.

- `index.html` / `styles.css` / `app.js` — the review UI. State (approvals,
  AI drafts, removed posts) lives in `localStorage` only, per browser. There
  is no shared backend.
- `posts-data.js` — the seed post queue.
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
- `photo-index.json` + `images/library/` — curated photos pulled from the
  Karimu shared Drive, resized. Committed to the repo on purpose: rendering
  from Drive URLs would break the PNG export (tainted canvas / CORS).
- `knowledge/` — copies of the agent's guardrails, voice, pillars, channel
  playbooks, format catalogue and approved facts.

## Known gaps

- The photo library is a seeded subset (11 photos: sanitation, water-before,
  education, health). Savings groups, entrepreneurship and Dabil are not
  covered yet, so posts on those correctly fall back to `ASSET NEEDED`.
- The library is a snapshot. New photos on the Drive do not appear
  automatically. A durable fix is a Google service account + an `/api/photo`
  proxy endpoint so the app can query Drive at runtime.
- No shared state: two team members don't see each other's approvals or drafts.

## When updating knowledge

Update `knowledge/07-impact-facts.md` first, then redeploy — the generator
reads the files bundled in the deployment, so a stale file means stale drafts.
Retired figures (e.g. "$124,252 in loans", "98% of donations") must not come
back; check the "Retired figures" section before adding any number.
