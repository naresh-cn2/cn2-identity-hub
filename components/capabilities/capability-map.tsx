"use client";

import { useState } from "react";
import Link from "next/link";
import type { Capability, CapabilityDomain } from "@/data/capabilities";
import { capabilityDomains } from "@/data/capabilities";

/** Project ids that have a page under /builds. Everything else external. */
const BUILD_ROUTES = new Set(["apex-quant-engine", "automated-trading-os", "market-data-replay", "qrsip"]);

/** Project ids that live on an external host rather than on this site. */
const EXTERNAL_PROJECTS: Record<string, string> = {
  "billing-data-gateway": "https://github.com/CloudOps-Financial-Platform/billing-data-gateway",
};

type Filter = CapabilityDomain | "ALL";

interface CapabilityMapProps {
  capabilities: Capability[];
  researchTitles: Record<string, string>;
}

interface ProjectLink {
  id: string;
  href: string;
  external: boolean;
}

/** Resolves a project id to a link, or null when there is nothing to open. */
function projectLink(id: string): ProjectLink | null {
  if (BUILD_ROUTES.has(id)) return { id, href: `/builds/${id}`, external: false };
  const external = EXTERNAL_PROJECTS[id];
  if (external) return { id, href: external, external: true };
  return null;
}

export default function CapabilityMap({ capabilities, researchTitles }: CapabilityMapProps) {
  const [filter, setFilter] = useState<Filter>("ALL");

  const filters: Filter[] = ["ALL", ...capabilityDomains];
  const visible =
    filter === "ALL" ? capabilities : capabilities.filter((cap) => cap.domain === filter);

  return (
    <div>
      {/* ---- domain filter ---- */}
      <div
        role="group"
        aria-label="Filter capabilities by domain"
        className="flex flex-wrap gap-2"
      >
        {filters.map((domain) => {
          const isActive = domain === filter;
          return (
            <button
              key={domain}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(domain)}
              className={`label-mono border px-3 py-2 transition-colors ${
                isActive
                  ? "border-transparent bg-signal text-background"
                  : "border-line text-muted hover:border-line-strong hover:text-foreground"
              }`}
            >
              {domain}
            </button>
          );
        })}
      </div>

      <p className="label-mono mt-5 text-[10px] text-faint" aria-live="polite">
        {String(visible.length).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}{" "}
        CAPABILITIES — {filter}
      </p>

      {/* ---- capability cards ---- */}
      {visible.length === 0 ? (
        <p className="label-mono mt-8 text-muted">NO CAPABILITIES IN THIS DOMAIN.</p>
      ) : (
        <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((cap) => {
            const projects = cap.projects
              .map((id) => ({ id, link: projectLink(id) }))
              .filter((entry): entry is { id: string; link: ProjectLink } => entry.link !== null);
            const anchor = projects.find((entry) => !entry.link.external)?.id;

            return (
              <article
                key={cap.id}
                id={anchor}
                className="corner-ticks flex h-full scroll-mt-28 flex-col bg-background p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h3 className="display text-xl">{cap.name}</h3>
                  <p className="label-mono border border-research px-2 py-1 text-[10px] text-research">
                    {cap.domain}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">{cap.description}</p>

                <p className="label-mono mt-6 text-[10px] text-faint">TECHNOLOGIES</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cap.technologies.map((tech) => (
                    <li key={tech} className="num-mono border border-line px-2.5 py-1 text-[10px] text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  {anchor ? (
                    <Link
                      href={`#${anchor}`}
                      aria-label={`Evidence for ${cap.name}`}
                      className="link-line label-mono inline-block w-fit text-xs text-signal"
                    >
                      EVIDENCE →
                    </Link>
                  ) : (
                    <p className="label-mono text-xs text-faint">EVIDENCE — EXTERNAL REPOSITORY</p>
                  )}
                  <p className="mt-4 text-xs leading-relaxed text-muted">{cap.evidence}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-line pt-4">
                  {projects.map(({ id, link }) =>
                    link.external ? (
                      <a
                        key={id}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${id} — repository on GitHub`}
                        className="link-line label-mono min-w-0 text-[10px] text-signal"
                      >
                        {id} ↗
                      </a>
                    ) : (
                      <Link
                        key={id}
                        href={link.href}
                        aria-label={`${id} — build`}
                        className="link-line label-mono min-w-0 text-[10px] text-foreground transition-colors hover:text-signal"
                      >
                        {id}
                      </Link>
                    )
                  )}
                  {cap.research.map((rid) => (
                    <Link
                      key={rid}
                      href={`/research/${rid}`}
                      aria-label={`Research — ${researchTitles[rid] ?? rid}`}
                      className="link-line label-mono min-w-0 text-[10px] text-research"
                    >
                      {researchTitles[rid] ?? rid}
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
