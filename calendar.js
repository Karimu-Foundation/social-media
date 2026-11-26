// calendar.js — the "Calendar" tab: weekly themes + a posting calendar built
// from approved posts. Loaded after app.js and reuses its globals (POSTS,
// getEntry, inLanguage, languagesOf, LANGS, escapeHTML, openModal, renderAll).
//
// The calendar is shared through /api/calendar when a Redis store is
// connected; otherwise it is saved in this browser (same as approvals). Each
// slot keeps a snapshot of the post (title, pillar, format, channels) so
// teammates whose browser doesn't have that post — e.g. an AI draft made
// elsewhere — still see what is scheduled.

const CAL_LOCAL_KEY = "karimu-calendar-v1";
const CAL_VIEW_KEY = "karimu-view-v1";
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let cal = { rev: 0, weeks: {}, slots: [] };
let calShared = null; // true = /api/calendar, false = this browser only
let calWeek = mondayOf(new Date());
let calAddingDate = null;
let calSyncMsg = "";
let calApprovedFilter = "";
let calPollTimer = null;

// ---------- dates (local time, YYYY-MM-DD) ----------
function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseYmd(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function mondayOf(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return ymd(x);
}
function addDays(s, n) {
  const d = parseYmd(s);
  d.setDate(d.getDate() + n);
  return ymd(d);
}
function weekLabel(monday) {
  const a = parseYmd(monday), b = parseYmd(addDays(monday, 6));
  const left = `${MONTHS[a.getMonth()]} ${a.getDate()}`;
  const right = a.getMonth() === b.getMonth() ? `${b.getDate()}` : `${MONTHS[b.getMonth()]} ${b.getDate()}`;
  return `${left} – ${right}, ${b.getFullYear()}`;
}
const calId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

// ---------- storage + sync ----------
function calLoadLocal() {
  try {
    const raw = localStorage.getItem(CAL_LOCAL_KEY);
    const d = raw ? JSON.parse(raw) : null;
    if (d && d.weeks && d.slots) return d;
  } catch (e) { /* fall through */ }
  return { rev: 0, weeks: {}, slots: [] };
}
function calSaveLocal() {
  try { localStorage.setItem(CAL_LOCAL_KEY, JSON.stringify(cal)); } catch (e) { calSyncMsg = "Could not save in this browser (storage full)."; }
}

async function calFetch() {
  try {
    const r = await fetch("/api/calendar", { cache: "no-store" });
    if (r.ok) {
      const doc = await r.json();
      if (calShared !== true && doc.rev === 0) {
        // First time the shared store is used: bring along what this browser had.
        const local = calLoadLocal();
        if (local.slots.length || Object.keys(local.weeks).length) {
          cal = Object.assign({}, local, { rev: 0 });
          calShared = true;
          await calPush(() => {});
          return;
        }
      }
      cal = doc;
      calShared = true;
      return;
    }
    if (r.status !== 503) calSyncMsg = "Shared calendar unavailable right now — showing this browser's copy.";
  } catch (e) { /* offline or no API (local preview) */ }
  calShared = false;
  cal = calLoadLocal();
}

// Apply a change locally, then save it. With the shared store, a conflict
// (someone saved first) re-applies the same change on top of their version.
async function calMutate(fn) {
  fn(cal);
  renderCalendar();
  if (!calShared) { calSaveLocal(); return; }
  await calPush(fn);
}

async function calPush(fn) {
  setCalSync("Saving…");
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const r = await fetch("/api/calendar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseRev: cal.rev || 0, doc: cal }),
      });
      if (r.ok) {
        const j = await r.json();
        cal.rev = j.rev;
        cal.updatedAt = j.updatedAt;
        setCalSync("Saved for the team");
        return;
      }
      if (r.status === 409) {
        cal = (await r.json()).doc;
        fn(cal);
        renderCalendar();
        continue;
      }
      const j = await r.json().catch(() => ({}));
      setCalSync("Not saved: " + (j.error || r.status));
      return;
    } catch (e) {
      setCalSync("Not saved (offline?) — try again.");
      return;
    }
  }
  setCalSync("Not saved: too many people editing at once — try again.");
}

function setCalSync(msg) {
  calSyncMsg = msg;
  const el = document.getElementById("cal-sync");
  if (el) el.textContent = msg;
}

