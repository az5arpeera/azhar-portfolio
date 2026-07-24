"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { usePrefsStore } from "@/lib/store/usePrefsStore";
import { detectTier, type Tier } from "@/lib/gpu-tier";
import { OceanBackdrop } from "./OceanBackdrop";

const OceanScene = dynamic(
  () => import("./OceanScene").then((m) => m.OceanScene),
  { ssr: false },
);

/* One persistent full-viewport canvas fixed behind all content. A single
   continuous scene (not one canvas per section) is what lets the world morph
   rather than cut between sections. On the static tier nothing mounts — the
   page's CSS gradients carry the look on their own. */
export function SceneManager() {
  const animOn = usePrefsStore((s) => s.animOn);
  const [tier, setTier] = useState<Tier>("static");

  useEffect(() => {
    setTier(detectTier(animOn));
  }, [animOn]);

  if (tier === "static") {
    // Motion off / no-GPU: the morphing gradient carries the whole look on its
    // own, as a correct still frame of wherever the scroll currently is.
    return <OceanBackdrop testId="ocean-static" />;
  }

  return (
    <>
      <OceanBackdrop testId="ocean-backdrop" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        data-testid="ocean-canvas"
      >
        <Canvas
          camera={{ position: [0, 0, 9], fov: 60 }}
          dpr={tier === "full" ? [1, 1.75] : 1}
          gl={{ antialias: tier === "full", powerPreference: "high-performance" }}
        >
          <OceanScene tier={tier} />
        </Canvas>
      </div>
    </>
  );
}
