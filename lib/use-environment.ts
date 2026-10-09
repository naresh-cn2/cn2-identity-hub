"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Capability detection for the cinematic 3D layer.
 *
 * Every hook here is server-safe: it returns a conservative default on the
 * first render (so SSR markup never mismatches) and only refines after mount.
 * The hero uses this to decide whether to load the WebGL field at all, keeping
 * first paint free of any WebGL work (spec §18, §24, §26).
 */

/* stable no-op subscription + snapshots shared by the store-backed hooks below */
const emptySubscribe = () => () => { };
const getTrue = () => true;
const getFalse = () => false;

/** True once mounted on the client — gates anything that reads the DOM. */
export function useMounted(): boolean {
    return useSyncExternalStore(emptySubscribe, getTrue, getFalse);
}

/** Tracks a media query, defaulting to `false` on the server. */
export function useMediaQuery(query: string): boolean {
    const subscribe = useCallback(
        (onChange: () => void) => {
            if (typeof window === "undefined" || !window.matchMedia) return () => { };
            const mq = window.matchMedia(query);
            mq.addEventListener("change", onChange);
            return () => mq.removeEventListener("change", onChange);
        },
        [query]
    );
    const getSnapshot = useCallback(() => {
        if (typeof window === "undefined" || !window.matchMedia) return false;
        return window.matchMedia(query).matches;
    }, [query]);
    return useSyncExternalStore(subscribe, getSnapshot, getFalse);
}

export function usePrefersReducedMotion(): boolean {
    return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on touch-first / small viewports where a heavy 3D scene is wasteful. */
export function useCoarsePointer(): boolean {
    return useMediaQuery("(pointer: coarse)");
}

export function useCompactViewport(): boolean {
    return useMediaQuery("(max-width: 767px)");
}

/* module-level cache so the probe runs at most once per session */
let webglCache: boolean | null = null;
function probeWebGL(): boolean {
    if (webglCache !== null) return webglCache;
    try {
        const canvas = document.createElement("canvas");
        const gl =
            canvas.getContext("webgl2") ||
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");
        webglCache = Boolean(gl);
    } catch {
        webglCache = false;
    }
    return webglCache;
}
const getNull = (): null => null;

/**
 * One-shot WebGL support probe. `null` until measured on the client, so the
 * caller can distinguish "unknown" (render fallback) from "unsupported".
 */
export function useWebGLSupport(): boolean | null {
    return useSyncExternalStore<boolean | null>(emptySubscribe, probeWebGL, getNull);
}

export type DeviceTier = "high" | "medium";

export interface Environment {
    /** True after the first client frame — before this, render the fallback. */
    ready: boolean;
    reducedMotion: boolean;
    webgl: boolean;
    coarse: boolean;
    compact: boolean;
    /** Whether the cinematic WebGL field should run at all. */
    capable: boolean;
    /** Scene complexity budget. */
    tier: DeviceTier;
}

/**
 * Aggregated environment used by the hero to choose between the WebGL field and
 * the static fallback, and to size the scene when it does run.
 */
export function useEnvironment(): Environment {
    const mounted = useMounted();
    const reducedMotion = usePrefersReducedMotion();
    const webgl = useWebGLSupport();
    const coarse = useCoarsePointer();
    const compact = useCompactViewport();

    const capable = mounted && webgl === true && !reducedMotion && !compact;
    const tier: DeviceTier = coarse || compact ? "medium" : "high";

    return {
        ready: mounted,
        reducedMotion,
        webgl: webgl === true,
        coarse,
        compact,
        capable,
        tier,
    };
}
