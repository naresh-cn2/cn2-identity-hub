import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/ui/reveal';
import PageAtmosphere from '@/components/ui/page-atmosphere';



export const metadata: Metadata = {
  title: 'Testimonials — Bukya Naresh / CN2.dev',
  description:
    'Genuine testimonials and feedback from collaborators, clients, and peers—only what is actually authorized and verified.',
  alternates: { canonical: '/testimonials' },
  openGraph: {
    title: 'Testimonials — Bukya Naresh / CN2.dev',
    description:
      'Genuine testimonials and feedback from collaborators, clients, and peers—only what is actually authorized and verified.',
  },
};

/*
 * Testimonials page — genuine feedback only.
 */
export default function TestimonialsPage() {
  // In a real implementation, this would come from data files
  // For now, we'll show an honest state since no testimonial data exists
  
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
                SECTION <span className='text-signal'>/</span> 18 — TESTIMONIALS
              </p>
              <p className='label-mono text-faint'>GENUINE FEEDBACK ONLY
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className='display mt-8 text-[clamp(3rem,10vw,8rem)]'>TESTIMONIALS</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className='mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl'>
              This page shows genuine testimonials and feedback only.
              Each testimonial includes, where available and authorized:
              actual text, person, role, organization, project or
              collaboration, and date.
              
              No invented reviews. No fabricated profile photographs
              or company logos. If there are no testimonials to show,
              this honest state is preferred over false evidence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- testimonials presentation ---- */}
      <section aria-label='Testimonials' className='py-16 md:py-24 border-t border-line'>
        <div className='mx-auto max-w-[1440px] px-5 sm:px-8'>
          <Reveal>
            <h2 className='display text-3xl md:text-5xl'>GENUINE TESTIMONIALS PRESENTATION</h2>
          </Reveal>
          <div className='mt-12'>
            <div className='relative bg-background p-8'>
              <p className='label-mono text-faint'>
                NO TESTIMONIALS TO SHOW
              </p>
              <p className='text-base leading-relaxed text-muted'>
                This page is intentionally empty rather than filled
                with plausible-looking entries.
                
                Testimonials appear here only when they are:
                • Actually received from real collaborators or clients
                • Properly authorized for public sharing
                • Accurately attributed to real people and organizations
                • Verified as genuine feedback on actual work
                
                Until such testimonials exist and are cleared for
                public use, this restrained empty state maintains
                the site&rsquo;s commitment to evidence and honesty.
              </p>
              <p className='label-mono mt-6 text-[10px] leading-relaxed text-faint'>
                CN2.DEV VALUES TRUTH OVER APPEARANCE
              </p>
            </div>
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
                The best &lsquo;testimonial&rsquo; is verifiable evidence:
                working systems, test suites, research artifacts,
                and reproducible results.
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
                Technical peer review through research publications
                and engineering articles provides another form
                of credible feedback.
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
