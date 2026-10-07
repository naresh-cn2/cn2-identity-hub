import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import Reveal from "@/components/ui/reveal";
import { researchEntries } from "@/data/research";

export default function ResearchTeaser() {
  const featured = researchEntries.slice(0, 3);

  return (
    <section className="bg-surface" aria-label="Research">
      <SectionHeader
        act="ACT IV"
        code="RESEARCH"
        title="RESEARCH"
        subtitle="Questions before conclusions. Every entry states its hypothesis, method, evidence — and its limitation."
        meta="ARCHIVE / 08 ENTRIES"
      />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <div className="grid gap-px bg-line md:grid-cols-3">
          {featured.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 100}>
              <Link
                href={`/research#${entry.id}`}
                className="group flex h-full flex-col bg-surface p-8 transition-colors duration-300 hover:bg-signal-soft"
              >
                <p className="label-mono text-[10px] text-faint">
                  <span className="text-signal">{entry.category}</span> · {entry.status}
                </p>
                <h3 className="display mt-5 text-xl leading-tight transition-transform duration-300 group-hover:translate-x-1">
                  {entry.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{entry.question}</p>
                <p className="label-mono mt-auto pt-6 text-[10px] text-faint">
                  READ ENTRY <span className="text-signal">→</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <Link
            href="/research"
            className="label-mono mt-10 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
          >
            OPEN RESEARCH ARCHIVE
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
