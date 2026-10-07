import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import Reveal from "@/components/ui/reveal";
import { benchmarkStrip, systemsIndex, tier2Builds } from "@/data/builds";

export default function EngineeringDepth() {
  return (
    <section className="bg-surface" aria-label="Engineering depth">
      <SectionHeader
        act="ACT VI"
        code="DEPTH"
        title="ENGINEERING DEPTH"
        subtitle="The supporting layer: data infrastructure and low-latency systems work behind the quant identity."
        meta="CONTEXT SHIPS WITH EVERY NUMBER"
      />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        {/* benchmark strip */}
        <Reveal>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {benchmarkStrip.map((b) => (
              <div key={b.label} className="corner-ticks bg-surface p-6">
                <p className="num-mono text-3xl font-semibold">
                  {b.value}
                  <span className="ml-1 text-sm font-normal text-muted">{b.unit}</span>
                </p>
                <p className="label-mono mt-3 text-[10px] leading-relaxed text-faint">{b.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* tier-2 builds */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {tier2Builds.map((build, i) => (
            <Reveal key={build.id} delay={i * 100}>
              <div className="flex h-full flex-col border border-line bg-surface p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display text-2xl">{build.name}</h3>
                  <p className="num-mono shrink-0 text-[10px] text-signal">{build.status}</p>
                </div>
                {build.description && (
                  <p className="mt-4 text-sm leading-relaxed text-muted">{build.description}</p>
                )}
                {build.metrics && (
                  <div className="mt-auto flex flex-wrap gap-6 border-t border-line pt-5">
                    {build.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="num-mono text-xl font-semibold">{m.value}</p>
                        <p className="label-mono mt-1 text-[10px] text-faint">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* systems index */}
        <Reveal delay={150}>
          <div className="mt-6 border border-line bg-surface p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-xs text-muted">SYSTEMS ENGINEERING INDEX</p>
              <Link href="/builds" className="link-line label-mono text-xs text-signal">
                FULL INDEX →
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {systemsIndex.map((sys) => (
                <li key={sys.id} className="num-mono text-[11px] text-muted">
                  {sys.name}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
