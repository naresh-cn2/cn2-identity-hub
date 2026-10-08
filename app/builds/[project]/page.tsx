import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CaseStudy from "@/components/case-study/case-study";
import TierTwoCaseStudy from "@/components/builds/tier-two-case-study";
import FlagshipInstrument from "@/components/builds/flagship-instrument";
import Reveal from "@/components/ui/reveal";
import { archiveProjects, getArchiveProject, getFlagship } from "@/data/archive";
import { researchEntries } from "@/data/research";
import { site } from "@/data/site";

export function generateStaticParams() {
  return archiveProjects.map((p) => ({ project: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}): Promise<Metadata> {
  const { project: id } = await params;
  const project = getArchiveProject(id);
  if (!project) return { title: "Build not found" };

  return {
    title: project.title,
    description: project.thesis,
    alternates: { canonical: `/builds/${project.id}` },
    openGraph: {
      title: `${project.title} — ${site.name} / ${site.identity}`,
      description: project.thesis,
      type: "article",
    },
  };
}

export default async function BuildPage({ params }: { params: Promise<{ project: string }> }) {
  const { project: id } = await params;
  const record = getArchiveProject(id);
  if (!record) notFound();

  const flagship = record.tier === 1 ? getFlagship(record.id) : undefined;
  const relatedResearch = researchEntries.filter((r) => r.relatedProject === record.id);

  return (
    <>
      {/* breadcrumb */}
      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-3 sm:px-8">
          <nav aria-label="Breadcrumb" className="label-mono flex flex-wrap items-center gap-2 text-[10px] text-faint">
            <Link href="/" className="transition-colors hover:text-foreground">
              HOME
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/builds" className="transition-colors hover:text-foreground">
              BUILDS
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{record.shortTitle}</span>
          </nav>
        </div>
      </div>

      {flagship ? (
        <CaseStudy project={flagship} instrument={<FlagshipInstrument project={flagship} />} />
      ) : (
        <TierTwoCaseStudy project={record} />
      )}

      {/* related research */}
      {relatedResearch.length > 0 && (
        <section aria-label="Related research" className="border-t border-line">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
            <Reveal>
              <p className="label-mono text-research">RESEARCH THIS BUILD PRODUCED</p>
            </Reveal>
            <div className="mt-8 grid gap-px bg-line md:grid-cols-2">
              {relatedResearch.map((r, i) => (
                <Reveal key={r.id} delay={i * 80}>
                  <Link
                    href={`/research/${r.id}`}
                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface md:p-8"
                  >
                    <p className="label-mono text-faint">{r.category}</p>
                    <h3 className="display mt-3 text-xl md:text-2xl">{r.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{r.result}</p>
                    <span className="label-mono mt-auto pt-6 text-research transition-transform duration-300 group-hover:translate-x-1">
                      READ THE ENTRY →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* navigation between builds */}
      <section aria-label="Archive navigation" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Link
              href="/builds"
              className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              ← COMPLETE ARCHIVE
            </Link>
            <div className="flex flex-wrap gap-6">
              <Link href="/research" className="link-line label-mono text-xs text-muted hover:text-research">
                RESEARCH →
              </Link>
              <Link href="/lab" className="link-line label-mono text-xs text-muted hover:text-signal">
                LAB →
              </Link>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line label-mono text-xs text-muted hover:text-signal"
              >
                GITHUB →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
