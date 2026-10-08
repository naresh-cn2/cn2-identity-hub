import type { FlagshipProject } from "./types";

export const marketDataReplay: FlagshipProject = {
  id: "market-data-replay",
  route: "/builds/market-data-replay",
  index: "03",
  title: "QUANT MARKET DATA REPLAY",
  shortTitle: "DATA REPLAY",
  category: "POINT-IN-TIME SAFE MARKET-DATA INFRASTRUCTURE",
  status: "RELEASED",
  statusNote: "Core infrastructure implemented and tested.",
  position: "Point-in-time safe market-data infrastructure for quantitative research.",
  thesis:
    "Every backtest is a claim about the past — and most are wrong in a specific, preventable way: they let strategies see the future.",
  summary:
    "A market-data infrastructure that ingests raw exchange data, normalizes, validates, quarantines and reorders it, then serves point-in-time safe access with deterministic replay — eliminating lookahead bias by construction. Exact decimal arithmetic, nanosecond timestamps, SQLite WAL storage, sliding watermarks and deterministic tie-breaking.",
  problem: [
    "Lookahead bias is the quiet killer of quantitative research. It enters through ordinary engineering decisions: a resampled candle that includes the future tail of its window, a join that matches on post-hoc knowledge, a timestamp normalized to a coarser clock.",
    "Once contaminated, a backtest cannot be repaired — the result must be regenerated from clean data. Prevention is the only cure, and prevention has to happen in the data layer, not the strategy layer.",
  ],
  motivation: [
    "I kept encountering the same failure pattern: research code that was careful about strategy logic and careless about information flow. The strategy was never the problem — the data access was.",
    "This project makes point-in-time safety a property of the infrastructure itself, so no downstream researcher has to remember to be careful.",
  ],
  researchQuestion:
    "Can market-data infrastructure guarantee that a consumer at time t can only access information that existed at time t — deterministically, and at full research throughput?",
  objective: [
    "Build an ingestion → normalization → validation → quarantine → reorder → storage pipeline that never silently drops or fabricates data",
    "Serve point-in-time safe reads with a sliding watermark",
    "Make replay deterministic: same query, same clock, same result — including tie-breaking",
    "Use exact decimal arithmetic and nanosecond timestamps so precision itself cannot introduce bias",
  ],
  architecture: [
    {
      name: "INGESTION",
      role: "Raw data acquisition",
      detail: ["Raw exchange feeds captured unmodified", "No transformations at the boundary"],
    },
    {
      name: "NORMALIZATION",
      role: "Canonical representation",
      detail: ["Exact decimal arithmetic — no binary floating point drift", "Nanosecond timestamps normalized to one clock"],
    },
    {
      name: "VALIDATION",
      role: "Integrity gates",
      detail: ["Schema, range and continuity checks", "Corrupt or suspect records never reach storage silently"],
    },
    {
      name: "QUARANTINE",
      role: "Failure containment",
      detail: ["Invalid records isolated for inspection", "Quarantine is explicit — nothing is silently dropped"],
    },
    {
      name: "REORDER",
      role: "Causal ordering",
      detail: ["Events ordered by arrival, not by post-hoc knowledge", "Deterministic tie-breaking for equal timestamps"],
    },
    {
      name: "STORAGE",
      role: "Point-in-time ledger",
      detail: ["SQLite in WAL mode for concurrent read access", "Sliding watermark defines visible data horizon"],
    },
    {
      name: "PIT ACCESS",
      role: "Point-in-time safe reads",
      detail: ["Reads at time t can only see data that existed at t", "Resampled windows never include future ticks"],
    },
    {
      name: "DETERMINISTIC REPLAY",
      role: "Reproducible research",
      detail: ["Same inputs, same clock — same output, every run", "Tie-breaking is deterministic by construction"],
    },
    {
      name: "ANALYTICS",
      role: "Downstream consumption",
      detail: ["Backtests and studies build on guaranteed-clean access", "Adversarial tests attack the boundary"],
    },
  ],
  dataFlow: [
    "RAW DATA captured unmodified at the boundary",
    "INGESTION into the pipeline with zero transformation",
    "NORMALIZATION to canonical form: exact decimals, nanosecond timestamps",
    "VALIDATION runs integrity gates; failures route to QUARANTINE",
    "REORDER establishes causal order with deterministic tie-breaking",
    "STORAGE in SQLite WAL behind a sliding watermark",
    "POINT-IN-TIME ACCESS serves reads visible only as of t",
    "DETERMINISTIC REPLAY reproduces any historical state exactly",
    "ANALYTICS consume guaranteed point-in-time safe data",
  ],
  methods: [
    "Point-in-time access semantics enforced in the data layer, not by researcher discipline",
    "Exact decimal arithmetic — monetary and price values never pass through binary floats",
    "Nanosecond-precision timestamps normalized to a single clock",
    "Sliding watermark defines the visibility horizon for concurrent consumers",
    "Deterministic tie-breaking so equal-timestamp events order identically across runs",
    "Adversarial testing that deliberately attempts to extract future information",
  ],
  risk: [
    "The primary risk this system manages is informational: no consumer may see data from after its query time",
    "Quarantine prevents silent data loss — every rejected record is accounted for",
    "Determinism eliminates a class of irreproducibility that plagues backtest research",
  ],
  experiments: [
    {
      title: "Lookahead adversarial suite",
      question: "Can any access pattern extract information from after its query time?",
      result: "Adversarial tests attack the boundary; point-in-time semantics hold.",
      status: "COMPLETED",
    },
    {
      title: "Determinism verification",
      question: "Do identical replays produce byte-identical output across runs?",
      result: "Deterministic replay verified — including tie-breaking on equal timestamps.",
      status: "COMPLETED",
    },
    {
      title: "Decimal precision audit",
      question: "Does exact decimal arithmetic eliminate floating-point drift in stored prices?",
      result: "Exact arithmetic verified across ingestion, storage and replay.",
      status: "COMPLETED",
    },
  ],
  results: {
    metrics: [
      { value: "9", label: "PIPELINE STAGES", context: "RAW → ANALYTICS" },
      { value: "ns", label: "TIMESTAMP PRECISION", context: "NANOSECOND CLOCK" },
      { value: "0", label: "SILENT DATA DROPS", context: "QUARANTINE MODEL" },
      { value: "WAL", label: "STORAGE MODE", context: "SQLITE" },
    ],
    narrative: [
      "This is infrastructure, not a strategy — its result is a guarantee. Downstream backtests inherit point-in-time safety by construction rather than by discipline.",
      "The interactive replay lab demonstrates the core property: select any timestamp and see exactly which information was available then, and which only existed after.",
    ],
  },
  limitations: [
    "Point-in-time safety covers the data layer; strategy-level misuse of resampled windows is still possible in consumer code",
    "Coverage is limited to the exchanges and instruments ingested so far",
    "Quarantine policy is conservative — some late-arriving but valid data may be held for inspection",
  ],
  evidence: [
    { label: "REPOSITORY", detail: "Full pipeline implementation on GitHub" },
    { label: "ADVERSARIAL TESTS", detail: "Deliberate attempts to extract future information fail" },
    { label: "DETERMINISM", detail: "Byte-identical replay across runs, including tie-breaking" },
  ],
  technologies: ["Python", "SQLite WAL", "Exact decimal arithmetic", "Nanosecond timestamps"],
  visualMetaphor: "temporal data stream / replay environment",
  interactive: [
    {
      title: "POINT-IN-TIME REPLAY LAB",
      description: "Select a timestamp and see the information boundary — lookahead vs point-in-time safe.",
      href: "/lab/market-replay",
    },
  ],
  github: "https://github.com/naresh-cn2/quant-market-data-replay",
};
