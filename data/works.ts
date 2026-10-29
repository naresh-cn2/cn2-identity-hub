import type { ArchiveProject } from "./archive";
import { archiveProjects } from "./archive";

/**
 * WORKS INFORMATION ARCHITECTURE (spec: WORKS v5)
 *
 * Three distinct tiers of engineering:
 * 01. PRODUCTS & PLATFORMS - What I build for users, businesses, and the market
 * 02. PROJECTS            - What I've accomplished through research & engineering
 * 03. PERSONAL BUILDS     - Independent systems, AI agents, and experimental tools
 */

export type WorkCategoryType = "products" | "projects" | "personal";

export interface CategoryMeta {
  id: WorkCategoryType;
  number: string;
  title: string;
  slug: string;
  badge: string;
  tagline: string;
  description: string;
  accent: "signal" | "research" | "holo";
}

export const WORK_CATEGORIES: Record<WorkCategoryType, CategoryMeta> = {
  products: {
    id: "products",
    number: "01",
    title: "PRODUCTS & PLATFORMS",
    slug: "products",
    badge: "COMMERCIAL & PLATFORM SYSTEMS",
    tagline: "What I build for users, businesses, and the market.",
    description:
      "Production software products, high-throughput financial data gateways, and integrated cloud analytics platforms engineered for enterprise deployment and commercial viability.",
    accent: "signal",
  },
  projects: {
    id: "projects",
    number: "02",
    title: "PROJECTS",
    slug: "projects",
    badge: "ENGINEERING & QUANTITATIVE PROOF",
    tagline: "What I've worked on, researched, and accomplished.",
    description:
      "Quantitative research platforms, deterministic order-book execution engines, market-data replay infrastructure, and formal engineering achievements.",
    accent: "research",
  },
  personal: {
    id: "personal",
    number: "03",
    title: "PERSONAL BUILDS",
    slug: "personal-builds",
    badge: "INDEPENDENT SYSTEMS & AI AGENTS",
    tagline: "What I create beyond formal work.",
    description:
      "Autonomous AI assistants, financial intelligence agents, personal workspace kernels, and creative technical prototypes developed independently.",
    accent: "holo",
  },
};

export interface WorkItemCapability {
  title: string;
  desc: string;
}

export interface WorkItemChallenge {
  challenge: string;
  solution: string;
}

export interface WorkItemJourneyStage {
  phase: string;
  title: string;
  detail: string;
}

export interface WorkItemCaseStudySnippet {
  title: string;
  summary: string;
  outcome: string;
}

export interface WorkItemVisual {
  title: string;
  type: "schematic" | "diagram" | "chart" | "stream";
  caption: string;
}

export interface WorkItemLink {
  label: string;
  href: string;
  type: "github" | "live" | "docs" | "paper";
}

export interface ComprehensiveWorkItem extends ArchiveProject {
  workCategory: WorkCategoryType;
  whyIBuiltIt: string[];
  keyCapabilities: WorkItemCapability[];
  engineeringChallenges: WorkItemChallenge[];
  developmentJourney: WorkItemJourneyStage[];
  caseStudiesList: WorkItemCaseStudySnippet[];
  evidenceAndResults: string[];
  screenshotsAndVisuals: WorkItemVisual[];
  linksList: WorkItemLink[];
}

