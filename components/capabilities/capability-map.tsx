"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Capability, CapabilityDomain } from "@/data/capabilities";
import { capabilityDomains } from "@/data/capabilities";

/**
 * Capability constellation (spec §11).
 *
 * Capabilities are laid out spatially and connected by real relationships — an
 * edge exists only where two capabilities share a project or a written research
 * entry, so the graph is a map of the work, not decoration. Selecting a node
 * reveals WHAT it is, the METHODS (technologies), the RELATED PROJECTS and the
 * EVIDENCE. Research sits at the centre because every other domain depends on it.
 */

/** Project ids that have a page under /builds. Everything else is external. */
const BUILD_ROUTES = new Set([
  "apex-quant-engine",
  "automated-trading-os",
  "market-data-replay",
  "qrsip",
]);

/** Project ids that live on an external host rather than on this site. */
const EXTERNAL_PROJECTS: Record<string, string> = {
  "billing-data-gateway":
    "https://github.com/CloudOps-Financial-Platform/billing-data-gateway",
};

/** Spatial layout in percentage coordinates — research at the centre. */
const NODE_POS: Record<string, { x: number; y: number }> = {
  "quant-research": { x: 49, y: 50 },
  "systematic-trading": { x: 23, y: 27 },
  backtesting: { x: 14, y: 58 },
  risk: { x: 30, y: 82 },
  "market-data": { x: 79, y: 29 },
  "data-infrastructure": { x: 87, y: 58 },
  "performance-engineering": { x: 66, y: 83 },
  "ai-intelligence": { x: 61, y: 13 },
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

interface Edge {
  a: string;
  b: string;
  weight: number;
}

/** Resolves a project id to a link, or null when there is nothing to open. */
function projectLink(id: string): ProjectLink | null {
  if (BUILD_ROUTES.has(id)) return { id, href: `/builds/${id}`, external: false };
  const external = EXTERNAL_PROJECTS[id];
  if (external) return { id, href: external, external: true };
  return null;
}

/** Number of concrete artifacts (projects + research entries) two capabilities share. */
function sharedWeight(a: Capability, b: Capability): number {
  const projects = new Set(b.projects);
  const research = new Set(b.research);
  let weight = 0;
  for (const p of a.projects) if (projects.has(p)) weight += 1;
  for (const r of a.research) if (research.has(r)) weight += 1;
  return weight;
}

export default function CapabilityMap({ capabilities, researchTitles }: CapabilityMapProps) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [selectedId, setSelectedId] = useState<string>(capabilities[0]?.id ?? "");

  const edges = useMemo<Edge[]>(() => {
    const out: Edge[] = [];
    for (let i = 0; i < capabilities.length; i += 1) {
      for (let j = i + 1; j < capabilities.length; j += 1) {
        const weight = sharedWeight(capabilities[i], capabilities[j]);
        if (weight > 0) out.push({ a: capabilities[i].id, b: capabilities[j].id, weight });
      }
    }
    return out;
  }, [capabilities]);

  const selected = capabilities.find((c) => c.id === selectedId) ?? capabilities[0];

  const connectedIds = useMemo(() => {
    const set = new Set<string>();
    if (!selected) return set;
    for (const e of edges) {
      if (e.a === selected.id) set.add(e.b);
      if (e.b === selected.id) set.add(e.a);
    }
    return set;
  }, [edges, selected]);

  const filters: Filter[] = ["ALL", ...capabilityDomains];
  const matches = (c: Capability) => filter === "ALL" || c.domain === filter;
  const visibleCount = capabilities.filter(matches).length;

  return (
    <div>
      {/* ---- domain filter ---- */}
      <div role="group" aria-label="Filter capabilities by domain" className="flex flex-wrap gap-2">
        {filters.map((domain) => {
          const isActive = domain === filter;
          return (
            <button
              key={domain}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(domain)}
              className={`label-mono border px-3 py-2 transition-colors ${isActive
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
        {String(visibleCount).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}{" "}
        CAPABILITIES — {filter} · SELECT A NODE TO INSPECT
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
        {/* ---- constellation ---- */}
        <div className="min-w-0">
          <div className="relative h-[420px] w-full border border-line bg-surface/40 sm:h-[500px] lg:h-[580px]">
            <div className="grid-field absolute inset-0 opacity-50" aria-hidden="true" />

            {/* edges */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {edges.map((e) => {
                const A = NODE_POS[e.a];
                const B = NODE_POS[e.b];
                if (!A || !B) return null;
                const active = selected ? e.a === selected.id || e.b === selected.id : false;
                return (
                  <line
                    key={`${e.a}-${e.b}`}
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    vectorEffect="non-scaling-stroke"
                    stroke={active ? "var(--signal)" : "var(--line-strong)"}
                    strokeWidth={active ? 1.5 : 1}
                    strokeOpacity={active ? 0.9 : 0.45}
                    strokeDasharray={active ? undefined : "2 3"}
                  />
                );
              })}
            </svg>

            {/* nodes */}
            {capabilities.map((c) => {
              const pos = NODE_POS[c.id] ?? { x: 50, y: 50 };
              const isSelected = selected?.id === c.id;
              const isConnected = connectedIds.has(c.id);
              const dim = !matches(c);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  aria-pressed={isSelected}
                  aria-label={`${c.name} — ${c.domain} capability`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:z-10"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <span className="flex flex-col items-center gap-2">
                    <span className="relative flex h-6 w-6 items-center justify-center">
                      {isSelected && (
                        <span
                          className="absolute h-6 w-6 rounded-full bg-signal/20 motion-safe:animate-pulse"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`relative h-3 w-3 rounded-full border-2 transition-colors duration-300 sm:h-3.5 sm:w-3.5 ${isSelected
                            ? "border-signal bg-signal"
                            : isConnected
                              ? "border-signal bg-background"
                              : "border-line-strong bg-background"
                          } ${dim ? "opacity-30" : "opacity-100"}`}
                      />
                    </span>
                    <span
                      className={`label-mono hidden max-w-[8.5rem] text-center text-[9px] leading-tight transition-colors sm:block ${isSelected
                          ? "text-signal"
                          : isConnected
                            ? "text-foreground"
                            : "text-muted"
                        } ${dim ? "opacity-40" : "opacity-100"}`}
                    >
                      {c.name}
                    </span>
                  </span>
                </button>
              );
            })}

            <p className="label-mono pointer-events-none absolute bottom-3 left-3 text-[9px] text-faint">
              EDGES = SHARED PROJECT OR RESEARCH ENTRY
            </p>
          </div>
        </div>

        {/* ---- detail panel ---- */}
        <div className="min-w-0">
          <div className="corner-ticks border border-line bg-surface p-6 md:p-8" aria-live="polite">
            {selected ? (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="display text-2xl md:text-3xl">{selected.name}</h3>
                  <span className="label-mono border border-research px-2 py-1 text-[10px] text-research">
                    {selected.domain}
                  </span>
                </div>

                <p className="label-mono mt-7 text-[10px] text-faint">WHAT</p>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                  {selected.description}
                </p>

                <p className="label-mono mt-7 text-[10px] text-faint">METHODS</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {selected.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="num-mono border border-line px-2.5 py-1 text-[10px] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <p className="label-mono mt-7 text-[10px] text-faint">RELATED PROJECTS</p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {selected.projects.map((id) => {
                    const link = projectLink(id);
                    if (!link) {
                      return (
                        <li key={id} className="label-mono text-[10px] text-faint">
                          {id}
                        </li>
                      );
                    }
                    return link.external ? (
                      <li key={id}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${id} — repository on GitHub`}
                          className="link-line label-mono text-[10px] text-signal"
                        >
                          {id} ↗
                        </a>
                      </li>
                    ) : (
                      <li key={id}>
                        <Link
                          href={link.href}
                          aria-label={`${id} — build`}
                          className="link-line label-mono text-[10px] text-foreground transition-colors hover:text-signal"
                        >
                          {id}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {selected.research.length > 0 && (
                  <>
                    <p className="label-mono mt-7 text-[10px] text-faint">RESEARCH</p>
                    <ul className="mt-3 space-y-2">
                      {selected.research.map((rid) => (
                        <li key={rid}>
                          <Link
                            href={`/research/${rid}`}
                            aria-label={`Research — ${researchTitles[rid] ?? rid}`}
                            className="link-line label-mono text-[10px] text-research"
                          >
                            {researchTitles[rid] ?? rid}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <p className="label-mono mt-7 text-[10px] text-faint">EVIDENCE</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{selected.evidence}</p>
              </>
            ) : (
              <p className="label-mono text-muted">SELECT A CAPABILITY NODE.</p>
            )}
          </div>

          <p className="label-mono mt-4 text-[10px] leading-relaxed text-faint">
            NO SKILL PERCENTAGES OR SENIORITY LEVELS — EVERY NODE MAPS TO A PROJECT OR A WRITTEN
            RESEARCH ENTRY YOU CAN OPEN.
          </p>
        </div>
      </div>
    </div>
  );
}
