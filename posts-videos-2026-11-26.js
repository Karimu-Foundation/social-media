// posts-videos-2026-11-26.js — first Instagram Reel + YouTube Short built from
// Drive videos with tools/video/build-video.js, English (primary) + Portuguese.
//
// Each post carries `videos[lang]`: a small preview MP4 + cover committed in
// videos/previews/ (shown in the Content Studio) and the Drive id of the
// full-quality 1080×1920 file in "Content Studio – Reels e Shorts"
// (https://drive.google.com/drive/folders/1_6Rea4pU_Gyg5fjER2BGe2flko6kMQNq).
// No figures in these videos. Pending, like every draft.

(function () {
  "use strict";
  if (typeof POSTS === "undefined") return;

  const V = "videos/previews/";
  function vid(name, platform, driveId) {
    return { platform, preview: V + name + "-preview.mp4", cover: V + name + "-cover.jpg", driveId, duration: 14.3 };
  }

  const CLIPS_NOTE = "Clips from the Drive (organized folder): '2026-09-25-Ayalagaya Ward-Competition-12' (volunteers arriving at the school competition) and 'Maasai Visit-27'. Confirm that clip 2 was filmed in Ayalagaya (its caption says so) and that the people on screen agreed to be filmed before posting. No figures used.";

  function post(o) {
    return Object.assign({
      style: "karimu", language: "en-US", pillar: "Shorts & Reels", link: "n/a — Link in bio",
      images: [], flagged: true, batch: "2026-11-26",
      funnelStage: "Attract", persona: "Global Citizen", program: "Volunteer trip — Ayalagaya, September 2026",
    }, o, { versions: { "pt-BR": o.pt } });
  }

  const NEW = [
    post({
      id: "v261126-reel", channels: ["Instagram"], format: "Reel",
      title: "Reel: A Week with the Community",
      copy: `A week with the community in Ayalagaya. 🎬

Volunteers arriving for the school competition, and the people who make every step of the work happen, in Ayalagaya, Arri and Dabil.

Follow along for more from the field.`,
      cta: "Follow along",
      hashtags: ["#Karimu", "#Tanzania", "#CommunityLed", "#Volunteering", "#Ayalagaya", "#Reels"],
      visual: "Reel 9:16, 14s. Hook (0–3.5s) 'A week with the community.' over the volunteers arriving; caption per clip; Karimu end card 'Built by the community. Follow along.'",
      assets: "Full video on the Drive (EN and PT). Preview here is reduced quality.",
      altText: "Short video: volunteers arrive at a school competition in Ayalagaya, Tanzania, followed by a Karimu end card.",
      notes: CLIPS_NOTE,
      videos: {
        "en-US": vid("reel-2026-11-26-en", "reel", "1ELMpKCemQmxmo-cvCuI-G_t_N1bYQJXD"),
        "pt-BR": vid("reel-2026-11-26-pt", "reel", "15d580_GelXFuDSsEX-oYzhZT9zYPigFD"),
      },
      pt: {
        title: "Reel: uma semana com a comunidade",
        copy: `Uma semana com a comunidade em Ayalagaya. 🎬

Voluntários chegando para a competição escolar, e as pessoas que fazem cada etapa do trabalho acontecer, em Ayalagaya, Arri e Dabil.

Acompanhe para ver mais do campo.`,
        cta: "Acompanhe",
        hashtags: ["#Karimu", "#Tanzânia", "#ComunidadeLidera", "#Voluntariado", "#Ayalagaya", "#Reels"],
        altText: "Vídeo curto: voluntários chegam a uma competição escolar em Ayalagaya, na Tanzânia, seguido de um cartão final da Karimu.",
      },
    }),
    post({
      id: "v261126-short", channels: ["YouTube"], format: "Short",
      title: "Short: A Week with the Community",
      copy: `A week with the community in Ayalagaya, Tanzania. Volunteers arrive for the school competition. Every step of the work is built by the community.

Subscribe for more from Ayalagaya, Arri and Dabil.`,
      cta: "Subscribe",
      hashtags: ["#Karimu", "#Tanzania", "#CommunityLed", "#Shorts"],
      visual: "YouTube Short 9:16, 14s. Same cut as the Reel; end card 'Built by the community. Subscribe.'",
      assets: "Full video on the Drive (EN and PT). Preview here is reduced quality.",
      altText: "Short video: volunteers arrive at a school competition in Ayalagaya, Tanzania, followed by a Karimu end card.",
      notes: CLIPS_NOTE + " YouTube title suggestion: 'A week with the community in Ayalagaya #Shorts'.",
      videos: {
        "en-US": vid("short-2026-11-26-en", "short", "1WJ_OdmYk0U2N6jnAjNIMpX7_JzGFAw2b"),
        "pt-BR": vid("short-2026-11-26-pt", "short", "1yUwd-GY2bbFaIWLiBaZ_Waqs-hnRvNvb"),
      },
      pt: {
        title: "Short: uma semana com a comunidade",
        copy: `Uma semana com a comunidade em Ayalagaya, na Tanzânia. Voluntários chegam para a competição escolar. Cada etapa do trabalho é construída pela comunidade.

Inscreva-se para ver mais de Ayalagaya, Arri e Dabil.`,
        cta: "Inscreva-se",
        hashtags: ["#Karimu", "#Tanzânia", "#ComunidadeLidera", "#Shorts"],
        altText: "Vídeo curto: voluntários chegam a uma competição escolar em Ayalagaya, na Tanzânia, seguido de um cartão final da Karimu.",
      },
    }),
  ];

  NEW.forEach((p) => {
    let at = -1;
    POSTS.forEach((x, i) => { if (x.pillar === p.pillar) at = i; });
    POSTS.splice(at + 1, 0, p);
  });
})();
