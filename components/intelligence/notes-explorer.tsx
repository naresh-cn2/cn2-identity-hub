"use client";

import { useMemo, useState } from "react";
import { notes, type Note } from "@/data/intelligence";

/**
 * Notes explorer (spec §16).
 *
 * The written half of the intelligence layer: mental models, decision systems
 * and research notes, filterable by kind. Client-side so filtering is instant
 * and needs no route change.
 */

const TYPE_ORDER: Note["type"][] = [
    "MENTAL MODEL",
    "RESEARCH NOTE",
    "DECISION SYSTEM",
    "MARKET THINKING",
    "ENGINEERING NOTE",
    "LEARNING",
];

function FilterChip({
    label,
    count,
    active,
    onClick,
}: {
    label: string;
    count: number;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`label-mono border px-4 py-2 transition-colors ${active
                    ? "border-signal bg-signal-soft text-foreground"
                    : "border-line text-muted hover:border-line-strong hover:text-foreground"
                }`}
        >
            {label}
            <span className="num-mono ml-2 text-[10px] text-faint">{String(count).padStart(2, "0")}</span>
        </button>
    );
}

export default function NotesExplorer() {
    const [filter, setFilter] = useState<Note["type"] | "ALL">("ALL");

    const types = useMemo(() => TYPE_ORDER.filter((t) => notes.some((n) => n.type === t)), []);

    const counts = useMemo(() => {
        const map = new Map<string, number>();
        for (const n of notes) map.set(n.type, (map.get(n.type) ?? 0) + 1);
        return map;
    }, []);

    const visible = useMemo(
        () => (filter === "ALL" ? notes : notes.filter((n) => n.type === filter)),
        [filter]
    );

    return (
        <div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter notes by type">
                <FilterChip
                    label="ALL"
                    count={notes.length}
                    active={filter === "ALL"}
                    onClick={() => setFilter("ALL")}
                />
                {types.map((t) => (
                    <FilterChip
                        key={t}
                        label={t}
                        count={counts.get(t) ?? 0}
                        active={filter === t}
                        onClick={() => setFilter(t)}
                    />
                ))}
            </div>

            <div className="mt-10 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
                {visible.map((n) => (
                    <article key={n.id} className="flex h-full flex-col bg-background p-6">
                        <p className="label-mono text-research">{n.type}</p>
                        <h3 className="display mt-4 text-lg md:text-xl">{n.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-muted">{n.body}</p>
                        {n.source && (
                            <p className="label-mono mt-auto pt-6 text-[10px] text-faint">
                                SOURCE — {n.source.toUpperCase()}
                            </p>
                        )}
                    </article>
                ))}
            </div>

            <p className="label-mono mt-8 text-faint" aria-live="polite">
                SHOWING {visible.length} OF {notes.length} NOTES
            </p>
        </div>
    );
}
