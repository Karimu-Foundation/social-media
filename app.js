// Karimu Content Studio — app logic
// Approval state is stored in this browser's localStorage only (no backend).
// See README.md for how to upgrade to shared/synced storage later.

const STORAGE_KEY = "karimu-posts-state-v1";
const GENERATED_KEY = "karimu-posts-generated-v1";

function loadGenerated() {
  try {
    const raw = localStorage.getItem(GENERATED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Could not read generated posts, starting fresh.", e);
    return [];
  }
}

function saveGenerated(list) {
  try {
    localStorage.setItem(GENERATED_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Could not save generated posts.", e);
  }
}

// Merge locally-generated posts (this browser only, same as approval state)
// into the seed POSTS array so they render in the same pillars/grid.
// Any pillar name a generated post uses that isn't already in PILLAR_ORDER
// gets appended so it still shows up.
const generatedPosts = loadGenerated();
POSTS.push(...generatedPosts);
generatedPosts.forEach((p) => {
  if (p.pillar && !PILLAR_ORDER.includes(p.pillar)) PILLAR_ORDER.push(p.pillar);
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("Could not read saved state, starting fresh.", e);
    return {};
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save state — approvals won't persist in this browser.", e);
  }
}

let state = loadState();

function getEntry(id) {
  if (!state[id]) {
    state[id] = { status: "pending", posted: false, revisions: [] };
  }
  return state[id];
}

function setStatus(id, status) {
  getEntry(id).status = status;
  saveState(state);
  renderAll();
}

function togglePosted(id) {
  const entry = getEntry(id);
  entry.posted = !entry.posted;
  saveState(state);
  renderAll();
}

function addRevisionNote(id, note) {
  const entry = getEntry(id);
  entry.status = "review";
  entry.revisions.push({ note, date: new Date().toISOString() });
  saveState(state);
  renderAll();
  openModal(id); // keep modal open, refreshed
}

// ---- filters ----
let filters = { channel: "all", status: "all", search: "" };

function matchesFilters(post) {
  const entry = getEntry(post.id);
  if (filters.channel !== "all" && !post.channels.includes(filters.channel)) return false;
  if (filters.status !== "all" && entry.status !== filters.status) return false;
  if (filters.search) {
    const hay = (post.title + " " + post.copy + " " + post.program).toLowerCase();
    if (!hay.includes(filters.search.toLowerCase())) return false;
  }
  return true;
}

// ---- rendering ----
function renderOverview() {
  const total = POSTS.length;
  let pending = 0, review = 0, approved = 0, posted = 0;
  POSTS.forEach((p) => {
    const e = getEntry(p.id);
    if (e.status === "pending") pending++;
    if (e.status === "review") review++;
    if (e.status === "approved") approved++;
    if (e.posted) posted++;
  });
  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-pending").textContent = pending;
  document.getElementById("stat-review").textContent = review;
  document.getElementById("stat-approved").textContent = approved;
  document.getElementById("stat-posted").textContent = posted;
}

function statusBadge(status) {
  const labels = { pending: "Pending", review: "In Review", approved: "Approved" };
  return `<span class="badge status-${status}">${labels[status] || status}</span>`;
}

function cardHTML(post) {
  const entry = getEntry(post.id);
  const channelBadges = post.channels.map((c) => `<span class="badge channel">${c}</span>`).join("");
  const flaggedBadge = post.flagged ? `<span class="badge flag">Needs sign-off</span>` : "";
  const generatedBadge = post.generated ? `<span class="badge ai-drafted">AI-drafted</span>` : "";
  const postedBadge = entry.posted ? `<span class="badge status-posted">Posted</span>` : "";
  const hasImages = post.images && post.images.length > 0;
  const thumb = hasImages ? `
    <div class="card-thumb">
      <img src="${post.images[0].thumb}" alt="${escapeHTML(post.images[0].caption || post.title)}" loading="lazy" />
      ${post.images[0].needsConfirmation ? `<span class="badge photo-flag">Photo needs confirmation</span>` : ""}
    </div>` : `
    <div class="card-thumb card-thumb-empty">
      <span>No photo sourced yet — see Assets</span>
    </div>`;
  return `
  <div class="card ${post.flagged ? "flagged" : ""}" data-id="${post.id}">
    ${thumb}
    <div class="badges">
      ${statusBadge(entry.status)}
      ${channelBadges}
      ${flaggedBadge}
      ${generatedBadge}
      ${postedBadge}
    </div>
    <h3>${escapeHTML(post.title)}</h3>
    <div class="meta">${post.format} · ${post.funnelStage} · ${escapeHTML(post.program)}</div>
    <div class="snippet">${escapeHTML(post.copy.slice(0, 220))}</div>
    <div class="actions">
      <button class="small" onclick="openModal('${post.id}')">View →</button>
      <button class="small primary" ${entry.status === "approved" ? "disabled" : ""} onclick="setStatus('${post.id}', 'approved')">✓ Approve</button>
      <button class="small warn" onclick="openModal('${post.id}', true)">↩ Revise</button>
      <button class="small ghost" onclick="togglePosted('${post.id}')">${entry.posted ? "Posted ✓" : "📤 Mark Posted"}</button>
    </div>
  </div>`;
}

function renderPillars() {
  const container = document.getElementById("pillars");
  container.innerHTML = "";
  let anyVisible = false;

  PILLAR_ORDER.forEach((pillar) => {
    const posts = POSTS.filter((p) => p.pillar === pillar && matchesFilters(p));
    if (posts.length === 0) return;
    anyVisible = true;
    const section = document.createElement("section");
    section.className = "pillar-section";
    section.innerHTML = `
      <div class="pillar-header">
        <h2>${pillar}</h2>
        <span class="count">${posts.length} post${posts.length === 1 ? "" : "s"}</span>
      </div>
      <div class="grid">${posts.map(cardHTML).join("")}</div>
    `;
    container.appendChild(section);
  });

  if (!anyVisible) {
    container.innerHTML = `<div class="empty-state">No posts match these filters.</div>`;
  }
}

function renderAll() {
  renderOverview();
  renderPillars();
}

// ---- modal ----
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function openModal(id, focusRevision) {
  const post = POSTS.find((p) => p.id === id);
  if (!post) return;
  const entry = getEntry(id);

  const shotsTable = post.shots ? `
    <section>
      <h4>Shot-by-shot</h4>
      <table class="shots">
        <tr><th>Time</th><th>On-screen</th><th>Voiceover / dialogue</th></tr>
        ${post.shots.map((s) => `<tr><td>${escapeHTML(s.time)}</td><td>${escapeHTML(s.onscreen)}</td><td>${escapeHTML(s.voiceover)}</td></tr>`).join("")}
      </table>
      ${post.videoTitle ? `<div class="field" style="margin-top:8px;"><b>Video title:</b> ${escapeHTML(post.videoTitle)}</div>` : ""}
    </section>` : "";

  const gallery = (post.images && post.images.length) ? `
    <section>
      <h4>Sourced photos <span style="text-transform:none; letter-spacing:0; font-weight:400;">(from the Karimu Pictures shared drive — pick final shot &amp; confirm consent before publishing)</span></h4>
      <div class="gallery">
        ${post.images.map((img, i) => `
          <figure class="gallery-item">
            <img src="${img.full}" alt="${escapeHTML(img.caption || post.title)}" loading="lazy" onclick="openLightbox('${post.id}', ${i})" />
            <figcaption>${escapeHTML(img.caption || "")}${img.needsConfirmation ? ` <span class="badge photo-flag" style="margin-left:4px;">Needs confirmation</span>` : ""}</figcaption>
          </figure>
        `).join("")}
      </div>
    </section>` : "";

  const revisionLog = entry.revisions.length ? `
    <div class="revision-log">
      ${entry.revisions.map((r) => `<div class="entry"><b>${new Date(r.date).toLocaleString()}:</b> ${escapeHTML(r.note)}</div>`).join("")}
    </div>` : "";

  const artworkHTML = (typeof KraftRender !== "undefined" && KraftRender.render(post)) || null;
  const artSize = artworkHTML && typeof KraftRender !== "undefined" ? KraftRender.sizeFor(post.format) : null;
  const tallClass = artSize && artSize.h >= 1900 ? " tall" : "";
  const artworkSection = artworkHTML ? `
    <section>
      <h4>Artwork <span style="text-transform:none; letter-spacing:0; font-weight:400;">(kraft template — photo slots are shot briefs until a real photo is dropped in)</span></h4>
      <div class="artwork-stage">
        <div class="artwork-scaler${tallClass}" id="artwork-scaler">${artworkHTML}</div>
      </div>
      <div class="actions" style="margin-top:10px;">
        <button class="small" onclick="downloadArtwork('${post.id}')">⬇ Download PNG</button>
        <span class="artwork-note" id="artwork-note"></span>
      </div>
    </section>` : "";

  document.getElementById("modal-root").innerHTML = `
  <div class="overlay" id="overlay">
    <div class="modal">
      <div class="modal-head">
        <div>
          <div class="badges" style="margin-bottom:8px;">
            ${statusBadge(entry.status)}
            ${post.channels.map((c) => `<span class="badge channel">${c}</span>`).join("")}
            ${post.flagged ? `<span class="badge flag">Needs sign-off</span>` : ""}
          </div>
          <h2>${escapeHTML(post.title)}</h2>
          <div class="meta">${post.pillar} · ${post.format} · Funnel: ${post.funnelStage} · Persona: ${escapeHTML(post.persona)}</div>
        </div>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>

      <section>
        <h4>Copy</h4>
        <div class="copy-block">${escapeHTML(post.copy)}</div>
      </section>

      ${shotsTable}

      ${artworkSection}

      ${gallery}

      <section>
        <h4>Delivery details</h4>
        ${post.formatReason ? `<div class="field"><b>Why this format:</b> ${escapeHTML(post.formatReason)}</div>` : ""}
        <div class="field"><b>CTA:</b> ${escapeHTML(post.cta)}</div>
        <div class="field"><b>Link:</b> ${escapeHTML(post.link)}</div>
        <div class="field"><b>Hashtags:</b> ${post.hashtags.length ? escapeHTML(post.hashtags.join(" ")) : "n/a"}</div>
        <div class="field"><b>Visual direction:</b> ${escapeHTML(post.visual)}</div>
        <div class="field"><b>Assets:</b> ${escapeHTML(post.assets)}</div>
        <div class="field"><b>Alt text:</b> ${escapeHTML(post.altText)}</div>
        <div class="field"><b>Notes / verify:</b> ${escapeHTML(post.notes)}</div>
      </section>

      <section>
        <h4>Review</h4>
        <div class="actions">
          <button class="primary" ${entry.status === "approved" ? "disabled" : ""} onclick="setStatus('${post.id}', 'approved')">✓ Approve</button>
          <button class="ghost" onclick="setStatus('${post.id}', 'pending')">Reset to Pending</button>
          <button class="ghost" onclick="togglePosted('${post.id}')">${entry.posted ? "Posted ✓ (undo)" : "📤 Mark Posted"}</button>
          ${post.generated ? `<button class="ghost" onclick="deleteGeneratedPost('${post.id}')">🗑 Remove draft</button>` : ""}
        </div>
        <div class="revision-box">
          <textarea id="revision-note" placeholder="What needs to change before this can be approved?">${focusRevision ? "" : ""}</textarea>
          <div class="actions" style="margin-top:6px;">
            <button class="warn" onclick="submitRevision('${post.id}')">↩ Request Revision</button>
          </div>
        </div>
        ${revisionLog}
      </section>
    </div>
  </div>`;
  document.getElementById("overlay").addEventListener("click", (e) => {
    if (e.target.id === "overlay") closeModal();
  });
  if (focusRevision) {
    setTimeout(() => document.getElementById("revision-note")?.focus(), 50);
  }
}

// Export the rendered kraft frame as a PNG at full size (1080px wide).
// Uses html2canvas, loaded on demand from a CDN.
function loadHtml2Canvas() {
  if (window.html2canvas) return Promise.resolve(window.html2canvas);
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s.onload = () => resolve(window.html2canvas);
    s.onerror = () => reject(new Error("Could not load the image exporter."));
    document.head.appendChild(s);
  });
}

