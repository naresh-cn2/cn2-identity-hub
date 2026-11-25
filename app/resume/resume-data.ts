/**
 * Universal Résumé data for /resume.
 *
 * Grounded strictly in verified portfolio data (data/site.ts, data/credentials.ts,
 * data/works.ts, data/research.ts) and inspected GitHub repositories.
 * No fabricated employment, academic scores, or unverified claims.
 */

export type SkillEvidenceLevel = "Demonstrated" | "Active" | "Familiarity";

export interface UniversalSkillItem {
  name: string;
  level: SkillEvidenceLevel;
}

export interface UniversalSkillGroup {
  category: string;
  summary: string;
  items: UniversalSkillItem[];
}

export interface UniversalProject {
  id: string;
  name: string;
  status: string;
  statusTone: "verified" | "active" | "production" | "private";
  description: string;
  technologies: string[];
  contribution: string;
  evidence: string;
  links: { label: string; href: string; external?: boolean }[];
}

export interface PracticeItem {
  title: string;
  detail: string;
  href?: string;
}

export const UNIVERSAL_RESUME = {
  identity: {
    name: "Bukya Naresh",
    brand: "CN2 — Quantitative Developer",
    direction: "Systems Engineering · Financial Technology · AI Engineering",
    location: "India",
  },

  about: [
    "I am an independent engineer building across systems engineering, financial technology, and applied AI. My work focuses on turning complex problem domains into deterministic, testable software—spanning data infrastructure, backend APIs, quantitative simulation engines, and LLM agent tooling.",
    "I treat engineering as an evidence discipline: understand the failure modes first, design clear architectural boundaries, and verify behavior with automated test suites and explicit limitations. Across daily development, I use AI-assisted coding, debugging, and code review to accelerate iteration while keeping human judgment, reproducibility, and verification gates in control.",
  ],

  skillGroups: [
    {
      category: "Programming Languages",
      summary: "Core languages used across production, data, AI, and systems repositories",
      items: [
        { name: "Python (3.10–3.12)", level: "Demonstrated" },
        { name: "C / C++17–20", level: "Demonstrated" },
        { name: "TypeScript / JavaScript", level: "Demonstrated" },
        { name: "SQL", level: "Demonstrated" },
        { name: "Bash", level: "Demonstrated" },
      ],
    },
    {
      category: "Backend & Software Engineering",
      summary: "APIs, web platforms, relational storage, and concurrent architectures",
      items: [
        { name: "FastAPI", level: "Demonstrated" },
        { name: "Flask", level: "Demonstrated" },
        { name: "aiohttp", level: "Demonstrated" },
        { name: "Next.js 16 / React 19", level: "Demonstrated" },
        { name: "Node.js", level: "Demonstrated" },
        { name: "REST APIs & WebSockets", level: "Demonstrated" },
        { name: "SQLite (WAL)", level: "Demonstrated" },
        { name: "PostgreSQL", level: "Demonstrated" },
      ],
    },
    {
      category: "Quantitative & Financial Systems",
      summary: "Deterministic simulation, market-data integrity, and risk governance",
      items: [
        { name: "Deterministic Backtesting", level: "Demonstrated" },
        { name: "Point-in-Time Market Data", level: "Demonstrated" },
        { name: "Exact Decimal Arithmetic", level: "Demonstrated" },
        { name: "Quantitative Research", level: "Demonstrated" },
        { name: "Pre-Trade Risk Controls", level: "Active" },
      ],
    },
    {
      category: "AI / Machine Learning",
      summary: "Classical AI, supervised learning, reinforcement learning, vision, and NLP",
      items: [
        { name: "Search & Adversarial Search", level: "Demonstrated" },
        { name: "Bayesian & Markov Models", level: "Demonstrated" },
        { name: "Supervised ML & Q-Learning", level: "Demonstrated" },
        { name: "TensorFlow / Keras (CNNs)", level: "Demonstrated" },
        { name: "OpenCV", level: "Demonstrated" },
        { name: "NLTK & Transformers / BERT", level: "Demonstrated" },
      ],
    },
    {
      category: "LLM & Agent Engineering",
      summary: "Tool protocols, agent orchestration, observability, and execution boundaries",
      items: [
        { name: "Model Context Protocol (MCP)", level: "Demonstrated" },
        { name: "JSON-RPC 2.0", level: "Demonstrated" },
        { name: "Multi-Agent Orchestration", level: "Demonstrated" },
        { name: "Context & Prompt Engineering", level: "Demonstrated" },
        { name: "Gradio & Agent Sandboxing", level: "Demonstrated" },
      ],
    },
    {
      category: "AI-Assisted Engineering",
      summary: "Human-directed workflows accelerating build, debug, and review cycles",
      items: [
        { name: "AI-Assisted Coding", level: "Demonstrated" },
        { name: "Vibe Coding", level: "Demonstrated" },
        { name: "AI-Assisted Debugging", level: "Demonstrated" },
        { name: "AI-Assisted Code Review", level: "Demonstrated" },
      ],
    },
    {
      category: "Data Engineering",
      summary: "Ingestion, schema validation, normalization, and high-throughput parsing",
      items: [
        { name: "pandas & NumPy", level: "Demonstrated" },
        { name: "SciPy & PyArrow", level: "Familiarity" },
        { name: "Hugging Face datasets", level: "Demonstrated" },
        { name: "Schema Validation & Quarantine", level: "Demonstrated" },
        { name: "C11 POSIX mmap Parsing", level: "Demonstrated" },
      ],
    },
    {
      category: "Testing & Verification",
      summary: "Automated test harnesses, sanitizers, adversarial checks, and QA suites",
      items: [
        { name: "pytest", level: "Demonstrated" },
        { name: "GoogleTest & SQLLogicTest", level: "Demonstrated" },
        { name: "ASan / UBSan", level: "Demonstrated" },
        { name: "Adversarial & Replay Testing", level: "Demonstrated" },
        { name: "PowerShell QA Suites", level: "Demonstrated" },
      ],
    },
    {
      category: "Developer Tools & Infrastructure",
      summary: "Version control, CI/CD, containerization, and build systems",
      items: [
        { name: "Git & GitHub Actions", level: "Demonstrated" },
        { name: "CI/CD Pipelines", level: "Demonstrated" },
        { name: "Docker", level: "Demonstrated" },
        { name: "Linux / POSIX", level: "Demonstrated" },
        { name: "CMake", level: "Demonstrated" },
      ],
    },
  ] as UniversalSkillGroup[],

  projects: [
    {
      id: "context-engineering-labs",
      name: "Context Engineering Labs",
      status: "COMPLETED · VERIFIED (72/72 TESTS)",
      statusTone: "verified",
      description:
        "Six agent-stack implementations in one repository: dataset validation CLI, 5-tool JSON-RPC 2.0 MCP server with Gradio UI, cross-agent plugin manifests, multi-agent code-review pipeline, FastAPI lifecycle dashboard, and sandboxed execution harness.",
      technologies: ["Python 3.12", "FastAPI", "Gradio", "MCP", "pandas", "pyarrow", "pytest"],
      contribution:
        "Sole author; implemented all six units, dual-mode live/deterministic orchestration, and explicit per-unit limitation audits.",
      evidence: "72/72 pytest tests reproduced from a fresh clone (local processes; not cloud-deployed).",
      links: [
        { label: "CASE STUDY", href: "/works/context-engineering-labs" },
        { label: "GITHUB", href: "https://github.com/naresh-cn2/context-engineering-labs", external: true },
      ],
    },
    {
      id: "settleiq",
      name: "SettleIQ",
      status: "ACTIVE DEVELOPMENT · v0.1.0 RELEASED",
      statusTone: "active",
      description:
        "Payment settlement reconciliation and discrepancy investigation engine providing deterministic matching of charges, fees, and payouts with zero-float exact money safety and audit-ready record traceability.",
      technologies: ["Python 3.12", "FastAPI", "React 18", "TypeScript", "PostgreSQL 16", "Docker"],
      contribution:
        "Sole architect and developer; built FastAPI reconciliation engine, React/TypeScript frontend, Docker setup, and CI test suite.",
      evidence: "226 passing tests in CI, v0.1.0 release, live preview deployment on Vercel.",
      links: [
        { label: "OVERVIEW", href: "/work/settleiq" },
        { label: "GITHUB", href: "https://github.com/naresh-cn2/settleiq", external: true },
      ],
    },
    {
      id: "quant-market-data-replay",
      name: "Quant Market Data Replay",
      status: "COMPLETED · RELEASED (70 TESTS)",
      statusTone: "verified",
      description:
        "Nine-stage point-in-time safe market-data infrastructure (ingestion, normalization, validation, quarantine, causal reorder, SQLite WAL storage, sliding watermark, and deterministic replay) eliminating lookahead bias by construction.",
      technologies: ["Python 3.10–3.12", "SQLite (WAL)", "Exact Decimal", "Nanosecond Clocks", "pytest"],
      contribution:
        "Sole architect and engineer; designed the 9-stage pipeline, quarantine model, deterministic tie-breaking, and adversarial test suite.",
      evidence: "70-test CI suite passing on Python 3.10–3.12 including adversarial future-leakage tests.",
      links: [
        { label: "CASE STUDY", href: "/work/market-data-replay" },
        { label: "GITHUB", href: "https://github.com/naresh-cn2/quant-market-data-replay", external: true },
      ],
    },
    {
      id: "qrsip",
      name: "QRSIP — Quant Research Strategy Intelligence Platform",
      status: "ACTIVE DEVELOPMENT · ALPHA (352 TESTS)",
      statusTone: "active",
      description:
        "Research governance platform enforcing a 6-stage lifecycle (hypothesis → experiment → verification → artifact → report → promotion) so strategies cannot graduate without reproducible, verified evidence.",
      technologies: ["Python 3.12", "pytest", "GitHub Actions", "Docker", "Deterministic Fixtures"],
      contribution:
        "Sole architect; implemented workflow stages, automated artifact-backed reporting, promotion gate checks, and CI security validation.",
      evidence: "352/352 pytest tests passing on deterministic fixtures (baseline 8fc4590).",
      links: [
        { label: "CASE STUDY", href: "/work/qrsip" },
        { label: "GITHUB", href: "https://github.com/naresh-cn2/quant-research-strategy-intelligence-platform", external: true },
      ],
    },
    {
      id: "bustub-engine",
      name: "BusTub — Relational Database Storage & Execution Engine",
      status: "COMPLETED · VERIFIED (56/56 SUITES)",
      statusTone: "private",
      description:
        "Disk-backed, multi-threaded relational database engine (CMU 15-445/645) implementing an LRU-K buffer pool, asynchronous disk scheduler, latch-crabbing B+ Tree, Volcano query executor with rule optimizer, and Strict 2PL with deadlock detection.",
      technologies: ["C++20", "POSIX Threads", "CMake", "GoogleTest", "SQLLogicTest", "ASan / UBSan"],
      contribution:
        "Implemented all four core database subsystems from scratch under strict memory-safety and concurrency invariants.",
      evidence: "56/56 automated test suites passed; 0 memory leaks or data races under ASan and UBSan. Source private per CMU academic integrity.",
      links: [{ label: "CASE STUDY", href: "/case-studies/bustub-engine" }],
    },
    {
      id: "billing-data-gateway",
      name: "Billing Data Gateway",
      status: "COMPLETED · RELEASED v1.0.0",
      statusTone: "verified",
      description:
        "Zero-dependency C11 financial data engine normalizing multi-cloud cost exports (AWS CUR 2.0 and Azure) into an intermediate financial model using POSIX memory-mapped I/O.",
      technologies: ["C11", "POSIX mmap", "Zero-Copy Parsing", "-O3 Build"],
      contribution:
        "Sole engineer; designed zero-dependency C11 parser, format adapters, and benchmark harness.",
      evidence: "v1.0.0 release; self-benchmarked at 487,421 records/sec (31.89 MB/s, 2,051 ns/record).",
      links: [
        { label: "OVERVIEW", href: "/work/billing-data-gateway" },
        { label: "GITHUB", href: "https://github.com/CloudOps-Financial-Platform/billing-data-gateway", external: true },
      ],
    },
    {
      id: "apex-quant-engine",
      name: "APEX Quant Engine",
      status: "COMPLETED · BACKTEST / PAPER",
      statusTone: "verified",
      description:
        "Multi-strategy quantitative trading and simulation engine across BTC, ETH, and SOL coupling deterministic data access, signal contracts, pre-trade risk budgeting, portfolio allocation, and paper execution.",
      technologies: ["Python", "Deterministic Backtesting", "Cost Modelling", "Paper Execution"],
      contribution:
        "Sole architect and engineer; built unified research-to-paper-execution path with explicit fee and slippage modelling.",
      evidence: "Simulated master-fund backtest over 11.9M+ 1-minute bars and 5,867 trades in 44.50s (simulation only, not live trading).",
      links: [
        { label: "CASE STUDY", href: "/work/apex-quant-engine" },
        { label: "GITHUB", href: "https://github.com/naresh-cn2/apex-quant-engine", external: true },
      ],
    },
    {
      id: "open-verse",
      name: "OPEN-VERSE",
      status: "ACTIVE DEVELOPMENT · v0.2.8",
      statusTone: "active",
      description:
        "Cross-platform autonomous AI coding assistant (Desktop, Mobile, Web) integrating upstream open-source agent engines with a unified Tauri/Next.js product shell, telemetry dashboard, and signed release pipelines.",
      technologies: ["Python", "TypeScript", "Tauri", "Next.js", "Android APK", "GitHub Actions"],
      contribution:
        "Product integration, cross-platform packaging, telemetry dashboard, and automated release/QA verification; upstream engines (cline, hermes-agent, openclaw, opencode) attributed in NOTICE.md.",
      evidence: "11 tagged releases (v0.2.0–v0.2.8), live portal, and automated artifact/visual QA scripts.",
      links: [
        { label: "OVERVIEW", href: "/work/open-verse" },
        { label: "GITHUB", href: "https://github.com/naresh-cn2/OPEN-VERSE", external: true },
      ],
    },
  ] as UniversalProject[],

  practiceAndResearch: [
    {
      title: "Independent Systems & Software Development",
      detail:
        "Architecting and shipping full-stack platforms, backend APIs, C/C++ data engines, and Python automation tools with reproducible test suites and CI pipelines (CN2.DEV production platform: 125 static routes, 305/305 QA assertions).",
      href: "/works",
    },
    {
      title: "Quantitative Research & Data Integrity",
      detail:
        "Eight documented investigations covering lookahead bias as an infrastructure failure, determinism vs. statistical validity, exact decimal arithmetic, pre-trade risk sizing, deterministic nanosecond tie-breaking, and strategy promotion gates.",
      href: "/research",
    },
    {
      title: "AI Engineering & Agentic Workflows",
      detail:
        "Building MCP servers, multi-agent review pipelines, dataset validation gates, and human-in-the-loop verification harnesses alongside 12 applied AI projects in Harvard CS50AI (search, logic, Bayesian inference, RL, CNNs, NLP/BERT).",
      href: "/works/cs50-ai",
    },
    {
      title: "Open-Source & Technical Documentation",
      detail:
        "Maintaining 35+ original public repositories with explicit limitation disclosures, verification guides, and architectural case studies rather than unverified claims.",
      href: "/proof",
    },
  ] as PracticeItem[],

  education: {
    formal: {
      degree: "Bachelor of Commerce (B.Com)",
      institution: "Dr. B.R. Ambedkar Open University (BRAOU), Hyderabad",
      status: "Currently pursuing — Semester III / second year",
      note: "Undergraduate commerce degree currently in progress. Technical engineering capabilities are established through verified projects, test suites, and technical credentials.",
    },
    credentialIds: [
      "cs50ai-artificial-intelligence",
      "cs50x-introduction-to-computer-science",
      "datateach-gen-ai-internship",
      "reliance-ai-data-engineer",
      "wqu-data-science-lab",
      "sfj-generative-ai-ml",
      "nsdc-data-engineering-analyst",
      "unstop-python-dsa",
    ],
  },
} as const;
