/**
 * Destination registry (spec: /hub — the CN2.DEV universe, IA v5).
 *
 * Single source of truth for the hub journey. Every destination gets one
 * full-screen section: a short human-readable introduction, one prominent
 * action, a set of real sub-destinations, and a visual identity. There are no
 * counts or statistics here by design — the hub is an introduction, never a
 * dashboard. Content and measurements belong to the destination page itself,
 * where they can be explained properly.
 *
 * Eight primary destinations, grouped into three bands:
 *   ENGINEERING              → Builds · Laboratory · Research & Journal
 *   PROFESSIONAL CAPABILITIES → Services · Education & Credentials
 *   ENGAGEMENT               → Careers & Collaboration · About · Contact
 *
 * Every `href` is an existing route, verified in `app/`. No section is
 * decorative: each one opens its destination, and every child card opens a
 * real sub-page of it.
 */

export type HubGroupId = "engineering" | "capabilities" | "engagement";

export interface HubGroup {
  id: HubGroupId;
  /** Display label for the group band and the hub index. */
  label: string;
  /** One line describing what the group covers. */
  description: string;
  /** The destination codes in this group, in journey order. */
  codes: string[];
}

export interface HubChild {
  /** Card title. */
  label: string;
  /** Real route — or a real channel for the contact destination. */
  href: string;
  /** One line saying what the visitor finds there. */
  note: string;
}

/**
 * One primary destination.
 */
export interface HubDestination {
  /** Stable journey key — also the section's anchor code. */
  code: string;
  /** Display title. */
  label: string;
  /** The group band this destination sits in. */
  group: HubGroupId;
  /** The real destination route. */
  href: string;
  /** One short invitation into the destination. */
  blurb: string;
  /** One line used on the hub index card. */
  summary: string;
  /** The action label — what the visitor taps to enter. */
  action: string;
  /** Short identity word for the visual's caption. */
  caption: string;
  /** Who this destination is written for. */
  audience: string;
  /** The destination's own sub-destinations — real routes only. */
  children: HubChild[];
  /** True when the visual contains real, working links. */
  interactive?: boolean;
}

/**
 * Journey order (IA v5, owner-approved): BUILDS → LABORATORY → RESEARCH &
 * JOURNAL → SERVICES → EDUCATION & CREDENTIALS → CAREERS & COLLABORATION →
 * ABOUT → CONTACT. Codes are positional (01–08 in array order); each
 * destination keeps its own visual and ambient wherever it sits in the
 * journey.
 */
