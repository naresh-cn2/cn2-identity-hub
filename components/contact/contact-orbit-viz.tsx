/**
 * /contact hero orbital band.
 *
 * A quiet companion to the page's `orbit` atmosphere: three tilted orbit
 * planes around one core, each carrying a node — the three direct channels
 * below (email, GitHub, LinkedIn). It is decorative by design (the panels
 * below carry the real information), so it stays aria-hidden, low-alpha and
 * strictly behind the content.
 *
 * Motion comes from the shared `.anim-spin-slow` / `.anim-breathe` helpers,
 * which the global reduced-motion rule freezes to a single still frame.
 */
export default function ContactOrbitViz() {
  const nodes: Array<{ ring: number; cx: number; cy: number }> = [
    { ring: 0, cx: 466, cy: 96 },
    { ring: 1, cx: 726, cy: 150 },
    { ring: 2, cx: 386, cy: 168 },
  ];

  return (
    <svg
      viewBox="0 0 1160 220"
      aria-hidden="true"
      className="block w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* horizon rule the orbits sit on */}
      <path d="M14 110 H1146" className="stroke-line" strokeWidth={1} strokeDasharray="2 8" fill="none" />

      {/* orbit planes — tilt is structural, spin is ambient */}
      <g transform="rotate(-10 580 110)">
        <g
          className="anim-spin-slow"
          style={{ transformBox: "view-box", transformOrigin: "580px 110px", animationDuration: "72s" }}
        >
          <ellipse cx={580} cy={110} rx={196} ry={54} className="fill-none stroke-line-strong" strokeWidth={1} />
        </g>
      </g>
      <g transform="rotate(14 580 110)">
        <g
          className="anim-spin-slow"
          style={{
            transformBox: "view-box",
            transformOrigin: "580px 110px",
            animationDuration: "104s",
            animationDirection: "reverse",
          }}
        >
          <ellipse cx={580} cy={110} rx={148} ry={40} className="fill-none stroke-line-strong" strokeWidth={1} />
        </g>
      </g>
      <g transform="rotate(-3 580 110)">
        <ellipse cx={580} cy={110} rx={104} ry={28} className="fill-none stroke-line" strokeWidth={1} />
      </g>

      {/* the core */}
      <circle cx={580} cy={110} r={26} className="fill-signal-soft" />
      <rect x={574} y={104} width={12} height={12} className="fill-none stroke-line-strong" strokeWidth={1} />
      <circle cx={580} cy={110} r={3} className="fill-signal anim-breathe" />

      {/* channels riding the orbits, tied back to the core */}
      {nodes.map((node, i) => (
        <g key={node.ring}>
          <path
            d={`M580 110 L${node.cx} ${node.cy}`}
            className="stroke-line"
            strokeWidth={1}
            strokeDasharray="3 6"
            fill="none"
          />
          <circle
            cx={node.cx}
            cy={node.cy}
            r={3.2}
            className={`anim-blink ${i === 0 ? "fill-signal" : "fill-foreground"}`}
            style={{ animationDelay: `${i * 700}ms` }}
          />
        </g>
      ))}

      {/* the network between channels */}
      <path
        d={`M${nodes[0].cx} ${nodes[0].cy} L${nodes[1].cx} ${nodes[1].cy} L${nodes[2].cx} ${nodes[2].cy} Z`}
        className="fill-none stroke-line-strong"
        strokeWidth={1}
        strokeDasharray="2 8"
      />
    </svg>
  );
}
