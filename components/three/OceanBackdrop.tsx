"use client";

import { useEffect, useRef } from "react";
import { useScrollStore } from "@/lib/store/useScrollStore";
import { useSceneStore } from "@/lib/store/useSceneStore";
import { themeAt } from "@/lib/ocean-themes";

/* A full-viewport gradient that sits *behind* the particle canvas and morphs
   through the exact same theme engine the particles use. Without this the live
   canvas floats on flat page-bg and the field reads as scattered specks; with
   it the world always looks like a lit body of water. Updates on scroll (cheap
   string write, no React re-render) so it stays in lockstep with the particles.
   On the static tier it still renders a rich, correct still frame. */
function toRgb([r, g, b]: readonly [number, number, number], mul = 1) {
  const c = (v: number) => Math.round(Math.min(1, Math.max(0, v * mul)) * 255);
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

export function OceanBackdrop({ testId }: { testId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apply = () => {
      const el = ref.current;
      if (!el) return;
      const { sectionFloat } = useScrollStore.getState();
      const seq = useSceneStore.getState().sequence;
      const t = themeAt(seq, sectionFloat);
      const horizon = toRgb(t.colorTop, 0.55); // lit surface up top
      const body = toRgb(t.colorBottom, 1.15); // saturated water
      const floor = toRgb(t.colorBottom, 0.32); // deep dark below
      el.style.background = `radial-gradient(150% 115% at 50% -18%, ${horizon} 0%, ${body} 46%, ${floor} 100%)`;
    };
    apply();
    const unsub = useScrollStore.subscribe(apply);
    return unsub;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-testid={testId}
      className="pointer-events-none fixed inset-0 -z-20"
    />
  );
}
