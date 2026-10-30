import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import BuildsVisual from "@/components/hub/visuals/work-visual";
import ResearchVisual from "@/components/hub/visuals/research-visual";
import PersonalVisual from "@/components/hub/visuals/personal-visual";
import { WORK_CATEGORIES } from "@/data/works";

export default function CategoryDoors() {
  const products = WORK_CATEGORIES.products;
  const projects = WORK_CATEGORIES.projects;
  const personal = WORK_CATEGORIES.personal;

  return (
    <div aria-label="Works categories" className="divide-y divide-line">
      {/* ==================== 01. PRODUCTS & PLATFORMS ==================== */}
      <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-surface/20 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            {/* Visual Column */}
            <div className="relative flex items-center justify-center">
              <Reveal>
                <div className="w-full max-w-[540px]">
                  <BuildsVisual />
                </div>
              </Reveal>
            </div>

            {/* Copy Column */}
            <div className="relative z-10">
              <Reveal delay={80}>
                <p className="label-mono text-signal font-bold">{products.badge}</p>
                <h2 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-none text-foreground">
                  <Link href={`/works/${products.slug}`} className="transition-colors hover:text-signal">
                    {products.title}
                  </Link>
                </h2>
                <p className="mt-5 font-mono text-base font-semibold text-foreground/90 md:text-lg">
                  {products.tagline}
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
                  {products.description}
                </p>

                <div className="mt-9">
                  <Link
                    href={`/works/${products.slug}`}
                    className="corner-ticks group inline-flex items-center gap-4 border border-signal bg-signal/15 px-8 py-4 label-mono text-xs font-bold text-signal transition-colors hover:bg-signal hover:text-white"
                  >
                    <span>ENTER PRODUCTS &amp; PLATFORMS</span>
                    <span aria-hidden="true" className="arr-live transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 02. PROJECTS ==================== */}
      <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-background py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            {/* Copy Column */}
            <div className="relative z-10 lg:order-1">
              <Reveal delay={80}>
                <p className="label-mono text-research font-bold">{projects.badge}</p>
                <h2 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-none text-foreground">
                  <Link href={`/works/${projects.slug}`} className="transition-colors hover:text-research">
                    {projects.title}
                  </Link>
                </h2>
                <p className="mt-5 font-mono text-base font-semibold text-foreground/90 md:text-lg">
                  {projects.tagline}
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
                  {projects.description}
                </p>

                <div className="mt-9">
                  <Link
                    href={`/works/${projects.slug}`}
                    className="corner-ticks group inline-flex items-center gap-4 border border-research bg-research/15 px-8 py-4 label-mono text-xs font-bold text-research transition-colors hover:bg-research hover:text-white"
                  >
                    <span>ENTER PROJECTS DESTINATION</span>
                    <span aria-hidden="true" className="arr-live transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Visual Column */}
            <div className="relative flex items-center justify-center lg:order-2">
              <Reveal>
                <div className="w-full max-w-[540px]">
                  <ResearchVisual />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 03. PERSONAL BUILDS ==================== */}
      <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-surface/20 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            {/* Visual Column */}
            <div className="relative flex items-center justify-center">
              <Reveal>
                <div className="w-full max-w-[540px]">
                  <PersonalVisual />
                </div>
              </Reveal>
            </div>

            {/* Copy Column */}
            <div className="relative z-10">
              <Reveal delay={80}>
                <p className="label-mono text-cyan-500 dark:text-cyan-400 font-bold">{personal.badge}</p>
                <h2 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-none text-foreground">
                  <Link href={`/works/${personal.slug}`} className="transition-colors hover:text-cyan-500">
                    {personal.title}
                  </Link>
                </h2>
                <p className="mt-5 font-mono text-base font-semibold text-foreground/90 md:text-xl">
                  {personal.tagline}
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
                  {personal.description}
                </p>

                <div className="mt-9">
                  <Link
                    href={`/works/${personal.slug}`}
                    className="corner-ticks group inline-flex items-center gap-4 border border-cyan-500 bg-cyan-500/15 px-8 py-4 label-mono text-xs font-bold text-cyan-500 dark:text-cyan-400 transition-colors hover:bg-cyan-500 hover:text-black"
                  >
                    <span>ENTER PERSONAL BUILDS</span>
                    <span aria-hidden="true" className="arr-live transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
