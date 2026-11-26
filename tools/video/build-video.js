#!/usr/bin/env node
// tools/video/build-video.js — build a Karimu Reel / YouTube Short from clips.
//
// Usage:  node tools/video/build-video.js spec.json
//
// spec.json:
// {
//   "out": "/abs/path/reel-2026-11-30-en",      // writes <out>.mp4, <out>-preview.mp4, <out>-cover.jpg
//   "lang": "en-US" | "pt-BR",
//   "platform": "reel" | "short",                // only changes the end-card default CTA
//   "hook": { "pill": "Karimu", "title": "A week with the community.", "highlight": "community." },
//   "clips": [
//     { "file": "/abs/a.mov", "start": 0, "end": 6.9, "caption": "Volunteers arrive at ..." },
//     { "file": "/abs/b.mov", "start": 0, "end": 4.4, "caption": "Ayalagaya, September 2026" },
//     { "file": "/abs/c.jpg", "duration": 3.5, "focus": [0.4, 0.5], "zoom": "in", "caption": "..." }  // photo
//   ],
//   "end": { "title": "Built by the community.", "highlight": "Follow along.", "sub": "..." },
//   "logo": "/abs/path/images/logo-h-white.png",  // optional; defaults to the repo logo
//   "keepAudio": true,                            // optional; ambient sound from the clips (default true)
//   "watermark": true                             // optional; small white Karimu logo top-left on every clip (default true)
// }
//
// Output: 1080x1920 H.264/AAC MP4, 30 fps. Horizontal clips sit on a blurred
// fill of themselves. A small white Karimu logo sits top-left (just below the
// app UI) on every clip; the end card carries the full logo. The hook shows for the first 3.5s of clip 1; captions
// stay for each whole clip; a 3s Karimu end card closes the video. Text stays
// out of the top 250px and bottom 400px (Instagram / YouTube UI). The full
// file is encoded to ~2.9 MB (two passes) so it fits one Drive connector upload.
// The preview is 480x854, ~1 MB, for the Content Studio.

"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");

const spec = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const repo = path.resolve(__dirname, "..", "..");
const work = spec.out + ".work";
fs.mkdirSync(work, { recursive: true });

const pt = spec.lang === "pt-BR";
const T = {
  follow: pt ? "Acompanhe." : "Follow along.",
  subscribe: pt ? "Inscreva-se." : "Subscribe.",
};

const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const hl = (text, h) => {
  const t = String(text || "");
  if (!h || !t.includes(h)) return esc(t);
  const i = t.indexOf(h);
  return esc(t.slice(0, i)) + "<span>" + esc(h) + "</span>" + esc(t.slice(i + h.length));
};

function ff(args) { execFileSync("ffmpeg", ["-nostdin", "-v", "error", "-y", ...args], { stdio: "inherit" }); }
function probeDuration(f) {
  return parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());
}
function hasAudio(f) {
  return execFileSync("ffprobe", ["-v", "error", "-select_streams", "a", "-show_entries", "stream=codec_name", "-of", "csv=p=0", f]).toString().includes("aac");
}

