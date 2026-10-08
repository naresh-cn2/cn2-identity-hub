export const career = {
  whatIBuild: [
    {
      title: "QUANTITATIVE ENGINES",
      body: "Multi-strategy trading engines with deterministic backtesting, explicit cost modelling and paper execution — 11.9M+ bars, 5,867 completed trades.",
      evidence: "apex-quant-engine",
    },
    {
      title: "EXECUTION ARCHITECTURES",
      body: "Multi-timeframe trading pipelines with structural risk controls — 1% risk cap, 1:4 R:R floor, cost-budget filtering, profit lock, giveback limit.",
      evidence: "automated_trading_os",
    },
    {
      title: "MARKET-DATA INFRASTRUCTURE",
      body: "Point-in-time safe data platforms: ingestion, validation, quarantine, deterministic replay, nanosecond timestamps, exact decimal arithmetic.",
      evidence: "quant-market-data-replay",
    },
    {
      title: "RESEARCH GOVERNANCE",
      body: "Experimentation platforms governing hypothesis → verification → promotion with 352 tests on deterministic fixtures.",
      evidence: "qrsip",
    },
    {
      title: "PERFORMANCE SYSTEMS",
      body: "Zero-dependency C11 data engines at bare-metal throughput — 487,421 records/sec, 31.89 MB/s.",
      evidence: "billing-data-gateway",
    },
  ],
  whatIStudy: [
    "Lookahead bias and point-in-time correctness in market data",
    "Deterministic replay and reproducibility as research infrastructure",
    "Regime dependence in multi-strategy portfolio performance",
    "Risk-first position sizing and structural trade admission",
    "Multi-timeframe information flow in systematic trading",
    "Exact arithmetic and representation error in financial computation",
  ],
  whatIContribute: [
    {
      title: "RESEARCH ENGINEERING",
      body: "Turning market questions into deterministic, reproducible experiments with verifiable evidence.",
    },
    {
      title: "DATA-INTENSIVE SYSTEMS",
      body: "Ingestion pipelines, normalization layers and query infrastructure built for exactness and scale.",
    },
    {
      title: "RISK-DISCIPLINED DESIGN",
      body: "Architectures where risk controls are structural invariants rather than advisory conventions.",
    },
    {
      title: "PERFORMANCE WORK",
      body: "Throughput and latency engineering where measurement context is part of the deliverable.",
    },
  ],
  experience: [
    {
      project: "APEX QUANT ENGINE",
      role: "Sole architect and engineer",
      scope:
        "Complete research-to-execution pipeline: data engine, strategy engine, risk engine, portfolio allocation, deterministic backtesting, paper execution.",
      metrics: "+570.18% net simulated ROI (master-fund backtest) · 5,867 trades · 44.50s backtest",
      href: "/builds/apex-quant-engine",
    },
    {
      project: "AUTOMATED TRADING OS",
      role: "Sole architect and engineer",
      scope:
        "Multi-timeframe execution architecture with verified structural controls from HTF context to order construction.",
      metrics: "1% risk cap · 1:4 R:R floor · full cost modelling",
      href: "/builds/automated-trading-os",
    },
    {
      project: "QUANT MARKET DATA REPLAY",
      role: "Sole architect and engineer",
      scope:
        "Point-in-time safe market-data infrastructure with deterministic replay and adversarial testing.",
      metrics: "9-stage pipeline · nanosecond timestamps · SQLite WAL",
      href: "/builds/market-data-replay",
    },
    {
      project: "QRSIP",
      role: "Sole architect and engineer",
      scope:
        "Research governance platform: hypothesis → experiment → verification → artifact → report → promotion.",
      metrics: "352 tests · deterministic fixtures · CI security validation",
      href: "/builds/qrsip",
    },
    {
      project: "BILLING DATA GATEWAY",
      role: "Sole engineer",
      scope:
        "Zero-dependency C11 utility normalizing multi-cloud cost exports into an intermediate financial model.",
      metrics: "487,421 rec/s · 31.89 MB/s · 2,051 ns per record",
      href: "https://github.com/CloudOps-Financial-Platform/billing-data-gateway",
    },
  ],
} as const;
