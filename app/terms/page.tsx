import type { Metadata } from "next";
import Link from "next/link";
import KineticText from "@/components/ui/kinetic-text";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import { site } from "@/data/site";

export const metadata: Metadata = {
    title: "Terms",
    description:
        "Terms of use for CN2.DEV — what this site is, how its content and services should be read, and where the boundaries are.",
    alternates: { canonical: "/terms" },
    openGraph: {
        images: ["/opengraph-image"],
        title: "Terms — Bukya Naresh / CN2.dev",
        description: "Terms of use for CN2.DEV — what this site is and where the boundaries are.",
    },
};

const TERMS = [
    {
        n: "01",
        t: "WHAT THIS SITE IS",
        d: "CN2.DEV is the professional site of Bukya Naresh: a portfolio, a research record, and a contact point for opportunities. Browsing it creates no relationship of any kind.",
    },
    {
        n: "02",
        t: "HOW TO READ THE WORK",
        d: "Results, figures and demonstrations are labelled for what they are — backtest, simulation, self-benchmark, test output, or illustration. Nothing on this site is financial advice, an investment recommendation, or a claim of live trading performance, unless a page explicitly states otherwise with evidence.",
    },
    {
        n: "03",
        t: "SERVICES ARE CONVERSATIONS FIRST",
        d: "Service pages describe how work is typically done and what it typically produces. They are not binding offers. Any engagement — scope, deliverables, timeline, price — is agreed in writing before it begins.",
    },
    {
        n: "04",
        t: "CONTENT AND LICENSES",
        d: "Site text and visuals are © Bukya Naresh unless credited otherwise. Where code is published, the repository's own license governs its use. Quoting small excerpts with attribution is fine; copying whole pages or presenting the work as your own is not.",
    },
    {
        n: "05",
        t: "EXTERNAL LINKS",
        d: "The site links to GitHub, LinkedIn, and other destinations. Those services have their own terms and privacy policies; CN2.DEV has no control over them.",
    },
    {
        n: "06",
        t: "QUESTIONS",
        d: "Anything unclear — about these terms, the work, or a claim on a page — is welcome at the contact page. Honest scrutiny is the point of how this site is built.",
    },
];

export default function TermsPage() {
    return (
        <>
            <header className="relative overflow-hidden border-b border-line">
                <div className="grid-field absolute inset-0" aria-hidden="true" />
                <PageAtmosphere variant="field" />
                <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-44">
                    <Reveal>
                        <p className="label-mono text-muted">
                            SECTION <span className="text-signal">/</span> LEGAL — TERMS
                        </p>
                    </Reveal>
                    <Reveal delay={100}>
                        <KineticText className="display mt-8 text-[clamp(2.6rem,10vw,7.5rem)]">
                            PLAIN TERMS.
                        </KineticText>
                    </Reveal>
                    <Reveal delay={180}>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                            Written to be read, not to be survived. Six points, no theatre —
                            what this site is, how its content should be read, and where the
                            boundaries sit.
                        </p>
                    </Reveal>
                </div>
            </header>

            <section aria-label="Terms" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
                    <div className="grid gap-px bg-line md:grid-cols-2">
                        {TERMS.map((item, i) => (
                            <Reveal key={item.n} delay={i * 60}>
                                <div className="h-full bg-background p-6 md:p-8">
                                    <span className="num-mono text-xs text-signal">{item.n}</span>
                                    <h2 className="display mt-3 text-xl">{item.t}</h2>
                                    <p className="mt-4 text-sm leading-relaxed text-muted">{item.d}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={120}>
                        <div className="mt-12 flex flex-wrap items-center gap-4">
                            <Link
                                href="/privacy"
                                className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                            >
                                PRIVACY →
                            </Link>
                            <Link
                                href="/contact"
                                className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                            >
                                CONTACT →
                            </Link>
                            <a
                                href={site.links.email}
                                className="label-mono text-faint transition-colors hover:text-signal"
                            >
                                {site.email}
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
