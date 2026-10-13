"use client";

import { useId, useRef } from "react";

/**
 * PosterPlate — cinematic "touchable images" for the text-only heroes.
 *
 * Each variant is a hand-built SVG scene in the home/about visual language:
 * deep-space plate, portal glow, rim light, restrained red accents — the
 * photographic grade rendered as vector art so it stays crisp, theme-safe
 * and alive in both modes (the plate itself carries its own dark grade,
 * the way the about page's stage does).
 *
 * Interactivity ("touchable, working"):
 *   - pointer parallax — three depth layers translate against the cursor
 *     (fine pointers and touch drags both drive it; honouring reduced-motion)
 *   - pointer light — a soft radial glow follows the cursor across the plate
 *   - press response — a brief brightness lift on pointerdown
 *   - ambient cycles run on the slow 10-20s band the rest of the site uses
 *
 * Scenes are decorative: the plate is one `role="img"` node with a written
 * description, no focusable children, no data the page doesn't already state
 * in text. That keeps the a11y contract simple — nothing to tab through,
 * nothing to lose.
 */

export type PosterVariant = "vault" | "threshold" | "bench" | "reserve" | "route" | "beacon";

interface PosterPlateProps {
    variant: PosterVariant;
    /** Written description of the scene (the SVG's accessible name). */
    alt: string;
    /** Decorative chrome label shown at the plate's bottom-left. */
    label?: string;
    className?: string;
}

/* Cinematic palette — matches the home stage grade. */
const C = {
    glow: "rgba(90,148,255,0.42)",
    glowSoft: "rgba(90,148,255,0.16)",
    structure: "rgba(111,150,242,0.4)",
    bright: "#c6deff",
    brightSoft: "rgba(198,222,255,0.65)",
    signal: "#e6392a",
    signalSoft: "rgba(230,57,42,0.75)",
    ink: "#04050b",
    frame: "#182032",
};

/** Deterministic star positions for the reserved-sky scene. */
const SKY_STARS: Array<[number, number, number, number]> = [
    [58, 66, 1.6, 0.7], [118, 142, 1.1, 0.45], [74, 236, 1.3, 0.55], [146, 320, 1.7, 0.65],
    [40, 336, 1.1, 0.4], [196, 74, 1.4, 0.6], [238, 156, 1.1, 0.42], [212, 252, 1.5, 0.52],
    [266, 348, 1.2, 0.5], [318, 62, 1.7, 0.75], [352, 130, 1.1, 0.4], [330, 340, 1.4, 0.55],
    [392, 78, 1.3, 0.55], [432, 168, 1.1, 0.42], [404, 264, 1.6, 0.6], [452, 344, 1.2, 0.48],
    [498, 62, 1.5, 0.62], [542, 138, 1.2, 0.45], [516, 236, 1.7, 0.7], [586, 302, 1.3, 0.52],
    [604, 84, 1.2, 0.44], [622, 196, 1.5, 0.6], [572, 372, 1.1, 0.4], [96, 392 - 26, 1.2, 0.45],
    [170, 208, 1.1, 0.4], [284, 236, 1.3, 0.5], [368, 306, 1.2, 0.46], [468, 108, 1.1, 0.42],
    [556, 60, 1.3, 0.55], [628, 356, 1.4, 0.5], [24, 168, 1.2, 0.45], [134, 52, 1.4, 0.58],
];

/** Drifting motes for the vault / bench scenes. */
const MOTES: Array<[number, number, number, boolean]> = [
    [82, 122, 1.6, false], [154, 298, 1.3, false], [518, 92, 1.7, false], [562, 238, 1.3, false],
    [92, 356, 1.5, false], [472, 332, 1.4, false], [604, 158, 1.2, false], [44, 222, 1.4, false],
    [540, 312, 1.6, true], [240, 96, 1.3, false], [408, 60, 1.2, false], [340, 372, 1.4, false],
];

