import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/ui/reveal';
import PageAtmosphere from '@/components/ui/page-atmosphere';


export const metadata: Metadata = {
  title: 'How I Work — Bukya Naresh / CN2.dev',
  description:
    'How Bukya Naresh takes on technical work: understand the problem, define requirements, research, design, build, test, validate, deliver and iterate — with clear communication and documented results at every step.',
  alternates: { canonical: '/how-i-work' },
  openGraph: {
    title: 'How I Work — Bukya Naresh / CN2.dev',
    description:
      'How Bukya Naresh takes on technical work: understand the problem, define requirements, research, design, build, test, validate, deliver and iterate — with clear communication and documented results at every step.',
  },
};

/*
 * How I Work page — clear process for potential clients and collaborators.
 */
export default function HowIWorkPage() {
  return (
    <>
      {/* ---- header ---- */}
      <section className='relative overflow-hidden border-b border-line'>
        <div className='grid-field absolute inset-0' aria-hidden='true' />
        <PageAtmosphere variant='field' />
        <div className='relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40'>
          <Reveal>
            <div className='flex flex-wrap items-baseline justify-between gap-4'>
              <p className='label-mono text-muted'>
                SECTION <span className='text-signal'>/</span> 17 — HOW I WORK
              </p>
              <p className='label-mono text-faint'>TRANSPARENT PROCESS</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className='display mt-8 text-[clamp(3rem,10vw,8rem)]'>HOW I WORK</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className='mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl'>
              My process for technical work, from first conversation to delivery:
              discover the real need, define requirements, research options,
              specify details, design the architecture, build, test against
              edge cases, validate the results, deliver with documentation,
              and iterate on feedback.
              Every claim stays checkable, every limitation is documented,
              and each figure comes with its method — so results can be
              challenged without anyone taking them on faith.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- the process ---- */}
      <section aria-label='How I work process' className='py-16 md:py-24'>
        <div className='mx-auto max-w-[1440px] px-5 sm:px-8'>
          <Reveal>
            <h2 className='display text-3xl md:text-5xl'>THE PROCESS</h2>
            <p className='label-mono text-faint'>EVIDENCE · REQUIREMENTS · TESTING · COMMUNICATION · HONESTY</p>
          </Reveal>
          <div className='mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3'>
            {
              [
                { step: 'DISCOVER', icon: '🔍', detail: 'Understand the genuine problem through research-first dialogue.' },
                { step: 'DEFINE', icon: '🎯', detail: 'Set clear, measurable requirements and success criteria.' },
                { step: 'RESEARCH', icon: '📚', detail: 'Investigate existing knowledge and identify knowledge gaps.' },
                { step: 'SPECIFY', icon: '📝', detail: 'Create detailed technical specifications and architecture plans.' },
                { step: 'DESIGN', icon: '🎨', detail: 'Design systems and components with precision and clarity.' },
                { step: 'BUILD', icon: '🔧', detail: 'Build functional prototypes and minimum viable systems.' },
                { step: 'TEST', icon: '✅', detail: 'Rigorously test against requirements and edge cases.' },
                { step: 'VALIDATE', icon: '🔬', detail: 'Validate results with independent verification when possible.' },
                { step: 'DELIVER', icon: '📦', detail: 'Deliver working systems with clear documentation and evidence.' },
                { step: 'ITERATE', icon: '🔄', detail: 'Incorporate feedback and improve based on real-world usage.' },
              ].map((item, i) => (
                <Reveal key={item.step} delay={i * 80}>
                  <Link
                    href='#'
                    className='group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface'
                  >
                  <div className='flex items-baseline justify-between'>
                    <span className='label-mono text-faint'>STEP / {String(i + 1).padStart(2, '0')}</span>
                    <span className='label-mono flex items-center gap-2 text-foreground'>
                      <span className='pulse-dot h-1.5 w-1.5 rounded-full bg-signal' aria-hidden='true' />
                      {item.icon}
                    </span>
                  </div>
                  <span className='display mt-6 block text-2xl md:text-4xl'>{item.step}</span>
                  <span className='mt-4 block flex-1 text-base leading-relaxed text-muted'>
                    {item.detail}
                  </span>
                  <span className='label-mono mt-auto pt-6 text-signal transition-transform duration-300 group-hover:translate-x-1'>
                    NEXT STEP →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- why this works ---- */}
      <section aria-label='Why this works' className='border-t border-line'>
        <div className='mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20'>
          <Reveal>
            <h2 className='display text-2xl md:text-4xl'>WHY THIS WORKS</h2>
          </Reveal>
          <div className='mt-12 grid gap-px bg-line md:grid-cols-2'>
            <div>
              <Reveal>
                <h3 className='display mt-4 text-xl'>DOCUMENTED WORK</h3>
              </Reveal>
              <p className='mt-4 text-base leading-relaxed text-muted'>
                Every claim points to work you can open — the builds, the lab
                instruments, the research entries. Results are labelled for what
                they are: backtested, simulated, measured, or illustrative.
              </p>
              <Link
                href='/proof'
                className='label-mono mt-6 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
              >
                SEE THE PROOF →
              </Link>
            </div>
            <div>
              <Reveal>
                <h3 className='display mt-4 text-xl'>TRANSPARENT LIMITATIONS</h3>
              </Reveal>
              <p className='mt-4 text-base leading-relaxed text-muted'>
                Limitations are written down next to results rather than buried.
                Unfinished work stays visible rather than being withheld.
                Negative results stay in the record as part of the learning process.
              </p>
              <Link
                href='/research'
                className='label-mono mt-6 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research'
              >
                SEE THE RESEARCH →
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
                <p className='display mt-2 text-2xl md:text-3xl'>SEE HOW I BUILD SYSTEMS</p>
              </div>
              <div className='flex flex-wrap gap-4'>
                <Link
                  href='/builds'
                  className='label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
                >
                  BUILDS →
                </Link>
                <Link
                  href='/lab'
                  className='label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal'
                >
                  ENTER LAB →
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
