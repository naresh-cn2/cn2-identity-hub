import { mulberry32 } from "@/lib/series";

/**
 * AnonymousFigure — the CN2.dev brand symbol.
 *
 * An original, faceless silhouette (back-facing, hooded) set inside a market
 * topology field. It is deliberately NOT a portrait of any real person and does
 * not use the supplied photography: the figure stands for builder / researcher /
 * operator, abstracted. All geometry is deterministic (seeded at module scope)
 * so it renders identically on server and client with no runtime randomness,
 * and it degrades to a static SVG when scripts or motion are unavailable.
 */

const VB_W = 400;
const VB_H = 533;

/* deterministic topology field — computed once */
const rand = mulberry32(20261008);
const NODES = Array.from({ length: 34 }, () => ({
    x: 16 + rand() * (VB_W - 32),
    y: 16 + rand() * (VB_H - 32),
    r: 1 + rand() * 1.9,
}));

/* connect each node to its two nearest neighbours for a mesh */
const EDGES: [number, number][] = [];
NODES.forEach((n, i) => {
    const nearest = NODES.map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
    nearest.forEach((o) => {
        const key: [number, number] = i < o.j ? [i, o.j] : [o.j, i];
        if (!EDGES.some((e) => e[0] === key[0] && e[1] === key[1])) EDGES.push(key);
    });
});

/* hooded bust silhouette — abstract, no facial features */
const SILHOUETTE =
    "M200 58 C160 58 137 91 137 132 C137 151 141 169 150 183 " +
    "C119 197 95 215 81 246 C65 281 57 342 55 533 L345 533 " +
    "C343 342 335 281 319 246 C305 215 281 197 250 183 " +
    "C259 169 263 151 263 132 C263 91 240 58 200 58 Z";

export default function AnonymousFigure({
    className = "",
    plate = "001",
    system = "CN2",
}: {
    className?: string;
    plate?: string;
    system?: string;
}) {
    return (
        <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className={className}
            role="img"
            aria-label="Anonymous hooded silhouette standing within a market-topology field — the CN2.dev brand symbol, not a portrait of a real person."
            preserveAspectRatio="xMidYMid slice"
        >
            <title>CN2.dev — anonymous figure</title>
            <defs>
                <linearGradient id="af-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0c0c0f" />
                    <stop offset="55%" stopColor="#111116" />
                    <stop offset="100%" stopColor="#08080a" />
                </linearGradient>
                <linearGradient id="af-fig" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1a1a20" />
                    <stop offset="48%" stopColor="#0d0d11" />
                    <stop offset="100%" stopColor="#050506" />
                </linearGradient>
                <linearGradient id="af-rim" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#e6392a" stopOpacity="0.85" />
                    <stop offset="26%" stopColor="#e6392a" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#6f96f2" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="af-glow" cx="50%" cy="26%" r="42%">
                    <stop offset="0%" stopColor="#e6392a" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#e6392a" stopOpacity="0" />
                </radialGradient>
                <clipPath id="af-clip">
                    <rect x="0" y="0" width={VB_W} height={VB_H} />
                </clipPath>
            </defs>

            <g clipPath="url(#af-clip)">
                {/* field background */}
                <rect width={VB_W} height={VB_H} fill="url(#af-bg)" />

                {/* fine computational grid */}
                <g stroke="#ffffff" strokeOpacity="0.035" strokeWidth="1">
                    {Array.from({ length: 11 }, (_, i) => (
                        <line key={`v${i}`} x1={(i * VB_W) / 10} y1="0" x2={(i * VB_W) / 10} y2={VB_H} />
                    ))}
                    {Array.from({ length: 14 }, (_, i) => (
                        <line key={`h${i}`} x1="0" y1={(i * VB_H) / 13} x2={VB_W} y2={(i * VB_H) / 13} />
                    ))}
                </g>

                {/* signal glow behind the head */}
                <rect width={VB_W} height={VB_H} fill="url(#af-glow)" />

                {/* market topology mesh */}
                <g>
                    {EDGES.map(([a, b], i) => (
                        <line
                            key={`e${i}`}
                            x1={NODES[a].x}
                            y1={NODES[a].y}
                            x2={NODES[b].x}
                            y2={NODES[b].y}
                            stroke="#6f96f2"
                            strokeOpacity={i % 5 === 0 ? 0.28 : 0.13}
                            strokeWidth="0.8"
                        />
                    ))}
                    {NODES.map((n, i) => (
                        <circle
                            key={`n${i}`}
                            cx={n.x}
                            cy={n.y}
                            r={n.r}
                            fill={i % 7 === 0 ? "#e6392a" : "#8fa6d8"}
                            fillOpacity={i % 7 === 0 ? 0.8 : 0.4}
                        />
                    ))}
                </g>

                {/* the figure */}
                <path d={SILHOUETTE} fill="url(#af-fig)" />
                {/* rim light along the leading edge */}
                <path d={SILHOUETTE} fill="none" stroke="url(#af-rim)" strokeWidth="2.2" />
                {/* faint inner contour suggesting a hood fold, no features */}
                <path
                    d="M150 183 C176 205 224 205 250 183"
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity="0.06"
                    strokeWidth="1.4"
                />

                {/* a single restrained red signal at the core */}
                <circle cx="200" cy="300" r="3.2" fill="#e6392a" className="pulse-dot" />
                <line x1="200" y1="308" x2="200" y2="360" stroke="#e6392a" strokeOpacity="0.35" strokeWidth="1" />

                {/* data stream rising past the figure */}
                <g stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1">
                    {Array.from({ length: 7 }, (_, i) => (
                        <line
                            key={`s${i}`}
                            x1={40 + i * 54}
                            y1={VB_H}
                            x2={40 + i * 54}
                            y2={VB_H - 60 - ((i * 37) % 120)}
                        />
                    ))}
                </g>
            </g>

            {/* plate chrome */}
            <g fontFamily="var(--font-mono)" letterSpacing="0.14em">
                <text x="16" y="26" fontSize="9" fill="#ffffff" fillOpacity="0.5">
                    FIGURE / {plate}
                </text>
                <text x={VB_W - 16} y="26" fontSize="9" textAnchor="end" fill="#e6392a" fillOpacity="0.9">
                    {system}
                </text>
                <text x="16" y={VB_H - 16} fontSize="9" fill="#ffffff" fillOpacity="0.42">
                    ANONYMOUS · SYMBOLIC · NOT A PORTRAIT
                </text>
            </g>
        </svg>
    );
}
