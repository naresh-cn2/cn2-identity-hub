/**
 * FigureSilhouette — the anonymous human, as a transparent overlay.
 *
 * This is the same symbolic, faceless hooded bust used across the identity
 * system, but authored WITHOUT its own background plate so it can be composited
 * directly into an environment (the WebGL quant field on the hero, a static
 * field elsewhere). It is deliberately not a portrait of any real person and
 * never uses the supplied photography.
 *
 * Pure SVG: it renders identically on server and client, carries its own
 * semantic label, and its motion is CSS-only so reduced-motion disables it.
 */
export default function FigureSilhouette({
    className = "",
    theme = "dark",
}: {
    className?: string;
    theme?: "dark" | "light";
}) {
    const body =
        "M200 58 C160 58 137 91 137 132 C137 151 141 169 150 183 " +
        "C119 197 95 215 81 246 C65 281 57 342 55 533 L345 533 " +
        "C343 342 335 281 319 246 C305 215 281 197 250 183 " +
        "C259 169 263 151 263 132 C263 91 240 58 200 58 Z";

    const uid = theme === "light" ? "fs-l" : "fs-d";

    return (
        <svg
            viewBox="0 0 400 533"
            className={className}
            preserveAspectRatio="xMidYMax meet"
            role="img"
            aria-label="Anonymous hooded silhouette — the CN2.dev identity symbol, not a portrait of a real person."
        >
            <title>CN2.dev — anonymous figure</title>
            <defs>
                <linearGradient id={`${uid}-body`} x1="0.2" y1="0" x2="0.9" y2="1">
                    {theme === "light" ? (
                        <>
                            <stop offset="0%" stopColor="#23272f" />
                            <stop offset="55%" stopColor="#14171d" />
                            <stop offset="100%" stopColor="#0b0d11" />
                        </>
                    ) : (
                        <>
                            <stop offset="0%" stopColor="#17171d" />
                            <stop offset="50%" stopColor="#0c0c11" />
                            <stop offset="100%" stopColor="#040405" />
                        </>
                    )}
                </linearGradient>
                <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="1" y2="0.2">
                    <stop offset="0%" stopColor="#e6392a" stopOpacity="0.9" />
                    <stop offset="30%" stopColor="#e6392a" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#6f96f2" stopOpacity="0" />
                </linearGradient>
                <linearGradient id={`${uid}-edge`} x1="1" y1="0" x2="0" y2="0.3">
                    <stop offset="0%" stopColor="#6f96f2" stopOpacity="0.5" />
                    <stop offset="40%" stopColor="#6f96f2" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#6f96f2" stopOpacity="0" />
                </linearGradient>
                <radialGradient id={`${uid}-glow`} cx="50%" cy="24%" r="46%">
                    <stop offset="0%" stopColor="#e6392a" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#e6392a" stopOpacity="0" />
                </radialGradient>
                <clipPath id={`${uid}-clip`}>
                    <path d={body} />
                </clipPath>
            </defs>

            {/* volumetric signal glow behind the head */}
            <ellipse cx="200" cy="150" rx="150" ry="170" fill={`url(#${uid}-glow)`} className="figure-breathe" />

            {/* the dark anonymous body */}
            <path d={body} fill={`url(#${uid}-body)`} />

            {/* computational structure clipped inside the figure — integration, not decoration */}
            <g clipPath={`url(#${uid}-clip)`} opacity="0.5">
                <g stroke="#6f96f2" strokeWidth="0.6">
                    {Array.from({ length: 9 }, (_, i) => (
                        <line key={`h${i}`} x1="40" y1={120 + i * 46} x2="360" y2={120 + i * 46} strokeOpacity="0.1" />
                    ))}
                    {Array.from({ length: 7 }, (_, i) => (
                        <line key={`v${i}`} x1={70 + i * 44} y1="60" x2={70 + i * 44} y2="533" strokeOpacity="0.07" />
                    ))}
                </g>
                <circle cx="200" cy="300" r="120" fill="none" stroke="#e6392a" strokeOpacity="0.07" strokeWidth="1" />
                <circle cx="200" cy="300" r="78" fill="none" stroke="#6f96f2" strokeOpacity="0.08" strokeWidth="1" />
            </g>

            {/* rim light along the leading (left) edge */}
            <path d={body} fill="none" stroke={`url(#${uid}-rim)`} strokeWidth="2.4" className="figure-rim" />
            {/* cool edge light along the trailing (right) edge */}
            <path d={body} fill="none" stroke={`url(#${uid}-edge)`} strokeWidth="1.6" />
            {/* faint hood fold — no facial features, ever */}
            <path d="M150 183 C176 205 224 205 250 183" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1.4" />

            {/* a single restrained red signal at the core */}
            <circle cx="200" cy="300" r="3.4" fill="#e6392a" className="pulse-dot" />
            <line x1="200" y1="308" x2="200" y2="372" stroke="#e6392a" strokeOpacity="0.3" strokeWidth="1" />
        </svg>
    );
}
