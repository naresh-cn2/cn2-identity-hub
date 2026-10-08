import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { articleCategories, formatArticleDate, publishedArticles } from "@/data/articles";
import { notes } from "@/data/intelligence";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Engineering notes on quantitative systems, market data and research infrastructure — written from work that exists, with the limits stated.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles — Bukya Naresh / CN2.dev",
    description:
      "Engineering notes on quantitative systems, market data and research infrastructure.",
  },
};

/** Editorial column spine — the masthead motif for this section. */
function ColumnSpine() {
  return (
    <svg
      viewBox="0 0 840 72"
      className="h-auto w-full"
      role="img"
      aria-label="Editorial column grid motif"
    >
      {[0, 1, 2, 3].map((i) => {
        const x = 12 + i * 272;
        return (
          <g key={i}>
            <line x1={x} y1="0" x2={x} y2="72" stroke="var(--line-strong)" strokeWidth="1" />
            {[10, 24, 38, 52].map((y, j) => (
              <line
                key={y}
                x1={x}
                y1={y}
                x2={x + (j === 0 ? 156 : j === 1 ? 118 : j === 2 ? 172 : 96)}
                y2={y}
                stroke={i === 3 && j === 1 ? "var(--signal)" : "var(--line)"}
                strokeWidth={j === 1 ? 2 : 1}
              />
            ))}
          </g>
        );
      })}
      <line x1="12" y1="72" x2="828" y2="72" stroke="var(--line-strong)" strokeWidth="1" />
    </svg>
  );
}

export default function ArticlesPage() {
  const [lead, ...rest] = publishedArticles;

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                DOMAIN <span className="text-signal">/</span> 04 — ARTICLES
              </p>
              <p className="label-mono text-faint">{publishedArticles.length} PUBLISHED NOTES</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">ARTICLES</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Engineering notes rather than think-pieces. Each one is written from work that already
              exists in this repository, and each one says where its argument stops.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12 max-w-4xl">
              <ColumnSpine />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- lead article ---- */}
      {lead && (
        <section aria-label="Latest note" className="border-b border-line">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
            <Reveal>
              <p className="label-mono text-signal">LATEST</p>
            </Reveal>
            <Reveal delay={80}>
              <Link href={`/articles/${lead.id}`} className="group mt-8 grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
                <div>
                  <p className="label-mono text-faint">
                    {lead.category} · {formatArticleDate(lead.published)} · {lead.readingTime}
                  </p>
                  <p className="num-mono mt-6 text-6xl font-semibold text-line-strong md:text-8xl">
                    {lead.index}
                  </p>
                </div>
                <div>
                  <h2 className="display text-3xl transition-colors group-hover:text-signal md:text-5xl">
                    {lead.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{lead.dek}</p>
                  <p className="label-mono mt-8 text-signal transition-transform duration-300 group-hover:translate-x-1">
                    READ THE NOTE →
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---- index ---- */}
      <section aria-label="Article index" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">THE INDEX</h2>
          </Reveal>

          <div className="mt-12 space-y-px bg-line">
            {rest.map((a, i) => (
              <Reveal key={a.id} delay={Math.min(i, 3) * 70}>
                <Link
                  href={`/articles/${a.id}`}
                  className="group grid gap-4 bg-background p-6 transition-colors hover:bg-surface md:grid-cols-[5rem_1fr_auto] md:items-baseline md:gap-10 md:p-8"
                >
                  <span className="num-mono text-2xl text-line-strong transition-colors group-hover:text-signal md:text-3xl">
                    {a.index}
                  </span>
                  <span className="min-w-0">
                    <span className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-faint">
                      <span className="text-research">{a.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{formatArticleDate(a.published)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{a.readingTime}</span>
                    </span>
                    <span className="display mt-3 block text-xl md:text-3xl">{a.title}</span>
                    <span className="mt-3 block max-w-3xl text-sm leading-relaxed text-muted">
                      {a.dek}
                    </span>
                  </span>
                  <span className="label-mono self-center text-signal transition-transform duration-300 group-hover:translate-x-1">
                    READ →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- field notes ---- */}
      <section aria-label="Field notes" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">FIELD NOTES</h2>
              <p className="label-mono text-faint">
                {notes.length} SHORT ENTRIES — SOURCE ATTACHED WHERE ONE EXISTS
              </p>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Shorter than an article and written while working: mental models, decision rules and
              engineering conclusions, each tied to the system that produced it.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note, i) => (
              <Reveal key={note.id} delay={Math.min(i, 4) * 50}>
                <article className="flex h-full flex-col bg-background p-6">
                  <p className="label-mono text-research">{note.type}</p>
                  <h3 className="display mt-4 text-lg md:text-xl">{note.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{note.body}</p>
                  {note.source && (
                    <p className="label-mono mt-auto pt-6 text-[10px] text-faint">
                      SOURCE — {note.source.toUpperCase()}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- categories + infrastructure note ---- */}
      <section aria-label="Categories" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <div className="grid gap-10 md:grid-cols-[16rem_1fr] md:gap-16">
            <Reveal>
              <p className="label-mono text-faint">CATEGORIES</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex flex-wrap gap-2">
                {articleCategories.map((c) => (
                  <span key={c} className="label-mono border border-line px-3 py-1.5 text-[10px] text-muted">
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
                The categories exist so future notes have somewhere to land. Everything currently
                listed was written from a system in the archive — the note and the case study are
                the same evidence, described at different resolutions.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- continue ---- */}
      <section aria-label="Continue" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">NEXT</p>
                <p className="display mt-2 text-2xl md:text-3xl">INSPECT THE SYSTEMS BEHIND THE NOTES</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/builds"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  BUILDS →
                </Link>
                <Link
                  href="/research"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research"
                >
                  RESEARCH →
                </Link>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  GITHUB →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