async function downloadArtwork(id) {
  const post = POSTS.find((p) => p.id === id);
  const note = document.getElementById("artwork-note");
  const scaler = document.getElementById("artwork-scaler");
  if (!post || !scaler) return;
  const frame = scaler.querySelector(".kraft-root");
  if (!frame) return;

  if (note) note.textContent = "Rendering…";
  try {
    const html2canvas = await loadHtml2Canvas();
    // The preview is zoomed down; capture at true 1080px by neutralizing zoom.
    const prevZoom = scaler.style.zoom;
    scaler.style.zoom = "1";
    const canvas = await html2canvas(frame, {
      backgroundColor: null,
      scale: 1,
      useCORS: true,
      logging: false,
      width: frame.offsetWidth,
      height: frame.offsetHeight,
    });
    scaler.style.zoom = prevZoom;

    const link = document.createElement("a");
    const safe = (post.title || "karimu-post").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    link.download = safe + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    if (note) note.textContent = "Saved.";
  } catch (e) {
    if (note) note.textContent = "Couldn't export: " + e.message;
  }
}

function submitRevision(id) {
  const note = document.getElementById("revision-note").value.trim();
  if (!note) {
    alert("Add a short note on what needs to change first.");
    return;
  }
  addRevisionNote(id, note);
}

