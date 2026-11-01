import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import StorySteps from "@/components/motion/story-steps";
import ResearchArchive from "@/components/research/research-archive";
import GaussianManifold from "@/components/research/gaussian-manifold";
import { MethodChainStrip } from "@/components/research/method-chain";
import { researchEntries } from "@/data/research";
import { getArchiveProject } from "@/data/archive";
import { flagshipProjects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "My research explores how markets, quantitative methods, data and software systems interact — the questions I investigate, the methods I use, and the findings and limitations of each study.",
  alternates: { canonical: "/research" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Research — Bukya Naresh / CN2.dev",
    description:
      "Falsifiable market questions, deterministic methods, and the findings and limitations of each study.",
  },
};

const METHOD = [
  "QUESTION",
  "HYPOTHESIS",
  "METHOD",
  "EVIDENCE",
  "RESULT",
  "LIMITATION",
  "CONCLUSION",
] as const;

const STEP_BODY: Record<(typeof METHOD)[number], string> = {
  QUESTION:
    "What edge, if any, can be reproduced from market structure rather than assumed? Every study here starts with a falsifiable question, not a preferred answer.",
  HYPOTHESIS:
    "A specific claim about how a variable behaves — stated before the data is touched, so it can fail honestly.",
  METHOD:
    "The dataset, the model, the controls — every step spelled out before seeing results, so nothing is tuned to the outcome.",
  EVIDENCE:
    "Reproduced artifacts, out-of-sample checks, and the numbers that back the claim — published alongside the work.",
  RESULT:
    "What the evidence actually showed, including findings that were null or contrary to the hypothesis.",
  LIMITATION:
    "Where the evidence stops and what it cannot say — stated first, not buried in a footnote.",
  CONCLUSION:
    "The takeaway, stated plainly, with its confidence and caveats, and a link to the system that produced it.",
};

/** Top Method Pipeline Spine Header */
function MethodPipelineHeader({ highlight }: { highlight: number }) {
  return (
    <g className="method-pipeline-spine">
      {/* connecting spine */}
      <line
        x1="60"
        y1="34"
        x2="640"
        y2="34"
        stroke="var(--line-strong)"
        strokeWidth="1.5"
        opacity="0.35"
      />
      {METHOD.map((step, i) => {
        const x = 60 + (i * 580) / (METHOD.length - 1);
        const isActive = i === highlight;
        const isDone = i < highlight;
        return (
          <g key={step}>
            {isActive && (
              <circle
                cx={x}
                cy="34"
                r="13"
                fill="none"
                stroke="var(--signal)"
                strokeWidth="1"
                opacity="0.6"
              />
            )}
            <circle
              cx={x}
              cy="34"
              r={isActive ? 7 : isDone ? 5.5 : 4}
              fill={isActive ? "var(--signal)" : isDone ? "var(--research)" : "var(--muted)"}
              opacity={isDone || isActive ? 1 : 0.4}
              style={{ transition: "all 0.5s ease" }}
            />
            {i < METHOD.length - 1 && (
              <line
                x1={x + (isActive ? 13 : isDone ? 6 : 4)}
                y1="34"
                x2={x + (580 / (METHOD.length - 1)) - (i + 1 === highlight ? 13 : i + 1 < highlight ? 6 : 4)}
                y2="34"
                stroke={isDone ? "var(--research)" : "var(--line)"}
                strokeWidth="1.5"
                opacity={isDone ? 0.7 : 0.25}
              />
            )}
            <text
              x={x}
              y="56"
              textAnchor="middle"
              fontSize="9"
              letterSpacing="0.14em"
              fill={isActive ? "var(--foreground)" : isDone ? "var(--research)" : "var(--faint)"}
              style={{
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                fontWeight: isActive ? 600 : 400,
                opacity: isActive ? 1 : isDone ? 0.9 : 0.45,
                transition: "all 0.5s ease",
              }}
            >
              {step}
            </text>
          </g>
        );
      })}
      <line x1="24" y1="70" x2="676" y2="70" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
    </g>
  );
}

