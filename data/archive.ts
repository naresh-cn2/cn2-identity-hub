import { flagshipProjects, type FlagshipProject } from "./projects";

/**
 * Unified build archive.
 *
 * Tier 1 = flagship systems with a full evidence case study.
 * Tier 2 = supporting engineering builds with the same chapter discipline
 *          at a smaller evidence surface.
 *
 * Every figure here is carried through from its source file and keeps its
 * provenance label. Nothing in this file introduces a new number.
 */

export type ArchiveCategory = string;

export const archiveCategories: ArchiveCategory[] = [
  "QUANT",
  "DATA",
  "AI",
  "ENGINEERING",
  "FINTECH",
  "RESEARCH",
  "TOOLS",
  "PYTHON",
  "C",
  "SYSTEMS",
  "IPC",
  "SHARED MEMORY",
  "LOW LATENCY",
  "TASK ORCHESTRATION",
  "HTTP",
  "DIAGNOSTICS",
  "PROTOCOL",
  "RELEASE",
  "OTHER",
  "CORE",
  "NEXT.JS",
  "TYPESCRIPT",
  "REACT",
  "PORTFOLIO",
  "PERSONAL",
  "WORKSPACE",
  "RECONCILIATION",
  "LEDGER",
  "FINOPS",
  "SCRAPING",
  "APIFY",
  "DATA INGESTION",
  "MMAP",
  "HIGH PERFORMANCE",
];

export interface ArchiveMetric {
  value: string;
  label: string;
  context: string;
}

export interface ArchStep {
  name: string;
  role: string;
  detail?: string[];
}

/** Chapter payload for a tier-2 build — same language as the flagship case study. */
export interface TierTwoDetail {
  problem: string[];
  approach: string[];
  architecture: ArchStep[];
  results: string[];
  limitations: string[];
  testing: string[];
  artifacts: string[];
  currentState: string[];
}

export interface ArchiveProject {
  id: string;
  /** Optional display index — defaults are generated for ad-hoc catalogue entries. */
  index?: string;
  title: string;
  shortTitle: string;
  categoryLabel: string;
  tags: ArchiveCategory[];
  status: string;
  statusNote?: string;
  thesis: string;
  summary: string;
  metrics: ArchiveMetric[];
  technologies: string[];
  github?: string;
  githubVerified: boolean;
  tier: 1 | 2;
  /** Provenance tag shown next to every figure on this project. */
  evidenceLabel: string;
  detail?: TierTwoDetail;
}

const FLAGSHIP_TAGS: Record<string, ArchiveCategory[]> = {
  "apex-quant-engine": ["QUANT", "RESEARCH"],
  "automated-trading-os": ["QUANT", "ENGINEERING"],
  "market-data-replay": ["DATA", "ENGINEERING"],
  qrsip: ["RESEARCH", "TOOLS"],
};

const FLAGSHIP_EVIDENCE: Record<string, string> = {
  "apex-quant-engine": "BACKTEST · SIMULATION",
  "automated-trading-os": "PAPER · STRUCTURAL TEST",
  "market-data-replay": "TEST SUITE · DETERMINISM",
  qrsip: "TEST SUITE · 352 TESTS",
};

function fromFlagship(p: FlagshipProject): ArchiveProject {
  return {
    id: p.id,
    index: p.index,
    title: p.title,
    shortTitle: p.shortTitle,
    categoryLabel: p.category,
    tags: FLAGSHIP_TAGS[p.id] ?? ["QUANT"],
    status: p.status,
    statusNote: p.statusNote,
    thesis: p.thesis,
    summary: p.summary,
    metrics: p.results.metrics,
    technologies: p.technologies,
    github: p.github,
    githubVerified: true,
    tier: 1,
    evidenceLabel: FLAGSHIP_EVIDENCE[p.id] ?? "EVIDENCE",
  };
}

