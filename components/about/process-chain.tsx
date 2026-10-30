"use client";

import { useEffect, useRef, useState } from "react";
import type { Stage } from "@/data/about";

/* A staged process rail that advances as the visitor scrolls through the
   section — and can be driven directly by selecting any stage. Horizontal
   on desktop, vertical on mobile. Used for the systems-thinking chain
   (PROBLEM → … → VERIFY) and the AI-philosophy chain (HUMAN INTENT → …). */

interface Props {
  stages: Stage[];
  accent?: "signal" | "research";
}

export default function ProcessChain({ stages, accent = "signal" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // progress of the section through the viewport → active stage
      const p = (window.innerHeight * 0.72 - r.top) / Math.max(1, r.height);
      const idx = Math.max(0, Math.min(stages.length - 1, Math.floor(p * stages.length)));
      setSel(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stages.length]);

  const stage = stages[sel];
  const accentText = accent === "signal" ? "text-signal" : "text-research";
  const accentBg = accent === "signal" ? "bg-signal" : "bg-research";
  const accentBorder = accent === "signal" ? "border-signal" : "border-research";

  return (
    <div ref={ref}>
      {/* desktop rail */}
      <div className="relative hidden md:block">
        <div className="absolute left-0 right-0 top-[1.05rem] h-px bg-line" aria-hidden="true" />
        <div
          className={`absolute left-0 top-[1.05rem] h-px ${accentBg} transition-all duration-500`}
          style={{ width: `${(sel / (stages.length - 1)) * 100}%` }}
          aria-hidden="true"
        />
        <ol className="relative flex justify-between px-4">
          {stages.map((s, i) => (
            <li key={s.id} className="flex flex-col items-center" style={{ width: 0 }}>
              <button
                type="button"
                aria-pressed={i === sel}
                onClick={() => setSel(i)}
                className="group flex flex-col items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              >
                <span
                  className={`label-mono flex h-9 w-9 items-center justify-center rounded-full border text-[9px] transition-colors duration-300 ${
                    i <= sel
                      ? `${accentBorder} ${i === sel ? `${accentBg} text-white` : "bg-surface text-foreground"}`
                      : "border-line bg-surface text-faint group-hover:border-line-strong group-hover:text-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`label-mono max-w-[5.5rem] text-center text-[9px] leading-tight transition-colors duration-300 ${
                    i === sel ? "text-foreground" : "text-faint group-hover:text-muted"
                  }`}
                >
                  {s.name}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* mobile rail */}
      <ol className="relative grid gap-3 md:hidden">
        <div className="absolute bottom-2 left-[0.9rem] top-2 w-px bg-line" aria-hidden="true" />
        {stages.map((s, i) => (
          <li key={s.id} className="relative">
            <button
              type="button"
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
              className={`label-mono flex w-full items-center gap-4 border px-4 py-3 text-left text-[10px] transition-colors ${
                i === sel
                  ? `${accentBorder} bg-surface text-foreground`
                  : "border-line bg-surface text-faint"
              }`}
            >
              <span className={`num-mono text-[10px] ${i <= sel ? accentText : "text-faint"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.name}
            </button>
          </li>
        ))}
      </ol>

      {/* active stage explanation */}
      <div aria-live="polite" className={`mt-10 border-l-2 ${accentBorder} pl-5`}>
        <p className="label-mono text-[10px] text-faint">
          <span className={accentText}>{String(sel + 1).padStart(2, "0")}</span> — {stage.name}
        </p>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
          {stage.desc}
        </p>
      </div>
    </div>
  );
}
