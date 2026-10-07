import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import Reveal from "@/components/ui/reveal";
import { career } from "@/data/career";

export default function CareerTeaser() {
  return (
    <section className="bg-surface" aria-label="Career">
      <SectionHeader
        act="ACT VIII"
        code="CAREER"
        title="CAREER"
        subtitle="Not a resume wall — what I build, what I study, and the evidence for both."
        meta="EVIDENCE-FIRST"
      />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <div className="grid gap-px bg-line md:grid-cols-3">
          {career.whatIBuild.slice(0, 3).map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="flex h-full flex-col bg-surface p-8">
                <p className="num-mono text-[10px] text-faint">EVIDENCE / {item.evidence}</p>
                <h3 className="display mt-4 text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/career"
              className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              VIEW CAREER EVIDENCE
            </Link>
            <Link
              href="/work-with-me"
              className="label-mono bg-signal px-6 py-3 text-background transition-colors hover:bg-foreground hover:text-background"
            >
              WORK WITH ME
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