function Defs({ id, variant }: { id: string; variant: PosterVariant }) {
    return (
        <defs>
            <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.glow} />
                <stop offset="55%" stopColor={C.glowSoft} />
                <stop offset="100%" stopColor="rgba(90,148,255,0)" />
            </radialGradient>
            <radialGradient id={`${id}-redglow`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(230,57,42,0.65)" />
                <stop offset="100%" stopColor="rgba(230,57,42,0)" />
            </radialGradient>
            <radialGradient id={`${id}-floor`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(140,185,255,0.4)" />
                <stop offset="100%" stopColor="rgba(140,185,255,0)" />
            </radialGradient>
            <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(214,232,255,0.95)" />
                <stop offset="70%" stopColor="rgba(140,185,255,0.35)" />
                <stop offset="100%" stopColor="rgba(140,185,255,0)" />
            </linearGradient>
            <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(104,158,255,0.5)" />
                <stop offset="100%" stopColor="rgba(24,44,96,0.65)" />
            </linearGradient>
            <linearGradient id={`${id}-reflect`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(120,165,255,0.22)" />
                <stop offset="100%" stopColor="rgba(120,165,255,0)" />
            </linearGradient>
            <linearGradient id={`${id}-dawn`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="rgba(150,195,255,0.5)" />
                <stop offset="60%" stopColor="rgba(90,148,255,0.18)" />
                <stop offset="100%" stopColor="rgba(90,148,255,0)" />
            </linearGradient>
            <linearGradient id={`${id}-route`} x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(111,150,242,0.25)" />
                <stop offset="70%" stopColor="rgba(198,222,255,0.75)" />
                <stop offset="100%" stopColor="rgba(198,222,255,0.95)" />
            </linearGradient>
            <clipPath id={`${id}-left`}>
                <rect x="0" y="0" width="320" height="400" />
            </clipPath>
            <clipPath id={`${id}-right`}>
                <rect x="320" y="0" width="320" height="400" />
            </clipPath>
            {/* scene-specific aliases keep the scene code readable */}
            {variant === "vault" && (
                <radialGradient id={`${id}-pool`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(140,185,255,0.5)" />
                    <stop offset="100%" stopColor="rgba(140,185,255,0)" />
                </radialGradient>
            )}
        </defs>
    );
}

/* ------------------------------------------------------------------ scenes */

function Vault({ id }: { id: string }) {
    const strata = Array.from({ length: 15 }, (_, i) => 66 + i * 19);
    return (
        <>
            {/* depth 3 — portal light behind the archive */}
            <g className="pl-3">
                <ellipse cx={382} cy={196} rx={250} ry={205} fill={`url(#${id}-glow)`} />
            </g>

            {/* depth 2 — the record monolith */}
            <g className="pl-2">
                <rect x={215} y={48} width={215} height={304} fill="#070a11" stroke={C.frame} />
                <rect x={215} y={48} width={2.5} height={304} fill={`url(#${id}-rim)`} />
                <line x1={215} y1={48} x2={430} y2={48} stroke={C.brightSoft} strokeWidth={1.2} />
                {strata.map((y, i) => {
                    const glow = i === 4 || i === 9;
                    const red = i === 12;
                    return (
                        <g key={y}>
                            <line
                                x1={232}
                                y1={y}
                                x2={413}
                                y2={y}
                                stroke={red ? C.signalSoft : glow ? "rgba(111,150,242,0.6)" : "#131a2b"}
                                strokeWidth={red ? 1.6 : 1}
                                className={glow ? "plate-breathe" : undefined}
                                style={glow ? { animationDelay: i === 4 ? "0s" : "4.5s" } : undefined}
                            />
                            {red && <line x1={413} y1={y} x2={422} y2={y} stroke={C.signal} strokeWidth={1.6} />}
                            {i % 3 === 0 && <line x1={232} y1={y - 4} x2={232} y2={y + 4} stroke="#1c2740" strokeWidth={1} />}
                        </g>
                    );
                })}
            </g>

            {/* depth 1 — floor, reflection, motes */}
            <g className="pl-1">
                <line x1={55} y1={352} x2={585} y2={352} stroke="#141c30" strokeWidth={1} />
                <ellipse cx={322} cy={356} rx={172} ry={15} fill={`url(#${id}-pool)`} opacity={0.85} />
                <rect x={216} y={353} width={213} height={34} fill={`url(#${id}-reflect)`} />
                <line x1={236} y1={362} x2={410} y2={362} stroke="rgba(120,165,255,0.14)" strokeWidth={1} />
                <line x1={252} y1={372} x2={394} y2={372} stroke="rgba(120,165,255,0.08)" strokeWidth={1} />
                {MOTES.map(([x, y, r, red]) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={red ? C.signalSoft : "rgba(198,222,255,0.55)"} className={red ? "plate-breathe" : undefined} />
                ))}
            </g>
        </>
    );
}

const HOOD =
    "M 320 148 C 291 148 276 175 281 204 C 283 222 294 237 299 245 L 286 261 " +
    "C 268 292 260 328 256 352 L 384 352 C 380 328 372 292 354 261 L 341 245 " +
    "C 346 237 357 222 359 204 C 364 175 349 148 320 148 Z";

function Threshold({ id }: { id: string }) {
    const paths: Array<[number, number]> = [[26, 400], [246, 400], [614, 400]];
    return (
        <>
            {/* depth 3 — portal arch */}
            <g className="pl-3">
                <circle cx={320} cy={174} r={132} fill={`url(#${id}-glow)`} />
                <circle cx={320} cy={174} r={112} fill="none" stroke={C.brightSoft} strokeWidth={2} className="plate-breathe" />
                <circle cx={320} cy={174} r={123} fill="none" stroke={C.structure} strokeWidth={1} strokeDasharray="2 11" className="plate-spin" />
                <circle cx={96} cy={70} r={1.5} fill="rgba(198,222,255,0.6)" />
                <circle cx={548} cy={58} r={1.3} fill="rgba(198,222,255,0.5)" />
                <circle cx={594} cy={148} r={1.6} fill="rgba(198,222,255,0.55)" />
            </g>

            {/* depth 2 — the figure, rim-lit red left / portal blue right */}
            <g className="pl-2">
                <path d={HOOD} fill={C.ink} />
                <g clipPath={`url(#${id}-left)`}>
                    <path d={HOOD} fill="none" stroke={C.signalSoft} strokeWidth={2} />
                </g>
                <g clipPath={`url(#${id}-right)`}>
                    <path d={HOOD} fill="none" stroke="rgba(160,200,255,0.75)" strokeWidth={2} />
                </g>
                {/* ember in hand */}
                <circle cx={370} cy={274} r={22} fill={`url(#${id}-redglow)`} className="plate-breathe" style={{ animationDelay: "3s" }} />
                <circle cx={370} cy={274} r={4.5} fill="#ff8a76" />
            </g>

            {/* depth 1 — converging light paths on the floor */}
            <g className="pl-1">
                <line x1={55} y1={352} x2={585} y2={352} stroke="#141c30" strokeWidth={1} />
                <ellipse cx={320} cy={356} rx={150} ry={14} fill={`url(#${id}-floor)`} />
                {paths.map(([x, y]) => (
                    <line
                        key={x}
                        x1={x}
                        y1={y}
                        x2={320}
                        y2={353}
                        stroke="rgba(111,150,242,0.4)"
                        strokeWidth={2}
                        strokeDasharray="9 13"
                        className="plate-dash"
                    />
                ))}
            </g>
        </>
    );
}

function Bench({ id }: { id: string }) {
    const screens: Array<[number, number, number, number]> = [
        [120, 138, 140, 92],
        [278, 116, 164, 110],
        [458, 142, 116, 84],
    ];
    return (
        <>
            {/* depth 3 — room glow behind the console */}
            <g className="pl-3">
                <ellipse cx={342} cy={168} rx={258} ry={168} fill={`url(#${id}-glow)`} />
            </g>

            {/* depth 2 — three live screens */}
            <g className="pl-2">
                {screens.map(([x, y, w, h], i) => (
                    <g key={x}>
                        <rect x={x} y={y} width={w} height={h} fill="#06090f" stroke={C.frame} />
                        <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} fill={`url(#${id}-screen)`} />
                        <rect x={x + 16} y={y + 20} width={w - 42} height={3} fill="rgba(170,205,255,0.55)" />
                        <rect x={x + 16} y={y + 32} width={w - 30} height={3} fill="rgba(170,205,255,0.35)" />
                        <rect x={x + 16} y={y + 44} width={w - 58} height={3} fill="rgba(170,205,255,0.5)" className="plate-breathe" style={{ animationDelay: `${i * 2.5}s` }} />
                        {i === 1 && <rect x={x + 16} y={y + 58} width={44} height={3} fill={C.signalSoft} className="plate-breathe" style={{ animationDelay: "6s" }} />}
                        <line x1={x + w / 2} y1={y + h} x2={x + w / 2} y2={298} stroke="#1a2233" strokeWidth={3} />
                    </g>
                ))}
            </g>

            {/* depth 1 — desk, figure, floor */}
            <g className="pl-1">
                <ellipse cx={330} cy={344} rx={218} ry={28} fill={`url(#${id}-floor)`} opacity={0.7} />
                <line x1={70} y1={300} x2={600} y2={300} stroke="#232c40" strokeWidth={3} />
                <line x1={70} y1={297} x2={600} y2={297} stroke="rgba(198,222,255,0.18)" strokeWidth={1} />
                {/* keyboard */}
                <rect x={252} y={290} width={92} height={7} rx={1.5} fill="rgba(140,190,255,0.4)" stroke="rgba(198,222,255,0.5)" strokeWidth={0.8} className="plate-breathe" style={{ animationDelay: "2s" }} />
                {/* seated figure, back view */}
                <circle cx={186} cy={234} r={21} fill={C.ink} />
                <path d="M 164 306 C 162 274 170 252 186 250 C 202 252 210 274 208 306 Z" fill={C.ink} />
                <path d="M 206 266 C 224 272 240 284 252 292" fill="none" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
                {/* chair below the desk line */}
                <rect x={177} y={308} width={18} height={42} fill={C.ink} />
                <line x1={186} y1={350} x2={186} y2={364} stroke={C.ink} strokeWidth={5} />
                <line x1={166} y1={366} x2={206} y2={366} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
                {/* the red mug */}
                <circle cx={432} cy={288} r={17} fill={`url(#${id}-redglow)`} className="plate-breathe" style={{ animationDelay: "5s" }} />
                <circle cx={432} cy={289} r={5} fill="#ff7a66" />
                {MOTES.slice(0, 8).map(([x, y, r, red]) => (
                    <circle key={`b${x}-${y}`} cx={x} cy={y} r={r} fill={red ? C.signalSoft : "rgba(198,222,255,0.45)"} />
                ))}
            </g>
        </>
    );
}

function Reserve({ id }: { id: string }) {
    /* one reserved star, ringed by the voices that will fill it */
    const ring = Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        return [320 + Math.cos(a) * 118, 185 + Math.sin(a) * 118] as [number, number];
    });
    return (
        <>
            {/* depth 3 — nebula patches */}
            <g className="pl-3">
                <ellipse cx={436} cy={132} rx={175} ry={112} fill={`url(#${id}-glow)`} opacity={0.5} />
                <ellipse cx={196} cy={304} rx={148} ry={92} fill={`url(#${id}-glow)`} opacity={0.34} />
                <ellipse cx={536} cy={326} rx={112} ry={72} fill={`url(#${id}-redglow)`} opacity={0.3} />
            </g>

            {/* depth 2 — field + the waiting ring */}
            <g className="pl-2">
                {SKY_STARS.map(([x, y, r, o], i) => (
                    <circle key={i} cx={x} cy={y} r={r} fill={`rgba(214,230,255,${o})`} />
                ))}
                {ring.map(([x, y], i) => (
                    <g key={i}>
                        <circle cx={x} cy={y} r={10} fill={`url(#${id}-glow)`} className="plate-twinkle" style={{ animationDelay: `${i * 1.4}s` }} />
                        <circle cx={x} cy={y} r={2.4} fill="rgba(176,205,250,0.9)" className="plate-twinkle" style={{ animationDelay: `${i * 1.4}s` }} />
                    </g>
                ))}
            </g>

            {/* depth 1 — the one lit star, and its ember */}
            <g className="pl-1">
                <circle cx={320} cy={185} r={46} fill={`url(#${id}-glow)`} className="plate-breathe" />
                <g className="plate-breathe" style={{ animationDelay: "2s" }}>
                    <line x1={284} y1={185} x2={356} y2={185} stroke="rgba(214,232,255,0.75)" strokeWidth={1.1} />
                    <line x1={320} y1={149} x2={320} y2={221} stroke="rgba(214,232,255,0.75)" strokeWidth={1.1} />
                    <circle cx={320} cy={185} r={5} fill="#eef5ff" />
                </g>
                <circle cx={468} cy={302} r={26} fill={`url(#${id}-redglow)`} className="plate-breathe" style={{ animationDelay: "6s" }} />
                <circle cx={468} cy={302} r={3.6} fill="#ff8a76" />
            </g>
        </>
    );
}

