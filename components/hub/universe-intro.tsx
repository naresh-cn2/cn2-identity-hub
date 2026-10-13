import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import UniversePortal from "@/components/hub/visuals/universe-portal";
import { site } from "@/data/site";

/**
 * UniverseIntro — the /hub opening experience.
 *
 * "Explore the CN2.DEV universe": an atmosphere, not an explanation. A
 * data gate stands to the right, lighting a dark reflective room; the copy
 * introduces the universe in one line and offers one action — enter the
 * first destination. The portal carries gentle motion that leans with the
 * scroll (progressive enhancement; frozen under reduced motion).
 */

export default function UniverseIntro() {
  return (
    <header className="relative overflow-hidden border-b border-line">
      {/* ---- the gate: light originates here ---- */}
      <div className="hub-portal-parallax absolute inset-0">
        <UniversePortal />
      </div>
      {/* readability scrim — strongest where the copy sits */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent lg:w-[58%]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-36">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-mono text-muted">
              CN2.DEV <span className="text-signal">/</span> HEADQUARTERS
            </p>
          </div>
        </Reveal>

        <div className="mt-12 max-w-2xl md:mt-16">
          <Reveal delay={80}>
            <p className="display text-[clamp(1.3rem,3.4vw,2.3rem)] leading-none text-muted">
              EXPLORE THE
            </p>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="display mt-3 text-[clamp(2.7rem,8vw,6rem)] leading-[0.95]">
              CN2.DEV{" "}
              <span className="text-signal">UNIVERSE.</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-7 text-xl leading-snug text-foreground md:text-2xl">
              One identity. Multiple disciplines. A world of things to build.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              A digital environment for quantitative research, software engineering,
              intelligent automation, and the ideas connecting them.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-6 label-mono text-muted">
              {site.name} <span className="text-signal">·</span> {site.identity}{" "}
              <span className="text-faint">· {site.descriptor}</span>
            </p>
          </Reveal>
          <Reveal delay={430}>
            <Link
              href="#destinations"
              className="corner-ticks group mt-10 inline-flex items-center gap-4 border border-signal/70 bg-signal/10 px-8 py-4 label-mono text-signal transition-colors hover:bg-signal hover:text-background"
            >
              EXPLORE THE UNIVERSE
              <span aria-hidden="true" className="arr-down transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
