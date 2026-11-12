import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import MarketDepth from "@/components/visuals/market-depth";
import PersonalBuildCard from "@/components/work/personal-build-card";

export const metadata: Metadata = {
  title: "PERSONAL BUILDS — BUILDS — Bukya Naresh / CN2.dev",
  description:
    "Independent systems, AI agents, tools and prototypes — personal engineering work with documented architecture and evidence.",
  alternates: { canonical: "/builds/personal" },
  openGraph: {
    images: ["opengraph-image"],
    title: "Personal Builds — BUILDS — Bukya Naresh / CN2.dev",
    description:
      "Independent systems, AI agents, tools and prototypes with documented architecture and evidence.",
  },
};

export default function PersonalPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="schematic" />
        <MarketDepth />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-signal">BUILDS / PERSONAL BUILDS</p>
              <p className="label-mono text-faint">INDEPENDENT SYSTEMS · EXPERIMENTS · TOOLS</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <KineticText className="display mt-8 text-[clamp(3rem,10vw,8rem)]" ariaLabel="PERSONAL">
              PERSONAL
            </KineticText>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Independently developed systems, AI agents, tools and prototypes — personal engineering
              work exploring new paradigms, testing ideas, and building infrastructure for future
              products and projects. Each entry documents the problem, approach, architecture and
              current status.
            </p>
          </Reveal>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <section aria-labelledby="personal-heading" className="space-y-16">
          <header>
            <h2 id="personal-heading" className="display-condensed text-3xl md:text-4xl">
              PERSONAL BUILDS
            </h2>
            <p className="mt-2 label-mono text-xs text-faint">
              2 BUILDS · ACTIVE DEVELOPMENT
            </p>
          </header>

          <PersonalBuildCard
            name="CN2 IDENTITY HUB"
            tagline="Professional portfolio & engineering evidence platform"
            description="This website — a production-grade Next.js 16 portfolio with cinematic 3D visualizations, 95+ static routes, automated QA (301/301 assertions), design token system, and verifiable project evidence. Deployed on Vercel with automated CI/CD."
            tech={["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4", "Canvas/WebGL", "Vercel"]}
            status="PRODUCTION · LIVE SITE"
            evidenceLabel="LIVE SITE · QA 301/301"
            repoUrl="https://github.com/naresh-cn2/cn2-identity-hub"
            caseStudyUrl="/works/cn2-identity-hub"
          />
          <PersonalBuildCard
            name="OPEN-VERSE"
            tagline="Personal AI assistant workspace & agent framework"
            description="Local-first AI assistant with agent orchestration, tool calling, memory management, and workspace integration. Built for personal productivity and as a testbed for agent architectures. Active development with modular plugin system."
            tech={["TypeScript", "Node.js", "LLM Integration", "Plugin Architecture", "Local-First"]}
            status="ACTIVE DEVELOPMENT"
            evidenceLabel="ACTIVE DEVELOPMENT"
            repoUrl="https://github.com/naresh-cn2/OPEN-VERSE"
            caseStudyUrl="/works/open-verse"
          />
        </section>
      </main>
    </>
  );
}