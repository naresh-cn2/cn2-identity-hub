import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import KnowledgeGraph from "@/components/viz/knowledge-graph";
import NotesExplorer from "@/components/intelligence/notes-explorer";
import { knowledgeEdges, knowledgeNodes } from "@/data/intelligence";
import { researchEntries } from "@/data/research";
import { flagshipProjects } from "@/data/projects";

export const metadata: Metadata = {
    title: "Intelligence",
    description:
        "The knowledge graph behind the work — how quant, markets, data, risk, AI and engineering relate, with the mental models, decision systems and research notes that connect them.",
    alternates: { canonical: "/intelligence" },
    openGraph: {
        title: "Intelligence — Bukya Naresh / CN2.dev",
        description:
            "An interactive knowledge graph of the practice areas and the notes that connect them.",
    },
};

/** Each node with the labels it connects to — the graph in text, for depth and a11y. */
const relationships = knowledgeNodes.map((n) => ({
    id: n.id,
    label: n.label,
    connects: knowledgeEdges
        .filter((e) => e[0] === n.id || e[1] === n.id)
        .map((e) => (e[0] === n.id ? e[1] : e[0]))
        .map((id) => knowledgeNodes.find((x) => x.id === id)?.label ?? id),
}));

export default function IntelligencePage() {
    return (
        <>
            {/* ---- hero ---- */}
            <header className="relative overflow-hidden border-b border-line">
                <div className="grid-field-fine absolute inset-0" aria-hidden="true" />
                <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
                    <Reveal>
                        <div className="flex flex-wrap items-baseline justify-between gap-4">
                            <p className="label-mono text-muted">
                                DOMAIN <span className="text-research">/</span> 06 — INTELLIGENCE
                            </p>
                            <p className="label-mono text-faint">
                                {knowledgeNodes.length} NODES · {knowledgeEdges.length} RELATIONS
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="display mt-8 text-[clamp(2.6rem,9vw,7rem)]">INTELLIGENCE</h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                            The map behind the work. Not a skills list — a graph of how the practice areas actually
                            relate, and the mental models, decision systems and research notes that sit on the
                            connections. Hover a node to isolate what it touches.
                        </p>
                    </Reveal>
                </div>
            </header>

            {/* ---- the graph ---- */}
            <section aria-label="Knowledge graph" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <div className="corner-ticks border border-line bg-surface p-4 md:p-8">
                            <KnowledgeGraph />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---- node index ---- */}
            <section aria-label="Node relationships" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <p className="label-mono text-research">THE GRAPH IN TEXT</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">WHAT EACH NODE TOUCHES</h2>
                    </Reveal>
                    <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
                        {relationships.map((r, i) => (
                            <Reveal key={r.id} delay={Math.min(i, 5) * 60}>
                                <div className="flex h-full flex-col bg-background p-6">
                                    <p className="display text-xl text-foreground">{r.label}</p>
                                    <p className="label-mono mt-3 text-[10px] text-faint">
                                        {r.connects.length} CONNECTION{r.connects.length === 1 ? "" : "S"}
                                    </p>
                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {r.connects.map((c) => (
                                            <li
                                                key={c}
                                                className="label-mono border border-line px-2.5 py-1 text-[10px] text-muted"
                                            >
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- notes ---- */}
            <section aria-label="Notes" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <div className="flex flex-wrap items-baseline justify-between gap-4">
                            <div>
                                <p className="label-mono text-research">THE NOTES ON THE CONNECTIONS</p>
                                <h2 className="display mt-4 text-2xl md:text-4xl">MENTAL MODELS & DECISION SYSTEMS</h2>
                            </div>
                            <p className="label-mono text-faint">FILTER BY KIND</p>
                        </div>
                    </Reveal>
                    <div className="mt-10">
                        <NotesExplorer />
                    </div>
                </div>
            </section>

            {/* ---- where the thinking is applied ---- */}
            <section aria-label="Applied work" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <p className="label-mono text-faint">WHERE THIS THINKING IS APPLIED</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">THE GRAPH, BUILT INTO SYSTEMS</h2>
                    </Reveal>
                    <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {flagshipProjects.map((p, i) => (
                            <Reveal key={p.id} delay={i * 70}>
                                <Link
                                    href={`/builds/${p.id}`}
                                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                                >
                                    <span className="num-mono text-xs text-faint">{p.index}</span>
                                    <span className="display mt-3 text-lg">{p.shortTitle}</span>
                                    <span className="mt-3 text-sm leading-relaxed text-muted">{p.thesis}</span>
                                    <span className="label-mono mt-auto pt-6 text-research transition-transform duration-300 group-hover:translate-x-1">
                                        OPEN BUILD →
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- continuation ---- */}
            <section aria-label="Continue" className="border-t border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
                    <Reveal>
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div>
                                <p className="label-mono text-faint">NEXT</p>
                                <p className="display mt-2 text-2xl md:text-3xl">FROM THE MAP TO THE EVIDENCE</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/research"
                                    className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research"
                                >
                                    RESEARCH ARCHIVE →
                                </Link>
                                <Link
                                    href="/case-studies"
                                    className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                                >
                                    CASE STUDIES →
                                </Link>
                                <Link
                                    href="/lab"
                                    className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                                >
                                    LAB →
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={80}>
                        <p className="label-mono mt-10 max-w-3xl text-[10px] leading-relaxed text-faint">
                            {researchEntries.length} RESEARCH ENTRIES CARRY THE FULL QUESTION → EVIDENCE → LIMITATION
                            CHAIN. THE GRAPH ABOVE IS THE STRUCTURE; THE ARCHIVE IS THE PROOF.
                        </p>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