function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
}

function openLightbox(id, index) {
  const post = POSTS.find((p) => p.id === id);
  if (!post || !post.images || !post.images[index]) return;
  const img = post.images[index];
  const existing = document.getElementById("lightbox-root");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.id = "lightbox-root";
  el.className = "lightbox-overlay";
  el.innerHTML = `
    <div class="lightbox-inner">
      <img src="${img.full}" alt="${escapeHTML(img.caption || post.title)}" />
      <div class="lightbox-caption">${escapeHTML(img.caption || "")}</div>
      <button class="close-btn lightbox-close" aria-label="Close">✕</button>
    </div>`;
  el.addEventListener("click", (e) => {
    if (e.target === el || e.target.classList.contains("lightbox-close")) el.remove();
  });
  document.body.appendChild(el);
}

// ---- filter bar wiring ----
function initFilters() {
  const channelSel = document.getElementById("filter-channel");
  const statusSel = document.getElementById("filter-status");
  const search = document.getElementById("filter-search");

  const channels = Array.from(new Set(POSTS.flatMap((p) => p.channels))).sort();
  channelSel.innerHTML = `<option value="all">All channels</option>` +
    channels.map((c) => `<option value="${c}">${c}</option>`).join("");

  channelSel.addEventListener("change", () => { filters.channel = channelSel.value; renderPillars(); });
  statusSel.addEventListener("change", () => { filters.status = statusSel.value; renderPillars(); });
  search.addEventListener("input", () => { filters.search = search.value; renderPillars(); });
}

