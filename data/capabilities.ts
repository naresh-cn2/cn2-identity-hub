export type CapabilityDomain =
  | "QUANT"
  | "DATA"
  | "ENGINEERING"
  | "AI"
  | "FINTECH"
  | "RESEARCH"
  | "SYSTEMS"
  | "CLOUD";

export interface Capability {
  id: string;
  name: string;
  description: string;
  projects: string[];
  research: string[];
  technologies: string[];
  domain: CapabilityDomain;
  evidence: string;
}

export const capabilityDomains: CapabilityDomain[] = [
  "QUANT",
  "DATA",
  "ENGINEERING",
  "AI",
  "FINTECH",
  "RESEARCH",
  "SYSTEMS",
  "CLOUD",
];

export const capabilities: Capability[] = [
  {
    id: "quant-research",
    name: "QUANTITATIVE RESEARCH",
    domain: "RESEARCH",
    description:
      "Forming falsifiable market hypotheses and testing them with deterministic experiments — evidence before conclusions.",
    projects: ["apex-quant-engine", "qrsip"],
    research: ["backtest-overfitting", "regime-dependence"],
    technologies: ["Hypothesis workflow", "Statistical evaluation", "Deterministic fixtures"],
    evidence:
      'Written up as "Reproducibility as an Overfitting Defense" and "Regime Dependence in Strategy Populations", tested against the apex-quant-engine fixture harness.',
  },
  {
    id: "market-data",
    name: "MARKET DATA",
    domain: "DATA",
    description:
      "Point-in-time safe market-data infrastructure: ingestion, normalization, validation and deterministic replay.",
    projects: ["market-data-replay"],
    research: ["lookahead-bias", "decimal-arithmetic"],
    technologies: ["SQLite WAL", "Nanosecond timestamps", "Exact decimals"],
    evidence:
      "market-data-replay ingests into SQLite WAL with nanosecond timestamps and exact decimals, and replays it deterministically.",
  },
  {
    id: "systematic-trading",
    name: "SYSTEMATIC TRADING",
    domain: "QUANT",
    description:
      "Rule-based multi-strategy trading architectures where entries, exits and sizing are code, not discretion.",
    projects: ["apex-quant-engine", "automated-trading-os"],
    research: ["multi-timeframe-alignment"],
    technologies: ["Multi-strategy engines", "Signal contracts", "Paper execution"],
    evidence:
      "apex-quant-engine and automated-trading-os implement multi-strategy engines, signal contracts and paper execution as code.",
  },
  {
    id: "backtesting",
    name: "BACKTESTING",
    domain: "QUANT",
    description:
      "Deterministic simulation over historical bars with explicit fees and slippage — reproducible run to run.",
    projects: ["apex-quant-engine"],
    research: ["backtest-overfitting", "lookahead-bias"],
    technologies: ["Deterministic replay", "Cost modelling", "11.9M+ bar harness"],
    evidence:
      'The apex-quant-engine harness simulates 11.9M+ bars with explicit cost modelling, and "Lookahead Bias as an Engineering Failure" documents the failure modes it guards against.',
  },
  {
    id: "risk",
    name: "RISK",
    domain: "QUANT",
    description:
      "Risk-first position sizing and structural controls: caps, R:R floors, profit locks and giveback limits.",
    projects: ["automated-trading-os"],
    research: ["risk-first-sizing"],
    technologies: ["1% risk cap", "1:4 R:R floor", "Cost-budget filtering"],
    evidence:
      'automated-trading-os enforces a 1% risk cap, a 1:4 R:R floor and cost-budget filtering, with the reasoning written up in "Position Sizing Before Admission".',
  },
  {
    id: "data-infrastructure",
    name: "DATA INFRASTRUCTURE",
    domain: "DATA",
    description:
      "High-throughput data pipelines: ingestion, transformation and query layers built for scale and exactness.",
    projects: ["market-data-replay", "billing-data-gateway"],
    research: ["decimal-arithmetic"],
    technologies: ["487,421 rec/s pipeline", "POSIX mmap", "Zero-dependency C11", "NSDC Data Standards"],
    evidence:
      'billing-data-gateway\'s zero-dependency C11 pipeline sustains 487,421 rec/s over POSIX mmap, and "Exact Decimal Arithmetic in Market Data" covers the exactness side.',
  },
  {
    id: "performance-engineering",
    name: "PERFORMANCE ENGINEERING",
    domain: "ENGINEERING",
    description:
      "Low-latency systems work — memory-mapped I/O, serialization elimination and bare-metal throughput.",
    projects: ["billing-data-gateway"],
    research: [],
    technologies: ["C11", "POSIX API", "-O3 optimization", "Zero allocations on hot path"],
    evidence:
      "billing-data-gateway is written in C11 against the POSIX API and built at -O3, eliminating serialization from the hot path.",
  },
  {
    id: "ai-intelligence",
    name: "AI & COMPUTATIONAL INTELLIGENCE",
    domain: "AI",
    description:
      "Applying computational methods and generative pipelines where they carry their weight — classification, pattern detection, automation.",
    projects: ["qrsip"],
    research: [],
    technologies: ["Python", "Automation pipelines", "Generative AI", "NSQF Level 7 AI/ML"],
    evidence:
      "qrsip applies Python automation pipelines to classification and pattern detection over the research archive.",
  },
  {
    id: "systems-programming",
    name: "SYSTEMS PROGRAMMING & MEMORY",
    domain: "SYSTEMS",
    description:
      "Low-level memory management, pointer arithmetic, custom allocators, and hardware-close systems engineering in C and C++.",
    projects: ["billing-data-gateway"],
    research: ["decimal-arithmetic"],
    technologies: ["C", "C++", "Memory Layout", "Pointers & Heap Management", "Valgrind", "POSIX"],
    evidence:
      "Demonstrated through CS50x Harvard systems coursework and the zero-dependency C11 billing-data-gateway memory-mapped pipeline.",
  },
  {
    id: "algorithmic-foundations",
    name: "ALGORITHMS & DATA STRUCTURES",
    domain: "ENGINEERING",
    description:
      "Rigorous computational complexity analysis, Big O optimization, custom trees, hash tables, tries, and graph algorithms.",
    projects: ["apex-quant-engine", "market-data-replay"],
    research: ["backtest-overfitting"],
    technologies: ["Big O Analysis", "Hash Tables", "Binary Trees & Tries", "Sorting & Search", "Graph Traversal"],
    evidence:
      "Verified across CS50x Harvard problem sets, Unstop Python DSA curriculum, and the tick indexers in apex-quant-engine.",
  },
  {
    id: "cloud-devops",
    name: "CLOUD & DEVOPS INFRASTRUCTURE",
    domain: "CLOUD",
    description:
      "Containerized orchestration, CI/CD pipelines, cloud deployment, and scalable infrastructure across multi-cloud environments.",
    projects: ["qrsip", "billing-data-gateway"],
    research: [],
    technologies: ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "GitHub Actions", "GitLab CI"],
    evidence:
      "Demonstrated across automated test harnesses, continuous integration test runners (352 tests in QRSIP), and containerized microservices.",
  },
  {
    id: "fullstack-quant-ui",
    name: "FULL-STACK TOOLING & SCIENTIFIC UI",
    domain: "ENGINEERING",
    description:
      "Interactive quantitative research terminals, real-time telemetry dashboards, and high-performance web applications.",
    projects: ["apex-quant-engine", "qrsip"],
    research: [],
    technologies: ["TypeScript", "Next.js", "React", "FastAPI", "Tailwind CSS", "Canvas / WebGL", "WebSockets"],
    evidence:
      "Evidenced by CN2.DEV's interactive quantitative universe, real-time 3D risk manifolds, replay terminals, and research tooling.",
  },
];

