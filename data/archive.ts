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

export type ArchiveCategory =
  | "QUANT"
  | "DATA"
  | "AI"
  | "ENGINEERING"
  | "FINTECH"
  | "RESEARCH"
  | "TOOLS";

export const archiveCategories: ArchiveCategory[] = [
  "QUANT",
  "DATA",
  "AI",
  "ENGINEERING",
  "FINTECH",
  "RESEARCH",
  "TOOLS",
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
  index: string;
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
      "Figures quoted on this page are carried from the repository's published self-benchmark, not re-measured for this page.",
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
    "In progress. No published benchmark or performance claim is made for this system — the repository is the only current evidence surface.",
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
      "No throughput, accuracy or cost-saving figure is claimed here, because none has been published.",
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
      "ACTIVE DEVELOPMENT — no release tag, no published benchmark.",
      "Listed here for completeness of the archive; the evidence surface is intentionally thin.",
    ],
  },
};

export const archiveProjects: ArchiveProject[] = [
  ...flagshipProjects.map(fromFlagship),
  billingDataGateway,
  ifmCostIntel,
];

export function getArchiveProject(id: string): ArchiveProject | undefined {
  return archiveProjects.find((p) => p.id === id);
}

export function getFlagship(id: string): FlagshipProject | undefined {
  return flagshipProjects.find((p) => p.id === id);
}
