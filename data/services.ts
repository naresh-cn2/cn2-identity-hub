import { capabilities, type Capability } from "./capabilities";
import { getArchiveProject, type ArchiveProject } from "./archive";
import { researchEntries, type ResearchEntry } from "./research";

/**
 * Single source of truth for client-facing services (spec §12, §20).
 *
 * Every service is anchored to a real capability — the capability carries the
 * evidence (projects, research, methods), and this module adds the engagement
 * shape: what the client receives, where the scope stops, and what is honestly
 * NOT claimed. Nothing here invents clients, contracts or outcomes.
 */

/** Category families shown on /services — one schematic drawing per family. */
export type ServiceCategory = "research" | "data" | "systems" | "ai";

export interface ServiceCategoryMeta {
  id: ServiceCategory;
  /** Family label, matching the vocabulary the services page already uses. */
  label: string;
  /** Which schematic drawing illustrates this family. */
  schematic: "strategy-eval" | "pipeline" | "architecture" | "flow";
  /** True when the drawing could be mistaken for measured results. */
  illustrative: boolean;
}

export const serviceCategories: Record<ServiceCategory, ServiceCategoryMeta> = {
  research: {
    id: "research",
    label: "QUANTITATIVE RESEARCH",
    schematic: "strategy-eval",
    illustrative: true,
  },
  data: { id: "data", label: "DATA ENGINEERING", schematic: "pipeline", illustrative: false },
  systems: {
    id: "systems",
    label: "SOFTWARE DEVELOPMENT",
    schematic: "architecture",
    illustrative: false,
  },
  ai: { id: "ai", label: "AI-ASSISTED AUTOMATION", schematic: "flow", illustrative: false },
};

export interface ServiceOffering {
  /** Route slug — /services/<slug>. Stable identifier. */
  slug: string;
  /** Capability id this service is grounded in. */
  capabilityId: string;
  /** Category family — selects the schematic and the grouping on /services. */
  category: ServiceCategory;
  /** Short promise shown on the service index. */
  promise: string;
  /** The problem shape this service exists to address. */
  problems: string[];
  /** Engagement stages in order — condensed from the deliverables below. */
  process: string[];
  /** Concrete artifacts handed over at the end of an engagement. */
  deliverables: string[];
  /** Explicitly out of scope — the boundary of the offer. */
  outOfScope: string[];
  /** Honest limitations of the offer itself. */
  limitations: string[];
}