export const hubDestinations: HubDestination[] = [
  {
    code: "01",
    label: "BUILDS",
    group: "engineering",
    href: "/works",
    blurb:
      "Products, engineering projects and independent builds — every system documented from the original problem through architecture and implementation to verifiable evidence.",
    summary:
      "Products, projects and independent builds, each with its own architecture, evidence and status.",
    action: "ENTER BUILDS",
    caption: "PLATFORMS & SYSTEMS",
    audience: "TECHNICAL VISITORS · RECRUITERS",
    children: [
      {
        label: "PRODUCTS",
        href: "/works/products",
        note: "Commercial and platform systems built for real deployment.",
      },
      {
        label: "PROJECTS",
        href: "/works/projects",
        note: "Standalone engineering and quantitative work.",
      },
      {
        label: "INDEPENDENT BUILDS",
        href: "/works/personal-builds",
        note: "Self-initiated tools, AI agents and prototypes.",
      },
      {
        label: "CASE STUDIES",
        href: "/case-studies",
        note: "Deep reads on the flagship systems.",
      },
      {
        label: "PROOF",
        href: "/proof",
        note: "Public evidence and repository status.",
      },
    ],
  },
  {
    code: "02",
    label: "LABORATORY",
    group: "engineering",
    href: "/lab",
    blurb:
      "Working instruments rather than descriptions of them — risk arithmetic, point-in-time replay and strategy geometry you can operate directly.",
    summary:
      "Experiments, prototypes and quantitative instruments you can run yourself.",
    action: "ENTER LABORATORY",
    caption: "EXPERIMENTAL INSTRUMENTS",
    audience: "TECHNICAL VISITORS · RESEARCHERS",
    children: [
      {
        label: "EXPERIMENTS",
        href: "/lab/experiments",
        note: "The experiment explorer and running notes.",
      },
      {
        label: "RISK SIMULATOR",
        href: "/lab/risk",
        note: "Position sizing and risk arithmetic under cost.",
      },
      {
        label: "POINT-IN-TIME REPLAY",
        href: "/lab/market-replay",
        note: "See exactly what was knowable at time t.",
      },
      {
        label: "STRATEGY VISUALIZER",
        href: "/lab/strategy",
        note: "R:R geometry and trade-distribution shapes.",
      },
    ],
  },
  {
    code: "03",
    label: "RESEARCH & JOURNAL",
    group: "engineering",
    href: "/research",
    blurb:
      "Technical research, quantitative and market investigation, published articles and field notes — each carrying its method, evidence and stated limits.",
    summary:
      "Studies, articles and field notes — the evidence chain behind the builds.",
    action: "ENTER RESEARCH",
    caption: "EVIDENCE CHAIN",
    audience: "TECHNICAL VISITORS · CLIENTS",
    children: [
      {
        label: "RESEARCH ENTRIES",
        href: "/research",
        note: "Question, hypothesis, method, evidence, limitation.",
      },
      {
        label: "ARTICLES",
        href: "/articles",
        note: "Published technical writing and analyses.",
      },
      {
        label: "INTELLIGENCE",
        href: "/intelligence",
        note: "Field notes, mental models and decision systems.",
      },
    ],
  },
  {
    code: "04",
    label: "SERVICES",
    group: "capabilities",
    href: "/services",
    blurb:
      "What an engagement actually produces — software and systems engineering, backend and API work, data infrastructure, AI-assisted automation and quantitative systems.",
    summary:
      "The deliverable engagements, their scope boundaries and what you receive.",
    action: "EXPLORE SERVICES",
    caption: "DELIVERY FLOW",
    audience: "CLIENTS",
    children: [
      {
        label: "QUANTITATIVE RESEARCH",
        href: "/services/quantitative-research-prototypes",
        note: "Research prototypes and testable strategy studies.",
      },
      {
        label: "MARKET DATA",
        href: "/services/market-data-infrastructure",
        note: "Market-data infrastructure and replayable feeds.",
      },
      {
        label: "TRADING SYSTEMS",
        href: "/services/systematic-trading-systems",
        note: "Systematic trading systems and execution logic.",
      },
      {
        label: "BACKTESTING",
        href: "/services/deterministic-backtesting",
        note: "Deterministic backtesting with reproducible runs.",
      },
      {
        label: "RISK ENGINEERING",
        href: "/services/risk-engineering",
        note: "Risk models, sizing and exposure boundaries.",
      },
      {
        label: "DATA PIPELINES",
        href: "/services/data-pipeline-engineering",
        note: "Data pipeline engineering and integrity checks.",
      },
      {
        label: "PERFORMANCE",
        href: "/services/performance-engineering",
        note: "Latency, throughput and profiling work.",
      },
      {
        label: "AI-ASSISTED TOOLING",
        href: "/services/ai-assisted-research-tooling",
        note: "AI-assisted research tooling and automation.",
      },
    ],
  },
  {
    code: "05",
    label: "EDUCATION & CREDENTIALS",
    group: "capabilities",
    href: "/credentials",
    blurb:
      "Formal education, issued certifications and self-directed coursework — each record carrying its provider, its state and where it can be checked.",
    summary:
      "Formal education, verified certifications and active self-directed study.",
    action: "EXPLORE CREDENTIALS",
    caption: "LEARNING STRATA",
    audience: "RECRUITERS · CLIENTS",
    children: [
      {
        label: "EDUCATION & DEVELOPMENT",
        href: "/credentials#timeline",
        note: "Degrees, programmes and the path taken.",
      },
      {
        label: "VERIFIED CREDENTIALS",
        href: "/credentials#badges",
        note: "Issued certificates and what each one covers.",
      },
      {
        label: "WHAT EACH STATE MEANS",
        href: "/credentials#states",
        note: "How completed, verified and in-progress differ.",
      },
      {
        label: "SELF-DIRECTED STUDY",
        href: "/credentials#study",
        note: "Coursework currently in progress.",
      },
    ],
  },
  {
    code: "06",
    label: "CAREERS & COLLABORATION",
    group: "engagement",
    href: "/opportunities",
    blurb:
      "Employment, freelance engagements, open collaboration and partnerships — the places where my work and your problem meet.",
    summary:
      "Roles, freelance work, joint experiments and partnerships.",
    action: "EXPLORE COLLABORATION",
    caption: "PATHWAYS",
    audience: "RECRUITERS · PARTNERS",
    children: [
      {
        label: "CAREER",
        href: "/opportunities/career",
        note: "The role I am aiming for and the work behind it.",
      },
      {
        label: "FREELANCE",
        href: "/opportunities/freelance",
        note: "Project engagements and how they are scoped.",
      },
      {
        label: "COLLABORATE",
        href: "/opportunities/collaborate",
        note: "Joint experiments and open research.",
      },
      {
        label: "PARTNERSHIPS",
        href: "/opportunities/partnerships",
        note: "Technical and product partnerships.",
      },
    ],
  },
  {
    code: "07",
    label: "ABOUT",
    group: "engagement",
    href: "/about",
    blurb:
      "The person behind CN2.DEV — identity, capabilities, engineering philosophy, working principles, current direction and the vision behind it.",
    summary:
      "Identity, capabilities, principles and the direction the work is heading.",
    action: "GET TO KNOW ME",
    caption: "HORIZON",
    audience: "EVERYONE",
    children: [
      {
        label: "IDENTITY",
        href: "/about#identity",
        note: "Who this is and what I am building toward.",
      },
      {
        label: "CAPABILITIES",
        href: "/about#capabilities",
        note: "The technical surface of what I can do.",
      },
      {
        label: "PRINCIPLES",
        href: "/about#principles",
        note: "The rules I hold the work to.",
      },
      {
        label: "VISION",
        href: "/about#vision",
        note: "Where this is all going.",
      },
      {
        label: "CAPABILITY MAP",
        href: "/about#capability-map",
        note: "Capability, evidence and project, side by side.",
      },
      {
        label: "HOW I WORK",
        href: "/how-i-work",
        note: "The delivery process, step by step.",
      },
    ],
  },
  {
    code: "08",
    label: "CONTACT",
    group: "engagement",
    href: "/contact",
    blurb:
      "Direct channels — email, GitHub, LinkedIn and a project enquiry form. Tell me the problem and I will tell you honestly whether I am the right engineer for it.",
    summary:
      "Email, GitHub, LinkedIn and the project enquiry form.",
    action: "GET IN TOUCH",
    caption: "CHANNELS",
    audience: "CLIENTS · RECRUITERS",
    interactive: true,
    children: [
      {
        label: "EMAIL",
        href: "mailto:bukyanaresh2003@gmail.com",
        note: "Direct, for anything specific.",
      },
      {
        label: "GITHUB",
        href: "https://github.com/naresh-cn2",
        note: "Every public repository and its history.",
      },
      {
        label: "LINKEDIN",
        href: "https://www.linkedin.com/in/bukya-naresh-cn2",
        note: "Professional profile and history.",
      },
      {
        label: "PROJECT ENQUIRY",
        href: "/contact",
        note: "A structured brief that gets a real answer.",
      },
    ],
  },
];

