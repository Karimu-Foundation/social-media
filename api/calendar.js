// /api/calendar — shared posting calendar + weekly themes (Vercel Node function)
//
// The rest of the Content Studio keeps its state in each browser. The calendar
// is meant for the whole team, so it lives in one shared document in a Redis
// store (Upstash, connected from Vercel → Storage → Upstash for Redis, which
// sets KV_REST_API_URL / KV_REST_API_TOKEN or UPSTASH_REDIS_REST_URL /
// UPSTASH_REDIS_REST_TOKEN). Without a store the endpoint answers 503 and the
// browser falls back to saving the calendar locally.
//
//   GET  /api/calendar               → the document { rev, updatedAt, weeks, slots }
//   PUT  /api/calendar { baseRev, doc } → { rev } — or 409 { doc } when someone
//        else saved first; the browser re-applies its change on top and retries.

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "karimu:calendar:v1";
const MAX_BYTES = 900 * 1024;

// Compare-and-set: write only if the stored rev is still the one the browser
// started from; otherwise return the current document.
const CAS = `local cur = redis.call('GET', KEYS[1])
local r = 0
if cur then r = tonumber(cjson.decode(cur)['rev']) or 0 end
if r ~= tonumber(ARGV[2]) then return cur or '' end
redis.call('SET', KEYS[1], ARGV[1])
return 'OK'`;

const empty = () => ({ rev: 0, updatedAt: null, weeks: {}, slots: [] });

async function redis(cmd) {
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(j.error || `Store answered ${r.status}`);
  return j.result;
}

const str = (v, n) => (typeof v === "string" ? v.slice(0, n) : "");
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// Keep only the fields the calendar uses, with sane sizes.
function clean(doc) {
  const weeks = {};
  Object.keys((doc && doc.weeks) || {}).filter((k) => DATE.test(k)).slice(0, 520).forEach((k) => {
    const w = doc.weeks[k] || {};
    weeks[k] = {
      notes: str(w.notes, 4000),
      themes: (Array.isArray(w.themes) ? w.themes : []).slice(0, 60).map((t) => ({
        id: str(t.id, 40), text: str(t.text, 300), pillar: str(t.pillar, 80), owner: str(t.owner, 80), done: !!t.done,
      })).filter((t) => t.id && t.text),
    };
  });
  const slots = (Array.isArray(doc && doc.slots) ? doc.slots : []).slice(0, 3000).map((s) => ({
    id: str(s.id, 40), date: DATE.test(s.date) ? s.date : "", time: /^\d{2}:\d{2}$/.test(s.time) ? s.time : "",
    postId: str(s.postId, 80), lang: s.lang === "pt-BR" ? "pt-BR" : s.lang === "en-US" ? "en-US" : "",
    channel: str(s.channel, 40), title: str(s.title, 200), pillar: str(s.pillar, 80), format: str(s.format, 60),
    channels: (Array.isArray(s.channels) ? s.channels : []).slice(0, 8).map((c) => str(c, 40)),
    langs: (Array.isArray(s.langs) ? s.langs : []).filter((l) => l === "en-US" || l === "pt-BR"),
    note: str(s.note, 500), posted: !!s.posted,
  })).filter((s) => s.id && s.date && (s.postId || s.note));
  return { weeks, slots };
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!URL_ || !TOKEN) {
    res.status(503).json({ configured: false, error: "No shared store connected. Connect Upstash for Redis to this project in Vercel → Storage." });
    return;
  }
  try {
    if (req.method === "GET") {
      const raw = await redis(["GET", KEY]);
      res.status(200).json(raw ? JSON.parse(raw) : empty());
      return;
    }
    if (req.method !== "PUT") {
      res.status(405).json({ error: "Use GET or PUT." });
      return;
    }
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    const baseRev = Number(body && body.baseRev);
    if (!Number.isInteger(baseRev) || baseRev < 0 || !body.doc) {
      res.status(400).json({ error: "Send { baseRev, doc }." });
      return;
    }
    const next = Object.assign({ rev: baseRev + 1, updatedAt: new Date().toISOString() }, clean(body.doc));
    const json = JSON.stringify(next);
    if (Buffer.byteLength(json) > MAX_BYTES) {
      res.status(413).json({ error: "The calendar is too large to save. Remove old weeks first." });
      return;
    }
    const out = await redis(["EVAL", CAS, "1", KEY, json, String(baseRev)]);
    if (out === "OK") {
      res.status(200).json({ rev: next.rev, updatedAt: next.updatedAt });
      return;
    }
    res.status(409).json({ doc: out ? JSON.parse(out) : empty() });
  } catch (e) {
    res.status(502).json({ error: "Shared store error: " + e.message });
  }
};