// ---------- data helpers ----------
function weekData(monday) {
  return cal.weeks[monday] || { notes: "", themes: [] };
}
function ensureWeek(c, monday) {
  if (!c.weeks[monday]) c.weeks[monday] = { notes: "", themes: [] };
  return c.weeks[monday];
}
function approvedPosts() {
  return POSTS.filter((p) => getEntry(p.id).status === "approved");
}
function slotSnapshot(post) {
  return {
    postId: post.id, title: post.title, pillar: post.pillar || "", format: post.format || "",
    channels: post.channels || [], langs: languagesOf(post),
  };
}
function slotTitle(slot) {
  const post = slot.postId && POSTS.find((p) => p.id === slot.postId);
  if (!post) return slot.title || slot.note;
  return inLanguage(post, slot.lang || languagesOf(post)[0]).title;
}

// ---------- actions ----------
function calShiftWeek(n) { calWeek = addDays(calWeek, 7 * n); calAddingDate = null; renderCalendar(); }
function calToday() { calWeek = mondayOf(new Date()); calAddingDate = null; renderCalendar(); }

function calAddTheme(ev) {
  ev.preventDefault();
  const f = ev.target;
  const text = f.elements.text.value.trim();
  if (!text) return;
  const t = { id: calId(), text, pillar: f.elements.pillar.value, owner: f.elements.owner.value.trim(), done: false };
  const wk = calWeek;
  calMutate((c) => { ensureWeek(c, wk).themes.push(t); });
}
function calUpdateTheme(id, field, value) {
  const wk = calWeek;
  calMutate((c) => {
    const t = ensureWeek(c, wk).themes.find((x) => x.id === id);
    if (t) t[field] = field === "done" ? !!value : String(value).trim();
  });
}
function calRemoveTheme(id) {
  const wk = calWeek;
  calMutate((c) => { const w = ensureWeek(c, wk); w.themes = w.themes.filter((x) => x.id !== id); });
}
function calSaveNotes(value) {
  const wk = calWeek;
  if (weekData(wk).notes === value) return;
  calMutate((c) => { ensureWeek(c, wk).notes = value; });
}

function calSchedule(postId, date) {
  const post = POSTS.find((p) => p.id === postId);
  if (!post) return;
  const slot = Object.assign({ id: calId(), date, time: "", lang: languagesOf(post)[0], channel: (post.channels || [])[0] || "", note: "", posted: false }, slotSnapshot(post));
  calAddingDate = null;
  calMutate((c) => { c.slots.push(slot); });
}
function calAddNote(date, text) {
  if (!text.trim()) return;
  const slot = { id: calId(), date, time: "", postId: "", lang: "", channel: "", title: "", pillar: "", format: "", channels: [], langs: [], note: text.trim(), posted: false };
  calAddingDate = null;
  calMutate((c) => { c.slots.push(slot); });
}
function calSubmitAdd(ev, date) {
  ev.preventDefault();
  const f = ev.target;
  if (f.elements.post.value) calSchedule(f.elements.post.value, date);
  else calAddNote(date, f.elements.note.value);
}
function calUpdateSlot(id, field, value) {
  calMutate((c) => {
    const s = c.slots.find((x) => x.id === id);
    if (s) s[field] = field === "posted" ? !!value : value;
  });
}
function calRemoveSlot(id) {
  calMutate((c) => { c.slots = c.slots.filter((x) => x.id !== id); });
}
function calOpenAdd(date) { calAddingDate = calAddingDate === date ? null : date; renderCalendar(); }

// Drag and drop: approved posts from the sidebar, or existing slots between days.
function calDragStart(ev, kind, id) {
  ev.dataTransfer.setData("text/plain", JSON.stringify({ kind, id }));
  ev.dataTransfer.effectAllowed = kind === "slot" ? "move" : "copy";
}
function calDragOver(ev) { ev.preventDefault(); ev.currentTarget.classList.add("drop"); }
function calDragLeave(ev) { ev.currentTarget.classList.remove("drop"); }
function calDrop(ev, date) {
  ev.preventDefault();
  ev.currentTarget.classList.remove("drop");
  let d;
  try { d = JSON.parse(ev.dataTransfer.getData("text/plain")); } catch (e) { return; }
  if (d.kind === "post") calSchedule(d.id, date);
  if (d.kind === "slot") calUpdateSlot(d.id, "date", date);
}

// ---------- rendering ----------
function pillarOptions(selected) {
  return `<option value="">Pillar (optional)</option>` + PILLAR_ORDER.map((p) =>
    `<option${p === selected ? " selected" : ""}>${escapeHTML(p)}</option>`).join("");
}

