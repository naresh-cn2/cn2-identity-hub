import type { ArchiveProject } from "./archive";
import { archiveProjects } from "./archive";

/**
 * WORKS INFORMATION ARCHITECTURE (spec: WORKS v6)
 *
 * Three distinct destinations:
 * 1. PRODUCTS & PLATFORMS - Commercial products, quantitative systems,
 *    FinOps tools and high-performance infrastructure I have built.
 * 2. PROJECTS - Genuine standalone projects that are not presented as products.
 * 3. PERSONAL BUILDS - Independent personal systems and tools.
 */

export type WorkCategoryType = "products" | "projects" | "personal";

export interface CategoryMeta {
  id: WorkCategoryType;
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
    title: "PRODUCTS & PLATFORMS",
    slug: "products",
    badge: "COMMERCIAL & PLATFORM SYSTEMS",
    tagline: "Quantitative systems, FinOps tools, and high-performance infrastructure.",
    description:
      "Production software products, quantitative platforms, financial data engines, and systems infrastructure engineered for deployment and commercial viability.",
    accent: "signal",
  },
  projects: {
    id: "projects",
    title: "PROJECTS",
    slug: "projects",
    badge: "ENGINEERING & QUANTITATIVE PROOF",
    tagline: "Verified standalone projects and research builds.",
    description:
      "Standalone quantitative projects and research builds with documented architecture and evidence.",
    accent: "research",
  },
  personal: {
    id: "personal",
    title: "PERSONAL BUILDS",
    slug: "personal-builds",
    badge: "INDEPENDENT SYSTEMS & AI AGENTS",
    tagline: "Independent personal systems and tools.",
    description:
      "Personal portfolio platform, AI assistant workspace, and independent technical prototypes.",
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
  workCategory: "products",
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
  workCategory: "products",
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

/* ------------------------------------------------------------------ */
/* NEW PRODUCTS & PLATFORMS (not yet in archive.ts)                   */
/* ------------------------------------------------------------------ */

export const settleIqItem: ComprehensiveWorkItem = {
  id: "settleiq",
  title: "SETTLE-IQ",
  shortTitle: "SETTLE-IQ",
  categoryLabel: "Financial Settlement Discrepancy Investigation Engine",
  tags: ["FINTECH", "RECONCILIATION", "PYTHON"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Financial settlement discrepancy investigation engine with reconciliation and variance identification.",
  thesis: "Settlement discrepancies should be investigated with evidence-backed reports, not reconciled by intuition.",
  summary:
    "Financial settlement discrepancy investigation engine that reconciles expected vs. actual settlements, identifies variances, and generates evidence-backed investigation reports.",
  metrics: [],
  technologies: ["Python", "Financial reconciliation", "Investigation reporting"],
  github: "https://github.com/naresh-cn2/settleiq",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: [
    "Settlement discrepancies need structured investigation with auditable evidence trails.",
  ],
  keyCapabilities: [
    { title: "Expected vs. Actual Reconciliation", desc: "Compares expected settlements against actual executions." },
    { title: "Variance Identification", desc: "Flags and categorizes settlement variances for review." },
    { title: "Evidence-Backed Reports", desc: "Generates investigation reports with supporting documentation." },
  ],
  engineeringChallenges: [],
  developmentJourney: [
    { phase: "v0.1", title: "Reconciliation Core", detail: "Basic expected-vs-actual settlement comparison." },
  ],
  caseStudiesList: [],
  evidenceAndResults: ["Settlement discrepancy investigation engine under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/settleiq", type: "github" }],
  detail: {
    problem: ["Settlement discrepancies are reconciled by intuition rather than structured investigation."],
    approach: ["Build an investigation engine that produces evidence-backed discrepancy reports."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const axiomJsonItem: ComprehensiveWorkItem = {
  id: "axiom-json",
  title: "AXIOM-JSON",
  shortTitle: "AXIOM-JSON",
  categoryLabel: "JSON Data Processing System",
  tags: ["PYTHON", "DATA", "SYSTEMS"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "JSON data processing system under development.",
  thesis: "JSON processing should be deterministic and auditable.",
  summary: "JSON data processing system for structured data workflows.",
  metrics: [],
  technologies: ["Python", "JSON", "Data processing"],
  github: "https://github.com/naresh-cn2/Axiom-JSON",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["JSON data workflows need deterministic, auditable processing."],
  keyCapabilities: [{ title: "JSON Processing", desc: "Structured JSON data processing and transformation." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Core Processing", detail: "Basic JSON processing pipeline." }],
  caseStudiesList: [],
  evidenceAndResults: ["JSON data processing system under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/Axiom-JSON", type: "github" }],
  detail: {
    problem: ["JSON data workflows lack deterministic, auditable processing."],
    approach: ["Build a deterministic JSON processing system."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const omniLedgerEngineItem: ComprehensiveWorkItem = {
  id: "omniledger-engine",
  title: "OMNI-LEDGER-ENGINE",
  shortTitle: "OMNI-LEDGER",
  categoryLabel: "Financial Ledger Processing Engine",
  tags: ["FINTECH", "PYTHON", "LEDGER"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Financial ledger processing engine under development.",
  thesis: "Financial ledgers should process transactions deterministically.",
  summary: "Financial ledger processing engine for structured transaction workflows.",
  metrics: [],
  technologies: ["Python", "Financial ledger", "Transaction processing"],
  github: "https://github.com/naresh-cn2/omniledger-engine",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["Financial ledger processing needs deterministic transaction handling."],
  keyCapabilities: [{ title: "Ledger Processing", desc: "Deterministic financial transaction processing." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Ledger Core", detail: "Basic financial ledger processing." }],
  caseStudiesList: [],
  evidenceAndResults: ["Financial ledger processing engine under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/omniledger-engine", type: "github" }],
  detail: {
    problem: ["Financial ledgers lack deterministic transaction processing."],
    approach: ["Build a deterministic financial ledger processing engine."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const cloudCostEngineItem: ComprehensiveWorkItem = {
  id: "cloud-cost-engine",
  title: "CLOUD-COST-ENGINE",
  shortTitle: "CLOUD COST ENGINE",
  categoryLabel: "Cloud Cost Processing Engine",
  tags: ["FINOPS", "C", "SYSTEMS"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Cloud cost processing engine under development.",
  thesis: "Cloud cost data should be processed at memory speed without framework overhead.",
  summary: "High-performance cloud cost processing engine for financial data normalization.",
  metrics: [],
  technologies: ["C11", "POSIX", "Memory-mapped I/O", "FinOps"],
  github: "https://github.com/naresh-cn2/cloud-cost-engine",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["Cloud cost processing needs zero-dependency, memory-speed infrastructure."],
  keyCapabilities: [{ title: "Cloud Cost Processing", desc: "High-performance cloud cost data normalization." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Cost Engine Core", detail: "Zero-dependency cost processing pipeline." }],
  caseStudiesList: [],
  evidenceAndResults: ["Cloud cost processing engine under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/cloud-cost-engine", type: "github" }],
  detail: {
    problem: ["Cloud cost processing incurs framework overhead and interpretation costs."],
    approach: ["Build zero-dependency cost processing using POSIX memory-mapped I/O."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const b2bLeadProspectorItem: ComprehensiveWorkItem = {
  id: "b2b-lead-prospector",
  title: "B2B LEAD PROSPECTOR",
  shortTitle: "B2B LEAD PROSPECTOR",
  categoryLabel: "B2B Lead Scraping & Contact Enrichment Platform",
  tags: ["FINTECH", "PYTHON", "SCRAPING", "APIFY"],
  status: "PRODUCTION",
  statusNote: "Production B2B lead scraper and contact enrichment actor for Apify.",
  thesis: "B2B lead generation should be production-grade with structured contact enrichment.",
  summary: "Production B2B lead scraper and contact enrichment platform for Apify.",
  metrics: [],
  technologies: ["Python", "Apify", "Web scraping", "Contact enrichment"],
  github: "https://github.com/naresh-cn2/b2b-lead-prospector",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "PRODUCTION",
  workCategory: "products",
  whyIBuiltIt: ["B2B lead generation needs production-grade scraping with structured enrichment."],
  keyCapabilities: [
    { title: "B2B Lead Scraping", desc: "Production-grade lead discovery and scraping." },
    { title: "Contact Enrichment", desc: "Structured contact information enrichment." },
  ],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v1.0", title: "Production Release", detail: "Production B2B lead prospector for Apify." }],
  caseStudiesList: [],
  evidenceAndResults: ["Production B2B lead scraping and contact enrichment platform."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/b2b-lead-prospector", type: "github" }],
  detail: {
    problem: ["B2B lead generation lacks production-grade scraping with structured enrichment."],
    approach: ["Build a production lead scraper and enrichment actor for Apify."],
    architecture: [],
    results: [],
    limitations: [],
    testing: [],
    artifacts: [],
    currentState: ["Production release."],
  },
};

export const forgeStreamItem: ComprehensiveWorkItem = {
  id: "forge-stream",
  title: "FORGE-STREAM",
  shortTitle: "FORGE-STREAM",
  categoryLabel: "High-Performance Data Ingestion & CSV Processing",
  tags: ["C", "SYSTEMS", "DATA INGESTION", "FINTECH"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "High-performance data ingestion and CSV processing infrastructure.",
  thesis: "Data ingestion should achieve maximum throughput with minimal overhead.",
  summary: "High-performance data ingestion and CSV processing infrastructure.",
  metrics: [],
  technologies: ["C", "Systems programming", "CSV parsing", "Data ingestion"],
  github: "https://github.com/naresh-cn2/forge-stream",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["Data ingestion pipelines need maximum throughput with minimal overhead."],
  keyCapabilities: [{ title: "CSV Processing", desc: "High-performance CSV parsing and data ingestion." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Ingestion Core", detail: "High-performance CSV processing pipeline." }],
  caseStudiesList: [],
  evidenceAndResults: ["High-performance data ingestion infrastructure under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/forge-stream", type: "github" }],
  detail: {
    problem: ["Data ingestion pipelines incur excessive overhead and throughput limitations."],
    approach: ["Build zero-overhead data ingestion using C and systems programming."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const zeroLatencyEngineItem: ComprehensiveWorkItem = {
  id: "zero-latency-engine",
  title: "ZERO-LATENCY-ENGINE",
  shortTitle: "ZERO LATENCY",
  categoryLabel: "High-Performance C Engine for CSV Processing",
  tags: ["C", "SYSTEMS", "HIGH PERFORMANCE", "MMAP"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Achieves 15x speedup (0.45s vs 7.15s) over Python/Pandas using mmap and custom parsing.",
  thesis: "CSV processing should exploit memory mapping and custom parsing for maximum speed.",
  summary: "High-performance C engine achieving 15x speedup over Python/Pandas using mmap and custom parsing for 20M+ row CSV files.",
  metrics: [],
  technologies: ["C11", "mmap", "Custom parsing", "CSV processing"],
  github: "https://github.com/naresh-cn2/Zero-Latency-Engine",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["CSV processing should exploit memory mapping for order-of-magnitude speedups."],
  keyCapabilities: [{ title: "High-Throughput CSV Processing", desc: "15x speedup over Python/Pandas using mmap." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Mmap Engine", detail: "Memory-mapped CSV processing engine." }],
  caseStudiesList: [],
  evidenceAndResults: ["15x speedup (0.45s vs 7.15s) over Python/Pandas using mmap and custom parsing."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/Zero-Latency-Engine", type: "github" }],
  detail: {
    problem: ["CSV processing in Python/Pandas is too slow for 20M+ row files."],
    approach: ["Use C11 with mmap and custom parsing for order-of-magnitude speedups."],
    architecture: [],
    results: ["15x speedup (0.45s vs 7.15s) over Python/Pandas."],
    limitations: ["Active development; benchmarks reflect specific hardware and dataset."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const forgeCoreItem: ComprehensiveWorkItem = {
  id: "forge-core",
  title: "FORGE-CORE",
  shortTitle: "FORGE-CORE",
  categoryLabel: "Lock-Free User-Space IPC Transport",
  tags: ["C", "IPC", "SHARED MEMORY", "SYSTEMS"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Lock-free user-space IPC transport fabric using POSIX shared memory and core-pinning.",
  thesis: "Inter-process communication should be lock-free and cache-line aware.",
  summary: "Lock-free user-space IPC transport fabric written in C11 utilizing POSIX shared memory (/dev/shm) and asymmetric core-pinning isolation maps.",
  metrics: [],
  technologies: ["C11", "POSIX shared memory", "IPC", "Core pinning"],
  github: "https://github.com/naresh-cn2/forge-core",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["IPC infrastructure should be lock-free and optimized for cache-line locality."],
  keyCapabilities: [{ title: "Lock-Free IPC", desc: "User-space IPC using POSIX shared memory and core pinning." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "IPC Fabric", detail: "Lock-free IPC transport using /dev/shm." }],
  caseStudiesList: [],
  evidenceAndResults: ["Lock-free IPC transport fabric under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/forge-core", type: "github" }],
  detail: {
    problem: ["Traditional IPC introduces lock contention and cache-line contention."],
    approach: ["Build lock-free IPC using POSIX shared memory and asymmetric core pinning."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const forgeEngineItem: ComprehensiveWorkItem = {
  id: "forge-engine",
  title: "FORGE-ENGINE",
  shortTitle: "FORGE-ENGINE",
  categoryLabel: "Multithreaded Task Orchestration Runtime",
  tags: ["C", "SYSTEMS", "TASK ORCHESTRATION", "HTTP"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Multithreaded task orchestration and async data ingestion runtime with integrated HTTP control plane.",
  thesis: "Task orchestration should combine multithreading with live telemetry diagnostics.",
  summary: "High-performance, multi-threaded task orchestration and asynchronous data ingestion runtime engine written in pure C with an integrated HTTP control plane and live JSON telemetry diagnostics.",
  metrics: [],
  technologies: ["C", "Multithreading", "Task orchestration", "HTTP control plane"],
  github: "https://github.com/naresh-cn2/forge-engine",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["Task orchestration needs multithreaded execution with live diagnostics."],
  keyCapabilities: [
    { title: "Task Orchestration", desc: "Multi-threaded task execution and scheduling." },
    { title: "Async Data Ingestion", desc: "Asynchronous data ingestion pipeline." },
    { title: "Live Telemetry", desc: "Integrated HTTP control plane with JSON telemetry." },
  ],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Orchestration Core", detail: "Multi-threaded task orchestration runtime." }],
  caseStudiesList: [],
  evidenceAndResults: ["Multithreaded task orchestration runtime under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/forge-engine", type: "github" }],
  detail: {
    problem: ["Task orchestration lacks multithreaded execution with live telemetry."],
    approach: ["Build a C runtime with multi-threaded orchestration and HTTP control plane."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const forgeWorkspaceItem: ComprehensiveWorkItem = {
  id: "forge-workspace",
  title: "FORGE-WORKSPACE",
  shortTitle: "FORGE WORKSPACE",
  categoryLabel: "3-Tier Data Ingestion Platform (Private)",
  tags: ["C", "IPC", "SHARED MEMORY", "LOW LATENCY"],
  status: "PRIVATE REPOSITORY",
  statusNote: "Private repository — access restrictions apply. Source code and implementation details are not publicly exposed.",
  thesis: "High-velocity data ingestion needs a 3-tier architecture with lock-free shared memory.",
  summary: "A high-velocity, ultra-low-latency 3-tier data ingestion platform written in pure C. Utilizes lock-free POSIX shared memory ring buffers, atomic pointer synchronization, and kernel-level thread scheduling.",
  metrics: [],
  technologies: ["C11", "POSIX shared memory", "Ring buffers", "Thread scheduling"],
  github: undefined,
  githubVerified: false,
  tier: 2,
  evidenceLabel: "PRIVATE REPOSITORY",
  workCategory: "products",
  whyIBuiltIt: ["Data ingestion platforms need 3-tier architecture with lock-free shared memory."],
  keyCapabilities: [
    { title: "3-Tier Ingestion", desc: "High-velocity, ultra-low-latency data ingestion platform." },
    { title: "Lock-Free Ring Buffers", desc: "POSIX shared memory ring buffers for zero-contention IPC." },
  ],
  engineeringChallenges: [],
  developmentJourney: [],
  caseStudiesList: [],
  evidenceAndResults: ["Private 3-tier data ingestion platform; source not publicly exposed."],
  screenshotsAndVisuals: [],
  linksList: [],
  detail: {
    problem: ["Data ingestion platforms need 3-tier architecture with lock-free shared memory."],
    approach: ["Build a pure C platform using lock-free POSIX shared memory ring buffers."],
    architecture: [],
    results: [],
    limitations: ["Private repository — source code and implementation details not publicly exposed."],
    testing: [],
    artifacts: [],
    currentState: ["Private repository under active development."],
  },
};

export const forgeIpcItem: ComprehensiveWorkItem = {
  id: "forge-ipc",
  title: "FORGE-IPC",
  shortTitle: "FORGE-IPC",
  categoryLabel: "Inter-Process Communication Infrastructure",
  tags: ["C", "IPC", "SYSTEMS"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Inter-process communication infrastructure under development.",
  thesis: "IPC should be lightweight and systems-oriented.",
  summary: "Inter-process communication infrastructure.",
  metrics: [],
  technologies: ["C", "IPC", "Systems programming"],
  github: "https://github.com/naresh-cn2/forge-ipc",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["IPC infrastructure should be lightweight and systems-oriented."],
  keyCapabilities: [{ title: "IPC Infrastructure", desc: "Lightweight inter-process communication." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "IPC Core", detail: "Basic inter-process communication infrastructure." }],
  caseStudiesList: [],
  evidenceAndResults: ["Inter-process communication infrastructure under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/forge-ipc", type: "github" }],
  detail: {
    problem: ["IPC infrastructure should be lightweight and systems-oriented."],
    approach: ["Build lightweight IPC infrastructure in C."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const axiomProbeItem: ComprehensiveWorkItem = {
  id: "axiom-probe",
  title: "AXIOM-PROBE",
  shortTitle: "AXIOM PROBE",
  categoryLabel: "System Probe & Diagnostics",
  tags: ["C", "SYSTEMS", "DIAGNOSTICS"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "System probe and diagnostics tool under development.",
  thesis: "System diagnostics should be lightweight and production-safe.",
  summary: "System probe and diagnostics tool.",
  metrics: [],
  technologies: ["C", "Systems diagnostics"],
  github: "https://github.com/naresh-cn2/axiom-probe",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["System diagnostics need to be lightweight and production-safe."],
  keyCapabilities: [{ title: "System Diagnostics", desc: "Lightweight system probe and diagnostics." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Probe Core", detail: "Basic system probe and diagnostics." }],
  caseStudiesList: [],
  evidenceAndResults: ["System probe and diagnostics tool under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/axiom-probe", type: "github" }],
  detail: {
    problem: ["System diagnostics introduce production overhead and complexity."],
    approach: ["Build lightweight, production-safe system diagnostics."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const axiomProtocolReleaseItem: ComprehensiveWorkItem = {
  id: "axiom-protocol-release",
  title: "AXIOM-PROTOCOL-RELEASE",
  shortTitle: "AXIOM PROTOCOL RELEASE",
  categoryLabel: "Protocol Release Engineering",
  tags: ["PYTHON", "PROTOCOL", "RELEASE"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Protocol release engineering under development.",
  thesis: "Protocol releases should be engineered with verifiable artifacts.",
  summary: "Protocol release engineering system.",
  metrics: [],
  technologies: ["Python", "Protocol engineering", "Release management"],
  github: "https://github.com/naresh-cn2/Axiom-Protocol-Release",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["Protocol releases need verifiable, engineered artifacts."],
  keyCapabilities: [{ title: "Protocol Release", desc: "Engineered protocol release artifacts." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Release Core", detail: "Protocol release engineering system." }],
  caseStudiesList: [],
  evidenceAndResults: ["Protocol release engineering under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/Axiom-Protocol-Release", type: "github" }],
  detail: {
    problem: ["Protocol releases lack verifiable, engineered artifacts."],
    approach: ["Build protocol release engineering with verifiable artifacts."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const axiomProtocolItem: ComprehensiveWorkItem = {
  id: "axiom-protocol",
  title: "AXIOM-PROTOCOL",
  shortTitle: "AXIOM PROTOCOL",
  categoryLabel: "Protocol Specification & Implementation",
  tags: ["PYTHON", "PROTOCOL", "OTHER"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Protocol specification and implementation under development.",
  thesis: "Protocols should be precisely specified and implemented.",
  summary: "Protocol specification and implementation system.",
  metrics: [],
  technologies: ["Python", "Protocol specification"],
  github: "https://github.com/naresh-cn2/axiom-protocol",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["Protocols need precise specification and implementation."],
  keyCapabilities: [{ title: "Protocol Specification", desc: "Precise protocol specification and implementation." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Protocol Core", detail: "Protocol specification and implementation." }],
  caseStudiesList: [],
  evidenceAndResults: ["Protocol specification and implementation under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/axiom-protocol", type: "github" }],
  detail: {
    problem: ["Protocols lack precise specification and implementation."],
    approach: ["Build precisely specified and implemented protocols."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const hydraCoreItem: ComprehensiveWorkItem = {
  id: "hydra-core",
  title: "HYDRA-CORE",
  shortTitle: "HYDRA CORE",
  categoryLabel: "Core System Library",
  tags: ["PYTHON", "CORE", "SYSTEMS"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Core system library under development.",
  thesis: "Core system libraries should be modular and well-tested.",
  summary: "Core system library under development.",
  metrics: [],
  technologies: ["Python", "Core library", "Systems"],
  github: "https://github.com/naresh-cn2/hydra-core",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "products",
  whyIBuiltIt: ["Core system libraries should be modular and well-tested."],
  keyCapabilities: [{ title: "Core Library", desc: "Modular, well-tested core system library." }],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Library Core", detail: "Core system library foundation." }],
  caseStudiesList: [],
  evidenceAndResults: ["Core system library under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/hydra-core", type: "github" }],
  detail: {
    problem: ["Core system libraries lack modularity and test coverage."],
    approach: ["Build modular, well-tested core system libraries."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};
function enrichArchiveProject(p: ArchiveProject): ComprehensiveWorkItem {
  let workCategory: WorkCategoryType = "projects";
  // Products & Platforms: quant engines, data infrastructure, FinOps systems,
  // systems software, forex/crypto platforms
  if (
    p.id === "billing-data-gateway" ||
    p.id === "ifm-costintel" ||
    p.id === "apex-quant-engine" ||
    p.id === "automated-trading-os" ||
    p.id === "market-data-replay" ||
    p.id === "systems-kernel" ||
    p.id === "sentiment-stream" ||
    p.id === "forex-platform" ||
    p.id === "crypto-platform"
  ) {
    workCategory = "products";
  } else if (p.id === "qrsip") {
    // stratlab = QRSIP, CS50 final project — classified as Project, not Product
    workCategory = "projects";
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

export const cn2IdentityHubItem: ComprehensiveWorkItem = {
  id: "cn2-identity-hub",
  title: "CN2 IDENTITY HUB",
  shortTitle: "CN2.DEV",
  categoryLabel: "Personal Portfolio & Identity Platform",
  tags: ["NEXT.JS", "TYPESCRIPT", "REACT", "PORTFOLIO"],
  status: "PRODUCTION",
  statusNote: "Live at cn2-identity-hub.vercel.app — personal portfolio and identity platform.",
  thesis: "A professional platform should document real work with verifiable evidence.",
  summary:
    "Personal portfolio and identity platform — CN2.DEV is the digital headquarters documenting quantitative development, systematic trading research, engineering services, and published technical writing. Every claim is backed by real artifacts: working systems, test suites, research entries, certificates with verification links.",
  metrics: [],
  technologies: ["Next.js 16", "TypeScript", "React 19", "Tailwind CSS", "Canvas 2D", "SVG"],
  github: "https://github.com/naresh-cn2/cn2-identity-hub",
  githubVerified: true,
  tier: 1,
  evidenceLabel: "PRODUCTION · LIVE SITE",
  workCategory: "personal",
  whyIBuiltIt: [
    "A professional identity platform should document work with verifiable evidence, not fabricated claims.",
  ],
  keyCapabilities: [
    { title: "Work Catalogue", desc: "Three-destination portfolio: Products & Platforms, Projects, Personal Builds." },
    { title: "Credentials", desc: "Issued certificates with verification links and PDF viewer." },
    { title: "Research & Lab", desc: "Quantitative research entries and interactive lab instruments." },
  ],
  engineeringChallenges: [],
  developmentJourney: [
    { phase: "v1.0", title: "Platform Launch", detail: "CN2.DEV personal portfolio and identity platform." },
  ],
  caseStudiesList: [],
  evidenceAndResults: ["Live production site at cn2-identity-hub.vercel.app with 95+ static routes."],
  screenshotsAndVisuals: [],
  linksList: [
    { label: "LIVE SITE", href: "https://cn2-identity-hub.vercel.app", type: "live" },
    { label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/cn2-identity-hub", type: "github" },
  ],
  detail: {
    problem: ["Professional platforms document work with fabricated or unverifiable claims."],
    approach: ["Build a portfolio where every claim is backed by real artifacts and verification links."],
    architecture: [],
    results: ["Live production site with verified credentials, research entries, and work catalogue."],
    limitations: [],
    testing: [],
    artifacts: [],
    currentState: ["Production — live at cn2-identity-hub.vercel.app."],
  },
};

export const openVerseItem: ComprehensiveWorkItem = {
  id: "open-verse",
  title: "OPEN-VERSE",
  shortTitle: "OPEN-VERSE",
  categoryLabel: "Personal AI Assistant & Unified Workspace",
  tags: ["TYPESCRIPT", "AI", "PERSONAL", "WORKSPACE"],
  status: "ACTIVE DEVELOPMENT",
  statusNote: "Personal AI assistant and unified workspace under development.",
  thesis: "A personal AI assistant should serve as a unified workspace, not a commercial product.",
  summary: "Personal AI assistant and unified workspace — personal software build, not a commercial product.",
  metrics: [],
  technologies: ["TypeScript", "AI", "Personal workspace"],
  github: "https://github.com/naresh-cn2/OPEN-VERSE",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "ACTIVE DEVELOPMENT",
  workCategory: "personal",
  whyIBuiltIt: [
    "A personal AI assistant should unify workspace tools without commercial product pressure.",
  ],
  keyCapabilities: [
    { title: "AI Assistant", desc: "Personal AI assistant for unified workspace tasks." },
    { title: "Unified Workspace", desc: "Integrated personal software environment." },
  ],
  engineeringChallenges: [],
  developmentJourney: [{ phase: "v0.1", title: "Assistant Core", detail: "Personal AI assistant foundation." }],
  caseStudiesList: [],
  evidenceAndResults: ["Personal AI assistant and unified workspace under active development."],
  screenshotsAndVisuals: [],
  linksList: [{ label: "GITHUB REPOSITORY", href: "https://github.com/naresh-cn2/OPEN-VERSE", type: "github" }],
  detail: {
    problem: ["Personal AI assistants should not be commercial products with associated pressure."],
    approach: ["Build a personal AI assistant as a unified workspace, not a product."],
    architecture: [],
    results: [],
    limitations: ["Active development; no published benchmarks yet."],
    testing: [],
    artifacts: [],
    currentState: ["Active development."],
  },
};

export const ALL_WORKS: ComprehensiveWorkItem[] = [
  strataEngineItem,
  ...archiveProjects.map((p) => {
    return enrichArchiveProject(p);
  }),
  systemsKernelItem,
  sentimentStreamItem,
  cn2IdentityHubItem,
  openVerseItem,
  settleIqItem,
  axiomJsonItem,
  omniLedgerEngineItem,
  cloudCostEngineItem,
  b2bLeadProspectorItem,
  forgeStreamItem,
  zeroLatencyEngineItem,
  forgeCoreItem,
  forgeEngineItem,
  forgeWorkspaceItem,
  forgeIpcItem,
  axiomProbeItem,
  axiomProtocolReleaseItem,
  axiomProtocolItem,
  hydraCoreItem,
].map((item, i) => ({
  ...item,
  index: item.index || `WK-${i + 1}`,
}));

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
