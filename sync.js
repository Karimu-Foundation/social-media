// sync.js — shares the review state with the whole team through /api/state:
// approvals, "In review" notes, "Posted", and AI-drafted posts. Loaded right
// after app.js; it wraps app.js's saveState / saveGenerated, so the rest of
// the app doesn't change. Each post syncs on its own, so two people working
// on different posts never overwrite each other.
//
// Without a shared store (/api/state answers 503) nothing changes: everything
// stays in this browser, as before. Uploaded photos always stay local.

const SYNC = { on: null, approvals: {}, generated: {}, pushing: 0, timer: null };

const SYNCED_FLAG = "karimu-shared-sync-v1";
const syncJSON = (v) => JSON.stringify(v);
// getEntry() creates an untouched "pending" entry for every post it renders;
// those are not worth sending.
const DEFAULT_ENTRY = syncJSON({ status: "pending", posted: false, revisions: [] });
function syncSnapshot(obj) {
  const out = {};
  Object.keys(obj).forEach((k) => { out[k] = syncJSON(obj[k]); });
  return out;
}
const genMap = (list) => Object.fromEntries(list.map((p) => [p.id, p]));

function setSyncBadge() {
  const el = document.getElementById("sync-mode");
  if (!el) return;
  el.textContent = SYNC.on ? "Shared with the team" : "Saved in this browser only";
  el.className = "sync-mode " + (SYNC.on ? "shared" : "local");
  el.title = SYNC.on
    ? "Approvals, notes, Posted and AI drafts are saved for everyone."
    : "No shared store connected yet: approvals are saved in this browser only.";
}

async function syncPost(payload) {
  SYNC.pushing++;
  try {
    const r = await fetch("/api/state", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.status);
    return true;
  } catch (e) {
    console.warn("Could not share the change:", e);
    alert("This change is saved in your browser, but could not be shared with the team right now (" + e.message + "). It will be retried with your next change.");
    return false;
  } finally {
    SYNC.pushing--;
  }
}

async function pushApprovals() {
  const changed = {};
  Object.keys(state).forEach((id) => {
    const j = syncJSON(state[id]);
    if (SYNC.approvals[id] === j) return;
    if (SYNC.approvals[id] === undefined && j === DEFAULT_ENTRY) return;
    changed[id] = state[id];
  });
  if (!Object.keys(changed).length) return;
  if (await syncPost({ approvals: changed })) {
    Object.keys(changed).forEach((id) => { SYNC.approvals[id] = syncJSON(changed[id]); });
  }
}

async function pushGenerated(list) {
  const now = genMap(list);
  const changed = {};
  Object.keys(now).forEach((id) => { if (SYNC.generated[id] !== syncJSON(now[id])) changed[id] = now[id]; });
  Object.keys(SYNC.generated).forEach((id) => { if (!now[id]) changed[id] = null; });
  if (!Object.keys(changed).length) return;
  if (await syncPost({ generated: changed })) {
    Object.keys(changed).forEach((id) => {
      if (changed[id] === null) delete SYNC.generated[id];
      else SYNC.generated[id] = syncJSON(changed[id]);
    });
  }
}

const saveStateLocal = saveState;
saveState = function (s) {
  saveStateLocal(s);
  if (SYNC.on) pushApprovals();
};

const saveGeneratedLocal = saveGenerated;
saveGenerated = function (list) {
  saveGeneratedLocal(list);
  if (SYNC.on) pushGenerated(list);
};

// Put the team's AI drafts into the queue (and drop ones a teammate removed).
function applyGenerated(list) {
  const ids = new Set(list.map((p) => p.id));
  for (let i = POSTS.length - 1; i >= 0; i--) {
    if (POSTS[i].generated && !ids.has(POSTS[i].id)) POSTS.splice(i, 1);
  }
  list.forEach((p) => {
    if (deletedIds.includes(p.id)) return;
    const i = POSTS.findIndex((x) => x.id === p.id);
    if (i === -1) POSTS.push(p); else POSTS[i] = p;
    if (p.pillar && !PILLAR_ORDER.includes(p.pillar)) PILLAR_ORDER.push(p.pillar);
  });
  saveGeneratedLocal(list);
}

async function syncLoad(first) {
  let data;
  try {
    const r = await fetch("/api/state", { cache: "no-store" });
    if (!r.ok) throw new Error(r.status);
    data = await r.json();
  } catch (e) {
    if (first) { SYNC.on = false; setSyncBadge(); }
    return;
  }
  if (SYNC.pushing) return; // a save is in flight; take the next poll instead
  const localGen = loadGenerated();
  SYNC.on = true;
  setSyncBadge();

  let everSynced = false;
  try { everSynced = !!localStorage.getItem(SYNCED_FLAG); } catch (e) { /* ignore */ }
  if (first && !everSynced) {
    // This browser's first shared load: share what only it has (approvals of
    // posts nobody has reviewed yet, its AI drafts), then take the team's state.
    const server = data.approvals || {};
    SYNC.approvals = syncSnapshot(server);
    Object.keys(state).forEach((id) => { if (server[id]) state[id] = server[id]; });
    const serverGen = genMap(data.generated || []);
    SYNC.generated = syncSnapshot(serverGen);
    await pushApprovals();
    await pushGenerated(Object.values(Object.assign({}, genMap(localGen), serverGen)));
    try { localStorage.setItem(SYNCED_FLAG, new Date().toISOString()); } catch (e) { /* ignore */ }
    return syncLoad(false).then(() => renderAll());
  }
  if (!first) await pushApprovals(); // anything that failed to share earlier

  const before = syncJSON(state) + syncJSON(localGen.map((p) => p.id));
  state = Object.assign({}, data.approvals || {});
  saveStateLocal(state);
  SYNC.approvals = syncSnapshot(state);
  SYNC.generated = syncSnapshot(genMap(data.generated || []));
  applyGenerated(data.generated || []);
  if (first || before !== syncJSON(state) + syncJSON((data.generated || []).map((p) => p.id))) renderAll();
}

document.addEventListener("DOMContentLoaded", async () => {
  await syncLoad(true);
  // Pick up teammates' approvals every 30s while the tab is visible.
  SYNC.timer = setInterval(() => { if (SYNC.on && !document.hidden) syncLoad(false); }, 30000);
  document.addEventListener("visibilitychange", () => { if (SYNC.on && !document.hidden) syncLoad(false); });
});
