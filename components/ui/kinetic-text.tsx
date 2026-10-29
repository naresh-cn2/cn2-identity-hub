"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";

/**
 * KineticText — a heading that assembles itself.
 *
 * Words rise out of a clipped mask, one after another, when the heading
 * enters the viewport — slow, deliberate, editorial. The server renders the
 * real text (selectable, crawlable, carried whole by aria-label); the
 * animation only moves each word from its hidden pose to its resting pose,
 * so the resting state is exactly the plain heading it always was.
 *
 * `accent` renders a second, signal-coloured line beneath the primary text
 * — the same two-line identity the site's display headings already use —
 * continuing the stagger where the primary words leave off.
 */
export default function KineticText({
  children,
  accent,
  className = "",
  stagger = 60,
  ariaLabel,
}: {
  children: ReactNode;
  accent?: ReactNode;
  className?: string;
  stagger?: number;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const primary = normalize(children);
  const secondary = accent === undefined ? "" : normalize(accent);
  const words = primary ? primary.split(" ") : [];
  const accentWords = secondary ? secondary.split(" ") : [];

  function normalize(node: ReactNode): string {
    if (typeof node !== "string") return "";
    return node.trim().replace(/\s+/g, " ");
  }

  const label = ariaLabel ?? (secondary ? `${primary} ${secondary}` : primary);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const renderWords = (list: string[], offset: number): ReactNode =>
    list.map((w, i) => (
      <Fragment key={`${offset + i}-${w}`}>
        {offset + i > 0 ? " " : null}
        <span className="kt-word" aria-hidden="true">
          <span
            className="kt-inner"
            style={{ animationDelay: `calc(var(--kt-stagger) * ${offset + i})` }}
          >
            {w}
          </span>
        </span>
      </Fragment>
    ));

  return (
    <h1
      ref={ref}
      className={`kinetic ${className}`}
      aria-label={label}
      style={{ "--kt-stagger": `${stagger}ms` } as React.CSSProperties}
    >
      {renderWords(words, 0)}
      {accentWords.length > 0 && (
        <>
          <br />
          <span className="text-signal">{renderWords(accentWords, words.length)}</span>
        </>
      )}
    </h1>
  );
}
