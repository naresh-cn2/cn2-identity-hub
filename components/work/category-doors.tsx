import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import TiltCard from "@/components/ui/tilt-card";
import { WORK_CATEGORIES, getWorksByCategory } from "@/data/works";

export default function CategoryDoors() {
  const categories = Object.values(WORK_CATEGORIES);

  return (
    <section aria-label="Works categories" className="border-b border-line bg-surface/40">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="label-mono text-signal">DISCIPLINES / THREE CORE TIERS</p>
              <h2 className="display mt-2 text-2xl md:text-4xl">CATEGORIES OF WORK</h2>
            </div>
            <p className="label-mono text-faint">
              SELECT A CATALOGUE TO EXPLORE SPECIFIC SYSTEMS &amp; PROOFS
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => {
            const items = getWorksByCategory(cat.id);
            const accentBorder =
              cat.accent === "signal"
                ? "hover:border-signal/70 group-hover:border-signal"
                : cat.accent === "research"
                ? "hover:border-research/70 group-hover:border-research"
                : "hover:border-cyan-500/70 group-hover:border-cyan-500";

            const accentText =
              cat.accent === "signal"
                ? "text-signal"
                : cat.accent === "research"
                ? "text-research"
                : "text-cyan-500 dark:text-cyan-400";

            return (
              <Reveal key={cat.id} delay={i * 90}>
                <TiltCard className="h-full">
                  <div
                    className={`group relative flex h-full flex-col justify-between border border-line bg-surface p-7 transition-all duration-300 ${accentBorder} shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]`}
                  >
                    <div>
                      {/* Top Meta Line */}
                      <div className="flex items-center justify-between border-b border-line/60 pb-4">
                        <span className={`num-mono text-2xl font-bold ${accentText}`}>
                          {cat.number}
                        </span>
                        <span className="label-mono border border-line px-2 py-0.5 text-[9px] text-faint">
                          {items.length} {items.length === 1 ? "SYSTEM" : "SYSTEMS"}
                        </span>
                      </div>

                      {/* Title & Badge */}
                      <p className={`label-mono mt-5 text-[10px] tracking-wider ${accentText}`}>
                        {cat.badge}
                      </p>
                      <h3 className="display mt-2 text-2xl md:text-3xl text-foreground">
                        <Link
                          href={`/works/${cat.slug}`}
                          className="transition-colors hover:text-signal"
                        >
                          {cat.title}
                        </Link>
                      </h3>

                      {/* Tagline & Desc */}
                      <p className="mt-4 font-mono text-xs font-semibold text-foreground/90">
                        {cat.tagline}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {cat.description}
                      </p>

                      {/* Featured Items List */}
                      <div className="mt-6 border-t border-line/60 pt-4">
                        <p className="label-mono text-[10px] text-faint">FEATURED IN THIS TIER:</p>
                        <ul className="mt-2.5 space-y-1.5">
                          {items.map((item) => (
                            <li key={item.id} className="flex items-center gap-2 text-xs font-mono text-foreground/80">
                              <span className={`h-1 w-1 rounded-full ${cat.accent === "signal" ? "bg-signal" : cat.accent === "research" ? "bg-research" : "bg-cyan-500"}`} />
                              <span>{item.shortTitle}</span>
                              <span className="ml-auto text-[10px] text-faint">[{item.status.split(" ")[0]}]</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom CTA Action */}
                    <div className="mt-8 border-t border-line pt-5">
                      <Link
                        href={`/works/${cat.slug}`}
                        className={`label-mono inline-flex items-center gap-2 text-xs font-bold transition-all duration-300 group-hover:translate-x-1 ${accentText}`}
                      >
                        <span>ENTER {cat.title}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