function Route({ id }: { id: string }) {
    const wayPts: Array<[number, number, boolean]> = [
        [170, 300, false],
        [280, 318, false],
        [400, 255, false],
        [590, 214, true],
    ];
    return (
        <>
            {/* depth 3 — dawn behind the ridges */}
            <g className="pl-3">
                <ellipse cx={400} cy={252} rx={300} ry={158} fill={`url(#${id}-dawn)`} className="plate-breathe" style={{ animationDelay: "3s" }} />
                {SKY_STARS.slice(0, 12).map(([x, y, r, o], i) => (
                    <circle key={i} cx={x} cy={y * 0.55} r={r} fill={`rgba(214,230,255,${o * 0.8})`} />
                ))}
            </g>

            {/* depth 2 — back ridge */}
            <g className="pl-2">
                <path
                    d="M 0 262 L 62 234 L 122 250 L 192 208 L 262 240 L 332 198 L 422 234 L 502 204 L 572 240 L 640 218 L 640 400 L 0 400 Z"
                    fill="#070b14"
                />
                <line x1={0} y1={262} x2={640} y2={252} stroke="rgba(111,150,242,0.16)" strokeWidth={1} />
            </g>

            {/* depth 1 — front ridges + the light route with its waypoints */}
            <g className="pl-1">
                <path
                    d="M 0 302 L 82 276 L 152 296 L 232 258 L 322 290 L 402 264 L 482 296 L 562 270 L 640 292 L 640 400 L 0 400 Z"
                    fill="#050810"
                />
                <path
                    d="M 0 346 L 102 326 L 202 350 L 302 330 L 422 352 L 542 332 L 640 348 L 640 400 L 0 400 Z"
                    fill={C.ink}
                />
                <polyline
                    points="60,344 170,300 280,318 400,255 512,266 590,214"
                    fill="none"
                    stroke={`url(#${id}-route)`}
                    strokeWidth={2.2}
                    strokeDasharray="7 9"
                    className="plate-dash"
                />
                {wayPts.map(([x, y, red], i) => (
                    <g key={i}>
                        <circle cx={x} cy={y} r={15} fill={red ? `url(#${id}-redglow)` : `url(#${id}-floor)`} className="plate-twinkle" style={{ animationDelay: `${i * 2.6}s` }} />
                        <circle cx={x} cy={y} r={5.5} fill="#0a0f1c" stroke={red ? "#ff8a76" : C.bright} strokeWidth={1.6} />
                        <circle cx={x} cy={y} r={2} fill={red ? "#ff8a76" : C.bright} />
                    </g>
                ))}
            </g>
        </>
    );
}