const billingDataGateway: ArchiveProject = {
  id: "billing-data-gateway",
  index: "05",
  title: "BILLING DATA GATEWAY",
  shortTitle: "BILLING GATEWAY",
  categoryLabel: "ZERO-DEPENDENCY FINANCIAL DATA ENGINE (C11)",
  tags: ["FINTECH", "ENGINEERING", "DATA"],
  status: "RELEASED v1.0.0",
  statusNote:
    "Tagged release. Throughput figures are self-benchmarked on the project's own harness — see the repository for methodology.",
  thesis:
    "Financial cost data should be normalized at memory speed, without a framework, without dependencies, and without losing a digit.",
  summary:
    "A zero-dependency C11 utility that normalizes multi-cloud cost exports (AWS CUR 2.0 and Azure) into an intermediate financial model, using POSIX memory address page projections rather than a heavier stack.",
  metrics: [
    { value: "487,421", label: "RECORDS / SEC", context: "SELF-BENCHMARK — SELF-MEASURED THROUGHPUT" },
    { value: "31.89", label: "MB / SEC", context: "SELF-BENCHMARK — SELF-MEASURED THROUGHPUT" },
    { value: "2,051", label: "NS PER RECORD", context: "SELF-BENCHMARK — SELF-MEASURED LATENCY" },
  ],
  technologies: ["C11", "POSIX API", "Memory-mapped I/O", "-O3 build"],
  github: "https://github.com/CloudOps-Financial-Platform/billing-data-gateway",
  githubVerified: true,
  tier: 2,
  evidenceLabel: "SELF-BENCHMARK · RELEASED",
  detail: {
    problem: [
      "Multi-cloud cost exports arrive in different schemas — AWS CUR 2.0 and Azure Cost Management do not agree on shape, naming or granularity.",
      "Reconciling them in a high-level runtime means paying a per-record interpretation cost on data volumes measured in millions of rows, and depending on a large toolchain to do it.",
    ],
    approach: [
      "Normalize both export formats into a single intermediate financial model at the point of ingestion.",
      "Eliminate the interpretation layer by projecting POSIX memory address pages directly over the input, so records are read in place rather than parsed into objects.",
      "Keep the build at zero third-party dependencies so the binary is the whole dependency graph.",
    ],
    architecture: [
      {
        name: "SOURCE EXPORTS",
        role: "Untouched vendor cost exports",
        detail: ["AWS CUR 2.0", "Azure Cost Management"],
      },
      {
        name: "PAGE PROJECTION",
        role: "Read in place, no copy",
        detail: ["POSIX mmap", "Address-page projection"],
      },
      {
        name: "FORMAT ADAPTERS",
        role: "Per-source field mapping",
        detail: ["Column resolution", "Type coercion"],
      },
      {
        name: "INTERMEDIATE MODEL",
        role: "Canonical financial record",
        detail: ["Single schema", "Query-ready"],
      },
      {
        name: "EMIT",
        role: "Downstream consumable output",
        detail: ["Bulk write", "No framework"],
      },
    ],
    results: [
      "The binary normalizes multi-cloud cost exports at self-measured throughput of 487,421 records/sec and 31.89 MB/sec.",
      "Per-record cost measured at 2,051 ns on the project's own harness.",
      "Dependency graph reduced to the C standard library and POSIX.",
    ],
    limitations: [
      "Throughput figures are self-measured on the project's own harness and are hardware, compiler and dataset dependent — they are not an independent third-party benchmark.",
      "Record and byte rates apply to the shapes benchmarked; other export variants or column mixes are not represented by these numbers.",
      "The C11 implementation trades operator ergonomics for speed; changing the record schema means recompiling, not reconfiguring.",
    ],
    testing: [
      "Correctness is exercised against representative export fixtures for both cloud providers.",
      "Benchmark methodology and dataset characteristics are published alongside the figures in the repository.",
    ],
    artifacts: [
      "Released v1.0.0 tag with the C11 source tree.",
      "Benchmark harness producing the throughput and latency figures quoted here.",
      "Normalization specification for the intermediate financial model.",
    ],
    currentState: [
      "v1.0.0 released and available in its repository.",
      "Figures come from the repository's published self-benchmark.",
    ],
  },
};

