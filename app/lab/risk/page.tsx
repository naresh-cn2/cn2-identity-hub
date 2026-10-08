import type { Metadata } from "next";
import { labModules } from "@/data/lab";
import LabShell from "@/components/lab/lab-shell";
import RiskCalculator from "@/components/lab/risk-calculator";

const mod = labModules.find((m) => m.href === "/lab/risk")!;

export const metadata: Metadata = {
  title: "Risk Simulator — Quant Lab",
  description:
    "Risk-first position sizing with explicit fee and slippage modelling: capital, risk %, entry, stop, target in — position size, capital at risk, R:R, cost and net risk out.",
  alternates: { canonical: "/lab/risk" },
};

export default function RiskLabPage() {
  return (
    <LabShell code={mod.code} name={mod.name} description={mod.description} inputs={mod.inputs} outputs={mod.outputs}>
      <RiskCalculator />
    </LabShell>
  );
}
