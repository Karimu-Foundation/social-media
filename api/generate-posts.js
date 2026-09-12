// /api/generate-posts — Vercel serverless function (Node runtime)
//
// Takes a content request from the "Request new posts" form and calls the
// Anthropic API to draft new post objects, grounded in Karimu's own
// knowledge base (loaded from /knowledge at request time). Returns an array
// of post objects matching the schema used by posts-data.js.
//
// Requires an ANTHROPIC_API_KEY environment variable set in the Vercel
// project settings. Nothing is posted anywhere — this only drafts content
// for a human to review in the app.

const fs = require("fs");
const path = require("path");

const KNOWLEDGE_FILES = [
  "SYSTEM_PROMPT.md",
  "07-impact-facts.md",
  "04-voice-and-tone.md",
  "05-content-pillars.md",
  "post-formats.md",
  "example-posts-format-gallery.md",
  "06-channel-playbooks.md",
  "08-guardrails.md",
  "01-brand-identity.md",
  "02-audience-personas.md",
  "09-visual-system.md",
];

function loadKnowledge() {
  return KNOWLEDGE_FILES.map((name) => {
    const file = path.join(process.cwd(), "knowledge", name);
    try {
      const text = fs.readFileSync(file, "utf8");
      return `\n\n===== ${name} =====\n${text}`;
    } catch (e) {
      return `\n\n===== ${name} =====\n[missing from deployment]`;
    }
  }).join("");
}

const SCHEMA_INSTRUCTIONS = `
You must respond with ONLY a JSON array (no prose, no markdown fences) of post
objects. Each object must have exactly these fields:

{
  "pillar": string,               // one of the content pillars in 05-content-pillars.md
  "format": string,               // MUST be a format name from the catalogue in post-formats.md
  "channels": string[],           // e.g. ["Instagram"], ["Facebook","Instagram"]
  "title": string,                // short internal working title
  "funnelStage": "Attract" | "Trust" | "Act",
  "persona": string,               // audience persona name(s) from 02-audience-personas.md
  "program": string,               // the ward/program/project this relates to
  "copy": string,                  // the full ready-to-paste caption
  "cta": string,                   // one explicit CTA, never "Donate now" unless the request explicitly asked for fundraising support
  "link": string,                  // "n/a — Link in bio" if none
  "hashtags": string[],
  "visual": string,                // visual direction: shots, ratio, on-image text
  "assets": string,                // existing asset description, or "ASSET NEEDED: ..." if none exists
  "altText": string,
  "notes": string,                 // verification flags, [VERIFY: ...] for any unconfirmed figure
  "flagged": boolean,              // true if this post needs explicit human sign-off before publishing (new facts, sensitive topic, child imagery, etc.)
  "formatReason": string,          // one sentence: why this format fits this story, per the decision table
  "images": []                     // always an empty array — no real photos can be attached automatically
}

Format selection (read post-formats.md before writing a word):
- Pick the post's SHAPE first, using the decision table in post-formats.md. The
  pillar says what the post is about; the format says what shape it takes.
- The feed is video-first: 9 of the last 12 posts are video, and many "cards" ship
  as animated Reels. Do NOT default to a carousel. Use a carousel only when the
  decision table actually calls for one, and prefer the 2–3 slide hook+payoff shape
  over a 5–6 slide full carousel.
- Use the exact format names from the catalogue: "Before / After", "Data card",
  "Announcement card", "Quote card", "Single-stat card", "Hook + payoff carousel",
  "Full carousel", "News / milestone card", "CTA card", "Reel", "Story".
- Match the aspect ratio to the format (4:5 feed cards, 1:1 single-stat, 9:16 Reel
  and Story) and say it in the "visual" field.
- Keep Instagram captions at or under 90 words, as in the example gallery.
- For a Reel, the "visual" field must include the hook (first 2 seconds), note
  burned-in captions, and keep text out of the bottom 20% and top 10% of frame.

Hard rules (from the knowledge base, restated for emphasis):
- Never invent a statistic, name, place, date, quote, or currency figure. Only use
  facts found in the knowledge base text above. If a needed number isn't there,
  write "[VERIFY: ...]" inside the copy or notes field instead of guessing.
- Never claim an asset exists. If no matching photo/video is described in the
  knowledge base, set "assets" to "ASSET NEEDED: <describe the shot>".
- Dignity, never rescue: never write "we saved / rescued / poor helpless" language.
- Every story-led post needs at least one verified figure; every number-led post
  needs at least one human name or face.
- Default CTAs are follow / subscribe / share / comment / join / read / watch —
  never "Donate now" unless the request explicitly asks for fundraising-campaign
  support.
- Do not use images of children in ways exposing identifying detail (full name +
  school + location together).
- US English spelling, currency in USD unless quoting a Tanzanian source.
`;

