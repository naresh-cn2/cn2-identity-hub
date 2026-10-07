export type ResearchCategory =
  | "MARKET STRUCTURE"
  | "BACKTESTING"
  | "DATA INTEGRITY"
  | "RISK"
  | "STRATEGY RESEARCH"
  | "QUANTITATIVE METHODS"
  | "COMPUTATIONAL FINANCE"
  | "AI / INTELLIGENCE";

export interface ResearchEntry {
  id: string;
  title: string;
  category: ResearchCategory;
  status: "ONGOING" | "DOCUMENTED" | "VERIFIED";
  question: string;
  hypothesis: string;
  method: string;
  evidence: string;
  result: string;
  limitation: string;
  conclusion: string;
  relatedProject?: string;
}

export const researchEntries: ResearchEntry[] = [
  {
    id: "lookahead-bias",
    title: "Lookahead Bias as an Engineering Failure, Not a Statistical One",
    category: "DATA INTEGRITY",
    status: "VERIFIED",
    question:
      "Where does lookahead bias actually enter quantitative pipelines — and can it be prevented structurally?",
    hypothesis:
      "Lookahead bias enters through data-layer engineering decisions, not strategy logic, and can be eliminated by point-in-time access semantics.",
    method:
      "Audit of ingestion, normalization, resampling and join paths; adversarial tests that attempt to extract future information through every access pattern.",
    evidence:
      "Adversarial test suite in quant-market-data-replay — deliberate future-information extraction attempts fail against point-in-time reads.",
    result:
      "Point-in-time safe reads enforced in the data layer prevent lookahead by construction. Consumers cannot opt out.",
    limitation:
      "Consumer code can still misuse resampled windows above the data layer; the guarantee covers access, not strategy logic.",
    conclusion:
      "Information-flow correctness belongs in infrastructure. Researcher discipline is a fragile control; structural guarantees are not.",
    relatedProject: "market-data-replay",
  },
  {
    id: "backtest-overfitting",
    title: "Reproducibility as an Overfitting Defense",
    category: "BACKTESTING",
    status: "DOCUMENTED",
    question: "Does determinism in the backtest harness measurably reduce false-positive strategies?",
    hypothesis:
      "If identical inputs produce identical outputs, parameters tuned to noise become identifiable as unstable rather than performant.",
    method:
      "Deterministic replay of the same strategy configuration across repeated runs; comparison of results under perturbed data ordering with fixed tie-breaking rules.",
    evidence:
      "Apex Quant Engine backtests reproduce byte-identically from raw bars to equity curve; 5,867-trade master-fund runs regenerate exactly.",
    result:
      "Deterministic harnesses make an entire class of irreproducible 'results' impossible to mistake for findings.",
    limitation:
      "Determinism addresses reproducibility, not statistical overfitting to a single historical window — that requires out-of-sample discipline.",
    conclusion:
      "Determinism is necessary but not sufficient: it removes accidental false positives so real statistical work can begin.",
    relatedProject: "apex-quant-engine",
  },
  {
    id: "decimal-arithmetic",
    title: "Exact Decimal Arithmetic in Market Data",
    category: "QUANTITATIVE METHODS",
    status: "VERIFIED",
    question: "Where does binary floating-point representation corrupt market data, and does it matter?",
    hypothesis:
      "Float representation of prices and monetary values accumulates representation error that surfaces in aggregates, joins and risk calculations.",
    method:
      "Comparison of ingestion-storage-replay paths under exact decimal arithmetic versus IEEE-754 floats, tracking divergence through aggregation.",
    evidence:
      "quant-market-data-replay stores and replays with exact decimal arithmetic across the full pipeline.",
    result:
      "Representation drift is eliminated as a failure mode; joins and aggregates behave identically across runs.",
    limitation: "Exact arithmetic trades throughput for correctness — appropriate at research speeds, costly at HFT scale.",
    conclusion:
      "In research infrastructure, correctness of representation is cheap insurance against an invisible failure class.",
    relatedProject: "market-data-replay",
  },
  {
    id: "risk-first-sizing",
    title: "Position Sizing Before Admission",
    category: "RISK",
    status: "DOCUMENTED",
    question:
      "What changes when risk controls run before order construction rather than as post-trade reconciliation?",
    hypothesis:
      "Structural pre-trade controls — risk cap, R:R floor, cost-budget filter — change the population of admitted trades, not just their outcomes.",
    method:
      "Pipeline architecture with controls as gates: position size derives from stop distance and risk cap; setups failing the 1:4 R:R floor or cost budget never reach execution.",
    evidence:
      "automated_trading_os implements 1% per-trade risk cap, minimum 1:4 R:R, fee/slippage modelling, cost-budget filtering, profit lock and giveback limit.",
    result:
      "The admitted-trade population is defined by rules rather than discretion; every admitted trade satisfies all structural constraints by construction.",
    limitation: "Ablation studies quantifying each control's individual contribution are ongoing.",
    conclusion:
      "Order-of-operations matters: controls applied after sizing are advice; controls applied before are physics.",
    relatedProject: "automated-trading-os",
  },
  {
    id: "multi-timeframe-alignment",
    title: "Multi-Timeframe Agreement Windows",
    category: "STRATEGY RESEARCH",
    status: "ONGOING",
    question: "What is the character of windows where higher, mid and lower timeframes agree?",
    hypothesis:
      "One-way information flow — LTF triggers inside MTF structure within HTF direction — produces a distinct, analyzable population of setups.",
    method:
      "Layered pipeline analysis: HTF establishes directional context, MTF maps structure, LTF times entries; agreement windows extracted and studied.",
    evidence: "automated_trading_os pipeline with explicit stage contracts; timeframe explorer instrument in development.",
    result: "In progress — agreement-window extraction across instrument history under construction.",
    limitation: "Results not yet published; the pipeline exists, the study is ongoing.",
    conclusion: "Preliminary: enforcing one-way flow eliminates a class of contradictory signals by construction.",
    relatedProject: "automated-trading-os",
  },
  {
    id: "regime-dependence",
    title: "Regime Dependence in Strategy Populations",
    category: "MARKET STRUCTURE",
    status: "ONGOING",
    question: "How much of a multi-strategy portfolio's simulated performance is regime selection rather than strategy skill?",
    hypothesis:
      "Strategy performance clusters by market regime more strongly than by strategy family — allocation across regimes matters more than strategy count.",
    method:
      "Decomposition of master-fund backtest results by regime classification across the 11.9M+ bar history.",
    evidence: "Apex master-fund backtest artifacts: +570.18% net simulated ROI across 5,867 completed backtest trades.",
    result: "In progress — regime attribution analysis under construction.",
    limitation: "Regime classification itself is a modeling choice; attribution results will depend on the classifier.",
    conclusion: "Pending — the question is registered and the data exists; the attribution study is next.",
    relatedProject: "apex-quant-engine",
  },
  {
    id: "deterministic-tie-breaking",
    title: "Deterministic Tie-Breaking Under Nanosecond Clocks",
    category: "DATA INTEGRITY",
    status: "VERIFIED",
    question: "How should equal-timestamp market events be ordered so replay is reproducible?",
    hypothesis:
      "Without deterministic tie-breaking, equal-timestamp events order arbitrarily across runs, making replay irreproducible.",
    method:
      "Reorder stage with explicit deterministic tie-breaking rules; repeated replay verification that output is byte-identical.",
    evidence: "quant-market-data-replay determinism verification: identical replays across runs including tie-breaking.",
    result: "Replay determinism holds under nanosecond timestamps with equal-timestamp events.",
    limitation: "Tie-breaking rules encode an ordering assumption — an approximation of true within-timestamp causality.",
    conclusion:
      "Determinism requires explicit choices at every ambiguity. Defaulting to insertion order is a choice; making it deliberate is the difference.",
    relatedProject: "market-data-replay",
  },
  {
    id: "promotion-gates",
    title: "Promotion Gates for Strategy Research",
    category: "COMPUTATIONAL FINANCE",
    status: "VERIFIED",
    question: "What evidence threshold should graduate a strategy from research to deployment consideration?",
    hypothesis:
      "A governance gate — verified artifacts, reproducible runs, documented limitations — raises the evidentiary floor of everything promoted.",
    method:
      "QRSIP workflow: hypothesis → experiment → verification → artifact → report → promotion, with 352 tests on deterministic fixtures and CI security validation.",
    evidence: "QRSIP test suite and promotion-gate integrity tests; alpha-stage platform operational for the core workflow.",
    result: "Strategies cannot pass promotion without verified evidence; the gate is structural.",
    limitation: "The gate verifies process integrity, not edge — a well-governed strategy can still be unprofitable.",
    conclusion: "Governance converts research from anecdote to evidence. It is the floor, not the ceiling.",
    relatedProject: "qrsip",
  },
];

export const researchCategories: ResearchCategory[] = [
  "MARKET STRUCTURE",
  "BACKTESTING",
  "DATA INTEGRITY",
  "RISK",
  "STRATEGY RESEARCH",
  "QUANTITATIVE METHODS",
  "COMPUTATIONAL FINANCE",
  "AI / INTELLIGENCE",
];
