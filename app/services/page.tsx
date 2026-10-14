import type { Metadata } from 'next';
import KineticText from "@/components/ui/kinetic-text";
import Link from 'next/link';
import Reveal from '@/components/ui/reveal';
import PageAtmosphere from '@/components/ui/page-atmosphere';
import { ServicesFlowViz } from '@/components/services/service-schematics';
import ServiceStudio from '@/components/services/service-studio';


export const metadata: Metadata = {
  title: 'Services — Bukya Naresh / CN2.dev',
  description:
    'Defined-scope technical services: research prototypes, market-data tooling, quantitative analysis, data pipelines, and AI-assisted automation.',
  alternates: { canonical: '/services' },
  openGraph: {
    images: ["/opengraph-image"],
    title: 'Services — Bukya Naresh / CN2.dev',
    description:
      'Defined-scope technical services: research prototypes, market-data tooling, quantitative analysis, data pipelines, and AI-assisted automation.',
  },
};

/*
 * Services page — client-facing offerings grounded in actual evidence.
 * The hero band shows how an engagement flows; the studio below lets a
 * visitor step through each offering and see what it actually delivers.
 */
export default function ServicesPage() {
  return (
    <>
      {/* ---- header ---- */}
      <section className='relative overflow-hidden border-b border-line'>
        <div className='grid-field absolute inset-0' aria-hidden='true' />
        <PageAtmosphere variant='flow' />
        <div className='relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40'>
          <Reveal>
            <div className='flex flex-wrap items-baseline justify-between gap-4'>
              <p className='label-mono text-muted'>
                SECTION <span className='text-signal'>/</span> 16 — SERVICES
              </p>
              <p className='label-mono text-faint'>CLIENT-FACING OFFERINGS
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <KineticText className='display mt-8 text-[clamp(3rem,10vw,8rem)]'>COMPLEX PROBLEMS. PRACTICAL SOLUTIONS.</KineticText>
          </Reveal>
          <Reveal delay={200}>
            <p className='mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl'>
              I work across quantitative research, data engineering, software development,
              and AI-assisted automation. Explore the types of technical problems I can help
              investigate, design, and solve.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className='viz-frame mt-12 p-4 md:mt-16 md:p-6'>
              <div className='relative'>
                <ServicesFlowViz />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- interactive service studio ---- */}
      <section aria-label='Service offerings' className='py-16 md:py-24'>
        <div className='mx-auto max-w-[1440px] px-5 sm:px-8'>
          <Reveal>
            <h2 className='display text-3xl md:text-5xl'>HOW I CAN HELP</h2>
            <p className='label-mono text-faint'>DEFINED SCOPE · REPRODUCIBLE DELIVERABLES · WRITTEN LIMITS
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className='mt-12'>
              <ServiceStudio />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- service delivery process ---- */}
      <section aria-label='Service delivery process' className='border-t border-line'>
        <div className='mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20'>
          <Reveal>
            <h2 className='display text-2xl md:text-4xl'>SERVICE DELIVERY PROCESS</h2>
          </Reveal>
          <ol className='mt-10 max-w-3xl space-y-5'>
            {['DISCOVER', 'DEFINE', 'RESEARCH', 'SPECIFY', 'DESIGN', 'BUILD', 'TEST', 'VALIDATE', 'DELIVER', 'ITERATE'].map((step, i) => (
              <Reveal key={step} delay={i * 90}>
                <li className='flex items-baseline gap-6 border-b border-line pb-5'>
                  <span className='num-mono text-sm text-faint'>{String(i + 1).padStart(2, '0')}</span>
                  <span className='display text-2xl md:text-4xl'>{step}</span>
                  {i < 9 && (<span>+</span>)}
                </li>
              </Reveal>
            ))}
          </ol>
          <div className='mt-8 flex flex-wrap items-baseline justify-between gap-4'>
            <p className='label-mono text-faint'>
              Each stage has a clear output — requirements, tests, working software and
              written limits — so you always know what was built and what it proves.
            </p>
            <Link
              href='/how-i-work'
              className='label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
            >
              LEARN HOW I WORK →
            </Link>
          </div>
        </div>
      </section>

      {/* ---- engagement models ---- */}
      <section aria-label='Engagement models' className='border-t border-line'>
        <div className='mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20'>
          <Reveal>
            <h2 className='display text-2xl md:text-4xl'>ENGAGEMENT MODELS</h2>
          </Reveal>
          <div className='mt-12 grid gap-px bg-line md:grid-cols-2'>
            <div>
              <Reveal>
                <h3 className='display mt-4 text-xl'>FREELANCE & CONTRACT</h3>
              </Reveal>
              <p className='mt-4 text-base leading-relaxed text-muted'>
                I take on defined-scope technical projects: research prototypes,
                market-data tools, quantitative analysis systems, and automation
                workflows. Every engagement ends with working software, reproducible
                artifacts, and written limitations.
              </p>
              <Link
                href='/opportunities/freelance'
                className='label-mono mt-6 inline-block border border-line-strong px-5 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
              >
                EXPLORE OPPORTUNITIES →
              </Link>
            </div>
            <div>
              <Reveal>
                <h3 className='display mt-4 text-xl'>RESEARCH COLLABORATION</h3>
              </Reveal>
              <p className='mt-4 text-base leading-relaxed text-muted'>
                I&apos;m open to research collaboration on market structure, backtesting,
                data integrity, risk engineering, and quantitative methods — working with
                people who value reproducible results and transparent methodology.
              </p>
              <Link
                href='/research'
                className='label-mono mt-6 inline-block border border-line-strong px-5 py-3 text-foreground transition-colors hover:border-research hover:text-research'
              >
                EXPLORE RESEARCH →
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
                <p className='display mt-2 text-2xl md:text-3xl'>BUILD CONFIDENCE THROUGH EVIDENCE</p>
              </div>
              <div className='flex flex-wrap gap-4'>
                <Link
                  href='/proof'
                  className='label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
                >
                  PROOF →
                </Link>
                <Link
                  href='/about'
                  className='label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
                >
                  ABOUT →
                </Link>
                <Link
                  href='/contact'
                  className='label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
                >
                  CONTACT →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
