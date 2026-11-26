// Shared store for the Content Studio: Upstash Redis over its REST API.
// Connected from Vercel → Storage → Upstash for Redis, which sets
// KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL / _TOKEN).

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const configured = () => !!(URL_ && TOKEN);

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

// HGETALL comes back as a flat [field, value, field, value, …] list.
function hashToObject(flat) {
  const out = {};
  for (let i = 0; Array.isArray(flat) && i < flat.length; i += 2) {
    try { out[flat[i]] = JSON.parse(flat[i + 1]); } catch (e) { /* skip a bad row */ }
  }
  return out;
}

function notConfigured(res) {
  res.status(503).json({ configured: false, error: "No shared store connected. Connect Upstash for Redis to this project in Vercel → Storage." });
}

function readBody(req) {
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  return body || {};
}

module.exports = { configured, redis, hashToObject, notConfigured, readBody };
