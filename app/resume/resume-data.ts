/**
 * Résumé content. Every line here is drawn from the site's existing data:
 * data/career.ts, data/credentials.ts, data/works.ts, data/site.ts and the
 * self-directed study records in data/credentials.ts. No employment history,
 * clients, degrees or metrics are invented.
 */

export type ResumeDirectionId =
  | "systems-backend"
  | "quantitative-developer"
  | "ai-engineer";

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface ResumeDirection {
  id: ResumeDirectionId;
  title: string;
  index: string;
  subtitle: string;
  summary: string;
  skills: SkillGroup[];
  studyTracks: string[];
  credentialIds: string[];
  projectIds: string[];
  work: { name: string; detail: string }[];
}

export const RESUME_DIRECTIONS: ResumeDirection[] = [
  {
    id: "systems-backend",
    title: "Systems / Backend Engineer",
    index: "01",
    subtitle: "Reliable software, databases, data infrastructure and computational systems.",
    summary:
      "Independent engineer building systems from the ground up — database engines, data pipelines and full-stack platforms. Work is designed for deterministic behavior, memory safety and operational correctness, then verified with test suites and sanitizers.",
    skills: [
      {
        label: "Languages",
        items: ["C / C++20", "Python", "TypeScript", "JavaScript", "SQL"],
      },
      {
        label: "Frameworks & runtimes",
        items: ["Node.js", "FastAPI", "Next.js", "React", "POSIX threads"],
      },
      {
        label: "Data & storage",
        items: ["PostgreSQL", "SQLite (WAL)", "MySQL", "In-memory indexes"],
      },
      {
        label: "Infrastructure & tools",
        items: [
          "Linux / POSIX",
          "Docker",
          "Git",
          "GitHub Actions",
          "CMake",
          "GoogleTest",
          "ASan / UBSan",
        ],
      },
    ],
    studyTracks: [
      "Systems performance — C11 and POSIX",
      "Algorithms and data structures",
      "Research governance and experiment design",
    ],
    credentialIds: [
      "cs50x-introduction-to-computer-science",
      "cs50ai-artificial-intelligence",
      "nsdc-data-engineering-analyst",
      "unstop-python-dsa",
    ],
    projectIds: ["bustub-engine", "cn2-identity-hub", "qrsip"],
    work: [
      {
        name: "BILLING DATA GATEWAY",
        detail:
          "Zero-dependency C11 pipeline normalizing multi-cloud cost exports; 487,421 records/sec, 31.89 MB/s, POSIX mmap and zero-copy parsing.",
      },
      {
        name: "BUSTUB ENGINE",
        detail:
          "Disk-backed multithreaded relational engine in C++20: buffer pool, latch-crabbing B+ tree, Volcano execution and strict 2PL. 56/56 suites, ASan/UBSan clean.",
      },
      {
        name: "QRSIP",
        detail:
          "Research governance platform with a hypothesis-to-promotion workflow and 352 deterministic tests under CI security validation.",
      },
      {
        name: "CN2.DEV",
        detail:
          "Full-stack identity and portfolio platform in Next.js 16 / React 19 with 95+ static routes and production deployment.",
      },
    ],
  },
  {
    id: "quantitative-developer",
    title: "Quantitative Developer",
    index: "02",
    subtitle:
      "Quantitative engines, financial computation systems, market-data infrastructure and research tools.",
    summary:
      "Independent quantitative developer building systems where correctness precedes performance: deterministic backtesting, point-in-time safe market data, structural risk controls and research governance. Results carry explicit provenance and stated limitations — never presented as live trading returns.",
    skills: [
      {
        label: "Languages",
        items: ["Python", "C++20", "SQL", "Bash"],
      },
      {
        label: "Data & libraries",
        items: ["NumPy", "Pandas", "SciPy", "SQLite (WAL)", "Time-series tooling"],
      },
      {
        label: "Quantitative methods",
        items: [
          "Deterministic backtesting",
          "Point-in-time data",
          "Exact decimals",
          "Risk-first sizing",
          "Cost modelling",
        ],
      },
      {
        label: "Infrastructure & tools",
        items: ["Git", "GitHub Actions", "pytest", "Docker", "Reproducible fixtures"],
      },
    ],
    studyTracks: [
      "Deterministic simulation and backtesting",
      "Market-data integrity and point-in-time correctness",
      "Exact arithmetic in financial computation",
    ],
    credentialIds: [
      "quantconnect-us-equities-101",
      "wqu-data-science-lab",
      "cs50x-introduction-to-computer-science",
      "nsdc-data-engineering-analyst",
    ],
    projectIds: ["apex-quant-engine", "market-data-replay", "automated-trading-os"],
    work: [
      {
        name: "APEX QUANT ENGINE",
        detail:
          "Research-to-execution pipeline with deterministic backtesting over 11.9M+ one-minute bars, 5,867 completed simulated trades and explicit cost modelling.",
      },
      {
        name: "QUANT MARKET DATA REPLAY",
        detail:
          "Point-in-time safe nine-stage ingestion and replay platform with nanosecond timestamps, exact decimals and adversarial lookahead-bias tests.",
      },
      {
        name: "AUTOMATED TRADING OS",
        detail:
          "Multi-timeframe execution architecture with a 1% per-trade risk cap, 1:4 R:R admission floor and cost-budget filtering.",
      },
      {
        name: "QRSIP",
        detail:
          "Experiment governance platform: hypothesis, experiment, verification, artifact, report and promotion, backed by 352 deterministic tests.",
      },
    ],
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    index: "03",
    subtitle:
      "AI-assisted workflows, agent infrastructure, tool protocols and intelligent software systems.",
    summary:
      "Independent engineer building AI systems where humans define direction and AI accelerates execution. Focus on agent orchestration, Model Context Protocol tooling, sandboxed execution boundaries and lifecycle observability, with verification gates deciding whether output earns trust.",
    skills: [
      {
        label: "Languages",
        items: ["Python", "TypeScript", "JavaScript", "SQL"],
      },
      {
        label: "Frameworks & runtimes",
        items: ["FastAPI", "Gradio", "Next.js", "React", "Node.js"],
      },
      {
        label: "AI & agent systems",
        items: [
          "Model Context Protocol",
          "Agent orchestration",
          "LLM integration",
          "Agent Skills",
          "Prompt / tool protocols",
        ],
      },
      {
        label: "Infrastructure & tools",
        items: [
          "Sandboxed execution",
          "Path confinement",
          "Command allowlisting",
          "pytest",
          "GitHub Actions",
          "Docker",
        ],
      },
    ],
    studyTracks: [
      "Research governance and experiment design",
      "Algorithms and data structures",
      "Systems performance — C11 and POSIX",
    ],
    credentialIds: [
      "cs50ai-artificial-intelligence",
      "datateach-gen-ai-internship",
      "reliance-ai-data-engineer",
      "sfj-generative-ai-ml",
      "nasscom-ai-devops-analyst",
    ],
    projectIds: ["context-engineering-labs", "qrsip", "cn2-identity-hub"],
    work: [
      {
        name: "CONTEXT ENGINEERING LABS",
        detail:
          "Six agent-system implementations in one public repository: portable skills, an MCP server, cross-agent bundles, multi-agent review, lifecycle observability and a sandboxed execution harness. 72/72 tests reproduced from a fresh clone.",
      },
      {
        name: "QRSIP",
        detail:
          "Research governance platform with Python automation, classification and pattern detection across the research archive, enforced by 352 deterministic tests.",
      },
      {
        name: "CN2.DEV",
        detail:
          "Next.js 16 / React 19 platform with typed architectures, evidence-backed content and an AI-ready component system.",
      },
    ],
  },
];

export function getResumeDirection(id: string): ResumeDirection | undefined {
  return RESUME_DIRECTIONS.find((direction) => direction.id === id);
}
