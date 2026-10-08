import type { FlagshipProject } from "./types";

export const apexQuantEngine: FlagshipProject = {
  id: "apex-quant-engine",
  route: "/builds/apex-quant-engine",
  index: "01",
  title: "APEX QUANT ENGINE",
  shortTitle: "APEX",
  category: "MULTI-STRATEGY QUANTITATIVE TRADING ENGINE",
  status: "BACKTEST · PAPER",
  statusNote: "Deterministic backtesting and paper execution. Not live trading.",
  position: "Multi-strategy quantitative trading engine.",
  thesis:
    "A complete research-to-execution pipeline where every simulated result is reproducible by construction.",
  summary:
    "Apex is a multi-strategy quantitative trading engine spanning BTC, ETH and SOL. It couples a market-data engine, a strategy engine, a risk engine, portfolio allocation and deterministic backtesting with paper execution — 11.9M+ one-minute bars and 5,867 completed backtest trades.",
  problem: [
    "Retail-grade backtesting tools make it easy to produce numbers that cannot be reproduced. Lookahead bias, implicit assumptions about fills and fees, and non-deterministic data access quietly inflate results.",
    "Worse, most frameworks couple strategy logic to execution logic, so the code that generated a backtest is not the code that would trade — the simulation and the system drift apart.",
  ],
  motivation: [
    "I wanted to know whether a systematic, multi-strategy approach to crypto markets could survive honest treatment: exact costs, deterministic replay, and risk caps enforced before position sizing rather than after losses.",
    "The engine exists to answer that question with evidence rather than narrative.",
  ],
  researchQuestion:
    "Can a multi-strategy crypto portfolio, simulated over millions of one-minute bars with explicit fees, slippage and hard risk caps, remain net-positive after all modeled costs?",
  objective: [
    "Build a single engine where research, simulation and (paper) execution share one deterministic code path.",
    "Enforce risk at the portfolio level before any order is constructed.",
    "Make every backtest reproducible from raw data to final equity curve.",
  ],
  architecture: [
    {
      name: "DATA ENGINE",
      role: "Market-data ingestion and normalization",
      detail: ["11.9M+ 1-minute bars across BTC / ETH / SOL", "Deterministic, replayable access layer"],
    },
    {
      name: "STRATEGY ENGINE",
      role: "Multi-strategy signal generation",
      detail: ["Independent strategies evaluated per asset and timeframe", "Signal contracts decoupled from execution"],
    },
    {
      name: "RISK ENGINE",
      role: "Pre-trade risk enforcement",
      detail: ["Position sizing derived from risk budget", "Hard caps applied before order construction"],
    },
    {
      name: "PORTFOLIO ALLOCATION",
      role: "Cross-asset capital distribution",
      detail: ["Allocation across strategies and assets", "Master-fund composition for backtests"],
    },
    {
      name: "EXECUTION",
      role: "Deterministic fills and paper execution",
      detail: ["Fee and slippage modelling at fill time", "Paper execution mode for forward testing"],
    },
    {
      name: "BACKTEST CORE",
      role: "Deterministic simulation harness",
      detail: ["Reproducible run-to-run results", "44.50s execution benchmark for full master-fund backtest"],
    },
  ],
  dataFlow: [
    "Historical 1-minute bars are loaded through the deterministic data engine",
    "The strategy engine evaluates every strategy per asset and timeframe, emitting signal contracts",
    "The risk engine converts signals into position sizes bounded by the risk budget",
    "Portfolio allocation distributes capital across the strategy set",
    "The execution layer simulates fills with explicit fee and slippage models",
    "The backtest core aggregates fills into trades, equity and drawdown series",
  ],
  methods: [
    "Deterministic simulation — identical inputs and code produce identical equity curves",
    "Explicit cost modelling — fees and slippage charged at every simulated fill",
    "Multi-strategy composition across BTC / ETH / SOL with portfolio-level allocation",
    "Paper execution for forward validation of the same code path used in backtests",
  ],
  risk: [
    "Risk budgets are enforced before order construction, not reconciled after losses",
    "Position size derives from stop distance and per-trade risk cap",
    "Every backtest result is traceable to raw bars, parameters and code revision",
  ],
  experiments: [
    {
      title: "Master-fund backtest",
      question: "What is the net simulated ROI of the full multi-strategy portfolio after all modeled costs?",
      result: "+570.18% net simulated ROI across the master-fund backtest.",
      status: "COMPLETED",
    },
    {
      title: "Full-history simulation",
      question: "How does the engine behave across the complete available 1-minute-bar history?",
      result: "5,867 completed trades over 11.9M+ bars; full backtest executes in 44.50 seconds.",
      status: "COMPLETED",
    },
    {
      title: "Paper execution",
      question: "Does the same code path trade consistently in forward paper mode?",
      result: "Paper execution mode operational for forward validation.",
      status: "ONGOING",
    },
  ],
  results: {
    metrics: [
      {
        value: "+570.18%",
        label: "NET SIMULATED ROI",
        context: "MASTER-FUND BACKTEST",
      },
      {
        value: "5,867",
        label: "COMPLETED BACKTEST TRADES",
        context: "FULL-HISTORY SIMULATION",
      },
      {
        value: "11.9M+",
        label: "1-MINUTE BARS PROCESSED",
        context: "BTC / ETH / SOL",
      },
      {
        value: "44.50s",
        label: "BACKTEST EXECUTION TIME",
        context: "MASTER-FUND RUN",
      },
    ],
    narrative: [
      "All figures are simulated. The +570.18% figure is the net result of the master-fund backtest after modeled fees and slippage — it is not a live trading return and should not be read as one.",
      "The engine's value is less the number than the discipline: deterministic replay, explicit costs, and risk enforced before sizing.",
    ],
  },
  limitations: [
    "All results are backtests and paper simulations — no live trading has occurred",
    "Cost models approximate real fills; extreme liquidity conditions are not fully captured by fee/slippage models",
    "Historical performance of a strategy set does not imply future performance",
  ],
  evidence: [
    { label: "REPOSITORY", detail: "Full source, strategies and simulation harness on GitHub" },
    { label: "BACKTEST ARTIFACTS", detail: "Equity curves, trade logs and run configurations reproducible from the repository" },
    { label: "PAPER MODE", detail: "Forward paper-execution mode runs the identical code path" },
  ],
  technologies: ["Python", "Pandas / NumPy", "SQLite", "Cryptocurrency exchange APIs"],
  visualMetaphor: "portfolio / strategy / equity landscape",
  interactive: [
    {
      title: "EQUITY CURVE EXPLORER",
      description: "Draw the master-fund equity curve progressively and inspect drawdown structure.",
      href: "/builds/apex-quant-engine#interactive",
    },
    {
      title: "RISK CALCULATOR",
      description: "Position sizing under the engine's risk-first rules.",
      href: "/lab/risk",
    },
  ],
  github: "https://github.com/naresh-cn2/apex-quant-engine",
};
