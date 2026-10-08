import type { Metadata } from "next";
import { labModules } from "@/data/lab";
import LabShell from "@/components/lab/lab-shell";
import StrategyVisualizer from "@/components/lab/strategy-visualizer";

const mod = labModules.find((m) => m.href === "/lab/strategy")!;

export const metadata: Metadata = {
  title: "Strategy Visualizer — Quant Lab",
  description:
    "R:R geometry and break-even win rate for systematic setups — drag entry, stop and target and read the structure the pipeline would admit or reject.",
  alternates: { canonical: "/lab/strategy" },
};

export default function StrategyLabPage() {
  return (
    <LabShell code={mod.code} name={mod.name} description={mod.description} inputs={mod.inputs} outputs={mod.outputs}>
      <StrategyVisualizer />
    </LabShell>
  );
}