/**
 * The three bands the eight destinations are grouped into. The order matches
 * the journey order, so the index, the group dividers and the full-screen
 * sections all read the same way.
 */
export const hubGroups: HubGroup[] = [
  {
    id: "engineering",
    label: "ENGINEERING",
    description:
      "What I build, what I test it with, and what the evidence turned out to say.",
    codes: ["01", "02", "03"],
  },
  {
    id: "capabilities",
    label: "PROFESSIONAL CAPABILITIES",
    description:
      "What I can deliver for you, and the verified record that stands behind the offer.",
    codes: ["04", "05"],
  },
  {
    id: "engagement",
    label: "ENGAGEMENT",
    description:
      "How to work with me, who I am, and the fastest way to reach me.",
    codes: ["06", "07", "08"],
  },
];

/**
 * Secondary destinations the hub index carries below the journey.
 * P1-A: PROOF and CV lead the row — evidence and professional record sit
 * directly under the journey instead of being buried mid-row.
 */
export const hubIndex: { label: string; href: string }[] = [
  { label: "PROOF", href: "/proof" },
  { label: "CV", href: "/cv" },
  { label: "CASE STUDIES", href: "/case-studies" },
  { label: "CAPABILITIES", href: "/about#capability-map" },
  { label: "ARTICLES", href: "/articles" },
  { label: "INTELLIGENCE", href: "/intelligence" },
  { label: "IDENTITY", href: "/identity" },
  { label: "LINKS", href: "/links" },
  { label: "TESTIMONIALS", href: "/testimonials" },
];