function Beacon({ id }: { id: string }) {
    const sats: Array<[number, number, number, boolean]> = [
        [135, 95, 11, false],
        [505, 105, 9, false],
        [568, 248, 13, true],
        [448, 338, 8, false],
        [172, 330, 10, false],
        [86, 236, 8, false],
    ];
    return (
        <>
            {/* depth 3 — ambient field rings */}
            <g className="pl-3">
                <ellipse cx={320} cy={200} rx={255} ry={162} fill="none" stroke="rgba(111,150,242,0.1)" />
                <ellipse cx={320} cy={200} rx={205} ry={130} fill="none" stroke="rgba(111,150,242,0.13)" />
                <ellipse cx={320} cy={200} rx={150} ry={95} fill="none" stroke="rgba(111,150,242,0.16)" />
                <circle cx={320} cy={200} r={250} fill={`url(#${id}-glow)`} opacity={0.35} />
            </g>

            {/* depth 2 — spokes and satellites */}
            <g className="pl-2">
                {sats.map(([x, y], i) => (
                    <g key={i}>
                        <line x1={320} y1={200} x2={x} y2={y} stroke={C.structure} strokeWidth={1.4} strokeDasharray="5 8" className="plate-dash" style={{ animationDelay: `${i * -2}s` }} />
                        <circle cx={(320 + x) / 2} cy={(200 + y) / 2} r={2} fill="rgba(198,222,255,0.6)" />
                    </g>
                ))}
                {sats.map(([x, y, r, red], i) => (
                    <g key={`s${i}`}>
                        <circle cx={x} cy={y} r={r * 2.8} fill={red ? `url(#${id}-redglow)` : `url(#${id}-glow)`} className="plate-twinkle" style={{ animationDelay: `${i * 1.8}s` }} />
                        <circle cx={x} cy={y} r={r} fill="#0a0f1c" stroke={red ? "rgba(255,138,118,0.9)" : C.brightSoft} strokeWidth={1.6} />
                        <circle cx={x} cy={y} r={2.6} fill={red ? "#ff8a76" : C.bright} />
                    </g>
                ))}
            </g>

            {/* depth 1 — the beacon core with slow ripples */}
            <g className="pl-1">
                <ellipse cx={320} cy={200} rx={92} ry={58} fill={`url(#${id}-floor)`} />
                <circle cx={320} cy={200} r={70} fill="none" stroke="rgba(160,200,255,0.55)" strokeWidth={1.5} className="plate-ripple" />
                <circle cx={320} cy={200} r={70} fill="none" stroke="rgba(160,200,255,0.4)" strokeWidth={1.5} className="plate-ripple" style={{ animationDelay: "8s" }} />
                <circle cx={320} cy={200} r={34} fill={`url(#${id}-glow)`} className="plate-breathe" />
                <circle cx={320} cy={200} r={16} fill="#0a1122" stroke={C.bright} strokeWidth={2} />
                <circle cx={320} cy={200} r={6} fill="#dbe9ff" className="plate-breathe" style={{ animationDelay: "4s" }} />
            </g>
        </>
    );
}

