import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import Reveal from "@/components/ui/reveal";
import { notes } from "@/data/intelligence";

export default function IntelligenceTeaser() {
  const featured = notes.slice(0, 3);

  return (
    <section aria-label="Intelligence">
      <SectionHeader
        act="ACT VII"
        code="INTELLIGENCE"
        title="INTELLIGENCE"
        subtitle="The thinking layer — mental models, decision systems and research notes from the work itself."
        meta="NOTEBOOK / ARCHIVE"
      />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <div className="grid gap-px bg-line md:grid-cols-3">
          {featured.map((note, i) => (
            <Reveal key={note.id} delay={i * 100}>
              <div className="flex h-full flex-col bg-background p-8">
                <p className="label-mono text-[10px] text-signal">{note.type}</p>
                <h3 className="mt-5 text-xl font-semibold leading-tight">{note.title}</h3>
                <p className="mt-4 line-clamp-6 text-sm leading-relaxed text-muted">{note.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <Link
            href="/intelligence"
            className="label-mono mt-10 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
          >
            ENTER THE NOTEBOOK — KNOWLEDGE GRAPH →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
