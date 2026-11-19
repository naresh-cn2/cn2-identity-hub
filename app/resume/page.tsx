import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Résumé — CN2.DEV",
  description:
    "Targeted professional presentations — Systems Engineer, Quantitative Developer, AI Engineer. Discover how my engineering capabilities align with the problems your team needs to solve.",
  alternates: { canonical: "/resume" },
};

interface ResumeDirection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  projects: string[];
  evidence: string[];
  color: "signal" | "research" | "electric";
}

const directions: ResumeDirection[] = [
  {
    id: "systems-backend",
    title: "Systems / Backend Engineer",
    subtitle: "Reliable software, databases, backend infrastructure and computational systems.",
    description:
      "Engineering low-level systems with deterministic behavior: C++20 database engines, zero-dependency C11 data pipelines, and full-stack platforms deployed to production. Every component is designed for observability, testability, and operational correctness.",
    skills: ["C++20", "C11", "Python", "TypeScript", "SQLite", "PostgreSQL", "Docker", "Linux/POSIX", "Concurrency", "Memory Management"],
    projects: ["bustub-engine", "billing-data-gateway", "cn2-identity-hub", "qrsip"],
    evidence: [
      "BusTub: 56/56 test suites, ASan/UBSan clean, CMU 15-445/645",
      "billing-data-gateway: 487,421 rec/s, zero-dependency C11",
      "CN2.DEV: 95+ static routes, 305/305 QA assertions, production",
      "QRSIP: 352 deterministic tests, CI security validation",
    ],
    color: "signal",
  },
  {
    id: "quantitative-developer",
    title: "Quantitative Developer",
    subtitle: "Quantitative engines, financial computation systems, market-data infrastructure and research tools.",
    description:
      "Building quantitative systems where correctness precedes performance: deterministic backtesting, point-in-time safe market data, structural risk controls, and research governance. All results carry explicit provenance labels — never presented as live trading returns.",
    skills: ["Python", "C++20", "Deterministic Backtesting", "Point-in-Time Data", "Risk Engineering", "SQLite", "Pandas/NumPy", "Time-Series", "Reproducible Research"],
    projects: ["apex-quant-engine", "market-data-replay", "automated-trading-os", "qrsip"],
    evidence: [
      "apex-quant-engine: 11.9M+ bars, 5,867 trades, deterministic backtest",
      "market-data-replay: point-in-time safety, adversarial lookahead-bias tests",
      "automated-trading-os: 1% risk cap, 1:4 R:R floor, structural controls",
      "Research: 7 verified entries on lookahead bias, overfitting, decimal arithmetic",
    ],
    color: "research",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    subtitle: "Developing AI-assisted workflows, agent infrastructure and intelligent software systems.",
    description:
      "Building AI systems where humans define direction and AI accelerates execution: agent orchestration, MCP tool protocols, sandboxed execution boundaries, and lifecycle observability. Verification gates decide whether output earns trust — accountability is never automated.",
    skills: ["Python", "TypeScript", "Model Context Protocol", "Agent Orchestration", "FastAPI", "Gradio", "Sandboxing", "Execution Boundaries", "LLM Integration", "CI/CD"],
    projects: ["context-engineering-labs", "cn2-identity-hub", "qrsip"],
    evidence: [
      "Context Engineering Labs: 72/72 tests reproduced, 6 agent-stack implementations",
      "CN2.DEV: Next.js 16, React 19, full-stack platform with AI-ready architecture",
      "QRSIP: research governance platform with hypothesis-to-promotion workflow",
    ],
    color: "electric",
  } ];

export default function ResumePage() {
  return (
    <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
      <PageAtmosphere variant="schematic" />

      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-signal">RÉSUMÉ / CAREER</p>
              <p className="label-mono text-faint">Targeted professional presentation</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-6 text-[clamp(3rem,9vw,6rem)] leading-[0.92] text-foreground">
              <span className="block">The Right Engineering</span>
              <span className="block">Work. The Right</span>
              <span className="block">Opportunity.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Explore how my engineering capabilities and completed work align with the problems your
              team needs to solve. Each direction below is a targeted résumé — focused, role-specific,
              and evidence-backed.
            </p>
          </Reveal>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <section aria-labelledby="directions-heading" className="space-y-16">
          <header id="directions-heading">
            <h2 className="display-condensed text-3xl md:text-4xl">
              Professional Directions
            </h2>
            <p className="mt-2 label-mono text-xs text-faint">
              Three career paths supported by the portfolio evidence. Select one to view the targeted résumé.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-3">
            {directions.map((dir) => (
              <Link
                key={dir.id}
                href={`/resume/${dir.id}`}
                className="group relative border border-line bg-surface p-8 md:p-10 transition-all duration-300 hover:border-signal/50 hover:bg-surface/50"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className={`label-mono text-[10px] border px-2.5 py-1 ${
                    dir.color === "signal"
                      ? "border-signal text-signal"
                      : dir.color === "research"
                        ? "border-research text-research"
                        : "border-electric text-electric"
                  }`}>
                    {dir.color === "signal" ? "01 · SYSTEMS" : dir.color === "research" ? "02 · QUANT" : "03 · AI"}
                  </span>
                  <span className="label-mono text-[9px] text-faint group-hover:text-signal transition-colors">
                    VIEW RÉSUMÉ →
                  </span>
                </div>
                <h3 className="display text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-signal transition-colors">
                  {dir.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted mb-4">{dir.subtitle}</p>
                <p className="label-mono text-[9px] text-faint mb-4">Core skills</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {dir.skills.slice(0, 6).map((s) => (
                    <span key={s} className="px-2 py-0.5 text-[9px] label-mono border border-line bg-background rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t border-line">
                  <p className="text-sm text-muted">{dir.evidence.length} evidence items documented</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer id="site-footer" className="relative z-10 mt-20 border-t border-line/60 bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-20">
          <div className="text-center">
            <span className="label-mono text-[10px] text-signal/60">CN2.DEV</span>
            <h2 className="display mt-3 text-[2.4rem] leading-[1.04] text-white md:text-4xl lg:text-5xl">
              BUKYA NARESH
            </h2>
            <p className="label-mono mt-2 text-xs text-white/45">CN2.DEV · QUANTITATIVE DEVELOPER</p>
            <a
              href="/contact"
              className="label-mono mt-8 inline-block border border-signal/70 bg-signal/10 px-4 py-2.5 text-[10px] text-white transition-colors duration-300 hover:bg-signal hover:text-white"
            >
              CONTACT ↗
            </a>
            <p className="label-mono mt-12 text-[10px] text-white/30">
              c 2026 CN2.DEV — all systems self-engineered
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}