// ---- request new posts ----
function closeRequestModal() {
  document.getElementById("request-modal-root").innerHTML = "";
}

function openRequestModal() {
  const channelOptions = ["Instagram", "Facebook", "LinkedIn", "YouTube", "WhatsApp"];
  const pillarOptions = Array.from(new Set(POSTS.map((p) => p.pillar)));

  document.getElementById("request-modal-root").innerHTML = `
  <div class="overlay" id="request-overlay">
    <div class="modal request-modal">
      <div class="modal-head">
        <div>
          <h2>Request new posts</h2>
          <div class="meta">Drafts are generated by the Karimu Comms Agent, grounded in the project's knowledge base. Nothing is posted — every draft lands here as "Pending" for review.</div>
        </div>
        <button class="close-btn" onclick="closeRequestModal()">✕</button>
      </div>

      <section>
        <div class="field-row">
          <label>Number of posts
            <input type="number" id="req-qty" min="1" max="10" value="3" />
          </label>
        </div>

        <div class="field-row">
          <label>Channel(s)</label>
          <div class="checkbox-group" id="req-channels">
            ${channelOptions.map((c) => `
              <label class="checkbox-pill"><input type="checkbox" value="${c}" ${c === "Instagram" || c === "Facebook" ? "checked" : ""}/> ${c}</label>
            `).join("")}
          </div>
        </div>

        <div class="field-row">
          <label>Content pillar
            <select id="req-pillar">
              <option value="">Let the agent choose</option>
              ${pillarOptions.map((p) => `<option value="${escapeHTML(p)}">${escapeHTML(p)}</option>`).join("")}
            </select>
          </label>
        </div>

        <div class="field-row">
          <label>Post format
            <select id="req-format">
              <option value="">Let the agent choose (uses the decision table)</option>
              <option value="Before / After">Before / After</option>
              <option value="Data card">Data card</option>
              <option value="Announcement card">Announcement card</option>
              <option value="Quote card">Quote card</option>
              <option value="Single-stat card">Single-stat card (1:1)</option>
              <option value="Hook + payoff carousel">Hook + payoff carousel (2–3 slides)</option>
              <option value="Full carousel">Full carousel (5–6 slides)</option>
              <option value="News / milestone card">News / milestone card</option>
              <option value="CTA card">CTA card</option>
              <option value="Reel">Reel / Short (9:16)</option>
              <option value="Story">Story (9:16)</option>
            </select>
          </label>
        </div>

        <div class="field-row">
          <label>Funnel stage
            <select id="req-funnel">
              <option value="">Mixed</option>
              <option value="Attract">Attract</option>
              <option value="Trust">Trust</option>
              <option value="Act">Act</option>
            </select>
          </label>
        </div>

        <div class="field-row">
          <label>Target publish window
            <input type="text" id="req-daterange" placeholder="e.g. week of Sept 22" />
          </label>
        </div>

        <div class="field-row">
          <label>Topic, story, or campaign
            <input type="text" id="req-topic" placeholder="e.g. Dabil survey findings, Arri water expansion" />
          </label>
        </div>

        <div class="field-row">
          <label>Assets already available (optional)
            <input type="text" id="req-assets" placeholder="file names or descriptions, if any" />
          </label>
        </div>

        <div class="field-row">
          <label>Anything else the team should know
            <textarea id="req-notes" rows="2"></textarea>
          </label>
        </div>

        <div id="req-error" class="req-error" style="display:none;"></div>
        <div id="req-status" class="req-status" style="display:none;"></div>

        <div class="actions" style="margin-top:12px;">
          <button class="primary" id="req-submit" onclick="submitRequest()">Generate drafts</button>
          <button class="ghost" onclick="closeRequestModal()">Cancel</button>
        </div>
      </section>
    </div>
  </div>`;

  document.getElementById("request-overlay").addEventListener("click", (e) => {
    if (e.target.id === "request-overlay") closeRequestModal();
  });
}

