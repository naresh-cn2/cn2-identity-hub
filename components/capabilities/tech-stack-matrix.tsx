"use client";

import { useMemo, useState } from "react";
import { techCategories, techStack, type TechCategory, type TechStackItem } from "@/data/capabilities";

const ACCENT_STYLES: Record<TechStackItem["accent"], { border: string; glow: string; text: string; bg: string }> = {
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-400",
    glow: "group-hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    text: "text-cyan-400",
    bg: "bg-cyan-950/20",
  },
  blue: {
    border: "border-blue-500/30 hover:border-blue-400",
    glow: "group-hover:shadow-[0_0_12px_rgba(59,130,246,0.25)]",
    text: "text-blue-400",
    bg: "bg-blue-950/20",
  },
  red: {
    border: "border-red-500/30 hover:border-red-400",
    glow: "group-hover:shadow-[0_0_12px_rgba(239,68,68,0.25)]",
    text: "text-red-400",
    bg: "bg-red-950/20",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-400",
    glow: "group-hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    text: "text-emerald-400",
    bg: "bg-emerald-950/20",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-400",
    glow: "group-hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]",
    text: "text-amber-400",
    bg: "bg-amber-950/20",
  },
  violet: {
    border: "border-purple-500/30 hover:border-purple-400",
    glow: "group-hover:shadow-[0_0_12px_rgba(168,85,247,0.25)]",
    text: "text-purple-400",
    bg: "bg-purple-950/20",
  },
  slate: {
    border: "border-zinc-500/30 hover:border-zinc-300",
    glow: "group-hover:shadow-[0_0_12px_rgba(161,161,170,0.2)]",
    text: "text-zinc-300",
    bg: "bg-zinc-900/40",
  },
};

export default function TechStackMatrix() {
  const [activeCategory, setActiveCategory] = useState<TechCategory | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<TechStackItem | null>(null);

  const filtered = useMemo(() => {
    return techStack.filter((item) => {
      const matchCat = activeCategory === "ALL" || item.category === activeCategory;
      const matchSearch =
        !search.trim() ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.provenance?.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="space-y-8">
      {/* Controls: Filter Pills & Search */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tech stack categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "ALL"}
            onClick={() => setActiveCategory("ALL")}
            className={`label-mono px-3.5 py-1.5 text-xs transition-colors ${
              activeCategory === "ALL"
                ? "border border-signal bg-signal/15 text-signal"
                : "border border-line bg-surface/40 text-muted hover:border-line-strong hover:text-foreground"
            }`}
          >
            ALL ({techStack.length})
          </button>
          {techCategories.map((cat) => {
            const count = techStack.filter((t) => t.category === cat).length;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat)}
                className={`label-mono px-3.5 py-1.5 text-xs transition-colors ${
                  active
                    ? "border border-signal bg-signal/15 text-signal"
                    : "border border-line bg-surface/40 text-muted hover:border-line-strong hover:text-foreground"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Live Filter Input */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search technologies, tools, libraries..."
            className="w-full border border-line bg-surface/50 px-3.5 py-1.5 font-mono text-xs text-foreground placeholder:text-faint focus:border-signal focus:outline-none"
            aria-label="Filter technologies"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-faint hover:text-foreground"
              aria-label="Clear filter"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Badges Flow Grid */}
      <div className="flex flex-wrap gap-2.5 pt-2">
        {filtered.map((item) => {
          const style = ACCENT_STYLES[item.accent];
          const isSelected = selectedItem?.name === item.name;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelectedItem(isSelected ? null : item)}
              className={`group relative inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
                isSelected ? "border-signal bg-signal/20 shadow-[0_0_15px_rgba(233,64,48,0.3)]" : `${style.border} ${style.bg} ${style.glow}`
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: item.badgeBg }}
                aria-hidden="true"
              />
              <span className="font-semibold text-foreground tracking-wide">{item.name}</span>
              {item.highlight && (
                <span className="ml-1 text-[9px] uppercase tracking-wider text-signal font-medium opacity-80">
                  ★
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Item Inspector Bar */}
      {selectedItem && (
        <div className="border border-line-strong bg-surface/60 p-5 backdrop-blur-sm transition-all duration-300">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: selectedItem.badgeBg }}
                aria-hidden="true"
              />
              <h4 className="display text-xl">{selectedItem.name}</h4>
              <span className="label-mono border border-line px-2 py-0.5 text-[10px] text-muted">
                {selectedItem.category}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="label-mono text-xs text-faint hover:text-foreground"
            >
              CLOSE [ESC]
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {selectedItem.provenance || "Applied across software architectures, experimental workflows, and production systems."}
          </p>
        </div>
      )}

      {/* Counter summary */}
      <div className="flex flex-wrap items-center justify-between border-t border-line pt-4 text-[10px] label-mono text-faint">
        <p>
          SHOWING {filtered.length} OF {techStack.length} TOOLS & PLATFORMS
        </p>
        <p>CATEGORIZED FROM PRODUCTION CODEBASES & VERIFIED ACCREDITATIONS</p>
      </div>
    </div>
  );
}