async function overlays() {
  const logo = spec.logo || path.join(repo, "images", "logo-h-white.png");
  const end = spec.end || {};
  const endHl = end.highlight || (spec.platform === "short" ? T.subscribe : T.follow);
  const endTitle = end.title ? end.title + " " + endHl : endHl;
  const wm = spec.watermark === false ? "" : `<img class="wm" src="file://${logo}">`;
  const frames = [];
  frames.push(`<div class="f shade-hook" id="hook">${wm}<div class="hook"><span class="pill">▶ ${esc((spec.hook || {}).pill || "Karimu")}</span><div class="h">${hl((spec.hook || {}).title, (spec.hook || {}).highlight)}</div></div>${spec.clips[0].caption ? `<div class="cap"><b>${esc(spec.clips[0].caption)}</b></div>` : ""}</div>`);
  spec.clips.forEach((c, i) => frames.push(`<div class="f shade" id="cap${i}">${wm}${c.caption ? `<div class="cap"><b>${esc(c.caption)}</b></div>` : ""}</div>`));
  frames.push(`<div class="f end" id="end"><div class="bar"><i style="background:#4A8BD0"></i><i style="background:#6DB33F"></i><i style="background:#8B6FC1"></i><i style="background:#E07A47"></i><i style="background:#52AE5E"></i></div><div class="in"><div class="k"><i></i>Karimu</div><div class="t">${hl(endTitle, endHl)}</div>${end.sub ? `<div class="s">${esc(end.sub)}</div>` : ""}</div><img src="file://${logo}"></div>`);
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;700;800;900&display=swap">
<style>
html,body{margin:0;background:transparent}
.f{width:1080px;height:1920px;position:relative;font-family:Figtree,sans-serif;overflow:hidden}
.shade::before,.shade-hook::before{content:"";position:absolute;left:0;right:0;top:0;height:520px;background:linear-gradient(rgba(10,25,40,.45),rgba(10,25,40,0))}
.shade-hook::before{height:980px;background:linear-gradient(rgba(10,25,40,.62) 0%,rgba(10,25,40,.45) 55%,rgba(10,25,40,0) 100%)}
.wm{position:absolute;left:70px;top:260px;height:64px;opacity:.95;filter:drop-shadow(0 2px 10px rgba(0,0,0,.55))}
.hook{position:absolute;left:70px;right:70px;top:380px}
.pill{display:inline-block;background:#F2C14E;color:#2B5B7E;font-weight:800;font-size:30px;letter-spacing:.12em;text-transform:uppercase;padding:14px 28px;border-radius:999px}
.h{margin-top:26px;font-weight:900;font-size:96px;line-height:1.02;letter-spacing:-.02em;color:#fff;text-shadow:0 4px 24px rgba(0,0,0,.55)}
.h span{color:#F2C14E}
.cap{position:absolute;left:90px;right:90px;bottom:430px;text-align:center}
.cap b{display:inline;background:rgba(20,45,68,.82);color:#fff;font-weight:800;font-size:52px;line-height:1.5;padding:8px 22px;border-radius:14px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.end{background:#2D5D80}
.end .bar{position:absolute;left:0;right:0;top:0;height:14px;display:flex}.end .bar i{flex:1}
.end .in{position:absolute;left:90px;right:90px;top:520px}
.end .k{font-weight:800;font-size:30px;letter-spacing:.14em;color:#fff;display:flex;align-items:center;gap:22px;text-transform:uppercase}
.end .k i{display:block;width:60px;height:5px;background:#F2C14E;border-radius:3px}
.end .t{margin-top:30px;font-weight:900;font-size:104px;line-height:1.02;letter-spacing:-.02em;color:#fff}
.end .t span{color:#F2C14E}
.end .s{margin-top:30px;font-size:42px;line-height:1.4;color:rgba(255,255,255,.88)}
.end img{position:absolute;left:90px;bottom:420px;height:110px}
</style></head><body>${frames.join("\n")}</body></html>`;
  const htmlPath = path.join(work, "overlays.html");
  fs.writeFileSync(htmlPath, html);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto("file://" + htmlPath);
  await p.waitForTimeout(2500);
  for (const id of ["hook", ...spec.clips.map((_, i) => "cap" + i), "end"]) {
    await (await p.$("#" + id)).screenshot({ path: path.join(work, id + ".png"), omitBackground: true });
  }
  await b.close();
}

const isImage = (f) => /\.(jpe?g|png|webp)$/i.test(f);

// Photo clips: a slow zoom ("Ken Burns") over the photo, cropped to fill the
// 9:16 frame. `focus: [x, y]` (0–1) picks which part of a wide photo stays in
// frame (default centre); `zoom: "in" | "out"` (default "in").
function photoFill(c, dur) {
  const n = Math.round(dur * 30);
  const [fx, fy] = c.focus || [0.5, 0.5];
  const z = c.zoom === "out" ? `1.12-0.12*on/${n}` : `1+0.12*on/${n}`;
  return `[0:v]scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840:(iw-2160)*${fx}:(ih-3840)*${fy},` +
    `zoompan=z='${z}':x='(iw-iw/zoom)*${fx}':y='(ih-ih/zoom)*${fy}':d=${n}:s=1080x1920:fps=30,format=yuv420p[base]`;
}

function clipPart(c, i) {
  const out = path.join(work, `c${i}.mp4`);
  const photo = isImage(c.file);
  const dur = photo ? (c.duration || 3.5) : Math.max(0.5, (c.end || probeDuration(c.file)) - (c.start || 0));
  const fill = photo ? photoFill(c, dur)
    : "[0:v]split[a][b];[b]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30:5[bg];[a]scale=1080:1920:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30,format=yuv420p[base]";
  const ov = i === 0
    ? `;[base][1:v]overlay=0:0:enable='lte(t,3.5)'[v1];[v1][2:v]overlay=0:0:enable='gt(t,3.5)'[v]`
    : `;[base][1:v]overlay=0:0[v]`;
  const inputs = photo ? ["-i", c.file] : ["-ss", String(c.start || 0), "-t", String(dur), "-i", c.file];
  if (i === 0) inputs.push("-i", path.join(work, "hook.png"), "-i", path.join(work, "cap0.png"));
  else inputs.push("-i", path.join(work, `cap${i}.png`));
  const audio = !photo && spec.keepAudio !== false && hasAudio(c.file);
  const n = i === 0 ? 3 : 2;
  const args = [...inputs];
  if (!audio) args.push("-f", "lavfi", "-t", String(dur), "-i", "anullsrc=r=48000:cl=stereo");
  args.push("-filter_complex", fill + ov, "-map", "[v]", "-map", audio ? "0:a:0" : `${n}:a`,
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-c:a", "aac", "-ar", "48000", "-ac", "2", "-t", String(dur), out);
  ff(args);
  return out;
}

async function main() {
  await overlays();
  const parts = spec.clips.map(clipPart);
  const endMp4 = path.join(work, "end.mp4");
  ff(["-loop", "1", "-t", "3", "-i", path.join(work, "end.png"), "-f", "lavfi", "-t", "3", "-i", "anullsrc=r=48000:cl=stereo",
    "-vf", "fps=30,format=yuv420p,fade=t=in:st=0:d=0.4", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-c:a", "aac", "-ar", "48000", "-ac", "2", "-shortest", endMp4]);
  const list = path.join(work, "list.txt");
  fs.writeFileSync(list, [...parts, endMp4].map((f) => `file '${f}'`).join("\n"));
  // The Drive connector accepts about 3.1 MB per upload, so the final file is
  // encoded in two passes to a fixed size (default 2.9 MB). Keep videos short
  // (15–25s): longer ones get softer at the same size.
  const joined = path.join(work, "joined.mp4");
  ff(["-f", "concat", "-safe", "0", "-i", list, "-c", "copy", joined]);
  const full = spec.out + ".mp4";
  const target = (spec.targetMB || 2.9) * 1e6;
  for (const shrink of [1, 0.93, 0.86, 0.78]) {
    const vbr = Math.max(300000, Math.floor((target * shrink * 8) / probeDuration(joined) - 96000));
    const log = path.join(work, "pass");
    ff(["-i", joined, "-c:v", "libx264", "-preset", "slow", "-b:v", String(vbr), "-pass", "1", "-passlogfile", log, "-an", "-f", "mp4", "/dev/null"]);
    ff(["-i", joined, "-c:v", "libx264", "-preset", "slow", "-b:v", String(vbr), "-pass", "2", "-passlogfile", log, "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", full]);
    if (fs.statSync(full).size <= target) break;
  }
  ff(["-i", full, "-vf", "scale=480:854", "-c:v", "libx264", "-preset", "medium", "-crf", "30", "-c:a", "aac", "-b:a", "64k", "-movflags", "+faststart", spec.out + "-preview.mp4"]);
  ff(["-ss", "1", "-i", full, "-frames:v", "1", "-vf", "scale=540:960", "-q:v", "4", spec.out + "-cover.jpg"]);
  const info = { mp4: full, bytes: fs.statSync(full).size, preview: spec.out + "-preview.mp4", previewBytes: fs.statSync(spec.out + "-preview.mp4").size, cover: spec.out + "-cover.jpg", duration: probeDuration(full) };
  console.log(JSON.stringify(info));
}

main().catch((e) => { console.error(e); process.exit(1); });
