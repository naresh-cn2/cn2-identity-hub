import Reveal from "@/components/ui/reveal";

interface SectionHeaderProps {
  act: string;
  code: string;
  title: string;
  subtitle?: string;
  meta?: string;
}

export default function SectionHeader({ act, code, title, subtitle, meta }: SectionHeaderProps) {
  return (
    <div className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6">
            <p className="label-mono text-muted">
              {act} <span className="text-signal">/</span> {code}
            </p>
            {meta && <p className="label-mono hidden text-faint md:block">{meta}</p>}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display mt-6 text-[clamp(2.6rem,7vw,5.5rem)]">{title}</h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
