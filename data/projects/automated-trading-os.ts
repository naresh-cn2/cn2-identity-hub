import type { FlagshipProject } from "./types";

export const automatedTradingOs: FlagshipProject = {
  id: "automated-trading-os",
  route: "/builds/automated-trading-os",
  index: "02",
  title: "AUTOMATED TRADING OS",
  shortTitle: "TRADING OS",
  category: "MULTI-TIMEFRAME TRADING & EXECUTION ARCHITECTURE",
  status: "DEVELOPMENT",
  statusNote: "Execution architecture under active development.",
  position: "Multi-timeframe quantitative trading and execution architecture.",
  thesis:
    "A trade is not a signal — it is a pipeline of decisions from higher timeframe context down to fill, each stage governed by explicit risk rules.",
  summary:
    "An operating-system-style architecture for systematic trading: higher-timeframe context flows down through mid- and lower-timeframe analysis into risk, trade management and execution — every stage bounded by verified controls: 1% per-trade risk cap, minimum 1:4 reward-to-risk, fee and slippage modelling, cost-budget filtering, profit lock and giveback limit.",
  problem: [
    "Most trading systems are built as a single indicator that prints buy/sell signals. That model collapses context, risk and execution into one fragile decision.",
    "Real systematic trading is layered: what the higher timeframe permits, the mid timeframe structures, the lower timeframe triggers — and none of it matters if position size, costs and exit management are not governed explicitly.",
  ],
  motivation: [
    "I wanted an architecture where the layers are honest about their role — where a lower-timeframe entry can never override higher-timeframe context, and where risk rules are structural rather than advisory.",
    "The operating-system framing is deliberate: kernels schedule, enforce and isolate. A trading architecture should do the same for decisions.",
  ],
  researchQuestion:
    "Does explicit multi-timeframe separation, with hard risk controls at every layer boundary, improve trade quality enough to survive modeled costs?",
  objective: [
    "Separate HTF / MTF / LTF analysis into distinct pipeline stages with defined contracts",
    "Enforce verified risk controls as structural invariants: 1% per-trade risk cap, minimum 1:4 R:R",
    "Model fees and slippage at execution, and filter trades whose cost budget cannot support the setup",
    "Manage open trades with profit lock and giveback limits instead of static stops only",
  ],
  architecture: [
    {
      name: "HTF — HIGHER TIMEFRAME",
      role: "Directional context and regime",
      detail: ["Establishes the permitted directional bias", "Lower layers may not contradict it"],
    },
    {
      name: "MTF — MID TIMEFRAME",
      role: "Structure and setup identification",
      detail: ["Maps the structure the entry will live inside", "Defines setup zones and invalidation"],
    },
    {
      name: "LTF — LOWER TIMEFRAME",
      role: "Entry trigger",
      detail: ["Times the execution within MTF structure", "Emits trigger only when HTF and MTF agree"],
    },
    {
      name: "RISK",
      role: "Position sizing and trade admission",
      detail: ["1% per-trade risk cap on capital", "Minimum 1:4 reward-to-risk required", "Cost-budget filter rejects setups that cannot pay for themselves"],
    },
    {
      name: "TRADE MANAGEMENT",
      role: "Open-position governance",
      detail: ["Profit lock secures gains as trade progresses", "Giveback limit caps how much open profit may be surrendered"],
    },
    {
      name: "EXECUTION",
      role: "Order construction and fills",
      detail: ["Fee and slippage modelling applied to every fill", "Orders constructed only after all gates pass"],
    },
  ],
  dataFlow: [
    "HTF analysis establishes directional context and regime classification",
    "MTF analysis maps structure and defines the setup and its invalidation",
    "LTF timing emits a trigger only inside MTF structure and HTF direction",
    "Risk stage sizes the position from stop distance under the 1% cap and rejects sub-1:4 setups",
    "Cost-budget filtering removes trades whose fees and slippage cannot be supported by target",
    "Trade management governs the open position: profit lock and giveback limits",
    "Execution constructs and simulates the order with explicit fee and slippage models",
  ],
  methods: [
    "Layered pipeline architecture with one-way information flow — downstream cannot override upstream",
    "Structural risk invariants enforced at layer boundaries",
    "Explicit cost modelling: fees and slippage priced into every admission decision",
    "Before/after experimentation comparing trades with and without each control",
  ],
  risk: [
    "1% maximum account risk per trade — position size derives from stop distance",
    "Minimum 1:4 reward-to-risk — setups below the threshold are never admitted",
    "Cost budget filter — if modeled costs exceed what the setup can carry, the trade is rejected",
    "Profit lock and giveback limit — open profit is protected by rule, not discretion",
  ],
  experiments: [
    {
      title: "Control ablation",
      question: "What does each risk control individually contribute to trade quality?",
      result: "Before/after comparisons isolating the effect of each gate on admitted trade sets.",
      status: "ONGOING",
    },
    {
      title: "R:R threshold sweep",
      question: "How does the admitted-trade population change as the minimum R:R threshold moves?",
      result: "Strategy matrix across R:R thresholds under fixed 1% risk.",
      status: "ONGOING",
    },
    {
      title: "Timeframe alignment study",
      question: "How often do HTF, MTF and LTF agree, and what is the character of those windows?",
      result: "Timeframe explorer mapping agreement windows across instrument history.",
      status: "ONGOING",
    },
  ],
  results: {
    metrics: [
      { value: "1%", label: "MAX RISK PER TRADE", context: "STRUCTURAL CAP" },
      { value: "1:4", label: "MINIMUM R:R", context: "ADMISSION THRESHOLD" },
      { value: "6", label: "PIPELINE STAGES", context: "HTF → EXECUTION" },
      { value: "100%", label: "FILLS COST-MODELED", context: "FEES + SLIPPAGE" },
    ],
    narrative: [
      "The verified results here are architectural: the controls exist, are enforced structurally, and are experiment-ready. Performance figures from this architecture will be published only as labeled backtests when runs complete.",
    ],
  },
  limitations: [
    "Execution architecture is in development — forward results are not yet published",
    "Control ablation experiments are ongoing; per-control contribution figures are not yet final",
    "Cost models approximate fills and do not capture all extreme-liquidity scenarios",
  ],
  evidence: [
    { label: "REPOSITORY", detail: "Architecture and control implementations on GitHub" },
    { label: "VERIFIED CONTROLS", detail: "Risk cap, R:R floor, cost filter, profit lock, giveback limit — all present in code" },
    { label: "PIPELINE MODEL", detail: "HTF → MTF → LTF → RISK → TRADE MANAGEMENT → EXECUTION" },
  ],
  technologies: ["Python", "Multi-timeframe analysis", "Risk engine", "Paper execution"],
  visualMetaphor: "layered execution pipeline",
  interactive: [
    {
      title: "RISK CALCULATOR",
      description: "Compute position size, R:R and net risk under the OS's verified control rules.",
      href: "/lab/risk",
    },
    {
      title: "PIPELINE EXPLORER",
      description: "Walk a trade through all six pipeline stages with each control applied.",
      href: "/builds/automated-trading-os#interactive",
    },
  ],
  github: "https://github.com/naresh-cn2/automated_trading_os",
};
