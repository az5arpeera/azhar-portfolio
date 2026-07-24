"use client";

import { useEffect } from "react";
import { useSceneStore } from "@/lib/store/useSceneStore";
import type { ThemeKey } from "@/lib/ocean-themes";

/* Each routed page renders this to declare which theme sequence the persistent
   ocean should morph along. On navigation the sequence swaps and the field
   eases into the new page's mood — the morph now happens between pages instead
   of purely on scroll. */
export function SceneRoute({ sequence }: { sequence: ThemeKey[] }) {
  const setSequence = useSceneStore((s) => s.setSequence);
  const key = sequence.join(",");

  useEffect(() => {
    setSequence(sequence);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSequence, key]);

  return null;
}
