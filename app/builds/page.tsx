import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import SectionHeader from "@/components/ui/section-header";
import { benchmarkStrip, buildCategories, systemsIndex, tier2Builds } from "@/data/builds";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Builds",
  description:
    "Tier-2 engineering: financial data infrastructure and low-latency systems. Benchmarks published with context.",
};

export default function BuildsPage() {
  return (
    <div className="pt-28">
      <SectionHeader
        act="SECTION"
        code="03"
        title="BUILDS"
        subtitle="Engineering depth behind the quant identity — financial data infrastructure and low-latency systems work."
        meta="CURATED / NOT EXHAUSTIVE"
      />

      {/* benchmark strip */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {benchmarkStrip.map((b) => (
              <div key={b.label} className="corner-ticks bg-background p-6">
                <p className="num-mono text-3xl font-semibold">
                  {b.value}
                  <span className="ml-1 text-sm font-normal text-muted">{b.unit}</span>
                </p>
                <p className="label-mono mt-3 text-[10px] leading-relaxed text-faint">{b.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* tier-2 builds */}
      {buildCategories.map((cat) => (
        <div key={cat.id} className="mx-auto mt-20 max-w-[1440px] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-6">
              <h2 className="display text-2xl">{cat.name}</h2>
              <p className="label-mono max-w-sm text-[10px] leading-relaxed text-faint">{cat.description}</p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {tier2Builds
              .filter((b) => b.category === cat.id)
              .map((build, i) => (
                <Reveal key={build.id} delay={i * 100}>
                  <div className="flex h-full flex-col border border-line bg-background p-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="display text-2xl">{build.name}</h3>
                      <p className="num-mono shrink-0 text-[10px] text-signal">{build.status}</p>
                    </div>
                    {build.description && (
                      <p className="mt-4 text-sm leading-relaxed text-muted">{build.description}</p>
                    )}
                    {build.metrics && (
                      <div className="mt-auto flex flex-wrap gap-8 border-t border-line pt-5">
                        {build.metrics.map((m) => (
                          <div key={m.label}>
                            <p className="num-mono text-2xl font-semibold">{m.value}</p>
                            <p className="label-mono mt-1 text-[10px] text-faint">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {build.github && (
                      <a
                        href={build.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-line label-mono mt-6 inline-block w-fit text-xs text-signal"
                      >
                        REPOSITORY →
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      ))}

      {/* systems index */}
      <div className="mx-auto mt-20 max-w-[1440px] px-5 pb-28 sm:px-8">
        <Reveal>
          <div className="border border-line bg-background p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-2xl">SYSTEMS ENGINEERING INDEX</h2>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line label-mono text-xs text-signal"
              >
                GITHUB — ALL REPOSITORIES →
              </a>
            </div>
            <p className="label-mono mt-4 max-w-2xl text-[10px] leading-relaxed text-faint">
              Selected repositories from low-latency systems work. Metrics and methodology are
              published per repository — this index claims nothing the repositories do not show.
            </p>
            <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
              {systemsIndex.map((sys) => (
                <li key={sys.id} className="flex items-baseline justify-between bg-background px-5 py-4">
                  <span className="num-mono text-[11px] text-foreground">{sys.name}</span>
                  <span className="label-mono text-[10px] text-faint">{sys.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/quant"
              className="label-mono bg-signal px-6 py-3 text-background transition-colors hover:bg-foreground hover:text-background"
            >
              VIEW FLAGSHIP SYSTEMS
            </Link>
            <Link
              href="/lab"
              className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              ENTER THE LAB
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