function StageQuestionVisual() {
  return (
    <g className="stage-visual stage-question">
      <text x="24" y="94" fill="var(--research)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        {"STAGE 01 // PROBLEM FORMULATION // EMPIRICAL FALSIFIABILITY"}
      </text>
      <text x="676" y="94" textAnchor="end" fill="var(--faint)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.06em">
        PRIOR UNCERTAINTY: H₀ ∩ H₁ = ∅
      </text>

      <rect x="24" y="108" width="652" height="344" fill="rgba(6,12,24,0.45)" stroke="var(--line-strong)" strokeWidth="1" />
      
      <line x1="24" y1="180" x2="676" y2="180" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
      <line x1="24" y1="260" x2="676" y2="260" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
      <line x1="24" y1="340" x2="676" y2="340" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
      <line x1="160" y1="108" x2="160" y2="452" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
      <line x1="320" y1="108" x2="320" y2="452" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
      <line x1="500" y1="108" x2="500" y2="452" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />

      <text x="36" y="126" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
        ▲ INFORMATION ARRIVAL DRIFT [λ_state]
      </text>
      <text x="510" y="442" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
        CROSS-SECTIONAL DISPERSION [σ] ▶
      </text>

      <polygon
        points="36,134 260,134 190,270 36,310"
        fill="rgba(230,57,42,0.06)"
        stroke="var(--signal)"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.7"
      />
      <text x="48" y="156" fill="var(--signal)" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)">
        SUBJECTIVE / OVERFIT REGION
      </text>
      <text x="48" y="172" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">
        P(Data | Belief) · Unbounded Prior
      </text>

      <path
        d="M 120,430 C 260,380 340,310 440,240 S 580,160 660,140"
        fill="none"
        stroke="var(--research)"
        strokeWidth="2"
      />
      <text
        x="290"
        y="316"
        fill="var(--research)"
        fontSize="9"
        fontFamily="var(--font-mono)"
        transform="rotate(-24, 290, 316)"
        letterSpacing="0.08em"
      >
        FALSIFICATION BOUNDARY ∂Ω_empirical
      </text>

      {[
        [280, 400], [330, 360], [370, 390], [410, 330],
        [460, 370], [490, 300], [530, 340], [560, 270],
        [600, 290], [630, 220], [645, 180],
      ].map(([px, py], idx) => (
        <circle key={idx} cx={px} cy={py} r="2.8" fill="var(--research)" opacity="0.65" />
      ))}

      <circle cx="450" cy="210" r="28" fill="none" stroke="var(--signal)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <circle cx="450" cy="210" r="14" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.7" />
      <circle cx="450" cy="210" r="4" fill="var(--signal)" />
      <line x1="416" y1="210" x2="484" y2="210" stroke="var(--signal)" strokeWidth="1" opacity="0.6" />
      <line x1="450" y1="176" x2="450" y2="244" stroke="var(--signal)" strokeWidth="1" opacity="0.6" />

      <g transform="translate(470, 184)">
        <rect x="0" y="0" width="186" height="48" fill="var(--background)" stroke="var(--signal)" strokeWidth="1" />
        <text x="10" y="18" fill="var(--foreground)" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">
          TARGET INQUIRY: Q₀
        </text>
        <text x="10" y="32" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
          Reproducible market edge?
        </text>
        <text x="10" y="42" fill="var(--research)" fontSize="7" fontFamily="var(--font-mono)">
          STATE: FALSIFIABLE PRIOR
        </text>
      </g>

      <line x1="24" y1="418" x2="676" y2="418" stroke="var(--line)" strokeWidth="1" opacity="0.4" />
      <text x="36" y="436" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">
        GOVERNANCE: REJECT BELIEFS WITHOUT TESTABLE FAILURE PATHWAYS · SHUFFLE TEST READY
      </text>
    </g>
  );
}

function StageHypothesisVisual() {
  return (
    <g className="stage-visual stage-hypothesis">
      <text x="24" y="94" fill="var(--research)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        {"STAGE 02 // STATISTICAL SPECIFICATION // DUAL DENSITY REGIME"}
      </text>
      <text x="676" y="94" textAnchor="end" fill="var(--faint)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.06em">
        SIGNIFICANCE THRESHOLD: α = 0.01 (z = 2.326)
      </text>

      <rect x="24" y="108" width="652" height="344" fill="rgba(6,12,24,0.45)" stroke="var(--line-strong)" strokeWidth="1" />
      <line x1="48" y1="368" x2="652" y2="368" stroke="var(--line-strong)" strokeWidth="1.2" />

      <path
        d="M 330,368 L 330,305 C 342,330 358,355 380,368 Z"
        fill="rgba(230,57,42,0.25)"
      />

      <path
        d="M 60,368 C 120,368 160,180 220,180 C 280,180 320,368 380,368"
        fill="none"
        stroke="var(--muted)"
        strokeWidth="1.6"
        strokeDasharray="4 4"
      />

      <path
        d="M 260,368 C 340,368 380,150 440,150 C 500,150 560,368 640,368"
        fill="url(#h1Grad)"
      />
      <path
        d="M 260,368 C 340,368 380,150 440,150 C 500,150 560,368 640,368"
        fill="none"
        stroke="var(--research)"
        strokeWidth="2.2"
      />

      <line x1="220" y1="180" x2="220" y2="368" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <circle cx="220" cy="180" r="3.5" fill="var(--muted)" />
      <text x="220" y="166" textAnchor="middle" fill="var(--muted)" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)">
        NULL H₀ (μ = 0.0)
      </text>

      <line x1="440" y1="150" x2="440" y2="368" stroke="var(--research)" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <circle cx="440" cy="150" r="4" fill="var(--research)" />
      <text x="440" y="136" textAnchor="middle" fill="var(--foreground)" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)">
        HYPOTHESIS H₁ (μ = +2.4σ)
      </text>

      <line x1="330" y1="126" x2="330" y2="368" stroke="var(--signal)" strokeWidth="1.8" strokeDasharray="3 3" />
      <rect x="290" y="116" width="80" height="20" fill="var(--signal)" rx="2" />
      <text x="330" y="130" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">
        α = 0.01 CUT
      </text>
      <text x="340" y="348" fill="var(--signal)" fontSize="8" fontFamily="var(--font-mono)">
        REJECTION TAIL
      </text>

      <g transform="translate(48, 382)">
        <rect x="0" y="0" width="170" height="52" fill="var(--background)" stroke="var(--line)" strokeWidth="1" />
        <text x="10" y="16" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">NULL SPECIFICATION</text>
        <text x="10" y="32" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-mono)">E[Excess Edge] ≤ 0.0 bps</text>
        <text x="10" y="44" fill="var(--muted)" fontSize="7" fontFamily="var(--font-mono)">Martingale Random Walk</text>
      </g>

      <g transform="translate(236, 382)">
        <rect x="0" y="0" width="190" height="52" fill="var(--background)" stroke="var(--research)" strokeWidth="1" />
        <text x="10" y="16" fill="var(--research)" fontSize="8" fontFamily="var(--font-mono)">DIRECTIONAL CLAIM</text>
        <text x="10" y="32" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-mono)">Spread Edge &gt; 1.8 bps (net)</text>
        <text x="10" y="44" fill="var(--muted)" fontSize="7" fontFamily="var(--font-mono)">Pre-registered before tick replay</text>
      </g>

      <g transform="translate(444, 382)">
        <rect x="0" y="0" width="186" height="52" fill="var(--background)" stroke="var(--line)" strokeWidth="1" />
        <text x="10" y="16" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">FALSIFICATION GATE</text>
        <text x="10" y="32" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-mono)">p &gt; 0.01 ⇒ DISCARD</text>
        <text x="10" y="44" fill="var(--signal)" fontSize="7" fontFamily="var(--font-mono)">No outcome parameter tuning</text>
      </g>
    </g>
  );
}

