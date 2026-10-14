"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Honest message, a real retry, and a way out.
 * Renders inside the root layout, so the design system and theme apply.
 */
export default function Error({
    error,
    retry,
}: {
    error: Error & { digest?: string };
    retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="relative overflow-hidden">
            <div className="grid-field absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto flex min-h-[70vh] max-w-[1440px] flex-col justify-center px-5 py-32 sm:px-8">
                <p className="label-mono text-muted">
                    ERROR <span className="text-signal">/</span> UNEXPECTED
                </p>
                <h1 className="display mt-8 text-[clamp(2.4rem,8vw,6rem)]">SOMETHING BROKE HERE.</h1>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                    This page hit an unexpected error. Retrying re-renders it; the rest of the
                    site is unaffected.
                </p>
                {error.digest && (
                    <p className="num-mono mt-4 text-xs text-faint">DIGEST / {error.digest}</p>
                )}
                <div className="mt-10 flex flex-wrap gap-4">
                    <button
                        onClick={() => retry()}
                        className="label-mono border border-line-strong bg-surface px-6 py-4 text-foreground transition-colors hover:border-signal hover:text-signal"
                    >
                        TRY AGAIN →
                    </button>
                    <Link
                        href="/"
                        className="label-mono border border-line px-6 py-4 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                    >
                        RETURN TO THE ENTRANCE →
                    </Link>
                </div>
            </div>
        </section>
    );
}
