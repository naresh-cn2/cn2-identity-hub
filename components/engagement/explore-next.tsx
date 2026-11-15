import Link from "next/link";
import Reveal from "@/components/ui/reveal";

/**
 * ExploreNext — the exploration system.
 *
 * Every page should end with a relevant next destination, not a generic
 * footer. This component renders a curated set of onward paths: what a
 * visitor can go read next and why that is the logical step.
 *
 * Server component. Cards are real links (keyboard accessible, crawlable),
 * and the arrow affordance is decorative.
 */

export interface ExploreDestination {
  /** Short mono code, e.g. "01B" — used for scannability. */
  code: string;
  /** Destination name as the visitor would name it. */
  label: string;
  /** One line explaining what they will find there. */
  description: string;
  /** Internal path. */
  href: string;
  /** Optional qualifier, e.g. "CASE STUDY" or "12 PROJECTS". */
  meta?: string;
  /** Opens an external destination in a new tab. */
  external?: boolean;
}

interface ExploreNextProps {
  /** Eyebrow above the block. */
  eyebrow?: string;
  /** Heading — write it as an invitation, not a label. */
  title: string;
  /** One line on why these paths are the next logical step. */
  intro?: string;
  destinations: ExploreDestination[];
}

export default function ExploreNext({
  eyebrow = "CONTINUE EXPLORING",
  title,
  intro,
  destinations,
}: ExploreNextProps) {
  if (!destinations.length) return null;

  return (
    <section aria-label="Where to go next" className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
        <Reveal>
          <p className="label-mono text-signal">{eyebrow}</p>
          <h2 className="display mt-4 text-2xl md:text-3xl">{title}</h2>
          {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{intro}</p>}
        </Reveal>

        <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => {
            const inner = (
              <>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="num-mono text-[10px] text-faint">{d.code}</span>
                  {d.meta && (
                    <span className="label-mono text-[9px] text-faint">{d.meta}</span>
                  )}
                </div>
                <p className="display mt-4 text-lg text-foreground transition-colors group-hover:text-signal">
                  {d.label}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d.description}</p>
                <span className="label-mono mt-5 inline-block text-[10px] text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal">
                  {d.external ? "OPEN ↗" : "OPEN →"}
                </span>
              </>
            );

            return (
              <Reveal key={d.href} delay={(i % 3) * 60}>
                {d.external ? (
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface md:p-7"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    href={d.href}
                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface md:p-7"
                  >
                    {inner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
