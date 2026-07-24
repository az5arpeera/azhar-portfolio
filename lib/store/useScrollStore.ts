"use client";

import { create } from "zustand";

export type SectionId =
  | "hero"
  | "about"
  | "ventures"
  | "notes"
  | "resume"
  | "certifications"
  | "interests"
  | "contact";

type ScrollState = {
  activeSection: SectionId;
  /** 0-1 progress through the whole page, the uniform the 3D scene reads. */
  progress: number;
  setActiveSection: (id: SectionId) => void;
  setProgress: (progress: number) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  activeSection: "hero",
  progress: 0,
  setActiveSection: (activeSection) => set({ activeSection }),
  setProgress: (progress) => set({ progress }),
}));
