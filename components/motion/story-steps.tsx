"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface StoryStep {
    id: string;
    label: string;
    title: string;
    body: string;
}

/**
 * StorySteps — scroll-driven storytelling band.
 *
 * A sticky scene holds still on the left while the narrative steps scroll
 * past on the right; whichever step crosses the middle of the viewport
 * becomes active, and the scene re-poses to match it. No pinning library,
 * no scroll hijacking — `position: sticky` plus one IntersectionObserver,
 * so native scrolling physics are fully preserved.
 *
 * Scenes are passed as plain React nodes (one per step), never as functions,
 * so the component stays safe for static prerendering. The active scene is
 * fully lit; inactive scenes sit slightly defocused — the system's focus
 * language keeps the eye on the stage being shown.
 *
 * Mobile and reduced-motion: the sticky pane is desktop-only; on small
 * screens each step renders its own compact scene inline, and the global
 * reduced-motion rule collapses every cross-fade to an instant swap.
 */
export default function StorySteps({
    steps,
    scenes,
    mobileScenes,
    accent = "var(--electric)",
    ariaLabel,
}: {
    steps: StoryStep[];
    /** Desktop sticky scene per step (same length as steps). */
    scenes: ReactNode[];
    /** Optional compact mobile scene per step (same length as steps). */
    mobileScenes?: ReactNode[];
    accent?: string;
    ariaLabel?: string;
}) {
    const [active, setActive] = useState(0);
    const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

    useEffect(() => {
        const els = itemRefs.current.filter(Boolean) as HTMLLIElement[];
        if (!els.length || typeof IntersectionObserver === "undefined") return;

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const idx = Number((entry.target as HTMLElement).dataset.step);
                    if (!Number.isNaN(idx)) setActive(idx);
                }
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
        );
        for (const el of els) io.observe(el);
        return () => io.disconnect();
    }, [steps.length]);

    return (
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            {/* desktop: the scene holds still while the story scrolls */}
            <div className="hidden lg:block">
                <div className="sticky top-28">
                    <div className="viz-frame p-6" aria-hidden="true">
                        <div className="story-scene" data-live={active === 0 ? "true" : "false"}>
                            {scenes[0]}
                        </div>
                        {scenes.slice(1).map((scene, i) => (
                            <div
                                key={steps[i + 1]?.id ?? i}
                                className="story-scene"
                                data-live={active === i + 1 ? "true" : "false"}
                                style={{ position: "absolute", inset: 0 }}
                            >
                                {scene}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ol className="relative" aria-label={ariaLabel}>
                <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 hidden h-full w-px bg-line sm:block"
                />
                {steps.map((step, i) => {
                    const isActive = i === active;
                    const isDone = i < active;
                    return (
                        <li
                            key={step.id}
                            id={step.id}
                            data-step={i}
                            ref={(el) => {
                                itemRefs.current[i] = el;
                            }}
                            className="relative flex min-h-[46vh] flex-col justify-center py-10 pl-0 sm:pl-8 lg:min-h-[62vh]"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute left-[-3.5px] top-1/2 hidden h-[7px] w-[7px] -translate-y-1/2 rounded-full transition-all duration-500 sm:block"
                                style={{
                                    background: isActive || isDone ? accent : "var(--line-strong)",
                                    boxShadow: isActive ? `0 0 12px ${accent}` : "none",
                                }}
                            />
                            {mobileScenes?.[i]}
                            <div
                                className="transition-all duration-700"
                                style={{
                                    opacity: isActive ? 1 : 0.45,
                                    filter: isActive ? "none" : "blur(1.5px)",
                                    transform: isActive ? "none" : "translateY(6px)",
                                }}
                            >
                                <p className="label-mono" style={{ color: isActive ? accent : undefined }}>
                                    {step.label}
                                </p>
                                <h3 className="display mt-4 text-2xl md:text-3xl">{step.title}</h3>
                                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                                    {step.body}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
