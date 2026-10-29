"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { navRoutes, site, workRoute } from "@/data/site";
import { archiveProjects } from "@/data/archive";
import { researchEntries } from "@/data/research";
import { caseStudies } from "@/data/case-studies";
import { publishedArticles } from "@/data/articles";
import { labModules } from "@/data/lab";
import { serviceOfferings } from "@/data/services";
import { credentials } from "@/data/credentials";
import { useTheme } from "@/components/providers/theme-provider";

type Command = {
  id: string;
  label: string;
  group:
    | "NAVIGATION"
    | "PROJECTS"
    | "RESEARCH"
    | "CASE STUDIES"
    | "ARTICLES"
    | "SERVICES"
    | "LAB"
    | "CREDENTIALS"
    | "ACTIONS";
  hint?: string;
  keywords: string;
  action: "route" | "external" | "theme";
  target: string;
};

const commands: Command[] = [
  ...navRoutes.map((r) => ({
    id: `nav-${r.href}`,
    label: r.label,
    group: "NAVIGATION" as const,
    hint: r.code,
    keywords: `${r.label} ${r.href} navigation go ${r.label === "WORK" ? "projects builds engineering portfolio" : ""} ${r.label === "SERVICES" ? "freelance hire contract offerings" : ""} ${r.label === "CREDENTIALS" ? "certificates cs50 harvard education verified" : ""} ${r.label === "CAPABILITIES" ? "skills tech stack tools tooling" : ""} ${r.label === "CV" ? "resume curriculum vitae experience" : ""}`,
    action: "route" as const,
    target: r.href,
  })),
  {
    id: "nav-work",
    label: workRoute.label,
    group: "NAVIGATION",
    hint: workRoute.code,
    keywords: "work with me hire freelance contract collaboration open to",
    action: "route",
    target: workRoute.href,
  },
  {
    id: "nav-works-main",
    label: "WORKS DIRECTORY",
    group: "NAVIGATION",
    hint: "WORKS",
    keywords: "works directory portfolio products projects personal builds systems",
    action: "route",
    target: "/works",
  },
  {
    id: "nav-works-products",
    label: "PRODUCTS & PLATFORMS",
    group: "NAVIGATION",
    hint: "TIER 01",
    keywords: "products platforms commercial strata-engine billing costintel",
    action: "route",
    target: "/works/products",
  },
  {
    id: "nav-works-projects",
    label: "PROJECTS (ENGINEERING & QUANT)",
    group: "NAVIGATION",
    hint: "TIER 02",
    keywords: "projects engineering quantitative apex trading os market data forex crypto",
    action: "route",
    target: "/works/projects",
  },
  {
    id: "nav-works-personal",
    label: "PERSONAL BUILDS",
    group: "NAVIGATION",
    hint: "TIER 03",
    keywords: "personal builds independent ai assistants agents prototypes qrsip kernel sentiment",
    action: "route",
    target: "/works/personal-builds",
  },
  ...archiveProjects.map((p) => ({
    id: `project-${p.id}`,
    label: p.shortTitle,
    group: "PROJECTS" as const,
    hint: p.categoryLabel,
    keywords: `${p.shortTitle} ${p.title} ${p.categoryLabel} ${p.tags.join(" ")} ${p.thesis} ${p.summary} project build work`,
    action: "route" as const,
    target: `/works/${p.id}`,
  })),
  ...researchEntries.map((e) => ({
    id: `research-${e.id}`,
    label: e.title,
    group: "RESEARCH" as const,
    hint: e.category,
    keywords: `${e.title} ${e.category} ${e.status} ${e.question} ${e.hypothesis} research entry`,
    action: "route" as const,
    target: `/research/${e.id}`,
  })),
  ...caseStudies.map((c) => ({
    id: `case-${c.id}`,
    label: c.shortTitle,
    group: "CASE STUDIES" as const,
    hint: c.category,
    keywords: `${c.title} ${c.shortTitle} ${c.category} ${c.thesis} case study`,
    action: "route" as const,
    target: `/case-studies/${c.id}`,
  })),
  ...publishedArticles.map((a) => ({
    id: `article-${a.id}`,
    label: a.title,
    group: "ARTICLES" as const,
    hint: a.readingTime,
    keywords: `${a.title} ${a.category} article note write-up`,
    action: "route" as const,
    target: `/articles/${a.id}`,
  })),
  ...serviceOfferings.map((s) => ({
    id: `service-${s.slug}`,
    label: s.slug.toUpperCase().replace(/-/g, " "),
    group: "SERVICES" as const,
    hint: s.category.toUpperCase(),
    keywords: `${s.slug.replace(/-/g, " ")} ${s.promise} ${s.problems.join(" ")} service engage hire`,
    action: "route" as const,
    target: `/services/${s.slug}`,
  })),
  ...labModules.map((m) => ({
    id: `lab-${m.id}`,
    label: m.name,
    group: "LAB" as const,
    hint: m.code,
    keywords: `${m.name} ${m.description} lab tool instrument`,
    action: "route" as const,
    target: m.href,
  })),
  ...credentials.map((c) => ({
    id: `credential-${c.id}`,
    label: c.program,
    group: "CREDENTIALS" as const,
    hint: c.provider,
    keywords: `${c.program} ${c.provider} ${c.state} ${c.credentialId || ""} CS50 CS50x Harvard certificate computer science credential study verified`,
    action: "route" as const,
    target: `/credentials#${c.id}`,
  })),
  {
    id: "action-theme",
    label: "TOGGLE THEME",
    group: "ACTIONS",
    hint: "UI",
    keywords: "toggle theme dark light mode appearance",
    action: "theme",
    target: "",
  },
  {
    id: "action-github",
    label: "OPEN GITHUB",
    group: "ACTIONS",
    keywords: "github open profile code repositories",
    action: "external",
    target: site.links.github,
  },
  {
    id: "action-linkedin",
    label: "OPEN LINKEDIN",
    group: "ACTIONS",
    keywords: "linkedin open profile professional network",
    action: "external",
    target: site.links.linkedin,
  },
];

