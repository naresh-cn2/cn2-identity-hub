"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEnvironment } from "@/lib/use-environment";
import { useTheme } from "@/components/providers/theme-provider";
import CinematicHumanFigure from "@/components/viz/cinematic-human-figure";

/**
 * HeroScene — the cinematic hero environment (spec §3, §5, §6, §18).
 *
 * Owns everything interactive about the hero so the content itself can stay a
 * server component: the WebGL quant field (dynamically imported, ssr:false, so
 * it never runs during prerender and never blocks first paint), the static
 * fallback for reduced-motion / no-WebGL / compact viewports, the anonymous
 * figure composited into the field, and the GSAP ScrollTrigger choreography
 * that flies the camera from ACT I (the human) toward ACT II (the field).
 *
 * The hero is deliberately NOT pinned and NOT given an extra-tall scroll track:
 * that keeps its height stable across the capability check (no layout shift) and
 * keeps scrolling fast, while the camera still travels a full act as the hero
 * leaves the viewport.
 */

const QuantField = dynamic(() => import("./quant-field"), { ssr: false, loading: () => null });

export default function HeroScene({ children }: { children: ReactNode }) {
    const { theme } = useTheme();
    const env = useEnvironment();
    const rootRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef(0);
    const pointerRef = useRef({ x: 0, y: 0 });
    const [frameloop, setFrameloop] = useState<"always" | "never">("always");
    const [sceneReady, setSceneReady] = useState(false);

    /* ---- scroll + overlay choreography (GSAP), scoped and reverted ---- */
    useEffect(() => {
        const root = rootRef.current;
        if (!root || env.reducedMotion) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
                onUpdate: (self) => {
                    scrollRef.current = self.progress;
                },
            });
            gsap.to("[data-hero-title]", {
                yPercent: -12,
                opacity: 0,
                ease: "none",
                scrollTrigger: { trigger: root, start: "top top", end: "70% top", scrub: 0.6 },
            });
            gsap.to("[data-hero-figure]", {
                yPercent: 8,
                scale: 1.05,
                ease: "none",
                scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 },
            });
        }, root);
        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, [env.reducedMotion]);

    /* ---- subtle cursor influence on the field ---- */
    useEffect(() => {
        if (!env.capable) return;
        const onMove = (e: PointerEvent) => {
            pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [env.capable]);

    /* ---- pause the render loop when offscreen or tab hidden (spec §18) ---- */
    useEffect(() => {
        if (!env.capable) return;
        const root = rootRef.current;
        if (!root || typeof IntersectionObserver === "undefined") return;
        let inView = true;
        const apply = () => setFrameloop(inView && !document.hidden ? "always" : "never");
        const io = new IntersectionObserver(
            ([entry]) => {
                inView = entry.isIntersecting;
                apply();
            },
            { threshold: 0 }
        );
        io.observe(root);
        document.addEventListener("visibilitychange", apply);
        return () => {
            io.disconnect();
            document.removeEventListener("visibilitychange", apply);
        };
    }, [env.capable]);

    const showCanvas = env.capable && sceneReady;
    const dark = theme === "dark";

    return (
        <div ref={rootRef} className="relative min-h-svh w-full overflow-hidden">
            {/* ---- static fallback field: CSS atmosphere + computational grid ---- */}
            <div
                aria-hidden="true"
                className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
                style={{
                    opacity: showCanvas ? 0 : 1,
                    background: dark
                        ? "radial-gradient(120% 92% at 50% 90%, rgba(230,57,42,0.16), transparent 55%), radial-gradient(95% 72% at 50% 16%, rgba(111,150,242,0.15), transparent 62%), linear-gradient(180deg,#08080b 0%,#0c0d13 58%,#07070a 100%)"
                        : "radial-gradient(120% 92% at 50% 90%, rgba(200,36,24,0.10), transparent 55%), radial-gradient(95% 72% at 50% 14%, rgba(27,77,201,0.13), transparent 62%), linear-gradient(180deg,#f3f7fd 0%,#e9eff9 58%,#dfe7f4 100%)",
                }}
            >
                <div className="grid-field absolute inset-0 opacity-45"  />
            </div>

            {/* ---- WebGL quant field ---- */}
            {env.capable && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
                    style={{ opacity: sceneReady ? 1 : 0 }}
                >
                    <QuantField
                        scrollRef={scrollRef}
                        pointerRef={pointerRef}
                        frameloop={frameloop}
                        tier={env.tier}
                        theme={theme}
                        onReady={() => setSceneReady(true)}
                        className="h-full w-full"
                    />
                </div>
            )}

            {/* ---- volumetric haze + horizon blend into the next act ---- */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: dark
                        ? "radial-gradient(115% 85% at 50% 42%, transparent 42%, rgba(4,4,6,0.55) 100%)"
                        : "radial-gradient(115% 85% at 50% 42%, transparent 45%, rgba(190,205,232,0.5) 100%)",
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent"
            />

            {/* ---- the anonymous human, integrated into the field ---- */}
            <div
                data-hero-figure
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-end justify-center will-change-transform md:justify-[60%]"
            >
                <CinematicHumanFigure />
            </div>

            {/* ---- legibility scrim so text holds contrast over the figure (spec §24) ---- */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[5]"
                style={{
                    background: dark
                        ? "linear-gradient(to top, rgba(5,5,8,0.85) 0%, rgba(5,5,8,0.28) 38%, transparent 64%), linear-gradient(to right, rgba(5,5,8,0.62) 0%, transparent 46%)"
                        : "linear-gradient(to top, rgba(243,247,253,0.9) 0%, rgba(243,247,253,0.34) 38%, transparent 64%), linear-gradient(to right, rgba(243,247,253,0.64) 0%, transparent 46%)",
                }}
            />

            {/* ---- hero content (server-rendered children) ---- */}
            <div className="relative z-10 min-h-svh">{children}</div>
        </div>
    );
}
