"use client";

/**
 * CN2.DEV custom SVG wordmark.
 *
 * Hand-built vector letterforms (C, N, 2, D, E, V) with a consistent
 * stroke weight and engineered geometric proportions, reproducing the
 * reference logotype. The horizontal cut is a static design feature:
 * two identical path groups share the viewBox, each clipped to one half
 * and offset horizontally by a few pixels. No animation.
 */

const LETTERS = [
  // C
  "M 20 20 L 180 20 L 180 60 L 60 60 L 60 140 L 180 140 L 180 180 L 20 180 Z",
  // N
  "M 200 20 L 240 20 L 320 180 L 360 180 L 360 20 L 320 20 L 240 180 L 200 180 Z",
  // 2
  "M 380 60 Q 380 20 420 20 L 460 20 Q 500 20 500 60 L 500 80 L 420 180 L 380 180 Z",
  // D
  "M 540 20 L 580 20 Q 640 20 640 100 Q 640 180 580 180 L 540 180 Z",
  // E
  "M 660 20 L 780 20 L 780 60 L 700 60 L 700 80 L 780 80 L 780 120 L 700 120 L 700 140 L 780 140 L 780 180 L 660 180 Z",
  // V
  "M 800 20 L 840 20 L 880 180 L 840 180 L 820 100 L 800 180 L 760 180 Z",
];

const VB_W = 860;
const VB_H = 200;

export default function CN2Wordmark() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width={VB_W}
      height={VB_H}
      role="img"
      aria-label="CN2.DEV"
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
    >
      <defs>
        <clipPath id="cn2-wm-top">
          <rect x="0" y="0" width={VB_W} height={VB_H / 2} />
        </clipPath>
        <clipPath id="cn2-wm-bottom">
          <rect x="0" y={VB_H / 2} width={VB_W} height={VB_H / 2} />
        </clipPath>
      </defs>

      {/* Top portion — shifted slightly left */}
      <g clipPath="url(#cn2-wm-top)">
        <g transform="translate(-5, 0)">
          {LETTERS.map((d, i) => (
            <path key={`t-${i}`} d={d} fill="#ffffff" />
          ))}
        </g>
      </g>

      {/* Bottom portion — shifted slightly right */}
      <g clipPath="url(#cn2-wm-bottom)">
        <g transform="translate(5, 0)">
          {LETTERS.map((d, i) => (
            <path key={`b-${i}`} d={d} fill="#ffffff" />
          ))}
        </g>
      </g>

      {/* Red square separator at the CN2/DEV join */}
      <rect x={505} y={158} width={22} height={22} fill="#ff2a1f" />
    </svg>
  );
}
