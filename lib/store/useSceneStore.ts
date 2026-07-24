"use client";

import { create } from "zustand";
import { HOME_SEQUENCE, type ThemeKey } from "@/lib/ocean-themes";

/* The persistent canvas is global, so each route declares which theme sequence
   the ocean should morph along. Pages set this on mount and restore the home
   sequence on unmount. */
type SceneState = {
  sequence: ThemeKey[];
  setSequence: (sequence: ThemeKey[]) => void;
  resetSequence: () => void;
};

export const useSceneStore = create<SceneState>((set) => ({
  sequence: HOME_SEQUENCE,
  setSequence: (sequence) => set({ sequence }),
  resetSequence: () => set({ sequence: HOME_SEQUENCE }),
}));
