# Weekly routine — 5 new Karimu posts every Monday

Runs every **Monday at ~7:00 (America/Sao_Paulo)** as a scheduled Claude Code
session. Each run starts from nothing: this file is the procedure. Follow it
top to bottom. Everything in `CLAUDE.md` (content rules) still applies.

## 0. Setup

1. Attach and clone the repo `Karimu-Foundation/social-media` (push access),
   work on a new branch `routine/posts-YYYY-MM-DD` (today's date) from `main`.
2. Read `CLAUDE.md`, then every file in `knowledge/`, then
   `routines/rotation.json` and the most recent `posts-batch-*.js` files, so the
   new posts do not repeat a story already in the queue.

## 1. Check for a newer report and update the facts

Sources, newest wins (see "Rule of recency" in `07-impact-facts.md`):
- **COO newsletters** (Nelson Mattos): shared drive **"Karimu: Automation"**,
  files named like `YYYY-MM-COO-Newsletter.pdf`.
- **Annual Reports**: shared drive **"Karimu TZ: Strategic Plans & Reports &
  Meetings"** (and copies in "Karimu: Automation"), e.g.
  `Karimu 2025 Annual Report.pdf`. Drafts (`DRAFT`, `Working Draft`,
  `Structure`) are **not** sources.

Compare the newest one with the "Last reconciled" line and source tags in
`knowledge/07-impact-facts.md`. If a report is newer than what the file covers:
1. Update `07-impact-facts.md` **first**: add the new figures with a new source
   tag (e.g. `[NL Oct-26]`), update "Last reconciled", move superseded numbers
   to "Retired figures", and never bring back a retired figure.
2. Only copy figures that are printed in the report. Anything ambiguous goes
   under "Still open" with ⚠ and is not used in posts.
3. Keep a list of every changed or added figure (old → new, source, page) for
   the email.

If nothing is newer, change nothing and say so in the email.

## 2. Pick the 5 themes (rotation)

Rotate through these pillars (Fundraising Support is **never** in the
rotation — it is on request only):

1. Karimu Impact Stories
2. Karimu Talks
3. Karimu Transformed Volunteers
4. Shorts & Reels
5. Institutional & Special Dates
6. Newsletter & Channel Push

Read `routines/rotation.json` → `next` (index into the list above, 0-based).
Take 5 consecutive pillars starting there, wrapping around, then save the
index after the last one as the new `next` and append the run to `history`.

Adjustments:
- **Impact Stories is the backbone (~40%)**: if it is not among the 5, replace
  the last pick with Impact Stories.
- **Newsletter & Channel Push is monthly**: skip it if a Newsletter post was
  created in the last 3 weeks (check `history`); use Impact Stories instead.
- **Special dates** (table in `05-content-pillars.md`, e.g. Jan 24 World
  Education Day, Mar 8 Women's Day, Nov 19 World Toilet Day, GivingTuesday):
  if one falls in the next 14 days, the Institutional post is about it.

## 3. Write the 5 posts

For each post:
- **Instagram first.** Pick the Karimu format that fits (carousel, single
  image, square, Story, Reel cover — see `knowledge/10-karimu-carousel-style.md`
  and `post-formats.md`). Mix formats across the week: at most 2 carousels.
- **English is primary**, with a full **Portuguese version** (`versions`
  `"pt-BR"`), exactly like `posts-batch-2026-11.js`.
- Every figure from `07-impact-facts.md`, with its source tag in `notes`.
  Unknown → `[VERIFY: ...]`. Dignity, never rescue. CTAs: follow / share / read
  / watch. No child's full name + school + location.
- People: only from the "Named people" list; set `flagged: true` and note that
  consent and current title must be confirmed. Never assume pronouns.
- Use a different story from anything in the queue in the last 4 weeks.

## 4. Photos from the Drive

Photos come from two places — search **both**:
- the shared drive **"Karimu: Pictures"** (root id `0AFQB35McY4XQUk9PVA`;
  newest material often in the folder `1FKHWhDMkkdfENj3lUVS0JIxny7V2Bjud`);
  files are usually named `YYYY-MM-DD-Ward-Place-Subject`;
- the **COMMS** folder `1X5X3W2-hebpbOCoU_n2286aL6E2EM9ES` (shared drive
  "2026 September Volunteer Trip"), search with
  `'1X5X3W2-hebpbOCoU_n2286aL6E2EM9ES' in ancestors`. Its subfolders —
  "Volunteers Coverage - Trip Oct 2026", "Impact Stories Series - Photos and
  Videos" and any new ones — hold the comms team's own selections. Files there
  are camera names (`IMG_9834.HEIC`), so take date and context from the
  **subfolder name**, and record ward/place as "Not recorded" unless the photo
  itself or the folder makes it certain. Skip videos (`.MOV`).

For each photo slot:
1. Search by ward, place, project and year; prefer the last 12 months.
2. **Look at every candidate before using it.** Reject: wrong ward or project
   (an Ayalagaya photo never illustrates Arri or Dabil), children in
   undignified or private situations (toilets, undress), brand logos on
   clothing in the centre of frame, blurry or dark shots.
3. Resize to max 1280px, save as `images/library/<first 10 chars of Drive
   id>.jpg`, and add an entry to `photo-index.json` (id, file, title, driveId,
   ward, place, year, stage, topics, caption). Never put words like "poor" in
   captions, even if the Drive file name has them.
4. Portrait photos in wide slots: set `photoPosition` (e.g. `"center 15%"`) so
   faces stay in frame.
5. **HEIC (iPhone) photos are fine**: run `pip install pillow-heif` once, then
   open them with `pillow_heif.register_heif_opener()` before
   `PIL.Image.open`, apply `ImageOps.exif_transpose`, and save as JPEG. If
   nothing fits, leave the slot as a `photoBrief` and write
   `ASSET NEEDED: ...` in `assets`.

## 5. Build, check and publish to the Content Studio

1. Create `posts-batch-YYYY-MM-DD.js` (copy the structure of
   `posts-batch-2026-11.js`; ids `wYYMMDD-1` … `-5`, `batch: "YYYY-MM-DD"`) and
   add its `<script>` tag in `index.html` right after the last
   `posts-batch-*.js` tag.
2. `node --check` every changed JS file.
3. Render every slide of the 5 posts in both languages with Playwright
   (Chromium is preinstalled) by loading `index.html` from a local static
   server and calling `KarimuKit.renderPost(inLanguage(post, lang))`.
   **Look at the screenshots**: no text running into the footer, no value
   breaking onto two lines, faces in frame, highlight colour on the right words.
   Fix and re-render until clean.
4. Commit, push, open a PR titled `Weekly posts YYYY-MM-DD`, wait for the
   Vercel check to pass, then **merge it** (squash not needed) and wait for the
   production deployment on `main` to succeed. The posts then appear in
   https://karimu-posts-app.vercel.app as **Pending**. Nothing is published to
   any social network.
5. If the build fails or the merge is blocked, do not force anything: send the
   email anyway, saying the posts are in the PR and why they are not live.

## 6. Email Edu for approval

Send with Gmail to **eduardo.henrique@karimufoundation.org**, in Portuguese.

- **Subject:** `Content Studio — 5 posts novos para aprovar (semana de DD/MM)`
- **Body** (plain, short):
  1. One line: 5 new posts are in the Content Studio as Pending, with the link
     https://karimu-posts-app.vercel.app (and the PR link).
  2. A table or list: theme · format · title · what it needs (e.g. "pronto",
     "confirmar consentimento da Lucy", "foto necessária").
  3. **Dados novos:** if `07-impact-facts.md` was updated this week, say clearly
     that the posts already use the new data and list each changed figure
     (old → new, source). If not, "Nenhum report novo esta semana."
  4. **Pendências:** every `flagged` post and every `[VERIFY]` / `ASSET NEEDED`.
  5. How to approve: open the post → ✓ Approve, or ↩ Revise with a note.
- Attach one contact-sheet PNG with the English slides of all 5 posts (the
  screenshots from step 5.3) so the posts can be previewed from the email.

## 7. If something goes wrong

Never skip the email. If the run could not finish (no Drive access, Gmail
failed, repo push refused), send what you can — or, if Gmail itself fails,
leave the explanation in the PR description — and describe exactly what
blocked it.
