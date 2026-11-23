// karimu-kit.js — the "Posts fixados" visual system (clean Karimu carousel).
//
// Second visual style next to the kraft kit. Reproduces the layouts of the
// approved pinned-post carousels ("Karimu — Posts fixados", 2nd version):
// white / blue / navy / green / purple backgrounds, Figtree type, a yellow
// eyebrow rule, a page counter, and the horizontal logo lockup in the footer.
// Every slide is 1080x1350 (4:5).
//
// Photos are drawn as CSS background-images, not <img object-fit>, because
// html2canvas (the PNG exporter) does not support object-fit.

(function (global) {
  "use strict";

  const W = 1080, H = 1350;

  const C = {
    navy: "#2B5B7E",      // headlines on white, navy background
    navyBg: "#2D5D80",
    blue: "#3A74B0",      // blue background, highlight text on white
    blueText: "#3D76B5",
    yellow: "#F2C14E",
    rust: "#C0592B",
    orange: "#E07A47",
    green: "#3E8A48",
    greenText: "#3C8A3F",
    greenIcon: "#5B9E2F",
    greenAlt: "#57AE62",
    purple: "#6C57A5",
    purpleIcon: "#8B6FC1",
    ink: "#3A414C",
    gray: "#5B6270",
    light: "#EEF3F9",
    rule: "#E3E8EE",
    white: "#FFFFFF",
  };

  const THEMES = {
    white:  { bg: C.white,  title: C.navy,  text: C.ink,     muted: C.gray,                    eyebrow: C.navy, rule: C.rule,                  hl: C.blueText, dark: false },
    blue:   { bg: C.blue,   title: C.white, text: C.white,   muted: "rgba(255,255,255,.85)",   eyebrow: C.white, rule: "rgba(255,255,255,.28)", hl: C.yellow,   dark: true },
    navy:   { bg: C.navyBg, title: C.white, text: C.white,   muted: "rgba(255,255,255,.82)",   eyebrow: C.white, rule: "rgba(255,255,255,.28)", hl: C.yellow,   dark: true },
    green:  { bg: C.green,  title: C.white, text: C.white,   muted: "rgba(255,255,255,.85)",   eyebrow: C.white, rule: "rgba(255,255,255,.28)", hl: C.yellow,   dark: true },
    purple: { bg: C.purple, title: C.white, text: C.white,   muted: "rgba(255,255,255,.85)",   eyebrow: C.white, rule: "rgba(255,255,255,.28)", hl: C.yellow,   dark: true },
  };

  // Named accent colours the generator may use for highlights, stat numbers,
  // icon circles and phase cards.
  const ACCENTS = {
    blue: C.blueText, navy: C.navy, yellow: C.yellow, rust: C.rust, orange: C.orange,
    green: C.greenText, purple: C.purple, white: C.white,
  };
  const ICON_BG = {
    blue: "#4A8BD0", green: C.greenIcon, purple: C.purpleIcon, orange: C.orange,
    teal: C.greenAlt, yellow: C.yellow, navy: C.navy, rust: C.rust,
  };
  const CARD_BG = { purple: "#7E66B3", blue: C.blue, green: C.green, navy: C.navyBg, orange: C.orange, rust: C.rust };

  function accent(name, fallback) {
    if (!name) return fallback;
    if (/^#[0-9a-f]{3,8}$/i.test(name)) return name;
    return ACCENTS[name] || fallback;
  }

  // ---------- icons (24px grid, stroke) ----------
  const ICONS = {
    pin: "<path d='M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z'/><circle cx='12' cy='9.5' r='2.5'/>",
    drop: "<path d='M12 3s-6.5 7.4-6.5 11.5a6.5 6.5 0 0 0 13 0C18.5 10.4 12 3 12 3Z'/>",
    health: "<rect x='3' y='7' width='18' height='13' rx='2'/><path d='M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2'/><path d='M12 10.5v6M9 13.5h6'/>",
    education: "<path d='M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z'/><path d='M6 11.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5'/>",
    income: "<rect x='3' y='6' width='18' height='13' rx='2'/><path d='M3 10h18'/><path d='M15.5 15h2'/>",
    finance: "<path d='M3 9.5 12 4l9 5.5'/><path d='M4.5 20h15'/><path d='M6 10.5v7M10 10.5v7M14 10.5v7M18 10.5v7'/>",
    seed: "<path d='M12 3s-6 6.5-6 11a6 6 0 0 0 12 0C18 9.5 12 3 12 3Z'/><path d='M12 11v6'/>",
    sprout: "<path d='M12 21v-9'/><path d='M12 12c0-3.5-2.5-6-6.5-6 0 3.5 2.5 6 6.5 6Z'/><path d='M12 12c0-3.5 2.5-6 6.5-6 0 3.5-2.5 6-6.5 6Z'/><path d='M8 21h8'/>",
    tree: "<circle cx='12' cy='9' r='5.5'/><path d='M12 14.5V21'/><path d='M12 17l-2.5-2.5'/><path d='M8.5 21h7'/>",
    heart: "<path d='M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z'/>",
    people: "<circle cx='9' cy='8.5' r='3.2'/><path d='M3.5 19c0-3.2 2.5-5.4 5.5-5.4s5.5 2.2 5.5 5.4'/><circle cx='16.5' cy='9' r='2.6'/><path d='M15.5 13.7c2.7.1 5 2.1 5 5.3'/>",
    share: "<circle cx='18' cy='5.5' r='2.5'/><circle cx='6' cy='12' r='2.5'/><circle cx='18' cy='18.5' r='2.5'/><path d='m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1'/>",
    check: "<path d='m5 12.5 4.5 4.5L19 7.5'/>",
    arrow: "<path d='M5 12h14M13 6l6 6-6 6'/>",
    torch: "<path d='M9 9h6l-1.5 12h-3L9 9Z'/><path d='M12 3c1.6 1.6 2.2 3 1.6 4.4-.4.9-1.1 1.4-1.6 1.6-.5-.2-1.2-.7-1.6-1.6C9.8 6 10.4 4.6 12 3Z'/>",
    home: "<path d='M3.5 11 12 4l8.5 7'/><path d='M5.5 9.5V20h13V9.5'/><path d='M10 20v-5.5h4V20'/>",
    book: "<path d='M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z'/><path d='M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5'/>",
    tap: "<path d='M4 9h9v5H4z'/><path d='M13 11h4a3 3 0 0 1 3 3v2'/><path d='M8.5 14v4'/><path d='M20 19.5v.5'/>",
    star: "<path d='m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z'/>",
    calendar: "<rect x='3.5' y='5' width='17' height='15' rx='2'/><path d='M3.5 10h17M8 3v4M16 3v4'/>",
    chart: "<path d='M4 20V4'/><path d='M4 20h16'/><path d='M8 16v-4M12 16V8M16 16v-6'/>",
    mail: "<rect x='3' y='5.5' width='18' height='13' rx='2'/><path d='m3.5 7 8.5 6 8.5-6'/>",
  };

  function icon(name, color, size, stroke) {
    const p = ICONS[name] || ICONS.check;
    return "<svg width='" + size + "' height='" + size + "' viewBox='0 0 24 24' fill='none' stroke='" + color +
      "' stroke-width='" + (stroke || 2) + "' stroke-linecap='round' stroke-linejoin='round' style='display:block;flex:none'>" + p + "</svg>";
  }

  // ---------- text helpers ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]))
      .replace(/&lt;br\s*\/?&gt;/gi, "<br>");
  }

  // Colour the `highlight` substring of a title. Only the first occurrence.
  function hl(text, highlight, color) {
    const t = String(text || "");
    if (!highlight || t.indexOf(highlight) === -1) return esc(t);
    const i = t.indexOf(highlight);
    return esc(t.slice(0, i)) + "<span style='color:" + color + "'>" + esc(highlight) + "</span>" + esc(t.slice(i + highlight.length));
  }

  // **bold** inside body copy → bold in the title colour (the PDF's habit of
  // setting a lead-in like "Quem apoiamos:" in bold navy).
  function rich(text, boldColor) {
    return esc(text).replace(/\*\*(.+?)\*\*/g, "<b style='font-weight:700;color:" + boldColor + "'>$1</b>");
  }

  // ---------- CSS (injected once) ----------
  const CSS = `
.kk-root{width:${W}px;height:${H}px;position:relative;overflow:hidden;font-family:'Figtree',system-ui,sans-serif;-webkit-font-smoothing:antialiased;box-sizing:border-box}
.kk-root *{box-sizing:border-box;margin:0;padding:0}
.kk-pad{position:absolute;inset:0;padding:68px 80px 0;display:flex;flex-direction:column}
.kk-head{display:flex;align-items:center;justify-content:space-between;height:28px}
.kk-eyebrow{display:flex;align-items:center;gap:22px;font-weight:800;font-size:22px;letter-spacing:.14em;text-transform:uppercase}
.kk-eyebrow i{display:block;width:48px;height:4px;border-radius:2px;background:${C.yellow}}
.kk-count{font-weight:700;font-size:22px;letter-spacing:.04em}
.kk-title{font-weight:800;font-size:70px;line-height:1.08;letter-spacing:-.022em}
.kk-title.sm{font-size:62px}
.kk-body{font-weight:400;font-size:29px;line-height:1.58}
.kk-foot{position:absolute;left:80px;right:80px;bottom:52px;height:64px;display:flex;align-items:center;justify-content:space-between}
.kk-foot img{height:62px;width:auto;display:block}
.kk-foot span{font-weight:700;font-size:22px;display:flex;align-items:center;gap:12px}
.kk-photo{background-size:cover;background-position:center;background-repeat:no-repeat;border-radius:22px;position:relative;overflow:hidden}
.kk-ph{border-radius:22px;border:3px dashed;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:26px;overflow:hidden}
.kk-ph b{font-weight:800;font-size:19px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:10px}
.kk-ph span{font-size:21px;line-height:1.4;max-width:620px}
.kk-stat-n{font-weight:800;font-size:64px;line-height:1.05;letter-spacing:-.02em}
.kk-stat-l{font-weight:400;font-size:23px;line-height:1.45;margin-top:8px}
.kk-chip{position:absolute;top:20px;left:20px;font-weight:800;font-size:20px;letter-spacing:.12em;color:#fff;padding:9px 18px;border-radius:999px;text-transform:uppercase}
.kk-box{background:${C.light};border-radius:22px}
`;

  let injected = false;
  function ensureAssets() {
    if (injected || typeof document === "undefined") return;
    injected = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "karimu-kit-css";
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // ---------- built-in labels, per language ----------
  // Text the layouts supply themselves when a slide leaves it empty. Set per
  // slide from the post's language (see slide()).
  const STRINGS = {
    "pt-BR": { swipe: "Arraste", linkInBio: "Link na bio", nextPinned: "Próximo post fixado", before: "Antes", after: "Depois",
      today: "Hoje", pinned: "Post fixado", photoNeeded: "Foto necessária", briefDefault: "Descreva a foto que precisa ser escolhida.",
      news: "Novidade", watch: "Assista", tapLink: "Toque no link", vote: "Vote na enquete" },
    "en-US": { swipe: "Swipe", linkInBio: "Link in bio", nextPinned: "Next pinned post", before: "Before", after: "After",
      today: "Today", pinned: "Pinned post", photoNeeded: "Photo needed", briefDefault: "Describe the photo that still needs to be chosen.",
      news: "News", watch: "Watch", tapLink: "Tap the link", vote: "Vote in the poll" },
  };
  let T = STRINGS["pt-BR"];

  // ---------- building blocks ----------
  const LOGO = "images/logo-h.png";
  const LOGO_WHITE = "images/logo-h-white.png";

  function photo(file, brief, h, t, opts) {
    opts = opts || {};
    const w = opts.w ? "width:" + opts.w + "px;" : "";
    const r = opts.radius === undefined ? "" : "border-radius:" + opts.radius + "px;";
    const pos = opts.pos ? "background-position:" + String(opts.pos).replace(/[^a-z0-9%. -]/gi, "") + ";" : "";
    const chip = opts.chip ? "<span class='kk-chip' style='background:" + opts.chipColor + "'>" + esc(opts.chip) + "</span>" : "";
    if (file) {
      return "<div class='kk-photo' style='" + w + "height:" + h + "px;" + r + pos + "background-image:url(\"" + String(file).replace(/"/g, "%22") + "\")'>" + chip + "</div>";
    }
    const border = t.dark ? "rgba(255,255,255,.5)" : "#B9C6D6";
    const bg = t.dark ? "rgba(255,255,255,.08)" : "#F4F7FB";
    // Small thumbnails have no room for the brief; it still shows in the
    // upload panel and in the post's visual notes.
    const small = h < 240;
    return "<div class='kk-ph' style='" + w + "height:" + h + "px;" + r + "border-color:" + border + ";background:" + bg + ";color:" + t.muted + ";position:relative" + (small ? ";justify-content:flex-end;padding:14px" : "") + "'>" + chip +
      "<b style='color:" + (t.dark ? C.yellow : C.rust) + (small ? ";font-size:15px;margin:0" : "") + "'>" + esc(T.photoNeeded) + "</b>" +
      (small ? "" : "<span>" + esc(brief || T.briefDefault) + "</span>") + "</div>";
  }

  function head(a, t, ctx) {
    const counter = a.counter !== undefined ? a.counter : (ctx.total > 1 ? pad2(ctx.index + 1) + " / " + pad2(ctx.total) : "");
    return "<div class='kk-head'>" +
      "<div class='kk-eyebrow' style='color:" + t.eyebrow + "'><i></i>" + esc(a.eyebrow || "") + "</div>" +
      "<div class='kk-count' style='color:" + t.eyebrow + "'>" + esc(counter) + "</div></div>";
  }

  function title(a, t, extraStyle, cls) {
    return "<h1 class='kk-title " + (cls || "") + "' style='color:" + t.title + ";" + (extraStyle || "") + "'>" +
      hl(a.title, a.highlight, accent(a.highlightColor, t.hl)) + "</h1>";
  }

  function foot(a, t, ctx, defaultRight) {
    let right = a.footerRight !== undefined ? a.footerRight : defaultRight;
    if (right === undefined) right = ctx.isLast && ctx.total > 1 ? "karimufoundation.org" : "karimufoundation.org";
    const arrow = /arraste|swipe/i.test(right) ? icon("arrow", t.dark ? C.white : C.navy, 26, 2.4) : "";
    return "<div class='kk-foot'><img src='" + (t.dark ? LOGO_WHITE : LOGO) + "' alt='Karimu'>" +
      "<span style='color:" + (t.dark ? C.white : C.navy) + "'>" + esc(right) + arrow + "</span></div>";
  }

  function statBlock(s, t, opts) {
    opts = opts || {};
    const ruleColor = accent(s.color, opts.ruleColor || C.yellow);
    const numColor = s.color ? accent(s.color, t.title) : t.title;
    return "<div style='flex:1;min-width:0;border-top:4px solid " + (s.color ? ruleColor : C.yellow) + ";padding-top:" + (opts.pt || 26) + "px'>" +
      "<div class='kk-stat-n' style='color:" + numColor + ";font-size:" + (opts.size || 64) + "px'>" + esc(s.value) + "</div>" +
      "<div class='kk-stat-l' style='color:" + t.text + "'>" + esc(s.label) + "</div></div>";
  }

  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function sp(px) { return "<div style='height:" + px + "px;flex:none'></div>"; }

  // ---------- layouts ----------
  // Each returns the inner HTML of the slide. `t` is the theme, `ctx` has
  // {index,total,isFirst,isLast}.

  const L = {};

  // Cover: photo on top, rainbow bar, eyebrow + headline + subtitle, swipe cue.
  L.cover = function (a, t, ctx) {
    // The text block below the photo has room for two headline lines at 68px.
    // Longer headlines step the type down and give back photo height, so the
    // subtitle never runs into the footer.
    const len = String(a.title || "").length + (a.subtitle ? String(a.subtitle).length / 4 : 0);
    const fit = len <= 60 ? { ph: 800, fs: 68, sub: 28 } : len <= 92 ? { ph: 770, fs: 62, sub: 27 } : { ph: 700, fs: 54, sub: 25 };
    const bar = ["#4A8BD0", "#6DB33F", "#8B6FC1", C.orange, "#52AE5E"].map(c => "<div style='flex:1;background:" + c + "'></div>").join("");
    const badge = a.badge === "" ? "" :
      "<div style='position:absolute;top:56px;left:64px;background:#fff;border-radius:999px;padding:14px 26px 14px 22px;display:flex;align-items:center;gap:12px;box-shadow:0 4px 14px rgba(0,0,0,.12)'>" +
      icon("pin", C.rust, 28, 2.2) + "<span style='font-weight:800;font-size:22px;letter-spacing:.08em;color:" + C.navy + ";text-transform:uppercase'>" + esc(a.badge || T.pinned) + "</span></div>";
    const img = a.photoFile
      ? "<div style='position:absolute;left:0;top:0;width:" + W + "px;height:" + fit.ph + "px;background:url(\"" + String(a.photoFile).replace(/"/g, "%22") + "\") " + (a.photoPosition || "center") + "/cover no-repeat'></div>"
      : "<div style='position:absolute;left:0;top:0;width:" + W + "px;height:" + fit.ph + "px'>" + photo(null, a.photoBrief, fit.ph, THEMES.white, { radius: 0 }) + "</div>";
    return img + badge +
      "<div style='position:absolute;left:0;top:" + fit.ph + "px;width:" + W + "px;height:10px;display:flex'>" + bar + "</div>" +
      "<div style='position:absolute;left:80px;right:80px;top:" + (fit.ph + 62) + "px'>" +
      "<div class='kk-eyebrow' style='color:" + C.blueText + "'><i></i>" + esc(a.eyebrow || "") + "</div>" +
      "<h1 class='kk-title' style='color:" + C.navy + ";margin-top:24px;font-size:" + fit.fs + "px'>" + hl(a.title, a.highlight, accent(a.highlightColor, C.blueText)) + "</h1>" +
      (a.subtitle ? "<p class='kk-body' style='color:" + C.gray + ";margin-top:14px;font-size:" + fit.sub + "px;line-height:1.5'>" + esc(a.subtitle) + "</p>" : "") +
      "</div>" + foot(a, THEMES.white, ctx, a.footerRight !== undefined ? a.footerRight : T.swipe);
  };

  // Headline + paragraph + wide photo + up to 3 stats in a row.
  L["photo-text"] = function (a, t, ctx) {
    const stats = (a.stats || []).slice(0, 3);
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) +
      (a.body ? "<p class='kk-body' style='color:" + t.text + ";margin-top:26px'>" + rich(a.body, t.title) + "</p>" : "") +
      sp(38) + photo(a.photoFile, a.photoBrief, stats.length ? 380 : 520, t) +
      (stats.length ? "<div style='display:flex;gap:26px;margin-top:34px'>" + stats.map(s => statBlock(s, t, { size: 56, pt: 22 })).join("") + "</div>" : "") +
      "</div>" + foot(a, t, ctx);
  };

  // Headline + paragraph, then photo beside a light "belief" box.
  L.split = function (a, t, ctx) {
    const boxBg = t.dark ? "rgba(255,255,255,.12)" : C.light;
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) +
      (a.body ? "<p class='kk-body' style='color:" + t.text + ";margin-top:26px'>" + rich(a.body, t.title) + "</p>" : "") +
      sp(40) + "<div style='display:flex;gap:32px;align-items:stretch'>" +
      "<div style='flex:1.15'>" + photo(a.photoFile, a.photoBrief, 400, t) + "</div>" +
      "<div style='flex:.85;background:" + boxBg + ";border-radius:22px;padding:36px;display:flex;flex-direction:column;justify-content:center'>" +
      (a.boxLabel ? "<div style='font-weight:800;font-size:22px;letter-spacing:.06em;text-transform:uppercase;color:" + (t.dark ? C.yellow : C.blueText) + ";margin-bottom:14px'>" + esc(a.boxLabel) + "</div>" : "") +
      "<div style='font-weight:600;font-size:28px;line-height:1.45;color:" + t.title + "'>" + esc(a.boxText || "") + "</div></div></div>" +
      "</div>" + foot(a, t, ctx);
  };

  // Numbered principles: yellow circles 1..5, title + one line each.
  L.numbered = function (a, t, ctx) {
    const items = (a.items || []).slice(0, 5);
    const rows = items.map((it, i) =>
      "<div style='display:flex;gap:30px;padding:26px 0;border-top:2px solid " + t.rule + "'>" +
      "<div style='flex:none;width:56px;height:56px;border-radius:50%;background:" + C.yellow + ";color:" + C.navy + ";font-weight:800;font-size:22px;display:flex;align-items:center;justify-content:center'>" + (i + 1) + "</div>" +
      "<div><div style='font-weight:700;font-size:31px;color:" + t.title + "'>" + esc(it.title) + "</div>" +
      "<div style='font-size:24px;line-height:1.45;color:" + t.text + ";margin-top:6px'>" + esc(it.text) + "</div></div></div>").join("");
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) + sp(34) + rows + "</div>" + foot(a, t, ctx);
  };

  // Icon list (the "5 pillars" slide): coloured circle icons + title + line.
  L["icon-list"] = function (a, t, ctx) {
    const items = (a.items || []).slice(0, 5);
    const order = ["blue", "green", "purple", "orange", "teal"];
    const rows = items.map((it, i) =>
      "<div style='display:flex;gap:32px;align-items:center;padding:24px 0;border-top:2px solid " + t.rule + "'>" +
      "<div style='flex:none;width:96px;height:96px;border-radius:50%;background:" + (ICON_BG[it.color] || ICON_BG[order[i % 5]]) + ";display:flex;align-items:center;justify-content:center'>" + icon(it.icon || "check", "#fff", 40, 2) + "</div>" +
      "<div><div style='font-weight:800;font-size:33px;color:" + t.title + "'>" + esc(it.title) + "</div>" +
      "<div style='font-size:24px;line-height:1.45;color:" + t.text + ";margin-top:4px'>" + esc(it.text) + "</div></div></div>").join("");
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t, "", "sm") + sp(30) + rows + "</div>" + foot(a, t, ctx);
  };

  // Photo filling the left 41%, copy with icon bullets on the right, and an
  // optional "next post" teaser box.
  L["side-photo"] = function (a, t, ctx) {
    const items = (a.items || []).slice(0, 3);
    const img = a.photoFile
      ? "<div style='position:absolute;left:0;top:0;width:440px;height:" + H + "px;background:url(\"" + String(a.photoFile).replace(/"/g, "%22") + "\") center/cover no-repeat'></div>"
      : "<div style='position:absolute;left:0;top:0;width:440px;height:" + H + "px'>" + photo(null, a.photoBrief, H, t, { radius: 0 }) + "</div>";
    const rows = items.map(it =>
      "<div style='display:flex;gap:22px;margin-bottom:34px'>" + icon(it.icon || "pin", t.dark ? C.yellow : C.blueText, 36, 2) +
      "<div style='font-size:26px;line-height:1.45;color:" + t.text + "'><b style='font-weight:700;color:" + t.title + "'>" + esc(it.label || "") + "</b> " + esc(it.text || "") + "</div></div>").join("");
    const next = a.nextTitle ? "<div style='background:" + (t.dark ? "rgba(255,255,255,.12)" : C.light) + ";border-radius:22px;padding:28px 30px;display:flex;align-items:center;justify-content:space-between'>" +
      "<div><div style='font-size:22px;color:" + t.muted + "'>" + esc(a.nextLabel || T.nextPinned) + "</div>" +
      "<div style='font-weight:800;font-size:30px;color:" + t.title + ";margin-top:6px'>" + esc(a.nextTitle) + "</div></div>" + icon("arrow", t.title, 32, 2.4) + "</div>" : "";
    const counter = a.counter !== undefined ? a.counter : (ctx.total > 1 ? pad2(ctx.index + 1) + " / " + pad2(ctx.total) : "");
    return img +
      "<div style='position:absolute;left:504px;right:64px;top:68px;bottom:52px;display:flex;flex-direction:column'>" +
      "<div class='kk-head'><div class='kk-eyebrow' style='color:" + t.eyebrow + "'><i></i>" + esc(a.eyebrow || "") + "</div><div class='kk-count' style='color:" + t.eyebrow + "'>" + esc(counter) + "</div></div>" +
      sp(52) + "<h1 class='kk-title' style='color:" + t.title + ";font-size:60px'>" + hl(a.title, a.highlight, accent(a.highlightColor, t.hl)) + "</h1>" + sp(40) + rows +
      "<div style='flex:1'></div>" + next + sp(28) +
      "<img src='" + (t.dark ? LOGO_WHITE : LOGO) + "' alt='Karimu' style='height:62px;width:auto;align-self:flex-start'></div>";
  };

  // Stats grid: headline, optional photo, then 2–6 stats in two columns.
  L.stats = function (a, t, ctx) {
    const stats = (a.stats || []).slice(0, 6);
    const hasPhoto = !!(a.photoFile || a.photoBrief);
    // Up to three figures with no photo: one figure per row, set large, so the
    // slide is filled by the numbers instead of a half-empty grid.
    if (!hasPhoto && stats.length && stats.length <= 3) {
      const rows = stats.map(s => {
        const col = s.color ? accent(s.color, t.title) : t.title;
        return "<div style='display:flex;align-items:center;gap:44px;padding:34px 0;border-top:4px solid " + (s.color ? col : C.yellow) + "'>" +
          "<div class='kk-stat-n' style='flex:none;min-width:330px;font-size:104px;color:" + col + "'>" + esc(s.value) + "</div>" +
          "<div style='font-size:28px;line-height:1.4;color:" + t.text + "'>" + esc(s.label) + "</div></div>";
      }).join("");
      return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) +
        (a.body ? "<p class='kk-body' style='color:" + t.text + ";margin-top:22px'>" + rich(a.body, t.title) + "</p>" : "") +
        sp(56) + rows + "</div>" + foot(a, t, ctx);
    }
    const rowsHtml = [];
    for (let i = 0; i < stats.length; i += 2) {
      rowsHtml.push("<div style='display:flex;gap:46px;margin-top:" + (i ? 36 : 0) + "px'>" +
        statBlock(stats[i], t, { size: hasPhoto ? 60 : 72 }) +
        (stats[i + 1] ? statBlock(stats[i + 1], t, { size: hasPhoto ? 60 : 72 }) : "<div style='flex:1'></div>") + "</div>");
    }
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) +
      (a.body ? "<p class='kk-body' style='color:" + t.text + ";margin-top:22px'>" + rich(a.body, t.title) + "</p>" : "") +
      sp(40) + (hasPhoto ? photo(a.photoFile, a.photoBrief, stats.length > 4 ? 300 : 370, t, { pos: a.photoPosition }) + sp(40) : sp(10)) +
      rowsHtml.join("") + "</div>" + foot(a, t, ctx);
  };

  // Before / after pair with a highlight box underneath.
  L["before-after"] = function (a, t, ctx) {
    const box = (a.calloutValue || a.calloutText) ?
      "<div style='background:" + (t.dark ? "rgba(255,255,255,.12)" : C.light) + ";border-radius:22px;padding:30px 38px;display:flex;align-items:center;gap:34px;margin-top:32px'>" +
      "<div style='flex:none'>" + (a.calloutKicker ? "<div style='font-weight:800;font-size:22px;color:" + C.greenText + "'>" + esc(a.calloutKicker) + "</div>" : "") +
      "<div style='font-weight:800;font-size:96px;line-height:1;color:" + accent(a.calloutColor, C.greenText) + ";letter-spacing:-.03em'>" + esc(a.calloutValue || "") + "</div></div>" +
      "<div style='font-weight:700;font-size:30px;line-height:1.4;color:" + t.title + "'>" + esc(a.calloutText || "") + "</div></div>" : "";
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) + sp(36) +
      "<div style='display:flex;gap:22px'>" +
      "<div style='flex:1'>" + photo(a.beforePhotoFile, a.beforeBrief, 480, t, { chip: a.beforeLabel || T.before, chipColor: "#555B63" }) + "</div>" +
      "<div style='flex:1'>" + photo(a.afterPhotoFile, a.afterBrief, 480, t, { chip: a.afterLabel || T.after, chipColor: C.greenText }) + "</div></div>" +
      box + (a.body ? "<p class='kk-body' style='color:" + t.text + ";margin-top:28px;font-size:26px'>" + rich(a.body, t.title) + "</p>" : "") +
      "</div>" + foot(a, t, ctx);
  };

  // Phase cards (seed / seedling / tree).
  L.phases = function (a, t, ctx) {
    const defaults = [{ color: "purple", icon: "seed" }, { color: "blue", icon: "sprout" }, { color: "green", icon: "tree" }];
    const cards = (a.phases || []).slice(0, 3).map((p, i) => {
      const d = defaults[i] || defaults[0];
      return "<div style='background:" + (CARD_BG[p.color] || CARD_BG[d.color]) + ";border-radius:24px;padding:34px 40px;display:flex;gap:36px;align-items:center;margin-top:" + (i ? 22 : 0) + "px'>" +
        "<div style='flex:none;width:104px;height:104px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center'>" + icon(p.icon || d.icon, "#fff", 44, 2) + "</div>" +
        "<div style='color:#fff'><div style='font-weight:800;font-size:20px;letter-spacing:.14em;text-transform:uppercase'>" + esc(p.kicker || "") + "</div>" +
        "<div style='font-weight:800;font-size:42px;margin-top:4px'>" + esc(p.name || "") + "</div>" +
        (p.meta ? "<div style='font-weight:700;font-size:21px;margin-top:4px'>" + esc(p.meta) + "</div>" : "") +
        "<div style='font-size:23px;line-height:1.45;margin-top:8px'>" + esc(p.text || "") + "</div></div></div>";
    }).join("");
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) + sp(34) + cards +
      (a.footer ? "<p style='font-weight:700;font-size:28px;line-height:1.4;color:" + t.title + ";margin-top:36px'>" + esc(a.footer) + "</p>" : "") +
      "</div>" + foot(a, t, ctx);
  };

  // Two-column comparison: before (muted, bullet) vs today (bold, check).
  L.compare = function (a, t, ctx) {
    const rows = (a.rows || []).slice(0, 5).map(r =>
      "<div style='display:flex;gap:30px;padding:24px 0;border-top:2px solid " + t.rule + ";align-items:center'>" +
      "<div style='flex:1;display:flex;gap:18px;align-items:center;font-size:26px;line-height:1.4;color:" + t.muted + "'><span style='flex:none;width:14px;height:14px;border-radius:50%;background:" + (t.dark ? "rgba(255,255,255,.55)" : "#A9B4C2") + "'></span>" + esc(r.before) + "</div>" +
      "<div style='flex:1;display:flex;gap:18px;align-items:center;font-weight:700;font-size:26px;line-height:1.4;color:" + t.title + "'>" + icon("check", C.yellow, 28, 2.6) + esc(r.after) + "</div></div>").join("");
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) + sp(40) +
      "<div style='display:flex;gap:30px;padding-bottom:18px'>" +
      "<div style='flex:1;font-weight:800;font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:" + t.muted + "'>" + esc(a.leftLabel || T.before) + "</div>" +
      "<div style='flex:1;font-weight:800;font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:" + C.yellow + "'>" + esc(a.rightLabel || T.today) + "</div></div>" +
      rows + (a.footer ? "<p style='font-weight:700;font-size:27px;line-height:1.45;color:" + t.title + ";margin-top:28px'>" + esc(a.footer) + "</p>" : "") +
      "</div>" + foot(a, t, ctx);
  };

  // Comparison table with coloured column headers.
  L.table = function (a, t, ctx) {
    const defaults = [{ color: "purple", icon: "seed" }, { color: "blue", icon: "sprout" }, { color: "green", icon: "tree" }];
    const cols = (a.columns || []).slice(0, 3);
    const colText = cols.map((c, i) => accent(c.color || (defaults[i] || {}).color, t.title));
    const headers = cols.map((c, i) => {
      const d = defaults[i] || defaults[0];
      return "<div style='flex:1;background:" + (CARD_BG[c.color] || CARD_BG[d.color]) + ";border-radius:18px;padding:22px 10px;text-align:center;color:#fff;display:flex;flex-direction:column;align-items:center'>" +
        icon(c.icon || d.icon, "#fff", 34, 2) + "<div style='font-weight:800;font-size:28px;margin-top:10px'>" + esc(c.name || "") + "</div>" +
        (c.sub ? "<div style='font-weight:700;font-size:18px;letter-spacing:.12em;text-transform:uppercase;margin-top:4px'>" + esc(c.sub) + "</div>" : "") + "</div>";
    }).join("");
    const rows = (a.rows || []).slice(0, 5).map(r =>
      "<div style='display:flex;gap:14px;align-items:center;padding:26px 0;border-top:2px solid " + t.rule + "'>" +
      "<div style='width:310px;flex:none;font-weight:700;font-size:25px;line-height:1.3;color:" + t.title + "'>" + esc(r.label) + "</div>" +
      (r.values || []).slice(0, cols.length).map((v, i) => "<div style='flex:1;text-align:center;font-weight:800;font-size:42px;color:" + (t.dark ? "#fff" : colText[i]) + "'>" + esc(v) + "</div>").join("") + "</div>").join("");
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) + sp(36) +
      "<div style='display:flex;gap:14px;margin-left:324px'>" + headers + "</div>" + sp(30) + rows +
      (a.note ? "<p style='font-size:21px;line-height:1.45;color:" + t.muted + ";margin-top:26px'>" + esc(a.note) + "</p>" : "") +
      "</div>" + foot(a, t, ctx);
  };

  // One giant figure, a row of three supporting stats, and a light box.
  L["big-stat"] = function (a, t, ctx) {
    const stats = (a.stats || []).slice(0, 3);
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) + sp(20) +
      "<div style='display:flex;align-items:center;gap:40px'>" +
      "<div style='flex:none;font-weight:900;font-size:220px;line-height:1;letter-spacing:-.05em;color:" + accent(a.valueColor, t.dark ? C.yellow : C.blueText) + "'>" + esc(a.value || "") + "</div>" +
      "<div style='font-weight:700;font-size:32px;line-height:1.35;color:" + t.title + "'>" + esc(a.valueLabel || "") + "</div></div>" + sp(30) +
      (stats.length ? "<div style='display:flex;gap:30px'>" + stats.map(s => statBlock(s, t, { size: 50, pt: 22 })).join("") + "</div>" : "") +
      (a.boxText ? "<div style='background:" + (t.dark ? "rgba(255,255,255,.12)" : C.light) + ";border-radius:22px;padding:32px 38px;margin-top:40px;display:flex;gap:30px;align-items:center'>" +
        (a.boxBadge ? "<div style='flex:none;border:3px solid " + t.title + ";border-radius:10px;padding:16px 18px;font-size:19px;line-height:1.3;color:" + t.title + ";width:156px'>" + esc(a.boxBadge) + "</div>" : "") +
        "<div style='font-weight:600;font-size:26px;line-height:1.45;color:" + (t.dark ? "#fff" : C.blueText) + "'>" + esc(a.boxText) + "</div></div>" : "") +
      "</div>" + foot(a, t, ctx);
  };

  // Year-by-year list (awards, milestones).
  L.timeline = function (a, t, ctx) {
    const rows = (a.items || []).slice(0, 6).map(it =>
      "<div style='display:flex;gap:44px;padding:22px 0;border-top:2px solid " + t.rule + "'>" +
      "<div style='flex:none;width:90px;font-weight:800;font-size:32px;color:" + (t.dark ? C.yellow : C.blueText) + "'>" + esc(it.year) + "</div>" +
      "<div><div style='font-weight:700;font-size:29px;line-height:1.3;color:" + t.title + "'>" + esc(it.title) + "</div>" +
      (it.sub ? "<div style='font-size:22px;color:" + t.muted + ";margin-top:4px'>" + esc(it.sub) + "</div>" : "") + "</div></div>").join("");
    const banner = a.footer ? "<div style='background:rgba(0,0,0,.14);border-radius:20px;padding:26px 40px;margin-top:22px;display:flex;gap:26px;align-items:center'>" +
      icon(a.footerIcon || "star", C.yellow, 34, 2) + "<div style='font-weight:700;font-size:27px;color:" + t.title + "'>" + esc(a.footer) + "</div></div>" : "";
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(56) + title(a, t) + sp(30) + rows + banner + "</div>" + foot(a, t, ctx);
  };

  // Call to action: headline, photo, up to 3 white action cards.
  L.cta = function (a, t, ctx) {
    const cards = (a.actions || []).slice(0, 3).map(x =>
      "<div style='background:#fff;border-radius:22px;padding:28px 32px;display:flex;gap:28px;align-items:center;margin-top:22px'>" +
      "<div style='flex:none;width:78px;height:78px;border-radius:50%;background:" + C.light + ";display:flex;align-items:center;justify-content:center'>" + icon(x.icon || "heart", C.blueText, 34, 2) + "</div>" +
      "<div><div style='font-weight:800;font-size:32px;color:" + C.navy + "'>" + esc(x.title) + "</div>" +
      "<div style='font-size:22px;line-height:1.4;color:" + C.ink + ";margin-top:4px'>" + esc(x.text) + "</div></div></div>").join("");
    return "<div class='kk-pad'>" + head(a, t, ctx) + sp(52) + title(a, t) + sp(30) +
      photo(a.photoFile, a.photoBrief, cards ? 340 : 560, t) + cards + "</div>" + foot(a, t, ctx, T.linkInBio);
  };

  // Before/after rows: up to 4 pairs of thumbnails with a coloured figure.
  L["ba-rows"] = function (a, t, ctx) {
    const colors = ["blue", "green", "purple", "rust"];
    const rows = (a.rows || []).slice(0, 4).map((r, i) => {
      const col = accent(r.color || colors[i], C.blueText);
      return "<div style='display:flex;gap:22px;align-items:center;padding:20px 0;border-top:2px solid " + t.rule + "'>" +
        "<div style='flex:none;width:230px'>" + photo(r.beforePhotoFile, r.beforeBrief, 170, t, { chip: T.before, chipColor: "#555B63" }) + "</div>" +
        "<div style='flex:none;width:230px'>" + photo(r.afterPhotoFile, r.afterBrief, 170, t, { chip: T.after, chipColor: col }) + "</div>" +
        "<div style='padding-left:10px'><div style='font-weight:800;font-size:22px;letter-spacing:.12em;text-transform:uppercase;color:" + col + "'>" + esc(r.kicker || "") + "</div>" +
        "<div style='font-weight:800;font-size:58px;line-height:1.05;color:" + col + "'>" + esc(r.value || "") + "</div>" +
        "<div style='font-size:22px;line-height:1.4;color:" + t.text + "'>" + esc(r.label || "") + "</div></div></div>";
    }).join("");
    return "<div class='kk-pad'>" + head(a, t, Object.assign({}, ctx), ctx) + sp(46) + title(a, t, "", "sm") + sp(26) + rows +
      (a.note ? "<p style='font-size:20px;line-height:1.45;color:" + t.muted + ";margin-top:16px'>" + esc(a.note) + "</p>" : "") +
      "</div>" + foot(a, t, ctx);
  };

  // Full-bleed before (top) / after (bottom) with a blue band in between.
  L["ba-full"] = function (a, t, ctx) {
    const bg = (file, brief) => file
      ? "<div style='position:absolute;inset:0;background:url(\"" + String(file).replace(/"/g, "%22") + "\") center/cover no-repeat'></div>"
      : "<div style='position:absolute;inset:0'>" + photo(null, brief, 520, THEMES.white, { radius: 0 }) + "</div>";
    const pill = (txt, bgc, fg) => "<span style='position:absolute;top:56px;left:64px;background:" + bgc + ";color:" + fg + ";font-weight:800;font-size:22px;letter-spacing:.12em;padding:12px 24px;border-radius:999px;text-transform:uppercase'>" + esc(txt) + "</span>";
    return "<div style='position:absolute;left:0;top:0;width:" + W + "px;height:520px'>" + bg(a.beforePhotoFile, a.beforeBrief) + pill(a.beforeLabel || T.before, "#fff", C.navy) + "</div>" +
      "<div style='position:absolute;left:0;top:520px;width:" + W + "px;height:188px;background:" + C.blue + ";display:flex;align-items:center;gap:36px;padding:0 64px'>" +
      "<div style='flex:none;font-weight:900;font-size:110px;color:#fff;letter-spacing:-.03em'>" + esc(a.value || "") + "</div>" +
      "<div style='font-weight:700;font-size:28px;line-height:1.4;color:#fff'>" + esc(a.text || "") + "</div></div>" +
      "<div style='position:absolute;left:0;top:708px;width:" + W + "px;height:544px'>" + bg(a.afterPhotoFile, a.afterBrief) + pill(a.afterLabel || T.after, C.greenText, "#fff") + "</div>" +
      "<div style='position:absolute;left:0;bottom:0;width:" + W + "px;height:98px;background:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 64px'>" +
      "<img src='" + LOGO + "' alt='Karimu' style='height:56px;width:auto'><span style='font-weight:700;font-size:23px;color:" + C.navy + "'>" + esc(a.footerRight || "") + "</span></div>";
  };

  // ================= single-image templates =================
  // Standalone posts in four sizes: feed 1080x1350, square 1080x1080,
  // story 1080x1920 (Stories and Reel covers) and landscape 1200x628
  // (LinkedIn / Facebook link posts). Each layout reads its canvas from
  // ctx.size and lays itself out for it. Story layouts keep text out of the
  // top 250px and bottom 300px, where Instagram puts its own UI.

  // `pos` is a CSS background-position, e.g. "center 30%" to keep a face
  // in frame when a portrait photo fills a wide slot.
  function bgPhoto(file, brief, css, t, pos) {
    if (file) {
      return "<div style='position:absolute;" + css + ";background:url(\"" + String(file).replace(/"/g, "%22") + "\") " + (pos || "center") + "/cover no-repeat'></div>";
    }
    return "<div style='position:absolute;" + css + ";display:flex'>" +
      "<div class='kk-ph' style='flex:1;border-radius:0;border-color:#B9C6D6;background:#F4F7FB;color:" + C.gray + "'>" +
      "<b style='color:" + C.rust + "'>" + esc(T.photoNeeded) + "</b><span>" + esc(brief || T.briefDefault) + "</span></div></div>";
  }

  function logoTag(dark, h, css) {
    return "<img src='" + (dark ? LOGO_WHITE : LOGO) + "' alt='Karimu' style='height:" + h + "px;width:auto;display:block;flex:none;" + (css || "align-self:flex-start") + "'>";
  }

  function eyebrowTag(text, color, size) {
    return "<div class='kk-eyebrow' style='color:" + color + (size ? ";font-size:" + size + "px" : "") + "'><i></i>" + esc(text || "") + "</div>";
  }

  function titleTag(a, color, hlColor, size, extra) {
    return "<h1 class='kk-title' style='color:" + color + ";font-size:" + size + "px;" + (extra || "") + "'>" +
      hl(a.title, a.highlight, accent(a.highlightColor, hlColor)) + "</h1>";
  }

  // Fit headline size to the copy length and the canvas.
  function fitTitle(text, base) {
    const n = String(text || "").length;
    return n <= 30 ? base : n <= 50 ? Math.round(base * 0.88) : n <= 70 ? Math.round(base * 0.78) : Math.round(base * 0.68);
  }

  const RAINBOW = ["#4A8BD0", "#6DB33F", "#8B6FC1", "#E07A47", "#52AE5E"];
  function rainbow(css, h) {
    return "<div style='position:absolute;" + css + ";height:" + (h || 10) + "px;display:flex'>" +
      RAINBOW.map(c => "<div style='flex:1;background:" + c + "'></div>").join("") + "</div>";
  }

  // Full-bleed photo, dark fade, headline over it.
  L["photo-headline"] = function (a, t, ctx) {
    const S = ctx.size;
    if (S.key === "landscape") {
      return bgPhoto(a.photoFile, a.photoBrief, "right:0;top:0;width:" + Math.round(S.w * 0.52) + "px;height:" + S.h + "px", t) +
        "<div style='position:absolute;left:0;top:0;width:" + Math.round(S.w * 0.48) + "px;height:" + S.h + "px;background:" + C.navyBg + ";padding:54px 52px;display:flex;flex-direction:column'>" +
        eyebrowTag(a.eyebrow, "#fff", 18) + "<div style='height:26px'></div>" +
        titleTag(a, "#fff", C.yellow, fitTitle(a.title, 50)) +
        (a.subtitle ? "<p style='color:rgba(255,255,255,.85);font-size:21px;line-height:1.45;margin-top:16px'>" + esc(a.subtitle) + "</p>" : "") +
        "<div style='flex:1'></div>" + logoTag(true, 44) + "</div>";
    }
    const story = S.key === "story";
    const pad = 80;
    const bottom = story ? 300 : 52;
    return bgPhoto(a.photoFile, a.photoBrief, "inset:0", t, a.photoPosition) +
      "<div style='position:absolute;inset:0;background:linear-gradient(to top, rgba(20,45,68,.94) 0%, rgba(20,45,68,.78) " + (story ? 34 : 38) + "%, rgba(20,45,68,0) " + (story ? 62 : 70) + "%)'></div>" +
      (a.badge ? "<div style='position:absolute;top:" + (story ? 250 : 56) + "px;left:64px;background:#fff;border-radius:999px;padding:13px 24px 13px 20px;display:flex;align-items:center;gap:12px'>" +
        icon(a.badgeIcon || "pin", C.rust, 26, 2.2) + "<span style='font-weight:800;font-size:21px;letter-spacing:.08em;color:" + C.navy + ";text-transform:uppercase'>" + esc(a.badge) + "</span></div>" : "") +
      "<div style='position:absolute;left:" + pad + "px;right:" + pad + "px;bottom:" + (bottom + 104) + "px'>" +
      eyebrowTag(a.eyebrow, "#fff") + "<div style='height:22px'></div>" +
      titleTag(a, "#fff", C.yellow, fitTitle(a.title, S.key === "square" ? 66 : story ? 90 : 74)) +
      (a.subtitle ? "<p style='color:rgba(255,255,255,.88);font-size:28px;line-height:1.5;margin-top:16px'>" + esc(a.subtitle) + "</p>" : "") +
      "</div>" +
      "<div style='position:absolute;left:" + pad + "px;right:" + pad + "px;bottom:" + bottom + "px;height:64px;display:flex;align-items:center;justify-content:space-between'>" +
      logoTag(true, 60) + "<span style='font-weight:700;font-size:22px;color:#fff'>" + esc(a.footerRight !== undefined ? a.footerRight : "karimufoundation.org") + "</span></div>";
  };

  // One figure, set huge. The single-stat card.
  L["stat-card"] = function (a, t, ctx) {
    const S = ctx.size;
    const valColor = accent(a.valueColor, t.dark ? C.yellow : C.blueText);
    if (S.key === "landscape") {
      return rainbow("left:0;right:0;top:0", 8) +
        "<div style='position:absolute;left:56px;right:56px;top:52px;bottom:44px;display:flex;flex-direction:column'>" +
        eyebrowTag(a.eyebrow, t.eyebrow, 18) +
        "<div style='flex:1;display:flex;align-items:center;gap:44px'>" +
        "<div style='flex:none;font-weight:900;font-size:" + Math.round(190 * Math.min(1, 4.2 / Math.max(String(a.value || "").length, 1))) + "px;line-height:1;letter-spacing:-.05em;white-space:nowrap;color:" + valColor + "'>" + esc(a.value) + "</div>" +
        "<div><div style='font-weight:800;font-size:38px;line-height:1.2;color:" + t.title + "'>" + esc(a.label) + "</div>" +
        (a.note ? "<div style='font-size:21px;line-height:1.45;color:" + t.muted + ";margin-top:12px'>" + esc(a.note) + "</div>" : "") + "</div></div>" +
        "<div style='display:flex;justify-content:space-between;align-items:center'>" + logoTag(t.dark, 42) +
        "<span style='font-size:17px;color:" + t.muted + "'>" + esc(a.source || "") + "</span></div></div>";
    }
    const story = S.key === "story";
    const top = story ? 250 : 72;
    // Long values ("US$ 290", "35 mil+") step down so they stay on one line.
    const vLen = String(a.value || "").length;
    const valSize = Math.round((S.key === "square" ? 270 : story ? 360 : 300) * Math.min(1, 4.6 / Math.max(vLen, 1)));
    return rainbow("left:0;right:0;top:0", 10) +
      "<div style='position:absolute;left:80px;right:80px;top:" + top + "px;bottom:" + (story ? 300 : 52) + "px;display:flex;flex-direction:column'>" +
      eyebrowTag(a.eyebrow, t.eyebrow) +
      "<div style='flex:1;display:flex;flex-direction:column;justify-content:center'>" +
      "<div style='font-weight:900;font-size:" + valSize + "px;line-height:.95;letter-spacing:-.05em;white-space:nowrap;color:" + valColor + "'>" + esc(a.value) + "</div>" +
      "<div style='font-weight:800;font-size:" + (S.key === "square" ? 46 : story ? 62 : 52) + "px;line-height:1.15;color:" + t.title + ";margin-top:22px;letter-spacing:-.01em'>" + esc(a.label) + "</div>" +
      (a.note ? "<div style='font-size:28px;line-height:1.5;color:" + t.text + ";margin-top:22px;max-width:860px'>" + rich(a.note, t.title) + "</div>" : "") +
      "</div>" +
      (a.source ? "<div style='font-size:20px;color:" + t.muted + ";margin-bottom:26px'>" + esc(a.source) + "</div>" : "") +
      "<div style='display:flex;justify-content:space-between;align-items:center'>" + logoTag(t.dark, 60) +
      "<span style='font-weight:700;font-size:22px;color:" + (t.dark ? "#fff" : C.navy) + "'>" + esc(a.footerRight !== undefined ? a.footerRight : "karimufoundation.org") + "</span></div></div>";
  };

  // Testimonial: photo, a large quote, name and role.
  L.quote = function (a, t, ctx) {
    const S = ctx.size;
    const qColor = t.dark ? "#fff" : C.navy;
    const mark = "<div style='font-family:Georgia,serif;font-weight:700;font-size:150px;line-height:.7;color:" + C.yellow + ";height:70px'>&ldquo;</div>";
    const body = (size) => mark +
      "<div style='font-weight:700;font-size:" + size + "px;line-height:1.3;color:" + qColor + ";margin-top:18px;letter-spacing:-.01em'>" + esc(a.quote) + "</div>" +
      "<div style='margin-top:30px;display:flex;align-items:center;gap:16px'><i style='display:block;width:40px;height:4px;background:" + C.yellow + ";border-radius:2px'></i>" +
      "<div><div style='font-weight:800;font-size:27px;color:" + (t.dark ? C.yellow : C.blueText) + "'>" + esc(a.name) + "</div>" +
      (a.role ? "<div style='font-size:22px;color:" + t.muted + ";margin-top:2px'>" + esc(a.role) + "</div>" : "") + "</div></div>";
    // Quotes run longer than headlines, so they step down more gently.
    const qSize = (base) => {
      const n = String(a.quote || "").length;
      return n <= 70 ? base : n <= 110 ? Math.round(base * 0.86) : Math.round(base * 0.74);
    };
    if (S.key === "square") {
      return bgPhoto(a.photoFile, a.photoBrief, "left:0;top:0;width:430px;height:" + S.h + "px", t, a.photoPosition || "center 18%") +
        "<div style='position:absolute;left:490px;right:64px;top:72px;bottom:52px;display:flex;flex-direction:column'>" +
        eyebrowTag(a.eyebrow, t.eyebrow) + "<div style='flex:1;display:flex;flex-direction:column;justify-content:center'>" + body(qSize(44)) + "</div>" +
        logoTag(t.dark, 56) + "</div>";
    }
    const story = S.key === "story";
    const photoH = story ? 820 : 560;
    return bgPhoto(a.photoFile, a.photoBrief, "left:0;top:0;width:" + S.w + "px;height:" + photoH + "px", t, a.photoPosition || "center 18%") +
      rainbow("left:0;right:0;top:" + photoH + "px", 10) +
      "<div style='position:absolute;left:80px;right:80px;top:" + (photoH + 60) + "px;bottom:" + (story ? 300 : 52) + "px;display:flex;flex-direction:column'>" +
      eyebrowTag(a.eyebrow, t.eyebrow) + "<div style='height:30px'></div>" + body(qSize(story ? 64 : 58)) +
      "<div style='flex:1'></div><div style='display:flex;justify-content:space-between;align-items:center'>" + logoTag(t.dark, 60) +
      "<span style='font-weight:700;font-size:22px;color:" + (t.dark ? "#fff" : C.navy) + "'>" + esc(a.footerRight !== undefined ? a.footerRight : "karimufoundation.org") + "</span></div></div>";
  };

  // News / milestone: a dated tag, headline, photo and two lines of context.
  L.news = function (a, t, ctx) {
    const S = ctx.size;
    const square = S.key === "square";
    return "<div class='kk-pad' style='padding-top:68px'>" +
      "<div style='display:flex;align-items:center;gap:18px'>" +
      "<span style='background:" + C.rust + ";color:#fff;font-weight:800;font-size:20px;letter-spacing:.14em;text-transform:uppercase;padding:10px 20px;border-radius:999px'>" + esc(a.tag || T.news) + "</span>" +
      "<span style='font-weight:700;font-size:22px;letter-spacing:.08em;text-transform:uppercase;color:" + t.muted + "'>" + esc(a.date || "") + "</span></div>" +
      "<div style='height:34px'></div>" + titleTag(a, t.title, t.hl, fitTitle(a.title, square ? 60 : 68)) +
      "<div style='height:32px'></div>" + photo(a.photoFile, a.photoBrief, square ? 330 : 470, t) +
      (a.body ? "<p class='kk-body' style='color:" + t.text + ";margin-top:28px;font-size:" + (square ? 25 : 28) + "px'>" + rich(a.body, t.title) + "</p>" : "") +
      "</div>" + foot(a, t, ctx);
  };

  // Event / date: photo band, a white date block, details and a CTA pill.
  L.event = function (a, t, ctx) {
    const S = ctx.size;
    const story = S.key === "story";
    const photoH = story ? 760 : S.key === "square" ? 380 : 640;
    const rows = (a.details || []).slice(0, 3).map(d =>
      "<div style='display:flex;gap:20px;align-items:center;margin-top:20px'>" +
      "<div style='flex:none;width:58px;height:58px;border-radius:50%;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center'>" + icon(d.icon || "calendar", C.yellow, 28, 2) + "</div>" +
      "<div style='font-size:26px;line-height:1.35;color:#fff'>" + rich(d.text, C.yellow) + "</div></div>").join("");
    return bgPhoto(a.photoFile, a.photoBrief, "left:0;top:0;width:" + S.w + "px;height:" + photoH + "px", t) +
      "<div style='position:absolute;left:0;top:" + photoH + "px;width:" + S.w + "px;bottom:0;background:" + C.navyBg + "'></div>" +
      "<div style='position:absolute;left:80px;top:" + (photoH - 92) + "px;background:#fff;border-radius:22px;padding:20px 30px;box-shadow:0 10px 30px rgba(0,0,0,.2);text-align:center;min-width:180px'>" +
      "<div style='font-weight:800;font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:" + C.rust + "'>" + esc(a.dateTop || "") + "</div>" +
      "<div style='font-weight:900;font-size:64px;line-height:1;color:" + C.navy + ";margin-top:6px'>" + esc(a.dateMain || "") + "</div>" +
      (a.dateBottom ? "<div style='font-weight:700;font-size:20px;color:" + C.gray + ";margin-top:6px'>" + esc(a.dateBottom) + "</div>" : "") + "</div>" +
      "<div style='position:absolute;left:80px;right:80px;top:" + (photoH + 130) + "px;bottom:" + (story ? 300 : 52) + "px;display:flex;flex-direction:column'>" +
      eyebrowTag(a.eyebrow, "#fff") + "<div style='height:20px'></div>" +
      titleTag(a, "#fff", C.yellow, fitTitle(a.title, S.key === "square" ? 52 : story ? 76 : 60)) + rows +
      "<div style='flex:1;min-height:20px'></div>" +
      "<div style='display:flex;justify-content:space-between;align-items:center'>" + logoTag(true, 56) +
      (a.cta ? "<span style='background:" + C.yellow + ";color:" + C.navy + ";font-weight:800;font-size:24px;padding:16px 30px;border-radius:999px;display:flex;align-items:center;gap:12px'>" + esc(a.cta) + icon("arrow", C.navy, 24, 2.6) + "</span>" : "") +
      "</div></div>";
  };

  // Award / recognition.
  L.award = function (a, t, ctx) {
    const S = ctx.size;
    const square = S.key === "square";
    return "<div style='position:absolute;left:80px;right:80px;top:72px;bottom:52px;display:flex;flex-direction:column;align-items:center;text-align:center'>" +
      "<div style='align-self:stretch'>" + eyebrowTag(a.eyebrow, t.eyebrow) + "</div>" +
      "<div style='flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center'>" +
      "<div style='width:" + (square ? 170 : 200) + "px;height:" + (square ? 170 : 200) + "px;border-radius:50%;background:rgba(255,255,255,.14);border:4px solid " + C.yellow + ";display:flex;align-items:center;justify-content:center'>" + icon(a.icon || "star", C.yellow, square ? 84 : 100, 1.8) + "</div>" +
      "<div style='font-weight:900;font-size:" + (square ? 72 : 88) + "px;color:" + C.yellow + ";margin-top:30px;line-height:1'>" + esc(a.year || "") + "</div>" +
      titleTag(a, t.title, C.yellow, fitTitle(a.title, square ? 56 : 64), "margin-top:22px") +
      (a.sub ? "<div style='font-size:28px;line-height:1.45;color:" + t.muted + ";margin-top:18px;max-width:820px'>" + esc(a.sub) + "</div>" : "") +
      "</div>" +
      (a.footer ? "<div style='align-self:stretch;background:rgba(0,0,0,.14);border-radius:20px;padding:22px 30px;font-weight:700;font-size:24px;color:#fff;margin-bottom:30px'>" + esc(a.footer) + "</div>" : "") +
      "<div style='align-self:stretch;display:flex;justify-content:space-between;align-items:center'>" + logoTag(t.dark, 60) +
      "<span style='font-weight:700;font-size:22px;color:" + (t.dark ? "#fff" : C.navy) + "'>karimufoundation.org</span></div></div>";
  };

  // Reel cover: the headline sits inside the centre 4:5 area so the profile
  // grid (which crops a Reel cover to 1080x1350) still shows all of it.
  L["reel-cover"] = function (a, t, ctx) {
    const S = ctx.size;
    return bgPhoto(a.photoFile, a.photoBrief, "inset:0", t, a.photoPosition) +
      "<div style='position:absolute;inset:0;background:linear-gradient(to top, rgba(20,45,68,.92) 0%, rgba(20,45,68,.7) 40%, rgba(20,45,68,.1) 66%, rgba(20,45,68,.35) 100%)'></div>" +
      "<div style='position:absolute;left:80px;right:80px;top:330px'>" + logoTag(true, 56) + "</div>" +
      "<div style='position:absolute;left:80px;right:80px;bottom:" + (S.h - 1635 + 40) + "px'>" +
      "<span style='display:inline-flex;align-items:center;gap:12px;background:" + C.yellow + ";color:" + C.navy + ";font-weight:800;font-size:24px;letter-spacing:.1em;text-transform:uppercase;padding:14px 26px;border-radius:999px'>" +
      "<svg width='22' height='22' viewBox='0 0 24 24'><path d='M7 4.5v15l12.5-7.5z' fill='" + C.navy + "'/></svg>" + esc(a.badge || T.watch) + "</span>" +
      "<div style='height:30px'></div>" + titleTag(a, "#fff", C.yellow, fitTitle(a.title, 100)) +
      (a.subtitle ? "<p style='color:rgba(255,255,255,.9);font-size:30px;line-height:1.45;margin-top:18px'>" + esc(a.subtitle) + "</p>" : "") + "</div>";
  };

  // Story with a call to action: leaves room for Instagram's link sticker.
  L["story-cta"] = function (a, t, ctx) {
    return "<div style='position:absolute;left:80px;right:80px;top:250px;bottom:300px;display:flex;flex-direction:column'>" +
      eyebrowTag(a.eyebrow, t.eyebrow) + "<div style='height:26px'></div>" +
      titleTag(a, t.title, t.hl, fitTitle(a.title, 96)) +
      (a.subtitle ? "<p style='color:" + t.text + ";font-size:32px;line-height:1.5;margin-top:20px'>" + esc(a.subtitle) + "</p>" : "") +
      "<div style='height:40px'></div>" + photo(a.photoFile, a.photoBrief, 560, t) +
      "<div style='flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px'>" +
      "<div style='font-weight:800;font-size:26px;letter-spacing:.12em;text-transform:uppercase;color:" + (t.dark ? C.yellow : C.blueText) + "'>" + esc(a.hint || T.tapLink) + "</div>" +
      "<svg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='" + (t.dark ? C.yellow : C.blueText) + "' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='M12 5v14M6 13l6 6 6-6'/></svg>" +
      "<div style='height:150px'></div></div>" +
      logoTag(t.dark, 56, "align-self:center") + "</div>";
  };

  // Story question: a fact as a question, room for a poll or quiz sticker.
  L["story-poll"] = function (a, t, ctx) {
    return rainbow("left:0;right:0;top:0", 12) +
      "<div style='position:absolute;left:80px;right:80px;top:250px;bottom:300px;display:flex;flex-direction:column'>" +
      eyebrowTag(a.eyebrow, t.eyebrow) +
      "<div style='flex:1;display:flex;flex-direction:column;justify-content:center'>" +
      "<div style='font-weight:900;font-size:120px;line-height:1;color:" + C.yellow + "'>?</div>" +
      titleTag(a, t.title, t.hl, fitTitle(a.title, 104), "margin-top:20px") +
      (a.subtitle ? "<p style='color:" + t.text + ";font-size:32px;line-height:1.45;margin-top:24px'>" + esc(a.subtitle) + "</p>" : "") +
      "<div style='margin-top:60px;font-weight:800;font-size:26px;letter-spacing:.12em;text-transform:uppercase;color:" + C.yellow + ";display:flex;align-items:center;gap:14px'>" + esc(a.hint || T.vote) +
      "<svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='" + C.yellow + "' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='M12 5v14M6 13l6 6 6-6'/></svg></div>" +
      "<div style='height:260px'></div></div>" +
      logoTag(t.dark, 56, "align-self:center") + "</div>";
  };

  const LAYOUTS = Object.keys(L);

  // Canvas sizes. Carousel layouts are feed-only; the single-image layouts
  // above list the sizes they are designed for.
  const SIZES = {
    feed: { key: "feed", w: 1080, h: 1350, label: "Feed 4:5" },
    square: { key: "square", w: 1080, h: 1080, label: "Square 1:1" },
    story: { key: "story", w: 1080, h: 1920, label: "Story / Reel 9:16" },
    landscape: { key: "landscape", w: 1200, h: 628, label: "LinkedIn / Facebook 1.91:1" },
  };
  const LAYOUT_SIZES = {
    "photo-headline": ["feed", "square", "story", "landscape"],
    "stat-card": ["feed", "square", "story", "landscape"],
    quote: ["feed", "square", "story"],
    news: ["feed", "square"],
    event: ["feed", "square", "story"],
    award: ["feed", "square"],
    "reel-cover": ["story"],
    "story-cta": ["story"],
    "story-poll": ["story"],
  };
  function sizesFor(layout) { return LAYOUT_SIZES[layout] || ["feed"]; }

  // Post formats the Content Studio can request. Keep in sync with
  // KARIMU_FORMATS in api/generate-posts.js (the server copy the model sees).
  const CAROUSEL_LAYOUTS = ["cover", "photo-text", "split", "numbered", "icon-list", "side-photo", "stats",
    "before-after", "phases", "compare", "table", "big-stat", "timeline", "cta", "ba-rows", "ba-full"];
  const FORMATS = {
    carousel: { size: "feed", label: "Karimu carousel", layouts: CAROUSEL_LAYOUTS },
    single: { size: "feed", label: "Karimu single image", layouts: ["photo-headline", "stat-card", "quote", "news", "event", "award", "before-after", "ba-full", "stats", "big-stat", "compare", "timeline"] },
    square: { size: "square", label: "Karimu square", layouts: ["photo-headline", "stat-card", "quote", "news", "event", "award"] },
    story: { size: "story", label: "Karimu story", layouts: ["photo-headline", "stat-card", "quote", "event", "story-cta", "story-poll"] },
    "reel-cover": { size: "story", label: "Karimu Reel cover", layouts: ["reel-cover"] },
    landscape: { size: "landscape", label: "Karimu LinkedIn / Facebook", layouts: ["photo-headline", "stat-card"] },
  };

  // The canvas a post renders on (its first slide decides).
  function postSize(post) {
    const key = (post && post.size && SIZES[post.size]) ? post.size : "feed";
    const first = post && post.slides && post.slides[0];
    if (first) {
      const allowed = sizesFor(first.layout);
      const k = allowed.includes(first.size) ? first.size : allowed.includes(key) ? key : allowed[0];
      return SIZES[k];
    }
    return SIZES[key];
  }

  // Default background per layout when the generator leaves `theme` empty.
  const DEFAULT_THEME = {
    cover: "white", "photo-text": "blue", split: "white", numbered: "navy", "icon-list": "white",
    "side-photo": "white", stats: "blue", "before-after": "white", phases: "white", compare: "navy",
    table: "white", "big-stat": "white", timeline: "green", cta: "blue", "ba-rows": "white", "ba-full": "white",
    "photo-headline": "navy", "stat-card": "blue", quote: "navy", news: "white", event: "navy", award: "green",
    "reel-cover": "navy", "story-cta": "blue", "story-poll": "navy",
  };

  // Which photo fields a layout renders, for upload slots.
  function photoKeys(slide) {
    switch (slide.layout) {
      case "before-after": case "ba-full": return [["beforePhotoFile", "Before photo"], ["afterPhotoFile", "After photo"]];
      case "ba-rows": {
        const out = [];
        (slide.rows || []).slice(0, 4).forEach((r, j) => {
          out.push(["rows." + j + ".beforePhotoFile", "Row " + (j + 1) + " before"]);
          out.push(["rows." + j + ".afterPhotoFile", "Row " + (j + 1) + " after"]);
        });
        return out;
      }
      case "numbered": case "icon-list": case "phases": case "compare": case "table": case "big-stat": case "timeline":
      case "stat-card": case "award": case "story-poll":
        return [];
      default: return [["photoFile", "Photo"]];
    }
  }

  function slide(a, ctx) {
    ensureAssets();
    a = a || {};
    ctx = ctx || { index: 0, total: 1 };
    T = STRINGS[ctx.lang] || STRINGS["pt-BR"];
    const layout = L[a.layout] ? a.layout : "photo-text";
    const theme = THEMES[a.theme] || THEMES[DEFAULT_THEME[layout]] || THEMES.white;
    // A layout only renders at a size it was designed for; anything else
    // falls back to its first size.
    const allowed = sizesFor(layout);
    const sizeKey = allowed.includes(a.size) ? a.size : allowed.includes(ctx.size) ? ctx.size : allowed[0];
    ctx = Object.assign({}, ctx, { size: SIZES[sizeKey] });
    const bg = layout === "cover" || layout === "ba-full" ? C.white : theme.bg;
    return "<div class='kk-root' data-layout='" + layout + "' data-size='" + sizeKey + "' style='width:" + ctx.size.w + "px;height:" + ctx.size.h + "px;background:" + bg + "'>" + L[layout](a, theme, ctx) + "</div>";
  }

  // ---------- post level ----------
  function isKarimuPost(post) {
    return !!(post && post.style === "karimu" && Array.isArray(post.slides) && post.slides.length);
  }

  // All slides of a post as HTML strings.
  function renderPost(post) {
    if (!isKarimuPost(post)) return [];
    const n = post.slides.length;
    const lang = post.language === "en-US" ? "en-US" : "pt-BR";
    const size = post.size && SIZES[post.size] ? post.size : "feed";
    return post.slides.map((s, i) => slide(s, { index: i, total: n, isFirst: i === 0, isLast: i === n - 1, lang, size }));
  }

  // Upload slots across every slide, keyed "s<index>.<path>".
  function photoSlots(post) {
    if (!isKarimuPost(post)) return [];
    const out = [];
    post.slides.forEach((s, i) => {
      photoKeys(s).forEach(([path, label]) => {
        out.push({ key: "s" + i + "." + path, label: "Slide " + (i + 1) + " · " + label });
      });
    });
    return out;
  }

  function setPath(obj, path, value) {
    const parts = path.split(".");
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = /^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i];
      if (cur[k] == null) return;
      cur = cur[k];
    }
    cur[parts[parts.length - 1]] = value;
  }

  // Return a copy of the post with uploaded photos merged into the slides.
  function withUploads(post, stored) {
    if (!isKarimuPost(post) || !stored) return post;
    const copy = Object.assign({}, post, { slides: JSON.parse(JSON.stringify(post.slides)) });
    Object.keys(stored).forEach((key) => {
      const m = /^s(\d+)\.(.+)$/.exec(key);
      if (!m || !copy.slides[Number(m[1])]) return;
      setPath(copy.slides[Number(m[1])], m[2], stored[key]);
    });
    return copy;
  }

  global.KarimuKit = { slide, renderPost, photoSlots, withUploads, isKarimuPost, LAYOUTS, THEMES, ICONS, photoKeys, SIZES, sizesFor, FORMATS, postSize, W, H, colors: C };
})(window);
