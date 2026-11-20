// /api/translate-post — Vercel serverless function (Node runtime)
//
// Takes one Karimu-carousel post and returns its text in the other language
// (pt-BR <-> en-US): title, caption, CTA, hashtags, alt text and every
// on-slide string. Layouts, themes, colours, icons and photos are copied from
// the source server-side, so a translation can never move a photo or change
// a slide's design — only its words.
//
// Called by the browser right after /api/generate-posts when the team asks
// for both languages, and by the "Create English/Portuguese version" button.

const { callClaude, parseJSON } = require("../lib/anthropic");

const LANG_NAME = { "pt-BR": "Brazilian Portuguese", "en-US": "US English" };

// Keys whose values are design or asset data, never words.
const FIXED_KEYS = new Set([
  "layout", "theme", "size", "color", "icon", "badgeIcon", "highlightColor", "calloutColor", "valueColor", "footerIcon",
  "photoId", "photoFile", "photoCredit",
  "beforePhotoId", "beforePhotoFile", "beforePhotoCredit",
  "afterPhotoId", "afterPhotoFile", "afterPhotoCredit",
]);

// Overlay translated strings onto the source structure. Only strings that
// exist in the source, at the same path, are taken from the translation.
function overlay(src, tr) {
  if (Array.isArray(src)) {
    return src.map((v, i) => overlay(v, Array.isArray(tr) ? tr[i] : undefined));
  }
  if (src && typeof src === "object") {
    const out = {};
    Object.keys(src).forEach((k) => {
      out[k] = FIXED_KEYS.has(k) ? src[k] : overlay(src[k], tr && typeof tr === "object" ? tr[k] : undefined);
    });
    return out;
  }
  if (typeof src === "string") {
    return typeof tr === "string" && tr.trim() ? tr : src;
  }
  return src;
}

// Strip photo files (data URLs can be huge) and fixed keys before sending.
function textOnly(v) {
  if (Array.isArray(v)) return v.map(textOnly);
  if (v && typeof v === "object") {
    const out = {};
    Object.keys(v).forEach((k) => { if (!FIXED_KEYS.has(k) || k === "layout") out[k] = textOnly(v[k]); });
    return out;
  }
  return v;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const { post, to } = body || {};
  if (!post || !Array.isArray(post.slides) || !LANG_NAME[to]) {
    res.status(400).json({ error: "Send { post, to } with a Karimu carousel post and to = 'pt-BR' or 'en-US'." });
    return;
  }
  const from = post.language === "en-US" ? "en-US" : "pt-BR";
  if (from === to) {
    res.status(400).json({ error: "The post is already in that language." });
    return;
  }

  const source = {
    title: post.title || "",
    copy: post.copy || "",
    cta: post.cta || "",
    hashtags: Array.isArray(post.hashtags) ? post.hashtags : [],
    altText: post.altText || "",
    slides: textOnly(post.slides),
  };

  const system = `You translate social media posts for Karimu International Help Foundation from ${LANG_NAME[from]} to ${LANG_NAME[to]}.

Return ONLY a JSON object with exactly the same keys and the same structure as
the input (same array lengths, same nesting), with every human-readable string
translated. No prose, no markdown fences.

Rules:
- Translate meaning and tone, not word for word. Short, confident, declarative
  sentences; community as the subject; Karimu as "we" / "nós".
- Never change a number, date, percentage, currency amount or name. Only adapt
  its formatting to the target locale: ${to === "en-US"
    ? "4,9% → 4.9% · 3.236 → 3,236 · 14 mil+ → 14k+ · US$ 1 → $1 · Nº 1 → No. 1"
    : "4.9% → 4,9% · 3,236 → 3.236 · 14k+ → 14 mil+ · $1 → US$ 1 · No. 1 → Nº 1"}.
- Keep place, ward, school and programme names as they are (Ayalagaya, Arri,
  Dabil, Dareda Kati, Ayalagaya Secondary School).
- Keep "[VERIFY: ...]" and "ASSET NEEDED" markers; translate only the text
  inside them.
- A "quote" is a real person's words. Translate it faithfully and plainly; never
  add, polish or shorten what they said. Names and roles stay accurate.
- Dates in "dateTop" / "dateBottom" / "date" follow the target language
  (Junho → June, Julho 2026 → July 2026).
- "highlight" must be an exact substring of the translated "title" on the same
  slide (the coloured payoff phrase).
- Keep each string about as long as the source: on-slide text has fixed space.
- Hashtags: translate where a natural equivalent exists (#Educação → #Education),
  keep brand tags (#Karimu) and place tags.
- Dignity, never rescue: no "saved / rescued / poor helpless" wording.
- "layout" values are identifiers: copy them unchanged.`;

  let text;
  try {
    text = await callClaude({ system, user: JSON.stringify(source), maxTokens: 12000 });
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
    return;
  }

  let translated;
  try {
    translated = parseJSON(text);
  } catch (e) {
    res.status(502).json({ error: "Could not parse the translation as JSON.", raw: text });
    return;
  }

  const version = {
    title: typeof translated.title === "string" && translated.title ? translated.title : source.title,
    copy: typeof translated.copy === "string" && translated.copy ? translated.copy : source.copy,
    cta: typeof translated.cta === "string" && translated.cta ? translated.cta : source.cta,
    hashtags: Array.isArray(translated.hashtags) && translated.hashtags.length ? translated.hashtags : source.hashtags,
    altText: typeof translated.altText === "string" && translated.altText ? translated.altText : source.altText,
    // Overlay onto the full source slides (with photos), so design and assets
    // come from the source no matter what the model returned.
    slides: overlay(post.slides, translated.slides),
    translatedAt: new Date().toISOString(),
  };

  res.status(200).json({ language: to, version });
};