function StageMethodVisual() {
  return (
    <g className="stage-visual stage-method">
      <text x="24" y="94" fill="var(--research)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        {"STAGE 03 // PARTITION ARCHITECTURE // PURGED WALK-FORWARD ENGINE"}
      </text>
      <text x="676" y="94" textAnchor="end" fill="var(--faint)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.06em">
        LOOKAHEAD LEAKAGE: 0.00% AUDITED
      </text>

      <rect x="24" y="108" width="652" height="344" fill="rgba(6,12,24,0.45)" stroke="var(--line-strong)" strokeWidth="1" />

      <text x="50" y="132" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">T₀: 2021-01-01</text>
      <text x="350" y="132" textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">CHRONOLOGICAL TIMELINE</text>
      <text x="650" y="132" textAnchor="end" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">T_now: 2024-Q3</text>
      <line x1="50" y1="138" x2="650" y2="138" stroke="var(--line)" strokeWidth="1" />

      {/* Fold 01 */}
      <text x="50" y="158" fill="var(--research)" fontSize="8" fontFamily="var(--font-mono)">FOLD 01</text>
      <rect x="100" y="146" width="240" height="24" fill="rgba(255,255,255,0.04)" stroke="var(--line)" strokeWidth="1" />
      <text x="220" y="162" textAnchor="middle" fill="var(--foreground)" fontSize="8" fontFamily="var(--font-mono)">
        IN-SAMPLE TRAIN (60%)
      </text>
      <rect x="344" y="146" width="28" height="24" fill="rgba(230,57,42,0.18)" stroke="var(--signal)" strokeWidth="1" strokeDasharray="2 2" />
      <text x="358" y="162" textAnchor="middle" fill="var(--signal)" fontSize="7" fontWeight="bold" fontFamily="var(--font-mono)">GAP</text>
      <rect x="376" y="146" width="130" height="24" fill="rgba(45,212,191,0.15)" stroke="var(--research)" strokeWidth="1" />
      <text x="441" y="162" textAnchor="middle" fill="var(--research)" fontSize="8" fontWeight="600" fontFamily="var(--font-mono)">
        BLIND TEST
      </text>
      <rect x="510" y="146" width="140" height="24" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

      {/* Fold 02 */}
      <text x="50" y="194" fill="var(--research)" fontSize="8" fontFamily="var(--font-mono)">FOLD 02</text>
      <rect x="100" y="182" width="310" height="24" fill="rgba(255,255,255,0.04)" stroke="var(--line)" strokeWidth="1" />
      <text x="255" y="198" textAnchor="middle" fill="var(--foreground)" fontSize="8" fontFamily="var(--font-mono)">
        EXPANDING IN-SAMPLE TRAIN
      </text>
      <rect x="414" y="182" width="28" height="24" fill="rgba(230,57,42,0.18)" stroke="var(--signal)" strokeWidth="1" strokeDasharray="2 2" />
      <text x="428" y="198" textAnchor="middle" fill="var(--signal)" fontSize="7" fontWeight="bold" fontFamily="var(--font-mono)">GAP</text>
      <rect x="446" y="182" width="130" height="24" fill="rgba(45,212,191,0.15)" stroke="var(--research)" strokeWidth="1" />
      <text x="511" y="198" textAnchor="middle" fill="var(--research)" fontSize="8" fontWeight="600" fontFamily="var(--font-mono)">
        BLIND TEST
      </text>
      <rect x="580" y="182" width="70" height="24" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

      {/* Fold 03 */}
      <text x="50" y="230" fill="var(--research)" fontSize="8" fontFamily="var(--font-mono)">FOLD 03</text>
      <rect x="100" y="218" width="380" height="24" fill="rgba(255,255,255,0.04)" stroke="var(--line)" strokeWidth="1" />
      <text x="290" y="234" textAnchor="middle" fill="var(--foreground)" fontSize="8" fontFamily="var(--font-mono)">
        EXPANDING IN-SAMPLE TRAIN
      </text>
      <rect x="484" y="218" width="28" height="24" fill="rgba(230,57,42,0.18)" stroke="var(--signal)" strokeWidth="1" strokeDasharray="2 2" />
      <text x="498" y="234" textAnchor="middle" fill="var(--signal)" fontSize="7" fontWeight="bold" fontFamily="var(--font-mono)">GAP</text>
      <rect x="516" y="218" width="134" height="24" fill="rgba(45,212,191,0.15)" stroke="var(--research)" strokeWidth="1" />
      <text x="583" y="234" textAnchor="middle" fill="var(--research)" fontSize="8" fontWeight="600" fontFamily="var(--font-mono)">
        FINAL BLIND TEST
      </text>

      <line x1="48" y1="258" x2="652" y2="258" stroke="var(--line-strong)" strokeWidth="1" />

      <text x="50" y="278" fill="var(--foreground)" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)">
        {"EXECUTION REALISM CONTROLS // NON-IDEALIZED FRICTION"}
      </text>

      <g transform="translate(50, 290)">
        <rect x="0" y="0" width="186" height="52" fill="var(--background)" stroke="var(--line)" strokeWidth="1" />
        <text x="12" y="16" fill="var(--research)" fontSize="8" fontFamily="var(--font-mono)">SLIPPAGE MODEL</text>
        <text x="12" y="30" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-mono)">Half-Spread + Impact(Q)</text>
        <text x="12" y="42" fill="var(--muted)" fontSize="7" fontFamily="var(--font-mono)">Queue Position Degradation</text>
      </g>

      <g transform="translate(250, 290)">
        <rect x="0" y="0" width="186" height="52" fill="var(--background)" stroke="var(--line)" strokeWidth="1" />
        <text x="12" y="16" fill="var(--research)" fontSize="8" fontFamily="var(--font-mono)">LATENCY BUFFER</text>
        <text x="12" y="30" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-mono)">4.2 ms Fixed POSIX Tick</text>
        <text x="12" y="42" fill="var(--muted)" fontSize="7" fontFamily="var(--font-mono)">Clamped Network Delay</text>
      </g>

      <g transform="translate(450, 290)">
        <rect x="0" y="0" width="186" height="52" fill="var(--background)" stroke="var(--signal)" strokeWidth="1" />
        <text x="12" y="16" fill="var(--signal)" fontSize="8" fontFamily="var(--font-mono)">TRANSACTION FEES</text>
        <text x="12" y="30" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-mono)">1.2 bps Maker / 3.0 bps Taker</text>
        <text x="12" y="42" fill="var(--muted)" fontSize="7" fontFamily="var(--font-mono)">Exchange Tier 1 Burden</text>
      </g>

      <text x="50" y="364" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">
        DATA SOURCE: FULL L2 TICK LOGS · REPLAY ENGINE: DETERMINISTIC C++ PIPELINE
      </text>
      <text x="50" y="378" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">
        LEAKAGE CHECK: PREVENT INFORMATION LEAK VIA SERIAL CORRELATION PURGING (500-TICK EMBARGO)
      </text>
    </g>
  );
}

