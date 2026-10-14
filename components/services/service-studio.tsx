"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { serviceBundles, type ServiceBundle } from "@/data/services";
import { ServiceSchematic } from "./service-schematics";

/**
 * /services selector — a proper tablist driving one detail panel.
 *
 * Each tab is a real <button> with aria-selected and roving tabindex; arrow
 * keys (and Home/End) move selection, focus follows selection. The panel
 * reveals the selected service's problem shape, deliverables, process, the
 * category schematic, and the builds and research that evidence it — all
 * resolved from data/services.ts, nothing invented here. Selection changes
 * cross-fade through CSS transforms; the global reduced-motion rule collapses
 * the transition and the JS fade is skipped entirely under reduce.
 */

const PANEL_ID = "service-panel";
const tabId = (slug: string) => `service-tab-${slug}`;

const NAV_KEYS = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function BulletList({ items, dotClass }: { items: string[]; dotClass: string }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
          <span className={`mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ServiceDetail({ bundle }: { bundle: ServiceBundle }) {
  const { service, capability, category, projects, research } = bundle;
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="label-mono text-muted">
          OFFERING <span className="text-signal">/</span>{" "}
          {service.slug.toUpperCase().replace(/-/g, " ")}
        </p>
        <p className="label-mono flex items-center gap-2 text-foreground">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          {projects.length > 0 ? "EVIDENCED" : "CONCEPTUAL"}
        </p>
      </div>

      <h3 className="display mt-4 text-3xl md:text-5xl">{capability.name}</h3>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{service.promise}</p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        <span className="label-mono text-signal">WHO THIS IS FOR — </span>
        {service.audience}
      </p>

      <div className="mt-8 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
        {/* schematic + methods */}
        <div className="bg-background p-5 md:p-6">
          <p className="label-mono text-faint">SCHEMATIC · {category.label}</p>
          <div className="viz-frame mt-4 max-w-[520px] p-3">
            <ServiceSchematic schematic={category.schematic} illustrative={category.illustrative} />
          </div>
          <p className="label-mono mt-5 text-faint">METHODS</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {capability.technologies.join(" · ")}
          </p>
        </div>

        <div className="bg-background p-5 md:p-6">
          <p className="label-mono text-signal">THE PROBLEM IT ADDRESSES</p>
          <BulletList items={service.problems} dotClass="bg-line-strong" />
        </div>

        <div className="bg-background p-5 md:p-6">
          <p className="label-mono text-research">WHAT YOU RECEIVE</p>
          <BulletList items={service.deliverables} dotClass="bg-research" />
        </div>

        <div className="bg-background p-5 md:p-6">
          <p className="label-mono text-faint">OUT OF SCOPE</p>
          <BulletList items={service.outOfScope} dotClass="bg-line-strong" />
          <p className="label-mono mt-5 text-faint">EVIDENCE</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{capability.evidence}</p>
        </div>
      </div>

      {/* process — the stages this engagement runs through */}
      <div className="mt-10">
        <p className="label-mono text-faint">PROCESS</p>
        <ol className="mt-4 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((stage, i) => (
            <li key={stage} className="flex h-full items-start gap-4 bg-background p-4">
              <span className="num-mono text-xs text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="label-mono text-foreground">{stage}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* what already evidences this capability */}
      {(projects.length > 0 || research.length > 0) && (
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects.length > 0 && (
            <div>
              <p className="label-mono text-faint">RELEVANT WORK</p>
              <div className="mt-4 space-y-px bg-line">
                {projects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/work/${p.id}`}
                    className="card-depth group flex h-full flex-col justify-between border border-line bg-background p-4"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="label-mono text-faint">BUILD / {p.index}</span>
                      <span className="label-mono text-foreground">{p.status}</span>
                    </span>
                    <span className="display mt-3 block text-lg md:text-xl">{p.title}</span>
                    <span className="label-mono mt-3 block text-[10px] text-faint">
                      {p.evidenceLabel}
                    </span>
                    <span className="label-mono mt-4 block text-signal transition-transform duration-300 group-hover:translate-x-1">
                      OPEN PROJECT →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {research.length > 0 && (
            <div>
              <p className="label-mono text-research">RELATED RESEARCH</p>
              <div className="mt-4 space-y-px bg-line">
                {research.map((r) => (
                  <Link
                    key={r.id}
                    href={`/research/${r.id}`}
                    className="card-depth group flex h-full flex-col justify-between border border-line bg-background p-4"
                  >
                    <span className="label-mono text-faint">{r.category}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-foreground">
                      {r.title}
                    </span>
                    <span className="label-mono mt-4 block text-research transition-transform duration-300 group-hover:translate-x-1">
                      {r.status} →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* enquiry + full engagement detail */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="card-depth label-mono border border-line-strong bg-surface px-6 py-4 text-foreground transition-colors hover:border-signal hover:text-signal"
        >
          ENQUIRE ABOUT THIS SERVICE →
        </Link>
        <Link
          href={`/services/${service.slug}`}
          className="card-depth label-mono border border-line px-6 py-4 text-muted transition-colors hover:border-line-strong hover:text-foreground"
        >
          FULL ENGAGEMENT DETAIL →
        </Link>
      </div>
    </div>
  );
}

export default function ServiceStudio() {
  const [activeSlug, setActiveSlug] = useState(serviceBundles[0].service.slug);
  const [shownSlug, setShownSlug] = useState(serviceBundles[0].service.slug);
  const [fading, setFading] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    []
  );

  const select = useCallback(
    (slug: string) => {
      if (slug === activeSlug) return;
      setActiveSlug(slug);
      if (prefersReducedMotion()) {
        setShownSlug(slug);
        setFading(false);
        return;
      }
      setFading(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setShownSlug(slug);
        setFading(false);
      }, 160);
    },
    [activeSlug]
  );

  const onListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!NAV_KEYS.includes(event.key)) return;
    event.preventDefault();
    const count = serviceBundles.length;
    const index = serviceBundles.findIndex((b) => b.service.slug === activeSlug);
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % count;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    const slug = serviceBundles[next].service.slug;
    select(slug);
    document.getElementById(tabId(slug))?.focus();
  };

  const shown = serviceBundles.find((b) => b.service.slug === shownSlug) ?? serviceBundles[0];

  return (
    <div>
      <div className="grid gap-px bg-line lg:grid-cols-[minmax(260px,340px)_1fr] lg:gap-8 lg:bg-transparent">
        <div
          role="tablist"
          aria-label="Services"
          aria-orientation="vertical"
          onKeyDown={onListKeyDown}
          className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-1"
        >
          {serviceBundles.map((bundle, i) => {
            const isActive = bundle.service.slug === activeSlug;
            return (
              <button
                key={bundle.service.slug}
                type="button"
                role="tab"
                id={tabId(bundle.service.slug)}
                aria-selected={isActive}
                aria-controls={PANEL_ID}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(bundle.service.slug)}
                className={`group flex h-full flex-col items-start border-l-2 p-4 text-left transition-colors duration-200 ${
                  isActive
                    ? "border-signal bg-surface"
                    : "border-transparent bg-background hover:bg-surface"
                }`}
              >
                <span className="flex w-full items-baseline justify-between gap-2">
                  <span className="num-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="label-mono text-[10px] text-faint">
                    {bundle.projects.length > 0 ? "EVIDENCED" : "CONCEPTUAL"}
                  </span>
                </span>
                <span
                  className={`display mt-3 block text-base leading-tight md:text-lg ${
                    isActive ? "text-foreground" : "text-muted group-hover:text-foreground"
                  }`}
                >
                  {bundle.capability.name}
                </span>
                {bundle.category.label !== bundle.capability.name && (
                  <span className="label-mono mt-2 block text-[10px] text-faint">
                    {bundle.category.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={tabId(activeSlug)}
          className={`card-depth border border-line bg-background p-5 transition-[opacity,transform] ease-out md:p-8 ${
            fading ? "translate-y-1 opacity-0 duration-150" : "translate-y-0 opacity-100 duration-300"
          }`}
        >
          <ServiceDetail bundle={shown} />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.capability.name} selected.
      </p>
    </div>
  );
}