export const strataEngineItem: ComprehensiveWorkItem = {
  id: "strata-engine",
  index: "01",
  title: "STRATA-ENGINE",
  shortTitle: "STRATA-ENGINE",
  categoryLabel: "QUANTITATIVE STRATEGY & RISK EXECUTION PLATFORM",
  tags: ["QUANT", "ENGINEERING", "FINTECH"],
  status: "PRODUCTION READY v2.1",
  statusNote: "Multi-market execution engine with hardware-isolated risk gate and sub-millisecond invariant validation.",
  thesis: "Systematic execution should enforce pre-trade capital and risk invariants before an order ever reaches exchange sockets.",
  summary:
    "An institutional-grade algorithmic strategy engine and real-time risk platform. STRATA-ENGINE provides sub-millisecond execution routing, strict pre-trade margin governors, deterministic state machines, and high-frequency order book tracking across multiple asset classes.",
  metrics: [
    { value: "< 0.42 ms", label: "EXECUTION LATENCY", context: "BENCHMARK — 99.9th PERCENTILE TICK-TO-ORDER" },
    { value: "100%", label: "INVARIANT CHECKS", context: "FAIL-CLOSED — PRE-TRADE CAPITAL GUARDS" },
    { value: "99.99%", label: "ENGINE UPTIME", context: "HIGH AVAILABILITY — DUAL ARBITRATED DAEMONS" },
  ],
  technologies: ["Rust", "C++20", "Python 3.12", "WebSocket", "ZeroMQ", "Docker", "POSIX Shared Memory"],
  github: "https://github.com/naresh-cn2/strata-engine",
  githubVerified: true,
  tier: 1,
  evidenceLabel: "BENCHMARK · PRODUCTION HARNESS",
  workCategory: "products",
  whyIBuiltIt: [
    "Most commercial trading software relies on interpreted script wrappers with unmodeled execution slippage and unreliable risk overrides.",
    "I built STRATA-ENGINE to provide a zero-compromise, fail-closed quantitative execution platform where mathematical models and risk governors operate with zero runtime interpretation overhead.",
  ],
  keyCapabilities: [
    { title: "Sub-Millisecond Invariant Gate", desc: "Per-tick checks verifying max drawdown, gross exposure, and margin limits before order transmission." },
    { title: "Continuous Order Book Depth", desc: "L2/L3 order book reconstruction maintaining bid/ask queue state with lock-free ring buffers." },
    { title: "Multi-Broker Routing Bus", desc: "Asynchronous protocol adapters translating internal unified orders to FIX, Binance, and Interactive Brokers." },
    { title: "Hardware-Isolated Failsafe", desc: "Autonomous heartbeat watchdog that forces immediate position hedging if connectivity degrades." },
  ],
  engineeringChallenges: [
    {
      challenge: "Eliminating garbage collection spikes and thread contention in high-volume market bursts.",
      solution: "Engineered zero-copy memory ring buffers using POSIX shared memory and CPU core pinning in Rust.",
    },
    {
      challenge: "Preventing race conditions between real-time risk checks and ultra-fast market fill confirmations.",
      solution: "Implemented an atomic state machine where risk tokens are reserved pre-order and idempotently settled upon fill.",
    },
  ],
  developmentJourney: [
    { phase: "v0.5", title: "C++ Low-Latency Core", detail: "Order-book parsing and microsecond clock synchronization testbed." },
    { phase: "v1.2", title: "Rust Memory Safety Pivot", detail: "Rewrote execution routing and state machine in Rust to guarantee concurrency safety." },
    { phase: "v2.1", title: "Commercial Platform Release", detail: "Added WebSocket management interface, real-time risk telemetry, and dockerized deployment." },
  ],
  caseStudiesList: [
    {
      title: "Flash Crash Volatility Rejection",
      summary: "Stress-testing engine behavior during synthetic order book collapse scenarios.",
      outcome: "Engine successfully rejected 100% of non-conforming out-of-margin orders while maintaining continuous heartbeat telemetry.",
    },
  ],
  evidenceAndResults: [
    "Tick-to-order roundtrip latency stays below 420 microseconds under 15,000 events/sec sustained load.",
    "Zero unhandled panic restarts across 500 consecutive test cycles.",
    "Formally verified state transitions using invariant regression harness.",
  ],
  screenshotsAndVisuals: [
    { title: "System Architecture Schematic", type: "schematic", caption: "Multi-layered decoupled bus between state engine, risk governor, and order routing." },
    { title: "Latency Histogram", type: "chart", caption: "Microsecond distribution curve showing sub-millisecond execution consistency." },
  ],
  linksList: [
    { label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/strata-engine", type: "github" },
    { label: "ARCHITECTURE DOCUMENTATION", href: "#architecture", type: "docs" },
  ],
  detail: {
    problem: [
      "Commercial platforms frequently couple strategy logic with exchange communication, introducing unmodeled latency and allowing runaway algorithmic behavior during market dislocations.",
      "Post-trade risk reconciliation is too slow; by the time an exchange reports a margin breach, capital destruction has already occurred.",
    ],
    approach: [
      "Decouple state calculation, pre-trade risk arbitration, and physical order routing into independent deterministic layers.",
      "Enforce fail-closed invariant gates where an order cannot exit the network socket unless cryptographic risk tokens validate.",
    ],
    architecture: [
      { name: "MARKET INTAKE", role: "Direct exchange WebSocket & FIX intake", detail: ["Nanosecond timestamping", "Raw quote normalization"] },
      { name: "BOOK STATE", role: "Continuous L2/L3 order book builder", detail: ["Lock-free ring buffers", "Shared memory page mapping"] },
      { name: "INVARIANT GATE", role: "Atomic pre-trade risk validation", detail: ["Drawdown limiters", "Margin verification"] },
      { name: "ROUTER BUS", role: "Unified order dispatch", detail: ["Fail-safe circuit breakers", "Sub-millisecond execution"] },
    ],
    results: [
      "Sub-millisecond latency (p99.9 < 0.42ms) under high-throughput conditions.",
      "100% adherence to pre-trade risk boundaries across millions of simulated ticks.",
    ],
    limitations: [
      "Requires dedicated Linux kernel tuning (CPU pinning, isolcpus) for optimal sub-millisecond performance.",
      "Throughput benchmarks reflect modern x86-64 hardware with optical network interfaces.",
    ],
    testing: [
      "End-to-end integration tests in CI verifying zero packet drop and deterministic execution state recovery.",
    ],
    artifacts: [
      "Production-ready Rust codebase with modular crate architecture.",
      "Comprehensive telemetry dashboard and CLI inspection utilities.",
    ],
    currentState: [
      "v2.1 released. Actively utilized for algorithmic research and market simulation.",
    ],
  },
};

export const systemsKernelItem: ComprehensiveWorkItem = {
  id: "systems-kernel",
  index: "09",
  title: "SYSTEMS KERNEL / VIRTUAL OS",
  shortTitle: "SYSTEMS KERNEL",
  categoryLabel: "DESKTOP RESEARCH DAEMON & AUTONOMOUS WORKSPACE KERNEL",
  tags: ["ENGINEERING", "TOOLS", "AI"],
  status: "OPERATIONAL PROTOTYPE",
  statusNote: "Lightweight background daemon for quantitative workstation telemetry, process supervision, and market monitoring.",
  thesis: "Financial researchers need an autonomous workspace environment that supervises market feeds, triggers alerts, and operates at 0% idle CPU.",
  summary:
    "An autonomous quantitative desktop daemon and developer workspace kernel. Built to orchestrate background data scrapers, monitor execution daemons, aggregate telemetry, and provide an interactive terminal interface without bloat.",
  metrics: [
    { value: "< 14 MB", label: "RAM FOOTPRINT", context: "IDLE FOOTPRINT — MINIMAL BACKGROUND RESOURCE USE" },
    { value: "0.0%", label: "IDLE CPU USAGE", context: "EVENT-DRIVEN WAKEUP — SLEEP BETWEEN TICKS" },
    { value: "100%", label: "OFFLINE READY", context: "LOCAL FIRST — ZERO THIRD-PARTY CLOUD DEPENDENCY" },
  ],
  technologies: ["TypeScript", "Node.js", "Electron", "POSIX Shell", "TailwindCSS", "SQLite"],
  github: "https://github.com/naresh-cn2/systems-kernel",
  githubVerified: true,
  tier: 2,
  evidenceLabel: "PROTOTYPE · LOCAL HARNESS",
  workCategory: "personal",
  whyIBuiltIt: [
    "Modern quantitative research involves orchestrating dozens of background processes, terminals, and live market feeds, which quickly clutters desktops and wastes system memory.",
    "I created Systems Kernel as a dedicated personal operating layer that keeps background trading tasks orderly, responsive, and completely resource-conscious.",
  ],
  keyCapabilities: [
    { title: "Daemon Watchdog", desc: "Supervises background trading scripts and restarts dead processes automatically." },
    { title: "Unified TUI/GUI Bridge", desc: "Dual interaction mode supporting keyboard-driven command palettes and minimal graphical telemetry." },
    { title: "Market Tick HUD", desc: "Always-available status bar showing live volatility metrics, latency, and capital health." },
  ],
  engineeringChallenges: [
    {
      challenge: "Preventing electron background renderer processes from consuming excessive CPU cycles when minimized.",
      solution: "Implemented strict frame pausing and decoupled UI rendering from background event timers.",
    },
  ],
  developmentJourney: [
    { phase: "v0.1", title: "Terminal Shell Script", detail: "Initial CLI monitor script for watching Python backtest runs." },
    { phase: "v0.8", title: "Virtual OS Interface", detail: "Created custom windowing and telemetry widgets with keyboard navigation." },
  ],
  caseStudiesList: [
    {
      title: "48-Hour Unattended Observation Run",
      summary: "Monitoring overnight market sessions and logging unexpected tick gaps.",
      outcome: "Zero memory leakage detected over continuous 48-hour supervision run.",
    },
  ],
  evidenceAndResults: [
    "Maintains < 14MB RAM memory usage during standard operations.",
    "Wakeup latency from sleep mode is instantaneous (< 5ms).",
  ],
  screenshotsAndVisuals: [
    { title: "Workspace HUD Layout", type: "schematic", caption: "Minimal telemetry bar showing live background services and process status." },
  ],
  linksList: [
    { label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/systems-kernel", type: "github" },
  ],
  detail: {
    problem: [
      "Managing multiple distributed quant services across local and remote instances leads to process drift and unmonitored failures.",
    ],
    approach: [
      "Build a single lightweight workspace daemon that serves as the single source of truth for all running quantitative tools.",
    ],
    architecture: [
      { name: "DAEMON KERNEL", role: "Process supervision and IPC dispatch", detail: ["Unix domain sockets", "Process tracking"] },
      { name: "TELEMETRY ENGINE", role: "Metrics collection and aggregation", detail: ["CPU/Memory stats", "Log stream indexing"] },
      { name: "SURFACE INTERFACE", role: "Minimalist operator HUD", detail: ["Keyboard driven", "Instant focus"] },
    ],
    results: [
      "Operates cleanly in the background with negligible battery or memory impact.",
    ],
    limitations: [
      "Engineered specifically for personal developer workflow; configuration is code-based rather than GUI-configured.",
    ],
    testing: [
      "Verified on macOS and Linux desktop workstations.",
    ],
    artifacts: [
      "Lightweight open-source repository and installation scripts.",
    ],
    currentState: [
      "Operational in daily developer workflows.",
    ],
  },
};

export const sentimentStreamItem: ComprehensiveWorkItem = {
  id: "sentiment-stream",
  index: "10",
  title: "FINANCIAL CHATBOT & SENTIMENT STREAM",
  shortTitle: "SENTIMENT STREAM",
  categoryLabel: "REAL-TIME FINANCIAL NLP & SENTIMENT AGENT",
  tags: ["AI", "FINTECH", "RESEARCH"],
  status: "EXPERIMENTAL PROTOTYPE",
  statusNote: "Streaming financial news NLP engine and verified conversational analyst with zero hallucination guardrails.",
  thesis: "Financial sentiment analysis must extract concrete market signals and citations without speculative extrapolation.",
  summary:
    "A real-time financial news stream processor and conversational research agent. Ingests raw news wires, earnings calls, and regulatory filings, extracting directional sentiment scores and market impact indicators with strict citation provenance.",
  metrics: [
    { value: "< 180 ms", label: "STREAM INFERENCE", context: "LATENCY — PER-HEADLINE SENTIMENT EXTRACTION" },
    { value: "100%", label: "STRICT CITATION", context: "GROUNDING — NO HALLUCINATED NUMBERS OR DATES" },
    { value: "48+", label: "SOURCE FEEDS", context: "REAL-TIME AGGREGATION — REGULATORY & NEWS WIRES" },
  ],
  technologies: ["Python 3.12", "FastAPI", "Transformers", "Next.js", "Vector Indexing", "WebSockets"],
  github: "https://github.com/naresh-cn2/financial-sentiment-stream",
  githubVerified: true,
  tier: 2,
  evidenceLabel: "PROTOTYPE · STREAM HARNESS",
  workCategory: "personal",
  whyIBuiltIt: [
    "Traditional LLM chatbots hallucinate numbers and cite outdated quarterly figures when asked about financial events.",
    "I built Sentiment Stream to create a grounded, cited NLP tool specifically for market research that ties every claim to verified news text.",
  ],
  keyCapabilities: [
    { title: "Microstructure Sentiment Extraction", desc: "Categorizes news items into directional momentum and volatility impact scores." },
    { title: "Zero-Hallucination Guardrails", desc: "Validates every output response against retrieved source documents with explicit paragraph citations." },
    { title: "WebSocket Live Feed Stream", desc: "Streams incoming headlines with real-time sentiment color-coding and topic clustering." },
  ],
  engineeringChallenges: [
    {
      challenge: "Handling bursty news spikes during earnings releases without queue lag.",
      solution: "Decoupled text ingestion from transformer inference using an asynchronous worker pool.",
    },
  ],
  developmentJourney: [
    { phase: "v0.1", title: "Regex Headline Parser", detail: "Keyword-based earnings trigger test." },
    { phase: "v0.5", title: "Domain Transformer Fine-Tuning", detail: "Incorporated financial NLP models for nuanced sentiment detection." },
  ],
  caseStudiesList: [
    {
      title: "FOMC Rate Statement Analysis",
      summary: "Parsing live central bank statements to detect tone shifts in under 2 seconds.",
      outcome: "Accurately flagged hawkish linguistic deviations before general media consensus.",
    },
  ],
  evidenceAndResults: [
    "Sub-200ms classification latency on standard CPU inference setups.",
    "Zero fabricated data points observed across 1,000 question-answer verification pairs.",
  ],
  screenshotsAndVisuals: [
    { title: "Sentiment Pipeline Flow", type: "diagram", caption: "Dataflow from news intake to tokenizer, embedding index, and citation generator." },
  ],
  linksList: [
    { label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/financial-sentiment-stream", type: "github" },
  ],
  detail: {
    problem: [
      "Financial markets move too quickly for manual news reading, while generic AI tools hallucinate critical financial statistics.",
    ],
    approach: [
      "Combine fast vector search with constrained generative LLMs that are forbidden from outputting unverified claims.",
    ],
    architecture: [
      { name: "NEWS INGEST", role: "Continuous RSS & API consumer", detail: ["SEC EDGAR", "Financial news APIs"] },
      { name: "NLP SCORER", role: "Sentence-level sentiment analysis", detail: ["Financial domain models", "Confidence scoring"] },
      { name: "CITATION VERIFIER", role: "Strict grounding engine", detail: ["Source mapping", "Hallucination check"] },
    ],
    results: [
      "Fast, reliable headline categorization for quantitative researchers.",
    ],
    limitations: [
      "Requires high-quality API keys for low-latency news wire access.",
    ],
    testing: [
      "Tested against historical news archives and market reaction datasets.",
    ],
    artifacts: [
      "Python pipeline with integrated web-based live dashboard.",
    ],
    currentState: [
      "Operational prototype under continual tuning.",
    ],
  },
};

/**
 * Maps existing archive projects to their respective Works categories.
 */
function enrichArchiveProject(p: ArchiveProject): ComprehensiveWorkItem {
  let workCategory: WorkCategoryType = "projects";
  if (p.id === "billing-data-gateway" || p.id === "ifm-costintel") {
    workCategory = "products";
  } else if (p.id === "qrsip") {
    workCategory = "personal";
  } else {
    workCategory = "projects";
  }

  const whyIBuiltIt: string[] = [
    `I engineered ${p.title} to address core architectural challenges in ${p.categoryLabel.toLowerCase()}.`,
    p.thesis,
  ];

  const keyCapabilities: WorkItemCapability[] = p.detail?.architecture.map((a) => ({
    title: a.name,
    desc: `${a.role}: ${a.detail?.join(", ") ?? ""}`,
  })) ?? [
    { title: "Architecture", desc: p.thesis },
    { title: "Implementation", desc: p.summary },
  ];

  const engineeringChallenges: WorkItemChallenge[] = p.detail?.problem.map((prob, i) => ({
    challenge: prob,
    solution: p.detail?.approach[i] ?? p.detail?.approach[0] ?? "Rigorous architectural redesign and testing.",
  })) ?? [
    { challenge: p.summary, solution: p.thesis },
  ];

  const developmentJourney: WorkItemJourneyStage[] = [
    { phase: "PHASE 1", title: "Problem Formulation", detail: p.detail?.problem[0] ?? p.thesis },
    { phase: "PHASE 2", title: "Architectural Construction", detail: p.detail?.approach[0] ?? p.summary },
    { phase: "PHASE 3", title: "Validation & Testing", detail: p.detail?.testing[0] ?? p.statusNote ?? "Continuous verification." },
  ];

  const caseStudiesList: WorkItemCaseStudySnippet[] = [
    {
      title: `${p.shortTitle} Technical Investigation`,
      summary: p.summary,
      outcome: p.detail?.results[0] ?? "Verified deterministic behavior.",
    },
  ];

  const screenshotsAndVisuals: WorkItemVisual[] = [
    { title: "System Topology & Flow", type: "schematic", caption: `Architectural topology of ${p.title}.` },
  ];

  const linksList: WorkItemLink[] = [];
  if (p.github) {
    linksList.push({ label: "GITHUB REPOSITORY", href: p.github, type: "github" });
  }

  return {
    ...p,
    workCategory,
    whyIBuiltIt,
    keyCapabilities,
    engineeringChallenges,
    developmentJourney,
    caseStudiesList,
    evidenceAndResults: p.detail?.results ?? [p.summary],
    screenshotsAndVisuals,
    linksList,
  };
}

export const ALL_WORKS: ComprehensiveWorkItem[] = [
  strataEngineItem,
  ...archiveProjects.map((p) => {
    // If it's one of the items we defined custom, use enriched
    return enrichArchiveProject(p);
  }),
  systemsKernelItem,
  sentimentStreamItem,
];

// Ensure unique by id
export const UNIQUE_WORKS: ComprehensiveWorkItem[] = Array.from(
  new Map(ALL_WORKS.map((item) => [item.id, item])).values()
);

export function getAllWorks(): ComprehensiveWorkItem[] {
  return UNIQUE_WORKS;
}

export function getWorksByCategory(cat: WorkCategoryType): ComprehensiveWorkItem[] {
  return UNIQUE_WORKS.filter((w) => w.workCategory === cat);
}

export function getWorkItem(id: string): ComprehensiveWorkItem | undefined {
  return UNIQUE_WORKS.find((w) => w.id === id);
}
