"use client";

import { useMemo } from "react";
import SceneFrame, { type Engine, PAL, rgba } from "@/components/visuals/scene-frame";

/**
 * PipelineFlow — automated data cleaning, drawn live.
 *
 * Packets ride four rails from the left in dim raw state, pass three
 * validation gates and are progressively promoted (brighter ice blue at
 * each gate), with a final crimson spark on exit — and after every gate
 * they re-route to a fresh lane, so the routing itself visibly changes
 * hands. A share of packets fails a gate: they flash red, deflect down
 * out of the lane and fade — the visible proof that validation actually
 * rejects. Gate brackets pulse as packets pass.
 */

interface Packet { x: number; lane: number; tgt: number; speed: number; failAt: number; state: number; vy: number; al: number }
interface FlowState {
  packets: Packet[];
  gates: { x: number; glow: number }[];
}

const LANES = [0.3, 0.44, 0.58, 0.72];
const pickLane = (rnd: () => number) => LANES[Math.floor(rnd() * LANES.length)];

function makeEngine(): Engine<FlowState> {
  return {
    init(w, h, rnd) {
      const small = w < 720;
      const n = small ? 34 : 70;
      const packets: Packet[] = [];
      for (let i = 0; i < n; i++) {
        const lane = pickLane(rnd) + (rnd() - 0.5) * 0.018;
        packets.push({
          x: rnd(),
          lane,
          tgt: lane,
          speed: 0.06 + rnd() * 0.055,
          failAt: rnd() < 0.16 ? Math.floor(rnd() * 3) : -1,
          state: 0,
          vy: 0,
          al: 1,
        });
      }
      const gates = [0.34, 0.56, 0.78].map((x) => ({ x, glow: 0 }));
      return { packets, gates };
    },
    draw(ctx, env, st) {
      const { w, h, t, mode, dim } = env;
      const pal = mode === "dark" ? PAL.dark : PAL.light;
      const tt = t / 1000;
      ctx.clearRect(0, 0, w, h);

      const laneY = (lane: number) => h * lane + Math.sin(tt * 0.6 + lane * 9) * 6;

      // ---- rails (orthogonal routing) ----
      ctx.lineWidth = 1;
      for (const lane of LANES) {
        ctx.strokeStyle = rgba(pal.deep, 0.34 * dim);
        ctx.setLineDash([1, 9]);
        ctx.beginPath();
        for (let x = 0; x <= w; x += 12) {
          const y = laneY(lane);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // ---- gates ----
      for (let gi = 0; gi < st.gates.length; gi++) {
        const gate = st.gates[gi];
        const gx = gate.x * w;
        const gH = h * 0.56;
        const top = laneY(LANES[0]) - gH * 0.12;
        const bot = laneY(LANES[LANES.length - 1]) + gH * 0.12;
        if (!env.staticFrame && gate.glow > 0) gate.glow = Math.max(0, gate.glow - env.dt * 2.2);
        const glow = gate.glow;
        // dashed vertical gate plane
        ctx.strokeStyle = rgba(pal.ice, (0.24 + 0.5 * glow) * dim);
        ctx.setLineDash([3, 7]);
        ctx.beginPath();
        ctx.moveTo(gx, top);
        ctx.lineTo(gx, bot);
        ctx.stroke();
        ctx.setLineDash([]);
        // brackets
        ctx.strokeStyle = rgba(glow > 0.05 ? pal.bright : pal.ice, (0.55 + 0.4 * glow) * dim);
        ctx.lineWidth = 1.4;
        const bw = 12;
        for (const y of [top, bot]) {
          const s = y === top ? 1 : -1;
          ctx.beginPath();
          ctx.moveTo(gx - bw, y + s * 15);
          ctx.lineTo(gx - bw, y);
          ctx.lineTo(gx + bw, y);
          ctx.lineTo(gx + bw, y + s * 15);
          ctx.stroke();
        }
        // mid notch + gate id tick
        ctx.lineWidth = 1;
        ctx.fillStyle = rgba(pal.ice, 0.55 * dim);
        ctx.fillRect(gx - 1, top - 12, 2, 6);
        ctx.fillRect(gx - 5, (top + bot) / 2 - 0.5, 10, 1);
      }

      // ---- packets ----
      for (const p of st.packets) {
        if (!env.staticFrame) {
          if (p.state === 0) {
            p.x += p.speed * env.dt;
            p.lane += (p.tgt - p.lane) * Math.min(1, env.dt * 2.5);
            for (let gi = 0; gi < st.gates.length; gi++) {
              const gate = st.gates[gi];
              if (p.x >= gate.x && p.state === gi) {
                gate.glow = 1;
                if (p.failAt === gi) {
                  p.state = 10 + gi;
                  p.vy = 0.16 + Math.random() * 0.1;
                } else {
                  p.state = gi + 1;
                  // re-route to a fresh rail after each gate
                  let next = pickLane(Math.random);
                  if (Math.abs(next - p.lane) < 0.05) next = LANES[(LANES.indexOf(next) + 1) % LANES.length];
                  p.tgt = next + (Math.random() - 0.5) * 0.018;
                }
              }
            }
            if (p.x > 1.04) {
              p.x = -0.04;
              p.lane = p.tgt = pickLane(Math.random) + (Math.random() - 0.5) * 0.018;
              p.state = 0;
              p.failAt = Math.random() < 0.16 ? Math.floor(Math.random() * 3) : -1;
              p.vy = 0;
              p.al = 1;
            }
          } else {
            // rejected: deflect down out of the rails and fade
            p.x += p.speed * 0.5 * env.dt;
            p.lane += p.vy * env.dt;
            p.al -= env.dt * 0.7;
            if (p.al <= 0) {
              p.x = -0.04;
              p.lane = p.tgt = pickLane(Math.random) + (Math.random() - 0.5) * 0.018;
              p.state = 0;
              p.failAt = Math.random() < 0.16 ? Math.floor(Math.random() * 3) : -1;
              p.vy = 0;
              p.al = 1;
            }
          }
        }
        const x = p.x * w;
        const y = laneY(p.lane);
        const rejected = p.state >= 10;
        // raw packets read as dim ice, promoted packets brighten step by step
        const c = rejected ? pal.red : pal.ice;
        const a = (rejected ? 0.8 * p.al : p.state === 0 ? 0.5 : 0.58 + p.state * 0.14) * dim;

        // motion streak (gradient trail)
        const tailX = x - p.speed * w * 0.3;
        const tailY = rejected ? y - p.vy * 60 : y;
        const tg = ctx.createLinearGradient(tailX, tailY, x, y);
        tg.addColorStop(0, rgba(c, 0));
        tg.addColorStop(1, rgba(c, Math.min(0.85, a * 0.75)));
        ctx.strokeStyle = tg;
        ctx.lineWidth = rejected ? 1.6 : 1.3;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.lineWidth = 1;

        // head
        ctx.fillStyle = rgba(c, Math.min(0.95, a + (rejected ? 0.15 : 0)));
        ctx.beginPath();
        ctx.arc(x, y, rejected ? 2.8 : 2.0 + p.state * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // promoted packets carry a white-hot core
        if (!rejected && p.state > 0) {
          ctx.fillStyle = rgba(pal.bright, 0.7 * dim);
          ctx.beginPath();
          ctx.arc(x, y, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
        if (!rejected && p.state === 3) {
          // final exit spark
          ctx.fillStyle = rgba(pal.red, 0.7 * dim);
          ctx.beginPath();
          ctx.arc(x + 4, y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
  };
}

const ENGINE = makeEngine();

export default function PipelineFlow({ seed = 5, className = "" }: { seed?: number; className?: string }) {
  const engine = useMemo(() => ENGINE, []);
  return <SceneFrame engine={engine} seed={seed} className={className} />;
}