const ifmCostIntel: ArchiveProject = {
  id: "ifm-costintel",
  index: "06",
  title: "IFM-COSTINTEL",
  shortTitle: "COSTINTEL",
  categoryLabel: "FINANCIAL INTELLIGENCE LAYER OVER ENTERPRISE COST DATA",
  tags: ["FINTECH", "DATA", "AI"],
  status: "ACTIVE DEVELOPMENT",
  statusNote:
    "In progress. No published benchmark has been released for this system yet.",
  thesis:
    "Enterprise cost data is a signal, not a report — it should support querying, anomaly detection and optimization decisions, not just monthly totals.",
  summary:
    "An intelligence layer that ingests and processes large enterprise cost datasets, transforming raw multi-cloud expenditure into structured intermediate financial models built for querying, anomaly detection and optimization decisions.",
  metrics: [],
  technologies: ["Python", "Intermediate financial model", "Anomaly detection", "Query layer"],
  github: "https://github.com/naresh-cn2",
  githubVerified: false,
  tier: 2,
  evidenceLabel: "IN DEVELOPMENT · NO PUBLISHED BENCHMARK",
  detail: {
    problem: [
      "Cost data is typically reduced to periodic reports, which discards the structure needed to ask follow-up questions.",
      "Detecting spend anomalies requires the raw expenditure signal to be queryable at the granularity the anomaly lives at.",
    ],
    approach: [
      "Ingest enterprise cost datasets into a structured intermediate financial model rather than a reporting table.",
      "Expose the model for querying so anomalies and optimization candidates can be derived rather than hand-assembled.",
    ],
    architecture: [
      {
        name: "COST INGEST",
        role: "Enterprise expenditure intake",
        detail: ["Multi-cloud sources", "Bulk load"],
      },
      {
        name: "STRUCTURING",
        role: "Model over raw records",
        detail: ["Intermediate financial model", "Query-oriented shape"],
      },
      {
        name: "ANALYSIS",
        role: "Derive signals from spend",
        detail: ["Anomaly detection", "Optimization candidates"],
      },
      {
        name: "SURFACE",
        role: "Decision-ready output",
        detail: ["Query results", "Structured findings"],
      },
    ],
    results: [
      "The ingestion and structuring pipeline is implemented and under active development.",
      "In development. No throughput, accuracy or cost-saving figure has been published for this system yet.",
    ],
    limitations: [
      "No public benchmark exists for this system. Any performance statement would be unsupported.",
      "Anomaly detection output depends on the structuring model's choices and has not been validated against a labelled cost dataset.",
      "The repository is not yet publicly linked, so the code is not independently inspectable at this time.",
    ],
    testing: [
      "Development-stage verification only. There is no published test suite result for this system.",
    ],
    artifacts: [
      "Intermediate financial model definition for enterprise cost data.",
      "Ingestion pipeline for multi-cloud expenditure datasets.",
    ],
    currentState: [
      "ACTIVE DEVELOPMENT — no release tag, no published benchmark, repository not yet public.",
    ],
  },
};

