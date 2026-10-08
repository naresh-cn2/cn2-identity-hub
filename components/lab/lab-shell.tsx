import Reveal from "@/components/ui/reveal";

interface LabShellProps {
  code: string;
  name: string;
  description: string;
  inputs: readonly string[];
  outputs: readonly string[];
  children: React.ReactNode;
}

/** Instrument enclosure for a lab module — header, I/O metadata, body. */
export default function LabShell({ code, name, description, inputs, outputs, children }: LabShellProps) {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-32 sm:px-8 md:pb-20 md:pt-40">
          <Reveal>
            <p className="label-mono text-muted">
              LAB <span className="text-signal">/</span> {code}
            </p>
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
          {children}
        </div>
      </section>
    </>
  );
}
