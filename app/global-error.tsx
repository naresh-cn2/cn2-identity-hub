"use client";

import Link from "next/link";

/**
 * Root-layout error boundary. Replaces the whole document, so it carries its
 * own <html>/<body> and inline styles — no global CSS reaches it. The default
 * dark treatment matches the site's identity even without the stylesheet.
 */
export default function GlobalError({
    error,
    retry,
}: {
    error: Error & { digest?: string };
    retry: () => void;
}) {
    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    minHeight: "100dvh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0a0a0c",
                    color: "#f1f1ee",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
            >
                <main style={{ padding: "3rem 1.5rem", maxWidth: "38rem" }}>
                    <p style={{ color: "#e6392a", letterSpacing: "0.22em", fontSize: 11, margin: 0 }}>
                        CN2.DEV — CRITICAL ERROR
                    </p>
                    <h1
                        style={{
                            fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
                            margin: "1.5rem 0 0",
                            fontWeight: 700,
                            lineHeight: 1.15,
                        }}
                    >
                        THE SITE ITSELF HIT AN ERROR.
                    </h1>
                    <p style={{ color: "#8e8e96", lineHeight: 1.7, marginTop: "1.25rem" }}>
                        The root layout failed to render. Retrying reloads it. If it keeps
                        happening, something is wrong at the deployment level — the digest below
                        identifies this error in the server logs.
                    </p>
                    {error?.digest && (
                        <p style={{ color: "#7d7d88", fontSize: 12, marginTop: "1rem" }}>
                            DIGEST / {error.digest}
                        </p>
                    )}
                    <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                        <button
                            onClick={() => retry()}
                            style={{
                                background: "transparent",
                                border: "1px solid #303038",
                                color: "#f1f1ee",
                                padding: "0.9rem 1.6rem",
                                fontSize: 11,
                                letterSpacing: "0.2em",
                                cursor: "pointer",
                                fontFamily: "inherit",
                            }}
                        >
                            TRY AGAIN →
                        </button>
                        <Link
                            href="/"
                            style={{
                                border: "1px solid #303038",
                                color: "#8e8e96",
                                padding: "0.9rem 1.6rem",
                                fontSize: 11,
                                letterSpacing: "0.2em",
                                textDecoration: "none",
                                fontFamily: "inherit",
                            }}
                        >
                            GO TO THE ENTRANCE →
                        </Link>
                    </div>
                </main>
            </body>
        </html>
    );
}
