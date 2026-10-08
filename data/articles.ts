/**
 * Editorial archive.
 *
 * Only real engineering notes are listed. Each one is written from work that
 * already exists in this repository — the same facts as the linked research
 * entry and case study, no new claims. The schema is intentionally complete so
 * future writing drops in without touching a page.
 */

export type ArticleCategory =
  | "QUANT"
  | "MARKETS"
  | "DATA"
  | "ENGINEERING"
  | "AI"
  | "RESEARCH"
  | "LEARNING"
  | "PROJECT NOTES";

export const articleCategories: ArticleCategory[] = [
  "QUANT",
  "MARKETS",
  "DATA",
  "ENGINEERING",
  "AI",
  "RESEARCH",
  "LEARNING",
  "PROJECT NOTES",
];

export interface ArticleSection {
  heading: string;
  body: string[];
}

export interface Article {
  id: string;
  index: string;
  title: string;
  category: ArticleCategory;
  /** ISO publication date. These notes are published with the site. */
  published: string;
  readingTime: string;
  dek: string;
  summary: string;
  sections: ArticleSection[];
  takeaways: string[];
  relatedProject?: string;
  relatedResearch?: string;
  status: "PUBLISHED" | "PLANNED";
}

export const articles: Article[] = [
  {
    id: "lookahead-bias-is-an-engineering-failure",
    index: "01",
    title: "Lookahead Bias Is an Engineering Failure, Not a Statistical One",
    category: "DATA",
    published: "2026-10-08",
    readingTime: "7 MIN",
    dek: "The most common way a backtest lies to you is not a modelling mistake. It is a read that should not have been possible.",
    summary:
      "Lookahead bias is usually treated as a discipline problem — be careful, don't peek. That framing fails because it depends on a human remembering. The alternative is to make peeking structurally impossible in the data layer, so the strategy code cannot express the mistake even by accident.",
    sections: [
      {
        heading: "THE USUAL FRAMING IS WRONG",
        body: [
          "Most discussions of lookahead bias end with an instruction: make sure your strategy only uses information available at the decision timestamp. This is correct and almost completely useless as a control, because it is a rule about what a developer must remember while writing code that is already complicated.",
          "A rule that depends on discipline fails silently. The failure appears as an unusually good equity curve, which is exactly the outcome a researcher is least motivated to interrogate.",
        ],
      },
      {
        heading: "WHERE THE LEAK ACTUALLY ENTERS",
        body: [
          "In practice, leakage rarely enters through the strategy's decision logic. It enters through the data layer: a resampled window that includes the bar being predicted, a join against a table that was last written after the event, a normalization step that used a full-series statistic to scale each point.",
          "Each of these is an infrastructure decision made long before the strategy logic runs. By the time the strategy looks wrong, the cause is several layers away from where the researcher is looking.",
        ],
      },
      {
        heading: "MAKE IT UNREPRESENTABLE",
        body: [
          "quant-market-data-replay takes the position that information-flow correctness belongs in the storage and access layer. A query is answered at a point in time, and the access path for anything after that point does not exist. Consumers cannot opt out of the guarantee because there is no code path that returns the future.",
          "The test for this is adversarial rather than illustrative: deliberately attempt to extract future information through every access pattern available and confirm each attempt fails. A test that only confirms correct behaviour does not tell you whether the wrong behaviour is reachable.",
          "This page's sibling instrument in the lab demonstrates the boundary directly — scrub a timestamp and the region that did not exist at that moment is rendered as unreachable rather than merely hidden.",
        ],
      },
      {
        heading: "WHAT THIS DOES NOT FIX",
        body: [
          "Point-in-time access guarantees stop leakage at the boundary. They say nothing about a strategy that misuses a resampled window computed above the data layer, and they say nothing about statistical overfitting to one historical window.",
          "The honest position is that this eliminates one failure class completely and leaves the others exactly where they were. That is still worth doing, because a failure class that cannot occur is a failure class that no longer has to be checked by eye.",
        ],
      },
    ],
    takeaways: [
      "Leakage usually enters through infrastructure, not strategy logic.",
      "Adversarial tests prove reachability is absent; confirmatory tests do not.",
      "The guarantee covers access, not strategy misuse above the boundary.",
    ],
    relatedProject: "market-data-replay",
    relatedResearch: "lookahead-bias",
    status: "PUBLISHED",
  },
  {
    id: "determinism-is-not-validity",
    index: "02",
    title: "Determinism Is Not Validity",
    category: "QUANT",
    published: "2026-10-08",
    readingTime: "6 MIN",
    dek: "A reproducible backtest is a prerequisite for research. It is not evidence that the research is any good.",
    summary:
      "Making a backtest produce byte-identical output on every run is genuinely valuable, and it is easy to over-claim. Determinism removes accidental false positives so that real statistical work becomes possible — it does not perform that work.",
    sections: [
      {
        heading: "THE CLAIM AND ITS LIMIT",
        body: [
          "If identical inputs produce identical outputs, then a result that cannot be reproduced is not a result. This sounds modest and is actually a strong filter: it eliminates an entire class of findings that were never findings at all, just unstable artefacts of ordering, floating-point paths or unseeded randomness.",
          "The limit is that determinism is orthogonal to statistical validity. A strategy can reproduce perfectly and still be curve-fitted to one historical window. Reproducibility tells you the number is real; it tells you nothing about whether the number means anything.",
        ],
      },
      {
        heading: "WHAT DETERMINISM BUYS",
        body: [
          "In apex-quant-engine the harness regenerates the same equity curve from the same raw bars across repeated runs, down to the tie-breaking rules for equal timestamps. That property is what makes a parameter sweep interpretable at all: when a result changes, it changed because the inputs changed.",
          "Without it, every comparison carries an unquantified error term made of execution ordering and initialization order, and the researcher is left reasoning about differences that may be noise in the harness rather than signal in the data.",
        ],
      },
      {
        heading: "THE DISCIPLINE IT DOES NOT REPLACE",
        body: [
          "Out-of-sample evaluation, multiple-comparison correction and the willingness to record a negative result are what actually separate research from fitting. None of them are provided by a deterministic harness.",
          "The productive framing is sequencing: determinism first, because it is cheap and it clears the ground; statistical discipline second, because it is expensive and it is the part that cannot be automated away.",
        ],
      },
      {
        heading: "FAILURES ARE PART OF THE RECORD",
        body: [
          "A harness that makes results reproducible also makes negative results cheap to publish. Setups that fail a structural floor never reach execution, and configurations that fail out-of-sample stay in the record instead of being quietly deleted.",
          "That is the point. The archive is more useful when it contains the failures than when it contains only the survivors.",
        ],
      },
    ],
    takeaways: [
      "Reproducibility is a precondition for research, not a result.",
      "Equal-timestamp tie-breaking is a determinism decision, not an implementation detail.",
      "The part that cannot be automated — out-of-sample discipline — is the part that decides validity.",
    ],
    relatedProject: "apex-quant-engine",
    relatedResearch: "backtest-overfitting",
    status: "PUBLISHED",
  },
  {
    id: "risk-controls-before-order-construction",
    index: "03",
    title: "Risk Controls Belong Before Order Construction",
    category: "QUANT",
    published: "2026-10-08",
    readingTime: "6 MIN",
    dek: "Controls applied after sizing are advice. Controls applied before sizing change which trades exist at all.",
    summary:
      "The order of operations in a trading pipeline is not a stylistic choice. It determines whether a risk limit filters a decision or merely annotates it, and the difference is measurable in the admitted-trade population rather than in the outcome distribution.",
    sections: [
      {
        heading: "THE ORDERING QUESTION",
        body: [
          "Most trading systems implement risk as a check: size the position, then verify that the resulting risk is acceptable, then either proceed or complain. The position already exists by the time the check runs, which means the check has to be obeyed rather than enforced.",
          "Moving the same controls earlier changes their nature. If position size is derived from the stop distance and the risk cap, then the cap is not a limit applied to a size — it is the definition of the size.",
        ],
      },
      {
        heading: "WHAT THE GATE ACTUALLY REMOVES",
        body: [
          "automated_trading_os enforces a 1% per-trade risk cap, a minimum 1:4 R:R floor, fee and slippage modelling, and a cost-budget filter — all before order construction. A setup that fails the R:R floor or the cost budget does not get reduced; it never becomes an order.",
          "This matters because it changes the admitted-trade population, not just the P&L of the surviving trades. The distribution you end up analysing is a different distribution from the one a post-hoc filter would produce.",
        ],
      },
      {
        heading: "ONE-WAY INFORMATION FLOW",
        body: [
          "The same structural argument applies to timeframes. Higher timeframe context establishes direction, mid timeframe maps structure, lower timeframe times the entry, and no lower layer may override a higher constraint. Contradictory signals are eliminated by construction rather than resolved by a scoring function.",
          "A scoring function that weighs conflicting timeframes is a discretionary decision wearing a numeric costume. Enforcing one-way flow removes the decision entirely.",
        ],
      },
      {
        heading: "WHAT IS STILL OPEN",
        body: [
          "The pipeline exists; the attribution study does not. Which of these controls contributes most — the risk cap, the R:R floor, or the cost budget — is an open question, and the ablation work to answer it is registered rather than finished.",
          "Until that study reports, the honest claim is about structure: every admitted trade satisfies every constraint by construction. It is not a claim about profitability.",
        ],
      },
    ],
    takeaways: [
      "Position size derived from the risk cap makes the cap structural rather than advisory.",
      "Pre-trade gates change which trades exist, not only how they end.",
      "Contribution of each control is an open ablation question.",
    ],
    relatedProject: "automated-trading-os",
    relatedResearch: "risk-first-sizing",
    status: "PUBLISHED",
  },
  {
    id: "exact-decimals-or-your-data-is-lying",
    index: "04",
    title: "Exact Decimals, or Your Data Is Quietly Wrong",
    category: "DATA",
    published: "2026-10-08",
    readingTime: "5 MIN",
    dek: "Binary floating point is a representation choice with consequences that surface far from where the choice was made.",
    summary:
      "Storing prices and monetary values as IEEE-754 floats introduces representation error that is invisible per record and visible in aggregates, joins and risk calculations. The failure is not a crash — it is a plausible number that is slightly wrong.",
    sections: [
      {
        heading: "THE INVISIBLE FAILURE CLASS",
        body: [
          "A float cannot represent most decimal fractions exactly. Each individual stored price is off by an amount too small to notice, which is precisely what makes the problem hard: there is no error message, no failed assertion, no obviously wrong output.",
          "The error becomes visible only after aggregation or equality comparison — a join that misses a row because two representations of the same price are not bit-identical, or an aggregate that drifts across runs.",
        ],
      },
      {
        heading: "WHY RESEARCH INFRASTRUCTURE SHOULD CARE",
        body: [
          "At high-frequency trading scale the throughput cost of exact arithmetic is a real trade-off. At research scale it usually is not, and the cost of being wrong is high: a divergence in a join can silently change the sample a study is computed over.",
          "quant-market-data-replay stores and replays with exact decimal arithmetic throughout, so representation drift is removed as a failure mode entirely. Joins and aggregates behave identically across runs.",
        ],
      },
      {
        heading: "REPRESENTATION IS PART OF THE MODEL",
        body: [
          "Choosing a numeric representation is a modelling decision that gets made once, early, usually without discussion, and then constrains everything downstream. It belongs in the same conversation as schema design, not in a performance footnote.",
          "The honest trade-off is throughput for correctness. That is the right trade at research speeds and the wrong one at execution speeds, and the mistake is making it by default rather than deliberately.",
        ],
      },
    ],
    takeaways: [
      "Float representation error is invisible per record and visible in aggregates.",
      "Exact arithmetic removes representation drift as a failure class.",
      "It is a deliberate throughput-for-correctness trade, appropriate at research scale.",
    ],
    relatedProject: "market-data-replay",
    relatedResearch: "decimal-arithmetic",
    status: "PUBLISHED",
  },
  {
    id: "governance-is-the-floor",
    index: "05",
    title: "Governance Is the Floor, Not the Ceiling",
    category: "RESEARCH",
    published: "2026-10-08",
    readingTime: "5 MIN",
    dek: "A promotion gate raises the evidentiary floor of everything that passes through it. It cannot tell you whether the strategy makes money.",
    summary:
      "Research governance is often dismissed as process overhead. It is better understood as a structural filter on what counts as evidence — and, like any filter, it constrains process integrity rather than edge.",
    sections: [
      {
        heading: "THE GATE",
        body: [
          "qrsip moves research through a fixed sequence: hypothesis, experiment, verification, artifact, report, promotion. To reach promotion, an experiment must have a verified artifact — a reproducible run with a recorded configuration and a written limitation.",
          "The gate is structural rather than persuasive. There is no path to promotion that bypasses verification, which means a claim cannot be argued into the record.",
        ],
      },
      {
        heading: "WHAT A GATE CANNOT DO",
        body: [
          "Governance verifies that the work was done properly. It does not verify that the result is economically meaningful. A perfectly governed experiment can conclude that a strategy has no edge, and a well-documented artifact can encode a strategy that loses money out of sample.",
          "Confusing the two is the standard failure of process enthusiasm: treating a passing gate as a positive result.",
        ],
      },
      {
        heading: "WHY IT IS STILL WORTH BUILDING",
        body: [
          "The value is in the floor. Without a gate, the evidentiary standard of a research archive drifts toward whatever is most persuasive, and irreproducible results accumulate alongside real ones with no way to tell them apart.",
          "With the gate in place, everything above the floor is at least real. That is a modest guarantee and it is the difference between a research archive and a folder of charts.",
        ],
      },
    ],
    takeaways: [
      "A gate raises the evidentiary floor; it does not measure edge.",
      "Verification is a precondition for promotion, not a persuasive argument.",
      "A passing gate is not a positive result.",
    ],
    relatedProject: "qrsip",
    relatedResearch: "promotion-gates",
    status: "PUBLISHED",
  },
];

export const publishedArticles = articles.filter((a) => a.status === "PUBLISHED");

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function formatArticleDate(iso: string): string {
  const [y, m] = iso.split("-");
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  const mi = Number(m) - 1;
  return `${months[mi] ?? m} ${y}`;
}
