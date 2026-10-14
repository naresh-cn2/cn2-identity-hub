/* Structured content for the /about editorial experience.
   Rules: every route referenced here exists in the app; every status is an
   honest label distinguishing demonstrated work from directions still in
   development; nothing here is a claim the evidence pages cannot support. */

export interface MindsetNode {
  id: string;
  label: string;
  line: string;
  body: string;
}

export const mindset = {
  center: "THE PROBLEM",
  nodes: [
    {
      id: "understand",
      label: "UNDERSTAND",
      line: "Ask what the actual problem is before reaching for a tool.",
      body: "What causes it? Which variables matter? What information exists? What assumptions are being made, and what could fail?",
    },
    {
      id: "model",
      label: "MODEL",
      line: "Translate the structure into a form that can be reasoned about.",
      body: "A hypothesis, a mathematical shape, a data flow, a decision map — with its assumptions made explicit and testable.",
    },
    {
      id: "build",
      label: "BUILD",
      line: "Implement the representation in software.",
      body: "Simple where simple is enough, structured where the problem demands it — with clear interfaces, failure handling, and reproducible execution.",
    },
    {
      id: "verify",
      label: "VERIFY",
      line: "Test the behavior. Challenge the assumptions. Examine the evidence.",
      body: "Assumptions stay assumptions until they are examined. A result carries its limitations, costs, and conditions — or it is not yet a result.",
    },
    {
      id: "improve",
      label: "IMPROVE",
      line: "Feed the findings back into the system.",
      body: "An honest failure still reveals what to investigate next. Systems improve when evidence — not preference — drives the revision.",
    },
  ] as MindsetNode[],
};

export type CapStatus = "DEMONSTRATED" | "IN ACTIVE DEVELOPMENT" | "RESEARCH DIRECTION";

export interface Capability {
  id: string;
  label: string;
  title: string;
  purpose: string;
  problems: string[];
  status: CapStatus;
  work?: string;
  evidence: { label: string; href: string }[];
}

