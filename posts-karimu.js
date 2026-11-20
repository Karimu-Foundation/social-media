// posts-karimu.js — Karimu-style artwork for the seed queue (posts-data.js).
//
// Each entry gives one seed post its Karimu template: format (kformat/size),
// English slides (primary) and a Portuguese version. Copy and figures come
// from the post itself in posts-data.js — nothing here adds a fact. Change a
// number there (and in knowledge/07-impact-facts.md) first, then here.
//
// Not covered on purpose: p06 (long-form YouTube, thumbnail = face, no text)
// and the WhatsApp text broadcasts p15 and p19.

(function () {
  "use strict";
  if (typeof POSTS === "undefined") return;

  const L = "images/library/";
  const DABIL = L + "105VTsbvzO.jpg";      // Dabil door-to-door survey, 2026
  const LAB = L + "1scnv4j21l.jpg";        // Dareda Kati Secondary lab, Ayalagaya, 2025
  const HIGH = L + "1KDDwQhyrI.jpg";       // Ayalagaya High School, 2026

  const KARIMU = {
    // ---------------------------------------------------------------- p01
    p01: {
      kformat: "carousel", size: "feed",
      slides: [
        { layout: "cover", badge: "Dabil", eyebrow: "Dabil baseline survey", title: "How does a family of five live on $0.50 a day?", highlight: "$0.50 a day?", subtitle: "Two months, door to door, across Dabil Ward. These are the preliminary findings.", photoFile: DABIL },
        { layout: "stats", theme: "blue", eyebrow: "Preliminary findings", title: "What the survey found.", body: "20 surveyors · 3,673 households · over 20,000 people.", stats: [{ value: "$0.50", label: "median income a day, household of five" }, { value: "12%", label: "enrolled in middle school" }, { value: "<2%", label: "have health insurance" }] },
        { layout: "stats", theme: "white", eyebrow: "Where this leads", title: "Ayalagaya started here too.", highlight: "here too.", stats: [{ value: "1.39%", label: "yearly school dropout in Ayalagaya today", color: "green" }, { value: "~90%", label: "of Ayalagaya's children reach high school", color: "green" }] },
        { layout: "cta", theme: "blue", eyebrow: "Follow along", title: "We know what works. Dabil is next.", highlight: "Dabil is next.", photoFile: HIGH, actions: [{ icon: "heart", title: "Follow Karimu", text: "See Dabil's story as it unfolds." }, { icon: "share", title: "Share", text: "Send this to someone who believes in a world without poverty." }] },
      ],
      pt: {
        title: "Os números de Dabil",
        copy: `Como uma família de cinco pessoas vive com US$ 0,50 por dia?

Passamos dois meses descobrindo, porta a porta, em todo o distrito de Dabil. 20 pesquisadores. 3.673 famílias. Mais de 20 mil pessoas.

Renda mediana: US$ 0,50 por dia. Matrícula no ensino fundamental II: 12%. Plano de saúde: menos de 2%.

Ayalagaya e Arri também começaram assim. Hoje, a evasão escolar em Ayalagaya é de 1,39% e quase 90% das crianças chegam ao ensino médio.

Sabemos o que funciona. Dabil é a próxima.

Acompanhe. 👇`,
        cta: "Siga para acompanhar Dabil",
        hashtags: ["#Karimu", "#Tanzânia", "#FimDaPobreza", "#ComunidadeLidera", "#Manyara", "#HistóriasDeImpacto", "#Dabil", "#DadosQueTransformam"],
        altText: "Carrossel da Karimu sobre a pesquisa em Dabil: renda mediana de US$ 0,50 por dia, 12% de matrícula no fundamental II e menos de 2% com plano de saúde, com base em entrevistas com mais de 20 mil pessoas.",
        slides: [
          { layout: "cover", badge: "Dabil", eyebrow: "Pesquisa de base de Dabil", title: "Como uma família de cinco vive com US$ 0,50 por dia?", highlight: "US$ 0,50 por dia?", subtitle: "Dois meses, porta a porta, em todo o distrito de Dabil. Estes são os resultados preliminares.", photoFile: DABIL },
          { layout: "stats", theme: "blue", eyebrow: "Resultados preliminares", title: "O que a pesquisa encontrou.", body: "20 pesquisadores · 3.673 famílias · mais de 20 mil pessoas.", stats: [{ value: "US$ 0,50", label: "de renda mediana por dia, família de cinco" }, { value: "12%", label: "matriculados no fundamental II" }, { value: "<2%", label: "têm plano de saúde" }] },
          { layout: "stats", theme: "white", eyebrow: "Aonde isso leva", title: "Ayalagaya também começou assim.", highlight: "começou assim.", stats: [{ value: "1,39%", label: "de evasão escolar por ano em Ayalagaya hoje", color: "green" }, { value: "~90%", label: "das crianças de Ayalagaya chegam ao ensino médio", color: "green" }] },
          { layout: "cta", theme: "blue", eyebrow: "Acompanhe", title: "Sabemos o que funciona. Dabil é a próxima.", highlight: "Dabil é a próxima.", photoFile: HIGH, actions: [{ icon: "heart", title: "Siga a Karimu", text: "Acompanhe a história de Dabil de perto." }, { icon: "share", title: "Compartilhe", text: "Mande para alguém que acredita num mundo sem pobreza." }] },
        ],
      },
    },

    // ---------------------------------------------------------------- p02
    p02: {
      kformat: "landscape", size: "landscape",
      slides: [{ layout: "photo-headline", eyebrow: "Education", title: "Dropout falls as the model advances: 5.83% → 1.39%.", highlight: "5.83% → 1.39%.", subtitle: "Yearly school dropout: Dabil 5.83% · Arri 3.34% · Ayalagaya 1.39%.", photoFile: LAB }],
      pt: {
        title: "A prova de que o modelo funciona: evasão por etapa",
        copy: `5,83%. 3,34%. 1,39%.

Essas são as taxas anuais de evasão escolar em três distritos da Tanzânia, cada um numa etapa diferente do modelo da Karimu de eliminação da pobreza liderado pela comunidade.

Dabil, onde estamos começando: 5,83%.
Arri, mais ou menos na metade: 3,34%.
Ayalagaya, onde o modelo completou seu ciclo: 1,39%, com quase 90% das crianças chegando ao ensino médio.

O número cai à medida que a comunidade avança no modelo. Não é coincidência. É a evidência mais forte que temos de que o investimento liderado pela comunidade em educação, saúde, água, saneamento e renda se acumula com o tempo.

99% de cada doação vai direto para a Tanzânia. Ninguém fora da Tanzânia recebe salário.

O que seria preciso para os dados de impacto da sua organização ficarem assim?`,
        cta: "Leia mais no nosso Relatório Anual 2025",
        hashtags: ["#ESG", "#ImpactoSocial", "#DesenvolvimentoInternacional", "#Tanzânia", "#TerceiroSetor"],
        altText: "Alunos num laboratório de ciências em Ayalagaya, com o texto: a evasão escolar cai conforme o modelo avança, de 5,83% em Dabil para 1,39% em Ayalagaya.",
        slides: [{ layout: "photo-headline", eyebrow: "Educação", title: "A evasão cai conforme o modelo avança: 5,83% → 1,39%.", highlight: "5,83% → 1,39%.", subtitle: "Evasão escolar por ano: Dabil 5,83% · Arri 3,34% · Ayalagaya 1,39%.", photoFile: LAB }],
      },
    },

    // ---------------------------------------------------------------- p03
    p03: {
      kformat: "single", size: "feed",
      slides: [{ layout: "before-after", eyebrow: "Health", title: "From a two-room dispensary to a maternity ward.", highlight: "a maternity ward.", beforePhotoFile: "images/p03-before-full.jpg", afterPhotoFile: "images/p03-after-full.jpg", calloutKicker: "Dareda Kati", calloutValue: "300+", calloutText: "births a month. The ward was built for 50–60.", body: "Families now travel across **the Manyara Region** to give birth here." }],
      pt: {
        title: "Um centro de saúde, 300 partos por mês",
        copy: `O que era um posto de saúde de duas salas, sem água encanada, hoje faz mais de 300 partos por mês, incluindo mais de 30 cesáreas. 🩺

Construímos a maternidade de Dareda Kati para atender de 50 a 60 partos por mês. A notícia se espalhou. Hoje, famílias viajam centenas de quilômetros para ter seus filhos aqui, porque ela se tornou o melhor centro de saúde da região de Manyara.

Isso não é uma estatística da Karimu. É uma comunidade que construiu algo tão bom que as pessoas atravessam a região para chegar até ele.

Asante Sana a todos que tornaram isso possível.`,
        cta: "Siga para ver mais histórias como esta",
        hashtags: ["#Karimu", "#Tanzânia", "#FimDaPobreza", "#ComunidadeLidera", "#Manyara", "#HistóriasDeImpacto", "#SaúdeGlobal", "#SaúdeMaterna"],
        altText: "Antes e depois da maternidade do Centro de Saúde de Dareda Kati, que hoje faz mais de 300 partos por mês, incluindo mais de 30 cesáreas.",
        slides: [{ layout: "before-after", eyebrow: "Saúde", title: "De um posto de duas salas a uma maternidade.", highlight: "uma maternidade.", beforePhotoFile: "images/p03-before-full.jpg", afterPhotoFile: "images/p03-after-full.jpg", calloutKicker: "Dareda Kati", calloutValue: "300+", calloutText: "partos por mês. A maternidade foi feita para 50 a 60.", body: "Hoje, famílias atravessam **a região de Manyara** para ter seus filhos aqui." }],
      },
    },

    // ---------------------------------------------------------------- p04
    p04: {
      kformat: "single", size: "feed",
      slides: [{ layout: "photo-headline", badge: "Entrepreneurship", badgeIcon: "income", eyebrow: "One year after graduating", title: "+342% median income.", highlight: "+342%", subtitle: "912 participants across 12 classes of the Street Business School curriculum.", photoFile: "images/p04-full.jpg" }],
      pt: {
        title: "Pequeno negócio, grande salto: +342% de renda mediana",
        copy: `Doze turmas. 912 pessoas. Um ano depois de se formarem no programa de empreendedorismo da Karimu, a renda mediana delas subiu 342%.

O programa ensina o currículo da Street Business School: habilidades reais de negócio, não caridade. A maioria das turmas forma um grupo de poupança durante o curso, então a disciplina de poupar começa na hora.

Neste trimestre, 155 de 166 formandos se qualificaram para um financiamento com contrapartida. Para cada US$ 1 que a Karimu coloca, os empreendedores investem US$ 4,60 do próprio bolso.

Esse é o modelo: dar ferramentas, não esmolas, e as pessoas constroem o resto sozinhas.

Conheça formandos como o Matthew, um entre centenas de empreendedores tanzanianos que estão transformando a formação num negócio sustentável.

Leia mais sobre o programa no nosso site.`,
        cta: "Leia mais no nosso site",
        hashtags: ["#Karimu", "#Tanzânia", "#Empreendedorismo"],
        altText: "Um empreendedor tanzaniano no seu pequeno negócio, com o texto: +342% de renda mediana um ano depois de se formar no programa de empreendedorismo da Karimu.",
        slides: [{ layout: "photo-headline", badge: "Empreendedorismo", badgeIcon: "income", eyebrow: "Um ano depois da formatura", title: "+342% de renda mediana.", highlight: "+342%", subtitle: "912 participantes em 12 turmas do currículo da Street Business School.", photoFile: "images/p04-full.jpg" }],
      },
    },

    // ---------------------------------------------------------------- p05
    p05: {
      kformat: "single", size: "feed",
      slides: [{ layout: "stats", theme: "blue", eyebrow: "Financial services", title: "Repaid on time. Every time.", highlight: "Every time.", photoFile: "images/p05-full.jpg", stats: [{ value: "$99,759", label: "in zero-interest loans to savings groups" }, { value: "$37,653", label: "more to the federation" }, { value: "100%", label: "on-time repayment" }, { value: "98%", label: "Ayalagaya federation assessment score" }] }],
      pt: {
        title: "100% em dia, sempre",
        copy: `Desde o início do programa de Serviços Financeiros da Karimu, os grupos de poupança receberam US$ 99.759 em empréstimos sem juros. A federação: mais US$ 37.653.

A taxa de pagamento? 100%. Em dia. Sempre.

Na Tanzânia, cerca de 1 em cada 10 empréstimos de grupo não é pago. Os grupos da Karimu estão provando outro modelo, baseado em transparência, formação e responsabilidade comunitária.

A federação de Ayalagaya acaba de alcançar 98% na avaliação. A federação de Arri começa no próximo trimestre.

Siga para acompanhar esse crescimento.`,
        cta: "Siga para acompanhar",
        hashtags: ["#Karimu", "#Tanzânia", "#FimDaPobreza", "#ComunidadeLidera", "#Manyara", "#InclusãoFinanceira", "#HistóriasDeImpacto"],
        altText: "Grupos de poupança da Karimu receberam US$ 99.759 em empréstimos e a federação US$ 37.653, com 100% de pagamento em dia.",
        slides: [{ layout: "stats", theme: "blue", eyebrow: "Serviços financeiros", title: "Pago em dia. Sempre.", highlight: "Sempre.", photoFile: "images/p05-full.jpg", stats: [{ value: "US$ 99.759", label: "em empréstimos sem juros aos grupos de poupança" }, { value: "US$ 37.653", label: "a mais para a federação" }, { value: "100%", label: "de pagamento em dia" }, { value: "98%", label: "na avaliação da federação de Ayalagaya" }] }],
      },
    },

    // ---------------------------------------------------------------- p07
    p07: {
      kformat: "landscape", size: "landscape",
      slides: [{ layout: "stat-card", theme: "navy", eyebrow: "Dabil baseline survey", value: "3,673", label: "households surveyed, door to door.", note: "20 surveyors · 2 months · 3,361 km on foot", source: "Dabil baseline survey, 2026 (preliminary)" }],
      pt: {
        title: "Por que vale a pena uma coleta de dados lenta e cara",
        copy: `Antes de construir qualquer coisa numa nova comunidade, a Karimu entrevista todas as famílias.

Em Dabil: 20 pesquisadores, 2 meses, 3.673 famílias, mais de 20 mil pessoas, 3.361 km percorridos a pé.

É lento. Não é glamouroso. E é por isso que a Karimu consegue dizer, com evidências, quanto do progresso de uma comunidade vem do nosso modelo e quanto vem de outros fatores.

Essa evidência abre portas com grandes fundações, porque "ajudamos pessoas" não é algo que um financiador consegue verificar. Um conjunto de dados de antes e depois é.

A conversa completa com Lucy Justin Mhando, nossa Coordenadora Local de Programas, está no YouTube.

O que os dados de base da sua organização mostrariam?`,
        cta: "Assista à conversa completa",
        hashtags: ["#DesenvolvimentoInternacional", "#ImpactoSocial", "#TerceiroSetor", "#DadosQueTransformam", "#Tanzânia"],
        altText: "Destaque: 3.673 famílias entrevistadas porta a porta em Dabil, com 20 pesquisadores, em 2 meses e 3.361 km percorridos a pé.",
        slides: [{ layout: "stat-card", theme: "navy", eyebrow: "Pesquisa de base de Dabil", value: "3.673", label: "famílias entrevistadas, porta a porta.", note: "20 pesquisadores · 2 meses · 3.361 km a pé", source: "Pesquisa de base de Dabil, 2026 (preliminar)" }],
      },
    },

    // ---------------------------------------------------------------- p08
    p08: {
      kformat: "carousel", size: "feed",
      slides: [
        { layout: "cover", badge: "Family Trip", eyebrow: "Volunteer trips", title: "Four families. One hydraulic arm.", highlight: "One hydraulic arm.", subtitle: "A week in Tanzania, working alongside the community.", photoBrief: "Kids building the hydraulic arm with Tanzanian students, July 2026 Family Trip" },
        { layout: "icon-list", theme: "navy", eyebrow: "What they did", title: "A week of real work.", highlight: "real work.", items: [{ icon: "sprout", title: "Harvesting maize", text: "In the fields with the community." }, { icon: "home", title: "Making bricks", text: "The way homes here are built." }, { icon: "people", title: "Cooking chapati, milking cows", text: "Everyday life, side by side." }, { icon: "education", title: "Building a hydraulic arm", text: "Together with Tanzanian students." }] },
        { layout: "split", theme: "white", eyebrow: "Dareda Kati Health Center", title: "One machine. New uses.", highlight: "New uses.", body: "Radiologist **Dr. Sharon Stein** joined the trip and trained health center staff.", photoBrief: "Dr. Sharon Stein training Dareda Kati staff on the ultrasound machine", boxLabel: "What changed", boxText: "Staff now use their ultrasound machine for more than pregnancy exams." },
        { layout: "cta", theme: "blue", eyebrow: "Join us", title: "Spots are open for 2027.", highlight: "open for 2027.", photoBrief: "Group photo of trip families with community members", actions: [{ icon: "calendar", title: "Adult & Teen trip", text: "Arrives June 27, 2027." }, { icon: "people", title: "Family trip", text: "Arrives July 15, 2027." }, { icon: "share", title: "Pre-register", text: "Link in bio." }] },
      ],
      pt: {
        title: "Quatro famílias, um braço hidráulico",
        copy: `Em julho, quatro famílias passaram uma semana na Tanzânia colhendo milho, fazendo tijolos, cozinhando chapati, ordenhando vacas e construindo um braço hidráulico com estudantes tanzanianos. 🛠️

Uma das famílias já voltou três vezes.

Os pais também conviveram com empreendedores, professores, profissionais de saúde e lideranças locais, conhecendo de perto como é o trabalho da Karimu.

A radiologista Dra. Sharon Stein também foi, e treinou a equipe do Centro de Saúde de Dareda Kati para usar o aparelho de ultrassom além dos exames de gravidez.

As vagas para 2027 estão abertas. Link na bio.`,
        cta: "Link na bio (formulário de pré-inscrição)",
        hashtags: ["#Karimu", "#Tanzânia", "#ViagemVoluntária", "#ViagemEmFamília", "#ComunidadeLidera", "#Manyara", "#Karimu2027"],
        altText: "Famílias voluntárias construindo um braço hidráulico com estudantes tanzanianos, colhendo milho, e a radiologista Dra. Sharon Stein treinando a equipe do centro de saúde no ultrassom.",
        slides: [
          { layout: "cover", badge: "Viagem em família", eyebrow: "Viagens de voluntários", title: "Quatro famílias. Um braço hidráulico.", highlight: "Um braço hidráulico.", subtitle: "Uma semana na Tanzânia, trabalhando lado a lado com a comunidade.", photoBrief: "Crianças construindo o braço hidráulico com estudantes tanzanianos, viagem em família de julho de 2026" },
          { layout: "icon-list", theme: "navy", eyebrow: "O que fizeram", title: "Uma semana de trabalho de verdade.", highlight: "de verdade.", items: [{ icon: "sprout", title: "Colheita de milho", text: "No campo, com a comunidade." }, { icon: "home", title: "Fabricação de tijolos", text: "Do jeito que as casas daqui são feitas." }, { icon: "people", title: "Chapati e ordenha", text: "O dia a dia, lado a lado." }, { icon: "education", title: "Um braço hidráulico", text: "Construído com estudantes tanzanianos." }] },
          { layout: "split", theme: "white", eyebrow: "Centro de Saúde de Dareda Kati", title: "Um aparelho. Novos usos.", highlight: "Novos usos.", body: "A radiologista **Dra. Sharon Stein** participou da viagem e treinou a equipe do centro de saúde.", photoBrief: "Dra. Sharon Stein treinando a equipe de Dareda Kati no ultrassom", boxLabel: "O que mudou", boxText: "A equipe agora usa o ultrassom além dos exames de gravidez." },
          { layout: "cta", theme: "blue", eyebrow: "Venha com a gente", title: "Vagas abertas para 2027.", highlight: "abertas para 2027.", photoBrief: "Foto em grupo das famílias da viagem com a comunidade", actions: [{ icon: "calendar", title: "Adultos e adolescentes", text: "Chegada em 27 de junho de 2027." }, { icon: "people", title: "Viagem em família", text: "Chegada em 15 de julho de 2027." }, { icon: "share", title: "Pré-inscrição", text: "Link na bio." }] },
        ],
      },
    },

    // ---------------------------------------------------------------- p09
    p09: {
      kformat: "reel-cover", size: "story",
      slides: [{ layout: "reel-cover", title: "One machine. New uses.", highlight: "New uses.", subtitle: "Dr. Sharon Stein at Dareda Kati Health Center.", photoBrief: "Dr. Stein training staff, close-up on the ultrasound screen" }],
      pt: {
        title: "Uma radiologista nos ensinou isto sobre o nosso próprio ultrassom",
        copy: `A Dra. Sharon Stein participou da nossa viagem em família de julho e mostrou à equipe do Centro de Saúde de Dareda Kati novas formas de usar um equipamento que eles já tinham. Treinamentos assim multiplicam o que um único aparelho pode fazer por um distrito inteiro.

Inscreva-se para ver mais do campo.`,
        cta: "Inscreva-se",
        hashtags: [],
        altText: "n/a (vídeo) — legendas na tela obrigatórias.",
        slides: [{ layout: "reel-cover", title: "Um aparelho. Novos usos.", highlight: "Novos usos.", subtitle: "Dra. Sharon Stein no Centro de Saúde de Dareda Kati.", photoBrief: "Dra. Stein treinando a equipe, close na tela do ultrassom" }],
      },
    },

    // ---------------------------------------------------------------- p10
    p10: {
      kformat: "reel-cover", size: "story",
      slides: [{ layout: "reel-cover", title: "From this, to this.", highlight: "to this.", subtitle: "New school bathrooms in Arri Ward.", photoFile: "images/p10-after-full.jpg" }],
      pt: {
        title: "Disto para isto",
        copy: `Banheiros escolares dos quais ninguém precisa ter vergonha. 🚻

Endasago, Arri, Sharmo e Dohom Secondary ganharam banheiros novos ou reformados este ano: vasos turcos e convencionais, chuveiros de verdade e pias para lavar as mãos que funcionam.

Uma escola pronta, outra quase pronta, e mais três na fila de captação.

Comente e compartilhe: precisamos do seu engajamento para continuar!`,
        cta: "Comente e compartilhe",
        hashtags: ["#Karimu", "#Tanzânia", "#ÁguaÉVida", "#ComunidadeLidera", "#Manyara", "#DiaMundialDoBanheiro", "#SaneamentoEscolar"],
        altText: "Antes e depois de banheiros escolares novos ou reformados em escolas do distrito de Arri.",
        slides: [{ layout: "reel-cover", title: "Disto para isto.", highlight: "para isto.", subtitle: "Novos banheiros escolares no distrito de Arri.", photoFile: "images/p10-after-full.jpg" }],
      },
    },

    // ---------------------------------------------------------------- p11
    p11: {
      kformat: "reel-cover", size: "story",
      slides: [{ layout: "reel-cover", title: "Chickens need a business plan first.", highlight: "a business plan first.", subtitle: "The Chicken Project is back, for eggs only.", photoFile: "images/p11-full.jpg" }],
      pt: {
        title: "Relançamos o Projeto das Galinhas. Veja por quê",
        copy: `O Projeto das Galinhas da Karimu está de volta, redesenhado para focar só na produção de ovos. Para participar, os agricultores precisam ter concluído a formação em empreendedorismo e fazer parte de um grupo de poupança, porque habilidades de negócio, disciplina de poupança e galinhas funcionam melhor juntas do que separadas.

Quatro novos grupos entraram neste trimestre. Um novo começa a cada 3 semanas, mais ou menos.

Inscreva-se para acompanhar o próximo grupo.`,
        cta: "Inscreva-se",
        hashtags: [],
        altText: "n/a (vídeo) — legendas na tela obrigatórias.",
        slides: [{ layout: "reel-cover", title: "Galinhas precisam de um plano de negócio antes.", highlight: "um plano de negócio antes.", subtitle: "O Projeto das Galinhas voltou, só para ovos.", photoFile: "images/p11-full.jpg" }],
      },
    },

    // ---------------------------------------------------------------- p12
    p12: {
      kformat: "landscape", size: "landscape",
      slides: [{ layout: "stat-card", theme: "white", eyebrow: "Transparency", value: "99%", label: "of every dollar donated goes directly to Tanzania.", note: "No one outside Tanzania draws a salary. Platinum Seal of Transparency, Candid.", source: "Karimu 2025 Annual Report" }],
      pt: {
        title: "99 centavos de cada dólar",
        copy: `99% de cada dólar doado à Karimu vai direto para a Tanzânia, financiando projetos e os salários da equipe tanzaniana. A ONG média gasta de 20% a 35% com administração e custos indiretos.

Ninguém fora da Tanzânia recebe salário. Fora da Tanzânia, a Karimu funciona só com voluntários.

Isso não é por acaso, é uma escolha de estrutura. A Karimu (EUA) capta recursos e define a estratégia; nossa organização irmã na Tanzânia, a KAHESO, executa no campo, com uma equipe de 10 pessoas de 6 etnias e equilíbrio de 50/50 entre homens e mulheres.

A Candid/GuideStar reconheceu isso com o Selo Platinum de Transparência.

Se você está avaliando onde as doações da sua organização rendem mais, essa é o tipo de estrutura que vale perguntar a toda ONG.

Como é a proporção de custos indiretos da sua organização?`,
        cta: "Veja nossas finanças completas no Relatório Anual 2025",
        hashtags: ["#ESG", "#Filantropia", "#TerceiroSetor", "#DoaçãoCorporativa", "#Tanzânia"],
        altText: "Destaque: 99% das doações à Karimu vão direto para a Tanzânia, com o Selo Platinum de Transparência da Candid/GuideStar.",
        slides: [{ layout: "stat-card", theme: "white", eyebrow: "Transparência", value: "99%", label: "de cada dólar doado vai direto para a Tanzânia.", note: "Ninguém fora da Tanzânia recebe salário. Selo Platinum de Transparência, Candid.", source: "Relatório Anual Karimu 2025" }],
      },
    },

    // ---------------------------------------------------------------- p13
    p13: {
      kformat: "single", size: "feed",
      slides: [{ layout: "event", eyebrow: "Volunteer trips 2027", title: "Come see this for yourself.", highlight: "for yourself.", photoFile: "images/p13-full.jpg", dateTop: "June", dateMain: "27", dateBottom: "2027", details: [{ icon: "calendar", text: "**Adult & Teen trip** · arrives June 27, 2027" }, { icon: "people", text: "**Family trip** · arrives July 15, 2027" }, { icon: "pin", text: "Pre-registration is open now" }], cta: "Link in bio" }],
      pt: {
        title: "Venha ver com seus próprios olhos",
        copy: `As vagas para as viagens de 2027 à Tanzânia estão abertas. 🌍

Viagem de voluntários para adultos e adolescentes: chegada em 27 de junho de 2027
Viagem de voluntários em família: chegada em 15 de julho de 2027

Quem já foi colheu milho, construiu com estudantes locais, conheceu empreendedores e professores e, no caso de uma família, voltou três vezes.

Não é turismo. São uma ou duas semanas trabalhando ao lado de uma comunidade que já está reescrevendo o próprio futuro.

A pré-inscrição está aberta. Link na bio para datas e detalhes.`,
        cta: "Link na bio",
        hashtags: ["#Karimu", "#Tanzânia", "#ViagemVoluntária", "#ViagemComPropósito", "#Manyara", "#Karimu2027", "#ViagemEmFamília"],
        altText: "Participantes de uma viagem de voluntários da Karimu com a comunidade tanzaniana, anunciando que as inscrições para as viagens de 2027 estão abertas.",
        slides: [{ layout: "event", eyebrow: "Viagens de voluntários 2027", title: "Venha ver com seus próprios olhos.", highlight: "seus próprios olhos.", photoFile: "images/p13-full.jpg", dateTop: "Junho", dateMain: "27", dateBottom: "2027", details: [{ icon: "calendar", text: "**Adultos e adolescentes** · chegada em 27 jun 2027" }, { icon: "people", text: "**Viagem em família** · chegada em 15 jul 2027" }, { icon: "pin", text: "Pré-inscrição aberta" }], cta: "Link na bio" }],
      },
    },

    // ---------------------------------------------------------------- p14
    p14: {
      kformat: "single", size: "feed",
      slides: [{ layout: "news", tag: "Newsletter", date: "This week", title: "The hard numbers and the hopeful ones.", highlight: "the hopeful ones.", photoFile: "images/p03-after-full.jpg", body: "Inside: Dabil's first survey results, **300+ births a month** at our maternity ward, and an honest update on 2026 fundraising." }],
      pt: {
        title: "A newsletter do mês: os números difíceis e os que dão esperança",
        copy: `Nossa newsletter sai esta semana. Nela: os primeiros resultados da pesquisa com as famílias de Dabil, uma maternidade que hoje faz mais de 300 partos por mês e uma atualização honesta sobre a nossa captação de 2026.

O Nelson, nosso COO, escreve sem rodeios: as partes difíceis e as que dão esperança, juntas.

Assine para não perder. Link na bio.`,
        cta: "Assine (link na bio)",
        hashtags: ["#Karimu", "#Tanzânia", "#Newsletter", "#ComunidadeLidera"],
        altText: "Anúncio da newsletter da Karimu, com a pesquisa de Dabil, os resultados da maternidade e a atualização da captação de 2026.",
        slides: [{ layout: "news", tag: "Newsletter", date: "Esta semana", title: "Os números difíceis e os que dão esperança.", highlight: "os que dão esperança.", photoFile: "images/p03-after-full.jpg", body: "Nesta edição: os primeiros resultados da pesquisa de Dabil, **mais de 300 partos por mês** na nossa maternidade e uma atualização honesta sobre a captação de 2026." }],
      },
    },

    // ---------------------------------------------------------------- p16
    p16: {
      kformat: "single", size: "feed",
      slides: [{ layout: "stats", theme: "navy", eyebrow: "Dabil water", title: "Dabil needs water. We're $260K behind.", highlight: "We're $260K behind.", body: "The gap has delayed the Dabil water project to 2027.", stats: [{ value: "$260K", label: "behind our 2026 fundraising goal" }, { value: "$300K", label: "funds phase 1: the intakes" }, { value: "35,000+", label: "people in Arri and Ayalagaya with clean water within 500 m" }] }],
      pt: {
        title: "[RASCUNHO — PRECISA DE APROVAÇÃO] Dabil precisa de água, e estamos US$ 260 mil atrás",
        copy: `Estamos US$ 260 mil atrás da nossa meta de captação de 2026, e isso já adiou o projeto de água de Dabil para 2027.

Em Dabil, as famílias caminham para buscar água. Em Arri e Ayalagaya, isso já é passado: mais de 35 mil pessoas têm água limpa a menos de 500 metros de casa.

US$ 300 mil financiam a fase 1, as captações. Temos 3 propostas de engenharia em mãos e um modelo que já funcionou duas vezes.

A Karimu é parceira dessas comunidades. É isso que a sua parceria torna possível agora.`,
        cta: "Doe",
        hashtags: ["#Karimu", "#Tanzânia", "#ÁguaÉVida", "#Dabil", "#ComunidadeLidera"],
        altText: "A Karimu está US$ 260 mil atrás da meta de captação de 2026, e são necessários US$ 300 mil para a fase 1 do projeto de água de Dabil.",
        slides: [{ layout: "stats", theme: "navy", eyebrow: "Água em Dabil", title: "Dabil precisa de água. Estamos US$ 260 mil atrás.", highlight: "Estamos US$ 260 mil atrás.", body: "A diferença adiou o projeto de água de Dabil para 2027.", stats: [{ value: "US$ 260 mil", label: "atrás da meta de captação de 2026" }, { value: "US$ 300 mil", label: "financiam a fase 1: as captações" }, { value: "35 mil+", label: "pessoas em Arri e Ayalagaya com água limpa a menos de 500 m" }] }],
      },
    },

    // ---------------------------------------------------------------- p17
    p17: {
      kformat: "single", size: "feed",
      slides: [{ layout: "photo-headline", badge: "Biochar", badgeIcon: "sprout", eyebrow: "Next cycle, 2026/27", title: "4,242 farmers. One cycle.", highlight: "One cycle.", subtitle: "1,050 in Dabil · 1,400 in Ayalagaya · 1,792 in Arri.", photoFile: "images/p17-full.jpg" }],
      pt: {
        title: "4.242 agricultores, um ciclo",
        copy: `2.244 agricultores estão colhendo a safra com biochar agora. No próximo ciclo, esse número chega a 4.242: 1.050 em Dabil, 1.400 em Ayalagaya e 1.792 em Arri.

O número de Dabil também cresceu, de 720 para 1.050, com base no que a pesquisa com as famílias mostrou sobre as necessidades da comunidade.

O biochar melhora a saúde do solo para os pequenos agricultores, que são a maior parte da economia rural da Tanzânia.

Acompanhe os dados da colheita.`,
        cta: "Acompanhe",
        hashtags: ["#Karimu", "#Tanzânia", "#Biochar", "#Agricultura", "#ComunidadeLidera", "#Manyara", "#Sustentabilidade"],
        altText: "Agricultores de Arri colhendo tomates cultivados com biochar, com o texto: 4.242 agricultores no ciclo 2026/27.",
        slides: [{ layout: "photo-headline", badge: "Biochar", badgeIcon: "sprout", eyebrow: "Próximo ciclo, 2026/27", title: "4.242 agricultores. Um ciclo.", highlight: "Um ciclo.", subtitle: "1.050 em Dabil · 1.400 em Ayalagaya · 1.792 em Arri.", photoFile: "images/p17-full.jpg" }],
      },
    },

    // ---------------------------------------------------------------- p18
    p18: {
      kformat: "carousel", size: "feed",
      slides: [
        { layout: "cover", badge: "Inclusion", eyebrow: "Dareda Kati Primary", title: "A playground built for every child.", highlight: "for every child.", subtitle: "A new playground for children with disabilities, now in use.", photoFile: "images/p18a-full.jpg" },
        { layout: "photo-text", theme: "blue", eyebrow: "Play with a purpose", title: "Fun that builds real skills.", highlight: "real skills.", body: "Hopscotch, a seesaw, a circle walk and a balance beam: the children play and build physical skills at the same time.", photoFile: "images/p18b-full.jpg" },
        { layout: "split", theme: "white", eyebrow: "What comes next", title: "They chose to make bags.", highlight: "make bags.", body: "A donor is now funding skills training. The first project teaches sewing, led by local community volunteers.", photoBrief: "Students sewing school bags in the skills-training project", boxLabel: "The goal", boxText: "A path to a job or self-sufficiency." },
        { layout: "cta", theme: "navy", eyebrow: "The full story", title: "See more on our website.", highlight: "on our website.", photoFile: "images/p18b-full.jpg", footerRight: "karimufoundation.org", actions: [{ icon: "book", title: "Read the story", text: "More photos and the full story on our website." }, { icon: "share", title: "Share", text: "Send this to someone who cares about inclusion." }] },
      ],
      pt: {
        title: "Elas escolheram fazer mochilas",
        copy: `A Karimu acaba de concluir um parquinho para crianças com deficiência na escola primária de Dareda Kati: amarelinha, gangorra, caminho em círculo e trave de equilíbrio. As crianças se divertem e desenvolvem habilidades físicas ao mesmo tempo.

Um doador comprometido com oportunidades para crianças com deficiência agora financia algo maior: formação profissional. O primeiro projeto ensina costura, com aulas dadas por voluntários da comunidade. Os alunos escolheram o que fazer: mochilas escolares, para outros estudantes carregarem seus livros.

O objetivo não é só brincar. É um caminho para um emprego ou para a autonomia.

Veja mais fotos e a história completa no nosso site.`,
        cta: "Veja mais no nosso site",
        hashtags: ["#Karimu", "#Tanzânia", "#Inclusão"],
        altText: "Crianças com deficiência brincando no novo parquinho da escola primária de Dareda Kati, e alunos costurando mochilas escolares num novo programa de formação.",
        slides: [
          { layout: "cover", badge: "Inclusão", eyebrow: "Escola primária de Dareda Kati", title: "Um parquinho feito para todas as crianças.", highlight: "para todas as crianças.", subtitle: "Um novo parquinho para crianças com deficiência, já em uso.", photoFile: "images/p18a-full.jpg" },
          { layout: "photo-text", theme: "blue", eyebrow: "Brincar com propósito", title: "Diversão que desenvolve habilidades.", highlight: "desenvolve habilidades.", body: "Amarelinha, gangorra, caminho em círculo e trave de equilíbrio: as crianças brincam e desenvolvem habilidades físicas ao mesmo tempo.", photoFile: "images/p18b-full.jpg" },
          { layout: "split", theme: "white", eyebrow: "O próximo passo", title: "Elas escolheram fazer mochilas.", highlight: "fazer mochilas.", body: "Um doador agora financia formação profissional. O primeiro projeto ensina costura, com voluntários da comunidade.", photoBrief: "Alunos costurando mochilas escolares no projeto de formação", boxLabel: "O objetivo", boxText: "Um caminho para um emprego ou para a autonomia." },
          { layout: "cta", theme: "navy", eyebrow: "A história completa", title: "Veja mais no nosso site.", highlight: "no nosso site.", photoFile: "images/p18b-full.jpg", footerRight: "karimufoundation.org", actions: [{ icon: "book", title: "Leia a história", text: "Mais fotos e a história completa no nosso site." }, { icon: "share", title: "Compartilhe", text: "Mande para alguém que se importa com inclusão." }] },
        ],
      },
    },

    // ---------------------------------------------------------------- p20
    p20: {
      kformat: "landscape", size: "landscape",
      slides: [{ layout: "photo-headline", eyebrow: "Education", title: "New classrooms at Tsaayo Primary, built with the local government.", highlight: "built with the local government.", subtitle: "Funded through a matched $30,000 grant.", photoFile: "images/p20-full.jpg" }],
      pt: {
        title: "Como é, na prática, uma parceria com o governo",
        copy: `A Karimu acaba de concluir novas salas de aula e uma área de educação infantil na escola primária de Tsaayo, financiadas por uma doação de US$ 30 mil com contrapartida e construídas em parceria com o governo local.

Essa parceria fez diferença: permitiu entregar instalações de mais qualidade por uma fração do custo normal, e por isso o projeto passou à frente de algumas obras de banheiros na nossa lista.

Vamos aplicar o mesmo modelo em mais duas escolas secundárias de Arri até o fim do ano, prevendo um salto nas matrículas do ensino secundário quando a Tanzânia eliminar o exame do fim do primário, em 2028.

Liderado pela comunidade não significa fazer tudo sozinho. Significa encontrar os parceiros certos, públicos e privados, e somar o que cada um faz de melhor.

Onde uma parceria público-privada já entregou mais do que cada lado conseguiria sozinho?`,
        cta: "Conheça nossos programas de educação",
        hashtags: ["#ESG", "#DesenvolvimentoInternacional", "#Educação", "#Tanzânia", "#TerceiroSetor"],
        altText: "Novas salas de aula e área de educação infantil na escola primária de Tsaayo, construídas em parceria com o governo local.",
        slides: [{ layout: "photo-headline", eyebrow: "Educação", title: "Novas salas na escola primária de Tsaayo, feitas com o governo local.", highlight: "feitas com o governo local.", subtitle: "Financiadas por uma doação de US$ 30 mil com contrapartida.", photoFile: "images/p20-full.jpg" }],
      },
    },
  };

  POSTS.forEach((post) => {
    const k = KARIMU[post.id];
    if (!k) return;
    post.style = "karimu";
    post.language = "en-US";
    post.kformat = k.kformat;
    post.size = k.size;
    post.slides = k.slides;
    post.versions = { "pt-BR": k.pt };
  });
})();