const SERVICES: ServiceOffering[] = [
  {
    slug: "quantitative-research-prototypes",
    capabilityId: "quant-research",
    category: "research",
    promise: "Falsifiable market questions turned into deterministic, reproducible experiments.",
    problems: [
      "A strategy idea that looks promising but has no registered hypothesis and no test that could disprove it.",
      "Results that cannot be regenerated — every run differs, so nothing can be trusted or reviewed.",
      "Research that ends in a number with no stated method behind it: no cost model, no artifact, no limitations.",
    ],
    process: [
      "REGISTER THE HYPOTHESIS",
      "FIX THE EVIDENCE STANDARD",
      "RUN THE DETERMINISTIC EXPERIMENT",
      "WRITE THE REPORT — INCLUDING NEGATIVES",
    ],
    deliverables: [
      "A registered hypothesis and an agreed evidence standard, fixed before data is touched.",
      "A deterministic experiment harness whose outputs regenerate byte-identically.",
      "A written report: method, evidence, result, limitation, conclusion — including negative results.",
    ],
    outOfScope: [
      "Live trading deployment or capital allocation.",
      "Guaranteed performance outcomes or return targets.",
      "Fund management, advisory mandates or regulated investment activity.",
    ],
    limitations: [
      "A prototype proves an idea is testable — it does not prove the idea is tradeable.",
      "Backtest evidence is historical and cost-modelled; it is never presented as live performance.",
      "Scope is bounded by the data available: if the data cannot answer the question, the report says so.",
    ],
  },
  {
    slug: "market-data-infrastructure",
    capabilityId: "market-data",
    category: "data",
    promise: "Point-in-time correct market-data pipelines with deterministic replay.",
    problems: [
      "Vendor and internal data that disagree with each other with no canonical model.",
      "Silent lookahead: reads that can reach future information and quietly invalidate research.",
      "Replays that cannot be reproduced, so bugs and anomalies cannot be investigated after the fact.",
    ],
    process: [
      "INGEST",
      "VALIDATE",
      "QUARANTINE FAILURES",
      "CANONICAL MODEL",
      "DETERMINISTIC REPLAY",
    ],
    deliverables: [
      "An ingestion → validation → quarantine pipeline with explicit failure states.",
      "A canonical model with exact-decimal storage and nanosecond timestamps where the source supports them.",
      "Deterministic replay plus adversarial tests written to extract the future rather than confirm correctness.",
    ],
    outOfScope: [
      "Exchange data licensing or redistribution rights negotiation.",
      "Vendor selection on your behalf — recommendations are advisory, contracts are yours.",
      "Real-time trading signal delivery at exchange co-location scale.",
    ],
    limitations: [
      "Point-in-time correctness is provable for the sources ingested; historical gaps in the source remain gaps.",
      "Determinism is verified for the pipeline, not for upstream vendor revisions to historical data.",
      "Performance figures are measured on the stated hardware with the stated methodology.",
    ],
  },
  {
    slug: "systematic-trading-systems",
    capabilityId: "systematic-trading",
    category: "systems",
    promise: "Multi-strategy architectures where entries, exits and risk are code, not discretion.",
    problems: [
      "Discretionary execution that cannot be audited, replayed or reviewed after the fact.",
      "Risk controls that exist as conventions instead of structural invariants enforced before an order exists.",
      "Costs that are assumed rather than modelled, so paper results evaporate on contact with fees and slippage.",
    ],
    process: [
      "SIGNAL CONTRACT",
      "STRUCTURAL RISK GATES",
      "EXPLICIT COST MODEL",
      "PAPER EXECUTION AS THE DEFAULT",
    ],
    deliverables: [
      "A signal-contract architecture separating data, signal, risk and execution concerns.",
      "Structural risk gates: position sizing, R:R floors, cost-budget filters — enforced in code.",
      "Deterministic backtesting with explicit fees and slippage, plus paper execution as the honest default.",
    ],
    outOfScope: [
      "Connection to a live brokerage account with real capital.",
      "Proprietary strategy alpha — the architecture is yours; the signals are the question we research together.",
      "Custody, funding or account operations of any kind.",
    ],
    limitations: [
      "All performance evidence is BACKTEST or PAPER labelled; nothing here is a live trading record.",
      "Structural controls reduce specific failure modes; they do not make a strategy profitable.",
      "Regime dependence is a real limitation and is documented rather than smoothed away.",
    ],
  },
  {
    slug: "deterministic-backtesting",
    capabilityId: "backtesting",
    category: "research",
    promise: "Simulation harnesses that regenerate byte-identically, with costs stated explicitly.",
    problems: [
      "Backtests that drift run to run because of implicit ordering, float noise or non-seeded randomness.",
      "Fill and fee assumptions buried in code, so reported results cannot be independently checked.",
      "Overfitting discovered only after capital was committed to the configuration.",
    ],
    process: [
      "FIX THE HARNESS",
      "MODEL COSTS AND SLIPPAGE",
      "BREAK DETERMINISM ON PURPOSE",
      "STATE WHAT THE HARNESS CANNOT PROVE",
    ],
    deliverables: [
      "A deterministic harness over the full historical corpus with explicit cost and slippage models.",
      "Reproducibility tests that deliberately break determinism and assert which false results appear.",
      "A written statement of what the harness proves, and what it structurally cannot prove.",
    ],
    outOfScope: [
      "Walk-forward tuning campaigns presented as proof of future performance.",
      "Overfitting-correction methods sold as a guarantee against overfitting.",
    ],
    limitations: [
      "Reproducibility proves the run is honest, not that the past predicts the future.",
      "Multiple-comparison effects are documented, not eliminated — the harness makes them visible.",
      "Cost models approximate market impact; they cannot reconstruct liquidity that no longer exists.",
    ],
  },
  {
    slug: "risk-engineering",
    capabilityId: "risk",
    category: "systems",
    promise: "Risk controls as structural invariants enforced before an order can exist.",
    problems: [
      "Risk limits enforced by policy documents instead of by code that refuses to build the order.",
      "Position sizing that ignores ergodicity, drawdown path or the cost of a single wrong tail bet.",
      "Pre-trade checks bolted on after execution logic, so they can be bypassed by construction.",
    ],
    process: [
      "SIZING BEFORE ADMISSION",
      "ENFORCE IN CODE",
      "TEST EVERY REFUSAL",
    ],
    deliverables: [
      "A risk engine that sits between signal and execution and cannot be skipped.",
      "Explicit sizing arithmetic: capital at risk, R:R, cost budget, drawdown and giveback limits.",
      "Test fixtures that attempt to violate every control and prove the refusal.",
    ],
    outOfScope: [
      "Portfolio management for third-party capital.",
      "Regulatory capital, compliance or legal risk frameworks.",
    ],
    limitations: [
      "Structural controls bound losses from modelled failure modes; they do not bound losses from unknown ones.",
      "Sizing arithmetic assumes the stop is honoured at its price — gaps are modelled as stress, not predicted.",
    ],
  },
  {
    slug: "data-pipeline-engineering",
    capabilityId: "data-infrastructure",
    category: "data",
    promise: "High-throughput, low-dependency data systems with measurement context attached.",
    problems: [
      "Pipelines whose performance is claimed without a stated methodology or hardware context.",
      "Dependency-heavy stacks where a single library upgrade changes numeric results.",
      "Intermediate financial models entangled with presentation, so they cannot be reused or audited.",
    ],
    process: [
      "EXPLICIT INTERMEDIATE MODEL",
      "BENCHMARK WITH METHODOLOGY",
      "REPRODUCIBLE BUILDS",
      "TESTS IN CI ON EVERY CHANGE",
    ],
    deliverables: [
      "A pipeline with an explicit intermediate model, separated from presentation and storage.",
      "Published benchmark output: throughput, latency and memory with methodology attached.",
      "Reproducible builds and test suites run in CI on every change.",
    ],
    outOfScope: [
      "Cloud platform operations, deployment or on-call ownership after handover.",
      "Data licensing or procurement.",
    ],
    limitations: [
      "Benchmarks are measured on stated hardware with stated data; other environments will differ.",
      "Throughput figures describe the engine, not end-to-end system latency under production load.",
    ],
  },
  {
    slug: "performance-engineering",
    capabilityId: "performance-engineering",
    category: "systems",
    promise: "Throughput and latency work where the measurement methodology is part of the deliverable.",
    problems: [
      "Performance claims without reproducible measurement: no hardware, no dataset, no harness.",
      "Premature optimisation of the wrong layer because the profile was never taken.",
      "Numeric code that changed behaviour when compiler flags or dependency versions moved.",
    ],
    process: [
      "PROFILE BEFORE TOUCHING CODE",
      "OPTIMISE THE ACTUAL BOTTLENECK",
      "MEASURE BEFORE AND AFTER",
      "GUARD THE GAIN IN CI",
    ],
    deliverables: [
      "A profiling-driven analysis identifying the actual bottleneck before any optimisation.",
      "An optimisation pass with before/after measurements from the same harness and hardware.",
      "A benchmark suite committed alongside the code so regressions are caught in CI.",
    ],
    outOfScope: [
      "Hardware procurement or infrastructure redesign.",
      "Optimisation of third-party code you do not own.",
    ],
    limitations: [
      "Every figure carries its measurement context — results do not transfer silently between environments.",
      "Optimisation trades readability for speed; the tradeoff is documented, not hidden.",
    ],
  },
  {
    slug: "ai-assisted-research-tooling",
    capabilityId: "ai-intelligence",
    category: "ai",
    promise: "AI applied to research tooling where every output is inspectable and every claim is checkable.",
    problems: [
      "Model-generated analysis presented as a conclusion, with no stated method or source behind it.",
      "Automation that cannot be re-run deterministically, so its output cannot be audited.",
      "Knowledge scattered across notes with no structure connecting question, method and evidence.",
    ],
    process: [
      "GROUND IN YOUR OWN SOURCES",
      "CITE BACK TO THE SOURCE",
      "VERSION THE PIPELINE",
      "STRUCTURE THE KNOWLEDGE LAYER",
    ],
    deliverables: [
      "Retrieval and analysis tooling grounded in your own documents and data, with citations back to sources.",
      "Deterministic, versioned pipelines so an analysis can be regenerated and reviewed.",
      "A structured knowledge layer connecting questions, methods, evidence and conclusions.",
    ],
    outOfScope: [
      "Model training on your behalf or GPU infrastructure operation.",
      "Autonomous decision systems acting on trades, capital or production infrastructure.",
      "Claims of model accuracy that are not measured against a stated evaluation set.",
    ],
    limitations: [
      "Generated text is a draft for human review, not an authoritative result.",
      "Retrieval quality is bounded by the quality and coverage of the source material.",
      "Evaluations are reported against stated test sets; unseen inputs may behave differently.",
    ],
  },
];

