// posts-videos-existing.js — videos for Reel / Short posts that were already in
// the queue, built with tools/video/build-video.js. Loaded after every posts
// file. For now they are photo videos (slow zoom over library photos), because
// the matching Drive footage is larger than the 10 MB the connector can
// download. Swap in real footage when smaller exports are available.
//
// Full 1080×1920 files: Drive folder "Content Studio – Reels e Shorts"
// (https://drive.google.com/drive/folders/1_6Rea4pU_Gyg5fjER2BGe2flko6kMQNq).

(function () {
  "use strict";
  if (typeof POSTS === "undefined") return;

  const V = "videos/previews/";
  const NOTE = "Photo video (library photos, slow zoom). Replace with real footage when a smaller export of the Drive video is available.";
  function vid(name, platform, driveId, duration) {
    return { platform, preview: V + name + "-preview.mp4", cover: V + name + "-cover.jpg", driveId, duration, note: NOTE };
  }

  const VIDEOS = {
    n07: { en: ["n07-reel-en", "reel", "1ivITXk5gKhZvbmY3lOpXAfCi1LQjdtl6", 14.8], pt: ["n07-reel-pt", "reel", "1pmwBJQBOmlrSOr5y7AOJqfbdhR7-PtgI", 14.8] },
    n08: { en: ["n08-reel-en", "reel", "1GUgANiHxAl258fJAIxC4Wcm1b6_rk-8h", 13], pt: ["n08-reel-pt", "reel", "1mj1QSgJJUNSFwPuP_f7SOk1dD2i02iGg", 13] },
    p09: { en: ["p09-short-en", "short", "1sfWWKHgFmhc7NocQ6bLezy_zwrGkevPq", 13], pt: ["p09-short-pt", "short", "1yxDhIvpWWHSR1pTtXI-lNayUUck40DGN", 13] },
    p10: { en: ["p10-reel-en", "reel", "1vIAGfzEV9n4iZnZaMTOdJq-p3xoDIXdH", 14.8], pt: ["p10-reel-pt", "reel", "1P2nvOpc3fLI8z_eFPlmhuQbo2T4GCV5V", 14.8] },
    p11: { en: ["p11-short-en", "short", "10ZOXVC9e_g5ymqsTmDSHFV2vdBhHduuW", 13], pt: ["p11-short-pt", "short", "1RuxwNXctP30pUwyXKVNtjUKvypPayFvU", 13] },
    "w261123-4": { en: ["w261123-4-reel-en", "reel", "1J7PD2DHtRVtWGvIGDyrCYaN1ji4PcDw2", 14.8], pt: ["w261123-4-reel-pt", "reel", "1Ej1ycSp1_PRCu5-EUc37xbG8PCnUa1s4", 14.8] },
  };

  Object.keys(VIDEOS).forEach((id) => {
    const post = POSTS.find((p) => p.id === id);
    if (!post || post.videos) return;
    post.videos = { "en-US": vid(...VIDEOS[id].en), "pt-BR": vid(...VIDEOS[id].pt) };
  });
})();
