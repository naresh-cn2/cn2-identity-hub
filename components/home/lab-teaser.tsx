import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import Reveal from "@/components/ui/reveal";
import { labModules } from "@/data/lab";

export default function LabTeaser() {
  return (
    <section aria-label="Quant lab">
      <SectionHeader
        act="ACT V"
        code="LAB"
        title="QUANT LAB"
        subtitle="Interactive instruments, not screenshots. Every module runs real arithmetic in your browser."
        meta="05 MODULES / OPERATIONAL"
      />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {labModules.map((mod, i) => (
            <Reveal key={mod.id} delay={i * 80}>
              <Link
                href={mod.href}
                className="scanlines group corner-ticks relative flex h-full flex-col border border-line bg-surface p-8 transition-colors duration-300 hover:border-line-strong"
              >
                <div className="flex items-baseline justify-between">
                  <p className="num-mono text-xs text-signal">{mod.code}</p>
                  <p className="num-mono text-[10px] text-faint">{mod.status}</p>
                </div>
                <h3 className="display mt-5 text-2xl transition-transform duration-300 group-hover:translate-x-1">
                  {mod.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{mod.description}</p>
                <div className="mt-auto grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
                  <div>
                    <p className="label-mono text-[10px] text-faint">INPUTS</p>
                    <p className="num-mono mt-2 text-[10px] leading-relaxed text-muted">
                      {mod.inputs.join(" · ")}
                    </p>
                  </div>
                  <div>
                    <p className="label-mono text-[10px] text-faint">OUTPUTS</p>
                    <p className="num-mono mt-2 text-[10px] leading-relaxed text-muted">
                      {mod.outputs.join(" · ")}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