function slotHTML(s) {
  const post = s.postId && POSTS.find((p) => p.id === s.postId);
  const missing = s.postId && !post;
  const notApproved = post && getEntry(post.id).status !== "approved";
  const chans = (post ? post.channels : s.channels) || [];
  const langs = (post ? languagesOf(post) : s.langs) || [];
  const title = escapeHTML(slotTitle(s));
  return `
    <div class="cal-slot${s.posted ? " posted" : ""}${s.postId ? "" : " note"}" draggable="true" ondragstart="calDragStart(event, 'slot', '${s.id}')">
      <div class="cal-slot-top">
        <input type="time" value="${s.time}" onchange="calUpdateSlot('${s.id}', 'time', this.value)" title="Time" />
        <button class="ghost small x" onclick="calRemoveSlot('${s.id}')" title="Remove from calendar">✕</button>
      </div>
      ${s.postId
        ? `<a class="cal-slot-title" href="javascript:void 0" onclick="${post ? `openModal('${s.postId}', false, '${s.lang}')` : ""}">${title}</a>
           <div class="cal-slot-meta">${escapeHTML(s.format || "")}${s.pillar ? " · " + escapeHTML(s.pillar) : ""}</div>
           <div class="cal-slot-row">
             ${chans.length > 1 ? `<select onchange="calUpdateSlot('${s.id}', 'channel', this.value)">${chans.map((c) => `<option${c === s.channel ? " selected" : ""}>${escapeHTML(c)}</option>`).join("")}</select>` : `<span class="badge channel">${escapeHTML(s.channel || chans[0] || "")}</span>`}
             ${langs.length > 1 ? `<select onchange="calUpdateSlot('${s.id}', 'lang', this.value)">${langs.map((l) => `<option value="${l}"${l === s.lang ? " selected" : ""}>${LANGS[l].short}</option>`).join("")}</select>` : `<span class="badge lang">${langs[0] ? LANGS[langs[0]].short : ""}</span>`}
           </div>
           ${missing ? `<div class="cal-warn">Not in this browser's queue</div>` : ""}
           ${notApproved ? `<div class="cal-warn">No longer approved here</div>` : ""}`
        : `<div class="cal-slot-note">📝 ${escapeHTML(s.note)}</div>`}
      <label class="cal-posted"><input type="checkbox" ${s.posted ? "checked" : ""} onchange="calUpdateSlot('${s.id}', 'posted', this.checked)" /> Posted</label>
    </div>`;
}

