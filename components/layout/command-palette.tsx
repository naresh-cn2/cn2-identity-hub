"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { navRoutes, site, workRoute } from "@/data/site";
import { flagshipProjects } from "@/data/projects";
import { researchEntries } from "@/data/research";
import { useTheme } from "@/components/providers/theme-provider";

type Command = {
  id: string;
  label: string;
  group: "NAVIGATION" | "PROJECTS" | "RESEARCH" | "ACTIONS";
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
    keywords: `${r.label} ${r.href} navigation go`,
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
    id: "nav-links",
    label: "LINKS",
    group: "NAVIGATION",
    hint: "10",
    keywords: "links hub social contact email github linkedin",
    action: "route",
    target: "/links",
  },
  {
    id: "nav-cv",
    label: "CV",
    group: "NAVIGATION",
    hint: "09",
    keywords: "cv resume curriculum vitae download print career",
    action: "route",
    target: "/cv",
  },
  ...flagshipProjects.map((p) => ({
    id: `project-${p.id}`,
    label: p.shortTitle,
    group: "PROJECTS" as const,
    hint: p.category,
    keywords: `${p.shortTitle} ${p.title} ${p.category} project build`,
    action: "route" as const,
    target: p.route,
  })),
  ...researchEntries.map((e) => ({
    id: `research-${e.id}`,
    label: e.title,
    group: "RESEARCH" as const,
    hint: e.category,
    keywords: `${e.title} ${e.category} ${e.status} research entry`,
    action: "route" as const,
    target: `/research/${e.id}`,
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
  {
    id: "action-contact",
    label: "CONTACT",
    group: "ACTIONS",
    keywords: "contact email work with me hire",
    action: "external",
    target: site.links.email,
  },
];

const GROUP_ORDER: Command["group"][] = ["NAVIGATION", "PROJECTS", "RESEARCH", "ACTIONS"];

export default function CommandPalette() {
  const router = useRouter();
  const { toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.keywords.toLowerCase().includes(q));
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
      className={`fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh] transition-opacity duration-200 print:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      aria-hidden={!open}
    >
      <button
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
        onClick={close}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div
        className={`relative w-full max-w-xl border border-line bg-background shadow-2xl transition-all duration-200 ${
          open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="num-mono text-xs text-signal">›_</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, projects, actions…"
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
              NO MATCHES — TRY “QUANT”, “LAB”, “GITHUB”
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
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => run(cmd)}
                    className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors duration-100 ${
                      isActive ? "bg-signal-soft text-foreground" : "text-muted hover:text-foreground"
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
