export interface Note {
  id: string;
  title: string;
  type: "MENTAL MODEL" | "RESEARCH NOTE" | "DECISION SYSTEM" | "MARKET THINKING" | "ENGINEERING NOTE" | "LEARNING";
  body: string;
  source?: string;
}

export const knowledgeNodes = [
  { id: "quant", label: "QUANT", x: 50, y: 12 },
  { id: "markets", label: "MARKETS", x: 85, y: 30 },
  { id: "data", label: "DATA", x: 78, y: 68 },
  { id: "risk", label: "RISK", x: 50, y: 88 },
  { id: "ai", label: "AI", x: 15, y: 70 },
  { id: "engineering", label: "ENGINEERING", x: 12, y: 30 },
  { id: "research", label: "RESEARCH", x: 50, y: 50 },
] as const;

export const knowledgeEdges = [
  ["quant", "markets"],
  ["quant", "research"],
  ["quant", "data"],
  ["markets", "research"],
  ["markets", "risk"],
  ["data", "engineering"],
  ["data", "research"],
  ["risk", "research"],
  ["risk", "engineering"],
  ["ai", "research"],
  ["ai", "data"],
  ["engineering", "research"],
  ["engineering", "quant"],
] as const;

export const notes: Note[] = [
  {
    id: "note-ergodicity",
    title: "Ensemble vs Time-Strategic Averages",
    type: "MENTAL MODEL",
    body: "A strategy's average return across paths and its return along the single path you actually trade are different quantities. Position sizing exists to keep you on the survivable side of that difference. Risk caps are not conservatism — they are what makes the time-average exist.",
  },
  {
    id: "note-signal-noise",
    title: "Signal, Noise and Sample Size",
    type: "MARKET THINKING",
    body: "Most short-horizon market movement is noise, and noise is indistinguishable from signal at small sample sizes. The practical consequence: before asking whether an edge exists, ask whether the sample is even capable of answering. 5,867 trades is a sample; 40 is an anecdote.",
    source: "apex-quant-engine backtest population",
  },
  {
    id: "note-cost-first",
    title: "Cost-First Design",
    type: "DECISION SYSTEM",
    body: "Model fees and slippage before asking whether a strategy is profitable, not after. A setup that cannot pay its own costs is not a marginal strategy — it is a guaranteed loss. The cost-budget filter encodes this: rejection happens at admission, before capital is allocated.",
    source: "automated_trading_os",
  },
  {
    id: "note-determinism",
    title: "Determinism Is a Feature",
    type: "ENGINEERING NOTE",
    body: "If a backtest cannot reproduce itself, it was never a result — it was a random draw wearing the costume of a finding. Deterministic fixtures, explicit tie-breaking, exact decimals: these are not conveniences. They are the boundary between evidence and anecdote.",
    source: "quant-market-data-replay",
  },
  {
    id: "note-verification",
    title: "Verification Over Trust",
    type: "DECISION SYSTEM",
    body: "A promotion gate that can be talked past is decoration. The value of governance is exactly the inconvenience it imposes — strategies graduate on verified evidence, and the gate's refusal to bend is the feature being purchased.",
    source: "QRSIP",
  },
  {
    id: "note-regime",
    title: "Every Backtest Has a Weather Report",
    type: "RESEARCH NOTE",
    body: "A backtest is a statement about one historical window, and windows have weather. The same strategy in 2021-monsoon and 2022-drought produces different organisms. Regime attribution is not a refinement — it is the difference between knowing what happened and knowing why.",
  },
  {
    id: "note-lookahead",
    title: "The Future Leaks Sideways",
    type: "RESEARCH NOTE",
    body: "Lookahead bias rarely arrives as reading tomorrow's price. It arrives sideways: a resample that includes the tail of the window, a join keyed on knowledge that only existed later, a timestamp rounded the wrong way. Prevention is architectural because the leaks are architectural.",
    source: "quant-market-data-replay",
  },
  {
    id: "note-precision",
    title: "Representation Is a Decision",
    type: "ENGINEERING NOTE",
    body: "Choosing IEEE-754 floats for prices is a modeling decision with statistical consequences — representation error accumulates through joins and aggregates until it is indistinguishable from market microstructure. Exact decimal arithmetic in research infrastructure is cheap insurance against an invisible failure class.",
    source: "quant-market-data-replay",
  },
  {
    id: "note-layers",
    title: "One-Way Information Flow",
    type: "MENTAL MODEL",
    body: "In layered systems — trading pipelines, data platforms, organizations — information should flow one way. When downstream stages can override upstream constraints, the architecture has no constraints, only suggestions. The 1% risk cap works because no lower timeframe can argue with it.",
    source: "automated_trading-os",
  },
  {
    id: "note-small-edges",
    title: "Small Edges, Correctly Measured",
    type: "LEARNING",
    body: "The craft is not finding huge edges — those are mostly noise or luck. The craft is establishing that a small edge is real: reproducible, cost-surviving, regime-aware. A 1% real edge with honest measurement beats a 50% fantasy with flattering assumptions.",
  },
];