export const capabilities: Capability[] = [
  {
    id: "quant-finance",
    label: "QUANTITATIVE FINANCE",
    title: "Quantitative Finance & Research",
    purpose:
      "Mathematical and data-driven investigation of financial questions — strategies, risk, and the evidence behind them.",
    problems: [
      "Strategy hypotheses and how to test them honestly",
      "Backtesting, simulation, and the limits of historical results",
      "Risk, drawdown, and performance measurement",
    ],
    status: "RESEARCH DIRECTION",
    evidence: [{ label: "READ THE RESEARCH", href: "/research" }],
  },
  {
    id: "algo-trading",
    label: "ALGORITHMIC TRADING",
    title: "Algorithmic Trading & Market Systems",
    purpose:
      "Research into automated market analysis, systematic strategies, execution, and the risk controls required to operate them.",
    problems: [
      "The full lifecycle: data → signal → sizing → execution → feedback",
      "Why a convincing backtest can still fail in live markets",
      "Automation does not create an edge — validation does",
    ],
    status: "DEMONSTRATED",
    work: "Apex Quant Engine · Automated Trading OS",
    evidence: [{ label: "OPEN THE WORK", href: "/work" }],
  },
  {
    id: "ai-agents",
    label: "AI & AGENTIC SYSTEMS",
    title: "AI & Agentic Systems",
    purpose:
      "Using AI, tools, and orchestrated workflows to automate appropriate tasks — with humans defining objectives, constraints, and acceptance.",
    problems: [
      "Tool-using agents, context management, and controlled execution",
      "Where AI multiplies useful work — and where it fabricates",
      "Verification boundaries and human approval points",
    ],
    status: "IN ACTIVE DEVELOPMENT",
    evidence: [{ label: "VISIT THE LAB", href: "/lab" }],
  },
  {
    id: "software-eng",
    label: "SOFTWARE ENGINEERING",
    title: "Software Engineering",
    purpose:
      "Turning ideas into functioning software through programming, design, testing, and debugging.",
    problems: [
      "Architecture, APIs, and system integration",
      "Reliability, performance, and operational constraints",
      "Knowing when a simpler solution is the better one",
    ],
    status: "DEMONSTRATED",
    evidence: [{ label: "OPEN THE WORK", href: "/work" }],
  },
  {
    id: "data-infra",
    label: "DATA INFRASTRUCTURE",
    title: "Data Infrastructure",
    purpose:
      "Building reliable processes for collecting, validating, processing, and analyzing information.",
    problems: [
      "Ingestion, validation, and point-in-time correctness",
      "Time-series stores and deterministic replay",
      "How incorrect data silently invalidates good analysis",
    ],
    status: "DEMONSTRATED",
    work: "Quantitative Market Data Replay",
    evidence: [{ label: "SEE THE MARKET REPLAY", href: "/lab/market-replay" }],
  },
  {
    id: "biz-analytics",
    label: "FINANCIAL & BUSINESS ANALYTICS",
    title: "Financial & Business Analytics",
    purpose:
      "Using data, financial reasoning, and automation to support better decisions.",
    problems: [
      "Performance, cost, and scenario analysis",
      "Reporting automation and anomaly detection",
      "From fragmented information to repeatable process",
    ],
    status: "IN ACTIVE DEVELOPMENT",
    evidence: [{ label: "EXPLORE SERVICES", href: "/services" }],
  },
  {
    id: "research-systems",
    label: "RESEARCH & DECISION SYSTEMS",
    title: "Research & Decision Systems",
    purpose:
      "Forming hypotheses, evaluating evidence, and improving decisions through structured investigation.",
    problems: [
      "Experimental design and reproducibility",
      "Separating evidence from assumption",
      "Decision workflows with explicit uncertainty",
    ],
    status: "RESEARCH DIRECTION",
    evidence: [{ label: "READ THE RESEARCH", href: "/research" }],
  },
];

export interface Stage {
  id: string;
  name: string;
  desc: string;
}

export const systemsStages: Stage[] = [
  { id: "problem", name: "PROBLEM", desc: "Understand the actual requirement before choosing a technology." },
  {
    id: "research",
    name: "RESEARCH",
    desc: "Investigate the subject, establish assumptions, and identify possible approaches.",
  },
  {
    id: "data",
    name: "DATA",
    desc: "Find and validate the information needed to make an informed decision.",
  },
  {
    id: "model",
    name: "MODEL",
    desc: "Translate the problem into a logical, mathematical, or computational representation.",
  },
  { id: "build", name: "BUILD", desc: "Implement the solution in software — testable, and honest about its limits." },
  {
    id: "automate",
    name: "AUTOMATE",
    desc: "Use code, AI, or orchestrated workflows to reduce appropriate repetitive work.",
  },
  {
    id: "verify",
    name: "VERIFY",
    desc: "Test the result, examine limitations, and decide whether it achieves the intended objective.",
  },
];

export const aiStages: Stage[] = [
  { id: "intent", name: "HUMAN INTENT", desc: "I define the problem and decide what actually matters." },
  {
    id: "planning",
    name: "PLANNING",
    desc: "Objectives, constraints, and boundaries are set before execution begins.",
  },
  {
    id: "execution",
    name: "AI-ASSISTED EXECUTION",
    desc: "AI accelerates research, coding, analysis, and documentation on defined tasks.",
  },
  {
    id: "tools",
    name: "TOOLS & WORKFLOWS",
    desc: "Agents operate real tools under controlled permissions and structured context.",
  },
  {
    id: "verification",
    name: "VERIFICATION",
    desc: "Tests, evidence, and inspection decide whether the output earns trust.",
  },
  {
    id: "decision",
    name: "FINAL DECISION",
    desc: "Human judgment accepts, rejects, or revises. Accountability is never automated.",
  },
];