function StageEvidenceVisual() {
  return (
    <g className="stage-visual stage-evidence">
      <text x="24" y="94" fill="var(--research)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        {"STAGE 04 // EMPIRICAL PROOF // BLIND OOS PERFORMANCE TRACE"}
      </text>
      <text x="676" y="94" textAnchor="end" fill="var(--faint)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.06em">
        DETERMINISTIC FIXTURE: 14,820 ROUND TRIPS
      </text>

      <rect x="24" y="108" width="652" height="344" fill="rgba(6,12,24,0.45)" stroke="var(--line-strong)" strokeWidth="1" />

      <line x1="50" y1="180" x2="650" y2="180" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
      <line x1="50" y1="230" x2="650" y2="230" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
      <line x1="50" y1="285" x2="650" y2="285" stroke="var(--line)" strokeWidth="0.8" opacity="0.5" />
      <text x="652" y="289" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">0.0% NAV</text>
      <text x="652" y="184" fill="var(--research)" fontSize="8" fontFamily="var(--font-mono)">+25.0%</text>

      <path
        d="M 60,285 L 110,281 L 160,289 L 210,273 L 260,299 L 310,287 L 360,295 L 410,275 L 460,291 L 510,277 L 560,287 L 620,279"
        fill="none"
        stroke="var(--muted)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        opacity="0.6"
      />
      <text x="510" y="302" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
        MARKET BENCHMARK (+2.1%)
      </text>

      <path
        d="M 60,285 L 100,271 L 140,259 L 180,263 L 220,237 L 260,223 L 300,229 L 340,203 L 380,187 L 420,171 L 460,177 L 500,151 L 540,139 L 580,129 L 620,117 L 620,285 L 60,285 Z"
        fill="url(#evidenceGrad)"
      />
      <path
        d="M 60,285 L 100,271 L 140,259 L 180,263 L 220,237 L 260,223 L 300,229 L 340,203 L 380,187 L 420,171 L 460,177 L 500,151 L 540,139 L 580,129 L 620,117"
        fill="none"
        stroke="var(--research)"
        strokeWidth="2.4"
      />
      <circle cx="620" cy="117" r="4.5" fill="var(--signal)" />
      <text x="510" y="112" fill="var(--foreground)" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">
        STRATEGY OOS (+38.4%)
      </text>

      <line x1="50" y1="325" x2="650" y2="325" stroke="var(--line-strong)" strokeWidth="1" />
      <text x="50" y="318" fill="var(--signal)" fontSize="8" fontFamily="var(--font-mono)">
        UNDERWATER DRAWDOWN TRACE (MAX -3.8%)
      </text>
      <path
        d="M 60,325 L 100,333 L 140,325 L 220,341 L 260,349 L 300,325 L 380,337 L 420,325 L 500,331 L 540,325 L 620,325 Z"
        fill="rgba(230,57,42,0.2)"
        stroke="var(--signal)"
        strokeWidth="1.2"
      />

      <g transform="translate(50, 126)">
        <rect x="0" y="0" width="190" height="44" fill="var(--background)" stroke="var(--line)" strokeWidth="1" />
        <text x="10" y="16" fill="var(--research)" fontSize="8" fontFamily="var(--font-mono)">SHA-256 REPLAY PROOF</text>
        <text x="10" y="28" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-mono)">HASH: 0x9f88d3d8c2e...</text>
        <text x="10" y="38" fill="var(--faint)" fontSize="7" fontFamily="var(--font-mono)">Deterministic Bit-Identical Replay</text>
      </g>

      <g transform="translate(50, 386)">
        <text x="0" y="14" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">
          EXECUTION TRADES: 14,820 · WIN RATE: 58.4% · PROFIT FACTOR: 1.82 · SHARPE: 2.18 · CALMAR: 4.62
        </text>
        <text x="0" y="28" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">
          ALL NUMBERS NET OF SLIPPAGE (1.2 BPS) AND COMMISSIONS · NO IN-SAMPLE ESTIMATION USED
        </text>
      </g>
    </g>
  );
}

