export interface PersonalBuildCardProps {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: string;
  evidenceLabel: string;
  repoUrl: string;
  caseStudyUrl?: string;
}

export default function PersonalBuildCard({
  name,
  tagline,
  description,
  tech,
  status,
  evidenceLabel,
  repoUrl,
  caseStudyUrl,
}: PersonalBuildCardProps) {
  return (
    <article className="relative group border border-line bg-surface/30 rounded-xl p-6 md:p-8 transition-colors hover:border-cyan-500/50 hover:bg-surface/50">
      <header className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <span className="label-mono text-xs text-cyan-500 dark:text-cyan-400">PERSONAL BUILD</span>
          <h3 className="mt-1 display-condensed text-2xl md:text-3xl text-foreground">{name}</h3>
          <p className="mt-2 text-lg text-muted">{tagline}</p>
        </div>
        <span className="label-mono text-xs text-faint whitespace-nowrap">{status}</span>
      </header>
      <p className="text-base leading-relaxed text-muted mb-6">{description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tech.map((t) => (
          <span key={t} className="px-3 py-1 text-xs label-mono border border-line bg-background rounded">
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line">
        <span className="label-mono text-xs text-faint">{evidenceLabel}</span>
        <div className="flex items-center gap-3">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="corner-ticks group inline-flex items-center gap-2 text-sm label-mono text-cyan-500 dark:text-cyan-400 transition-colors hover:text-white"
          >
            <span>VIEW REPOSITORY</span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          {caseStudyUrl && (
            <a
              href={caseStudyUrl}
              className="corner-ticks group inline-flex items-center gap-2 text-sm label-mono text-research transition-colors hover:text-white"
            >
              <span>READ CASE STUDY</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}