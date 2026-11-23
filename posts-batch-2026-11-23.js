// posts-batch-2026-11-23.js — weekly routine, Monday 23 Nov 2026.
// 5 Instagram drafts (rotation: Impact Stories, Karimu Talks, Transformed
// Volunteers, Shorts & Reels, Institutional — GivingTuesday, Dec 1 2026),
// English (primary) + Portuguese, in the Karimu templates.
//
// Every figure is from knowledge/07-impact-facts.md (source tags in `notes`).
// No new COO newsletter or Annual Report this week, so the facts file is
// unchanged. Photos are from the curated library (photo-index.json); five
// were added this run from the Karimu Pictures and COMMS Drive folders.
// All posts start as Pending and need the usual human review.

(function () {
  "use strict";
  if (typeof POSTS === "undefined") return;

  const L = "images/library/";
  const PH = {
    tsaayoFront: L + "1B5Q3lppnu.jpg",   // Tsaayo Primary new bathroom blocks, Arri, Sep 2026
    tsaayoTap: L + "1j6F_BUU7w.jpg",     // Tsaayo Primary girls' washroom sink, Arri, Sep 2026
    tsaayoWash: L + "1hXwtE5lXk.jpg",    // Tsaayo Primary handwashing station, Arri, Sep 2026
    nice: L + "1d8Nfl-u1Y.jpg",          // Nice Lubaba, staff portrait, Mar 2026
    sharmo: L + "1vZOPEsKtd.jpg",        // Entrepreneurship graduation, Sharmo (Arri), 17 Oct 2026
    mural: L + "1ImVs0ywVp.jpg",         // Volunteers painting a school mural, Ayalagaya, 25 Sep 2026
    training: L + "1EvnADPJW3.jpg",      // Neonatal-infection training, Dareda Kati HC, 23 Oct 2026
  };

  function post(o) {
    return Object.assign({
      channels: ["Instagram"], style: "karimu", language: "en-US", link: "n/a — Link in bio",
      images: [], flagged: false, batch: "2026-11-23",
    }, o, { versions: { "pt-BR": o.pt } });
  }

  const NEW = [
    // ================================================= Karimu Impact Stories
    post({
      id: "w261123-1", pillar: "Karimu Impact Stories", format: "Carousel", kformat: "carousel", size: "feed",
      title: "Five Arri Schools, New Bathrooms", funnelStage: "Trust", persona: "Compassionate Contributor, Global Citizen", program: "Water & sanitation — Arri school bathrooms",
      copy: `Five schools in Arri now have new or remodeled bathrooms: Tsaayo Secondary, Sharmo Primary, Dohom Secondary, Endasago Primary and Arri Primary. 🚰

At Tsaayo Primary, the next one, the girls' washrooms have running water at the sink.

The habits stick, too. In 2025, 14,129 students learned hygiene from their own trained teachers, with no Karimu involvement. Handwashing with soap cuts diarrheal disease by 30%.

Next up: Dohom, Dudiye and Jangwani. Follow along.`,
      cta: "Follow for the next schools",
      hashtags: ["#Karimu", "#Tanzania", "#Sanitation", "#WASH", "#CommunityLed", "#Manyara", "#ImpactStories"],
      visual: "Carousel 4:5, 4 slides: cover (Tsaayo Primary bathrooms) → the five completed schools → hygiene data card with the girls' washroom sink → what's next + follow CTA.",
      assets: "Library photos: Tsaayo Primary bathrooms front view, girls' washroom sink and handwashing station (all Sep 2026, Drive > Karimu: Pictures > Tsaayo Primary Bathrooms).",
      altText: "New bathroom blocks at Tsaayo Primary School in Arri; slides list five Arri schools with completed bathrooms and 14,129 students taught hygiene by their own teachers in 2025.",
      notes: "Completed list (Tsaayo Secondary remodel, Sharmo Primary, Dohom Secondary, Endasago Primary, Arri Primary) and remaining schools (Tsaayo Primary near completion; Dohom, Dudiye, Jangwani fundraising) [NL Jul-26]. 14,129 students, 2025, all schools [AR25 p.14]; WHO 30% [AR25 p.14]. ⚠ The Sep 2026 Drive photos of Tsaayo Primary are titled 'in its completion' — the facts file still says 'near completion' (July). Confirm before calling it the sixth completed school; the copy only says it is 'the next one'.",
      slides: [
        { layout: "cover", badge: "Sanitation", eyebrow: "Arri school bathrooms", title: "Five schools. New bathrooms.", highlight: "New bathrooms.", subtitle: "Pictured: the new blocks at Tsaayo Primary, September 2026.", photoFile: PH.tsaayoFront },
        { layout: "numbered", theme: "navy", eyebrow: "Completed in Arri", title: "Five schools, done.", highlight: "done.", items: [
          { title: "Tsaayo Secondary", text: "Bathrooms remodeled." },
          { title: "Sharmo Primary", text: "New bathrooms completed." },
          { title: "Dohom Secondary", text: "New bathrooms completed." },
          { title: "Endasago Primary", text: "New bathrooms completed." },
          { title: "Arri Primary", text: "New bathrooms completed." },
        ] },
        { layout: "stats", theme: "white", eyebrow: "Clean hands", title: "The habit outlasts the build.", highlight: "outlasts the build.", photoFile: PH.tsaayoTap, photoPosition: "center 16%", stats: [
          { value: "14,129", label: "students taught hygiene by their own teachers (2025)", color: "blue" },
          { value: "30%", label: "less diarrheal disease with handwashing with soap (WHO)", color: "green" },
        ] },
        { layout: "cta", theme: "blue", eyebrow: "Next up", title: "Dohom, Dudiye and Jangwani are next.", highlight: "are next.", photoFile: PH.tsaayoWash, actions: [
          { icon: "heart", title: "Follow Karimu", text: "See the next schools finish." },
          { icon: "share", title: "Share", text: "Send this to someone who cares about girls staying in school." },
        ] },
      ],
      pt: {
        title: "Cinco escolas de Arri, banheiros novos",
        copy: `Cinco escolas de Arri já têm banheiros novos ou reformados: Tsaayo Secondary, Sharmo Primary, Dohom Secondary, Endasago Primary e Arri Primary. 🚰

Na Tsaayo Primary, a próxima da lista, os banheiros das meninas têm água corrente na pia.

E o hábito fica. Em 2025, 14.129 alunos aprenderam higiene com os próprios professores, formados para isso, sem participação da Karimu. Lavar as mãos com sabão reduz em 30% as doenças diarreicas.

As próximas: Dohom, Dudiye e Jangwani. Acompanhe.`,
        cta: "Siga para ver as próximas escolas",
        hashtags: ["#Karimu", "#Tanzânia", "#Saneamento", "#ÁguaESaneamento", "#ComunidadeLidera", "#Manyara", "#HistóriasDeImpacto"],
        altText: "Blocos de banheiros novos na Tsaayo Primary School, em Arri; os slides listam cinco escolas de Arri com banheiros concluídos e 14.129 alunos que aprenderam higiene com os próprios professores em 2025.",
        slides: [
          { layout: "cover", badge: "Saneamento", eyebrow: "Banheiros escolares em Arri", title: "Cinco escolas. Banheiros novos.", highlight: "Banheiros novos.", subtitle: "Na foto: os blocos novos da Tsaayo Primary, setembro de 2026.", photoFile: PH.tsaayoFront },
          { layout: "numbered", theme: "navy", eyebrow: "Concluídos em Arri", title: "Cinco escolas, prontas.", highlight: "prontas.", items: [
            { title: "Tsaayo Secondary", text: "Banheiros reformados." },
            { title: "Sharmo Primary", text: "Banheiros novos concluídos." },
            { title: "Dohom Secondary", text: "Banheiros novos concluídos." },
            { title: "Endasago Primary", text: "Banheiros novos concluídos." },
            { title: "Arri Primary", text: "Banheiros novos concluídos." },
          ] },
          { layout: "stats", theme: "white", eyebrow: "Mãos limpas", title: "O hábito dura mais que a obra.", highlight: "dura mais que a obra.", photoFile: PH.tsaayoTap, photoPosition: "center 16%", stats: [
            { value: "14.129", label: "alunos aprenderam higiene com os próprios professores (2025)", color: "blue" },
            { value: "30%", label: "menos doenças diarreicas lavando as mãos com sabão (OMS)", color: "green" },
          ] },
          { layout: "cta", theme: "blue", eyebrow: "As próximas", title: "Dohom, Dudiye e Jangwani são as próximas.", highlight: "são as próximas.", photoFile: PH.tsaayoWash, actions: [
            { icon: "heart", title: "Siga a Karimu", text: "Veja as próximas escolas ficarem prontas." },
            { icon: "share", title: "Compartilhe", text: "Mande para alguém que se importa com meninas na escola." },
          ] },
        ],
      },
    }),

    // ================================================= Karimu Talks
    post({
      id: "w261123-2", pillar: "Karimu Talks", format: "Story", kformat: "story", size: "story", flagged: true,
      title: "Karimu Talks Story: Nice Lubaba and the Sharmo Graduates", funnelStage: "Trust", persona: "Global Citizen, Compassionate Contributor", program: "Income — entrepreneurship",
      copy: `Story sequence (4 frames): meet Nice Lubaba → the Sharmo graduation → the question (poll) → the answer.

Nice Lubaba is part of Karimu's Income Projects team in Tanzania. In October, a new class of entrepreneurs graduated in Sharmo, Arri. One year after graduation, median income is up 342% (2026 assessment).`,
      cta: "Answer the poll / follow",
      hashtags: [],
      visual: "Story 9:16, 4 frames: portrait → graduation photo → poll sticker (options: +50% / +150% / +342%) → answer card. Add the poll sticker in Instagram on frame 3.",
      assets: "Library photos: staff portrait of Nice Lubaba (Mar 2026, Drive > Karimu: Pictures > Karimu staff); Sharmo entrepreneurship graduation (17 Oct 2026, Drive > Karimu: Pictures).",
      altText: "Story introducing Nice Lubaba of Karimu's Income Projects team, a graduation of entrepreneurs in Sharmo, and the result: median income up 342% one year after graduation.",
      notes: "Nice Lubaba is on the named-people list (Income Projects) — confirm consent, current title and how Nice wants to be introduced; this is a first feature. No quote is used; add a verbatim line if Nice records one. +342% median / +195% average, one year after graduation, 2026 assessment; 912 participants (607 Arri, 305 Ayalagaya); 63% women in 2026 [NL Jul-26]. The graduates in the Sharmo photo are not named; confirm consent for the two people in the foreground.",
      slides: [
        { layout: "photo-headline", badge: "Karimu Talks", badgeIcon: "people", eyebrow: "Income Projects", title: "Meet Nice Lubaba.", highlight: "Nice Lubaba.", subtitle: "Karimu's Income Projects team, working with entrepreneurs in Tanzania.", photoFile: PH.nice, photoPosition: "center 15%" },
        { layout: "photo-headline", badge: "Sharmo, Arri", badgeIcon: "education", eyebrow: "October 2026", title: "A new class graduated.", highlight: "graduated.", subtitle: "912 people have joined Karimu's entrepreneurship program in Arri and Ayalagaya.", photoFile: PH.sharmo, photoPosition: "45% center" },
        { layout: "story-poll", theme: "navy", eyebrow: "Quick question", title: "How much does median income grow in a year?", highlight: "in a year?", subtitle: "Measured one year after graduating from the program." },
        { layout: "stat-card", theme: "blue", eyebrow: "The answer", value: "342%", label: "growth in median income, one year after graduation.", note: "Average: +195%. 63% of 2026 participants are women.", source: "Karimu COO newsletter, July 2026 (2026 assessment)" },
      ],
      pt: {
        title: "Story Karimu Talks: Nice Lubaba e os formandos de Sharmo",
        copy: `Sequência de story (4 telas): conheça Nice Lubaba → a formatura em Sharmo → a pergunta (enquete) → a resposta.

Nice Lubaba faz parte da equipe de Projetos de Renda da Karimu na Tanzânia. Em outubro, uma nova turma de empreendedores se formou em Sharmo, Arri. Um ano depois da formatura, a renda mediana sobe 342% (avaliação de 2026).`,
        cta: "Responda a enquete / siga",
        hashtags: [],
        altText: "Story apresentando Nice Lubaba, da equipe de Projetos de Renda da Karimu, uma formatura de empreendedores em Sharmo e o resultado: renda mediana 342% maior um ano depois da formatura.",
        slides: [
          { layout: "photo-headline", badge: "Karimu Talks", badgeIcon: "people", eyebrow: "Projetos de renda", title: "Conheça Nice Lubaba.", highlight: "Nice Lubaba.", subtitle: "Equipe de Projetos de Renda da Karimu, ao lado de empreendedores na Tanzânia.", photoFile: PH.nice, photoPosition: "center 15%" },
          { layout: "photo-headline", badge: "Sharmo, Arri", badgeIcon: "education", eyebrow: "Outubro de 2026", title: "Uma nova turma se formou.", highlight: "se formou.", subtitle: "912 pessoas já entraram no programa de empreendedorismo da Karimu em Arri e Ayalagaya.", photoFile: PH.sharmo, photoPosition: "45% center" },
          { layout: "story-poll", theme: "navy", eyebrow: "Pergunta rápida", title: "Quanto a renda mediana cresce em um ano?", highlight: "em um ano?", subtitle: "Medido um ano depois da formatura no programa." },
          { layout: "stat-card", theme: "blue", eyebrow: "A resposta", value: "342%", label: "de crescimento na renda mediana, um ano depois da formatura.", note: "Média: +195%. 63% dos participantes de 2026 são mulheres.", source: "Newsletter do COO da Karimu, julho de 2026 (avaliação de 2026)" },
        ],
      },
    }),

    // ================================================= Transformed Volunteers
    post({
      id: "w261123-3", pillar: "Karimu Transformed Volunteers", format: "Single Image", kformat: "single", size: "feed", flagged: true,
      title: "One Wall, Painted Together", funnelStage: "Attract", persona: "Adventure Philanthropist", program: "Volunteer trips",
      copy: `One wall, painted together. 🎨

On our September 2026 volunteer trip, volunteers and students painted this mural together at a school in Ayalagaya.

That's the trip: not watching from the side, but working alongside the community.

Outside Tanzania, Karimu is staffed entirely by volunteers. The next Adult & Teen trip arrives June 27, 2027, and pre-registration is open. Link in bio.`,
      cta: "Link in bio (trip pre-registration)",
      hashtags: ["#Karimu", "#Tanzania", "#VolunteerTrip", "#TravelWithPurpose", "#CommunityLed", "#Karimu2027"],
      visual: "Single image 4:5: photo + headline (mural painting, Sep 2026 volunteer trip).",
      assets: "Library photo: volunteers painting a school mural, Ayalagaya, 25 Sep 2026 (Drive > 2026 September Volunteer Trip > COMMS > Various Volunteer Projects > 2026 Volunteers and students mural painting).",
      altText: "Three volunteers, one on a wooden ladder, painting a colorful mural of animals and plants on a school wall in Ayalagaya, with text: one wall, painted together.",
      notes: "Mural photo: Ayalagaya ward per file and folder name; the school is not recorded — do not name one. Confirm consent of the three volunteers pictured. Other frames in the folder show students holding drawings with their full names written on them: do not use those (child safety). 'Staffed exclusively by volunteers outside Tanzania' [SC]; Adult & Teen arrival June 27, 2027 [NL Jul-26] — departure date still needs Marianne's sign-off, so it is not mentioned.",
      slides: [{ layout: "photo-headline", badge: "Volunteer trip", badgeIcon: "people", eyebrow: "Karimu Transformed Volunteers", title: "One wall. Painted together.", highlight: "Painted together.", subtitle: "Volunteers and students, Ayalagaya, September 2026.", photoFile: PH.mural, photoPosition: "center 20%" }],
      pt: {
        title: "Uma parede, pintada juntos",
        copy: `Uma parede, pintada juntos. 🎨

Na nossa viagem de voluntários de setembro de 2026, voluntários e alunos pintaram juntos este mural numa escola de Ayalagaya.

A viagem é isso: não ficar olhando de fora, e sim trabalhar ao lado da comunidade.

Fora da Tanzânia, a Karimu é feita só de voluntários. A próxima viagem de adultos e adolescentes chega em 27 de junho de 2027, e a pré-inscrição está aberta. Link na bio.`,
        cta: "Link na bio (pré-inscrição da viagem)",
        hashtags: ["#Karimu", "#Tanzânia", "#ViagemVoluntária", "#ViagemComPropósito", "#ComunidadeLidera", "#Karimu2027"],
        altText: "Três voluntárias, uma numa escada de madeira, pintando um mural colorido de animais e plantas na parede de uma escola em Ayalagaya, com o texto: uma parede, pintada juntos.",
        slides: [{ layout: "photo-headline", badge: "Viagem de voluntários", badgeIcon: "people", eyebrow: "Voluntários transformados", title: "Uma parede. Pintada juntos.", highlight: "Pintada juntos.", subtitle: "Voluntários e alunos, Ayalagaya, setembro de 2026.", photoFile: PH.mural, photoPosition: "center 20%" }],
      },
    }),

    // ================================================= Shorts & Reels
    post({
      id: "w261123-4", pillar: "Shorts & Reels", format: "Reel", kformat: "reel-cover", size: "story",
      title: "Reel: Where the Region's Health Workers Come to Learn", funnelStage: "Attract", persona: "Global Citizen", program: "Health — Dareda Kati Health Center",
      copy: `Comment and share! We need your engagement to keep fighting extreme poverty. 🩺

Dareda Kati Health Center was once a two-room dispensary without running water. Today it serves over 40,000 people, it's the best health center in the Manyara Region, and medical professionals come from across the region to train there.

This October: a training on newborn infections for staff from local dispensaries.`,
      cta: "Comment and share",
      hashtags: ["#Karimu", "#Tanzania", "#GlobalHealth", "#HealthWorkers", "#CommunityLed", "#Manyara"],
      visual: "Reel 9:16, 20–30s. Hook (0–2s): the trainer at the screen. Cuts: staff taking the pre-test, the session, the post-test. Burned-in captions. End card: follow.",
      assets: "Cover: library photo of the neonatal-infection training at Dareda Kati Health Center (23 Oct 2026). Clips/stills: Drive > Karimu: Pictures > Neonatal Infection training (pre-test, training, post-test, Oct 2026); earlier trainings on premature rupture of membranes (Aug 2026) and low-risk labour and delivery (Jun 2026).",
      altText: "A clinician in a white coat presents a training on infant infections to medical staff seated at desks in a classroom at Dareda Kati Health Center.",
      notes: "40,000 people; two-room dispensary without running water; best health center in the Manyara Region; draws medical professionals from across the region for training [SC] [NL Jul-26]. Training topic and date from the Drive file names (23 Oct 2026, 'Neonatal Infection', staff from different dispensaries). The trainer is not named — confirm name and consent before adding one.",
      slides: [{ layout: "reel-cover", title: "Where the region's health workers come to learn.", highlight: "come to learn.", subtitle: "Dareda Kati Health Center, October 2026.", photoFile: PH.training, photoPosition: "22% center" }],
      pt: {
        title: "Reel: onde os profissionais de saúde da região vêm aprender",
        copy: `Comente e compartilhe! Precisamos do seu engajamento para continuar lutando contra a pobreza extrema. 🩺

O Centro de Saúde de Dareda Kati já foi um posto de dois cômodos sem água encanada. Hoje atende mais de 40.000 pessoas, é o melhor centro de saúde da região de Manyara, e profissionais de saúde de toda a região vêm se formar lá.

Em outubro: uma capacitação sobre infecções em recém-nascidos para equipes de postos de saúde locais.`,
        cta: "Comente e compartilhe",
        hashtags: ["#Karimu", "#Tanzânia", "#SaúdeGlobal", "#ProfissionaisDeSaúde", "#ComunidadeLidera", "#Manyara"],
        altText: "Um profissional de saúde de jaleco branco apresenta uma capacitação sobre infecções infantis para equipes médicas sentadas numa sala do Centro de Saúde de Dareda Kati.",
        slides: [{ layout: "reel-cover", title: "Onde os profissionais de saúde da região vêm aprender.", highlight: "vêm aprender.", subtitle: "Centro de Saúde de Dareda Kati, outubro de 2026.", photoFile: PH.training, photoPosition: "22% center" }],
      },
    }),

    // ================================================= Institutional & Special Dates
    post({
      id: "w261123-5", pillar: "Institutional & Special Dates", format: "Single Image", kformat: "single", size: "feed",
      title: "GivingTuesday: 99% Goes to Tanzania", funnelStage: "Trust", persona: "Compassionate Contributor, Philanthropic Investor", program: "Transparency & efficiency — special date",
      copy: `It's GivingTuesday. If you're deciding where to give, here's how Karimu works. 💙

99% of all donations go directly to Tanzania, funding projects and Tanzanian staff salaries. No one outside Tanzania receives a salary: outside Tanzania, Karimu is staffed entirely by volunteers.

The average NGO spends 20–35% on overhead. Karimu holds Candid's Platinum Seal of Transparency.

Share this with someone deciding where to give today.`,
      cta: "Share with someone deciding where to give",
      hashtags: ["#Karimu", "#Tanzania", "#GivingTuesday", "#Transparency", "#GiveWithImpact", "#CommunityLed"],
      visual: "Single image 4:5, stats card: headline, one line, Sharmo graduation photo, three figures (99% · 20–35% · Platinum). Publish on Tuesday, December 1, 2026.",
      assets: "Library photo: entrepreneurship graduation in Sharmo, Arri (17 Oct 2026) — a program the gifts fund.",
      altText: "Graduates at the entrepreneurship graduation in Sharmo, with GivingTuesday figures: 99% of all donations go directly to Tanzania; average NGO overhead 20–35%; Candid Platinum Seal of Transparency 2025; no one outside Tanzania receives a salary.",
      notes: "99% to Tanzania, 2025 [AR25 p.45] (never 98%); no salaries outside Tanzania, volunteers only [SC]; average NGO overhead 20–35% [SC]; Candid/GuideStar Platinum Seal 2025 [AR25]. Not a donation ask: CTA is share (Fundraising Support was not requested). Schedule for Dec 1, 2026. If the team wants a fundraising version tied to the $40K Quantaphy match in the Nov 2026 bulletin, that is a separate Fundraising Support request.",
      slides: [{ layout: "stats", theme: "white", eyebrow: "GivingTuesday · Dec 1", title: "Give where it actually lands.", highlight: "actually lands.", body: "No one outside Tanzania receives a salary. Your gift funds projects and **Tanzanian staff**.", photoFile: PH.sharmo, photoPosition: "center 12%", stats: [
        { value: "99%", label: "of all donations go directly to Tanzania (2025)", color: "blue" },
        { value: "20–35%", label: "average NGO overhead, for comparison" },
        { value: "Platinum", label: "Candid Seal of Transparency, 2025", color: "green" },
      ] }],
      pt: {
        title: "GivingTuesday: 99% vão para a Tanzânia",
        copy: `Hoje é GivingTuesday, o dia mundial da doação. Se você está decidindo para onde doar, é assim que a Karimu funciona. 💙

99% de todas as doações vão direto para a Tanzânia, financiando projetos e os salários da equipe tanzaniana. Ninguém fora da Tanzânia recebe salário: fora de lá, a Karimu é feita só de voluntários.

A ONG média gasta de 20% a 35% com custos administrativos. A Karimu tem o Selo Platinum de Transparência da Candid.

Compartilhe com alguém que está decidindo para onde doar hoje.`,
        cta: "Compartilhe com quem está decidindo para onde doar",
        hashtags: ["#Karimu", "#Tanzânia", "#GivingTuesday", "#DiaDeDoar", "#Transparência", "#ComunidadeLidera"],
        altText: "Formandos na formatura de empreendedorismo em Sharmo, com os números do GivingTuesday: 99% de todas as doações vão direto para a Tanzânia; custo administrativo médio de ONGs de 20% a 35%; Selo Platinum de Transparência da Candid em 2025; ninguém fora da Tanzânia recebe salário.",
        slides: [{ layout: "stats", theme: "white", eyebrow: "GivingTuesday · 1º de dez", title: "Doe onde a doação chega de verdade.", highlight: "chega de verdade.", body: "Ninguém fora da Tanzânia recebe salário. Sua doação financia projetos e a **equipe tanzaniana**.", photoFile: PH.sharmo, photoPosition: "center 12%", stats: [
          { value: "99%", label: "de todas as doações vão direto para a Tanzânia (2025)", color: "blue" },
          { value: "20–35%", label: "custo administrativo médio de ONGs, para comparar" },
          { value: "Platinum", label: "Selo de Transparência da Candid, 2025", color: "green" },
        ] }],
      },
    }),
  ];

  // Insert each new post right after the last existing post of its pillar,
  // so the queue reads by theme.
  NEW.forEach((p) => {
    let at = -1;
    POSTS.forEach((x, i) => { if (x.pillar === p.pillar) at = i; });
    POSTS.splice(at + 1, 0, p);
  });
})();
