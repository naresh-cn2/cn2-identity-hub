import type { Metadata } from "next";
import { notes } from "@/data/intelligence";
import Reveal from "@/components/ui/reveal";
import KnowledgeGraph from "@/components/viz/knowledge-graph";

export const metadata: Metadata = {
  title: "Intelligence",
  description:
    "The thinking layer — mental models, research notes, decision systems and market thinking behind the quantitative work.",
  alternates: { canonical: "/intelligence" },
};

export default function IntelligencePage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <p className="label-mono text-muted">
              DOMAIN <span className="text-signal">/</span> 05 — INTELLIGENCE
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">INTELLIGENCE</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              The thinking layer behind the systems — mental models, research notes, decision
              systems. What the engineer believed when the code was written.
            </p>
          </Reveal>
        </div>
      </header>

      {/* knowledge graph */}
      <section aria-label="Knowledge graph" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">THE MAP</h2>
            <p className="mt-4 max-w-xl text-base text-muted">
              Hover a node to isolate its relationships. Every edge is a working dependency, not
              decoration.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 border border-line bg-surface p-4 md:p-6">
              <KnowledgeGraph />
            </div>
          </Reveal>
        </div>
      </section>

      {/* notebook */}
      <section aria-label="Research notebook" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">THE NOTEBOOK</h2>
              <p className="label-mono text-faint">{notes.length} NOTES</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
            {notes.map((note, i) => (
              <Reveal key={note.id} delay={Math.min(i, 3) * 60}>
                <article className="corner-ticks h-full bg-background p-6 md:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="label-mono text-signal">{note.type}</p>
                    <span className="num-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="display mt-4 text-xl md:text-2xl">{note.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{note.body}</p>
                  {note.source && (
                    <p className="label-mono mt-5 text-faint">SOURCE — {note.source.toUpperCase()}</p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
