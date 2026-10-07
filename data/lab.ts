export const labModules = [
  {
    id: "lab-risk-01",
    code: "RISK-01",
    name: "RISK SIMULATOR",
    description:
      "Position sizing and risk arithmetic under explicit fee and slippage modelling. Capital, risk %, entry, stop, target — in, position size and net R:R out.",
    href: "/lab/risk",
    inputs: ["CAPITAL", "RISK %", "ENTRY", "STOP", "TARGET", "FEES", "SLIPPAGE"],
    outputs: ["POSITION SIZE", "CAPITAL AT RISK", "R:R", "COST", "NET RISK"],
    status: "OPERATIONAL",
  },
  {
    id: "lab-replay-01",
    code: "REPLAY-01",
    name: "POINT-IN-TIME REPLAY LAB",
    description:
      "The signature demonstration: select a timestamp on a synthetic series and observe the information boundary — what was knowable at t, and what only existed after.",
    href: "/lab/market-replay",
    inputs: ["TIMESTAMP", "SCRUB", "REPLAY SPEED"],
    outputs: ["VISIBLE AT t", "FUTURE-DATED", "LOOKAHEAD DEMO"],
    status: "OPERATIONAL",
  },
  {
    id: "lab-strategy-01",
    code: "STRAT-01",
    name: "STRATEGY VISUALIZER",
    description:
      "R:R geometry, timeframe structure and trade-distribution visualization for systematic setups.",
    href: "/lab/strategy",
    inputs: ["ENTRY", "STOP", "TARGET", "TIMEFRAME"],
    outputs: ["R MULTIPLES", "WIN-RATE BREAK-EVEN", "GEOMETRY"],
    status: "OPERATIONAL",
  },
  {
    id: "lab-surface-01",
    code: "SURF-01",
    name: "RISK / RETURN SURFACE",
    description:
      "An interactive computational surface — X: volatility, Y: R:R, Z: performance — rendered with a projected-3D wireframe you can rotate and inspect.",
    href: "/lab#surface",
    inputs: ["ROTATE", "ZOOM", "HOVER"],
    outputs: ["SURFACE VALUE", "COORDINATE READOUT"],
    status: "OPERATIONAL",
  },
  {
    id: "lab-experiments-01",
    code: "EXP-01",
    name: "EXPERIMENT EXPLORER",
    description:
      "Walk a research hypothesis through the QRSIP governance workflow — experiment, verification, artifact, report, promotion decision.",
    href: "/lab/experiments",
    inputs: ["HYPOTHESIS", "EVIDENCE"],
    outputs: ["VERDICT", "ARTIFACT", "PROMOTION DECISION"],
    status: "OPERATIONAL",
  },
] as const;

export const engagementAreas = [
  {
    title: "QUANT RESEARCH",
    body: "Falsifiable market hypotheses tested with deterministic experiments and honest evidence.",
  },
  {
    title: "DATA INFRASTRUCTURE",
    body: "Market-data and financial-data pipelines engineered for exactness, throughput and auditability.",
  },
  {
    title: "TRADING SYSTEMS",
    body: "Multi-timeframe systematic architectures with structural risk controls end to end.",
  },
  {
    title: "BACKTESTING",
    body: "Deterministic simulation harnesses with explicit cost modelling and reproducible artifacts.",
  },
  {
    title: "RESEARCH AUTOMATION",
    body: "Governance workflows that turn exploratory research into verifiable, promotable evidence.",
  },
  {
    title: "PERFORMANCE ENGINEERING",
    body: "Low-latency, high-throughput systems work where measurement context ships with the number.",
  },
] as const;
