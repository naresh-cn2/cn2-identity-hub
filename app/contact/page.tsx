import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import ContactContent from "./contact-content";
import { site } from "@/data/site";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Direct contact — no forms, no funnels. Describe the problem, the data and what evidence would count as success.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact — Bukya Naresh / CN2.dev",
        description: "Direct contact for quantitative research, market-data systems and FinTech engineering.",
    },
};

const INCLUDE = [
    {
        n: "01",
        t: "THE PROBLEM",
        d: "What you are trying to find out or build, and what would count as an answer.",
    },
    {
        n: "02",
        t: "THE DATA",
        d: "What exists, where it lives and what state it is in. Data reality shapes the work.",
    },
    {
        n: "03",
        t: "THE EVIDENCE",
        d: "What artifact would prove it succeeded. Fixed before anything is built.",
    },
];

export default function ContactPage() {
    return (
        <>
            {/* ---- minimal hero ---- */}
            <header className="scanlines relative overflow-hidden border-b border-line">
                <div className="grid-field absolute inset-0" aria-hidden="true" />
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
                    aria-hidden="true"
                    style={{
                        background:
                            "radial-gradient(65% 100% at 50% 100%, var(--signal-soft), transparent 72%)",
                    }}
                />
                <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-32 text-center sm:px-8 md:pb-28 md:pt-44">
                    <Reveal>
                        <p className="label-mono text-muted">
                            SECTION <span className="text-signal">/</span> 12 — CONTACT
                        </p>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="display mt-8 text-[clamp(3rem,12vw,9rem)]">CONTACT</h1>
                    </Reveal>
                    <Reveal delay={180}>
                        <p className="label-mono mt-6 flex items-center justify-center gap-2 text-foreground">
                            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                            {site.status}
                        </p>
                    </Reveal>
                    <Reveal delay={240}>
                        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted">
                            Direct contact — no forms, no funnels. Each method reveals on interaction.
                            Choose the channel that fits the conversation.
                        </p>
                    </Reveal>
                </div>
            </header>

            {/* ---- contact methods with reveal interactions ---- */}
            <section aria-label="Contact methods" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
                    <Reveal>
                        <p className="label-mono text-signal">DIRECT CHANNELS</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">FIVE WAYS TO REACH ME</h2>
                    </Reveal>
                    <ContactContent />
                </div>
            </section>

            {/* ---- what to include ---- */}
            <section aria-label="What to include" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
                    <Reveal>
                        <p className="label-mono text-signal">WHAT TO INCLUDE</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">THREE THINGS, AND WE CAN START</h2>
                    </Reveal>
                    <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
                        {INCLUDE.map((s, i) => (
                            <Reveal key={s.n} delay={i * 80}>
                                <div className="h-full bg-background p-6 md:p-8">
                                    <span className="num-mono text-xs text-signal">{s.n}</span>
                                    <h3 className="display mt-3 text-lg">{s.t}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- other channels ---- */}
            <section aria-label="Other channels" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
                    <Reveal>
                        <p className="label-mono text-faint">OTHER CHANNELS</p>
                    </Reveal>
                    <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        <Reveal>
                            <Link
                                href="/work-with-me"
                                className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                            >
                                <span className="label-mono text-foreground group-hover:text-signal">WORK WITH ME →</span>
                                <span className="mt-3 text-sm leading-relaxed text-muted">
                                    Engagement areas, scope and how a project starts.
                                </span>
                            </Link>
                        </Reveal>
                        <Reveal delay={70}>
                            <Link
                                href="/cv"
                                className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                            >
                                <span className="label-mono text-foreground group-hover:text-signal">CV →</span>
                                <span className="mt-3 text-sm leading-relaxed text-muted">
                                    The full record — capability, work and study.
                                </span>
                            </Link>
                        </Reveal>
                        <Reveal delay={140}>
                            <a
                                href={site.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                            >
                                <span className="label-mono text-foreground group-hover:text-signal">LINKEDIN →</span>
                                <span className="mt-3 text-sm leading-relaxed text-muted">
                                    Professional profile and network.
                                </span>
                            </a>
                        </Reveal>
                        <Reveal delay={210}>
                            <a
                                href={site.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                            >
                                <span className="label-mono text-foreground group-hover:text-signal">GITHUB →</span>
                                <span className="mt-3 text-sm leading-relaxed text-muted">
                                    The code is the proof — read it directly.
                                </span>
                            </a>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}