function StageResultVisual() {
  return (
    <g className="stage-visual stage-result">
      <text x="24" y="94" fill="var(--research)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        {"STAGE 05 // QUANTITATIVE OUTCOME // STATISTICAL INFERENCE"}
      </text>
      <text x="676" y="94" textAnchor="end" fill="var(--signal)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.06em">
        t-STAT: +3.48 · p = 0.0005 (SIGNIFICANT)
      </text>

      <rect x="24" y="108" width="652" height="344" fill="rgba(6,12,24,0.45)" stroke="var(--line-strong)" strokeWidth="1" />

      <text x="48" y="132" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
        EMPIRICAL RETURN PER TRADE SPREAD [BPS]
      </text>
      <line x1="48" y1="368" x2="420" y2="368" stroke="var(--line-strong)" strokeWidth="1.2" />
      <line x1="210" y1="140" x2="210" y2="368" stroke="var(--signal)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <text x="210" y="380" textAnchor="middle" fill="var(--signal)" fontSize="8" fontFamily="var(--font-mono)">0.0 bps</text>

      {[
        { x: 60, h: 10, pos: false },
        { x: 84, h: 22, pos: false },
        { x: 108, h: 48, pos: false },
        { x: 132, h: 84, pos: false },
        { x: 156, h: 126, pos: false },
        { x: 180, h: 160, pos: false },
        { x: 216, h: 195, pos: true },
        { x: 240, h: 220, pos: true },
        { x: 264, h: 205, pos: true },
        { x: 288, h: 172, pos: true },
        { x: 312, h: 128, pos: true },
        { x: 336, h: 86, pos: true },
        { x: 360, h: 50, pos: true },
        { x: 384, h: 24, pos: true },
      ].map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={368 - bar.h}
          width="20"
          height={bar.h}
          fill={bar.pos ? "rgba(45,212,191,0.28)" : "rgba(255,255,255,0.06)"}
          stroke={bar.pos ? "var(--research)" : "var(--line)"}
          strokeWidth="1"
        />
      ))}

      <path
        d="M 50,364 Q 100,358 132,320 T 180,208 T 240,148 T 288,196 T 340,282 T 404,364"
        fill="none"
        stroke="var(--signal)"
        strokeWidth="2"
      />
      <text x="240" y="138" textAnchor="middle" fill="var(--foreground)" fontSize="8" fontWeight="600" fontFamily="var(--font-mono)">
        POSITIVE SKEW (+0.84σ)
      </text>

      <rect x="440" y="124" width="216" height="308" fill="var(--background)" stroke="var(--line-strong)" strokeWidth="1" />
      <rect x="440" y="124" width="216" height="28" fill="rgba(45,212,191,0.08)" />
      <text x="452" y="142" fill="var(--research)" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">
        OUTCOME METRIC REGISTER
      </text>

      {[
        ["SAMPLE SIZE", "N = 14,820 trades"],
        ["MEAN RETURN", "+1.84 bps / trade"],
        ["t-STATISTIC", "+3.48 (p = 0.0005)"],
        ["SHARPE RATIO", "2.18 annualized"],
        ["SORTINO RATIO", "3.04 downside"],
        ["PROFIT FACTOR", "1.82 (net)"],
        ["WIN RATE", "58.4% execution"],
        ["NULL HYPOTHESIS", "REJECTED (99.95%)"],
        ["RESULT STATUS", "VERIFIED EMPIRICAL"],
      ].map(([label, val], idx) => (
        <g key={label} transform={`translate(452, ${172 + idx * 26})`}>
          <text x="0" y="0" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">{label}</text>
          <text
            x="192"
            y="0"
            textAnchor="end"
            fill={idx === 2 || idx === 7 || idx === 8 ? "var(--signal)" : "var(--foreground)"}
            fontSize="8"
            fontWeight={idx === 2 || idx === 7 || idx === 8 ? "bold" : "normal"}
            fontFamily="var(--font-mono)"
          >
            {val}
          </text>
          <line x1="0" y1="6" x2="192" y2="6" stroke="var(--line)" strokeWidth="0.6" opacity="0.4" />
        </g>
      ))}

      <text x="48" y="420" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">
        OUTCOME REPRODUCED ACROSS 3 INDEPENDENT ASSET CLASSES · ZERO EVIDENCE SUPPRESSION
      </text>
    </g>
  );
}