const forexPlatform: ArchiveProject = {
  id: "forex-platform",
  index: "07",
  title: "FOREX PLATFORM",
  shortTitle: "FOREX PLATFORM",
  categoryLabel: "QUANTITATIVE FX RESEARCH FRAMEWORK (PYTHON)",
  tags: ["QUANT", "RESEARCH", "FINTECH"],
  status: "ACTIVE VALIDATION",
  statusNote:
    "Research-only platform. The 3-year, 4-pair, 5-set validation campaign is processing — no strategy is authorized for live execution, and live capital is $0.",
  thesis:
    "Foreign-exchange structure is fractal — one causal state ladder from monthly to 3-minute can carry bias, setup and entry without look-ahead.",
  summary:
    "An institutional-grade quantitative foreign exchange platform for systematic research, session microstructure analysis, risk governance and algorithmic execution: a single causally consistent 7-timeframe structural ladder (1M → 3M) built from Dukascopy M1 bars, five overlapping observation sets arbitrated by net structural R:R, and a predeclared four-gate elimination funnel every candidate must clear on unseen data.",
  metrics: [
    { value: "1.03M", label: "M1 BARS / PAIR", context: "APPROX. DUKASCOPY COVERAGE — 2024-01 → 2026-10" },
    { value: "7", label: "TIMEFRAME LADDER", context: "CLOSED-BAR DESIGN — 1M DOWN TO 3M" },
    { value: "$0.00", label: "LIVE CAPITAL", context: "RESEARCH ONLY — NO STRATEGY AUTHORIZED" },
  ],
  technologies: ["Python 3.12", "Dukascopy M1 BID/ASK", "Event-driven backtester", "pytest"],
  github: "https://github.com/Quantitative-Systems/Forex-platform",
  githubVerified: true,
  tier: 2,
  evidenceLabel: "RESEARCH · VALIDATION IN PROGRESS",
  detail: {
    problem: [
      "Single-timeframe strategies ignore macro structure — a lower-timeframe trigger against the higher-timeframe trend is counter-trend noise with a high false-breakout rate.",
      "Parameters chosen against the same history that reports the result produce edges that evaporate on unseen data once partitions and costs are declared after the fact.",
    ],
    approach: [
      "Construct one causally consistent state ladder from monthly to 3-minute over raw M1 vendor bars: each closed bar updates exactly one state, and no forward-looking information enters the model.",
      "Arbitrate signals from five overlapping three-timeframe sets by net structural R:R, so a single causal portfolio competes with itself instead of five independent strategies.",
      "Declare chronological 60/20/20 partitions and a four-gate elimination funnel before any parameter is touched — a candidate only advances by clearing every gate on unseen data.",
    ],
    architecture: [
      {
        name: "M1 VENDOR INTAKE",
        role: "Dukascopy BID/ASK bars with provenance gates",
        detail: ["OHLC and anomaly checks", "No synthetic fabrication or forward-fill"],
      },
      {
        name: "CAUSAL LADDER",
        role: "Seven closed-bar timeframes, no look-ahead",
        detail: ["1M → 1W → 1D → 4H → 1H → 15M → 3M", "One state update per close"],
      },
      {
        name: "MARKET MODEL",
        role: "Strategy-agnostic structure and zones",
        detail: ["Swings · BOS · CHoCH", "Premium / discount dealing ranges"],
      },
      {
        name: "SET ARBITRATION",
        role: "Five overlapping views compete by R:R",
        detail: ["SET 1 macro → SET 5 session", "Single winner per movement"],
      },
      {
        name: "STRATEGY HARNESS",
        role: "Frozen institutional rider parameters",
        detail: ["Two-stage OTE entry", "ATR-buffered structural stops"],
      },
      {
        name: "GATE FUNNEL",
        role: "Predeclared elimination on unseen data",
        detail: ["60/20/20 chronological split", "Four gates — all must pass"],
      },
    ],
    results: [
      "All institutional upgrades are implemented and verified: two-stage OTE entry, ATR stop buffering, +2.0R break-even, +3.5R structural trailing, unified session liquidity filter and higher-timeframe correlation filter.",
      "The full 3-year, 4-pair, 5-set batch validation campaign is processing; no gate results are published for it yet.",
      "Live capital is $0.00 — no strategy is authorized for live execution until it clears every predeclared gate on unseen data.",
    ],
    limitations: [
      "No published performance results yet: the current validation campaign is still processing, so any expectancy figure would be unsupported.",
      "Historical coverage is Dukascopy M1 bars for four pairs from 2024-01 onward — other brokers, pairs and periods are not represented.",
      "Costs (spread, commission, slippage) are modeled assumptions rather than executed fills; live liquidity can exceed modeled tolerances.",
    ],
    testing: [
      "Unit and integration suites run under pytest from the repository's tests/ directory.",
      "Intake quality gates verify OHLC and quote anomalies, report midweek gaps, and reject unexplained gaps over 5 minutes.",
    ],
    artifacts: [
      "MIT-licensed repository: causal engine, market model, strategy harness, cost, risk and portfolio engines.",
      "Batch campaign runner, parameter sweeper and terminal report generation for the 5-set × 4-pair validation.",
      "Documentation set: architecture, strategy catalog, product roadmap and research outcomes.",
    ],
    currentState: [
      "Actively developed — repository public under MIT, last push 13 October 2026.",
      "Fractal structural rider campaign in active validation; results publish through the repository's report and results files.",
    ],
  },
};