const GROUP_ORDER: Command["group"][] = [
  "NAVIGATION",
  "PROJECTS",
  "RESEARCH",
  "CASE STUDIES",
  "ARTICLES",
  "SERVICES",
  "LAB",
  "CREDENTIALS",
  "ACTIONS",
];

export default function CommandPalette() {
  const router = useRouter();
  const { toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  /** The control that opened the palette — focus returns to it on close. */
  const openerRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const tokens = q.split(/\s+/).filter(Boolean);
    return commands.filter((c) => {
      const haystack = `${c.label} ${c.hint || ""} ${c.keywords}`.toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    });
  }, [query]);

  const grouped = useMemo(() => {
    return GROUP_ORDER.map((group) => ({
      group,
      items: filtered.filter((c) => c.group === group),
    })).filter((g) => g.items.length > 0);
  }, [filtered]);

  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const run = useCallback(
    (cmd: Command) => {
      if (cmd.action === "route") {
        router.push(cmd.target);
        close();
      } else if (cmd.action === "theme") {
        toggle();
        close();
      } else {
        window.open(cmd.target, "_blank", "noopener,noreferrer");
        close();
      }
    },
    [router, close, toggle]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      openerRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      // reset state + focus on the next frame (sync setState in effects is disallowed)
      const raf = requestAnimationFrame(() => {
        setQuery("");
        setActive(0);
        inputRef.current?.focus();
      });
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [open]);

  // Focus returns to the opener once the palette closes.
  useEffect(() => {
    if (open || !openerRef.current) return;
    const el = openerRef.current;
    openerRef.current = null;
    el.focus();
  }, [open]);

  // Modal focus trap: Tab and Shift+Tab cycle inside the open palette only.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = rootRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([tabindex="-1"]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;
      const inside = current instanceof HTMLElement && root.contains(current);
      if (e.shiftKey) {
        if (!inside || current === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (!inside || current === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = flat[active];
        if (cmd) run(cmd);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat, active, run]);

  // reset selection when the query changes (deferred — sync setState in effects is disallowed)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setActive(0));
    return () => cancelAnimationFrame(raf);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh] transition-opacity duration-200 print:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      data-open={open}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      aria-hidden={!open}
      inert={!open}
    >
      <button
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
        onClick={close}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div
        className={`scanlines relative w-full max-w-xl border border-line bg-background shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-3 scale-[0.96] opacity-0"
          }`}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="num-mono text-xs text-signal">›_</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, research, articles, services…"
            className="label-mono w-full bg-transparent text-sm text-foreground outline-none placeholder:text-faint"
            aria-label="Search commands"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="label-mono border border-line px-2 py-0.5 text-[10px] text-faint">ESC</kbd>
        </div>

        <div ref={listRef} role="listbox" aria-label="Commands" className="max-h-[46vh] overflow-y-auto py-2">
          {flat.length === 0 && (
            <p className="label-mono px-4 py-6 text-center text-xs text-faint">
              NO MATCHES — TRY “PROOF”, “INTELLIGENCE”, “GITHUB”
            </p>
          )}
          {grouped.map(({ group, items }) => (
            <div key={group} className="mb-1">
              <p className="label-mono px-4 py-1.5 text-[10px] tracking-[0.2em] text-faint">{group}</p>
              {items.map((cmd) => {
                const idx = flat.indexOf(cmd);
                const isActive = idx === active;
                return (
                  <button
                    key={cmd.id}
                    role="option"
                    aria-selected={isActive}
                    data-active={isActive}
                    style={{ "--pr-i": idx } as React.CSSProperties}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => run(cmd)}
                    className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors duration-100 ${isActive ? "bg-signal-soft text-foreground" : "text-muted hover:text-foreground"
                      }`}
                  >
                    <span className="label-mono text-xs">{cmd.label}</span>
                    <span className="num-mono text-[10px] text-faint">{cmd.hint}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-line px-4 py-2">
          <p className="num-mono text-[10px] text-faint">↑↓ NAVIGATE · ↵ SELECT</p>
          <button
            onClick={() => {
              toggle();
              close();
            }}
            className="label-mono text-[10px] text-muted transition-colors hover:text-signal"
          >
            TOGGLE THEME
          </button>
        </div>
      </div>
    </div>
  );
}