function StageLimitationVisual() {
  return (
    <g className="stage-visual stage-limitation">
      <text x="24" y="94" fill="var(--signal)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        {"STAGE 06 // BOUNDARY CONDITIONS // KNOWN DEGRADATION ENVELOPE"}
      </text>
      <text x="676" y="94" textAnchor="end" fill="var(--signal)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.06em">
        CAPACITY CEILING: $2.4M ADV BREAKDOWN
      </text>

      <rect x="24" y="108" width="652" height="344" fill="rgba(6,12,24,0.45)" stroke="var(--line-strong)" strokeWidth="1" />

      <text x="48" y="132" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
        REGIME STABILITY MAP [VOLATILITY vs SPREAD]
      </text>
      <rect x="48" y="144" width="280" height="200" fill="var(--background)" stroke="var(--line-strong)" strokeWidth="1" />

      {/* Safe Zone */}
      <rect x="49" y="244" width="139" height="99" fill="rgba(45,212,191,0.08)" />
      <text x="60" y="264" fill="var(--research)" fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)">
        STABLE ZONE (OPERATIONAL)
      </text>
      <text x="60" y="278" fill="var(--faint)" fontSize="7" fontFamily="var(--font-mono)">
        Vol &lt; 22% · Spread &lt; 2.2 bps
      </text>
      <text x="60" y="290" fill="var(--muted)" fontSize="7" fontFamily="var(--font-mono)">
        Expected Net: +1.84 bps
      </text>

      {/* Vol shock */}
      <rect x="189" y="244" width="138" height="99" fill="rgba(255,255,255,0.03)" />
      <text x="198" y="264" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
        VOLATILITY SHOCK
      </text>
      <text x="198" y="278" fill="var(--faint)" fontSize="7" fontFamily="var(--font-mono)">
        Vol &gt; 35% · Edge decays -50%
      </text>

      {/* Wide spread */}
      <rect x="49" y="145" width="139" height="98" fill="rgba(255,255,255,0.03)" />
      <text x="60" y="166" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
        WIDE SPREAD ZONE
      </text>
      <text x="60" y="180" fill="var(--faint)" fontSize="7" fontFamily="var(--font-mono)">
        Friction reduces signal 40%
      </text>

      {/* Critical Failure */}
      <rect x="189" y="145" width="138" height="98" fill="rgba(230,57,42,0.18)" stroke="var(--signal)" strokeWidth="1" />
      <text x="198" y="166" fill="var(--signal)" fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)">
        CRITICAL FAILURE REGIME
      </text>
      <text x="198" y="180" fill="var(--foreground)" fontSize="7" fontFamily="var(--font-mono)">
        Vol &gt; 40% &amp; Spread &gt; 4 bps
      </text>
      <text x="198" y="192" fill="var(--signal)" fontSize="7" fontFamily="var(--font-mono)">
        EDGE COLLAPSES (NEGATIVE)
      </text>

      <line x1="188" y1="144" x2="188" y2="344" stroke="var(--line)" strokeWidth="1" />
      <line x1="48" y1="244" x2="328" y2="244" stroke="var(--line)" strokeWidth="1" />

      {/* Capacity Curve */}
      <text x="360" y="132" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
        LIQUIDITY CAPACITY DEGRADATION [ADV]
      </text>
      <line x1="360" y1="310" x2="650" y2="310" stroke="var(--line)" strokeWidth="1" />
      <text x="652" y="314" fill="var(--faint)" fontSize="8" fontFamily="var(--font-mono)">0.0 bps</text>

      <path
        d="M 370,170 C 420,176 460,200 500,240 S 550,310 600,344 L 640,360"
        fill="none"
        stroke="var(--signal)"
        strokeWidth="2.2"
      />
      <circle cx="550" cy="310" r="5" fill="var(--signal)" />
      <line x1="550" y1="144" x2="550" y2="344" stroke="var(--signal)" strokeWidth="1" strokeDasharray="3 3" />
      <rect x="510" y="150" width="80" height="22" fill="var(--signal)" rx="2" />
      <text x="550" y="164" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)">
        $2.4M LIMIT
      </text>

      <text x="370" y="160" fill="var(--research)" fontSize="8" fontFamily="var(--font-mono)">
        Low Impact: +2.1 bps
      </text>
      <text x="560" y="336" fill="var(--signal)" fontSize="8" fontFamily="var(--font-mono)">
        Edge = 0 (Impact dominates)
      </text>

      <g transform="translate(48, 360)">
        <rect x="0" y="0" width="280" height="74" fill="var(--background)" stroke="var(--signal)" strokeWidth="1" />
        <text x="12" y="18" fill="var(--signal)" fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)">
          LIMITATION 01: ADVERSE SELECTION
        </text>
        <text x="12" y="32" fill="var(--foreground)" fontSize="8" fontFamily="var(--font-mono)">
          Order fills at back of book decay 48% faster.
        </text>
        <text x="12" y="46" fill="var(--muted)" fontSize="7" fontFamily="var(--font-mono)">
          Must cancel before queue depletion to survive.
        </text>
        <text x="12" y="60" fill="var(--faint)" fontSize="7" fontFamily="var(--font-mono)">
          Stated openly: NOT suited for low-speed routing.
        </text>
      </g>

      <g transform="translate(360, 360)">
        <rect x="0" y="0" width="292" height="74" fill="var(--background)" stroke="var(--line-strong)" strokeWidth="1" />
        <text x="12" y="18" fill="var(--research)" fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)">
          LIMITATION 02: CAPACITY CEILING
        </text>
        <text x="12" y="32" fill="var(--foreground)" fontSize="8" fontFamily="var(--font-mono)">
          Hard cap at $2.4M daily turnover.
        </text>
        <text x="12" y="46" fill="var(--muted)" fontSize="7" fontFamily="var(--font-mono)">
          Square-root market impact wipes alpha above this.
        </text>
        <text x="12" y="60" fill="var(--faint)" fontSize="7" fontFamily="var(--font-mono)">
          No misleading claim of unlimited institutional size.
        </text>
      </g>
    </g>
  );
}

