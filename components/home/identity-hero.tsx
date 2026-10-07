import HeroField from "@/components/viz/hero-field";
import Magnetic from "@/components/ui/magnetic";
import Reveal from "@/components/ui/reveal";
import { site } from "@/data/site";

export default function IdentityHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden" aria-label="Identity">
      <div className="absolute inset-0 opacity-70">
        <HeroField />
      </div>
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pb-16 pt-32 sm:px-8">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-2">
            <p className="label-mono text-muted">
              <span className="text-signal">STATUS /</span> RESEARCH
            </p>
            <p className="label-mono text-muted">
              <span className="text-signal">DOMAIN /</span> QUANT
            </p>
            <p className="label-mono text-muted">
              <span className="text-signal">MODE /</span> BUILDING
            </p>
          </div>
        </Reveal>

        <h1>
          <Reveal clip delay={100}>
            <span className="display block text-[clamp(4.5rem,17vw,15rem)] leading-[0.85]">
              {site.name}
            </span>
          </Reveal>
          <Reveal clip delay={250}>
            <span className="display-condensed mt-2 block text-[clamp(1.9rem,6.2vw,5.2rem)] text-muted">
              {site.identity}
            </span>
          </Reveal>
        </h1>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal delay={400} className="max-w-md">
            <p className="label-mono text-signal">{site.subtitle}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Building quantitative research systems, market-data infrastructure
              and computational tools for understanding markets.
            </p>
          </Reveal>

          <Reveal delay={500}>
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic href="/quant" ariaLabel="Explore quant">
                <span className="label-mono inline-block bg-signal px-6 py-3 text-background transition-colors hover:bg-foreground hover:text-background">
                  EXPLORE QUANT
                </span>
              </Magnetic>
              <Magnetic href="/lab" ariaLabel="Enter research lab">
                <span className="label-mono inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal">
                  ENTER RESEARCH LAB
                </span>
              </Magnetic>
            </div>
            <div className="mt-4 flex flex-wrap gap-6">
              <a href="/builds" className="link-line label-mono text-xs text-muted transition-colors hover:text-foreground">
                VIEW BUILDS
              </a>
              <a href="/work-with-me" className="link-line label-mono text-xs text-muted transition-colors hover:text-foreground">
                WORK WITH ME
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={650}>
          <div className="mt-16 flex items-center justify-between border-t border-line pt-4">
            <p className="num-mono text-[10px] text-faint">
              01 — IDENTITY · NARESH / QUANTITATIVE INTELLIGENCE
            </p>
            <p className="num-mono flex items-center gap-2 text-[10px] text-faint">
              SCROLL
              <span className="inline-block h-3 w-px animate-pulse bg-signal" aria-hidden="true" />
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
