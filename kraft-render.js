// kraft-render.js — turns a post's `artwork` spec into a rendered kraft frame.
// Each format maps to the same component recipe used in the format gallery
// (examples/format-gallery/build.py), so output matches the approved look.

(function (global) {
  "use strict";

  const K = global.KraftKit;
  const LOGO_SRC = "images/logo_t.png"; // add this file to /images to show the logo

  // Escape everything, then re-allow <br> as the one intentional formatting tag
  // (the gallery uses it to control line breaks in stat labels and headlines).
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]))
      .replace(/&lt;br\s*\/?&gt;/gi, "<br>");
  }

  // Sizes per format, matching templates/post-formats.md
  const SIZES = {
    "Single-stat card": { w: 1080, h: 1080 },
    "Reel": { w: 1080, h: 1920 },
    "Story": { w: 1080, h: 1920 },
    "_default": { w: 1080, h: 1350 }
  };

  function sizeFor(format) {
    return SIZES[format] || SIZES._default;
  }

  // A photo slot: renders the real image when the generator matched one from
  // the library, and falls back to the dashed shot-brief placeholder when not.
  function slot(h, kick, a, fileKey, briefKey, rot, fallback) {
    const file = a && a[fileKey];
    if (file) {
      return "<div class='photo' style='transform:rotate(" + rot + "deg)'>" +
        "<div class='well' style='height:" + h + "px;padding:0;border:none'>" +
        "<img src='" + esc(file) + "' alt=''></div></div>";
    }
    return K.well(h, kick, shotBrief(a, briefKey, fallback), rot);
  }

  function shotBrief(a, key, fallback) {
    const v = a && a[key];
    return esc(v || fallback || "ASSET NEEDED — no photo sourced yet. Add the shot brief here.");
  }

  // ---------- per-format recipes ----------
  function announcement(a) {
    const bullets = (a.bullets || []).slice(0, 3).map((b, i) =>
      "<div class='li'>" + K.badge(i === 0 ? "check" : "money") + "<p>" + esc(b) + "</p></div>"
    ).join("");
    return K.leaf("#4A6B29", "top:-14px;right:-10px;transform:rotate(26deg);width:94px;height:94px") +
      "<div class='tab'>" + esc(a.tab || "Good news") + "</div>" +
      "<h1 style='font-size:74px;margin-top:26px'>" + esc(a.headline || "") + "</h1>" +
      (a.script ? "<div class='script grn' style='font-size:58px;margin-top:16px'>" + esc(a.script) + "</div>" : "") +
      "<div class='dots'></div>" + bullets +
      "<div class='sp'></div>" +
      slot(420, "photo", a, "photoFile", "photoBrief", -1.3) +
      "<div class='sp'></div>" +
      (a.thanks ? "<div class='rbox' style='text-align:center'>" + esc(a.thanks) + "</div>" : "") +
      K.logo(LOGO_SRC) +
      K.heart("#BF4526", "top:140px;right:76px;transform:rotate(12deg)");
  }

  function quoteCard(a) {
    return "<div class='tab'>" + esc(a.tab || "Karimu Talks") + "</div>" +
      "<div class='sp'></div>" +
      K.quote(esc(a.quote || ""), esc(a.name || ""), esc(a.role || ""), 76) +
      "<div class='sp'></div>" +
      slot(360, "photo", a, "photoFile", "photoBrief", 1.2) +
      "<div class='sp'></div>" +
      (a.script ? "<div class='script grn' style='font-size:52px;text-align:center'>" + esc(a.script) + "</div>" : "") +
      K.logo(LOGO_SRC) +
      K.leaf("#BF4526", "bottom:250px;left:-14px;transform:rotate(200deg)");
  }

  function singleStat(a) {
    return "<div class='tab'>" + esc(a.tab || "Where your money goes") + "</div>" +
      "<div class='sp'></div>" +
      K.bigstat(esc(a.stat || ""), esc(a.statLabel || ""), 244) +
      "<div class='dots' style='margin:34px 60px'></div>" +
      (a.body ? "<div class='body' style='text-align:center;padding:0 30px'>" + esc(a.body) + "</div>" : "") +
      "<div class='sp'></div>" + K.logo(LOGO_SRC) +
      K.heart("#BF4526", "top:92px;right:80px;transform:rotate(14deg)") +
      K.heart("#4A6B29", "top:152px;left:76px;transform:rotate(-16deg)");
  }

  function ctaCard(a) {
    const bullets = (a.bullets || []).slice(0, 2).map((b, i) =>
      "<div class='li'>" + K.badge(i === 0 ? "mail" : "people") + "<p>" + esc(b) + "</p></div>"
    ).join("");
    return "<div class='sp'></div>" +
      K.ctaPanel(esc(a.headline || ""), esc(a.script || ""), esc(a.chip || "karimufoundation.org")) +
      "<div style='margin-top:56px'></div>" + bullets +
      "<div class='sp'></div>" +
      (a.payoff ? "<div class='script grn' style='font-size:52px;text-align:center'>" + esc(a.payoff) + "</div>" : "") +
      K.logo(LOGO_SRC);
  }

  function dataCard(a) {
    const rows = (a.stats || []).slice(0, 3).map(s =>
      K.statrow(esc(s.value || ""), esc(s.label || ""), 118, s.color || "#BF4526")
    ).join("");
    return "<div class='tab'>" + esc(a.tab || "The numbers") + "</div>" +
      "<div class='sp'></div>" + rows +
      "<div class='dots'></div>" +
      (a.script ? "<div class='script grn' style='font-size:52px'>" + esc(a.script) + "</div>" : "") +
      "<div class='sp'></div>" +
      (a.chips ? "<div>" + a.chips.slice(0, 2).map(c => "<span class='chip'>" + esc(c) + "</span>").join("") + "</div>" : "") +
      K.logo(LOGO_SRC);
  }

  function beforeAfterPair(a, h) {
    const cell = (lbl, color, fileKey, briefKey, rot, fallback) =>
      "<div style='flex:1;position:relative'>" + K.chipLabel(lbl, color) +
      slot(h, "photo", a, fileKey, briefKey, rot, fallback) + "</div>";
    return "<div style='display:flex;gap:26px;align-items:flex-start'>" +
      cell("Before", "#8A6A32", "beforePhotoFile", "beforeBrief", -1.3, "BEFORE — describe the original state.") +
      cell("After", "#BF4526", "afterPhotoFile", "afterBrief", 1.3, "AFTER — describe the completed state.") +
      "</div>";
  }

  function beforeAfter(a) {
    return "<div class='tab'>" + esc(a.tab || "") + "</div>" +
      "<h2 style='font-size:62px;margin-top:22px'>" + esc(a.headline || "") + "</h2>" +
      "<div style='margin-top:40px'></div>" +
      beforeAfterPair(a, 400) +
      "<div class='sp'></div>" +
      (a.result ? "<div class='body' style='text-align:center;padding:0 20px'>" + esc(a.result) + "</div>" : "") +
      "<div class='sp'></div>" +
      (a.payoff ? "<div class='sticky'><div class='script'>" + esc(a.payoff) + "</div></div>" : "");
  }

  function newsCard(a) {
    return "<div class='tab' style='background:#BF4526'>" + esc(a.tab || "In the national news") + "</div>" +
      "<h1 style='font-size:68px;margin-top:24px'>" + esc(a.headline || "") + "</h1>" +
      "<div class='dots'></div>" +
      (a.quote ? "<div style=\"border-left:8px solid #D6E77C;padding-left:26px;font-family:'Nunito Sans',sans-serif;font-style:italic;font-size:36px;line-height:1.34;color:#3A362C\">&ldquo;" + esc(a.quote) + "&rdquo;</div>" : "") +
      (a.source ? "<div style=\"margin-top:18px;font-family:'Nunito Sans',sans-serif;font-size:28px;color:#6B6250\">— " + esc(a.source) + "</div>" : "") +
      "<div class='sp'></div>" +
      slot(380, "photo", a, "photoFile", "photoBrief", -1.2) +
      "<div class='sp'></div>" +
      (a.script ? "<div class='script grn' style='font-size:52px;text-align:center'>" + esc(a.script) + "</div>" : "") +
      K.logo(LOGO_SRC) +
      K.leaf("#4A6B29", "top:-10px;left:-8px;transform:rotate(150deg)");
  }

  function hookSlide(a) {
    return "<h1 style='font-size:76px'>" + esc(a.headline || "") + "</h1>" +
      (a.banner ? K.banner(esc(a.banner), "#BF4526", 60, 3) : "") +
      "<div style='margin-top:40px'></div>" +
      slot(520, "photo", a, "photoFile", "photoBrief", -1.3) +
      "<div class='sp'></div>" +
      (a.script ? "<div class='script grn' style='font-size:54px;text-align:center'>" + esc(a.script) + "</div>" : "") +
      K.logo(LOGO_SRC) +
      K.heart("#BF4526", "top:120px;right:70px;transform:rotate(10deg)");
  }

  function reelCover(a) {
    return "<h1 style='font-size:82px;margin-top:30px'>" + esc(a.headline || "") + "</h1>" +
      (a.banner ? K.banner(esc(a.banner), "#BF4526", 64, 5) : "") +
      "<div style='margin-top:40px'></div>" +
      slot(620, "photo / first frame", a, "photoFile", "photoBrief", -1.2) +
      "<div class='sp'></div>" +
      (a.script ? "<div class='script grn' style='font-size:58px;text-align:center'>" + esc(a.script) + "</div>" : "") +
      K.logo(LOGO_SRC);
  }

  const RECIPES = {
    "Announcement card": announcement,
    "Quote card": quoteCard,
    "Single-stat card": singleStat,
    "CTA card": ctaCard,
    "Data card": dataCard,
    "Before / After": beforeAfter,
    "News / milestone card": newsCard,
    "Hook + payoff carousel": hookSlide,
    "Full carousel": hookSlide,
    "Reel": reelCover,
    "Story": reelCover
  };

  // Render one post's artwork. Returns an HTML string, or null when the post
  // carries no artwork spec (older posts, or formats with no recipe).
  function render(post) {
    if (!post || !post.artwork) return null;
    const a = post.artwork;
    const recipe = RECIPES[post.format] || RECIPES[a.format];
    if (!recipe) return null;
    const size = sizeFor(post.format);
    return K.page(recipe(a), { w: size.w, h: size.h, seed: 7 });
  }

  global.KraftRender = { render, sizeFor, RECIPES };
})(window);
