import type { Metadata } from "next";
import Link from "next/link";
import KineticText from "@/components/ui/kinetic-text";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import { site } from "@/data/site";

export const metadata: Metadata = {
    title: "Privacy",
    description:
        "What CN2.DEV collects, why, and how to reach out about it. No cookies, no trackers, no third-party analytics — only what you send on purpose.",
    alternates: { canonical: "/privacy" },
    openGraph: {
        images: ["/opengraph-image"],
        title: "Privacy — Bukya Naresh / CN2.dev",
        description: "What CN2.DEV collects, why, and how to reach out about it.",
    },
};

const COLLECTIONS = [
    {
        n: "01",
        t: "ENQUIRIES YOU SEND",
        d: "The contact form delivers your name, email, organisation, enquiry type, message and anything optional you chose to add. It is stored privately in server logs and used for one purpose: replying to you. It is never published, never sold, and never shared with third parties.",
    },
    {
        n: "02",
        t: "TESTIMONIALS YOU SUBMIT",
        d: "If you leave feedback, it is stored privately. It appears publicly only when you explicitly consent to publication, and only with the attribution you chose. Below-threshold or unconsented feedback stays private. You can ask for a correction or removal at any time.",
    },
    {
        n: "03",
        t: "YOUR THEME PREFERENCE",
        d: "Your light/dark choice is stored in your own browser (localStorage) so the site remembers it. That value never leaves your device.",
    },
    {
        n: "04",
        t: "STANDARD SERVER LOGS",
        d: "Like any website, requests reach the host, which keeps routine operational logs (IP, time, path) for reliability and abuse prevention. That hosting is Vercel; its own policies govern those logs.",
    },
];

export default function PrivacyPage() {
    return (
        <>
            <header className="relative overflow-hidden border-b border-line">
                <div className="grid-field absolute inset-0" aria-hidden="true" />
                <PageAtmosphere variant="field" />
                <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-44">
                    <Reveal>
                        <p className="label-mono text-muted">
                            SECTION <span className="text-signal">/</span> LEGAL — PRIVACY
                        </p>
                    </Reveal>
                    <Reveal delay={100}>
                        <KineticText className="display mt-8 text-[clamp(2.6rem,10vw,7.5rem)]">
                            NO TRACKING. NO SURPRISES.
                        </KineticText>
                    </Reveal>
                    <Reveal delay={180}>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                            This page describes what actually happens on CN2.DEV — not a template.
                            In short: the site sets no cookies, runs no analytics, and carries no
                            advertising or tracking scripts. It only handles what you send on purpose.
                        </p>
                    </Reveal>
                </div>
            </header>

            <section aria-label="What is collected" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
                    <Reveal>
                        <p className="label-mono text-signal">WHAT IS COLLECTED, AND WHY</p>
                    </Reveal>
                    <div className="mt-10 grid gap-px bg-line md:grid-cols-2">
                        {COLLECTIONS.map((item, i) => (
                            <Reveal key={item.n} delay={i * 70}>
                                <div className="h-full bg-background p-6 md:p-8">
                                    <span className="num-mono text-xs text-signal">{item.n}</span>
                                    <h2 className="display mt-3 text-xl">{item.t}</h2>
                                    <p className="mt-4 text-sm leading-relaxed text-muted">{item.d}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section aria-label="Your choices" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <div className="grid gap-12 md:grid-cols-2">
                        <Reveal>
                            <h2 className="display text-2xl md:text-3xl">YOUR CHOICES</h2>
                            <p className="mt-5 text-base leading-relaxed text-muted">
                                To access, correct, or delete anything you have submitted — an
                                enquiry, a testimonial, a removal request — email{" "}
                                <a
                                    href={site.links.email}
                                    className="text-foreground underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
                                >
                                    {site.email}
                                </a>
                                . Requests are handled personally.
                            </p>
                        </Reveal>
                        <Reveal delay={80}>
                            <h2 className="display text-2xl md:text-3xl">IF THIS CHANGES</h2>
                            <p className="mt-5 text-base leading-relaxed text-muted">
                                This page is the policy. If anything about data handling ever
                                changes — for example, if analytics are added — this page will say
                                so plainly before or at the same time. Last reviewed: October 2026.
                            </p>
                            <Link
                                href="/terms"
                                className="label-mono mt-6 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                            >
                                TERMS OF USE →
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
