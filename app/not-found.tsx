import Link from "next/link";
import KineticText from "@/components/ui/kinetic-text";
import Reveal from "@/components/ui/reveal";

const SUGGESTED = [
    { label: "WORK", href: "/work", note: "Products. Projects. Engineering." },
    { label: "RESEARCH", href: "/research", note: "Questions, methods, findings, limitations." },
    { label: "SERVICES", href: "/services", note: "What an engagement produces." },
    { label: "CONTACT", href: "/contact", note: "Direct channels and the enquiry form." },
];

export default function NotFound() {
    return (
        <>
            <header className="relative overflow-hidden border-b border-line">
                <div className="grid-field absolute inset-0" aria-hidden="true" />
                <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-44">
                    <Reveal>
                        <p className="label-mono text-muted">
                            ERROR <span className="text-signal">/</span> 404 — NOT FOUND
                        </p>
                    </Reveal>
                    <Reveal delay={100}>
                        <KineticText className="display mt-8 text-[clamp(2.6rem,9vw,7rem)]">
                            THIS COORDINATE DOES NOT EXIST.
                        </KineticText>
                    </Reveal>
                    <Reveal delay={180}>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                            The page you asked for is not here — it may have moved, or a link may
                            be broken. Everything else is one step away.
                        </p>
                    </Reveal>
                    <Reveal delay={240}>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Link
                                href="/"
                                className="label-mono border border-line-strong bg-surface px-6 py-4 text-foreground transition-colors hover:border-signal hover:text-signal"
                            >
                                RETURN TO THE ENTRANCE →
                            </Link>
                            <Link
                                href="/links"
                                className="label-mono border border-line px-6 py-4 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                            >
                                FULL INDEX →
                            </Link>
                            <p className="label-mono text-faint">OR PRESS ⌘K TO SEARCH ANYTHING</p>
                        </div>
                    </Reveal>
                </div>
            </header>

            <section aria-label="Suggested destinations" className="border-b border-line">
                <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
                    <Reveal>
                        <p className="label-mono text-signal">SUGGESTED DESTINATIONS</p>
                    </Reveal>
                    <div className="mt-8 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
                        {SUGGESTED.map((item, i) => (
                            <Reveal key={item.href} delay={i * 70}>
                                <Link
                                    href={item.href}
                                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface md:p-8"
                                >
                                    <span className="display block text-2xl group-hover:text-signal">
                                        {item.label}
                                    </span>
                                    <span className="mt-3 block flex-1 text-sm leading-relaxed text-muted">
                                        {item.note}
                                    </span>
                                    <span className="label-mono mt-6 block text-signal transition-transform duration-300 group-hover:translate-x-1">
                                        OPEN →
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