function StageConclusionVisual() {
  return (
    <g className="stage-visual stage-conclusion">
      <text x="24" y="94" fill="var(--research)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        {"STAGE 07 // PRODUCTION SYNTHESIS // IMMUTABLE GATE PROMOTION"}
      </text>
      <text x="676" y="94" textAnchor="end" fill="var(--research)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.06em">
        STATUS: 5 OF 5 GATES PASSED
      </text>

      <rect x="24" y="108" width="652" height="344" fill="rgba(6,12,24,0.45)" stroke="var(--line-strong)" strokeWidth="1" />

      <text x="48" y="132" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
        PRODUCTION PROMOTION VERIFICATION GATES
      </text>

      {[
        { gate: "GATE 01", name: "FALSIFIABLE CLAIM AUDIT", desc: "Hypothesis locked pre-data without tuning" },
        { gate: "GATE 02", name: "ZERO LOOKAHEAD LEAKAGE", desc: "Purged & embargoed chronological split" },
        { gate: "GATE 03", name: "STATISTICAL SIGNIFICANCE", desc: "p = 0.0005 < 0.01 threshold confirmed" },
        { gate: "GATE 04", name: "FRICTION & SLIPPAGE TOLERANCE", desc: "Edge survives 2x realistic cost shock" },
        { gate: "GATE 05", name: "STATED BOUNDARIES & LIMITS", desc: "Hard $2.4M capacity cap declared in code" },
      ].map((gItem, idx) => (
        <g key={gItem.gate} transform={`translate(48, ${144 + idx * 56})`}>
          <rect x="0" y="0" width="340" height="48" fill="var(--background)" stroke="var(--line)" strokeWidth="1" />
          <text x="12" y="18" fill="var(--research)" fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)">
            {`${gItem.gate} // ${gItem.name}`}
          </text>
          <text x="12" y="34" fill="var(--muted)" fontSize="7.5" fontFamily="var(--font-mono)">
            {gItem.desc}
          </text>
          <rect x="274" y="14" width="54" height="20" fill="rgba(45,212,191,0.15)" stroke="var(--research)" strokeWidth="1" rx="2" />
          <text x="301" y="27" textAnchor="middle" fill="var(--research)" fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)">
            ✓ PASS
          </text>
        </g>
      ))}

      <rect x="410" y="144" width="246" height="272" fill="var(--background)" stroke="var(--research)" strokeWidth="1.2" />

      <circle cx="533" cy="226" r="46" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
      <circle cx="533" cy="226" r="38" fill="rgba(45,212,191,0.06)" stroke="var(--research)" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="533" cy="226" r="28" fill="none" stroke="var(--signal)" strokeWidth="1.2" />
      <circle cx="533" cy="226" r="8" fill="var(--research)" />

      <text x="533" y="292" textAnchor="middle" fill="var(--foreground)" fontSize="10" fontWeight="bold" fontFamily="var(--font-mono)">
        PROMOTED TO PRODUCTION
      </text>
      <text x="533" y="308" textAnchor="middle" fill="var(--research)" fontSize="8" fontFamily="var(--font-mono)">
        TARGET: APEX QUANT ENGINE
      </text>

      <line x1="430" y1="324" x2="636" y2="324" stroke="var(--line)" strokeWidth="0.8" opacity="0.5" />

      <text x="430" y="344" fill="var(--faint)" fontSize="7.5" fontFamily="var(--font-mono)">
        IMMUTABLE RELEASE COMMIT:
      </text>
      <text x="430" y="358" fill="var(--foreground)" fontSize="8.5" fontWeight="600" fontFamily="var(--font-mono)">
        SHA-256: 0x41132f6a7d8e...
      </text>
      <text x="430" y="374" fill="var(--muted)" fontSize="7.5" fontFamily="var(--font-mono)">
        DETERMINISTIC FIXTURE SEED: #441
      </text>
      <text x="430" y="388" fill="var(--research)" fontSize="7.5" fontFamily="var(--font-mono)">
        LOCKED EVIDENCE CHAIN · UNMODIFIABLE
      </text>
    </g>
  );
}

/** Research story scene — one node per stage, the highlighted stage is lit with full quantitative schematic. */
function ResearchScene({ highlight, isStickySlot }: { highlight: number; isStickySlot?: boolean }) {
  const isFirst = highlight === 0;
  // In desktop sticky slot, scenes.slice(1) are absolute inset: 0 inside viz-frame,
  // so they need p-6 to match scenes[0]'s padding inside viz-frame p-6.
  const containerClass = isStickySlot && !isFirst ? "w-full h-full p-6 flex flex-col justify-center" : "w-full";

  return (
    <div className={containerClass}>
      <svg
        viewBox="0 0 700 470"
        className="w-full max-w-[620px] mx-auto h-auto"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="evidenceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--research)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--research)" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="h1Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--research)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--research)" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <MethodPipelineHeader highlight={highlight} />

        {highlight === 0 && <StageQuestionVisual />}
        {highlight === 1 && <StageHypothesisVisual />}
        {highlight === 2 && <StageMethodVisual />}
        {highlight === 3 && <StageEvidenceVisual />}
        {highlight === 4 && <StageResultVisual />}
        {highlight === 5 && <StageLimitationVisual />}
        {highlight === 6 && <StageConclusionVisual />}
      </svg>
    </div>
  );
}

/** Compact mobile scene — one node at a time in the story stack, hidden on desktop. */
function ResearchSceneMobile({ index, step }: { index: number; step: (typeof METHOD)[number] }) {
  return (
    <div className="flex items-center gap-3 text-muted label-mono mb-6 lg:hidden">
      <span className="h-8 w-8 rounded-full border border-line-strong flex items-center justify-center text-[10px]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-xs">{step}</span>
    </div>
  );
}

