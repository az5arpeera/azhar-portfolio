"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { OceanParticles } from "./OceanParticles";
import { useScrollStore } from "@/lib/store/useScrollStore";
import { pointerTarget } from "@/lib/three/pointer";
import type { Tier } from "@/lib/gpu-tier";

/* Scroll-reactive dive: the camera descends and drifts back as the user scrolls,
   with a light mouse parallax. Postprocessing (bloom + DoF) only on the full
   tier — the reduced tier runs the same particles with fewer of them, no post. */
function Rig() {
  const { camera } = useThree();
  const eased = useRef(0);

  useFrame((_, delta) => {
    const target = useScrollStore.getState().progress;
    eased.current += (target - eased.current) * Math.min(1, delta * 2.5);
    const p = eased.current;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointerTarget.x * 0.6,
      Math.min(1, delta * 2),
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      -p * 2.5 + pointerTarget.y * 0.4,
      Math.min(1, delta * 2),
    );
    camera.position.z = 9 + p * 3;
    camera.lookAt(0, camera.position.y * 0.3, 0);
  });

  return null;
}

export function OceanScene({ tier }: { tier: Exclude<Tier, "static"> }) {
  const count = tier === "full" ? 9000 : 3500;

  return (
    <>
      <OceanParticles count={count} />
      <Rig />
      {tier === "full" && (
        <EffectComposer>
          <Bloom
            intensity={1.4}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.5}
            mipmapBlur
            radius={0.85}
          />
        </EffectComposer>
      )}
    </>
  );
}
