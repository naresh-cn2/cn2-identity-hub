import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import { site } from "@/data/site";
import { credentials } from "@/data/credentials";
import { getAllWorks } from "@/data/works";

const DIRECTIONS: Record<string, {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  roleHeadline: string;
  roleSummary: string;
  skills: string[];
  projects: string[];
  evidence: string[];
  color: string;
}> = {
  "systems-backend": {
    id: "systems-backend",
    title: "Systems / Backend Engineer",
    subtitle: "Reliable software, databases, backend infrastructure and computational systems.",
    description: "Engineering low-level systems with deterministic behavior: C++20 database engines, zero-dependency C11 data pipelines, and full-stack platforms deployed to production.",
    roleHeadline: "Systems / Backend Engineer",
    roleSummary: "I build reliable software systems from the ground up — database engines, data pipelines, and full-stack platforms — with an emphasis on determinism, observability, and operational correctness.",
    skills: ["C++20", "C11", "Python", "TypeScript", "SQLite", "PostgreSQL", "Docker", "Linux/POSIX", "Concurrency", "Memory Management"],
    projects: ["bustub-engine", "billing-data-gateway", "cn2-identity-hub", "qrsip", "automated-trading-os"],
    evidence: [
      "BusTub: 56/56 test suites verified, ASan/UBSan clean, CMU 15-445/645 compliant",
      "billing-data-gateway: 487,421 rec/s throughput, zero-dependency C11 with POSIX memory-mapped I/O",
      "CN2.DEV: 95+ static routes, 305/305 automated QA assertions, production deployment on Vercel",
      "QRSIP: 352 deterministic tests, CI security validation, hypothesis-to-promotion research workflow",
      "automated-trading-os: 1% per-trade risk cap, 1:4 R:R floor, structural cost-budget filtering",
    ],
    color: "signal",
  },
  "quantitative-developer": {
    id: "quantitative-developer",
    title: "Quantitative Developer",
    subtitle: "Quantitative engines, financial computation systems, market-data infrastructure and research tools.",
    description: "Building quantitative systems where correctness precedes performance: deterministic backtesting, point-in-time safe market data, structural risk controls, and research governance.",
    roleHeadline: "Quantitative Developer",
    roleSummary: "I build quantitative systems where correctness precedes performance. From deterministic backtesting engines to point-in-time safe market-data infrastructure, every result carries explicit provenance labels and stated limitations.",
    skills: ["Python", "C++20", "Deterministic Backtesting", "Point-in-Time Data", "Risk Engineering", "SQLite", "Pandas/NumPy", "Time-Series Analysis", "Reproducible Research", "Structural Risk Controls"],
    projects: ["apex-quant-engine", "market-data-replay", "automated-trading-os", "qrsip", "forex-platform"],
    evidence: [
      "apex-quant-engine: 11.9M+ one-minute bars, 5,867 completed backtest trades, deterministic simulation",
      "market-data-replay: point-in-time safety by construction, adversarial lookahead-bias tests pass",
      "automated-trading-os: 1% per-trade risk cap, 1:4 R:R admission floor, cost-budget filtering",
      "Research: 7 verified entries on lookahead bias, backtest overfitting, exact decimal arithmetic, risk-first sizing",
    ],
    color: "research",
  },
  "ai-engineer": {
    id: "ai-engineer",
    title: "AI Engineer",
    subtitle: "Developing AI-assisted workflows, agent infrastructure and intelligent software systems.",
    description: "Building AI systems where humans define direction and AI accelerates execution: agent orchestration, MCP tool protocols, sandboxed execution boundaries, and lifecycle observability.",
    roleHeadline: "AI Engineer",
    roleSummary: "I build AI systems where humans define the direction and AI accelerates the execution. From agent orchestration pipelines to sandboxed execution boundaries, every system is designed with verification gates — accountability is never automated.",
    skills: ["Python", "TypeScript", "Model Context Protocol", "Agent Orchestration", "FastAPI", "Gradio", "Sandboxed Execution", "Execution Boundaries", "LLM Integration", "CI/CD"],
    projects: ["context-engineering-labs", "cn2-identity-hub", "qrsip"],
    evidence: [
      "Context Engineering Labs: 72/72 tests reproduced from fresh clone, 6 agent-stack implementations in one repository",
      "CN2.DEV: Next.js 16, React 19 full-stack platform with AI-ready architecture and design token system",
      "QRSIP: research governance platform with hypothesis-to-promotion workflow and CI security validation",
    ],
    color: "electric",
  },
};

