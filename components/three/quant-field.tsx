"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { makeField } from "@/lib/field";
import { mulberry32 } from "@/lib/series";

/**
 * CN2 QUANT FIELD — the hero's cinematic WebGL environment (spec §3, §5).
 *
 * An anonymous human stands inside a quantitative computational world: a
 * deterministic probability landscape (the same value-noise field used across
 * the site), a wireframe market topology beneath it, a sparse graph of connected
 * nodes with red active signals, and drifting data motes for depth and haze.
 *
 * It is generative, not live data — a brand environment, not a chart. The camera
 * is choreographed by scroll (ACT I → ACT II) and nudged by the cursor; both are
 * fed in through mutable refs from the client wrapper so this module stays a
 * pure, dynamically-imported (ssr:false) leaf that never runs during prerender.
 */

const SEED = 20261008;

type Theme = "dark" | "light";
type Tier = "high" | "medium";

interface Mutable<T> {
    current: T;
}

interface QuantFieldProps {
    scrollRef: Mutable<number>;
    pointerRef: Mutable<{ x: number; y: number }>;
    frameloop?: "always" | "never" | "demand";
    tier?: Tier;
    theme?: Theme;
    onReady?: () => void;
    className?: string;
    children?: import("react").ReactNode;
}

interface Palette {
    signal: THREE.Color;
    structure: THREE.Color;
    deep: THREE.Color;
    faint: THREE.Color;
    wireOpacity: number;
    edgeOpacity: number;
    pointOpacity: number;
}

const PALETTES: Record<Theme, Palette> = {
    dark: {
        signal: new THREE.Color("#cc3322"),
        structure: new THREE.Color("#6f96f2"),
        deep: new THREE.Color("#141d38"),
        faint: new THREE.Color("#3c4c78"),
        wireOpacity: 0.075,
        edgeOpacity: 0.16,
        pointOpacity: 1,
    },
    light: {
        signal: new THREE.Color("#aa2218"),
        structure: new THREE.Color("#1b4dc9"),
        deep: new THREE.Color("#93a9d6"),
        faint: new THREE.Color("#6b83bb"),
        wireOpacity: 0.13,
        edgeOpacity: 0.22,
        pointOpacity: 0.92,
    },
};

const VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uDrift;
  uniform float uRangeMin;
  uniform float uRangeMax;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform vec3 uFogColor;
  varying vec3 vColor;
  varying float vFade;
  varying float vFogFactor;
  void main() {
    vColor = aColor;
    vec3 p = position;
    if (uDrift > 0.0) {
      float span = uRangeMax - uRangeMin;
      p.y = uRangeMin + mod(p.y - uRangeMin + uTime * uDrift, span);
    }
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = max(-mv.z, 0.001);
    vFade = smoothstep(26.0, 4.5, dist);
    float fogFactor = smoothstep(uFogNear, uFogFar, -mv.z);
    vFade *= (1.0 - fogFactor);
    float tw = 0.72 + 0.28 * sin(uTime * 1.4 + p.x * 2.5 + p.z * 1.7);
    gl_PointSize = aSize * uPixelRatio * (16.0 / dist) * tw * (1.0 - fogFactor * 0.3);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vFade;
  varying float vFogFactor;
  uniform vec3 uFogColor;
  varying float vFogFactor;
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    float a = smoothstep(0.5, 0.05, d);
    if (a <= 0.002) discard;
    gl_FragColor = vec4(vColor, a * vFade * uOpacity);
    gl_FragColor.rgb += uFogColor.rgb * vFogFactor;
  }
