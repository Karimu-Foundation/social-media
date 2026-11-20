// posts-batch-2026-11.js — 14 new Instagram drafts, two per content pillar,
// in the Karimu templates with English (primary) and Portuguese versions.
//
// Every figure is from knowledge/07-impact-facts.md (source tags in `notes`).
// Photos are from the curated library (photo-index.json); empty slots carry a
// shot brief. All posts start as Pending and need the usual human review.

(function () {
  "use strict";
  if (typeof POSTS === "undefined") return;

  const L = "images/library/";
  const PH = {
    dabil: L + "105VTsbvzO.jpg",      // Dabil door-to-door survey, 2026
    lab: L + "1scnv4j21l.jpg",        // Dareda Kati Secondary lab, Ayalagaya, 2025
    high: L + "1KDDwQhyrI.jpg",       // Ayalagaya High School, 2026
    dudiye: L + "16WxAdIDk-.jpg",     // Dudiye Primary, Arri, 2026
    trench: L + "1C6TfrnIgb.jpg",     // Arri water expansion, pipe into trench, 2026
    pipes: L + "12eppST2zc.jpg",      // Arri water expansion, carrying pipes, 2026
    bricks: L + "1j40w_80Lg.jpg",     // 2025 Family Trip, making bricks
    maternity: "images/p03-after-full.jpg",
  };

  function post(o) {
    return Object.assign({
      channels: ["Instagram"], style: "karimu", language: "en-US", link: "n/a — Link in bio",
      images: [], flagged: false, batch: "2026-11",
    }, o, { versions: { "pt-BR": o.pt } });
  }

  const NEW = [
    // ================================================= Karimu Impact Stories
    post({
      id: "n01", pillar: "Karimu Impact Stories", format: "Carousel", kformat: "carousel", size: "feed",
      title: "Vaccination: Where Dabil Starts, Where Ayalagaya Is", funnelStage: "Trust", persona: "Compassionate Contributor, Global Citizen", program: "Health — childhood vaccination",
      copy: `60% of children under five in Dabil are fully vaccinated. In Ayalagaya, the childhood vaccination rate is 90%.

Same region. Different stage of the journey.

Ayalagaya's health system was built with the community, and it now outpaces WHO figures for rural areas in developing countries. Dabil is where that work begins, starting with this year's door-to-door survey.

Follow to see Dabil's numbers change. 💉`,
      cta: "Follow for Dabil updates",
      hashtags: ["#Karimu", "#Tanzania", "#GlobalHealth", "#Vaccines", "#CommunityLed", "#Manyara", "#ImpactStories"],
      visual: "Carousel 4:5, 3 slides: cover (Dabil survey photo) → two-figure comparison → follow CTA.",
      assets: "Library photos: Dabil survey (2026), Ayalagaya High School (2026).",
      altText: "A Karimu surveyor interviewing a family in Dabil; slides compare 60% of children under five fully vaccinated in Dabil with a 90% childhood vaccination rate in Ayalagaya.",
      notes: "Dabil 60% = children under 5 fully vaccinated, preliminary survey [NL Jul-26]. Ayalagaya 90% = childhood vaccination rate [AR23]. Different measures and years — keep both labels exact.",
      slides: [
        { layout: "cover", badge: "Health", eyebrow: "Childhood vaccination", title: "Same region. Different stage of the journey.", highlight: "Different stage of the journey.", subtitle: "What vaccination looks like where the work starts, and where it has run its course.", photoFile: PH.dabil },
        { layout: "stats", theme: "white", eyebrow: "The numbers", title: "From 60% to 90%.", highlight: "90%.", body: "Ayalagaya now outpaces WHO figures for rural areas in developing countries.", stats: [{ value: "60%", label: "of children under 5 fully vaccinated in Dabil (2026, preliminary)", color: "purple" }, { value: "90%", label: "childhood vaccination rate in Ayalagaya (2023)", color: "green" }] },
        { layout: "cta", theme: "blue", eyebrow: "Follow along", title: "Dabil is next.", highlight: "Dabil is next.", photoFile: PH.high, actions: [{ icon: "heart", title: "Follow Karimu", text: "Watch Dabil's numbers change." }, { icon: "share", title: "Share", text: "Send this to someone who cares about children's health." }] },
      ],
      pt: {
        title: "Vacinação: onde Dabil começa, onde Ayalagaya está",
        copy: `60% das crianças menores de cinco anos em Dabil estão com a vacinação completa. Em Ayalagaya, a taxa de vacinação infantil é de 90%.

Mesma região. Etapas diferentes do caminho.

O sistema de saúde de Ayalagaya foi construído com a comunidade e hoje supera os números da OMS para áreas rurais de países em desenvolvimento. Dabil é onde esse trabalho começa, a partir da pesquisa porta a porta deste ano.

Siga para ver os números de Dabil mudarem. 💉`,
        cta: "Siga para acompanhar Dabil",
        hashtags: ["#Karimu", "#Tanzânia", "#SaúdeGlobal", "#Vacinação", "#ComunidadeLidera", "#Manyara", "#HistóriasDeImpacto"],
        altText: "Uma pesquisadora da Karimu entrevistando uma família em Dabil; os slides comparam 60% de crianças menores de cinco anos com vacinação completa em Dabil e 90% de vacinação infantil em Ayalagaya.",
        slides: [
          { layout: "cover", badge: "Saúde", eyebrow: "Vacinação infantil", title: "Mesma região. Etapas diferentes do caminho.", highlight: "Etapas diferentes do caminho.", subtitle: "Como está a vacinação onde o trabalho começa, e onde ele já completou o ciclo.", photoFile: PH.dabil },
          { layout: "stats", theme: "white", eyebrow: "Os números", title: "De 60% para 90%.", highlight: "90%.", body: "Ayalagaya hoje supera os números da OMS para áreas rurais de países em desenvolvimento.", stats: [{ value: "60%", label: "das crianças menores de 5 anos com vacinação completa em Dabil (2026, preliminar)", color: "purple" }, { value: "90%", label: "de vacinação infantil em Ayalagaya (2023)", color: "green" }] },
          { layout: "cta", theme: "blue", eyebrow: "Acompanhe", title: "Dabil é a próxima.", highlight: "Dabil é a próxima.", photoFile: PH.high, actions: [{ icon: "heart", title: "Siga a Karimu", text: "Veja os números de Dabil mudarem." }, { icon: "share", title: "Compartilhe", text: "Mande para alguém que se importa com a saúde das crianças." }] },
        ],
      },
    }),
    post({
      id: "n02", pillar: "Karimu Impact Stories", format: "Single Image", kformat: "single", size: "feed",
      title: "Arri's Water System Is Starting to Run Itself", funnelStage: "Trust", persona: "Compassionate Contributor, Philanthropic Investor", program: "Water & sanitation — Arri maintenance",
      copy: `Arri's water committee looks after 211 water points, 11 tanks and 139.2 km of underground pipes.

And it's getting faster: repairs in Arri now happen in under 30 days, Karimu's goal. In some villages, the community spotted up to 89% of the faults before anyone else did.

Meanwhile, the expansion is under way, with community members trenching by hand and carrying pipes up the mountain.

Built by the community. Kept running by the community. 💧`,
      cta: "Follow for more",
      hashtags: ["#Karimu", "#Tanzania", "#WaterIsLife", "#CommunityLed", "#Manyara", "#CleanWater"],
      visual: "Single image 4:5: photo + headline (Arri water expansion, 2026).",
      assets: "Library photo: Arri community carrying pipes up the hillside, June 2026.",
      altText: "Arri community members carrying water pipes up a forested hillside, with text: 211 water points, kept running by the community.",
      notes: "211 points / 11 tanks / 139.2 km [AR24]. Under-30-day goal reached in Arri, Q2 2026; self-identification ~51–89% across villages [NL Jul-26]. Expansion under construction — do not call the system 'complete'.",
      slides: [{ layout: "photo-headline", badge: "Arri water", badgeIcon: "drop", eyebrow: "Kept running by the community", title: "211 water points. Fixed in under 30 days.", highlight: "Fixed in under 30 days.", subtitle: "Arri's water committee maintains 211 water points, 11 tanks and 139.2 km of pipes.", photoFile: PH.pipes }],
      pt: {
        title: "O sistema de água de Arri está começando a funcionar sozinho",
        copy: `A comissão de água de Arri cuida de 211 pontos de água, 11 reservatórios e 139,2 km de tubulação subterrânea.

E está cada vez mais rápida: os consertos em Arri agora acontecem em menos de 30 dias, a meta da Karimu. Em algumas aldeias, a própria comunidade identificou até 89% das falhas antes de qualquer outra pessoa.

Enquanto isso, a expansão está em obra, com moradores cavando as valas à mão e carregando os canos morro acima.

Construído pela comunidade. Mantido pela comunidade. 💧`,
        cta: "Siga para ver mais",
        hashtags: ["#Karimu", "#Tanzânia", "#ÁguaÉVida", "#ComunidadeLidera", "#Manyara", "#ÁguaLimpa"],
        altText: "Moradores de Arri carregando canos de água morro acima, com o texto: 211 pontos de água, mantidos pela comunidade.",
        slides: [{ layout: "photo-headline", badge: "Água em Arri", badgeIcon: "drop", eyebrow: "Mantido pela comunidade", title: "211 pontos de água. Consertos em menos de 30 dias.", highlight: "Consertos em menos de 30 dias.", subtitle: "A comissão de água de Arri cuida de 211 pontos, 11 reservatórios e 139,2 km de canos.", photoFile: PH.pipes }],
      },
    }),

    // ================================================= Karimu Talks
    post({
      id: "n03", pillar: "Karimu Talks", format: "Quote card", kformat: "single", size: "feed", flagged: true,
      title: "Karimu Talks: Lucy Justin Mhando", funnelStage: "Trust", persona: "Compassionate Contributor", program: "Karimu Talks",
      copy: `"Donors and volunteers, everything you have invested is worth it!"

Lucy Justin Mhando, Karimu's Local Program Area Lead, works alongside the communities every day.

Giving to Karimu isn't a transaction. It's the start of a lifelong friendship with Ayalagaya, Arri and Dabil.

Asante! 🧡`,
      cta: "Follow for more Karimu Talks",
      hashtags: ["#Karimu", "#Tanzania", "#KarimuTalks", "#CommunityLed", "#Asante"],
      visual: "Quote card 4:5: portrait of Lucy + quote, name and title.",
      assets: "Library photo: staff portrait of Lucy Justin Mhando (Aug 2023, Drive > Strategic Plans & Reports > Tanzanian Staff).",
      altText: "Portrait of Lucy Justin Mhando with her quote: Donors and volunteers, everything you have invested is worth it!",
      notes: "Quote is verbatim from Karimu's own published post (example-posts-format-gallery.md). The Portuguese version is a faithful translation. Confirm Lucy's current title and consent before publishing. Portrait is from Aug 2023 — a more recent one may exist.",
      slides: [{ layout: "quote", theme: "navy", eyebrow: "Karimu Talks", quote: "Donors and volunteers, everything you have invested is worth it!", name: "Lucy Justin Mhando", role: "Local Program Area Lead, Karimu", photoFile: L + "1kXTr10swD.jpg", photoBrief: "Portrait of Lucy Justin Mhando in the field, eye level, natural light" }],
      pt: {
        title: "Karimu Talks: Lucy Justin Mhando",
        copy: `"Doadores e voluntários, tudo o que vocês investiram vale a pena!"

Lucy Justin Mhando, responsável local pelos programas da Karimu, trabalha ao lado das comunidades todos os dias.

Doar para a Karimu não é uma transação. É o começo de uma amizade para a vida toda com Ayalagaya, Arri e Dabil.

Asante! 🧡`,
        cta: "Siga para ver mais Karimu Talks",
        hashtags: ["#Karimu", "#Tanzânia", "#KarimuTalks", "#ComunidadeLidera"],
        altText: "Retrato de Lucy Justin Mhando com a frase: Doadores e voluntários, tudo o que vocês investiram vale a pena!",
        slides: [{ layout: "quote", theme: "navy", eyebrow: "Karimu Talks", quote: "Doadores e voluntários, tudo o que vocês investiram vale a pena!", name: "Lucy Justin Mhando", role: "Responsável local pelos programas, Karimu", photoFile: L + "1kXTr10swD.jpg", photoBrief: "Retrato de Lucy Justin Mhando em campo, na altura dos olhos, luz natural" }],
      },
    }),
    post({
      id: "n04", pillar: "Karimu Talks", format: "Story", kformat: "story", size: "story", flagged: true,
      title: "Karimu Talks Story: Savings Groups, Explained by the Team", funnelStage: "Trust", persona: "Global Citizen", program: "Financial services",
      copy: `Story sequence (3 frames): who runs Financial Services → the question → the answer.

Tumaini Joseph is part of Karimu's Financial Services team in Tanzania. Across the country, about 1 in 10 savings-group loans go unpaid. In Karimu's groups: 100% repaid on time.`,
      cta: "Tap the link / follow",
      hashtags: [],
      visual: "Story 9:16, 3 frames: intro (portrait) → poll sticker → answer with link sticker. Add the poll and link stickers in Instagram.",
      assets: "ASSET NEEDED: portrait of Tumaini Joseph with a savings group.",
      altText: "Story introducing Tumaini Joseph, from the Financial Services team, and the 100% on-time repayment of Karimu's savings-group loans.",
      notes: "100% on time vs ~10% unpaid nationally [AR25 p.22] [NL Jul-26]. Tumaini Joseph is on the named-people list (Financial Services); confirm consent, current role and how they want to be introduced. Poll options: 50% / 75% / 100%.",
      slides: [
        { layout: "photo-headline", badge: "Karimu Talks", badgeIcon: "people", eyebrow: "Financial Services", title: "Meet Tumaini Joseph.", highlight: "Tumaini Joseph.", subtitle: "Karimu's Financial Services team, working with savings groups in Tanzania.", photoBrief: "Tumaini Joseph with a savings group meeting, faces visible, eye level" },
        { layout: "story-poll", theme: "navy", eyebrow: "Quick question", title: "How many of our groups' loans are repaid on time?", highlight: "on time?", subtitle: "Across Tanzania, about 1 in 10 group loans go unpaid." },
        { layout: "stat-card", theme: "blue", eyebrow: "The answer", value: "100%", label: "of loans to Karimu's savings groups, repaid on time.", note: "Built on transparency, training and community accountability.", source: "Karimu Annual Report 2025" },
      ],
      pt: {
        title: "Story Karimu Talks: grupos de poupança, explicados pela equipe",
        copy: `Sequência de story (3 telas): quem lidera os Serviços Financeiros → a pergunta → a resposta.

Tumaini Joseph faz parte da equipe de Serviços Financeiros da Karimu na Tanzânia. No país, cerca de 1 em cada 10 empréstimos de grupos de poupança não é pago. Nos grupos da Karimu: 100% pagos em dia.`,
        cta: "Toque no link / siga",
        hashtags: [],
        altText: "Story apresentando Tumaini Joseph, da equipe de Serviços Financeiros, e os 100% de pagamento em dia dos empréstimos dos grupos de poupança da Karimu.",
        slides: [
          { layout: "photo-headline", badge: "Karimu Talks", badgeIcon: "people", eyebrow: "Serviços financeiros", title: "Conheça Tumaini Joseph.", highlight: "Tumaini Joseph.", subtitle: "Equipe de Serviços Financeiros da Karimu, junto aos grupos de poupança na Tanzânia.", photoBrief: "Tumaini Joseph numa reunião de grupo de poupança, rostos visíveis, na altura dos olhos" },
          { layout: "story-poll", theme: "navy", eyebrow: "Pergunta rápida", title: "Quantos empréstimos dos nossos grupos são pagos em dia?", highlight: "pagos em dia?", subtitle: "Na Tanzânia, cerca de 1 em cada 10 empréstimos de grupo não é pago." },
          { layout: "stat-card", theme: "blue", eyebrow: "A resposta", value: "100%", label: "dos empréstimos aos grupos de poupança da Karimu, pagos em dia.", note: "Com base em transparência, formação e responsabilidade comunitária.", source: "Relatório Anual Karimu 2025" },
        ],
      },
    }),

    // ================================================= Transformed Volunteers
    post({
      id: "n05", pillar: "Karimu Transformed Volunteers", format: "Single Image", kformat: "single", size: "feed",
      title: "One Family Has Come Back Three Times", funnelStage: "Attract", persona: "Adventure Philanthropist", program: "Volunteer trips — Family Trip",
      copy: `One family has now come back three times. 🧱

On Karimu's Family Trips, kids partner with Tanzanian students, families make bricks, harvest maize and cook chapati, and parents meet the entrepreneurs, teachers and health workers behind the work.

It's not a tour. It's a week working alongside a community that's rewriting its own future, and it tends to change the people who come.

2027 pre-registration is open. Link in bio.`,
      cta: "Link in bio (pre-registration)",
      hashtags: ["#Karimu", "#Tanzania", "#VolunteerTrip", "#FamilyTravel", "#TravelWithPurpose", "#Karimu2027"],
      visual: "Single image 4:5: photo + headline (2025 Family Trip, making bricks).",
      assets: "Library photo: 2025 Family Trip, volunteer and student making bricks (representative past-trip photo).",
      altText: "A volunteer and a Tanzanian student making mud bricks together during a Karimu Family Trip, with text: one family has come back three times.",
      notes: "Family Trip activities and 'one family has come back three times' [NL Jul-26]. Photo is from the 2025 trip — caption it as a past trip if asked. Confirm consent for the volunteer and children pictured.",
      slides: [{ layout: "photo-headline", badge: "Family Trip", badgeIcon: "home", eyebrow: "Karimu Transformed Volunteers", title: "One family has come back three times.", highlight: "three times.", subtitle: "Bricks, maize, chapati, and a week alongside the community.", photoFile: PH.bricks }],
      pt: {
        title: "Uma família já voltou três vezes",
        copy: `Uma família já voltou três vezes. 🧱

Nas viagens em família da Karimu, as crianças formam parceria com estudantes tanzanianos, as famílias fazem tijolos, colhem milho e cozinham chapati, e os pais conhecem os empreendedores, professores e profissionais de saúde por trás do trabalho.

Não é turismo. É uma semana trabalhando ao lado de uma comunidade que está reescrevendo o próprio futuro, e que costuma transformar quem vai.

A pré-inscrição para 2027 está aberta. Link na bio.`,
        cta: "Link na bio (pré-inscrição)",
        hashtags: ["#Karimu", "#Tanzânia", "#ViagemVoluntária", "#ViagemEmFamília", "#ViagemComPropósito", "#Karimu2027"],
        altText: "Uma voluntária e um estudante tanzaniano fazendo tijolos de barro juntos numa viagem em família da Karimu, com o texto: uma família já voltou três vezes.",
        slides: [{ layout: "photo-headline", badge: "Viagem em família", badgeIcon: "home", eyebrow: "Voluntários transformados", title: "Uma família já voltou três vezes.", highlight: "três vezes.", subtitle: "Tijolos, milho, chapati e uma semana ao lado da comunidade.", photoFile: PH.bricks }],
      },
    }),
    post({
      id: "n06", pillar: "Karimu Transformed Volunteers", format: "Story", kformat: "story", size: "story",
      title: "Story: 2027 Trips, Spots Open", funnelStage: "Act", persona: "Adventure Philanthropist", program: "Volunteer trips — 2027 registration",
      copy: `Story sequence (2 frames): the experience → pre-register (link sticker).

Adult & Teen trip arrives June 27, 2027. Family trip arrives July 15, 2027. Pre-registration is open.`,
      cta: "Tap the link (pre-registration form)",
      hashtags: [],
      visual: "Story 9:16, 2 frames. Add the link sticker to the pre-registration form on frame 2.",
      assets: "Library photos: 2025 Family Trip (making bricks); Ayalagaya High School (2026).",
      altText: "Story inviting people to pre-register for Karimu's 2027 volunteer trips, arriving June 27 and July 15, 2027.",
      notes: "Arrival dates confirmed [NL Jul-26]; departure dates still need Marianne's sign-off — do not add them.",
      slides: [
        { layout: "event", theme: "navy", eyebrow: "Volunteer trips 2027", title: "Spend a week alongside the community.", highlight: "alongside the community.", photoFile: PH.bricks, dateTop: "June", dateMain: "27", dateBottom: "2027", details: [{ icon: "calendar", text: "**Adult & Teen trip** · arrives June 27, 2027" }, { icon: "people", text: "**Family trip** · arrives July 15, 2027" }], cta: "Pre-register" },
        { layout: "story-cta", theme: "blue", eyebrow: "Pre-registration open", title: "Come see it for yourself.", highlight: "for yourself.", subtitle: "Spots for the 2027 trips are open now.", photoFile: PH.high },
      ],
      pt: {
        title: "Story: viagens 2027, vagas abertas",
        copy: `Sequência de story (2 telas): a experiência → pré-inscrição (sticker de link).

Viagem de adultos e adolescentes: chegada em 27 de junho de 2027. Viagem em família: chegada em 15 de julho de 2027. Pré-inscrição aberta.`,
        cta: "Toque no link (formulário de pré-inscrição)",
        hashtags: [],
        altText: "Story convidando para a pré-inscrição das viagens de voluntários de 2027, com chegada em 27 de junho e 15 de julho de 2027.",
        slides: [
          { layout: "event", theme: "navy", eyebrow: "Viagens de voluntários 2027", title: "Passe uma semana ao lado da comunidade.", highlight: "ao lado da comunidade.", photoFile: PH.bricks, dateTop: "Junho", dateMain: "27", dateBottom: "2027", details: [{ icon: "calendar", text: "**Adultos e adolescentes** · chegada em 27 jun 2027" }, { icon: "people", text: "**Viagem em família** · chegada em 15 jul 2027" }], cta: "Pré-inscrição" },
          { layout: "story-cta", theme: "blue", eyebrow: "Pré-inscrição aberta", title: "Venha ver de perto.", highlight: "de perto.", subtitle: "As vagas para as viagens de 2027 estão abertas.", photoFile: PH.high },
        ],
      },
    }),

    // ================================================= Shorts & Reels
    post({
      id: "n07", pillar: "Shorts & Reels", format: "Reel", kformat: "reel-cover", size: "story",
      title: "Reel: The Water Comes Because the Community Digs", funnelStage: "Attract", persona: "Global Citizen", program: "Water — Arri expansion",
      copy: `Comment and share! We need your engagement to keep fighting extreme poverty. 💧

This is how the Arri water expansion gets built: community members dig the trenches by hand and carry the pipes up the mountain.

All households and public institutions in wards with Karimu-built water systems receive free clean water.`,
      cta: "Comment and share",
      hashtags: ["#Karimu", "#Tanzania", "#WaterIsLife", "#CommunityLed", "#Manyara"],
      visual: "Reel 9:16, 20–30s. Hook (0–2s): pipe being lowered into the trench. Quick cuts: carrying pipes uphill, trench digging, a working tap in Arri. Burned-in captions. End card: follow.",
      assets: "Cover: library photo of the community lowering a pipe into a trench (Aug 2026). Clips: Drive > Arri Water Project expansion (June–Aug 2026).",
      altText: "Arri community members lowering a water pipe into a hand-dug trench.",
      notes: "Trenching and carrying by hand; expansion under construction [NL Jul-26]. Free clean water [AR25]. Do not call the project complete.",
      slides: [{ layout: "reel-cover", title: "The water comes because the community digs.", highlight: "the community digs.", subtitle: "Arri water expansion, 2026.", photoFile: PH.trench }],
      pt: {
        title: "Reel: a água chega porque a comunidade cava",
        copy: `Comente e compartilhe! Precisamos do seu engajamento para continuar lutando contra a pobreza extrema. 💧

É assim que a expansão da água de Arri está sendo construída: moradores cavam as valas à mão e carregam os canos morro acima.

Todas as famílias e instituições públicas nos distritos com sistemas de água da Karimu recebem água limpa de graça.`,
        cta: "Comente e compartilhe",
        hashtags: ["#Karimu", "#Tanzânia", "#ÁguaÉVida", "#ComunidadeLidera", "#Manyara"],
        altText: "Moradores de Arri colocando um cano de água numa vala cavada à mão.",
        slides: [{ layout: "reel-cover", title: "A água chega porque a comunidade cava.", highlight: "a comunidade cava.", subtitle: "Expansão da água de Arri, 2026.", photoFile: PH.trench }],
      },
    }),
    post({
      id: "n08", pillar: "Shorts & Reels", format: "Reel", kformat: "reel-cover", size: "story",
      title: "Reel: 3,673 Households, Door to Door", funnelStage: "Attract", persona: "Global Citizen", program: "Dabil baseline survey",
      copy: `Comment and share! We need your engagement to keep fighting extreme poverty.

Before Karimu builds anything in a new community, we listen to every household. In Dabil: 20 surveyors, 2 months, 3,673 households, 3,361 km on foot.

That's how we'll know exactly what changes, and why.`,
      cta: "Comment and share",
      hashtags: ["#Karimu", "#Tanzania", "#Dabil", "#DataForGood", "#CommunityLed"],
      visual: "Reel 9:16, 20–30s. Hook (0–2s): '3,673 households.' on a surveyor knocking/arriving. Cuts: interviews on tablets, walking between homes. Burned-in captions. End card: follow.",
      assets: "Cover: library photo of a surveyor interviewing a family in Dabil (2026). Clips: Drive > Dabil Ward > Projects 2026 > Dabil-Door to Door Survey.",
      altText: "A Karimu surveyor with a tablet interviewing a grandmother at home in Dabil, children listening.",
      notes: "Survey scale [NL Jul-26]; findings preliminary. No child is named.",
      slides: [{ layout: "reel-cover", title: "3,673 households. Door to door.", highlight: "Door to door.", subtitle: "How Dabil's baseline survey was done.", photoFile: PH.dabil }],
      pt: {
        title: "Reel: 3.673 famílias, porta a porta",
        copy: `Comente e compartilhe! Precisamos do seu engajamento para continuar lutando contra a pobreza extrema.

Antes de construir qualquer coisa numa nova comunidade, a Karimu ouve todas as famílias. Em Dabil: 20 pesquisadores, 2 meses, 3.673 famílias, 3.361 km a pé.

É assim que vamos saber exatamente o que muda, e por quê.`,
        cta: "Comente e compartilhe",
        hashtags: ["#Karimu", "#Tanzânia", "#Dabil", "#DadosQueTransformam", "#ComunidadeLidera"],
        altText: "Uma pesquisadora da Karimu com um tablet entrevistando uma senhora em casa, em Dabil, com crianças ouvindo.",
        slides: [{ layout: "reel-cover", title: "3.673 famílias. Porta a porta.", highlight: "Porta a porta.", subtitle: "Como foi feita a pesquisa de base de Dabil.", photoFile: PH.dabil }],
      },
    }),

    // ================================================= Institutional & Special Dates
    post({
      id: "n09", pillar: "Institutional & Special Dates", format: "Single Image", kformat: "square", size: "square",
      title: "World Education Day (Jan 24)", funnelStage: "Trust", persona: "Global Citizen, Compassionate Contributor", program: "Education — special date",
      copy: `Today is World Education Day. 📚

In Ayalagaya, yearly school dropout is down to 1.39% across the 11 years of primary and secondary school, and close to 90% of children reach high school.

The schools run without Karimu now. The community keeps the lunches coming and the classrooms in shape.

Happy World Education Day to every teacher and student in Ayalagaya, Arri and Dabil.`,
      cta: "Share with a teacher you admire",
      hashtags: ["#Karimu", "#Tanzania", "#WorldEducationDay", "#Education", "#CommunityLed"],
      visual: "Square 1:1: photo + headline. Publish on Jan 24, 2027.",
      assets: "Library photo: science lab at Dareda Kati Secondary School, Ayalagaya (2025).",
      altText: "Secondary students running a science experiment in Ayalagaya, with text: World Education Day, 1.39% yearly dropout in Ayalagaya.",
      notes: "1.39% dropout, close to 90% reach high school — Ayalagaya [NL Jul-26]. Schedule for Jan 24, 2027.",
      slides: [{ layout: "photo-headline", badge: "Jan 24", badgeIcon: "education", eyebrow: "World Education Day", title: "In Ayalagaya, 1.39% dropout a year.", highlight: "1.39% dropout a year.", photoFile: PH.lab }],
      pt: {
        title: "Dia Mundial da Educação (24 de janeiro)",
        copy: `Hoje é o Dia Mundial da Educação. 📚

Em Ayalagaya, a evasão escolar caiu para 1,39% ao ano, somando os 11 anos do primário e do secundário, e quase 90% das crianças chegam ao ensino médio.

As escolas já funcionam sem a Karimu. A comunidade mantém a merenda e cuida das salas de aula.

Feliz Dia Mundial da Educação a todos os professores e alunos de Ayalagaya, Arri e Dabil.`,
        cta: "Compartilhe com um professor que você admira",
        hashtags: ["#Karimu", "#Tanzânia", "#DiaMundialDaEducação", "#Educação", "#ComunidadeLidera"],
        altText: "Alunos do secundário fazendo um experimento de ciências em Ayalagaya, com o texto: Dia Mundial da Educação, 1,39% de evasão por ano em Ayalagaya.",
        slides: [{ layout: "photo-headline", badge: "24 de jan", badgeIcon: "education", eyebrow: "Dia Mundial da Educação", title: "Em Ayalagaya, 1,39% de evasão por ano.", highlight: "1,39% de evasão por ano.", photoFile: PH.lab }],
      },
    }),
    post({
      id: "n10", pillar: "Institutional & Special Dates", format: "Single Image", kformat: "single", size: "feed",
      title: "Award: Third-Best School in Tanzania", funnelStage: "Trust", persona: "Compassionate Contributor, Philanthropic Investor", program: "Education — recognition",
      copy: `In 2022, Ayalagaya Secondary School was ranked the third-best school in Tanzania. 🏆

Today, all of its secondary students have qualified to enter high school, and five new classrooms and a faculty office have been completed at Ayalagaya Secondary and High School.

A community decided its children deserved this. Asante to every teacher, parent and student who made it happen.`,
      cta: "Follow for more",
      hashtags: ["#Karimu", "#Tanzania", "#Education", "#CommunityLed", "#Manyara"],
      visual: "Award card 4:5 (green).",
      assets: "No photo needed (type-only award template).",
      altText: "Award graphic: 2022, Ayalagaya Secondary School ranked third-best school in Tanzania.",
      notes: "Third-best school in the country (award, 2022); all secondary students qualified for high school; five new classrooms and a faculty office [SC].",
      slides: [{ layout: "award", theme: "green", eyebrow: "Recognition", year: "2022", title: "Third-best school in Tanzania.", highlight: "Third-best", sub: "Ayalagaya Secondary School, national ranking.", footer: "Today, all of its secondary students qualify for high school." }],
      pt: {
        title: "Prêmio: a terceira melhor escola da Tanzânia",
        copy: `Em 2022, a Ayalagaya Secondary School foi classificada como a terceira melhor escola da Tanzânia. 🏆

Hoje, todos os seus alunos do secundário se classificaram para o ensino médio, e cinco novas salas de aula e uma sala dos professores foram concluídas na Ayalagaya Secondary e High School.

Uma comunidade decidiu que suas crianças mereciam isso. Asante a cada professor, pai, mãe e aluno que tornou isso possível.`,
        cta: "Siga para ver mais",
        hashtags: ["#Karimu", "#Tanzânia", "#Educação", "#ComunidadeLidera", "#Manyara"],
        altText: "Arte de prêmio: 2022, a Ayalagaya Secondary School foi classificada como a terceira melhor escola da Tanzânia.",
        slides: [{ layout: "award", theme: "green", eyebrow: "Reconhecimento", year: "2022", title: "Terceira melhor escola da Tanzânia.", highlight: "Terceira melhor", sub: "Ayalagaya Secondary School, ranking nacional.", footer: "Hoje, todos os alunos do secundário se classificam para o ensino médio." }],
      },
    }),

    // ================================================= Newsletter & Channel Push
    post({
      id: "n11", pillar: "Newsletter & Channel Push", format: "Story", kformat: "story", size: "story",
      title: "Story: Subscribe to the Newsletter", funnelStage: "Act", persona: "Compassionate Contributor, Global Citizen", program: "Newsletter push",
      copy: `Story (1 frame) with link sticker to the newsletter sign-up.

The numbers behind every project, monthly: Dabil's survey, Arri's water, Ayalagaya's schools.`,
      cta: "Tap the link (newsletter sign-up)",
      hashtags: [],
      visual: "Story 9:16, 1 frame. Add the link sticker to the sign-up page.",
      assets: "Library photo: Dabil survey (2026).",
      altText: "Story inviting people to subscribe to Karimu's monthly newsletter, with a photo from the Dabil survey.",
      notes: "Publish 2–3 days before the next newsletter send; confirm the date with Nelson.",
      slides: [{ layout: "story-cta", theme: "blue", eyebrow: "Newsletter", title: "The numbers behind every project, every month.", highlight: "every month.", subtitle: "Dabil's survey, Arri's water, Ayalagaya's schools. Straight from the field.", photoFile: PH.dabil }],
      pt: {
        title: "Story: assine a newsletter",
        copy: `Story (1 tela) com sticker de link para a inscrição na newsletter.

Os números de cada projeto, todo mês: a pesquisa de Dabil, a água de Arri, as escolas de Ayalagaya.`,
        cta: "Toque no link (inscrição na newsletter)",
        hashtags: [],
        altText: "Story convidando para assinar a newsletter mensal da Karimu, com uma foto da pesquisa de Dabil.",
        slides: [{ layout: "story-cta", theme: "blue", eyebrow: "Newsletter", title: "Os números de cada projeto, todo mês.", highlight: "todo mês.", subtitle: "A pesquisa de Dabil, a água de Arri, as escolas de Ayalagaya. Direto do campo.", photoFile: PH.dabil }],
      },
    }),
    post({
      id: "n12", pillar: "Newsletter & Channel Push", format: "Single Image", kformat: "square", size: "square",
      title: "Karimu Talks Is on YouTube", funnelStage: "Act", persona: "Global Citizen", program: "YouTube subscribe push",
      copy: `Karimu Talks is on YouTube. 🎥

Conversations with the people doing this work in Tanzania: why Dabil's survey covered every household, how a maternity ward built for 50–60 births a month now delivers 300+, and what happens when a community runs its own water system.

Subscribe so you don't miss the next one. Link in bio.`,
      cta: "Subscribe on YouTube (link in bio)",
      hashtags: ["#Karimu", "#Tanzania", "#KarimuTalks", "#YouTube"],
      visual: "Square 1:1 news card (tag: YouTube).",
      assets: "Library photo: Dareda Kati maternity ward (2026).",
      altText: "Announcement that Karimu Talks is on YouTube, with a photo of the Dareda Kati maternity ward.",
      notes: "Topics must match episodes that exist or are scheduled — confirm before publishing. Maternity: 50–60 planned, 300+ births/month [NL Jul-26].",
      slides: [{ layout: "news", tag: "YouTube", date: "Karimu Talks", title: "The people behind the work, in their own words.", highlight: "in their own words.", photoFile: PH.maternity, body: "Subscribe for conversations with **Karimu's team in Tanzania**. Link in bio." }],
      pt: {
        title: "Karimu Talks está no YouTube",
        copy: `O Karimu Talks está no YouTube. 🎥

Conversas com as pessoas que fazem este trabalho na Tanzânia: por que a pesquisa de Dabil visitou todas as famílias, como uma maternidade feita para 50 a 60 partos por mês hoje faz mais de 300, e o que acontece quando uma comunidade cuida do próprio sistema de água.

Inscreva-se para não perder o próximo. Link na bio.`,
        cta: "Inscreva-se no YouTube (link na bio)",
        hashtags: ["#Karimu", "#Tanzânia", "#KarimuTalks", "#YouTube"],
        altText: "Anúncio de que o Karimu Talks está no YouTube, com uma foto da maternidade de Dareda Kati.",
        slides: [{ layout: "news", tag: "YouTube", date: "Karimu Talks", title: "As pessoas por trás do trabalho, com as próprias palavras.", highlight: "com as próprias palavras.", photoFile: PH.maternity, body: "Inscreva-se para ver conversas com **a equipe da Karimu na Tanzânia**. Link na bio." }],
      },
    }),

    // ================================================= Fundraising Support
    post({
      id: "n13", pillar: "Fundraising Support", format: "Single-stat card", kformat: "single", size: "feed", flagged: true,
      title: "[DRAFT — REQUIRES SIGN-OFF] $290 Trains One Entrepreneur", funnelStage: "Act", persona: "Compassionate Contributor", program: "Fundraising — entrepreneurship",
      copy: `$290 trains one entrepreneur in Tanzania.

One year after graduating from Karimu's entrepreneurship program, median income is up 342% (2026 assessment). 88% of graduates start a business.

It's not a handout. It's the Street Business School curriculum, a savings group, and a community that backs its own.

Train the next one. Link in bio.`,
      cta: "Donate (link in bio)",
      link: "[Donate link]",
      hashtags: ["#Karimu", "#Tanzania", "#Entrepreneurship", "#GiveWithImpact"],
      visual: "Single-stat card 4:5.",
      assets: "No photo needed (type-only).",
      altText: "Graphic: $290 trains one entrepreneur; median income up 342% one year after graduation.",
      notes: "⚠ Fundraising Support is on request only — do NOT publish without Nelson/Marianne's go-ahead. $290 [SC]; +342% median, one year after graduation, 2026 assessment [NL Jul-26]; 88% start businesses [Classy26].",
      slides: [{ layout: "stat-card", theme: "blue", eyebrow: "Give with impact", value: "$290", label: "trains one entrepreneur in Tanzania.", note: "One year after graduating, median income is up **342%** (2026 assessment).", source: "Karimu entrepreneurship program" }],
      pt: {
        title: "[RASCUNHO — PRECISA DE APROVAÇÃO] US$ 290 formam um empreendedor",
        copy: `US$ 290 formam um empreendedor na Tanzânia.

Um ano depois de concluir o programa de empreendedorismo da Karimu, a renda mediana sobe 342% (avaliação de 2026). 88% dos formandos abrem um negócio.

Não é esmola. É o currículo da Street Business School, um grupo de poupança e uma comunidade que apoia os seus.

Forme o próximo. Link na bio.`,
        cta: "Doe (link na bio)",
        hashtags: ["#Karimu", "#Tanzânia", "#Empreendedorismo", "#DoeComImpacto"],
        altText: "Arte: US$ 290 formam um empreendedor; renda mediana 342% maior um ano depois da formatura.",
        slides: [{ layout: "stat-card", theme: "blue", eyebrow: "Doe com impacto", value: "US$ 290", label: "formam um empreendedor na Tanzânia.", note: "Um ano depois da formatura, a renda mediana sobe **342%** (avaliação de 2026).", source: "Programa de empreendedorismo da Karimu" }],
      },
    }),
    post({
      id: "n14", pillar: "Fundraising Support", format: "Single-stat card", kformat: "square", size: "square", flagged: true,
      title: "[DRAFT — REQUIRES SIGN-OFF] $500 Trains a Savings Group for a Year", funnelStage: "Act", persona: "Compassionate Contributor", program: "Fundraising — financial services",
      copy: `About $500 trains a savings group for a full year.

Across Tanzania, 1 in 10 savings-group loans go unpaid. Karimu's groups: 100% repaid on time. Their return on savings is 34–41%, against a national average of 18%.

Help the next group start. Link in bio.`,
      cta: "Donate (link in bio)",
      link: "[Donate link]",
      hashtags: ["#Karimu", "#Tanzania", "#FinancialInclusion", "#GiveWithImpact"],
      visual: "Square 1:1 single-stat card.",
      assets: "No photo needed (type-only).",
      altText: "Graphic: about $500 trains a savings group for a year; Karimu's groups repay 100% on time.",
      notes: "⚠ Fundraising Support is on request only — do NOT publish without Nelson/Marianne's go-ahead. ~$500 per year-long training [Classy26]; 100% on time vs 10% unpaid; 34–41% return vs 18% [AR25 p.22].",
      slides: [{ layout: "stat-card", theme: "navy", eyebrow: "Give with impact", value: "$500", label: "trains a savings group for a full year.", note: "Karimu's groups repay **100%** on time. Across Tanzania, 1 in 10 loans go unpaid.", source: "Karimu Annual Report 2025" }],
      pt: {
        title: "[RASCUNHO — PRECISA DE APROVAÇÃO] US$ 500 formam um grupo de poupança por um ano",
        copy: `Cerca de US$ 500 formam um grupo de poupança durante um ano inteiro.

Na Tanzânia, 1 em cada 10 empréstimos de grupos de poupança não é pago. Nos grupos da Karimu: 100% pagos em dia. O retorno sobre a poupança é de 34% a 41%, contra uma média nacional de 18%.

Ajude o próximo grupo a começar. Link na bio.`,
        cta: "Doe (link na bio)",
        hashtags: ["#Karimu", "#Tanzânia", "#InclusãoFinanceira", "#DoeComImpacto"],
        altText: "Arte: cerca de US$ 500 formam um grupo de poupança por um ano; os grupos da Karimu pagam 100% em dia.",
        slides: [{ layout: "stat-card", theme: "navy", eyebrow: "Doe com impacto", value: "US$ 500", label: "formam um grupo de poupança por um ano inteiro.", note: "Os grupos da Karimu pagam **100%** em dia. Na Tanzânia, 1 em cada 10 empréstimos não é pago.", source: "Relatório Anual Karimu 2025" }],
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
