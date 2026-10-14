import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import ContactPanels from "@/components/contact/contact-panels";
import ContactOrbitViz from "@/components/contact/contact-orbit-viz";
import CopyEmail from "@/components/contact/copy-email";
import EnquiryForm from "@/components/contact/enquiry-form";
import { site } from "@/data/site";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Direct contact for quantitative research, market-data systems, engineering projects and professional opportunities.",
    alternates: { canonical: "/contact" },
    openGraph: {
        images: ["/opengraph-image"],
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
                <PageAtmosphere variant="orbit" />
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
                        <KineticText className="display mt-8 text-[clamp(3rem,12vw,9rem)]">LET&apos;S BUILD SOMETHING MEANINGFUL.</KineticText>
                    </Reveal>
                    <Reveal delay={180}>
                        <p className="label-mono mt-6 flex items-center justify-center gap-2 text-foreground">
                            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                            {site.status}
                        </p>
                    </Reveal>
                    <Reveal delay={240}>
                        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted">
                            Have a technical challenge, a project idea, a research question, or a
                            professional opportunity? Choose the most relevant way to connect.
                        </p>
                    </Reveal>
                    <Reveal delay={320}>
                        <div className="relative mx-auto mt-14 max-w-4xl md:mt-16">
                            <ContactOrbitViz />
                        </div>
                    </Reveal>
                </div>
            </header>

            {/* ---- contact methods with reveal interactions ---- */}
            <section aria-label="Contact methods" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
                    <Reveal>
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <div>
                                <p className="label-mono text-signal">DIRECT CHANNELS</p>
                                <h2 className="display mt-4 text-2xl md:text-4xl">FIVE WAYS TO REACH ME</h2>
                            </div>
                            <CopyEmail email={site.email} />
                        </div>
                    </Reveal>
                    <ContactPanels />
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

            {/* ---- project enquiry ---- */}
            <section aria-label="Project enquiry" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
                    <Reveal>
                        <p className="label-mono text-signal">PROJECT ENQUIRY</p>
                        <h2 className="display mt-4 text-2xl md:text-4xl">TELL ME WHAT YOU&apos;RE BUILDING</h2>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                            A short, specific brief gets the most useful reply: the problem, the
                            data if there is any, and the evidence that would count as success.
                            Every enquiry is read personally.
                        </p>
                    </Reveal>
                    <Reveal delay={100}>
                        <div className="mt-10">
                            <EnquiryForm />
                        </div>
                    </Reveal>
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
                            <Link
                                href="/opportunities"
                                className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                            >
                                <span className="label-mono text-foreground group-hover:text-signal">OPPORTUNITIES →</span>
                                <span className="mt-3 text-sm leading-relaxed text-muted">
                                    Employment, freelance, research and partnership pathways.
                                </span>
                            </Link>
                        </Reveal>
                        <Reveal delay={210}>
                            <Link
                                href="/links"
                                className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                            >
                                <span className="label-mono text-foreground group-hover:text-signal">LINKS →</span>
                                <span className="mt-3 text-sm leading-relaxed text-muted">
                                    Every CN2.DEV destination and profile, indexed in one place.
                                </span>
                            </Link>
                        </Reveal>
                        <Reveal delay={280} className="sm:col-span-2 lg:col-span-4">
                            <Link
                                href="/testimonials#share"
                                className="group flex h-full flex-col justify-center bg-background p-6 transition-colors hover:bg-surface md:flex-row md:items-center md:justify-between md:gap-8 md:p-8"
                            >
                                <span className="label-mono text-foreground group-hover:text-signal">
                                    LEAVE FEEDBACK →
                                </span>
                                <span className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:mt-0">
                                    Worked with me or used the work? Share your experience and rating —
                                    it helps others know what collaboration is actually like.
                                </span>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
