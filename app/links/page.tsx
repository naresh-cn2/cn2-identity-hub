import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Links",
  description:
    "BUKYA NARESH / QUANT.DEV — GitHub, LinkedIn, email, CV, builds, research and lab in one place.",
  alternates: { canonical: "/links" },
};

type RowKind = "external" | "mail" | "internal";

interface LinkRow {
  code: string;
  label: string;
  href: string;
  kind: RowKind;
  meta: string;
}

const ROWS: LinkRow[] = [
  { code: "01", label: "GITHUB", href: site.links.github, kind: "external", meta: "GITHUB.COM" },
  { code: "02", label: "LINKEDIN", href: site.links.linkedin, kind: "external", meta: "LINKEDIN.COM" },
  { code: "03", label: "EMAIL", href: site.links.email, kind: "mail", meta: "DIRECT" },
  { code: "04", label: "CV", href: "/cv", kind: "internal", meta: "PRINT-READY" },
  { code: "05", label: "BUILDS", href: "/builds", kind: "internal", meta: "ENGINEERING" },
  { code: "06", label: "RESEARCH", href: "/research", kind: "internal", meta: "EVIDENCE" },
  { code: "07", label: "LAB", href: "/lab", kind: "internal", meta: "INSTRUMENTS" },
];

const ROW_CLASS =
  "group flex min-w-0 items-center gap-4 border border-line bg-background px-5 py-5 transition-colors hover:border-signal hover:bg-surface-2 sm:gap-6 sm:px-7 sm:py-6";

export default function LinksPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-20 md:pt-40">
          <Reveal>
            <p className="label-mono text-muted">
              INDEX <span className="text-signal">/</span> 10 — LINKS
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(2.6rem,8vw,5.5rem)]">
              {site.name}
              <br />
              <span className="text-signal">{site.identity}</span>
            </h1>
            <p className="display-condensed mt-6 text-2xl text-muted md:text-3xl">
              {site.system} / {site.descriptor}
            </p>
            <p className="label-mono mt-4 text-faint">{site.subtitle}</p>
          </Reveal>
        </div>
      </header>

      <section aria-label="Primary links" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <div className="max-w-3xl">
            <Reveal delay={120}>
              <nav aria-label="All primary destinations">
                <ul className="grid gap-3">
                  {ROWS.map((row) => {
                    const body = (
                      <>
                        <span className="label-mono shrink-0 text-faint transition-colors group-hover:text-signal">
                          {row.code}
                        </span>
                        <span className="display min-w-0 flex-1 break-words text-xl sm:text-2xl">
                          {row.label}
                        </span>
                        <span className="label-mono hidden shrink-0 text-faint sm:block">
                          {row.meta}
                        </span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-muted transition-colors group-hover:text-signal"
                        >
                          {row.kind === "external" ? "↗" : "→"}
                        </span>
                      </>
                    );

                    if (row.kind === "internal") {
                      return (
                        <li key={row.code} className="min-w-0">
                          <Link href={row.href} className={ROW_CLASS}>
                            {body}
                          </Link>
                        </li>
                      );
                    }

                    if (row.kind === "mail") {
                      return (
                        <li key={row.code} className="min-w-0">
                          <a href={row.href} className={ROW_CLASS}>
                            {body}
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li key={row.code} className="min-w-0">
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={ROW_CLASS}
                        >
                          {body}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-10 border-t border-line pt-6">
                <p className="label-mono text-faint">EMAIL — COPYABLE</p>
                <p className="mt-2 select-all break-words text-sm text-muted">{site.email}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Status and home" className="border-b border-line">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-baseline justify-between gap-4 px-5 py-12 sm:px-8 md:py-16">
          <p className="label-mono text-faint">{site.status}</p>
          <Link href="/" className="link-line label-mono text-muted">
            {site.system} / HOME →
          </Link>
        </div>
      </section>
    </>
  );
}
