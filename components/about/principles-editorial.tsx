import Reveal from "@/components/ui/reveal";
import { principles } from "@/data/about";

/* Working principles as a premium editorial list: large typography,
   hairline rhythm, progressive reveal. No cards, no ornament. */

export default function PrinciplesEditorial() {
  return (
    <ol className="mt-14 border-t border-line">
      {principles.map((p, i) => (
        <li key={p.n} className="border-b border-line">
          <Reveal delay={Math.min(i, 4) * 70}>
            <div className="group grid gap-2 py-8 md:grid-cols-[5rem_1fr_1.15fr] md:items-baseline md:gap-10">
              <span className="num-mono text-sm text-signal">{p.n}</span>
              <h3 className="display text-2xl leading-tight transition-colors duration-300 group-hover:text-signal md:text-3xl">
                {p.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
