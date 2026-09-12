// Karimu Content Studio — seed post data
// Generated from the Karimu Social Media project's knowledge base:
// 07-impact-facts.md, 01/02/04/05/06/08/09-*.md, and Nelson Mattos's
// COO newsletter (data through 31 Jul 2026). Every figure is source-tagged
// in the project's 07-impact-facts.md; do not edit numbers here without
// updating that file first.

const POSTS = [
  {
    id: "p01",
    pillar: "Karimu Impact Stories",
    format: "Carousel",
    channels: ["Instagram"],
    title: "The Numbers Behind Dabil",
    funnelStage: "Trust",
    persona: "Compassionate Contributor, Global Citizen",
    program: "Dabil baseline survey",
    copy: `How does a family of five survive on $0.50 a day?

We just spent two months finding out — door to door, across Dabil Ward. 20 surveyors. 3,673 households. Over 20,000 people.

Median income: $0.50/day. Middle school enrollment: 12%. Health insurance: less than 2%.

Ayalagaya and Arri started here too. Today, Ayalagaya's dropout rate is 1.39% and nearly 90% of kids reach high school.

We know what works. Dabil is next.

Follow along. 👇`,
    cta: "Follow for Dabil updates",
    link: "n/a — Link in bio",
    hashtags: ["#Karimu","#Tanzania","#EndExtremePoverty","#CommunityLed","#Manyara","#ImpactStories","#GlobalDevelopment","#Asante","#DabilWard","#DataForGood"],
    visual: "Kraft-style carousel, 3 slides. Slide 1: hook headline ≤ 8 words, script payoff “This is where it starts.” Slide 2: data card, 3 stat rows (median income $0.50/day · 12% middle school enrollment · <2% health insurance). Slide 3: CTA card with Ayalagaya comparison (1.39% dropout) + follow CTA.",
    assets: "Drive > Dabil Ward > Projects 2026 > Dabil-Door to Door Survey (see claude/10-photo-video-library.md). Pick specific stills/clips from that folder.",
    altText: "Karimu impact data card: Dabil Ward survey shows median income of $0.50 a day, 12% middle school enrollment, and less than 2% with health insurance, based on interviews with over 20,000 people.",
    notes: "Findings are preliminary — refresh when the full Dabil Findings Report is published; keep saying “preliminary” until then.",
    images: [
      { thumb: "images/p01-thumb.jpg", full: "images/p01-full.jpg", caption: "Dabil Ward (Birsima) — general community photo. The survey folder itself only holds one raw/unprocessed file; pick a proper survey still once one is uploaded as a JPG.", needsConfirmation: true },
    ],
  },
  {
    id: "p02",
    pillar: "Karimu Impact Stories",
    format: "LinkedIn Post",
    channels: ["LinkedIn"],
    title: "Proof the Model Works: Dropout Rates by Trajectory Stage",
    funnelStage: "Trust",
    persona: "Philanthropic Investor, professionals, corporate evangelists",
    program: "Education / Theory of Change",
    copy: `5.83%. 3.34%. 1.39%.

Those are annual school dropout rates in three Tanzanian wards — each at a different stage of Karimu's community-led poverty elimination model.

Dabil, where we're just starting: 5.83%.
Arri, roughly halfway through: 3.34%.
Ayalagaya, where the model has run its course: 1.39% — with nearly 90% of children now reaching high school.

The number falls as a community moves through the model. That's not a coincidence. It's the strongest evidence we have that community-led investment in education, health, water, sanitation and income compounds over time.

99% of every donation goes directly to Tanzania. No one outside Tanzania draws a salary.

What would it take for your organization's impact data to look like this?`,
    cta: "Read more in our 2025 Annual Report",
    link: "karimufoundation.org [VERIFY: exact Annual Report URL]",
    hashtags: ["#ESG","#SocialImpact","#InternationalDevelopment","#Tanzania","#NonProfit"],
    visual: "Single image, 1200×627. Stepped bar chart of the three dropout percentages, ward names labeled, brand colors (ink/terracotta/orange).",
    assets: "ASSET NEEDED: this is a graphic to build, not footage to source — no matching folder in the shared drive (claude/10-photo-video-library.md). Check whether the 2025 Annual Report already has a chart to adapt before building new.",
    altText: "Bar chart showing declining school dropout rates across three Tanzanian wards at different stages of Karimu's model: Dabil 5.83%, Arri 3.34%, Ayalagaya 1.39%.",
    notes: "Figures are through the Jul-26 COO newsletter — state the date if this is reused later.",
  },
  {
    id: "p03",
    pillar: "Karimu Impact Stories",
    format: "Before/After",
    channels: ["Instagram", "Facebook"],
    title: "One Health Center, 300 Births a Month",
    funnelStage: "Trust",
    persona: "Compassionate Contributor",
    program: "Health — Dareda Kati Maternity Ward",
    copy: `What was once a two-room dispensary with no running water now delivers over 300 babies a month — including 30+ C-sections. 🩺

We built the Dareda Kati Maternity Ward to handle 50–60 births a month. Word spread. Families now travel hundreds of kilometers to give birth here, because it has become the best health center in the Manyara Region.

That's not a Karimu statistic. That's a community that built something so good, people crossed the region for it.

Asante Sana to everyone who made this possible.`,
    cta: "Follow for more stories like this",
    link: "n/a — Link in bio",
    hashtags: ["#Karimu","#Tanzania","#EndExtremePoverty","#CommunityLed","#Manyara","#ImpactStories","#GlobalHealth","#Asante","#MaternalHealth","#WomensHealth"],
    visual: "Before/After slide. Before: archival photo of the original 2-room dispensary. After: current maternity ward exterior or a delivery room. One result line ≤ 12 words: “50–60 births planned. 300+ delivered monthly.”",
    assets: "Drive > Ayalagaya Ward > Dispensaries and Health Center > Dareda Kati Health Center > Projects 2026 > DKH Expansion of Maternity Ward > Finished Project (after). Before: Ayalagaya Ward > Dareda Kati Health Center > Survey Dareda Kati Old Dispensary or the earliest \"20XX DK Dispensary in Operation\" folder. See claude/10-photo-video-library.md.",
    altText: "Before and after photos of the Dareda Kati Health Center maternity ward, now delivering more than 300 births a month including over 30 C-sections.",
    notes: "Headline-grade, brand-new this newsletter cycle — good candidate to cross-post to Facebook with a slightly longer version.",
    images: [
      { thumb: "images/p03-before-thumb.jpg", full: "images/p03-before-full.jpg", caption: "Before — the old Dareda Kati dispensary (2019 survey).", needsConfirmation: true },
      { thumb: "images/p03-after-thumb.jpg", full: "images/p03-after-full.jpg", caption: "After — the finished DKH Maternity Ward expansion (2026).", needsConfirmation: true },
    ],
  },
  {
    id: "p04",
    pillar: "Karimu Impact Stories",
    format: "Single Image",
    channels: ["Facebook"],
    title: "Small Business, Big Jump: +342% Median Income",
    funnelStage: "Trust",
    persona: "Compassionate Contributor, Community Builder",
    program: "Entrepreneurship",
    copy: `Twelve classes. 912 people. One year after graduating Karimu's entrepreneurship program, their median income is up 342%.

The program teaches the Street Business School curriculum — real business skills, not charity. Most graduating classes form a savings group during the course, so the discipline of saving starts immediately.

This quarter, 155 of 166 graduates qualified for a matching grant. For every $1 Karimu puts in, entrepreneurs are investing $4.60 of their own money.

That's the model: give people tools, not handouts, and they build the rest themselves.

Meet graduates like Matthew, one of hundreds of Tanzanian entrepreneurs turning training into a sustainable business.

Read more about the program on our website.`,
    cta: "Read more on our website",
    link: "karimufoundation.org [VERIFY: exact entrepreneurship program page URL]",
    hashtags: ["#Karimu","#Tanzania","#Entrepreneurship"],
    visual: "Single image or short photo set — a graduate (e.g. Matthew) at their business, text overlay “+342% median income, 1 year post-graduation.”",
    assets: "Drive > Projects > Business Training > Interviews with Entrepreneurs, Post-program Visits, and Graduation > 2026 Graduations (see claude/10-photo-video-library.md) — search these for Matthew specifically, or substitute a graduate who is actually pictured there and confirm consent.",
    altText: "A Tanzanian entrepreneur at their small business, with text overlay reading '+342% median income one year after graduating Karimu's entrepreneurship program.'",
    notes: "Do not state any individual's personal income figure — only the aggregate program statistic is confirmed. [VERIFY: total graduate headcount — 912 is participants, not graduates, per 07-impact-facts.md].",
    images: [
      { thumb: "images/p04-thumb.jpg", full: "images/p04-full.jpg", caption: "An entrepreneur from the drive's \"Interviews with Entrepreneurs\" folder — not confirmed to be Matthew. Swap for a photo of Matthew (or another graduate with signed consent) before publishing.", needsConfirmation: true },
    ],
  },
  {
    id: "p05",
    pillar: "Karimu Impact Stories",
    format: "Data Card",
    channels: ["Instagram"],
    title: "100% On Time, Every Time",
    funnelStage: "Trust",
    persona: "Compassionate Contributor, Global Citizen",
    program: "Financial Services",
    copy: `Since Karimu's Financial Services program began, savings groups have received $99,759 in zero-interest loans. The federation: $37,653 more.

The repayment rate? 100%. On time. Every time.

Across Tanzania, roughly 1 in 10 group loans go unpaid. Karimu's groups are proving a different model — one built on transparency, training and community accountability.

Ayalagaya's federation just hit a 98% assessment score. Arri's federation launches next quarter.

Follow to watch it grow.`,
    cta: "Follow to watch it grow",
    link: "n/a — Link in bio",
    hashtags: ["#Karimu","#Tanzania","#EndExtremePoverty","#CommunityLed","#Manyara","#FinancialInclusion","#ImpactStories","#Asante"],
    visual: "Data card, 3 stat rows: $99,759 (groups) · $37,653 (federation) · 100% (on-time repayment). Script payoff ≤ 10 words: “Trust, proven in numbers.”",
    assets: "Drive > Ayalagaya Ward > Savings Groups > Meeting with SG leaders / Savings Groups Success Stories, or Arri Ward > Savings Groups (Hapa Kazi Tu, Neema, Tumaini, Uhuru, Umoja, Usado). See claude/10-photo-video-library.md.",
    altText: "Data card: Karimu savings groups have received $99,759 in loans, the federation $37,653, with a 100% on-time repayment rate.",
    notes: "Figures as of July 2026 per the COO newsletter — restate the date if reused later.",
    images: [
      { thumb: "images/p05-thumb.jpg", full: "images/p05-full.jpg", caption: "Meeting with Ayalagaya savings group leaders (2022).", needsConfirmation: true },
    ],
  },
  {
    id: "p06",
    pillar: "Karimu Talks",
    format: "Long-form Video",
    channels: ["YouTube"],
    title: "Karimu Talks: Why We Surveyed Every Household in Dabil",
    funnelStage: "Trust",
    persona: "Global Citizen, Philanthropic Investor",
    program: "Dabil baseline survey",
    copy: `Why does a nonprofit spend two months going door-to-door before building anything? Lucy Justin Mhando, Karimu's Local Program Area Lead, explains why Dabil Ward's 3,673-household survey isn't extra paperwork — it's the proof that lets Karimu show funders exactly what changed, and why.

Subscribe for more conversations with the people building this work in Tanzania.

🔗 karimufoundation.org
📩 Subscribe to our newsletter: [link]
👍 Subscribe on YouTube for more Karimu Talks`,
    cta: "Subscribe on YouTube",
    link: "karimufoundation.org + newsletter signup link",
    hashtags: [],
    visual: "Face-forward interview, natural light. Thumbnail: Lucy's face, no text, high contrast, one clear subject.",
    assets: "ASSET NEEDED: no interview footage with Lucy Justin Mhando found in the shared drive's Key Influencers/Staff folders (checked claude/10-photo-video-library.md) — needs a new sit-down. Existing portrait/context photo may exist under Karimu Tanzania > Staff (search by name). B-roll: Drive > Dabil Ward > Projects 2026 > Dabil-Door to Door Survey.",
    altText: "n/a (video) — burned-in captions required throughout.",
    notes: "Confirm Lucy's availability and consent before scheduling; she is already a nameable public person per 07-impact-facts.md.",
    videoTitle: "Why We Survey Every Household Before We Build",
    shots: [
      { time: "0:00–0:15", onscreen: "“3,673 households. 2 months. Zero shortcuts.”", voiceover: "Hook: Lucy asks “How do you prove poverty is actually going away?”" },
      { time: "0:15–1:30", onscreen: "Lucy Justin Mhando, Local Program Area Lead", voiceover: "Interview: what the survey found, why it matters" },
      { time: "1:30–2:30", onscreen: "B-roll: surveyors walking, notebooks, households", voiceover: "Lucy describes the door-to-door process" },
      { time: "2:30–3:00", onscreen: "CTA card: Subscribe", voiceover: "“Subscribe to see what we build here next.”" },
    ],
  },
  {
    id: "p07",
    pillar: "Karimu Talks",
    format: "LinkedIn Post",
    channels: ["LinkedIn"],
    title: "The Case for Boring, Expensive Data Collection",
    funnelStage: "Trust",
    persona: "Philanthropic Investor, professionals",
    program: "Dabil baseline survey",
    copy: `Before Karimu builds anything in a new community, we survey every household.

In Dabil Ward: 20 surveyors, 2 months, 3,673 households, over 20,000 people, 3,361 km covered on foot.

It's slow. It's not glamorous. And it's the reason Karimu can say, with evidence, exactly how much of a community's progress comes from our model versus everything else.

That evidence is what opens doors with major foundations — because “we helped people” isn't a claim funders can verify. A before/after dataset is.

Full conversation with Lucy Justin Mhando, our Local Program Area Lead, is on YouTube now.

What would your organization's baseline data show?`,
    cta: "Watch the full conversation",
    link: "YouTube — Karimu Talks episode (P06)",
    hashtags: ["#InternationalDevelopment","#SocialImpact","#NonProfit","#DataForGood","#Tanzania"],
    visual: "Single image, 1200×627 — still frame from the interview, or a data-forward graphic of the survey stats.",
    assets: "Pulled from the Karimu Talks video asset (P06) once filmed.",
    altText: "Lucy Justin Mhando, Karimu's Local Program Area Lead, being interviewed about the Dabil Ward household survey.",
    notes: "Publish after the YouTube video is live; keep the Dabil scope “preliminary.”",
  },
  {
    id: "p08",
    pillar: "Karimu Transformed Volunteers",
    format: "Carousel",
    channels: ["Instagram", "Facebook"],
    title: "Four Families, One Hydraulic Arm",
    funnelStage: "Attract",
    persona: "Adventure Philanthropist",
    program: "Volunteer trips — Family Trip",
    copy: `This July, four families spent a week in Tanzania — harvesting maize, making bricks, cooking chapati, milking cows, and building a working hydraulic arm with Tanzanian students. 🛠️

One family has now come back three times.

Parents also spent time with local entrepreneurs, teachers, health workers and community leaders — learning what Karimu's work actually looks like, up close.

Radiologist Dr. Sharon Stein joined too, training Dareda Kati Health Center staff to use their ultrasound machine for more than pregnancy exams.

Spots are open for 2027. Link in bio.`,
    cta: "Link in bio (pre-registration form)",
    link: "n/a — Link in bio",
    hashtags: ["#Karimu","#Tanzania","#VolunteerTrip","#FamilyTravel","#CommunityLed","#Manyara","#Asante","#GivingBack","#TravelWithPurpose","#Karimu2027"],
    visual: "Photo carousel, 4:5 or 9:16 story version — kids building the hydraulic arm, family harvesting maize, group photo with community, Dr. Stein training staff.",
    assets: "ASSET NEEDED (locate, not shoot): the shared drive has no \"2026 Volunteers\" folder yet (checked claude/10-photo-video-library.md) — this footage likely sits in `_Uploads to be organized` or `Edu's Material` until filed. Check there first; if not found, ask the comms team directly.",
    altText: "Family Trip volunteers building a hydraulic arm with Tanzanian students, harvesting maize, and radiologist Dr. Sharon Stein training health center staff on ultrasound use.",
    notes: "2027 trip dates: Adult & Teen arrives Sun Jun 27, 2027; Family Trip arrives Thu Jul 15, 2027. [VERIFY: exact departure dates before publishing — the newsletter's printed departure weekdays don't match its printed dates; see 07-impact-facts.md.]",
  },
  {
    id: "p09",
    pillar: "Karimu Transformed Volunteers",
    format: "Short",
    channels: ["YouTube"],
    title: "A Radiologist Taught Us This About Our Own Ultrasound Machine",
    funnelStage: "Attract",
    persona: "Adventure Philanthropist, Global Citizen",
    program: "Volunteer trips / Health",
    copy: `Dr. Sharon Stein joined our July Family Trip and showed the Dareda Kati Health Center team new ways to use equipment they already had. Small trainings like this multiply what one piece of equipment can do for an entire ward.

Subscribe for more from the field.`,
    cta: "Subscribe",
    link: "n/a",
    hashtags: [],
    visual: "Vertical 9:16, burned-in captions, hook in first 2 seconds. Thumbnail: Dr. Stein's face, no text.",
    assets: "ASSET NEEDED (locate, not shoot): same July 2026 trip gap as P08 — check `_Uploads to be organized` / `Edu's Material` first (see claude/10-photo-video-library.md); no dedicated 2026 folder exists yet.",
    altText: "n/a (video) — burned-in captions required.",
    notes: "Confirm Dr. Stein's consent to be featured (already public per 07-impact-facts.md named-people list).",
    videoTitle: "What This Ultrasound Machine Can Really Do",
    shots: [
      { time: "0:00–0:02", onscreen: "“One machine. New uses.”", voiceover: "Hook line" },
      { time: "0:02–0:20", onscreen: "Dr. Stein training staff, close-up on ultrasound screen", voiceover: "Dr. Stein explains the new use case" },
      { time: "0:20–0:35", onscreen: "Staff practicing", voiceover: "Health worker reaction" },
      { time: "0:35–0:45", onscreen: "CTA card", voiceover: "“Subscribe for more from Dareda Kati.”" },
    ],
  },
  {
    id: "p10",
    pillar: "Shorts & Reels",
    format: "Reel",
    channels: ["Instagram"],
    title: "From This, To This",
    funnelStage: "Attract",
    persona: "Global Citizen",
    program: "Water & sanitation — Arri school bathrooms",
    copy: `Five schools. Five sets of bathrooms nobody has to be ashamed of. 🚻

Endasago, Arri, Sharmo and Dohom Secondary all got new or rebuilt bathrooms this year — squat and western toilets, real showers, handwashing stations that work.

One school down, one near completion, then three more in the fundraising queue.

Comment and share — we need your engagement to keep this going!`,
    cta: "Comment and share (standing video CTA)",
    link: "n/a",
    hashtags: ["#Karimu","#Tanzania","#WaterIsLife","#CommunityLed","#Manyara","#WorldToiletDay","#SchoolSanitation","#Asante"],
    visual: "9:16 Reel, quick cuts of before/after at each school, burned-in captions, ends on a CTA card.",
    assets: "Drive > Arri Ward > Schools, cross-referenced with Projects by year (see claude/10-photo-video-library.md): Endasago Primary bathrooms (Projects 2026: Before/Construction/Finished Project), Sharmo Primary Bathrooms (Projects 2024: Before/Construction/Finished), Dohom Secondary Bathrooms (Projects 2024: Before/Construction/Finished), Arri Primary School Bathroom (Projects 2025: Old Arri Primary Bathrooms/Construction/Finished Project).",
    altText: "Before and after photos of newly built or renovated school bathrooms at schools in Arri Ward.",
    notes: "Tsaayo Primary is still near completion — don't list it among the “done” schools yet. Remaining after that: Dohom, Dudiye, Jangwani (fundraising ongoing).",
    images: [
      { thumb: "images/p10-before-thumb.jpg", full: "images/p10-before-full.jpg", caption: "Before — old Endasago Primary bathrooms.", needsConfirmation: true },
      { thumb: "images/p10-after-thumb.jpg", full: "images/p10-after-full.jpg", caption: "After — finished Endasago Primary bathrooms (2026).", needsConfirmation: true },
    ],
  },
  {
    id: "p11",
    pillar: "Shorts & Reels",
    format: "Short",
    channels: ["YouTube"],
    title: "We Relaunched the Chicken Project — Here's Why",
    funnelStage: "Attract",
    persona: "Global Citizen",
    program: "Income — Chickens",
    copy: `Karimu's Chicken Project is back, redesigned to focus only on egg production. To join now, farmers need to have completed entrepreneurship training and belong to a savings group — because business skills, savings discipline and chickens work better together than any one alone.

Four new groups joined this quarter. A new one starts about every 3 weeks.

Subscribe to follow the next graduating group.`,
    cta: "Subscribe",
    link: "n/a",
    hashtags: [],
    visual: "Vertical 9:16, faces, real farm setting. Thumbnail: farmer's face with chickens, no text.",
    assets: "Drive > Projects 2025 > Chicken Expansion (also Projects 2024 > Chicken; Community > Entrepreneurs > Francis Chicken Farm for a proven livelihood-story angle). See claude/10-photo-video-library.md.",
    altText: "n/a (video) — burned-in captions required.",
    notes: "Keep the focus on egg production only, per the 2026 relaunch — don't reference the old, broader chicken model.",
    images: [
      { thumb: "images/p11-thumb.jpg", full: "images/p11-full.jpg", caption: "Dohom farmers receiving chicks under the 2026 Chicken Expansion.", needsConfirmation: true },
    ],
    videoTitle: "Why Chickens Need a Business Plan First",
    shots: [
      { time: "0:00–0:02", onscreen: "“Chickens ≠ charity.”", voiceover: "Hook" },
      { time: "0:02–0:20", onscreen: "Farmers receiving chicks (Dohom)", voiceover: "VO explains egg-only focus + entry requirements" },
      { time: "0:20–0:35", onscreen: "Farmer collecting eggs", voiceover: "Result / income context" },
      { time: "0:35–0:45", onscreen: "CTA card", voiceover: "Subscribe" },
    ],
  },
  {
    id: "p12",
    pillar: "Institutional & Special Dates",
    format: "LinkedIn Post",
    channels: ["LinkedIn"],
    title: "99 Cents of Every Dollar",
    funnelStage: "Trust",
    persona: "Philanthropic Investor, corporate evangelists",
    program: "Organisation & efficiency",
    copy: `99% of every dollar donated to Karimu goes directly to Tanzania — funding projects and Tanzanian staff salaries. The average NGO spends 20–35% on administration and overhead.

No one outside Tanzania draws a salary. Outside Tanzania, Karimu runs entirely on volunteers.

That's not an accident — it's a structural choice. Karimu (US) fundraises and sets strategy; our Tanzanian sister organization, KAHESO, executes on the ground, with a 10-person team representing 6 tribes and a 50/50 gender balance.

Candid/GuideStar has recognized this with a Platinum Seal of Transparency.

If you're evaluating where your organization's giving or matching-gift dollars go furthest, this is the kind of structure worth asking every nonprofit about.

What does your organization's overhead ratio look like?`,
    cta: "See our full financials in the 2025 Annual Report",
    link: "karimufoundation.org [VERIFY: exact Annual Report URL]",
    hashtags: ["#ESG","#Philanthropy","#NonProfit","#CorporateGiving","#Tanzania"],
    visual: "Single image — Platinum Seal badge + “99%” as a large numeral, brand colors.",
    assets: "Drive top level: `candid-seal-platinum-instagram-2025.instagram.png` (also a 2026 version, `candid-seal-platinum-2026.png`) — exact badge asset already exists (see claude/10-photo-video-library.md).",
    altText: "Graphic stating 99% of Karimu donations go directly to Tanzania, alongside the Candid GuideStar Platinum Seal of Transparency.",
    notes: "⚠ New/repeated efficiency percentages are on the guardrails escalation list — confirm with finance/Nelson before publishing, even though 99% is Annual-Report-sourced. Badge PNG exists in the drive but wasn't embeddable in this app build — pull it directly when designing the final graphic.",
  },
  {
    id: "p13",
    pillar: "Institutional & Special Dates",
    format: "Single Image",
    channels: ["Instagram", "Facebook"],
    title: "Come See This for Yourself",
    funnelStage: "Attract",
    persona: "Adventure Philanthropist",
    program: "Volunteer trips — 2027 registration",
    copy: `Spots are open for our 2027 Tanzania trips. 🌍

Adult & Teen Volunteer Trip: arrives June 27, 2027
Family Volunteer Trip: arrives July 15, 2027

Past travelers have harvested maize, built with local students, met entrepreneurs and teachers, and — for one family — come back three times.

This isn't a tour. It's a week or two working alongside a community that's already rewriting its own future.

Pre-registration is open now. Link in bio for dates and details.`,
    cta: "Link in bio",
    link: "n/a — Link in bio",
    hashtags: ["#Karimu","#Tanzania","#VolunteerTrip","#TravelWithPurpose","#Manyara","#GivingBack","#Karimu2027","#FamilyTravel"],
    visual: "Photo of a past trip (group with community), banner “2027 Trips — Spots Open.”",
    assets: "2027 trip hasn't happened yet, so use representative past-trip photos: Drive > Ceremonies/Volunteers > 2025 Welcome/Farewell > 2025 July Adult Trip and 2025 July Family Trip (see claude/10-photo-video-library.md). The actual July 2026 trip photos aren't filed in the drive yet — see P08's note.",
    altText: "Karimu volunteer trip participants with Tanzanian community members, with text announcing 2027 trip registration is open.",
    notes: "Exact departure dates withheld pending confirmation — see [VERIFY] in 07-impact-facts.md. Direct specific questions to marianne.kentstoll@karimufoundation.org rather than stating departure dates.",
    images: [
      { thumb: "images/p13-thumb.jpg", full: "images/p13-full.jpg", caption: "2025 July Family Trip — welcome ceremony (representative past-trip photo, not the 2027 trip itself).", needsConfirmation: true },
    ],
  },
  {
    id: "p14",
    pillar: "Newsletter & Channel Push",
    format: "Single Image",
    channels: ["Instagram"],
    title: "This Month's Newsletter: The Hard Numbers and the Hopeful Ones",
    funnelStage: "Act",
    persona: "Compassionate Contributor, Global Citizen",
    program: "Newsletter push",
    copy: `Our newsletter goes out this week. Inside: the first results from our Dabil household survey, a maternity ward now delivering 300+ births a month, and an honest update on where our 2026 fundraising stands.

Nelson (our COO) writes it straight — the hard parts and the hopeful parts, together.

Subscribe so you don't miss it. Link in bio.`,
    cta: "Subscribe (link in bio)",
    link: "n/a — Link in bio",
    hashtags: ["#Karimu","#Tanzania","#Newsletter","#CommunityLed","#Asante"],
    visual: "Single image, kraft-style envelope/newsletter graphic, banner “New Newsletter This Week.”",
    assets: "ASSET NEEDED: newsletter cover graphic.",
    altText: "Announcement graphic for Karimu's newsletter, covering the Dabil Ward survey, maternity ward results and 2026 fundraising update.",
    notes: "Publish 2–3 days before the newsletter send date — confirm the exact date with Nelson.",
  },
  {
    id: "p15",
    pillar: "Newsletter & Channel Push",
    format: "WhatsApp Message",
    channels: ["WhatsApp"],
    title: "Newsletter Teaser (WhatsApp)",
    funnelStage: "Act",
    persona: "Compassionate Contributor",
    program: "Newsletter push",
    copy: `📬 New newsletter this week: Dabil's first survey results, 300+ births a month at our maternity ward, and an honest look at 2026 fundraising. Reply if you want the highlights first.`,
    cta: "Reply / stay tuned",
    link: "n/a",
    hashtags: [],
    visual: "One photo (maternity ward or survey team).",
    assets: "Reuse from P01 or P03.",
    altText: "n/a — WhatsApp broadcast.",
    notes: "Send timed just before Nelson's newsletter goes out.",
  },
  {
    id: "p16",
    pillar: "Fundraising Support",
    format: "Data Card",
    channels: ["Instagram"],
    title: "[DRAFT — REQUIRES SIGN-OFF] Dabil Needs Water, and We're $260K Behind",
    funnelStage: "Act",
    persona: "Compassionate Contributor",
    program: "Fundraising — Dabil water project",
    copy: `We're $260,000 behind our 2026 fundraising goal — and it's already delayed the Dabil water project to 2027.

Families in Dabil walk to fetch water. In Arri and Ayalagaya, that's already history: over 35,000 people have clean water within 500 meters of home.

$300,000 funds phase 1 — the intakes. We have 3 engineering proposals in hand and a model that's already worked twice.

Karimu partners with these communities. This is what your partnership makes possible next.`,
    cta: "Donate",
    link: "[Donate link]",
    hashtags: ["#Karimu","#Tanzania","#WaterIsLife","#Dabil","#CommunityLed"],
    visual: "Data card — $260,000 behind · $300,000 phase 1 target · 35,000+ already served (Arri+Ayalagaya).",
    assets: "Drive > Dabil Ward > Water before Karimu Intervention, or Water Management > Fetching Water before Karimu Intervention (see claude/10-photo-video-library.md) — pick a shot that shows agency, not spectacle, per the dignity guardrail.",
    altText: "Graphic showing Karimu is $260,000 behind its 2026 fundraising goal, with $300,000 needed to fund phase 1 of the Dabil water project.",
    notes: "⚠ Fundraising Support is “on request only — never the default” per 05-content-pillars.md. Do NOT publish without explicit go-ahead from Nelson/Marianne. Included here only as a ready draft in case that request comes.",
    flagged: true,
  },
  {
    id: "p17",
    pillar: "Karimu Impact Stories",
    format: "Single Image",
    channels: ["Instagram"],
    title: "4,242 Farmers, One Cycle",
    funnelStage: "Trust",
    persona: "Compassionate Contributor, Global Citizen",
    program: "Income — Biochar",
    copy: `2,244 farmers are harvesting their biochar crop right now. Next cycle, that grows to 4,242 — 1,050 in Dabil, 1,400 in Ayalagaya, 1,792 in Arri.

Dabil's number just grew, too — from 720 to 1,050, based on what our household survey found about the community's needs.

Biochar improves soil health for smallholder farmers who make up most of Tanzania's rural economy.

Follow along as the harvest data comes in.`,
    cta: "Follow along",
    link: "n/a — Link in bio",
    hashtags: ["#Karimu","#Tanzania","#Biochar","#Agriculture","#CommunityLed","#Manyara","#Sustainability","#Asante"],
    visual: "Photo of a farmer with biochar/crop, data callout “4,242 farmers, 2026/27.”",
    assets: "Drive > Projects 2025 > Biochar Expansion (also Projects 2024 > Biochar for prior-cycle comparison shots). See claude/10-photo-video-library.md.",
    altText: "A Tanzanian farmer in a biochar-treated field, with text noting the program is expanding to 4,242 farmers for the 2026/27 cycle.",
    notes: "None.",
    images: [
      { thumb: "images/p17-thumb.jpg", full: "images/p17-full.jpg", caption: "Arri farmers harvesting tomatoes grown with biochar.", needsConfirmation: true },
    ],
  },
  {
    id: "p18",
    pillar: "Karimu Impact Stories",
    format: "Carousel",
    channels: ["Facebook"],
    title: "They Chose to Make Bags",
    funnelStage: "Trust",
    persona: "Compassionate Contributor",
    program: "Education — disability inclusion",
    copy: `Karimu just finished a new playground for children with disabilities at Dareda Kati Primary — hopscotch, a seesaw, a circle walk, a balance beam. The kids are having fun and building real physical skills at the same time.

A donor committed to opportunities for children with disabilities is now funding something bigger: skills training. The first project teaches sewing, taught by local community volunteers. The students chose what to make — school bags, for other students to carry their books in.

The goal isn't just play. It's a path to a job or self-sufficiency.

See more photos and the full story on our website.`,
    cta: "See more on our website",
    link: "karimufoundation.org [VERIFY: exact story page URL]",
    hashtags: ["#Karimu","#Tanzania","#DisabilityInclusion"],
    visual: "Photo carousel — playground in use, students sewing, finished bags.",
    assets: "Drive > Projects 2026 > Playground for Disabled Children (Construction/Finished Project/Project in Use) and Karimu Threads of Hope (the sewing/skills project). Also: Ayalagaya Ward > Dareda Kati Primary > DK Disabled Kids. See claude/10-photo-video-library.md.",
    altText: "Children with disabilities playing on a new playground at Dareda Kati Primary, and students sewing school bags as part of a new skills-training program.",
    notes: "Confirm no child is identified by full name + school + location together, per guardrails.",
    images: [
      { thumb: "images/p18a-thumb.jpg", full: "images/p18a-full.jpg", caption: "The finished playground for children with disabilities at Dareda Kati Primary.", needsConfirmation: true },
      { thumb: "images/p18b-thumb.jpg", full: "images/p18b-full.jpg", caption: "The playground in use.", needsConfirmation: true },
    ],
  },
  {
    id: "p19",
    pillar: "Karimu Impact Stories",
    format: "WhatsApp Message",
    channels: ["WhatsApp"],
    title: "Arri Water Maintenance Milestone (WhatsApp)",
    funnelStage: "Trust",
    persona: "Compassionate Contributor",
    program: "Water & sanitation",
    copy: `💧 Quick update: Arri's water system now gets fixed in under 30 days — our goal — and communities are finding up to 89% of their own problems before we do. The system is starting to run itself.`,
    cta: "n/a (informational broadcast)",
    link: "n/a",
    hashtags: [],
    visual: "One photo — Arri water point or Water Committee member.",
    assets: "Drive > Water Management > Water Maintenance (also Arri Water Outages for contrast). See claude/10-photo-video-library.md.",
    altText: "n/a — WhatsApp broadcast.",
    notes: "None.",
    images: [
      { thumb: "images/p19-thumb.jpg", full: "images/p19-full.jpg", caption: "Karimu's meeting with the Dareda Kati water committee.", needsConfirmation: true },
    ],
  },
  {
    id: "p20",
    pillar: "Institutional & Special Dates",
    format: "LinkedIn Post",
    channels: ["LinkedIn"],
    title: "What a Government Partnership Actually Looks Like",
    funnelStage: "Trust",
    persona: "Philanthropic Investor, corporate evangelists",
    program: "Education — Tsaayo Primary",
    copy: `Karimu just finished new classrooms and a kindergarten area at Tsaayo Primary School — funded through a matched $30,000 grant and built in partnership with the local government.

That partnership mattered: it let Karimu deliver higher-quality facilities at a fraction of the typical cost, which is why this project moved ahead of some bathroom construction on our list.

We're applying the same model to two more Arri secondary schools before the end of the year, anticipating a jump in secondary enrollment when Tanzania eliminates its end-of-primary exam in 2028.

Community-led doesn't mean going it alone — it means finding the right partners, public and private, and stacking their strengths.

Where has a public-private partnership outperformed what either side could do alone?`,
    cta: "Learn more about our education programs",
    link: "karimufoundation.org [VERIFY: exact education programs page URL]",
    hashtags: ["#ESG","#InternationalDevelopment","#Education","#Tanzania","#NonProfit"],
    visual: "Single image — new classroom/kindergarten space at Tsaayo Primary.",
    assets: "Drive > Projects 2026 > Tsaayo Primary Classrooms (Construction, Old Tsaayo Primary Classrooms) — also Tsaayo Primary Bathrooms if a wider facilities shot is wanted. See claude/10-photo-video-library.md.",
    altText: "New classroom and kindergarten space at Tsaayo Primary School, built through a matched government partnership grant.",
    notes: "None.",
    images: [
      { thumb: "images/p20-thumb.jpg", full: "images/p20-full.jpg", caption: "The new classrooms at Tsaayo Primary School, front view (Aug 2026).", needsConfirmation: true },
    ],
  },
];

const PILLAR_ORDER = [
  "Karimu Impact Stories",
  "Karimu Talks",
  "Karimu Transformed Volunteers",
  "Shorts & Reels",
  "Institutional & Special Dates",
  "Newsletter & Channel Push",
  "Fundraising Support",
];
