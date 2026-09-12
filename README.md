# Karimu Content Studio

Internal post review, approval, and AI-assisted drafting tool for the Karimu
social media team. Nothing in this app publishes anywhere — every card and
every AI-drafted post is a draft that needs human review before it goes out.

## What's here

- `index.html`, `styles.css`, `app.js`, `posts-data.js` — the static review app
  (unchanged behavior from the original: filter, view, approve, request
  revisions, mark posted; approval state saves to `localStorage` only, per
  browser).
- `api/generate-posts.js` — a Vercel serverless function. It's the new part:
  the **+ Request posts** button in the header opens a form (quantity,
  channel, pillar, funnel stage, publish window, topic, available assets,
  notes) and calls this endpoint, which asks Claude (Anthropic API) to draft
  new posts grounded in the `knowledge/` files below. New drafts appear in the
  grid marked **AI-drafted**, start as **Pending**, and go through the same
  approve / revise / mark-posted flow as everything else. They're saved to
  this browser's `localStorage` only (same as approval state) — there is
  still no shared backend/database.
- `knowledge/` — copies of the project's guardrails, voice/tone rules,
  content pillars, channel playbooks, and the only approved impact facts
  (`07-impact-facts.md`). The generator function reads these at request time
  and is instructed never to invent a stat, name, date, or asset that isn't
  in them.

## Setup: environment variable

The generator needs an Anthropic API key. In the Vercel project:

1. Go to **Settings → Environment Variables**.
2. Add `ANTHROPIC_API_KEY` with a valid key from the Anthropic Console
   (`console.anthropic.com`).
3. Redeploy.

Without this variable set, the **+ Request posts** button will show a clear
error instead of failing silently.

### If your key isn't scoped to a workspace

Anthropic API keys created at the organization level (rather than inside a
specific workspace) must name the workspace on every request. If you see the
error *"This API key is not scoped to a workspace"*, add a second environment
variable:

- `ANTHROPIC_WORKSPACE_ID` — the workspace ID from the Anthropic Console
  (Settings → Workspaces → click the workspace; the ID appears in the URL and
  on the workspace page, and looks like `wrkspc_...`).

Then redeploy. If your key *is* already scoped to a workspace, leave this
variable unset — the code only sends the header when it's present.

## Deploying

This repo needs no build step — it's a static site plus one serverless
function, which is exactly what Vercel's zero-config deploy expects:

```bash
npm install -g vercel   # if you don't already have it
vercel                  # first deploy, follow the prompts
vercel --prod           # production deploy
```

Or connect the GitHub repo to a new Vercel project in the Vercel dashboard
(Import Project → pick the repo) and it will deploy on every push to `main`.

## Keeping the knowledge base current

When facts change (new newsletter, new Annual Report), update the source
`knowledge/07-impact-facts.md` (and any other changed file) first, then
redeploy — the generator always reads the files bundled in the deployment,
so a stale file means stale drafts.

## Limitations to know about

- No shared/server-side database: approvals and AI-drafted posts live in
  each team member's own browser `localStorage`. Two people won't see each
  other's approvals or generated drafts. If the team needs a shared queue,
  that's a bigger change (a real database + auth) — happy to scope that
  separately.
- The generator cannot attach real photos/videos. It will either point to
  an existing asset description found in the knowledge base or say
  `ASSET NEEDED: ...` — a human still has to go pick the actual file from
  Drive.
- Every AI-drafted post still needs a human fact-check pass, even though the
  generator is instructed to only use approved figures and flag anything
  uncertain with `[VERIFY: ...]`.
