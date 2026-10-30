import type { Metadata } from 'next';
import KineticText from "@/components/ui/kinetic-text";
import Link from 'next/link';
import Reveal from '@/components/ui/reveal';
import PageAtmosphere from '@/components/ui/page-atmosphere';
import PosterPlate from "@/components/viz/poster-plates";
import ReviewForm from '@/components/testimonials/review-form';
import TestimonialGrid, { type TestimonialView } from '@/components/testimonials/testimonial-grid';
import { Stars } from '@/components/testimonials/stars';
import {
    publishedTestimonials,
    testimonialDisplayName,
    testimonialPersonLine,
    RELATIONSHIP_LABELS,
} from '@/data/testimonials';
import { archiveProjects } from '@/data/archive';
import { serviceOfferings } from '@/data/services';

const DESCRIPTION =
    'Feedback and testimonials from collaborators, clients and peers — published with their permission, attributed to real people, carrying their own ratings.';

export const metadata: Metadata = {
    title: 'Testimonials — Bukya Naresh / CN2.dev',
    description: DESCRIPTION,
    alternates: { canonical: '/testimonials' },
    openGraph: {
        images: ["/opengraph-image"],
        title: 'Testimonials — Bukya Naresh / CN2.dev',
        description: DESCRIPTION,
    },
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function dateLabel(iso: string): string {
    const d = new Date(iso);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function workHrefOf(t: (typeof publishedTestimonials)[number]): { href?: string; label?: string } {
    if (!t.work || !t.workKind) return {};
    const label =
        t.workKind === 'project'
            ? archiveProjects.find((p) => p.id === t.work)?.title ?? t.work
            : serviceOfferings.find((s) => s.slug === t.work)?.slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ') ?? t.work;
    return {
        href: t.workKind === 'project' ? `/work/${t.work}` : `/services/${t.work}`,
        label: label.toUpperCase(),
    };
}

function toView(t: (typeof publishedTestimonials)[number]): TestimonialView {
    const { href, label } = workHrefOf(t);
    return {
        id: t.id,
        display: testimonialDisplayName(t),
        personLine: testimonialPersonLine(t),
        relationship: t.relationship,
        rating: t.rating,
        feedback: t.feedback,
        dateLabel: dateLabel(t.submittedAt),
        workHref: href,
        workLabel: label,
    };
}

/*
 * Testimonials — the trust surface. Fills only with real, consented
 * reviews (written through the form on this page); the empty state is a
 * designed first-class screen, never placeholder quotes. No aggregate
 * score is ever shown — each review carries its author's own rating.
 */
export default function TestimonialsPage() {
    const [featured, ...rest] = publishedTestimonials;
    const featuredView = featured ? toView(featured) : null;
    const restViews = rest.map(toView);

    const workOptions = [
        ...archiveProjects.map((p) => ({ kind: 'project' as const, value: p.id, label: p.title })),
        ...serviceOfferings.map((s) => ({
            kind: 'service' as const,
            value: s.slug,
            label: s.slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' '),
        })),
    ];

    return (
        <>
            {/* ---- header ---- */}
            <section className='relative overflow-hidden border-b border-line'>
                <div className='grid-field absolute inset-0' aria-hidden='true' />
                <PageAtmosphere variant='motes' />
                <div className='relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40'>
                    <Reveal>
                        <div className='flex flex-wrap items-baseline justify-between gap-4'>
                            <p className='label-mono text-muted'>
                                SECTION <span className='text-signal'>/</span> TESTIMONIALS
                            </p>
                            <p className='label-mono text-faint'>FROM PEOPLE I&apos;VE WORKED WITH</p>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <KineticText className='display mt-8 text-[clamp(2.4rem,10vw,8rem)]'>TESTIMONIALS</KineticText>
                    </Reveal>
                    <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-14">
                        <Reveal delay={200}>
                            <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                                Feedback from the people I&apos;ve worked with — collaborators, clients
                                and peers. Each testimonial is published with the person&apos;s chosen
                                attribution, their own rating and the context of the work, shared with
                                their permission.
                            </p>
                        </Reveal>
                        <Reveal delay={260}>
                            <PosterPlate
                                variant="reserve"
                                label="PLATE / RESERVED"
                                alt="Illustration: a quiet night sky where eight faint stars ring one bright star — the reserved place a new testimonial will occupy."
                            />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ---- what people say ---- */}
            <section id='voices' aria-label='What people say' className='border-t border-line py-16 md:py-24'>
                <div className='mx-auto max-w-[1440px] px-5 sm:px-8'>
                    <Reveal>
                        <div className='flex flex-wrap items-baseline justify-between gap-4'>
                            <h2 className='display text-3xl md:text-5xl'>WHAT PEOPLE SAY</h2>
                            <p className='label-mono text-faint'>
                                EXPERIENCES FROM PEOPLE WHO HAVE WORKED WITH OR USED MY WORK
                            </p>
                        </div>
                    </Reveal>

                    {featuredView ? (
                        <>
                            <Reveal delay={80}>
                                <figure className='relative mt-12 border border-line bg-surface/50 p-8 md:p-12'>
                                    <span
                                        className='display pointer-events-none absolute right-8 top-6 select-none text-6xl leading-none text-line-strong md:text-7xl'
                                        aria-hidden='true'
                                    >
                                        &ldquo;
                                    </span>
                                    <p className='label-mono text-faint'>FEATURED EXPERIENCE</p>
                                    <blockquote className='display mt-6 max-w-4xl text-2xl leading-snug md:text-4xl'>
                                        &ldquo;{featuredView.feedback}&rdquo;
                                    </blockquote>
                                    <figcaption className='mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6'>
                                        <div>
                                            <p className='display text-xl md:text-2xl'>{featuredView.display}</p>
                                            <p className='label-mono mt-2 text-muted'>{featuredView.personLine}</p>
                                            <div className='mt-4 flex flex-wrap items-center gap-3'>
                                                <span className='label-mono border border-line px-2 py-1 text-[10px] text-faint'>
                                                    {RELATIONSHIP_LABELS[featuredView.relationship]}
                                                </span>
                                                {featuredView.workHref && (
                                                    <Link
                                                        href={featuredView.workHref}
                                                        className='label-mono text-[10px] text-signal transition-colors hover:text-foreground'
                                                    >
                                                        {featuredView.workLabel} →
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <span className='label-mono text-faint'>{featuredView.dateLabel}</span>
                                            <Stars rating={featuredView.rating} className='text-signal' />
                                        </div>
                                    </figcaption>
                                </figure>
                            </Reveal>
                            {restViews.length > 0 && (
                                <div className='mt-6'>
                                    <TestimonialGrid items={restViews} />
                                </div>
                            )}
                        </>
                    ) : (
                        /* No published reviews yet — designed empty state, no invented quotes. */
                        <Reveal delay={80}>
                            <div className='mt-12 border border-line bg-surface/40 p-8 md:p-16'>
                                <p className='label-mono text-faint'>AWAITING THE FIRST PUBLISHED REVIEW</p>
                                <p className='display mt-6 text-2xl md:text-4xl'>THIS SPACE EARNS ITS CONTENT.</p>
                                <p className='mt-6 max-w-2xl text-base leading-relaxed text-muted'>
                                    No testimonial has been published yet — and none will be invented.
                                    This page fills only with real feedback from people who have genuinely
                                    worked with me or used the work, published with their permission and
                                    carrying their own rating.
                                </p>
                                <a
                                    href='#share'
                                    className='corner-ticks group mt-10 inline-flex items-center gap-3 border border-signal px-8 py-4 text-[11px] tracking-[0.2em] text-signal transition-colors hover:bg-signal hover:text-white'
                                >
                                    SHARE YOUR EXPERIENCE
                                    <span className='arr-live' aria-hidden='true'>
                                        →
                                    </span>
                                </a>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* ---- share your experience ---- */}
            <section id='share' aria-label='Share your experience' className='border-t border-line py-16 md:py-24'>
                <div className='mx-auto max-w-[1440px] px-5 sm:px-8'>
                    <Reveal>
                        <div className='flex flex-wrap items-baseline justify-between gap-4'>
                            <h2 className='display text-3xl md:text-5xl'>HAVE YOU WORKED WITH ME?</h2>
                            <p className='label-mono text-faint'>YOUR HONEST FEEDBACK, IN YOUR OWN WORDS</p>
                        </div>
                        <p className='mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg'>
                            Your feedback helps me understand what I&apos;m doing well and where I can
                            improve — and it helps others know what working together is actually like.
                        </p>
                        <ul className='mt-8 grid max-w-3xl gap-3'>
                            {[
                                'Published only with your permission and the attribution you choose.',
                                'Your rating is shown exactly as you give it — I never edit it.',
                                'Below a 4-star rating, or without publication consent, feedback stays private and is used only to improve the work.',
                            ].map((line) => (
                                <li key={line} className='flex gap-3 text-sm leading-relaxed text-muted'>
                                    <span
                                        className='mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal'
                                        aria-hidden='true'
                                    />
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <div className='mt-12'>
                        <Reveal delay={80}>
                            <ReviewForm workOptions={workOptions} />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ---- related sections ---- */}
            <section aria-label='Related sections' className='border-t border-line'>
                <div className='mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20'>
                    <Reveal>
                        <h2 className='display text-2xl md:text-4xl'>RELATED SECTIONS</h2>
                    </Reveal>
                    <div className='mt-12 grid gap-px bg-line md:grid-cols-2'>
                        <div>
                            <Reveal>
                                <h3 className='display mt-4 text-xl'>PROOF & EVIDENCE</h3>
                            </Reveal>
                            <p className='mt-4 text-base leading-relaxed text-muted'>
                                The work itself carries the evidence: working systems,
                                test suites, research entries and reproducible results.
                            </p>
                            <Link
                                href='/proof'
                                className='label-mono mt-6 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
                            >
                                VIEW PROOF →
                            </Link>
                        </div>
                        <div>
                            <Reveal>
                                <h3 className='display mt-4 text-xl'>RESEARCH & ARTICLES</h3>
                            </Reveal>
                            <p className='mt-4 text-base leading-relaxed text-muted'>
                                My research entries and engineering articles are open for
                                technical review and discussion — another way to judge the
                                work directly.
                            </p>
                            <Link
                                href='/research'
                                className='label-mono mt-6 inline-block border border-line-strong px-5 py-3 text-foreground transition-colors hover:border-research hover:text-research'
                            >
                                VIEW RESEARCH →
                            </Link>
                            <Link
                                href='/articles'
                                className='label-mono mt-6 inline-block border border-line-strong px-5 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
                            >
                                VIEW ARTICLES →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- continue ---- */}
            <section aria-label='Continue' className='border-t border-line'>
                <div className='mx-auto max-w-[1440px] px-5 py-16 sm:px-8'>
                    <Reveal>
                        <div className='flex flex-wrap items-center justify-between gap-6'>
                            <div>
                                <p className='label-mono text-faint'>NEXT</p>
                                <p className='display mt-2 text-2xl md:text-3xl'>MAKE CONTACT</p>
                            </div>
                            <div className='flex flex-wrap gap-4'>
                                <Link
                                    href='/contact'
                                    className='label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
                                >
                                    CONTACT →
                                </Link>
                                <Link
                                    href='/about'
                                    className='label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
                                >
                                    ABOUT →
                                </Link>
                                <Link
                                    href='/work-with-me'
                                    className='label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
                                >
                                    WORK WITH ME →
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
