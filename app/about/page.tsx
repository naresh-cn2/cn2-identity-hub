import type { Metadata } from "next";
import SystemsUniverse from "@/components/about/systems-universe";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import MindsetDiagram from "@/components/about/mindset-diagram";
import CapabilityConstellation from "@/components/about/capability-constellation";
import ProcessChain from "@/components/about/process-chain";
import PrinciplesEditorial from "@/components/about/principles-editorial";
import VisionNetwork from "@/components/about/vision-network";
import CollaborationPaths from "@/components/about/collaboration-paths";
import CapabilityMap from "@/components/capabilities/capability-map";
import TechStackMatrix from "@/components/capabilities/tech-stack-matrix";
import KnowledgeGraph from "@/components/viz/knowledge-graph";
import { aiStages, systemsStages } from "@/data/about";
import { capabilities } from "@/data/capabilities";
import { credentials } from "@/data/credentials";
import { researchEntries } from "@/data/research";
import { site } from "@/data/site";
import { getAllWorks } from "@/data/works";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who I am, how I think, and what I am building toward — quantitative finance, data infrastructure, software engineering, and AI-accelerated automation. The about page of Bukya Naresh / CN2.DEV.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Bukya Naresh / CN2.DEV",
    description:
      "I think in systems. I build what's possible — quantitative finance, data, software, and AI-accelerated automation.",
    images: [
      {
        url: "/images/about-cosmos.png",
        width: 1085,
        height: 1450,
        alt: "A figure formed of starlight, holding a burning red ember",
      },
    ],
  },
};

/* Section shell shared by chapters — no decorative numbering. */
function ChapterHead({
  eyebrow,
  lines,
  support,
}: {
  eyebrow: string;
  lines: string[];
  support: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="label-mono text-faint">{eyebrow}</span>
      </div>
      <h2 className="display mt-7 max-w-4xl text-3xl leading-[1.06] md:text-5xl">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </h2>
      <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted">{support}</p>
    </Reveal>
  );
}

/* The about page: a cinematic identity opening with 100% coded computational
   systems universe, followed by editorial chapters with real, interactive diagrams.
   The computational systems universe persists seamlessly throughout all sections. */
