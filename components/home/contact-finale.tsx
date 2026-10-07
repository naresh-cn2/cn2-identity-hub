import Magnetic from "@/components/ui/magnetic";
import Reveal from "@/components/ui/reveal";
import { site } from "@/data/site";

export default function ContactFinale() {
  return (
    <section className="relative overflow-hidden border-t border-line" aria-label="Contact">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[80vh] max-w-[1440px] flex-col items-start justify-center px-5 py-28 sm:px-8">
        <Reveal>
          <p className="label-mono text-muted">
            ACT IX <span className="text-signal">/</span> CONTACT
          </p>
        </Reveal>
        <Reveal clip delay={100}>
          <h2 className="display mt-8 text-[clamp(2.8rem,9vw,7.5rem)] leading-[0.9]">
            START A<br />
            <span className="text-signal">CONVERSATION</span>
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
            Quantitative research, data infrastructure, trading systems,
            backtesting — if the problem involves markets, data and exactness,
            I am interested.
          </p>
        </Reveal>

        <Reveal delay={420}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Magnetic external href={site.links.email} ariaLabel="Email Naresh">
              <span className="label-mono inline-block bg-signal px-8 py-4 text-background transition-colors hover:bg-foreground hover:text-background">
                {site.email}
              </span>
            </Magnetic>
            <Magnetic external href={site.links.github} ariaLabel="Open GitHub profile">
              <span className="label-mono inline-block border border-line-strong px-8 py-4 text-foreground transition-colors hover:border-signal hover:text-signal">
                GITHUB
              </span>
            </Magnetic>
            <Magnetic external href={site.links.linkedin} ariaLabel="Open LinkedIn profile">
              <span className="label-mono inline-block border border-line-strong px-8 py-4 text-foreground transition-colors hover:border-signal hover:text-signal">
                LINKEDIN
              </span>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={550}>
          <div className="mt-20 flex w-full flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <p className="num-mono text-[10px] text-faint">
              {site.name} — {site.identity}
            </p>
            <p className="num-mono text-[10px] text-faint">
              RESEARCH · MARKETS · DATA · ENGINEERING
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
