"use client";

import { create } from "zustand";
import { DEFAULT_PREFS, type Prefs } from "@/lib/prefs";

type PrefsState = Prefs & {
  hydrate: (prefs: Prefs) => void;
  setTheme: (theme: Prefs["theme"]) => void;
  toggleTheme: () => void;
  toggleAnim: () => void;
  toggleAudio: () => void;
  setAnalyticsConsent: (consent: boolean) => void;
};

function persist(prefs: Prefs) {
  void fetch("/api/prefs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prefs),
  }).catch(() => {
    // Persistence is best-effort: the toggle already applied optimistically.
  });
}

function snapshot(state: PrefsState): Prefs {
  return {
    theme: state.theme,
    animOn: state.animOn,
    audioOn: state.audioOn,
    analyticsConsent: state.analyticsConsent,
  };
}

export const usePrefsStore = create<PrefsState>((set, get) => ({
  ...DEFAULT_PREFS,

  hydrate: (prefs) => set(prefs),

  setTheme: (theme) => {
    set({ theme });
    persist(snapshot(get()));
  },

  toggleTheme: () => {
    set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" }));
    persist(snapshot(get()));
  },

  toggleAnim: () => {
    set((s) => ({ animOn: !s.animOn }));
    persist(snapshot(get()));
  },

  toggleAudio: () => {
    set((s) => ({ audioOn: !s.audioOn }));
    persist(snapshot(get()));
  },

  setAnalyticsConsent: (analyticsConsent) => {
    set({ analyticsConsent });
    persist(snapshot(get()));
  },
}));
