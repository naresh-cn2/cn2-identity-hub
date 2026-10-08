import type { Metadata } from "next";
import { labModules } from "@/data/lab";
import LabShell from "@/components/lab/lab-shell";
import ReplayPreview from "@/components/case-study/replay-preview";
import Reveal from "@/components/ui/reveal";

const mod = labModules.find((m) => m.href === "/lab/market-replay")!;

export const metadata: Metadata = {
  title: "Point-in-Time Replay Lab — Quant Lab",
  description:
    "The signature interactive: scrub a timestamp on a deterministic synthetic series and watch the information boundary — lookahead vs point-in-time safe.",
  alternates: { canonical: "/lab/market-replay" },
};

export default function MarketReplayLabPage() {
  return (
    <>
      <LabShell code={mod.code} name={mod.name} description={mod.description} inputs={mod.inputs} outputs={mod.outputs}>
        <ReplayPreview />
      </LabShell>

      {/* lookahead vs point-in-time educational split */}
      <section aria-label="Lookahead vs point-in-time safe" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">
              LOOKAHEAD <span className="text-signal">VS</span> POINT-IN-TIME SAFE
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
            <Reveal delay={80}>
              <div className="h-full bg-surface p-6 md:p-8">
                <p className="label-mono text-faint">THE FAILURE MODE</p>
                <h3 className="display mt-4 text-2xl text-signal">LOOKAHEAD</h3>
                <ul className="mt-6 space-y-3">
                  {[
                    "A resampled candle quietly includes the tail of its window",
                    "A join keys on knowledge that only existed after the fact",
                    "A timestamp normalizes to a coarser clock and rewrites causality",
                    "The result cannot be repaired — only regenerated from clean data",
                  ].map((s) => (
                    <li key={s} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="h-full bg-surface p-6 md:p-8">
                <p className="label-mono text-faint">THE STRUCTURAL ANSWER</p>
                <h3 className="display mt-4 text-2xl">POINT-IN-TIME SAFE</h3>
                <ul className="mt-6 space-y-3">
                  {[
                    "Reads at time t can only resolve information that existed at t",
                    "The guarantee lives in the data layer — consumers cannot opt out",
                    "Sliding watermark defines the visible horizon for every reader",
                    "Adversarial tests attack the boundary and fail — verified",
                  ].map((s) => (
                    <li key={s} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://github.com/naresh-cn2/quant-market-data-replay"
                  target="_blank"
                  rel="noreferrer"
                  className="label-mono link-line mt-8 inline-block text-signal"
                >
                  SEE THE IMPLEMENTATION →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
