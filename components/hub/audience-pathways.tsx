import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { hubPathways, type HubPathway } from "@/data/hub";

/**
 * "What brings you here?" — the audience-oriented pathways on the hub.
 *
 * Four large, visually distinct routes into the site, one per audience:
 * employers, clients, technical reviewers and collaborators. They close the
 * hub page — after the introduction, the eight destination sections and the
 * secondary index — so a visitor who has seen everything meets the intent
 * routes as the final call to action. Every card is a real link to a real
 * route, and the wording promises nothing the destination page cannot show.
 */

function PathwayCard({ pathway }: { pathway: HubPathway }) {
  return (
    <Link
      href={pathway.href}
      className="group flex h-full flex-col justify-between gap-10 bg-background p-8 transition-colors duration-300 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal md:p-10"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="num-mono text-xs text-signal">{pathway.code}</span>
          <span className="label-mono text-[10px] text-faint">{pathway.audience}</span>
        </div>
        <h3 className="display mt-5 text-2xl leading-tight text-foreground transition-colors duration-300 group-hover:text-signal md:text-3xl">
          {pathway.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
          {pathway.blurb}
        </p>
      </div>
      <span className="label-mono inline-flex items-center gap-3 self-start text-[10px] text-foreground transition-colors duration-300 group-hover:text-signal">
        {pathway.action}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

export default function AudiencePathways() {
  return (
    <section aria-labelledby="pathways-heading" className="border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-mono text-signal">START HERE</p>
            <p className="label-mono text-faint">FOUR PATHWAYS</p>
          </div>
          <h2 id="pathways-heading" className="display mt-4 text-3xl md:text-5xl">
            WHAT BRINGS YOU HERE?
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
          {hubPathways.map((pathway, i) => (
            <Reveal key={pathway.code} delay={i * 80}>
              <PathwayCard pathway={pathway} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