export function generateStaticParams() {
  return Object.keys(DIRECTIONS).map((id) => ({ direction: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ direction: string }> }): Promise<Metadata> {
  const { direction } = await params;
  const dir = DIRECTIONS[direction];
  if (!dir) return { title: "Résumé not found" };
  return {
    title: `Résumé — ${dir.title} — CN2.DEV`,
    description: dir.description,
    alternates: { canonical: `/resume/${direction}` },
  };
}

export default async function ResumeDirectionPage({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  const dir = DIRECTIONS[direction];

  if (!dir) notFound();

  const projectDetails = getAllWorks().filter((p) => dir.projects.includes(p.id));
  const relevantCredentials = credentials.filter((c) => c.state === "VERIFIED" || c.state === "COMPLETED");

  const colorClass = dir.color === "signal" ? "border-signal text-signal" : dir.color === "research" ? "border-research text-research" : "border-electric text-electric";
  const dirNumber = dir.color === "signal" ? "01 · SYSTEMS" : dir.color === "research" ? "02 · QUANT" : "03 · AI";

  return (
    <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
      <PageAtmosphere variant="schematic" />

      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <Link href="/resume" className="label-mono text-faint hover:text-foreground transition-colors">
                ← RÉSUMÉ DIRECTIONS
              </Link>
              <span className={`label-mono border px-2.5 py-1 text-[9px] ${colorClass}`}>
                {dirNumber}
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-6 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92] text-foreground">
              {dir.roleHeadline}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {dir.roleSummary}
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="/cv" className="label-mono border border-line px-5 py-3 text-[10px] text-muted transition-colors hover:border-foreground hover:text-foreground">
              VIEW FULL CV →
            </a>
            <a href="#contact" className="label-mono border border-signal bg-signal/10 px-5 py-3 text-[10px] text-signal transition-colors duration-300 hover:bg-signal hover:text-white">
              CONTACT →
            </a>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <section className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <Reveal className="mt-14">
              <div className="border-l-3 border-signal pl-6">
                <p className="label-mono text-[10px] text-signal mb-2">APPROACH</p>
                <p className="text-base leading-relaxed text-foreground/90">{dir.description}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <div className="mb-8">
              <p className="label-mono text-[10px] text-muted">RELEVANT TECHNICAL SKILLS</p>
              <h2 className="display text-2xl md:text-3xl font-bold text-foreground">Capabilities</h2>
            </div>
            <Reveal className="mt-10">
              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {dir.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-[9px] label-mono border border-line bg-surface rounded hover:border-signal/50 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <div className="mb-8">
              <p className="label-mono text-[10px] text-muted">FEATURED WORK</p>
              <h2 className="display text-2xl md:text-3xl font-bold text-foreground">Completed Projects</h2>
            </div>
            <Reveal className="mt-10">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projectDetails.map((project) => (
                  <article key={project.id} className="border border-line bg-surface p-6 md:p-8 transition-colors hover:border-signal/50">
                    <div className="flex items-baseline justify-between gap-2 mb-3">
                      <span className={`label-mono text-[9px] border px-2 py-0.5 ${project.workCategory === "projects" ? "border-signal text-signal" : "border-research text-research"}`}>
                        {project.workCategory === "projects" ? "PROJECT" : "PRODUCT"}
                      </span>
                      <span className={`label-mono text-[9px] border px-2 py-0.5 ${project.status.includes("VERIFIED") || project.status.includes("PRODUCTION") || project.status.includes("RELEASED") ? "border-signal text-signal" : "border-line text-muted"}`}>
                        {project.status.split(" · ")[0]}
                      </span>
                    </div>
                    <h3 className="font-mono text-base font-bold text-foreground mb-2">{project.shortTitle}</h3>
                    <p className="text-sm leading-relaxed text-muted mb-4">{project.summary}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[9px] label-mono border border-line bg-background rounded">{t}</span>
                      ))}
                    </div>
                    <Link href={`/works/${project.id}`} className="label-mono inline-flex items-center gap-1 text-[10px] text-signal hover:text-white transition-colors">
                      OPEN PROJECT →
                    </Link>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="evidence" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <div className="mb-8">
              <p className="label-mono text-[10px] text-muted">VERIFIED EVIDENCE</p>
              <h2 className="display text-2xl md:text-3xl font-bold text-foreground">Proof of Work</h2>
            </div>
            <Reveal className="mt-10">
              <ul className="space-y-3">
                {dir.evidence.map((item, i) => (
                  <li key={i} className="border-l-2 border-signal pl-5 py-3 text-sm leading-relaxed text-muted">
                    <span className="text-signal shrink-0">▸</span> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {relevantCredentials.length > 0 && (
          <section id="credentials" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
            <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
              <div className="mb-8">
                <p className="label-mono text-[10px] text-muted">VERIFIED CREDENTIALS</p>
                <h2 className="display text-2xl md:text-3xl font-bold text-foreground">Credentials</h2>
              </div>
              <Reveal className="mt-10">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relevantCredentials.map((cert) => (
                    <div key={cert.id} className="border border-line bg-surface p-5 transition-colors hover:border-signal/50">
                      <p className="label-mono text-[9px] text-faint mb-1">{cert.provider}</p>
                      <p className="font-mono text-sm font-bold text-foreground mb-1">{cert.program}</p>
                      <p className="text-xs text-muted leading-relaxed mb-3">{cert.learned}</p>
                      {cert.verificationUrl && (
                        <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="label-mono text-[9px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5 block">
                          VERIFY →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        <section id="contact" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <Reveal className="mt-14">
              <div className="border border-signal bg-signal/5 p-8 md:p-12 text-center">
                <p className="label-mono text-signal text-[10px] mb-3">LET'S WORK TOGETHER</p>
                <h2 className="display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to discuss your engineering needs?</h2>
                <p className="text-sm leading-relaxed text-muted mb-6 max-w-2xl mx-auto">I am open to selected work, research collaboration, and partnership opportunities. Reach out through any channel below.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href={site.links.email} className="label-mono border border-signal bg-signal/10 px-5 py-3 text-[10px] text-signal transition-colors duration-300 hover:bg-signal hover:text-white">
                    EMAIL →
                  </a>
                  <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="label-mono border border-line px-5 py-3 text-[10px] text-muted transition-colors hover:border-foreground hover:text-foreground">
                    GITHUB →
                  </a>
                  <a href="/contact" className="label-mono border border-line px-5 py-3 text-[10px] text-muted transition-colors hover:border-foreground hover:text-foreground">
                    CONTACT FORM →
                  </a>
                </div>
              </div>
            </Reveal>
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
            <a href="/contact" className="label-mono mt-8 inline-block border border-signal/70 bg-signal/10 px-4 py-2.5 text-[10px] text-white transition-colors duration-300 hover:bg-signal hover:text-white">
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