async function submitRequest() {
  const errBox = document.getElementById("req-error");
  const statusBox = document.getElementById("req-status");
  const submitBtn = document.getElementById("req-submit");
  errBox.style.display = "none";
  statusBox.style.display = "none";

  const qty = document.getElementById("req-qty").value;
  const channels = Array.from(document.querySelectorAll('#req-channels input[type="checkbox"]:checked')).map((el) => el.value);
  const pillar = document.getElementById("req-pillar").value;
  const format = document.getElementById("req-format").value;
  const funnelStage = document.getElementById("req-funnel").value;
  const dateRange = document.getElementById("req-daterange").value.trim();
  const topic = document.getElementById("req-topic").value.trim();
  const assetsAvailable = document.getElementById("req-assets").value.trim();
  const notes = document.getElementById("req-notes").value.trim();

  if (!qty || Number(qty) < 1) {
    errBox.textContent = "Enter a valid number of posts.";
    errBox.style.display = "block";
    return;
  }

  submitBtn.disabled = true;
  statusBox.textContent = "Generating drafts — this can take up to a minute…";
  statusBox.style.display = "block";

  try {
    const resp = await fetch("/api/generate-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: qty, channels, pillar, format, funnelStage, dateRange, topic, assetsAvailable, notes }),
    });
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.error || "The generator returned an error.");
    }
    const newPosts = data.posts || [];
    if (!newPosts.length) {
      throw new Error("No posts came back from the generator.");
    }

    // New drafts always start as pending and flagged, regardless of what the model set.
    newPosts.forEach((p) => { p.flagged = true; });

    const stored = loadGenerated();
    const updated = stored.concat(newPosts);
    saveGenerated(updated);

    POSTS.push(...newPosts);
    newPosts.forEach((p) => { if (p.pillar && !PILLAR_ORDER.includes(p.pillar)) PILLAR_ORDER.push(p.pillar); });

    closeRequestModal();
    renderAll();
  } catch (e) {
    statusBox.style.display = "none";
    errBox.textContent = "Couldn't generate drafts: " + e.message;
    errBox.style.display = "block";
    submitBtn.disabled = false;
  }
}

// Allow removing a generated draft entirely (e.g. after it's copied elsewhere
// or rejected outright) — seed posts from posts-data.js cannot be deleted here.
function deleteGeneratedPost(id) {
  if (!confirm("Remove this draft? This can't be undone in this browser.")) return;
  const stored = loadGenerated().filter((p) => p.id !== id);
  saveGenerated(stored);
  const idx = POSTS.findIndex((p) => p.id === id);
  if (idx !== -1) POSTS.splice(idx, 1);
  closeModal();
  renderAll();
}

document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  renderAll();
});