const SCENES: Record<PosterVariant, (props: { id: string }) => React.ReactElement> = {
    vault: Vault,
    threshold: Threshold,
    bench: Bench,
    reserve: Reserve,
    route: Route,
    beacon: Beacon,
};

/* ------------------------------------------------------------------- shell */

export default function PosterPlate({ variant, alt, label, className = "" }: PosterPlateProps) {
    const rawId = useId();
    const id = `p${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
    const ref = useRef<HTMLDivElement>(null);
    const Scene = SCENES[variant];

    const move = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--px", ((x - 0.5) * 2).toFixed(3));
        el.style.setProperty("--py", ((y - 0.5) * 2).toFixed(3));
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    };

    const leave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--px", "0");
        el.style.setProperty("--py", "0");
    };

    return (
        <div
            ref={ref}
            className={`poster-plate ${className}`.trim()}
            onPointerMove={move}
            onPointerLeave={leave}
        >
            <svg viewBox="0 0 640 400" role="img" aria-label={alt} className="poster-svg" preserveAspectRatio="xMidYMid slice">
                <Defs id={id} variant={variant} />
                <Scene id={id} />
            </svg>
            <span className="plate-light" aria-hidden="true" />
            <span className="plate-tick plate-tick-tl" aria-hidden="true" />
            <span className="plate-tick plate-tick-tr" aria-hidden="true" />
            <span className="plate-tick plate-tick-bl" aria-hidden="true" />
            <span className="plate-tick plate-tick-br" aria-hidden="true" />
            {label ? (
                <span className="plate-label label-mono" aria-hidden="true">
                    {label}
                </span>
            ) : null}
        </div>
    );
}
