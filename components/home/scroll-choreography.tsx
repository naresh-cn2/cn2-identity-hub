"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Homepage scroll choreography (spec §6).
 *
 * The homepage reads as a film in six acts. This client wrapper adds two things
 * without ever hiding content: a fixed ACT rail that tracks the visitor's
 * position through the narrative, and a subtle scroll-scrubbed parallax on a few
 * marked visuals. Everything is gated on prefers-reduced-motion, and the rail is
 * pointer-events-none so it can never block a link.
 */

const ACTS = [
    { id: "act-1", label: "THE HUMAN" },
    { id: "act-2", label: "THE FIELD" },
    { id: "act-3", label: "THE WORK" },
    { id: "act-4", label: "THE RESEARCH" },
    { id: "act-5", label: "THE PROOF" },
    { id: "act-6", label: "THE FUTURE" },
] as const;

export default function ScrollChoreography({ children }: { children: ReactNode }) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [shown, setShown] = useState(false);

    /* ---- act tracking + scroll progress (single rAF-throttled listener) ---- */
    useEffect(() => {
        let frame = 0;
        const measure = () => {
            frame = 0;
            const scrollY = window.scrollY;
            const doc = document.documentElement;
            const max = doc.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0);
            setShown(scrollY > window.innerHeight * 0.55);

            const mid = scrollY + window.innerHeight * 0.4;
            let index = 0;
            ACTS.forEach((act, i) => {
                const el = document.getElementById(act.id);
                if (!el) return;
                const top = el.getBoundingClientRect().top + scrollY;
                if (top <= mid) index = i;
            });
            setActive(index);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(measure);
        };
        measure();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    /* ---- subtle parallax on marked visuals (motion-safe only) ---- */
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
                const speed = Number.parseFloat(el.dataset.parallaxSpeed ?? "7");
                gsap.fromTo(
                    el,
                    { yPercent: speed },
                    {
                        yPercent: -speed,
                        ease: "none",
                        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.7 },
                    }
                );
            });
        }, root);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, []);

    return (
        <div ref={rootRef}>
            {children}

            {/* ---- ACT rail ---- */}
            <div
                aria-hidden="true"
                className={`pointer-events-none fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-6 transition-opacity duration-700 print:hidden xl:flex ${shown ? "opacity-100" : "opacity-0"
                    }`}
            >
                <span className="relative block h-36 w-px bg-line-strong">
                    <span
                        className="absolute left-0 top-0 w-px bg-signal"
                        style={{ height: `${Math.round(progress * 100)}%` }}
                    />
                </span>
                <ol className="flex flex-col items-end gap-4">
                    {ACTS.map((act, i) => {
                        const isActive = i === active;
                        return (
                            <li key={act.id} className="flex items-center gap-3">
                                <span
                                    className={`label-mono text-[9px] transition-all duration-500 ${isActive ? "text-signal opacity-100" : "text-faint opacity-0"
                                        }`}
                                >
                                    {act.label}
                                </span>
                                <span
                                    className={`block h-px transition-all duration-500 ${isActive ? "w-9 bg-signal" : "w-4 bg-line-strong"
                                        }`}
                                />
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}