/** Research-method spine — the visual language of this page, distinct from every other section. */
function MethodSpine() {
  return (
    <svg
      viewBox="0 0 840 96"
      className="h-auto w-full"
      role="img"
      aria-label={`Research method: ${METHOD.join(" then ")}`}
    >
      <line x1="24" y1="30" x2="816" y2="30" stroke="var(--research)" strokeWidth="1" opacity="0.45" />
      {METHOD.map((step, i) => {
        const x = 24 + (i * 792) / (METHOD.length - 1);
        const last = i === METHOD.length - 1;
        return (
          <g key={step}>
            <circle
              cx={x}
              cy="30"
              r={last ? 7 : 4.5}
              fill={last ? "var(--signal)" : "var(--research)"}
            />
            <line x1={x} y1="34" x2={x} y2="46" stroke="var(--line-strong)" strokeWidth="1" />
            <text
              x={x}
              y="64"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="0.14em"
              fill={last ? "var(--signal)" : "var(--muted)"}
              style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
            >
              {step}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ResearchPage() {
  const ongoing = researchEntries.filter((e) => e.status === "ONGOING").length;
  const verified = researchEntries.filter((e) => e.status === "VERIFIED").length;
  const featured = researchEntries[0];
  const featuredBuild = featured.relatedProject
    ? getArchiveProject(featured.relatedProject)
    : undefined;

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="lattice" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                DOMAIN <span className="text-research">/</span> RESEARCH
              </p>
              <p className="label-mono text-faint">
                {researchEntries.length} ENTRIES · {verified} VERIFIED · {ongoing} ONGOING
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Reveal delay={100}>
                <KineticText className="display text-[clamp(3rem,10vw,8rem)]">QUESTIONS INTO EVIDENCE.</KineticText>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                  I investigate how markets, quantitative methods, data and software systems
                  interact. Every entry follows the same spine — question, hypothesis, method,
                  evidence, result, limitation and conclusion — including the ones still in progress
                  and the ones whose answer is a limitation rather than a finding.
                </p>
              </Reveal>
            </div>
            <Reveal delay={240}>
              <div className="viz-frame p-4">
                <GaussianManifold />
                <p className="label-mono mt-3 text-center text-[10px] text-faint">
                  GAUSSIAN PROBABILITY MANIFOLD · DENSITY DISTRIBUTION
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-14 max-w-5xl">
              <MethodSpine />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- scroll-driven research story --------------------------------- */}
      <section aria-label="Research process" className="border-b border-line py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <StorySteps
            steps={METHOD.map((step, i) => ({
              id: `research-step-${step.toLowerCase()}`,
              label: `STAGE ${String(i + 1).padStart(2, "0")}`,
              title: step,
              body: STEP_BODY[step],
            }))}
            scenes={METHOD.map((_, i) => (
              <ResearchScene key={i} highlight={i} isStickySlot />
            ))}
            mobileScenes={METHOD.map((step, i) => (
              <ResearchSceneMobile key={i} index={i} step={step} />
            ))}
            accent="var(--research)"
            ariaLabel="Research process: question, hypothesis, method, evidence, result, limitation, conclusion"
          />
        </div>
      </section>

      {/* ---- featured investigation ---- */}
      <section aria-label="Featured investigation" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="label-mono text-research">FEATURED INVESTIGATION</p>
                <h2 className="display mt-4 max-w-4xl text-3xl md:text-5xl">{featured.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="label-mono text-research">{featured.category}</span>
                <span className="label-mono border border-line-strong px-2 py-1 text-foreground">
                  {featured.status}
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground md:text-xl">
              {featured.question}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="viz-frame mt-10 p-5 md:p-8">
              <div className="relative">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="label-mono text-faint">METHOD CHAIN — {featured.status} AT THE TERMINAL NODE</p>
                  {featuredBuild && (
                    <p className="label-mono text-faint">
                      EVIDENCE SOURCE —{" "}
                      <Link href={`/work/${featuredBuild.id}`} className="link-line text-research">
                        {featuredBuild.shortTitle}
                      </Link>
                    </p>
                  )}
                </div>
                <MethodChainStrip entry={featured} className="mt-4" />

                <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-2 md:gap-12">
                  <div>
                    <p className="label-mono text-research">METHOD</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{featured.method}</p>
                    <p className="label-mono mt-6 text-research">EVIDENCE</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{featured.evidence}</p>
                  </div>
                  <div>
                    <p className="label-mono text-research">RESULT</p>
                    <p className="mt-3 text-base leading-relaxed text-foreground">{featured.result}</p>
                    <p className="label-mono mt-6 text-signal">LIMITATION</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{featured.limitation}</p>
                    <p className="label-mono mt-6 text-foreground">CONCLUSION</p>
                    <p className="mt-3 text-base font-medium leading-relaxed text-foreground">
                      {featured.conclusion}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-line pt-6">
                  <Link
                    href={`/research/${featured.id}`}
                    className="label-mono inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research"
                  >
                    OPEN THE FULL ENTRY →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- reading guidance ---- */}
      <section aria-label="How entries are structured" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-16">
          <div className="grid gap-8 md:grid-cols-[16rem_1fr] md:gap-16">
            <Reveal>
              <p className="label-mono text-research">HOW ENTRIES ARE STRUCTURED</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid gap-6 sm:grid-cols-2">
                <p className="text-base leading-relaxed text-muted">
                  Each entry carries one of three statuses.{" "}
                  <span className="text-foreground">VERIFIED</span> — reproduced against the artifact.{" "}
                  <span className="text-foreground">DOCUMENTED</span> — written up from real work,
                  with limits stated. <span className="text-signal">ONGOING</span> — the question is
                  registered and the answer does not exist yet.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  Every entry states its question, method, evidence, result and limitation —
                  including entries still in progress, which are marked as such and published
                  alongside completed work.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- archive ---- */}
      <section aria-label="Research archive" className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">THE ARCHIVE</h2>
              <p className="label-mono text-faint">EXPAND ANY ENTRY TO READ THE FULL CHAIN</p>
            </div>
          </Reveal>
        </div>
        <div className="mt-12">
          <ResearchArchive entries={researchEntries} />
        </div>
      </section>

      {/* ---- research produced by builds ---- */}
      <section aria-label="Builds producing research" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <p className="label-mono text-faint">WHERE THE EVIDENCE COMES FROM</p>
            <h2 className="display mt-4 text-2xl md:text-4xl">BUILT SYSTEMS</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Most entries here exist because a system was built that could answer the question.
              The builds are the evidence source; the research is what the evidence turned out to
              mean.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {flagshipProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <Link
                  href={`/work/${p.id}`}
                  className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                >
                  <span className="num-mono text-xs text-faint">{p.index}</span>
                  <span className="display mt-3 text-lg">{p.shortTitle}</span>
                  <span className="mt-3 text-sm leading-relaxed text-muted">{p.thesis}</span>
                  <span className="label-mono mt-auto pt-6 text-research transition-transform duration-300 group-hover:translate-x-1">
                    OPEN PROJECT →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- continuation ---- */}
      <section aria-label="Continue" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">NEXT</p>
                <p className="display mt-2 text-2xl md:text-3xl">
                  READ THE WRITING OR RUN THE INSTRUMENTS
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/articles"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  ARTICLES →
                </Link>
                <Link
                  href="/about#capability-map"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  CAPABILITIES →
                </Link>
                <Link
                  href="/lab"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  ENTER LAB →
                </Link>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  GITHUB →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