const cryptoPlatform: ArchiveProject = {
  id: "crypto-platform",
  index: "08",
  title: "CRYPTO PLATFORM",
  shortTitle: "CRYPTO PLATFORM",
  categoryLabel: "AUTONOMOUS DIGITAL-ASSET TRADING & RESEARCH PLATFORM (PYTHON)",
  tags: ["QUANT", "FINTECH", "ENGINEERING"],
  status: "PAPER OPERATIONAL",
  statusNote:
    "Core engine, risk governor, web workstation and Android client implemented and tested in CI. Live exchange execution is intentionally disabled — real capital is pinned to $0.00.",
  thesis:
    "Market state should be modeled once, across scales — the authoritative engine owns state, risk and execution, and clients consume its contracts rather than their own calculations.",
  summary:
    "An institutional-grade autonomous cryptocurrency trading platform: a single Python 3.12 backend models market structure across a continuous 7-timeframe ladder and five overlapping observation sets, freezes research under a SHA-256 contract, enforces fail-closed risk governance, and serves identical state contracts to an institutional web workstation and a native Android client over REST and WebSocket.",
  metrics: [
    { value: "9,608", label: "CANDIDATE RECORDS", context: "HISTORICAL RESEARCH — PHASE Q.2 BASELINE" },
    { value: "+0.8885R", label: "EXPECTANCY · CONF ≥ 0.60", context: "BACKTEST SIMULATION — NOT LIVE PERFORMANCE" },
    { value: "4.918", label: "PROFIT FACTOR · CONF ≥ 0.60", context: "BACKTEST SIMULATION — NOT LIVE PERFORMANCE" },
  ],
  technologies: ["Python 3.12 · aiohttp", "SQLite WAL persistence", "Kotlin · Jetpack Compose", "GitHub Actions CI"],
  github: "https://github.com/Quantitative-Systems/crypto-platform",
  githubVerified: true,
  tier: 2,
  evidenceLabel: "TEST SUITE · 300/300 TESTS",
  detail: {
    problem: [
      "Strategies developed in notebooks are rewritten for execution in another language, introducing unmodeled latency and divergence between research behavior and live behavior.",
      "Single-timeframe strategies ignore macro structural trend and higher-timeframe liquidity pools, which surfaces as false breakouts.",
      "Client-computed state lets two views of the same market disagree about risk.",
    ],
    approach: [
      "Keep 100% of market state generation, risk validation and execution logic in one authoritative Python engine; the web workstation and Android client are stateless projections over shared REST and WebSocket contracts.",
      "Model structure once on a continuous closed-bar 7-timeframe ladder and observe it through five overlapping three-timeframe sets — state updates only on closed candles, entries execute at next bar open.",
      "Freeze alpha models and risk boundaries under a SHA-256 research contract, validate every candidate against a ≥ 4.0R destination floor with ≤ 1.0% per-trade risk and ≤ 3.0% portfolio heat, and pin real capital to $0.00 behind a fail-closed gate.",
    ],
    architecture: [
      {
        name: "INGESTION",
        role: "Binance public feeds, timestamp-verified",
        detail: ["Tick validation against UTC", "7-timeframe candle engine"],
      },
      {
        name: "STATE ENGINE",
        role: "Swings, breaks, zones and phase",
        detail: ["CHOCH / BOS · FVG · order blocks", "5 overlapping observation sets"],
      },
      {
        name: "DECISION ENGINE",
        role: "Frozen contract, confidence gating",
        detail: ["Contract SHA-256 8fbc923a…", "Confidence ≥ 0.50 to proceed"],
      },
      {
        name: "RISK GOVERNOR",
        role: "Pre-trade capital controls",
        detail: ["≥ 4.0R destination floor", "≤ 1.0% trade · ≤ 3.0% heat"],
      },
      {
        name: "CAPITAL GATE",
        role: "Fail-closed live authorization",
        detail: ["Real capital $0.00", "Live order submission disabled"],
      },
      {
        name: "SERVER & CLIENTS",
        role: "One state contract, two clients",
        detail: ["21 REST endpoints · WebSocket", "Web workstation · Android"],
      },
    ],
    results: [
      "CI passes 300/300 Python tests with 9,608/9,608 tick-invariant replay confirmed on every run.",
      "Historical research baseline over 9,608 mapped candidate records across BTC, ETH, SOL and BNB (July 2020 onward): the confidence ≥ 0.60 cohort reports +0.8885R expectancy and 4.918 profit factor as backtested figures.",
      "The published Phase Q.2 analysis reports the model pruning 80.18% of baseline losses (3,907 of 4,873).",
      "Paper simulation is operational with 10 bps taker fees, 4 bps slippage and adverse-first intrabar stop collision.",
    ],
    limitations: [
      "All expectancy, profit-factor and win-rate figures are historical backtest simulations; live exchange execution is intentionally disabled and real capital is pinned to $0.00.",
      "Evaluations cover high-liquidity assets (BTC, ETH, SOL, BNB) — other pairs may behave differently, and modeled slippage can be exceeded in liquidity gaps.",
      "Cloud staging is configured but not provisioned; the Android release APK builds with R8 but is debug-signed, so store distribution is incomplete.",
    ],
    testing: [
      "The full pytest suite — unit, integration and invariant regression — runs in GitHub Actions alongside repository secret scanning.",
      "python cli.py verify-contract re-checks the frozen research contract digest (8fbc923a…) on demand.",
      "Restart recovery exercises idempotent order reconciliation against SQLite WAL and dual JSON checkpoints.",
    ],
    artifacts: [
      "MIT-licensed repository: Python engine, aiohttp server, web workstation, native Android client, docs and research reports.",
      "CI workflows for Python tests, Android debug/staging/release builds and secret scanning.",
      "Append-only decision ledger with SHA-256 event lineage and frozen research contracts.",
    ],
    currentState: [
      "Actively developed — repository public under MIT, last push 11 October 2026.",
      "Paper mode operational with CI green; live execution fail-closed at $0.00, with a hardware authorization module for any future capital unlock on the roadmap.",
    ],
  },
};

const strataEngine: ArchiveProject = {
  id: "strata-engine",
  index: "01",
  title: "STRATA-ENGINE",
  shortTitle: "STRATA-ENGINE",
  categoryLabel: "QUANTITATIVE STRATEGY & RISK EXECUTION PLATFORM (RUST / C++)",
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

const systemsKernel: ArchiveProject = {
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

const sentimentStream: ArchiveProject = {
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

export const archiveProjects: ArchiveProject[] = [
  ...flagshipProjects.map(fromFlagship),
  billingDataGateway,
  ifmCostIntel,
  forexPlatform,
  cryptoPlatform,
];

export const allArchiveProjects: ArchiveProject[] = [
  strataEngine,
  ...archiveProjects,
  systemsKernel,
  sentimentStream,
];

export function getArchiveProject(id: string): ArchiveProject | undefined {
  return allArchiveProjects.find((p) => p.id === id);
}

export function getFlagship(id: string): FlagshipProject | undefined {
  return flagshipProjects.find((p) => p.id === id);
}
