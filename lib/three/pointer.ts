"use client";

/* The scene canvas is pointer-events:none (so it never eats clicks/scroll),
   which means react-three-fiber's own pointer never updates. This is a single
   global listener that both the camera parallax and the particle "cut through
   the water" repulsion read from. Values are normalised device coords:
   x,y in [-1, 1], y up. Ref-counted so multiple consumers can bind safely. */
export const pointerTarget = { x: 0, y: 0, active: false };

let count = 0;

function onMove(e: PointerEvent) {
  pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointerTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
  pointerTarget.active = true;
}

function onLeave() {
  pointerTarget.active = false;
}

export function bindPointer() {
  if (typeof window === "undefined") return () => {};
  if (count++ === 0) {
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
  }
  return () => {
    if (--count === 0) {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("mouseleave", onLeave);
    }
  };
}