function renderCalendar() {
  const root = document.getElementById("calendar-view");
  if (!root || root.hidden) return;
  const wk = weekData(calWeek);
  const today = ymd(new Date());
  const days = [0, 1, 2, 3, 4, 5, 6].map((i) => addDays(calWeek, i));
  const approved = approvedPosts();
  const countFor = (id) => cal.slots.filter((s) => s.postId === id).length;
  const q = calApprovedFilter.toLowerCase();
  const listed = approved.filter((p) => !q || [p.title, p.pillar, (p.channels || []).join(" ")].join(" ").toLowerCase().includes(q))
    .sort((a, b) => countFor(a.id) - countFor(b.id));

  const themes = wk.themes.map((t) => `
    <li class="cal-theme${t.done ? " done" : ""}">
      <input type="checkbox" ${t.done ? "checked" : ""} onchange="calUpdateTheme('${t.id}', 'done', this.checked)" title="Done" />
      <input class="t-text" value="${escapeHTML(t.text)}" onchange="calUpdateTheme('${t.id}', 'text', this.value)" />
      <select onchange="calUpdateTheme('${t.id}', 'pillar', this.value)">${pillarOptions(t.pillar)}</select>
      <input class="t-owner" value="${escapeHTML(t.owner)}" placeholder="Who" onchange="calUpdateTheme('${t.id}', 'owner', this.value)" />
      <button class="ghost small x" onclick="calRemoveTheme('${t.id}')" title="Remove">✕</button>
    </li>`).join("");

  const grid = days.map((d, i) => {
    const slots = cal.slots.filter((s) => s.date === d).sort((a, b) => (a.time || "99").localeCompare(b.time || "99"));
    const dt = parseYmd(d);
    const adding = calAddingDate === d;
    return `
      <div class="cal-day${d === today ? " today" : ""}" ondragover="calDragOver(event)" ondragleave="calDragLeave(event)" ondrop="calDrop(event, '${d}')">
        <div class="cal-day-head"><b>${DAY_NAMES[i]}</b> ${dt.getDate()} ${MONTHS[dt.getMonth()]}</div>
        ${slots.map(slotHTML).join("")}
        ${adding ? `
          <form class="cal-add" onsubmit="calSubmitAdd(event, '${d}')">
            <select name="post"><option value="">Choose an approved post…</option>${approved.map((p) => `<option value="${p.id}">${escapeHTML(p.title)}</option>`).join("")}</select>
            <input name="note" placeholder="…or write a note (e.g. Story: event reminder)" />
            <div class="actions"><button class="small primary" type="submit">Add</button><button class="small ghost" type="button" onclick="calOpenAdd('${d}')">Cancel</button></div>
          </form>` : `<button class="small ghost cal-add-btn" onclick="calOpenAdd('${d}')">+ Add</button>`}
      </div>`;
  }).join("");

  root.innerHTML = `
    <div class="cal-head">
      <button class="small" onclick="calShiftWeek(-1)" title="Previous week">←</button>
      <h2>Week of ${weekLabel(calWeek)}</h2>
      <button class="small" onclick="calShiftWeek(1)" title="Next week">→</button>
      <button class="small ghost" onclick="calToday()">This week</button>
      <span class="cal-mode ${calShared ? "shared" : "local"}">${calShared ? "Shared with the team" : "Saved in this browser only"}</span>
      <span class="artwork-note" id="cal-sync">${escapeHTML(calSyncMsg)}</span>
    </div>
    ${calShared === false ? `<div class="cal-banner">The calendar is saved <b>in this browser only</b> until a shared store is connected (Vercel → Storage → Upstash for Redis, on this project). After that, everyone sees and edits the same calendar, and what is saved here is carried over.</div>` : ""}

    <section class="cal-themes">
      <h3>Themes for this week</h3>
      <ul>${themes || `<li class="cal-empty">No themes yet. Add what the team will work on this week.</li>`}</ul>
      <form class="cal-theme-add" onsubmit="calAddTheme(event)">
        <input name="text" placeholder="New theme (e.g. World Toilet Day — Tsaayo bathrooms)" required />
        <select name="pillar">${pillarOptions("")}</select>
        <input name="owner" placeholder="Who" />
        <button class="small primary" type="submit">Add theme</button>
      </form>
      <textarea class="cal-notes" placeholder="Notes for the week: campaigns, dates, who does what…" onchange="calSaveNotes(this.value)">${escapeHTML(wk.notes)}</textarea>
    </section>

    <div class="cal-body">
      <aside class="cal-approved">
        <h3>Approved posts <span class="muted">(${approved.length})</span></h3>
        <input type="search" placeholder="Filter…" value="${escapeHTML(calApprovedFilter)}" oninput="calApprovedFilter=this.value; renderCalendar(); const i=document.querySelector('.cal-approved input'); i.focus(); i.setSelectionRange(i.value.length, i.value.length);" />
        <p class="muted small-note">Drag a post onto a day, or use “+ Add” on the day.</p>
        <div class="cal-approved-list">
          ${listed.map((p) => {
            const n = countFor(p.id);
            return `<div class="cal-approved-item" draggable="true" ondragstart="calDragStart(event, 'post', '${p.id}')">
              <div class="t">${escapeHTML(p.title)}</div>
              <div class="m">${escapeHTML(p.format || "")} · ${escapeHTML((p.channels || []).join(", "))} · ${languagesOf(p).map((l) => LANGS[l].short).join("/")}${n ? ` · <b>scheduled ${n}×</b>` : ""}</div>
            </div>`;
          }).join("") || `<p class="muted">No approved posts yet. Approve posts in the Review queue (✓ Approve) and they appear here.</p>`}
        </div>
      </aside>
      <div class="cal-grid">${grid}</div>
    </div>`;
}

// ---------- view switching ----------
function setView(view) {
  const isCal = view === "calendar";
  document.body.classList.toggle("view-calendar", isCal);
  document.getElementById("review-view").hidden = isCal;
  document.getElementById("calendar-view").hidden = !isCal;
  document.querySelectorAll(".view-tabs button").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  try { localStorage.setItem(CAL_VIEW_KEY, view); } catch (e) { /* ignore */ }
  if (location.hash !== "#" + view) history.replaceState(null, "", "#" + view);
  clearInterval(calPollTimer);
  if (isCal) {
    renderCalendar();
    calFetch().then(renderCalendar);
    // Pick up teammates' changes; skip while someone is typing here.
    calPollTimer = setInterval(async () => {
      if (!calShared || document.hidden) return;
      const a = document.activeElement;
      if (a && a.closest && a.closest("#calendar-view") && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) return;
      const before = cal.rev;
      await calFetch();
      if (cal.rev !== before) renderCalendar();
    }, 30000);
  }
}

// Approving a post in the modal should refresh the calendar's list too.
const renderAllReview = renderAll;
renderAll = function () {
  renderAllReview();
  renderCalendar();
};

document.addEventListener("DOMContentLoaded", () => {
  let start = location.hash === "#calendar" ? "calendar" : location.hash === "#review" ? "review" : null;
  if (!start) { try { start = localStorage.getItem(CAL_VIEW_KEY); } catch (e) { /* ignore */ } }
  setView(start === "calendar" ? "calendar" : "review");
});