export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
      {/* Continuous living computational systems universe across all sections */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <SystemsUniverse />
      </div>

      {/* Atmospheric layer — technical grid, deep blue illumination,
          restrained red horizon accent. Sits behind every section.
          Carries the motion-system depth: the layer drifts slowly against
          the scroll and defocuses while the page is moving, so the whole
          page reads as one deep, living space. */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden cn2-depth-layer cn2-diffuse"
        data-cn2-depth=""
        style={{ "--cn2-depth-k": 0.4 } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="absolute inset-0 grid-field opacity-70" />
        <div className="absolute -left-[20vw] -top-[10vh] h-[75vh] w-[75vw] rounded-full bg-[radial-gradient(closest-side,rgba(22,119,255,0.16),transparent)] blur-2xl" />
        <div className="absolute -bottom-[15vh] -right-[15vw] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,240,255,0.10),transparent)] blur-2xl" />
        <div className="absolute inset-x-0 top-[38%] h-px bg-gradient-to-r from-transparent via-signal/20 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* ---- 01 · CINEMATIC IDENTITY ---------------------------------- */}
        <section id="identity" className="relative min-h-dvh w-full overflow-hidden">
          {/* readability gradient over the left third (desktop) */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[64%] bg-gradient-to-r from-black/85 via-black/50 to-transparent md:block"
            aria-hidden="true"
          />
          {/* navbar legibility scrim */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/50 to-transparent"
            aria-hidden="true"
          />

          {/* identity text — in flow above the figure on mobile, left-third
              editorial column over it on desktop */}
          <div className="relative z-20 px-6 pb-10 pt-28 md:absolute md:left-0 md:top-0 md:flex md:h-full md:w-[54%] md:items-center md:px-14 md:pb-0 md:pt-0 lg:px-20">
            <div className="max-w-[30rem]">
              <p className="label-mono text-[10px] text-white/45">ABOUT / IDENTITY</p>
              <h1 className="display mt-6 text-[2.4rem] leading-[1.04] text-white md:text-5xl lg:text-6xl">
                <span className="block">I THINK IN</span>
                <span className="block">SYSTEMS.</span>
                <span className="block">I BUILD WHAT&apos;S</span>
                <span className="block">POSSIBLE.</span>
              </h1>
              <p className="mt-8 max-w-[26rem] text-sm leading-relaxed text-white/75">
                I am interested in what happens when financial intelligence, software engineering,
                data and artificial intelligence converge. I explore those connections by designing,
                building and validating systems that solve real problems.
              </p>
              <p className="mt-4 max-w-[26rem] text-sm leading-relaxed text-white/60">
                Every system has an origin. This page is the journey behind mine — how I think,
                what I build, and where I am going.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#capabilities"
                  className="label-mono border border-signal/70 bg-signal/10 px-4 py-2.5 text-[10px] text-white transition-colors duration-300 hover:bg-signal hover:text-white"
                >
                  EXPLORE MY CAPABILITIES
                </a>
                <a
                  href="#mindset"
                  className="label-mono border border-white/25 px-4 py-2.5 text-[10px] text-white/85 transition-colors duration-300 hover:border-white/60 hover:text-white"
                >
                  HOW I THINK ↓
                </a>
                <Link
                  href="/work"
                  className="label-mono border border-white/25 px-4 py-2.5 text-[10px] text-white/85 transition-colors duration-300 hover:border-white/60 hover:text-white"
                >
                  EXPLORE WORK ↗
                </Link>
              </div>

              <p className="label-mono mt-10 inline-flex items-center gap-3 text-[10px] text-white/45">
                SCROLL TO EXPLORE
                <span className="h-px w-8 bg-white/30" aria-hidden="true" />
              </p>
            </div>
          </div>
        </section>

        {/* ---- 02 · THE WAY I THINK ------------------------------------- */}
        <section id="mindset" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="THE WAY I THINK"
              lines={["I DON'T JUST LOOK AT THE PROBLEM.", "I LOOK AT THE SYSTEM BEHIND IT."]}
              support="I want to understand why something happens, which variables influence it, how its components interact, and what would make a solution reliable. Whether the subject is a market, a data problem, a piece of software, or an AI workflow — the underlying logic comes before the approach."
            />
            <Reveal className="mt-14">
              <MindsetDiagram />
            </Reveal>
          </div>
        </section>

        {/* ---- 03 · CAPABILITY ARCHITECTURE ----------------------------- */}
        <section id="capabilities" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="CAPABILITY ARCHITECTURE"
              lines={["DIFFERENT DISCIPLINES.", "ONE CONNECTED DIRECTION."]}
              support="I work toward connecting financial understanding, quantitative reasoning, software, data, and intelligent automation. Select any discipline to see what it means, the problems it addresses, its status, and the work that supports it."
            />
            <Reveal className="mt-14">
              <CapabilityConstellation />
            </Reveal>
          </div>
        </section>

        {/* ---- 04 · FROM THINKING TO EXECUTION -------------------------- */}
        <section id="systems" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="FROM THINKING TO EXECUTION"
              lines={["IDEAS ARE THE BEGINNING.", "SYSTEMS MAKE THEM USEFUL."]}
              support="One process connects the disciplines: reasoning to implementation, implementation to evidence — follow it as you scroll, or select any stage directly."
            />
            <Reveal className="mt-16">
              <ProcessChain stages={systemsStages} accent="signal" />
            </Reveal>
          </div>
        </section>

        {/* ---- 05 · HUMAN DIRECTION · INTELLIGENT EXECUTION ------------- */}
        <section id="ai" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="HUMAN DIRECTION · INTELLIGENT EXECUTION"
              lines={["I DEFINE THE DIRECTION.", "AI ACCELERATES THE EXECUTION."]}
              support="I see AI as a way to extend human capability — never a replacement for understanding the problem. The objective, the constraints, and the final decision stay human; verification determines whether the work earns trust."
            />
            <Reveal className="mt-16">
              <ProcessChain stages={aiStages} accent="research" />
            </Reveal>
          </div>
        </section>

        {/* ---- 06 · WORKING PRINCIPLES ---------------------------------- */}
        <section id="principles" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="WORKING PRINCIPLES"
              lines={["BUILD WITH INTENT.", "MEASURE WITH EVIDENCE."]}
              support="The standards I want my work to reflect — not slogans, but the criteria results are held to."
            />
            <PrinciplesEditorial />
          </div>
        </section>

        {/* ---- 07 · MY ENGINEERING JOURNEY ------------------------------ */}
        <section id="journey" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="MY ENGINEERING JOURNEY"
              lines={["EVERY SYSTEM HAS AN ORIGIN.", "THIS IS THE JOURNEY BEHIND MINE."]}
              support="From academic foundations to independent engineering, each step represents a deliberate decision to build systems that can be inspected, measured, and trusted."
            />
            <div className="mt-16 relative">
              <div className="absolute inset-y-0 left-3.5rem w-px bg-line/50" aria-hidden="true" />
              <div className="space-y-12">
                {[
                  {
                    date: "2025–2026",
                    title: "Independent Engineering",
                    body: "Building CN2.DEV — a production-grade portfolio platform with 95+ static routes, 305/305 automated QA assertions, and verified credentials. Designed as a digital headquarters where every claim is backed by inspectable artifacts.",
                    status: "PRODUCTION · LIVE SITE",
                  },
                  {
                    date: "2026",
                    title: "Harvard CS50x",
                    body: "Completed CS50x: Introduction to Computer Science and CS50AI: Introduction to Artificial Intelligence with Python — twelve applied AI projects, each assessed against defined rubrics, with independently verifiable certificates.",
                    status: "VERIFIED · HARVARD",
                  },
                  {
                    date: "2026",
                    title: "CMU 15-445/645 — BusTub",
                    body: "Engineered a disk-backed, multi-threaded relational database engine in C++20. All 56 test suites passed across four milestones with AddressSanitizer and UndefinedBehaviorSanitizer verification — zero leaks, zero errors, zero races.",
                    status: "100% VERIFIED · 56/56",
                  },
                  {
                    date: "2026",
                    title: "Quantitative Systems Research",
                    body: "Published seven research entries covering lookahead bias, backtest overfitting, exact decimal arithmetic, risk-first position sizing, multi-timeframe alignment, regime dependence, and deterministic tie-breaking — each with stated methods, findings, and limitations.",
                    status: "DOCUMENTED · VERIFIED",
                  },
                  {
                    date: "2026",
                    title: "Context Engineering Labs",
                    body: "Six agent-stack implementations in one repository — Agent Skills, MCP, Plugins, Subagents, Hooks, and Nano Harness — with 72 test cases reproduced from a fresh clone. Per-unit documentation states where each unit stops matching its own claims.",
                    status: "72/72 TESTS REPRODUCED",
                  },
                  {
                    date: "2026",
                    title: "Market-Data Infrastructure",
                    body: "Built quant-market-data-replay — a point-in-time safe ingestion pipeline with exact decimal arithmetic, nanosecond timestamps, deterministic replay, and adversarial lookahead-bias tests. 70-test suite passes CI on Python 3.10–3.12.",
                    status: "RELEASED",
                  },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[1.75rem] top-0 w-1rem h-1rem border border-signal bg-signal rounded-full z-10" />
                    <div className="mb-4">
                      <span className="label-mono text-signal">{item.date}</span>
                    </div>
                    <h3 className="display text-xl mb-1">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                    <span className={`label-mono border px-2.5 py-1 text-[9px] ${
                      item.status.includes("VERIFIED") || item.status.includes("PRODUCTION")
                        ? "border-signal text-signal"
                        : "border-research text-research"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- 08 · WHAT I&apos;VE BUILT ------------------------------- */}
        <section id="projects-showcase" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="WHAT I&apos;VE BUILT"
              lines={["IDEAS ARE EASY TO DESCRIBE.", "ENGINEERING IS DEMONSTRATED THROUGH WHAT GETS BUILT."]}
              support="Completed projects deserve proper showcase space. Each entry below represents real engineering work with inspectable evidence — repositories, test suites, research entries, and verified credentials."
            />
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getAllWorks()
                .filter((w) => ["bustub-engine", "apex-quant-engine", "qrsip", "market-data-replay", "automated-trading-os", "billing-data-gateway", "context-engineering-labs", "stratlab"].includes(w.id))
                .map((project) => (
                  <article key={project.id} className="border border-line bg-surface p-6 md:p-8 transition-colors hover:border-signal/50">
                    <div className="flex items-baseline justify-between gap-2 mb-3">
                      <span className={`label-mono text-[9px] border px-2 py-0.5 ${
                        project.workCategory === "projects" ? "border-signal text-signal" : "border-research text-research"
                      }`}>
                        {project.workCategory === "projects" ? "PROJECT" : "PRODUCT"}
                      </span>
                      <span className={`label-mono text-[9px] border px-2 py-0.5 ${
                        project.status.includes("VERIFIED") || project.status.includes("PRODUCTION") || project.status.includes("RELEASED")
                          ? "border-signal text-signal"
                          : "border-line text-muted"
                      }`}>
                        {project.status.split(" · ")[0]}
                      </span>
                    </div>
                    <h3 className="font-mono text-base font-bold text-foreground mb-2">{project.shortTitle}</h3>
                    <p className="text-sm leading-relaxed text-muted mb-4">{project.summary}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[9px] label-mono border border-line bg-background rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/works/${project.id}`}
                      className="label-mono inline-flex items-center gap-1 text-[10px] text-signal hover:text-white transition-colors"
                    >
                      OPEN PROJECT →
                    </Link>
                  </article>
                ))}
            </div>
          </div>
        </section>

        {/* ---- 09 · PROFESSIONAL PROFILE ------------------------------- */}
        <section id="professional-profile" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="PROFESSIONAL PROFILE"
              lines={["UNDERSTAND HOW I THINK.", "EXPLORE WHAT I&apos;VE BUILT.", "DISCOVER WHAT I CAN CONTRIBUTE."]}
              support="The About page tells the story. The CV proves the engineering work. The résumé communicates professional relevance. Two destinations — choose the one that matches what you need."
            />
            <div className="mt-16 grid gap-4 md:grid-cols-2">
              <article className="border border-line bg-surface p-8 md:p-10 transition-colors hover:border-signal/50 group">
                <span className="label-mono text-signal text-[10px] mb-3 block">01 · CV</span>
                <h2 className="display text-2xl md:text-3xl font-bold text-foreground mb-3">Engineering Dossier</h2>
                <p className="text-sm leading-relaxed text-muted mb-6 max-w-28">
                  A comprehensive record of the systems I&apos;ve designed, developed, researched and validated. Projects, metrics, certifications, education — every claim backed by inspectable artifacts.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-signal shrink-0">▸</span> 9 flagship and supporting projects
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-signal shrink-0">▸</span> 7 verified research entries
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-signal shrink-0">▸</span> 10 verified credentials
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-signal shrink-0">▸</span> Printable PDF export
                  </li>
                </ul>
                <Link
                  href="/cv"
                  className="label-mono border border-signal bg-signal/10 px-5 py-3 text-[10px] text-signal transition-colors duration-300 hover:bg-signal hover:text-white"
                >
                  EXPLORE MY CV →
                </Link>
              </article>
              <article className="border border-line bg-surface p-8 md:p-10 transition-colors hover:border-signal/50 group">
                <span className="label-mono text-research text-[10px] mb-3 block">02 · RÉSUMÉ</span>
                <h2 className="display text-2xl md:text-3xl font-bold text-foreground mb-3">Career Opportunity</h2>
                <p className="text-sm leading-relaxed text-muted mb-6 max-w-28">
                  Targeted professional presentations aligned to specific roles: Systems Engineer, Quantitative Developer, AI Engineer. Each résumé prioritizes the skills, projects and achievements most relevant to the role.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-research shrink-0">▸</span> Systems / Backend Engineer
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-research shrink-0">▸</span> Quantitative Developer
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-research shrink-0">▸</span> AI Engineer
                  </li>
                </ul>
                <Link
                  href="/resume"
                  className="label-mono border border-research bg-research/10 px-5 py-3 text-[10px] text-research transition-colors duration-300 hover:bg-research hover:text-white"
                >
                  EXPLORE MY RÉSUMÉ →
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* ---- 07 · THE LONG-TERM DIRECTION ----------------------------- */}
        <section id="vision" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="LONG-TERM DIRECTION"
              lines={["FROM INDIVIDUAL TOOLS", "TO INTEGRATED INTELLIGENT SYSTEMS."]}
              support="My long-term direction is to develop the knowledge and practical capability to build increasingly sophisticated systems that connect data, computation, decision-making, and automation — moving beyond isolated technologies toward complete, useful solutions."
            />
            <Reveal className="mt-14">
              <VisionNetwork />
            </Reveal>
          </div>
        </section>

        {/* ---- 08 · LET'S BUILD SOMETHING USEFUL ------------------------ */}
        <section id="collaborate" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="LET'S BUILD SOMETHING USEFUL"
              lines={[
                "DIFFERENT PERSPECTIVES.",
                "MEANINGFUL PROBLEMS.",
                "USEFUL SYSTEMS.",
              ]}
              support="I am interested in opportunities to apply structured thinking, software, data, research, and intelligent automation to meaningful technical problems. Whatever the perspective, the first step is the same: understand the problem and determine whether there is a useful way to solve it."
            />
            <CollaborationPaths />
          </div>
        </section>

        {/* ---- 09 · CAPABILITY MAP -------------------------------------- */}
        <section id="capability-map" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="CAPABILITY MAP"
              lines={["DOMAINS, TECHNOLOGIES, AND EVIDENCE.", "EVERY CAPABILITY LINKS TO WORK YOU CAN OPEN."]}
              support="Each card names a domain, the technologies involved, and the concrete project or written entry you can open — including the entries that remain open questions rather than settled results."
            />
            <Reveal className="mt-14">
              <CapabilityMap capabilities={capabilities} researchTitles={Object.fromEntries(researchEntries.map((entry) => [entry.id, entry.title]))} />
            </Reveal>
          </div>
        </section>

        {/* ---- 10 · TECH STACK & TOOLING -------------------------------- */}
        <section id="tech-stack" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="TECH STACK & TOOLING"
              lines={["CATEGORIZED · PRODUCTION · SYSTEMS & RESEARCH."]}
              support="Languages, cloud platforms, computational libraries, databases, and DevOps tooling deployed across research engines, trading architectures, and evidence-driven software systems."
            />
            <Reveal className="mt-14">
              <TechStackMatrix />
            </Reveal>
          </div>
        </section>

        {/* ---- 11 · DOMAIN MAP ------------------------------------------ */}
        <section id="domain-map" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="DOMAIN MAP"
              lines={["HOVER A NODE TO ISOLATE ITS RELATIONSHIPS."]}
              support="The domains are not separate skills stacked on top of each other — research sits at the centre and every other domain is connected to it because that is how the work actually flows."
            />
            <Reveal className="mt-14">
              <div className="mt-10">
                <KnowledgeGraph />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- 12 · HOW TO VERIFY --------------------------------------- */}
        <section id="how-to-verify" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="HOW TO VERIFY"
              lines={["EACH CAPABILITY → ONE INSPECTABLE ARTIFACT."]}
              support="Every capability above maps to inspectable code or a written research entry. Don't take any of it on trust — read the entry, open the repository, or run the instrument and check the result yourself."
            />
            <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              <Reveal key="works" delay={80} className="bg-background">
                <Link href="/work" className="flex h-full items-baseline justify-between gap-4 p-6 transition-colors hover:bg-surface">
                  <span className="label-mono text-xs text-foreground">WORK — ENGINEERING EVIDENCE</span>
                  <span aria-hidden="true" className="label-mono text-signal">→</span>
                </Link>
              </Reveal>
              <Reveal key="research" delay={160} className="bg-background">
                <Link href="/research" className="flex h-full items-baseline justify-between gap-4 p-6 transition-colors hover:bg-surface">
                  <span className="label-mono text-xs text-foreground">RESEARCH — WRITTEN ENTRIES</span>
                  <span aria-hidden="true" className="label-mono text-signal">→</span>
                </Link>
              </Reveal>
              <Reveal key="lab" delay={240} className="bg-background">
                <Link href="/lab" className="flex h-full items-baseline justify-between gap-4 p-6 transition-colors hover:bg-surface">
                  <span className="label-mono text-xs text-foreground">LAB — RUNNABLE INSTRUMENTS</span>
                  <span aria-hidden="true" className="label-mono text-signal">→</span>
                </Link>
              </Reveal>
              <Reveal key="github" delay={320} className="bg-background">
                <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="flex h-full items-baseline justify-between gap-4 p-6 transition-colors hover:bg-surface">
                  <span className="label-mono text-xs text-foreground">GITHUB — ALL REPOSITORIES</span>
                  <span aria-hidden="true" className="label-mono text-signal">↗</span>
                </a>
              </Reveal>
            </div>
            <Reveal delay={400}>
              <p className="label-mono mt-8 text-[10px] leading-relaxed text-faint">
                EVERY CAPABILITY ON THIS PAGE LINKS TO WORK YOU CAN OPEN, READ AND RUN.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- IDENTITY FOOTER — TRUE END OF PAGE ----------------------- */}
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
    </div>
  );
}