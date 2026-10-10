"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CinematicHumanFigure — an anonymous human silhouette composited INTO the
 * WebGL quant field. Rendered as a declarative R3F subtree (so it only ever
 * mounts inside a <Canvas>, participates in the shared render loop, and is
 * disposed with the scene). Near-black physically-blended material makes the
 * body read as a dark silhouette against the glowing field; a small soft red
 * core at the chest is the single restrained signal accent.
 *
 * Breathing is driven by useFrame (R3F-managed — no bespoke rAF, nothing to
 * clean up beyond unmount).
 */
export default function CinematicHumanFigure({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const breath = useRef<THREE.Group>(null);

  const body = theme === "dark" ? "#050507" : "#10141f";
  const rim = theme === "dark" ? "#3d4666" : "#232c42";

  useFrame((state) => {
    const g = breath.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const b = 1 + Math.sin(t * 0.55) * 0.012; // subtle breathing swell
    g.scale.set(1, b, 1);
  });

  return (
    <group position={[0, -0.72, 1.35]} rotation-y={Math.PI * 0.06}>
      <group ref={breath}>
        {/* torso */}
        <mesh position={[0, 0.92, 0]}>
          <boxGeometry args={[0.62, 1.14, 0.3]} />
          <meshBasicMaterial color={body} />
        </mesh>
        {/* shoulders */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[0.94, 0.16, 0.26]} />
          <meshBasicMaterial color={body} />
        </mesh>
        {/* head */}
        <mesh position={[0, 1.86, 0]}>
          <sphereGeometry args={[0.21, 24, 24]} />
          <meshBasicMaterial color={body} />
        </mesh>
        {/* arms — slightly angled outward for a natural stance */}
        <mesh position={[-0.42, 0.98, 0]} rotation={[0, 0, 0.09]}>
          <boxGeometry args={[0.11, 0.92, 0.11]} />
          <meshBasicMaterial color={body} />
        </mesh>
        <mesh position={[0.42, 0.98, 0]} rotation={[0, 0, -0.09]}>
          <boxGeometry args={[0.11, 0.92, 0.11]} />
          <meshBasicMaterial color={body} />
        </mesh>
        {/* legs */}
        <mesh position={[-0.16, 0.02, 0]}>
          <boxGeometry args={[0.17, 0.92, 0.17]} />
          <meshBasicMaterial color={body} />
        </mesh>
        <mesh position={[0.16, 0.02, 0]}>
          <boxGeometry args={[0.17, 0.92, 0.17]} />
          <meshBasicMaterial color={body} />
        </mesh>
        {/* faint rim/backplate so the silhouette separates from the field */}
        <mesh position={[0, 1.0, -0.18]}>
          <boxGeometry args={[1.1, 2.2, 0.02]} />
          <meshBasicMaterial color={rim} transparent opacity={0.16} depthWrite={false} />
        </mesh>
        {/* one restrained signal: a soft red core at the chest */}
        <mesh position={[0, 1.18, 0.17]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#cc3322" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 1.18, 0.16]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color="#cc3322" transparent opacity={0.12} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}
