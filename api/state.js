// /api/state — shared review state for the whole team (Vercel Node function)
//
//   GET  → { approvals: { [postId]: { status, posted, revisions } }, generated: [post, …] }
//   POST { approvals?: { [postId]: entry | null }, generated?: { [postId]: post | null } }
//
// Each post is its own field in a Redis hash, so two people approving
// different posts never overwrite each other (same post: last save wins).
// `null` removes the field. Without a store the endpoint answers 503 and the
// browser keeps everything locally, as before.

const { configured, redis, hashToObject, notConfigured, readBody } = require("../lib/store");

const APPROVALS = "karimu:approvals:v1";
const GENERATED = "karimu:generated:v1";
const STATUSES = new Set(["pending", "review", "approved"]);
const ID = /^[\w.-]{1,80}$/;

function cleanEntry(e) {
  return {
    status: STATUSES.has(e && e.status) ? e.status : "pending",
    posted: !!(e && e.posted),
    revisions: (Array.isArray(e && e.revisions) ? e.revisions : []).slice(-50).map((r) => ({
      note: String((r && r.note) || "").slice(0, 2000),
      date: String((r && r.date) || "").slice(0, 40),
    })),
  };
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!configured()) { notConfigured(res); return; }
  try {
    if (req.method === "GET") {
      const [a, g] = await Promise.all([redis(["HGETALL", APPROVALS]), redis(["HGETALL", GENERATED])]);
      const generated = Object.values(hashToObject(g)).sort((x, y) => String(x.createdAt || "").localeCompare(String(y.createdAt || "")));
      res.status(200).json({ approvals: hashToObject(a), generated });
      return;
    }
    if (req.method !== "POST") {
      res.status(405).json({ error: "Use GET or POST." });
      return;
    }
    const body = readBody(req);
    const ops = [];
    for (const [id, entry] of Object.entries(body.approvals || {}).slice(0, 500)) {
      if (!ID.test(id)) continue;
      ops.push(entry === null ? ["HDEL", APPROVALS, id] : ["HSET", APPROVALS, id, JSON.stringify(cleanEntry(entry))]);
    }
    for (const [id, post] of Object.entries(body.generated || {}).slice(0, 50)) {
      if (!ID.test(id)) continue;
      if (post === null) { ops.push(["HDEL", GENERATED, id]); continue; }
      const json = JSON.stringify(Object.assign({}, post, { id, generated: true }));
      if (Buffer.byteLength(json) > 300 * 1024) {
        res.status(413).json({ error: `Post ${id} is too large to share.` });
        return;
      }
      ops.push(["HSET", GENERATED, id, json]);
    }
    for (const op of ops) await redis(op);
    res.status(200).json({ ok: true, saved: ops.length });
  } catch (e) {
    res.status(502).json({ error: "Shared store error: " + e.message });
  }
};
