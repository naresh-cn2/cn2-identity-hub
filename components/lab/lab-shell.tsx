import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';

interface LabShellProps {
  code: string;
  name: string;
  description: string;
  inputs: readonly string[];
  outputs: readonly string[];
  status?: string;
  children: React.ReactNode;
}

/** Instrument enclosure for a lab module — header, I/O metadata, housing. */
export default function LabShell({ code, name, description, inputs, outputs, status, children }: LabShellProps) {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="signal" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-32 sm:px-8 md:pb-20 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                LAB <span className="text-signal">/</span> {code}
              </p>
              {status ? (
                <p className="label-mono flex items-center gap-2 text-foreground">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                  {status}
                </p>
              ) : null}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(2.6rem,8vw,6rem)]">{name}</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
              <p className="label-mono text-faint">IN — {inputs.join(" · ")}</p>
              <p className="label-mono text-faint">OUT — {outputs.join(" · ")}</p>
            </div>
          </Reveal>
        </div>
      </header>
      <section className="border-b border-line">
        <div className="scanlines relative mx-auto max-w-[1440px] px-5 py-14 sm:px-8 md:py-20">
          <Reveal>
            <div className="viz-frame p-4 md:p-8">
              <div className="relative z-10">
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
                  <p className="label-mono text-faint">
                    INSTRUMENT <span className="text-signal">/</span> {code}
                  </p>
                  <p className="label-mono text-faint">INPUTS DECLARED · OUTPUTS DERIVED</p>
                </div>
                {children}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
