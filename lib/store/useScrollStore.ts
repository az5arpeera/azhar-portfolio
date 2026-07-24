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
  /** 0-1 progress through the whole page. */
  progress: number;
  /** Continuous section position: 2.4 = 40% of the way from section 2 to 3.
      This is what the ocean morph interpolates its theme along. */
  sectionFloat: number;
  setActiveSection: (id: SectionId) => void;
  setProgress: (progress: number) => void;
  setSectionFloat: (v: number) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  activeSection: "hero",
  progress: 0,
  sectionFloat: 0,
  setActiveSection: (activeSection) => set({ activeSection }),
  setProgress: (progress) => set({ progress }),
  setSectionFloat: (sectionFloat) => set({ sectionFloat }),
}));
