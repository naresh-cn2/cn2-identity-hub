export interface Capability {
  id: string;
  name: string;
  description: string;
  projects: string[];
  research: string[];
  technologies: string[];
}

export const capabilities: Capability[] = [
  {
    id: "quant-research",
    name: "QUANTITATIVE RESEARCH",
    description:
      "Forming falsifiable market hypotheses and testing them with deterministic experiments — evidence before conclusions.",
    projects: ["apex-quant-engine", "qrsip"],
    research: ["backtest-overfitting", "regime-dependence"],
    technologies: ["Hypothesis workflow", "Statistical evaluation", "Deterministic fixtures"],
  },
  {
    id: "market-data",
    name: "MARKET DATA",
    description:
      "Point-in-time safe market-data infrastructure: ingestion, normalization, validation and deterministic replay.",
    projects: ["market-data-replay"],
    research: ["lookahead-bias", "decimal-arithmetic"],
    technologies: ["SQLite WAL", "Nanosecond timestamps", "Exact decimals"],
  },
  {
    id: "systematic-trading",
    name: "SYSTEMATIC TRADING",
    description:
      "Rule-based multi-strategy trading architectures where entries, exits and sizing are code, not discretion.",
    projects: ["apex-quant-engine", "automated-trading-os"],
    research: ["multi-timeframe-alignment"],
    technologies: ["Multi-strategy engines", "Signal contracts", "Paper execution"],
  },
  {
    id: "backtesting",
    name: "BACKTESTING",
    description:
      "Deterministic simulation over historical bars with explicit fees and slippage — reproducible run to run.",
    projects: ["apex-quant-engine"],
    research: ["backtest-overfitting", "lookahead-bias"],
    technologies: ["Deterministic replay", "Cost modelling", "11.9M+ bar harness"],
  },
  {
    id: "risk",
    name: "RISK",
    description:
      "Risk-first position sizing and structural controls: caps, R:R floors, profit locks and giveback limits.",
    projects: ["automated-trading-os"],
    research: ["risk-first-sizing"],
    technologies: ["1% risk cap", "1:4 R:R floor", "Cost-budget filtering"],
  },
  {
    id: "data-infrastructure",
    name: "DATA INFRASTRUCTURE",
    description:
      "High-throughput data pipelines: ingestion, transformation and query layers built for scale and exactness.",
    projects: ["market-data-replay", "billing-data-gateway"],
    research: ["decimal-arithmetic"],
    technologies: ["487,421 rec/s pipeline", "POSIX mmap", "Zero-dependency C11"],
  },
  {
    id: "performance-engineering",
    name: "PERFORMANCE ENGINEERING",
    description:
      "Low-latency systems work — memory-mapped I/O, serialization elimination and bare-metal throughput.",
    projects: ["billing-data-gateway"],
    research: [],
    technologies: ["C11", "POSIX API", "-O3 optimization"],
  },
  {
    id: "ai-intelligence",
    name: "AI / COMPUTATIONAL INTELLIGENCE",
    description:
      "Applying computational methods where they carry their weight — classification, pattern detection, automation.",
    projects: ["qrsip"],
    research: [],
    technologies: ["Python", "Automation pipelines"],
  },
];