/* ---------------- Tech Stack & Tools Matrix ---------------- */

export type TechCategory =
  | "LANGUAGES"
  | "CLOUD & INFRA"
  | "FRAMEWORKS & RUNTIMES"
  | "DATA & QUANT"
  | "DATABASES"
  | "DEVOPS & TOOLS"
  | "DESIGN & 3D";

export interface TechStackItem {
  name: string;
  category: TechCategory;
  accent: "cyan" | "red" | "emerald" | "amber" | "violet" | "blue" | "slate";
  badgeBg: string; // color hex for authentic badge display
  highlight?: boolean;
  provenance?: string;
}

export const techCategories: TechCategory[] = [
  "LANGUAGES",
  "CLOUD & INFRA",
  "FRAMEWORKS & RUNTIMES",
  "DATA & QUANT",
  "DATABASES",
  "DEVOPS & TOOLS",
  "DESIGN & 3D",
];

export const techStack: TechStackItem[] = [
  /* ---- LANGUAGES ---- */
  { name: "C", category: "LANGUAGES", accent: "blue", badgeBg: "#A8B9CC", highlight: true, provenance: "CS50x Harvard · billing-data-gateway C11" },
  { name: "C++", category: "LANGUAGES", accent: "blue", badgeBg: "#00599C", highlight: true, provenance: "High-performance systems & algorithmic trading" },
  { name: "Python", category: "LANGUAGES", accent: "cyan", badgeBg: "#3776AB", highlight: true, provenance: "Primary research & data science language · QRSIP · ATOS" },
  { name: "TypeScript", category: "LANGUAGES", accent: "blue", badgeBg: "#3178C6", highlight: true, provenance: "CN2.DEV platform · Typed system architectures" },
  { name: "JavaScript", category: "LANGUAGES", accent: "amber", badgeBg: "#F7DF1E", provenance: "Interactive web & browser instrumentation" },
  { name: "Rust", category: "LANGUAGES", accent: "red", badgeBg: "#DEA584", highlight: true, provenance: "Memory-safe systems programming & high-throughput concurrency" },
  { name: "C#", category: "LANGUAGES", accent: "violet", badgeBg: "#239120", provenance: ".NET financial tooling & desktop enterprise systems" },
  { name: "R", category: "LANGUAGES", accent: "blue", badgeBg: "#276DC3", provenance: "Statistical computing & time-series econometrics" },
  { name: "Scala", category: "LANGUAGES", accent: "red", badgeBg: "#DC322F", provenance: "Distributed data pipelines & JVM stream processing" },
  { name: "Ruby", category: "LANGUAGES", accent: "red", badgeBg: "#CC342D", provenance: "Scripting & rapid prototyping" },
  { name: "Bash Script", category: "LANGUAGES", accent: "slate", badgeBg: "#4EAA25", provenance: "POSIX automation & QA test harnesses" },
  { name: "Java", category: "LANGUAGES", accent: "red", badgeBg: "#ED8B00", provenance: "Enterprise systems & object-oriented architecture" },
  { name: "HTML5", category: "LANGUAGES", accent: "red", badgeBg: "#E34F26", provenance: "Semantic web architecture & accessible UI" },
  { name: "Objective-C", category: "LANGUAGES", accent: "blue", badgeBg: "#438EFF", provenance: "Native Apple systems programming" },
  { name: "Crystal", category: "LANGUAGES", accent: "slate", badgeBg: "#000100", provenance: "Compiled performance with elegant syntax" },
  { name: "Markdown", category: "LANGUAGES", accent: "slate", badgeBg: "#083fa1", provenance: "Structured research documentation & evidence logging" },

  /* ---- CLOUD & INFRASTRUCTURE ---- */
  { name: "AWS", category: "CLOUD & INFRA", accent: "amber", badgeBg: "#FF9900", highlight: true, provenance: "Cloud computing & storage infrastructure" },
  { name: "Azure", category: "CLOUD & INFRA", accent: "blue", badgeBg: "#0078D4", highlight: true, provenance: "Microsoft enterprise cloud & NSDC integration" },
  { name: "Google Cloud", category: "CLOUD & INFRA", accent: "blue", badgeBg: "#4285F4", highlight: true, provenance: "Cloud analytics, BigQuery & serverless APIs" },
  { name: "Cloudflare", category: "CLOUD & INFRA", accent: "amber", badgeBg: "#F38020", provenance: "Edge caching, DNS & security networking" },
  { name: "DigitalOcean", category: "CLOUD & INFRA", accent: "blue", badgeBg: "#0080FF", provenance: "Cloud VPS droplets & container staging" },
  { name: "Firebase", category: "CLOUD & INFRA", accent: "amber", badgeBg: "#FFCA28", provenance: "Realtime databases & auth services" },
  { name: "Heroku", category: "CLOUD & INFRA", accent: "violet", badgeBg: "#430098", provenance: "PaaS app orchestration" },
  { name: "Linode", category: "CLOUD & INFRA", accent: "emerald", badgeBg: "#00A95C", provenance: "Linux cloud virtual infrastructure" },
  { name: "Netlify", category: "CLOUD & INFRA", accent: "cyan", badgeBg: "#00C7B7", provenance: "Jamstack edge deployment" },
  { name: "Oracle Cloud", category: "CLOUD & INFRA", accent: "red", badgeBg: "#F80000", provenance: "Autonomous database & cloud compute" },
  { name: "OpenStack", category: "CLOUD & INFRA", accent: "red", badgeBg: "#ED1944", provenance: "Private cloud infrastructure & virtualization" },
  { name: "Codeberg", category: "CLOUD & INFRA", accent: "blue", badgeBg: "#2185D0", provenance: "Open-source Git hosting" },
  { name: "Glitch", category: "CLOUD & INFRA", accent: "violet", badgeBg: "#2800D7", provenance: "Collaborative node sandbox runtimes" },

  /* ---- FRAMEWORKS & RUNTIMES ---- */
  { name: "Next.js", category: "FRAMEWORKS & RUNTIMES", accent: "slate", badgeBg: "#000000", highlight: true, provenance: "Core framework for CN2.DEV platform" },
  { name: "React", category: "FRAMEWORKS & RUNTIMES", accent: "cyan", badgeBg: "#61DAFB", highlight: true, provenance: "Component architecture & reactive client systems" },
  { name: "Node.js", category: "FRAMEWORKS & RUNTIMES", accent: "emerald", badgeBg: "#339933", highlight: true, provenance: "Server-side JavaScript runtime & toolchains" },
  { name: "NestJS", category: "FRAMEWORKS & RUNTIMES", accent: "red", badgeBg: "#E0234E", provenance: "Enterprise modular backend architecture" },
  { name: "FastAPI", category: "FRAMEWORKS & RUNTIMES", accent: "cyan", badgeBg: "#009688", highlight: true, provenance: "High-performance asynchronous Python REST APIs" },
  { name: "Flask", category: "FRAMEWORKS & RUNTIMES", accent: "slate", badgeBg: "#000000", provenance: "CS50x Harvard web services & micro-frameworks" },
  { name: "Fastify", category: "FRAMEWORKS & RUNTIMES", accent: "slate", badgeBg: "#000000", provenance: "Ultra-low-overhead Node HTTP servers" },
  { name: "Deno.js", category: "FRAMEWORKS & RUNTIMES", accent: "slate", badgeBg: "#000000", provenance: "Modern secure TypeScript runtime" },
  { name: "Electron", category: "FRAMEWORKS & RUNTIMES", accent: "cyan", badgeBg: "#47848F", provenance: "Cross-platform desktop application shells" },
  { name: "Nuxt", category: "FRAMEWORKS & RUNTIMES", accent: "emerald", badgeBg: "#00DC82", provenance: "Vue-based SSR & static applications" },
  { name: "Angular.js", category: "FRAMEWORKS & RUNTIMES", accent: "red", badgeBg: "#E23237", provenance: "SPA data-binding frameworks" },
  { name: "React Native", category: "FRAMEWORKS & RUNTIMES", accent: "cyan", badgeBg: "#61DAFB", provenance: "Mobile application development" },
  { name: ".NET", category: "FRAMEWORKS & RUNTIMES", accent: "violet", badgeBg: "#512BD4", provenance: "Enterprise CLR runtime services" },
  { name: "JavaFX", category: "FRAMEWORKS & RUNTIMES", accent: "red", badgeBg: "#FF0000", provenance: "Rich client GUI systems" },
  { name: "React Query", category: "FRAMEWORKS & RUNTIMES", accent: "red", badgeBg: "#FF4154", provenance: "Asynchronous state & cache management" },
  { name: "React Router", category: "FRAMEWORKS & RUNTIMES", accent: "red", badgeBg: "#CA4245", provenance: "Declarative client-side routing" },
  { name: "React Hook Form", category: "FRAMEWORKS & RUNTIMES", accent: "red", badgeBg: "#EC5990", provenance: "Performant form state validation" },
  { name: "Socket.io", category: "FRAMEWORKS & RUNTIMES", accent: "slate", badgeBg: "#010101", provenance: "Realtime WebSocket telemetry streaming" },
  { name: "JWT", category: "FRAMEWORKS & RUNTIMES", accent: "violet", badgeBg: "#000000", provenance: "Cryptographic token authentication" },
  { name: "Context API", category: "FRAMEWORKS & RUNTIMES", accent: "cyan", badgeBg: "#61DAFB", provenance: "React hierarchical state distribution" },

  /* ---- DATA & QUANT ---- */
  { name: "NumPy", category: "DATA & QUANT", accent: "blue", badgeBg: "#013243", highlight: true, provenance: "Vectorized array calculations & linear algebra" },
  { name: "Pandas", category: "DATA & QUANT", accent: "blue", badgeBg: "#150458", highlight: true, provenance: "Time-series aggregation, bar resamplers & financial frames" },
  { name: "SciPy", category: "DATA & QUANT", accent: "blue", badgeBg: "#8CAAE6", highlight: true, provenance: "Scientific statistical distributions & optimization" },
  { name: "CUDA", category: "DATA & QUANT", accent: "emerald", badgeBg: "#76B900", highlight: true, provenance: "GPU acceleration for parallel numerical workloads" },
  { name: "Anaconda", category: "DATA & QUANT", accent: "emerald", badgeBg: "#44A833", provenance: "Scientific Python package distribution & environments" },
  { name: "Power BI", category: "DATA & QUANT", accent: "amber", badgeBg: "#F2C811", provenance: "Business intelligence analytics & executive dashboards" },
  { name: "Chart.js", category: "DATA & QUANT", accent: "red", badgeBg: "#FF6384", provenance: "Interactive HTML5 quantitative chart rendering" },
  { name: "OpenAPI / Swagger", category: "DATA & QUANT", accent: "emerald", badgeBg: "#85EA2D", provenance: "Schema contracts & API interface definitions" },

  /* ---- DATABASES & STORAGE ---- */
  { name: "PostgreSQL", category: "DATABASES", accent: "blue", badgeBg: "#4169E1", highlight: true, provenance: "ACID relational storage & analytical querying" },
  { name: "SQLite (WAL)", category: "DATABASES", accent: "cyan", badgeBg: "#003B57", highlight: true, provenance: "Point-in-time market data store in market-data-replay" },
  { name: "MySQL", category: "DATABASES", accent: "blue", badgeBg: "#4479A1", provenance: "Relational database operations" },
  { name: "Microsoft SQL Server", category: "DATABASES", accent: "red", badgeBg: "#CC292B", provenance: "Enterprise transactional SQL data warehouses" },
  { name: "Amazon DynamoDB", category: "DATABASES", accent: "blue", badgeBg: "#4053D6", provenance: "Low-latency distributed NoSQL key-value store" },

  /* ---- DEVOPS, CI/CD & TOOLING ---- */
  { name: "Docker", category: "DEVOPS & TOOLS", accent: "cyan", badgeBg: "#2496ED", highlight: true, provenance: "Containerization & deterministic execution environments" },
  { name: "Kubernetes", category: "DEVOPS & TOOLS", accent: "blue", badgeBg: "#326CE5", highlight: true, provenance: "Container cluster orchestration & scaling" },
  { name: "Git", category: "DEVOPS & TOOLS", accent: "red", badgeBg: "#F05032", highlight: true, provenance: "Distributed version control & branch integrity" },
  { name: "GitHub Actions", category: "DEVOPS & TOOLS", accent: "blue", badgeBg: "#2088FF", highlight: true, provenance: "Automated test suites & continuous integration" },
  { name: "GitLab CI", category: "DEVOPS & TOOLS", accent: "red", badgeBg: "#FC6D26", provenance: "Multi-stage pipeline automation" },
  { name: "GitLab", category: "DEVOPS & TOOLS", accent: "red", badgeBg: "#FC6D26", provenance: "Enterprise repository management" },
  { name: "Forgejo", category: "DEVOPS & TOOLS", accent: "red", badgeBg: "#FF5722", provenance: "Self-hosted lightweight Git software forge" },
  { name: "Playwright", category: "DEVOPS & TOOLS", accent: "emerald", badgeBg: "#2EAD33", provenance: "End-to-end browser testing & automated verification" },
  { name: "Jira", category: "DEVOPS & TOOLS", accent: "blue", badgeBg: "#0052CC", provenance: "Issue tracking, agile workflows & sprint governance" },
  { name: "Notion", category: "DEVOPS & TOOLS", accent: "slate", badgeBg: "#000000", provenance: "Knowledge architectures & system documentation" },

  /* ---- DESIGN, 3D & CREATIVE ---- */
  { name: "Blender", category: "DESIGN & 3D", accent: "amber", badgeBg: "#F5792A", highlight: true, provenance: "3D modelling, parametric topology & rendering" },
  { name: "Aseprite", category: "DESIGN & 3D", accent: "blue", badgeBg: "#7D929E", provenance: "Pixel art & animated frame assets" },
  { name: "Canva", category: "DESIGN & 3D", accent: "cyan", badgeBg: "#00C4CC", provenance: "Vector layouts & presentation design" },
  { name: "Proto.io", category: "DESIGN & 3D", accent: "cyan", badgeBg: "#1D9BF0", provenance: "Interactive UX prototyping" },
  { name: "Sketch", category: "DESIGN & 3D", accent: "amber", badgeBg: "#F7B500", provenance: "Vector interface design" },
  { name: "SketchUp", category: "DESIGN & 3D", accent: "red", badgeBg: "#005F9E", provenance: "Spatial & architectural drafting" },
  { name: "Storybook", category: "DESIGN & 3D", accent: "red", badgeBg: "#FF4785", provenance: "Isolated UI component development & testing" },
  { name: "Adobe Photoshop", category: "DESIGN & 3D", accent: "blue", badgeBg: "#31A8FF", provenance: "Raster imaging & texture synthesis" },
  { name: "Adobe Illustrator", category: "DESIGN & 3D", accent: "amber", badgeBg: "#FF9A00", provenance: "Precision vector diagrams & icon design" },
  { name: "Adobe InDesign", category: "DESIGN & 3D", accent: "red", badgeBg: "#FF3366", provenance: "Editorial layout & publication typography" },
  { name: "Adobe Premiere Pro", category: "DESIGN & 3D", accent: "violet", badgeBg: "#9999FF", provenance: "Cinematic timeline editing & video production" },
  { name: "Adobe After Effects", category: "DESIGN & 3D", accent: "violet", badgeBg: "#9999FF", provenance: "Motion design & visual effects" },
  { name: "Adobe Audition", category: "DESIGN & 3D", accent: "cyan", badgeBg: "#00E4BB", provenance: "Audio processing & signal editing" },
  { name: "Adobe XD", category: "DESIGN & 3D", accent: "red", badgeBg: "#FF61F6", provenance: "Interactive wireframing & user journeys" },
  { name: "Adobe Lightroom", category: "DESIGN & 3D", accent: "blue", badgeBg: "#31A8FF", provenance: "Photographic color grading & exposure control" },
];
