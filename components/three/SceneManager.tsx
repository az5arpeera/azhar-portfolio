"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { usePrefsStore } from "@/lib/store/usePrefsStore";
import { detectTier, type Tier } from "@/lib/gpu-tier";

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
    // Still frame: the CSS ocean gradient shows through the transparent hero
    // and contact sections in place of the live scene.
    return (
      <div
        aria-hidden
        data-testid="ocean-static"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "var(--ocean-gradient)" }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      data-testid="ocean-canvas"
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={tier === "full" ? [1, 2] : 1}
        gl={{ antialias: tier === "full", powerPreference: "high-performance" }}
      >
        <OceanScene tier={tier} />
      </Canvas>
    </div>
  );
}