`;

export default function QuantField({
    scrollRef,
    pointerRef,
    frameloop = "always",
    tier = "high",
    theme = "dark",
    onReady,
    className = "",
    children,
}: QuantFieldProps) {
    return (
        <Canvas
            className={className}
            dpr={[1, tier === "high" ? 2 : 1.5]}
            gl={{
                antialias: tier === "high",
                alpha: true,
                powerPreference: "high-performance",
                depth: true,
            }}
            camera={{ position: [0, 0.55, 4.2], fov: 42, near: 0.1, far: 60 }}
            frameloop={frameloop}
            onCreated={({ gl }) => {
                gl.setClearAlpha(0);
                onReady?.();
            }}
        >
            <Field
                scrollRef={scrollRef}
                pointerRef={pointerRef}
                tier={tier}
                theme={theme}
            />
            {children}
        </Canvas>
    );
}

interface FieldProps {
    scrollRef: Mutable<number>;
    pointerRef: Mutable<{ x: number; y: number }>;
    tier: Tier;
    theme: Theme;
}

function Field({ scrollRef, pointerRef, tier, theme }: FieldProps) {
    const { camera, gl } = useThree();
    const pal = PALETTES[theme];
    const field = useMemo(() => makeField(SEED, 20), []);

    /* ---- all GPU assets, rebuilt only when tier/theme change, disposed on the way out ---- */
    const assets = useMemo(() => {
        const R = 10;
        const heightAt = (nx: number, nz: number) => field(nx, nz) * 2.4 - 0.7;

        // 1. probability landscape — a dense point grid displaced by the noise field
        const N = tier === "high" ? 104 : 66;
        const lPos = new Float32Array(N * N * 3);
        const lCol = new Float32Array(N * N * 3);
        const lSize = new Float32Array(N * N);
        const c = new THREE.Color();
        let k = 0;
        for (let ix = 0; ix < N; ix++) {
            for (let iz = 0; iz < N; iz++) {
                const nx = (ix / (N - 1)) * 2 - 1;
                const nz = (iz / (N - 1)) * 2 - 1;
                const x = nx * R;
                const z = nz * R;
                const h = field(nx, nz);
                lPos[k * 3] = x;
                lPos[k * 3 + 1] = heightAt(nx, nz);
                lPos[k * 3 + 2] = z;
                if (h > 0.82) c.copy(pal.signal);
                else c.copy(pal.deep).lerp(pal.structure, THREE.MathUtils.clamp((h - 0.15) / 0.55, 0, 1));
                lCol[k * 3] = c.r;
                lCol[k * 3 + 1] = c.g;
                lCol[k * 3 + 2] = c.b;
                // the field parts around the figure — a clean column where the human stands
                const inVoid = Math.abs(x) < 1.15 && z > -0.6 && z < 3.2;
                lSize[k] = inVoid ? 0 : 0.7 + h * 1.9;
                k++;
            }
        }
        const landGeo = new THREE.BufferGeometry();
        landGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
        landGeo.setAttribute("aColor", new THREE.BufferAttribute(lCol, 3));
        landGeo.setAttribute("aSize", new THREE.BufferAttribute(lSize, 1));

        // 2. wireframe market topology beneath the points
        const SN = tier === "high" ? 64 : 44;
        const surfGeo = new THREE.PlaneGeometry(R * 2, R * 2, SN, SN);
        surfGeo.rotateX(-Math.PI / 2);
        const sp = surfGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < sp.count; i++) {
            const x = sp.getX(i);
            const z = sp.getZ(i);
            sp.setY(i, field(x / R, z / R) * 2.4 - 0.72);
        }
        sp.needsUpdate = true;
        const surfMat = new THREE.MeshBasicMaterial({
            color: pal.structure,
            wireframe: true,
            transparent: true,
            opacity: pal.wireOpacity,
            depthWrite: false,
        });

        // 3. connected node graph floating above the landscape
        const rand = mulberry32(SEED + 99);
        const count = tier === "high" ? 30 : 20;
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i < count; i++) {
            pts.push(
                new THREE.Vector3((rand() * 2 - 1) * 8, 1.4 + rand() * 3.1, (rand() * 2 - 1) * 8)
            );
        }
        const nPos = new Float32Array(count * 3);
        const nCol = new Float32Array(count * 3);
        const nSize = new Float32Array(count);
        const eArr: number[] = [];
        pts.forEach((p, i) => {
            nPos[i * 3] = p.x;
            nPos[i * 3 + 1] = p.y;
            nPos[i * 3 + 2] = p.z;
            const isSignal = i % 8 === 0;
            c.copy(isSignal ? pal.signal : pal.structure);
            nCol[i * 3] = c.r;
            nCol[i * 3 + 1] = c.g;
            nCol[i * 3 + 2] = c.b;
            nSize[i] = isSignal ? 6 : 3.6;
            const near = pts
                .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
                .filter((o) => o.j !== i)
                .sort((a, b) => a.d - b.d)
                .slice(0, 2);
            near.forEach((o) => eArr.push(p.x, p.y, p.z, pts[o.j].x, pts[o.j].y, pts[o.j].z));
        });
        const nodeGeo = new THREE.BufferGeometry();
        nodeGeo.setAttribute("position", new THREE.BufferAttribute(nPos, 3));
        nodeGeo.setAttribute("aColor", new THREE.BufferAttribute(nCol, 3));
        nodeGeo.setAttribute("aSize", new THREE.BufferAttribute(nSize, 1));
        const edgeGeo = new THREE.BufferGeometry();
        edgeGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(eArr), 3));
        const edgeMat = new THREE.LineBasicMaterial({
            color: pal.structure,
            transparent: true,
            opacity: pal.edgeOpacity,
            depthWrite: false,
        });

        // 4. drifting data motes — depth, haze, particle flow
        const mrand = mulberry32(SEED + 7);
        const mCount = tier === "high" ? 440 : 220;
        const mPos = new Float32Array(mCount * 3);
        const mCol = new Float32Array(mCount * 3);
        const mSize = new Float32Array(mCount);
        for (let i = 0; i < mCount; i++) {
            mPos[i * 3] = (mrand() * 2 - 1) * 12;
            mPos[i * 3 + 1] = mrand() * 7 - 1.5;
            mPos[i * 3 + 2] = (mrand() * 2 - 1) * 12;
            c.copy(mrand() > 0.95 ? pal.signal : pal.faint);
            mCol[i * 3] = c.r;
            mCol[i * 3 + 1] = c.g;
            mCol[i * 3 + 2] = c.b;
            mSize[i] = 0.5 + mrand() * 1.1;
        }
        const moteGeo = new THREE.BufferGeometry();
        moteGeo.setAttribute("position", new THREE.BufferAttribute(mPos, 3));
        moteGeo.setAttribute("aColor", new THREE.BufferAttribute(mCol, 3));
        moteGeo.setAttribute("aSize", new THREE.BufferAttribute(mSize, 1));

        const fieldMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
          uDrift: { value: 0 },
          uRangeMin: { value: 0 },
          uRangeMax: { value: 1 },
          uOpacity: { value: PALETTES[theme].pointOpacity },
          uFogNear: { value: 4.0 },
          uFogFar: { value: 12.0 },
          uFogColor: { value: new THREE.Color(0x0a0a0c) },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending,
      }); // Add subtle drift for depth
        const moteMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
          uDrift: { value: 0.15 },
          uRangeMin: { value: -2.0 },
          uRangeMax: { value: 6.0 },
          uOpacity: { value: PALETTES[theme].pointOpacity * 0.6 },
          uFogNear: { value: 4.0 },
          uFogFar: { value: 12.0 },
          uFogColor: { value: new THREE.Color(0x0a0a0c) },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending,
      }); // Enhanced depth range

        return { landGeo, surfGeo, surfMat, nodeGeo, edgeGeo, edgeMat, moteGeo, fieldMat, moteMat };
    }, [field, tier, theme, pal]);

    /* The frame loop mutates GPU uniforms through a ref — refs are stable mutable
       containers, so the memoized asset set itself stays immutable per render and
       is still disposed on the way out (or when tier/theme rebuild it). */
    const assetsRef = useRef(assets);
    useEffect(() => {
        assetsRef.current = assets;
        return () => {
            Object.values(assets).forEach((a) => {
                const d = a as unknown as { dispose?: () => void };
                d.dispose?.();
            });
        };
    }, [assets]);

    const desired = useMemo(() => new THREE.Vector3(), []);
    const target = useMemo(() => new THREE.Vector3(), []);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        const pr = gl.getPixelRatio();
        assetsRef.current.fieldMat.uniforms.uTime.value = t;
        assetsRef.current.moteMat.uniforms.uTime.value = t;
        assetsRef.current.fieldMat.uniforms.uPixelRatio.value = pr;
        assetsRef.current.moteMat.uniforms.uPixelRatio.value = pr;
        assetsRef.current.fieldMat.uniforms.uFogNear.value = 4.0 + Math.sin(t * 0.1) * 0.5;
        assetsRef.current.fieldMat.uniforms.uFogFar.value = 12.0 + Math.cos(t * 0.08) * 1.0;
        assetsRef.current.moteMat.uniforms.uFogNear.value = 4.0 + Math.sin(t * 0.1) * 0.5;
        assetsRef.current.moteMat.uniforms.uFogFar.value = 12.0 + Math.cos(t * 0.08) * 1.0;

        // ACT I (the human) → ACT II (the field): pull back and rise as scroll advances
        const s = THREE.MathUtils.clamp(scrollRef.current, 0, 1);
        const ease = s * s * (3 - 2 * s);
        desired.set(
            THREE.MathUtils.lerp(0.0, 1.7, ease) + pointerRef.current.x * 0.6 + Math.sin(t * 0.13) * 0.2,
            THREE.MathUtils.lerp(0.55, 2.5, ease) + pointerRef.current.y * 0.3 + Math.cos(t * 0.11) * 0.12,
            THREE.MathUtils.lerp(4.2, 8.8, ease)
        );
        const k = 1 - Math.pow(0.0016, delta);
        camera.position.lerp(desired, k);
        target.set(0, THREE.MathUtils.lerp(0.7, 0.15, ease), THREE.MathUtils.lerp(0.5, -0.7, ease));
        camera.lookAt(target);
    });

    return (
        <group>
            <points geometry={assets.landGeo} material={assets.fieldMat} frustumCulled={false} />
            <mesh geometry={assets.surfGeo} material={assets.surfMat} frustumCulled={false} />
            <lineSegments geometry={assets.edgeGeo} material={assets.edgeMat} frustumCulled={false} />
            <points geometry={assets.nodeGeo} material={assets.fieldMat} frustumCulled={false} />
            <points geometry={assets.moteGeo} material={assets.moteMat} frustumCulled={false} />
        </group>
    );
}
