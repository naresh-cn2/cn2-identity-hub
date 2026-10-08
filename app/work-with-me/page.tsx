import type { Metadata } from "next";
import { engagementAreas } from "@/data/lab";
import { site } from "@/data/site";
import Reveal from "@/components/ui/reveal";
import { DataField } from "@/components/viz/quant-primitives";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Engagement areas: quant research, data infrastructure, trading systems, backtesting, research automation, performance engineering and technical prototyping.",
  alternates: { canonical: "/work-with-me" },
};

export default function WorkWithMePage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <p className="label-mono text-muted">
              DOMAIN <span className="text-signal">/</span> 07 — WORK WITH ME
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">
              {site.name}
              <br />
              <span className="text-signal">{site.identity}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Research-grade engineering for quantitative problems. The work is scoped honestly —
              what gets delivered is what can be evidenced.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10 h-64 w-full max-w-4xl">
              <DataField seed={66} gridSize={20} amplitude={0.4} showSignalTrace />
            </div>
          </Reveal>
        </div>
    </header>

      <section aria-label="Engagement areas" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">ENGAGEMENT AREAS</h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {engagementAreas.map((area, i) => (
              <Reveal key={area.title} delay={Math.min(i, 2) * 80}>
                <div className="corner-ticks h-full bg-background p-6 md:p-8">
                  <span className="num-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-4 text-xl md:text-2xl">{area.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{area.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Start a conversation" className="border-b border-line">
        <div className="scanlines relative mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 md:py-32">
          <Reveal>
            <p className="label-mono text-faint">NO FORMS. NO FUNNELS. DIRECT.</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display mt-8 text-[clamp(2.4rem,7vw,5.5rem)]">
              START A<br />
              <span className="text-signal">CONVERSATION</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Describe the problem, the data, and what evidence would count as success. Replies are
              substantive or honest about fit.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <a
                href={site.links.email}
                className="corner-ticks label-mono border border-line-strong bg-surface px-8 py-5 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                EMAIL — {site.email.toUpperCase()}
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:text-foreground"
              >
                LINKEDIN →
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer"
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:text-foreground"
              >
                GITHUB →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
