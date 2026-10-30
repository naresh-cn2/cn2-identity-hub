import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import ResearchVisual from "@/components/hub/visuals/research-visual";
import CategoryShowcaseList from "@/components/work/category-showcase-list";
import { WORK_CATEGORIES, getWorksByCategory } from "@/data/works";

export const metadata: Metadata = {
  title: "Projects — Works",
  description:
    "What I've worked on, researched, and accomplished — quantitative research engines, deterministic execution systems, and verified engineering proofs of work.",
  alternates: { canonical: "/works/projects" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Projects — Works — Bukya Naresh / CN2.dev",
    description: "What I've worked on, researched, and accomplished.",
  },
};

export default function ProjectsCategoryPage() {
  const category = WORK_CATEGORIES.projects;
  const items = getWorksByCategory("projects");

  return (
    <>
      {/* ---- IMMERSIVE DESTINATION HERO ---- */}
      <header className="relative min-h-[90svh] flex items-center overflow-hidden border-b border-line bg-surface/30">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="lattice" />

        <div className="relative w-full mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            {/* Copy Column */}
            <div className="relative z-10">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <Link href="/works" className="label-mono text-faint transition-colors hover:text-foreground">
                    WORKS
                  </Link>
                  <span className="label-mono text-line-strong" aria-hidden="true">/</span>
                  <p className="label-mono text-research font-bold">
                    QUANTITATIVE &amp; ENGINEERING PROJECTS
                  </p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="display mt-6 text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.95] text-foreground">
                  {category.title}
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-lg font-mono font-semibold text-foreground/90 md:text-xl">
                  {category.tagline}
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  {category.description}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#catalogue"
                    className="corner-ticks group inline-flex items-center gap-4 border border-research bg-research/15 px-8 py-4 label-mono text-xs font-bold text-research transition-colors hover:bg-research hover:text-white"
                  >
                    <span>EXPLORE PROJECTS CATALOGUE</span>
                    <span aria-hidden="true" className="arr-down transition-transform duration-300 group-hover:translate-y-1">
                      ↓
                    </span>
                  </a>
                  <Link
                    href="/works"
                    className="label-mono border border-line-strong px-6 py-4 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                  >
                    ← RETURN TO WORKS
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Immersive Quantitative Manifold Visual Column */}
            <div className="relative flex items-center justify-center">
              <Reveal delay={120}>
                <div className="w-full max-w-[560px]">
                  <ResearchVisual />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      {/* ---- DEDICATED PROJECTS CATALOGUE ---- */}
      <section id="catalogue" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
              <div>
                <p className="label-mono text-research">SYSTEMS DIRECTORY</p>
                <h2 className="display mt-2 text-3xl md:text-5xl text-foreground">
                  ENGINEERING PROJECTS &amp; RESEARCH
                </h2>
              </div>
              <p className="label-mono text-faint">
                {items.length} QUANTITATIVE &amp; ARCHITECTURAL SYSTEMS
              </p>
            </div>
          </Reveal>
        </div>

        <CategoryShowcaseList items={items} categoryTitle="Projects" />
      </section>
    </>
  );
}
