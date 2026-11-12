import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import MarketDepth from "@/components/visuals/market-depth";
import ProjectCard from "@/components/work/project-card";

export const metadata: Metadata = {
  title: "PROJECTS — BUILDS — Bukya Naresh / CN2.dev",
  description:
    "Standalone engineering and quantitative research projects — verified systems with documented architecture, testing and evidence.",
  alternates: { canonical: "/builds/projects" },
  openGraph: {
    images: ["opengraph-image"],
    title: "Projects — BUILDS — Bukya Naresh / CN2.dev",
    description:
      "Verified engineering and quantitative projects with documented architecture and evidence.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="schematic" />
        <MarketDepth />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-signal">BUILDS / PROJECTS</p>
              <p className="label-mono text-faint">ENGINEERING & QUANTITATIVE RESEARCH</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <KineticText className="display mt-8 text-[clamp(3rem,10vw,8rem)]" ariaLabel="PROJECTS">
              PROJECTS
            </KineticText>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Standalone engineering systems and quantitative research projects — each documented
              from problem statement through architecture, implementation, testing, and verifiable
              evidence. These are substantial bodies of work with measurable outcomes.
            </p>
          </Reveal>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <section aria-labelledby="projects-heading" className="space-y-16">
          <header>
            <h2 id="projects-heading" className="display-condensed text-3xl md:text-4xl">
              PROJECTS
            </h2>
            <p className="mt-2 label-mono text-xs text-faint">
              2 PROJECTS · VERIFIED ENGINEERING
            </p>
          </header>

          <ProjectCard
            name="BUSTUB"
            tagline="Relational database engine — CMU 15-445/645 compliant"
            description="Full-featured relational database engine implementing buffer pool manager, B+ tree indexes, hash indexes, query executor (seq scan, index scan, nested loop join, hash join), optimizer, transaction manager with 2PL, lock manager, log manager with WAL, and recovery. 56/56 test suites passing. AddressSanitizer and UndefinedBehaviorSanitizer clean."
            tech={["C++20", "CMake", "GoogleTest", "SQLLogicTest", "ASan/UBSan", "POSIX Threads"]}
            status="100% VERIFIED · 56/56 SUITES"
            evidenceLabel="TEST SUITE · DETERMINISM"
            repoUrl="https://github.com/naresh-cn2/bustub-engine"
            caseStudyUrl="/works/bustub"
            category="PROJECT"
          />
          <ProjectCard
            name="STRATLAB"
            tagline="Quantitative strategy backtesting & analytics platform"
            description="Harvard CS50x Final Capstone with Honors. End-to-end quantitative research platform: data ingestion, factor library, portfolio construction, risk analytics, backtesting engine with realistic transaction costs, and interactive visualizations. Deployed with automated CI/CD and monitoring."
            tech={["Python", "FastAPI", "PostgreSQL", "NumPy/Pandas", "React", "TypeScript", "Docker"]}
            status="HARVARD ONLINE VERIFIED · CAPSTONE"
            evidenceLabel="CAPSTONE · DEPLOYED"
            repoUrl="https://github.com/naresh-cn2/stratlab"
            caseStudyUrl="/works/stratlab"
            category="PROJECT"
          />
        </section>
      </main>
    </>
  );
}