module.exports = async (req, res) => {
  // Safe diagnostic: GET returns only whether the env vars are visible to this
  // deployment — never their values — so configuration issues can be checked
  // without exposing secrets.
  if (req.method === "GET") {
    const key = process.env.ANTHROPIC_API_KEY;
    const ws = process.env.ANTHROPIC_WORKSPACE_ID;
    res.status(200).json({
      apiKeyConfigured: Boolean(key),
      apiKeyLength: key ? key.length : 0,
      workspaceIdConfigured: Boolean(ws),
      workspaceIdLength: ws ? ws.length : 0,
      workspaceIdPrefix: ws ? ws.slice(0, 7) : null,
      deployedAt: new Date().toISOString(),
    });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST." });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: "ANTHROPIC_API_KEY is not configured on this deployment. Add it in the Vercel project's Environment Variables settings.",
    });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const {
    quantity = 3,
    channels = [],
    pillar = "",
    format = "",
    funnelStage = "",
    topic = "",
    assetsAvailable = "",
    dateRange = "",
    notes = "",
  } = body;

  const qty = Math.max(1, Math.min(10, parseInt(quantity, 10) || 3));

  const knowledge = loadKnowledge();

  const requestBrief = `
New content request from the social media team:
- Number of posts requested: ${qty}
- Channel(s): ${channels.length ? channels.join(", ") : "agent's choice, pick what fits the topic"}
- Content pillar: ${pillar || "agent's choice — pick the best-fitting pillar(s) from 05-content-pillars.md"}
- Post format: ${format || "agent's choice — use the decision table in post-formats.md, and remember the feed is video-first (do not default to a carousel)"}
- Funnel stage: ${funnelStage || "mixed — vary across Attract/Trust/Act as fits"}
- Target publish window: ${dateRange || "not specified"}
- Topic / story / campaign: ${topic || "not specified — use your judgement based on the knowledge base and what's freshest (e.g. Dabil survey, Arri water, savings groups)"}
- Assets the team says are available: ${assetsAvailable || "none supplied — flag ASSET NEEDED as appropriate"}
- Extra notes from the requester: ${notes || "none"}
`;

  const systemPrompt = `You are the Karimu Comms Agent, the in-house content specialist for Karimu International Help Foundation. Ground every draft strictly in the following knowledge base. Do not use any fact, name, or figure that isn't in it.
${knowledge}
${SCHEMA_INSTRUCTIONS}`;

  // Org-level (unscoped) API keys must name a workspace explicitly. Set
  // ANTHROPIC_WORKSPACE_ID in the Vercel environment variables if your key
  // isn't already scoped to a workspace; leave it unset if it is.
  const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID;

  const anthropicHeaders = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  };
  if (workspaceId) {
    anthropicHeaders["anthropic-workspace-id"] = workspaceId;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: anthropicHeaders,
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: requestBrief }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      res.status(502).json({ error: `Anthropic API error: ${response.status} ${errText}` });
      return;
    }

    const data = await response.json();
    const textBlocks = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    const cleaned = textBlocks.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

    let posts;
    try {
      posts = JSON.parse(cleaned);
    } catch (e) {
      res.status(502).json({ error: "Could not parse the generated posts as JSON.", raw: cleaned });
      return;
    }

    if (!Array.isArray(posts)) posts = [posts];

    const stamped = posts.map((p, i) => ({
      id: `gen-${Date.now()}-${i}`,
      images: [],
      ...p,
      generated: true,
      generatedAt: new Date().toISOString(),
    }));

    res.status(200).json({ posts: stamped });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};
