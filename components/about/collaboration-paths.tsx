import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import { audiences } from "@/data/about";

/* Audience pathways — every destination is a real route on CN2.DEV. */

export default function CollaborationPaths() {
  return (
    <>
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {audiences.map((a, i) => (
          <Reveal key={a.tag} delay={Math.min(i, 3) * 70} className="h-full">
            <Link
              href={a.href}
              className="corner-ticks group flex h-full flex-col justify-between border border-line bg-surface p-7 transition-colors duration-300 hover:border-signal/60"
            >
              <div>
                <p className="label-mono text-[10px] text-signal">{a.tag}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{a.body}</p>
              </div>
              <span className="label-mono mt-8 inline-flex items-center gap-2 text-[10px] text-foreground transition-colors duration-300 group-hover:text-signal">
                {a.cta}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-24 flex flex-col gap-8 border-t border-line pt-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display text-4xl md:text-6xl">BUKYA NARESH</h2>
            <p className="label-mono mt-4 text-[10px] text-faint">
              CN2.DEV — QUANTITATIVE INTELLIGENCE
            </p>
          </div>
          <Link
            href="/contact"
            className="link-line label-mono inline-flex items-center gap-2 self-start text-[10px] text-foreground transition-colors duration-300 hover:text-signal md:self-auto"
          >
            CONTACT
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>
    </>
  );
}
