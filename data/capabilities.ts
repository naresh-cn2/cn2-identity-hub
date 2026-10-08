export type CapabilityDomain = "QUANT" | "DATA" | "ENGINEERING" | "AI" | "FINTECH" | "RESEARCH";

export interface Capability {
  id: string;
  name: string;
  description: string;
  projects: string[];
  research: string[];
  technologies: string[];
  domain: CapabilityDomain;
  evidence: string;
}

export const capabilityDomains: CapabilityDomain[] = [
  "QUANT",
  "DATA",
  "ENGINEERING",
  "AI",
  "FINTECH",
  "RESEARCH",
];

export const capabilities: Capability[] = [
  {
    id: "quant-research",
    name: "QUANTITATIVE RESEARCH",
    domain: "RESEARCH",
    description:
      "Forming falsifiable market hypotheses and testing them with deterministic experiments — evidence before conclusions.",
    projects: ["apex-quant-engine", "qrsip"],
    research: ["backtest-overfitting", "regime-dependence"],
    technologies: ["Hypothesis workflow", "Statistical evaluation", "Deterministic fixtures"],
    evidence:
      "Written up as \"Reproducibility as an Overfitting Defense\" and \"Regime Dependence in Strategy Populations\", tested against the apex-quant-engine fixture harness.",
  },
  {
    id: "market-data",
    name: "MARKET DATA",
    domain: "DATA",
    description:
      "Point-in-time safe market-data infrastructure: ingestion, normalization, validation and deterministic replay.",
    projects: ["market-data-replay"],
    research: ["lookahead-bias", "decimal-arithmetic"],
    technologies: ["SQLite WAL", "Nanosecond timestamps", "Exact decimals"],
    evidence:
      "market-data-replay ingests into SQLite WAL with nanosecond timestamps and exact decimals, and replays it deterministically.",
  },
  {
    id: "systematic-trading",
    name: "SYSTEMATIC TRADING",
    domain: "QUANT",
    description:
      "Rule-based multi-strategy trading architectures where entries, exits and sizing are code, not discretion.",
    projects: ["apex-quant-engine", "automated-trading-os"],
    research: ["multi-timeframe-alignment"],
    technologies: ["Multi-strategy engines", "Signal contracts", "Paper execution"],
    evidence:
      "apex-quant-engine and automated-trading-os implement multi-strategy engines, signal contracts and paper execution as code.",
  },
  {
    id: "backtesting",
    name: "BACKTESTING",
    domain: "QUANT",
    description:
      "Deterministic simulation over historical bars with explicit fees and slippage — reproducible run to run.",
    projects: ["apex-quant-engine"],
    research: ["backtest-overfitting", "lookahead-bias"],
    technologies: ["Deterministic replay", "Cost modelling", "11.9M+ bar harness"],
    evidence:
      "The apex-quant-engine harness simulates 11.9M+ bars with explicit cost modelling, and \"Lookahead Bias as an Engineering Failure\" documents the failure modes it guards against.",
  },
  {
    id: "risk",
    name: "RISK",
    domain: "QUANT",
    description:
      "Risk-first position sizing and structural controls: caps, R:R floors, profit locks and giveback limits.",
    projects: ["automated-trading-os"],
    research: ["risk-first-sizing"],
    technologies: ["1% risk cap", "1:4 R:R floor", "Cost-budget filtering"],
    evidence:
      "automated-trading-os enforces a 1% risk cap, a 1:4 R:R floor and cost-budget filtering, with the reasoning written up in \"Position Sizing Before Admission\".",
  },
  {
    id: "data-infrastructure",
    name: "DATA INFRASTRUCTURE",
    domain: "DATA",
    description:
      "High-throughput data pipelines: ingestion, transformation and query layers built for scale and exactness.",
    projects: ["market-data-replay", "billing-data-gateway"],
    research: ["decimal-arithmetic"],
    technologies: ["487,421 rec/s pipeline", "POSIX mmap", "Zero-dependency C11"],
    evidence:
      "billing-data-gateway's zero-dependency C11 pipeline sustains 487,421 rec/s over POSIX mmap, and \"Exact Decimal Arithmetic in Market Data\" covers the exactness side.",
  },
  {
    id: "performance-engineering",
    name: "PERFORMANCE ENGINEERING",
    domain: "ENGINEERING",
    description:
      "Low-latency systems work — memory-mapped I/O, serialization elimination and bare-metal throughput.",
    projects: ["billing-data-gateway"],
    research: [],
    technologies: ["C11", "POSIX API", "-O3 optimization"],
    evidence:
      "billing-data-gateway is written in C11 against the POSIX API and built at -O3, eliminating serialization from the hot path.",
  },
  {
    id: "ai-intelligence",
    name: "AI / COMPUTATIONAL INTELLIGENCE",
    domain: "AI",
    description:
      "Applying computational methods where they carry their weight — classification, pattern detection, automation.",
    projects: ["qrsip"],
    research: [],
    technologies: ["Python", "Automation pipelines"],
    evidence:
      "qrsip applies Python automation pipelines to classification and pattern detection over the research archive.",
  },
];