export const principles = [
  {
    n: "01",
    title: "UNDERSTAND BEFORE BUILDING",
    body: "Investigate the problem, its causes, and its constraints before choosing a solution.",
  },
  {
    n: "02",
    title: "EVIDENCE BEFORE CLAIMS",
    body: "Test assumptions, measure results, and state limitations as plainly as successes.",
  },
  {
    n: "03",
    title: "SYSTEMS OVER SHORTCUTS",
    body: "Understand how components interact — not only how a single tool behaves.",
  },
  {
    n: "04",
    title: "AUTOMATE WITH CONTROL",
    body: "Reduce repetitive work without abandoning verification or accountability.",
  },
  {
    n: "05",
    title: "LEARN THROUGH IMPLEMENTATION",
    body: "Connect theory to practice; let failures identify what needs strengthening.",
  },
  {
    n: "06",
    title: "COMPLEXITY WITH PURPOSE",
    body: "Build sophisticated systems when the problem justifies them — never for show.",
  },
];

export interface VisionNode {
  id: string;
  label: string;
  body: string;
}

export const visionNodes: VisionNode[] = [
  {
    id: "quant-systems",
    label: "QUANTITATIVE SYSTEMS",
    body: "Complete research and trading infrastructure — from hypothesis to measured result.",
  },
  {
    id: "fin-intelligence",
    label: "FINANCIAL INTELLIGENCE",
    body: "Understanding prices, liquidity, risk, and incentives as one interacting system.",
  },
  {
    id: "data-infra",
    label: "DATA INFRASTRUCTURE",
    body: "Reliable pipelines that keep analysis correct, replayable, and trustworthy.",
  },
  {
    id: "ai-agents",
    label: "AI AGENTS",
    body: "Specialized agents collaborating through controlled workflows to investigate and act.",
  },
  {
    id: "automation",
    label: "AUTOMATION",
    body: "Processes that remove repetitive effort while keeping judgment in human hands.",
  },
  {
    id: "decision-systems",
    label: "DECISION SYSTEMS",
    body: "Tools that make evidence — not intuition alone — drive consequential choices.",
  },
];

/* node coordinates (percent of the desktop constellation box) + web edges */
export const visionLayout: Record<string, { x: number; y: number }> = {
  "quant-systems": { x: 12, y: 50 },
  "fin-intelligence": { x: 34, y: 20 },
  "data-infra": { x: 34, y: 80 },
  "ai-agents": { x: 66, y: 20 },
  automation: { x: 66, y: 80 },
  "decision-systems": { x: 88, y: 50 },
};

export const visionEdges: [string, string][] = [
  ["quant-systems", "fin-intelligence"],
  ["quant-systems", "data-infra"],
  ["quant-systems", "decision-systems"],
  ["fin-intelligence", "ai-agents"],
  ["data-infra", "ai-agents"],
  ["data-infra", "automation"],
  ["ai-agents", "automation"],
  ["automation", "decision-systems"],
  ["fin-intelligence", "decision-systems"],
];

export const audiences = [
  {
    tag: "FOR EMPLOYERS",
    body: "Examine the capabilities, the technical work behind them, and the qualifications that frame it.",
    href: "/cv",
    cta: "EXPLORE MY PROFILE",
  },
  {
    tag: "FOR BUSINESSES & CLIENTS",
    body: "See the kinds of technical problems — data workflows, analysis tools, automation — that can be scoped and delivered.",
    href: "/services",
    cta: "EXPLORE SERVICES",
  },
  {
    tag: "FOR RESEARCHERS & DEVELOPERS",
    body: "Investigations, experiments, and documented limitations — questions examined with methods and evidence.",
    href: "/research",
    cta: "EXPLORE RESEARCH",
  },
  {
    tag: "FOR STUDENTS & LEARNERS",
    body: "Interactive tools and experiments showing how concepts connect to working implementations.",
    href: "/lab",
    cta: "EXPLORE THE LAB",
  },
];
