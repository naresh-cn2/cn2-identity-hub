"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Copy-to-clipboard for the contact address (spec §18).
 *
 * A small conversion aid: one click puts the address on the clipboard. Falls
 * back silently when the clipboard API is unavailable — the address is always
 * visible and selectable next to this button, so nothing depends on it.
 */
export default function CopyEmail({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (timer.current) clearTimeout(timer.current);
    }, []);

    async function copy() {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    }

    return (
        <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className="label-mono border border-line px-5 py-3 text-muted transition-colors hover:border-signal hover:text-signal"
        >
            {copied ? "COPIED ✓" : "COPY ADDRESS"}
        </button>
    );
}