export const serviceOfferings: ServiceOffering[] = SERVICES;

export function getService(slug: string): ServiceOffering | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getCapability(slug: string): Capability | undefined {
  const service = getService(slug);
  if (!service) return undefined;
  return capabilities.find((c) => c.id === service.capabilityId);
}

/** Everything a service view renders for one offering, resolved in one place. */
export interface ServiceBundle {
  service: ServiceOffering;
  capability: Capability;
  category: ServiceCategoryMeta;
  /** Related builds from the archive — the evidence behind the capability. */
  projects: ArchiveProject[];
  /** Related research entries — the written record behind the capability. */
  research: ResearchEntry[];
}

export function getServiceBundle(slug: string): ServiceBundle | undefined {
  const service = getService(slug);
  const capability = getCapability(slug);
  if (!service || !capability) return undefined;
  return {
    service,
    capability,
    category: serviceCategories[service.category],
    projects: capability.projects
      .map((id) => getArchiveProject(id))
      .filter((p): p is ArchiveProject => Boolean(p)),
    research: researchEntries.filter((r) => capability.research.includes(r.id)),
  };
}

/** Every bundle in offering order — the /services studio's selector. */
export const serviceBundles: ServiceBundle[] = SERVICES.map((s) => getServiceBundle(s.slug)).filter(
  (b): b is ServiceBundle => Boolean(b)
);

/** Service slugs in capability order — used for static params and the index. */
export const serviceSlugs: string[] = SERVICES.map((s) => s.slug);
