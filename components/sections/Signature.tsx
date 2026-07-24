"use client";

import { useEffect, useRef, useState } from "react";
import { Dancing_Script } from "next/font/google";

const script = Dancing_Script({ subsets: ["latin"], weight: ["600", "700"] });

/* Placeholder signature: the real one (Azhar's own) will be traced to an SVG
   path and drawn with a true stroke-dashoffset animation. Until then this
   reveals a script-font name left-to-right like it's being written, triggered
   when it scrolls into view. Swapping in the real signature is a drop-in. */
export function Signature({ name = "Azhar Peera" }: { name?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-4 px-6 pt-10 pb-28"
    >
      <div
        className={`${script.className} signature-ink ${drawn ? "is-drawn" : ""}`}
        aria-label={`${name}, signature`}
      >
        {name}
      </div>
      <div className={`signature-rule ${drawn ? "is-drawn" : ""}`} aria-hidden />
    </div>
  );
}
