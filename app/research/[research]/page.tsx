import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { ResearchArtifact } from "@/components/research/research-visual-artifacts";
import { researchEntries } from "@/data/research";
import { getArchiveProject } from "@/data/archive";
import { site } from "@/data/site";

export function generateStaticParams() {
  return researchEntries.map((e) => ({ research: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ research: string }>;
}): Promise<Metadata> {
  const { research: id } = await params;
  const entry = researchEntries.find((e) => e.id === id);
  if (!entry) return { title: "Research entry not found" };

  return {
    title: entry.title,
    description: entry.conclusion,
    alternates: { canonical: `/research/${entry.id}` },
    openGraph: {
      title: `${entry.title} — ${site.name} / ${site.identity}`,
      description: entry.conclusion,
      type: "article",
    },
  };
}

const CHAIN = [
  ["HYPOTHESIS", "hypothesis"],
  ["METHOD", "method"],
  ["EVIDENCE", "evidence"],
  ["RESULT", "result"],
  ["LIMITATION", "limitation"],
] as const;

export default async function ResearchEntryPage({
  params,
}: {
  params: Promise<{ research: string }>;
}) {
  const { research: id } = await params;
  const index = researchEntries.findIndex((e) => e.id === id);
  if (index === -1) notFound();

  const entry = researchEntries[index];
  const prev = researchEntries[index - 1];
  const next = researchEntries[index + 1];
  const build = entry.relatedProject ? getArchiveProject(entry.relatedProject) : undefined;

  const statusStyle =
    entry.status === "VERIFIED"
      ? "border-line-strong text-foreground"
      : entry.status === "DOCUMENTED"
        ? "border-line text-muted"
        : "border-signal text-signal";

  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-3 sm:px-8">
          <nav aria-label="Breadcrumb" className="label-mono flex flex-wrap items-center gap-2 text-[10px] text-faint">
            <Link href="/" className="transition-colors hover:text-foreground">
              HOME
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/research" className="transition-colors hover:text-foreground">
              RESEARCH
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{entry.category}</span>
          </nav>
        </div>
      </div>

      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-24 sm:px-8 md:pb-20 md:pt-32">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label-mono text-research">{entry.category}</span>
              <span className={`label-mono border px-2 py-1 ${statusStyle}`}>{entry.status}</span>
              <span className="label-mono text-faint">
                ENTRY {String(index + 1).padStart(2, "0")} / {String(researchEntries.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-6 max-w-5xl text-[clamp(2rem,5.4vw,4.4rem)]">{entry.title}</h1>
          </Reveal>

          <Reveal delay={180}>
            <blockquote className="corner-ticks mt-10 max-w-3xl border border-line bg-surface p-6 md:p-8">
              <p className="label-mono text-research">QUESTION</p>
              <p className="mt-3 text-lg leading-relaxed text-foreground md:text-xl">{entry.question}</p>
            </blockquote>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_360px] lg:gap-20">
          {/* ---- the chain ---- */}
          <div className="min-w-0">
            <ol className="space-y-px bg-line">
              {CHAIN.map(([label, key], i) => (
                <Reveal key={label} delay={i * 60}>
                  <li className="bg-background p-6 md:p-8">
                    <div className="flex items-baseline gap-4">
                      <span className="num-mono text-xs text-research">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="label-mono text-foreground">{label}</h2>
                    </div>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
                      {entry[key]}
                    </p>
                  </li>
                </Reveal>
              ))}

              <Reveal delay={320}>
                <li className="bg-surface p-6 md:p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="num-mono text-xs text-signal">06</span>
                    <h2 className="label-mono text-signal">CONCLUSION</h2>
                  </div>
                  <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-foreground md:text-xl">
                    {entry.conclusion}
                  </p>
                </li>
              </Reveal>
            </ol>

            {/* ---- evidence source ---- */}
            {build && (
              <Reveal delay={120}>
                <div className="mt-12 border border-line bg-surface p-6 md:p-8">
                  <p className="label-mono text-faint">EVIDENCE SOURCE</p>
                  <h2 className="display mt-3 text-xl md:text-2xl">{build.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{build.thesis}</p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      href={`/builds/${build.id}`}
                      className="label-mono border border-line-strong px-5 py-2.5 text-foreground transition-colors hover:border-signal hover:text-signal"
                    >
                      OPEN CASE STUDY →
                    </Link>
                    {build.github && (
                      <a
                        href={build.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-line label-mono self-center text-xs text-muted hover:text-signal"
                      >
                        REPOSITORY →
                      </a>
                    )}
                  </div>
                  <p className="label-mono mt-6 text-[10px] text-faint">
                    PROVENANCE — {build.evidenceLabel}
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          {/* ---- side rail: artifact + metadata ---- */}
          <aside className="min-w-0 space-y-8">
            <Reveal delay={140}>
              <div className="border border-line bg-surface p-5">
                <p className="label-mono mb-4 text-research">GENERATIVE ARTIFACT</p>
                <div className="h-56 w-full border border-line bg-background/50">
                  <ResearchArtifact category={entry.category} seed={index + 100} />
                </div>
                <p className="label-mono mt-3 text-[10px] leading-relaxed text-faint">
                  ILLUSTRATIVE — A DETERMINISTIC DIAGRAM OF THE {entry.category} CATEGORY. IT IS NOT
                  A MEASUREMENT AND CARRIES NO DATA.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="border border-line bg-surface p-5">
                <p className="label-mono mb-4 text-faint">ENTRY METADATA</p>
                <dl className="space-y-3">
                  {[
                    ["CATEGORY", entry.category],
                    ["STATUS", entry.status],
                    ["EVIDENCE SOURCE", entry.relatedProject ?? "GENERAL"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                      <dt className="label-mono text-[10px] text-faint">{k}</dt>
                      <dd className="label-mono text-right text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="border border-line bg-surface p-5">
                <p className="label-mono mb-4 text-faint">CONTINUE</p>
                <div className="space-y-3">
                  {prev ? (
                    <Link href={`/research/${prev.id}`} className="group block">
                      <p className="label-mono text-[10px] text-faint">← PREVIOUS</p>
                      <p className="mt-1 text-sm leading-snug text-muted transition-colors group-hover:text-foreground">
                        {prev.title}
                      </p>
                    </Link>
                  ) : (
                    <p className="label-mono text-[10px] text-faint">← START OF ARCHIVE</p>
                  )}
                  {next ? (
                    <Link href={`/research/${next.id}`} className="group block">
                      <p className="label-mono text-[10px] text-faint">NEXT →</p>
                      <p className="mt-1 text-sm leading-snug text-muted transition-colors group-hover:text-foreground">
                        {next.title}
                      </p>
                    </Link>
                  ) : (
                    <p className="label-mono text-[10px] text-faint">END OF ARCHIVE →</p>
                  )}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      <section aria-label="Archive navigation" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Link
              href="/research"
              className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research"
            >
              ← RESEARCH ARCHIVE
            </Link>
            <Link
              href="/builds"
              className="link-line label-mono text-xs text-muted hover:text-signal"
            >
              THE BUILDS BEHIND IT →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
