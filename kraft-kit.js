// kraft-kit.js — browser port of templates/kraft_kit.py
// Renders Karimu's kraft/scrapbook artwork as HTML+CSS, at the three sizes the
// feed uses: 1080x1350 (feed card), 1080x1080 (single-stat), 1080x1920 (Reel).
// The Python original only ever produced HTML too — the PNGs in the format
// gallery were screenshots of that HTML — so this is a faithful port, not a
// reimplementation. Keep visual constants in sync with the Python file.

(function (global) {
  "use strict";

  // ---------- deterministic RNG (mirrors random.seed(7) in the original) ----------
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function tornPolygon(w, h, step, amp, seed) {
    w = w || 1080; h = h || 1350; step = step || 22; amp = amp === undefined ? 13 : amp;
    const rnd = mulberry32(seed === undefined ? 7 : seed);
    const jitter = () => (rnd() * 2 - 1) * amp;
    const pts = [];
    for (let x = 0; x <= w; x += step) pts.push([x, Math.max(0, jitter()) + 4]);
    for (let y = 0; y <= h; y += step) pts.push([w - Math.max(0, jitter()) - 4, y]);
    for (let x = w; x >= 0; x -= step) pts.push([x, h - Math.max(0, jitter()) - 4]);
    for (let y = h; y >= 0; y -= step) pts.push([Math.max(0, jitter()) + 4, y]);
    return "polygon(" + pts.map(p => (p[0] / w * 100).toFixed(3) + "% " + (p[1] / h * 100).toFixed(3) + "%").join(",") + ")";
  }

  function brush(w, h, color, seed) {
    seed = seed || 1;
    const rnd = mulberry32(seed * 97);
    const top = [], bot = [], n = 26;
    for (let i = 0; i <= n; i++) {
      const t = i / n, x = t * w;
      top.push([x, 6 + Math.sin(t * 7 + seed) * 3.2 + (rnd() * 4.4 - 2.2)]);
      bot.push([x, h - 6 + Math.sin(t * 5.5 + seed * 2) * 3.4 + (rnd() * 4.4 - 2.2)]);
    }
    let d = "M " + top[0][0].toFixed(1) + "," + top[0][1].toFixed(1) + " ";
    d += top.slice(1).map(p => "L " + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    d += " C " + (w + 16).toFixed(1) + "," + (h * 0.32).toFixed(1) + " " + (w + 16).toFixed(1) + "," + (h * 0.68).toFixed(1) + " " + bot[bot.length - 1][0].toFixed(1) + "," + bot[bot.length - 1][1].toFixed(1) + " ";
    d += bot.slice(0, -1).reverse().map(p => "L " + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    d += " C -16," + (h * 0.68).toFixed(1) + " -16," + (h * 0.32).toFixed(1) + " " + top[0][0].toFixed(1) + "," + top[0][1].toFixed(1) + " Z";
    return "<svg class='bsvg' viewBox='-18 0 " + (w + 36) + " " + h + "' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><path d='" + d + "' fill='" + color + "'/></svg>";
  }

  const HEART = "<svg viewBox='0 0 32 30' fill='none' stroke='%s' stroke-width='2.6' stroke-linecap='round'><path d='M16 27C16 27 2 19 2 10.5 2 5.8 5.8 2.5 9.8 2.5 12.4 2.5 14.8 4 16 6.2 17.2 4 19.6 2.5 22.2 2.5 26.2 2.5 30 5.8 30 10.5 30 19 16 27 16 27Z'/></svg>";
  const LEAF = "<svg viewBox='0 0 40 40' fill='%s'><path d='M36 4C18 4 6 12 4 26c-.6 4.4.6 8 2.6 10 1-7 5-13 11-17.6C13 22.4 9.6 27.6 9 34c14 2 26-9 27-30Z' opacity='.85'/></svg>";

  const ICONS = {
    drop: "<path d='M16 3s-9 10.4-9 15.2A9 9 0 0 0 25 18.2C25 13.4 16 3 16 3Z'/>",
    clock: "<circle cx='16' cy='16' r='11.5'/><path d='M16 8.5V16l5 3.2'/>",
    people: "<circle cx='16' cy='11' r='5'/><path d='M6.5 26c0-5.2 4.3-8.4 9.5-8.4s9.5 3.2 9.5 8.4'/>",
    money: "<path d='M16 5v22'/><path d='M21.5 10.2c-1-1.7-3-2.7-5.5-2.7-3.2 0-5.4 1.6-5.4 4 0 5.6 11.2 2.8 11.2 8.6 0 2.6-2.4 4.3-5.8 4.3-2.9 0-5.1-1.2-6.1-3'/>",
    check: "<path d='M6 16.5 13 23.5 26 9.5'/>",
    tap: "<path d='M6 12h9v7H6z'/><path d='M15 15h5a4 4 0 0 0 4-4V8'/><path d='M10.5 19v8'/><path d='M6.5 27h8'/>",
    mail: "<path d='M4 8h24v16H4z'/><path d='m4 9 12 9L28 9'/>",
    wrench: "<path d='M25 7.5a6.5 6.5 0 0 1-8.6 8.6L7.5 25a3 3 0 0 1-4.2-4.2l8.9-8.9A6.5 6.5 0 0 1 20.8 3l-4 4 3.2 3.2 4-4c.6.9 1 2 1 3.3Z'/>"
  };

  function badge(icon, bg, size) {
    bg = bg || "#4A6B29"; size = size || 64;
    const path = ICONS[icon] || ICONS.check;
    return "<span class='bdg' style='width:" + size + "px;height:" + size + "px;background:" + bg + "'>" +
      "<svg viewBox='0 0 32 32' fill='none' stroke='#FDF6E6' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'>" + path + "</svg></span>";
  }

  const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")";

  const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
.kraft-root{width:__W__px;height:__H__px;background:#C9B189;overflow:hidden;position:relative;-webkit-font-smoothing:antialiased}
.kraft-root .paper{position:absolute;inset:0;clip-path:__TORN__;
  background:
    radial-gradient(115% 85% at 50% 38%, rgba(255,251,238,.98) 0%, rgba(247,234,206,.55) 46%, rgba(188,155,102,.72) 100%),
    linear-gradient(158deg,#F8EFD9 0%,#F1E2C4 44%,#E4D2AE 100%);
  box-shadow:inset 0 0 70px rgba(126,92,45,.42), inset 0 0 200px rgba(150,112,58,.30), inset 0 0 380px rgba(120,88,42,.16);}
.kraft-root .grain{position:absolute;inset:0;background-image:__NOISE__;opacity:.46;mix-blend-mode:multiply;pointer-events:none;clip-path:__TORN__}
.kraft-root .pad{position:absolute;inset:0;padding:__PAD__;display:flex;flex-direction:column}
.kraft-root .sp{flex:1 1 auto;min-height:8px}
.kraft-root h1,.kraft-root h2,.kraft-root .kick,.kraft-root .chip,.kraft-root .stat{font-family:'Montserrat',sans-serif}
.kraft-root .script{font-family:'Caveat',cursive;font-weight:700}
.kraft-root .body,.kraft-root .li{font-family:'Nunito Sans',sans-serif;font-weight:400}
.kraft-root .grn{color:#3B5520}.kraft-root .rst{color:#BF4526}.kraft-root .org{color:#E0762A}.kraft-root .crm{color:#FDF6E6}.kraft-root .ink{color:#3A362C}
.kraft-root h1{font-weight:900;font-size:82px;line-height:.98;letter-spacing:-.018em;color:#3B5520;text-transform:uppercase}
.kraft-root h2{font-weight:800;font-size:52px;line-height:1.04;letter-spacing:-.012em;color:#3B5520}
.kraft-root .body{font-size:33px;line-height:1.46;color:#3A362C}
.kraft-root .body b{font-weight:700}
.kraft-root .ban{position:relative;display:inline-block;padding:14px 40px 18px}
.kraft-root .ban .bsvg{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 3px 5px rgba(90,60,25,.22))}
.kraft-root .ban span{position:relative;font-family:'Montserrat',sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:.004em;color:#FDF6E6}
.kraft-root .tab{align-self:flex-start;background:#4A6B29;color:#FDF6E6;font-weight:800;font-size:29px;letter-spacing:.06em;text-transform:uppercase;padding:12px 26px 13px;border-radius:8px;transform:rotate(-1.1deg);box-shadow:0 4px 10px rgba(90,60,25,.22);font-family:'Montserrat',sans-serif}
.kraft-root .li{display:flex;gap:26px;align-items:flex-start;margin-bottom:30px}
.kraft-root .bdg{flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 9px rgba(90,60,25,.24)}
.kraft-root .bdg svg{width:56%;height:56%}
.kraft-root .li p{font-size:33px;line-height:1.36;color:#3A362C;padding-top:6px;font-family:'Nunito Sans',sans-serif}
.kraft-root .li b{font-weight:800}
.kraft-root .dots{border-top:4px dotted rgba(122,98,58,.42);margin:30px 0}
.kraft-root .sticky{background:#4A6B29;border-radius:22px;padding:30px 38px 34px;color:#FDF6E6;box-shadow:0 6px 16px rgba(70,50,20,.28);transform:rotate(-.7deg)}
.kraft-root .sticky .script{color:#D6E77C;font-size:56px;line-height:1.08}
.kraft-root .sticky p{font-family:'Nunito Sans',sans-serif;font-size:30px;line-height:1.34;font-weight:400}
.kraft-root .rbox{background:#BF4526;border-radius:20px;padding:30px 38px;color:#FDF6E6;box-shadow:0 6px 15px rgba(70,40,20,.26);transform:rotate(.6deg);font-family:'Nunito Sans',sans-serif;font-size:30px;line-height:1.38}
.kraft-root .photo{flex:none;position:relative;background:#FFFDF6;padding:16px;box-shadow:0 9px 22px rgba(90,60,25,.30);clip-path:__TORNSM__}
.kraft-root .well{background:#E3D7BC;border:3px dashed rgba(90,70,40,.42);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:34px;overflow:hidden}
.kraft-root .well img{width:100%;height:100%;object-fit:cover}
.kraft-root .well .k{font-family:'Montserrat',sans-serif;font-weight:800;font-size:22px;letter-spacing:.2em;color:#BF4526;text-transform:uppercase;margin-bottom:16px}
.kraft-root .well .t{font-family:'Nunito Sans',sans-serif;font-size:27px;line-height:1.4;color:#5C5240;max-width:640px}
.kraft-root .hrt{position:absolute;width:46px;height:44px}
.kraft-root .lf{position:absolute;width:74px;height:74px;opacity:.5}
.kraft-root .logo{flex:none;align-self:center;width:190px;margin-top:10px}
.kraft-root .stat{font-weight:900;letter-spacing:-.03em;line-height:.9;color:#BF4526;font-family:'Montserrat',sans-serif}
.kraft-root .chip{display:inline-block;background:#FDF6E6;border:3px solid #4A6B29;color:#3B5520;font-weight:800;font-size:26px;padding:10px 22px;border-radius:999px;margin:0 10px 12px 0;text-transform:uppercase;letter-spacing:.03em}
`;

  let stylesInjected = false;
  function ensureFonts() {
    if (stylesInjected) return;
    stylesInjected = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Caveat:wght@600;700&family=Nunito+Sans:wght@300;400;600;700;800&display=swap";
    document.head.appendChild(link);
  }

  // ---------- components ----------
  function heart(color, style) {
    return "<span class='hrt' style='" + style + "'>" + HEART.replace("%s", color) + "</span>";
  }
  function leaf(color, style) {
    return "<span class='lf' style='" + style + "'>" + LEAF.replace("%s", color) + "</span>";
  }
  function well(h, kick, txt, rot, extra) {
    rot = rot === undefined ? -1.4 : rot;
    return "<div class='photo' style='transform:rotate(" + rot + "deg);" + (extra || "") + "'>" +
      "<div class='well' style='height:" + h + "px'><div class='k'>" + kick + "</div>" +
      "<div class='t'>" + txt + "</div></div></div>";
  }
  function chipLabel(text, color) {
    color = color || "#BF4526";
    return "<span style='position:absolute;top:-14px;left:26px;z-index:3;background:" + color +
      ";color:#FDF6E6;font-family:Montserrat,sans-serif;font-weight:800;font-size:23px;letter-spacing:.14em;text-transform:uppercase;padding:9px 20px;border-radius:8px;box-shadow:0 4px 9px rgba(80,50,20,.28)'>" + text + "</span>";
  }
  function beforeafter(h, beforeTxt, afterTxt) {
    const cell = (lbl, txt, rot, color) =>
      "<div style='flex:1;position:relative'>" + chipLabel(lbl, color) + well(h, "photo", txt, rot) + "</div>";
    return "<div style='display:flex;gap:26px;align-items:flex-start'>" +
      cell("Before", beforeTxt, -1.3, "#8A6A32") + cell("After", afterTxt, 1.3, "#BF4526") + "</div>";
  }
  function statrow(num, label, numSize, color, gap, mb) {
    numSize = numSize || 118; color = color || "#BF4526"; gap = gap || 26; mb = mb === undefined ? 30 : mb;
    return "<div style='display:flex;align-items:center;gap:" + gap + "px;margin-bottom:" + mb + "px'>" +
      "<div class='stat' style='font-size:" + numSize + "px;color:" + color + ";flex:none'>" + num + "</div>" +
      "<h2 style='font-size:40px;line-height:1.04'>" + label + "</h2></div>";
  }
  function quote(text, name, role, size) {
    size = size || 64;
    return "<div style=\"font-family:Caveat,cursive;font-weight:700;font-size:" + size + "px;line-height:1.14;color:#3B5520\">&ldquo;" + text + "&rdquo;</div>" +
      "<div style=\"margin-top:30px;font-family:Montserrat,sans-serif;font-weight:800;font-size:34px;color:#BF4526\">" + name + "</div>" +
      "<div style=\"font-family:'Nunito Sans',sans-serif;font-size:28px;color:#6B6250;margin-top:6px\">" + role + "</div>";
  }
  function ctaPanel(head, sub, chip, radius) {
    radius = radius || 26;
    return "<div style='background:#BF4526;border-radius:" + radius + "px;padding:52px 46px 56px;text-align:center;box-shadow:0 8px 20px rgba(70,40,20,.28);transform:rotate(-.5deg)'>" +
      "<div style='font-family:Montserrat,sans-serif;font-weight:900;font-size:56px;line-height:1.06;color:#FDF6E6;text-transform:uppercase'>" + head + "</div>" +
      "<div style='font-family:Caveat,cursive;font-weight:700;font-size:52px;color:#D6E77C;margin-top:20px'>" + sub + "</div>" +
      "<div style='margin-top:30px'><span style='display:inline-block;background:#FDF6E6;color:#3B5520;font-family:Montserrat,sans-serif;font-weight:800;font-size:30px;padding:15px 34px;border-radius:999px'>" + chip + "</span></div></div>";
  }
  function bigstat(num, label, numSize, color) {
    numSize = numSize || 230; color = color || "#BF4526";
    return "<div style='text-align:center'>" +
      "<div class='stat' style='font-size:" + numSize + "px;color:" + color + "'>" + num + "</div>" +
      "<h2 style='font-size:46px;margin-top:8px;line-height:1.06'>" + label + "</h2></div>";
  }
  function banner(text, color, fontSize, seed) {
    color = color || "#BF4526"; fontSize = fontSize || 62;
    const w = Math.max(240, text.length * fontSize * 0.62), h = fontSize * 1.5;
    return "<span class='ban' style='margin-top:10px'>" + brush(w, h, color, seed || 1) +
      "<span style='font-size:" + fontSize + "px'>" + text + "</span></span>";
  }
  function logo(src) {
    return src ? "<img class='logo' src='" + src + "'>" : "";
  }

  // ---------- page ----------
  function page(inner, opts) {
    opts = opts || {};
    const w = opts.w || 1080, h = opts.h || 1350;
    const pad = opts.pad || (h >= 1300 ? "64px 64px 82px" : "56px 56px 62px");
    ensureFonts();
    const css = CSS
      .replace(/__TORN__/g, tornPolygon(w, h, 22, 13, opts.seed || 7))
      .replace(/__TORNSM__/g, tornPolygon(600, 600, 22, 6, (opts.seed || 7) + 1))
      .replace(/__NOISE__/g, NOISE)
      .replace(/__W__/g, String(w))
      .replace(/__H__/g, String(h))
      .replace(/__PAD__/g, pad);
    return "<style>" + css + "</style>" +
      "<div class='kraft-root' style='width:" + w + "px;height:" + h + "px'>" +
      "<div class='paper'></div><div class='grain'></div>" +
      "<div class='pad'>" + inner + "</div></div>";
  }

  global.KraftKit = {
    page, brush, badge, heart, leaf, well, chipLabel, beforeafter,
    statrow, quote, ctaPanel, bigstat, banner, logo, tornPolygon, ICONS
  };
})(window);
