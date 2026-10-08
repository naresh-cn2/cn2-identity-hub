import type { Metadata } from "next";
import Link from "next/link";
import { labModules } from "@/data/lab";
import Reveal from "@/components/ui/reveal";
import RiskSurface from "@/components/lab/risk-surface";

export const metadata: Metadata = {
  title: "Quant Lab",
  description:
    "Interactive quantitative instruments — risk simulator, point-in-time replay lab, strategy visualizer, risk/return surface and experiment explorer.",
  alternates: { canonical: "/lab" },
};

export default function LabPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <p className="label-mono text-muted">
              DOMAIN <span className="text-signal">/</span> 04 — LAB
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">QUANT LAB</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Instruments, not demos. Every module computes what it claims, labels its inputs and
              outputs, and derives from the same rules as the systems it illustrates.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---- module index ---- */}
      <section aria-label="Lab modules" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-px bg-line md:grid-cols-2">
            {labModules
              .filter((m) => m.href !== "/lab#surface")
              .map((m, i) => (
                <Reveal key={m.id} delay={i * 80}>
                  <Link
                    href={m.href}
                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface md:p-8"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="label-mono text-faint">LAB / {m.code}</span>
                      <span className="label-mono flex items-center gap-2 text-foreground">
                        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                        {m.status}
                      </span>
                    </div>
                    <span className="display mt-6 block text-2xl md:text-4xl">{m.name}</span>
                    <span className="mt-4 block flex-1 text-base leading-relaxed text-muted">
                      {m.description}
                    </span>
                    <span className="label-mono mt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                      OPEN INSTRUMENT →
                    </span>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ---- central surface ---- */}
      <section id="surface" aria-label="Risk and return surface" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">RISK / RETURN SURFACE</h2>
              <p className="label-mono text-faint">LAB / SURF-01 — PROJECTED 3D, 2D FALLBACK BUILT-IN</p>
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              A projected 3D wireframe rendered in pure SVG — no WebGL required, so the instrument
              degrades to itself. Drag to rotate; hover for a coordinate readout.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <RiskSurface />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
