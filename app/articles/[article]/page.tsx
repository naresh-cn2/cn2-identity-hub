import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { formatArticleDate, getArticle, publishedArticles } from "@/data/articles";
import { researchEntries } from "@/data/research";
import { getArchiveProject } from "@/data/archive";
import { site } from "@/data/site";

export function generateStaticParams() {
  return publishedArticles.map((a) => ({ article: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ article: string }>;
}): Promise<Metadata> {
  const { article: id } = await params;
  const article = getArticle(id);
  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.dek,
    alternates: { canonical: `/articles/${article.id}` },
    openGraph: {
      title: `${article.title} — ${site.name} / ${site.identity}`,
      description: article.dek,
      type: "article",
      publishedTime: article.published,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ article: string }> }) {
  const { article: id } = await params;
  const article = getArticle(id);
  if (!article) notFound();

  const index = publishedArticles.findIndex((a) => a.id === article.id);
  const prev = publishedArticles[index - 1];
  const next = publishedArticles[index + 1];
  const research = article.relatedResearch
    ? researchEntries.find((r) => r.id === article.relatedResearch)
    : undefined;
  const build = article.relatedProject ? getArchiveProject(article.relatedProject) : undefined;

  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-3 sm:px-8">
          <nav aria-label="Breadcrumb" className="label-mono flex flex-wrap items-center gap-2 text-[10px] text-faint">
            <Link href="/" className="transition-colors hover:text-foreground">
              HOME
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/articles" className="transition-colors hover:text-foreground">
              ARTICLES
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{article.category}</span>
          </nav>
        </div>
      </div>

      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div className="grid-field absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-24 sm:px-8 md:pb-20 md:pt-32">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="label-mono text-research">{article.category}</span>
                <span className="label-mono text-faint" aria-hidden="true">
                  ·
                </span>
                <time className="label-mono text-faint" dateTime={article.published}>
                  {formatArticleDate(article.published)}
                </time>
                <span className="label-mono text-faint" aria-hidden="true">
                  ·
                </span>
                <span className="label-mono text-faint">{article.readingTime} READ</span>
                <span className="label-mono text-faint" aria-hidden="true">
                  ·
                </span>
                <span className="label-mono text-faint">NOTE {article.index}</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="display mt-6 max-w-5xl text-[clamp(1.9rem,5.2vw,4.2rem)]">{article.title}</h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{article.dek}</p>
            </Reveal>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_320px] lg:gap-20">
            {/* ---- body ---- */}
            <div className="min-w-0">
              <Reveal>
                <p className="max-w-3xl border-l-2 border-research pl-6 text-lg leading-relaxed text-foreground md:text-xl">
                  {article.summary}
                </p>
              </Reveal>

              <div className="mt-16 space-y-14">
                {article.sections.map((section, i) => (
                  <Reveal key={section.heading} delay={i * 60}>
                    <section aria-label={section.heading}>
                      <div className="flex items-baseline gap-4">
                        <span className="num-mono text-xs text-research">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="label-mono text-foreground">{section.heading}</h2>
                      </div>
                      <div className="mt-5 max-w-3xl space-y-5">
                        {section.body.map((p, j) => (
                          <p key={j} className="text-base leading-relaxed text-muted md:text-lg">
                            {p}
                          </p>
                        ))}
                      </div>
                      <div className="research-rule mt-10 max-w-3xl opacity-40" aria-hidden="true" />
                    </section>
                  </Reveal>
                ))}
              </div>

              {/* ---- takeaways ---- */}
              <Reveal delay={120}>
                <section aria-label="What this note argues" className="corner-ticks mt-16 border border-line bg-surface p-6 md:p-10">
                  <p className="label-mono text-signal">WHAT THIS NOTE ARGUES</p>
                  <ul className="mt-6 space-y-4">
                    {article.takeaways.map((t) => (
                      <li key={t} className="flex gap-4 text-base leading-relaxed text-foreground md:text-lg">
                        <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* ---- failure / honesty note ---- */}
              <Reveal delay={160}>
                <p className="mt-10 max-w-3xl text-sm leading-relaxed text-faint">
                  Limits stated above are part of the argument, not a disclaimer appended to it. Where
                  an associated study is still running, the linked research entry says so.
                </p>
              </Reveal>
            </div>

            {/* ---- rail ---- */}
            <aside className="min-w-0 space-y-8">
              {(research || build) && (
                <Reveal delay={140}>
                  <div className="border border-line bg-surface p-5">
                    <p className="label-mono mb-5 text-faint">THE EVIDENCE BEHIND IT</p>
                    <div className="space-y-6">
                      {research && (
                        <div>
                          <p className="label-mono text-research">{research.category}</p>
                          <h2 className="mt-2 text-base font-semibold leading-snug text-foreground">
                            {research.title}
                          </h2>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{research.result}</p>
                          <Link
                            href={`/research/${research.id}`}
                            className="link-line label-mono mt-3 inline-block text-xs text-research"
                          >
                            RESEARCH ENTRY →
                          </Link>
                        </div>
                      )}
                      {build && (
                        <div className="border-t border-line pt-6">
                          <p className="label-mono text-faint">BUILD</p>
                          <h2 className="mt-2 text-base font-semibold leading-snug text-foreground">
                            {build.title}
                          </h2>
                          <Link
                            href={`/builds/${build.id}`}
                            className="link-line label-mono mt-3 inline-block text-xs text-signal"
                          >
                            CASE STUDY →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              )}

              <Reveal delay={200}>
                <div className="border border-line bg-surface p-5">
                  <p className="label-mono mb-4 text-faint">CONTINUE READING</p>
                  <div className="space-y-4">
                    {prev ? (
                      <Link href={`/articles/${prev.id}`} className="group block">
                        <p className="label-mono text-[10px] text-faint">← PREVIOUS</p>
                        <p className="mt-1 text-sm leading-snug text-muted transition-colors group-hover:text-foreground">
                          {prev.title}
                        </p>
                      </Link>
                    ) : (
                      <p className="label-mono text-[10px] text-faint">← FIRST NOTE</p>
                    )}
                    {next ? (
                      <Link href={`/articles/${next.id}`} className="group block">
                        <p className="label-mono text-[10px] text-faint">NEXT →</p>
                        <p className="mt-1 text-sm leading-snug text-muted transition-colors group-hover:text-foreground">
                          {next.title}
                        </p>
                      </Link>
                    ) : (
                      <p className="label-mono text-[10px] text-faint">LATEST NOTE →</p>
                    )}
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </article>

      <section aria-label="Continue" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Link
              href="/articles"
              className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              ← ALL ARTICLES
            </Link>
            <div className="flex flex-wrap gap-6">
              <Link href="/research" className="link-line label-mono text-xs text-muted hover:text-research">
                RESEARCH →
              </Link>
              <Link href="/builds" className="link-line label-mono text-xs text-muted hover:text-signal">
                BUILDS →
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
