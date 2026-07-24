/* A theme is a set of continuously-blendable parameters for the particle field.
   Scroll position interpolates between adjacent themes, so the single field
   morphs — color, flow behaviour, speed — into each section's mood without a cut.

   flow selects the motion behaviour in the shader and is itself interpolated:
     0 = ocean current   1 = racetrack streaks
     2 = lattice / panels 3 = waveform / data
*/
export type OceanTheme = {
  colorTop: [number, number, number];
  colorBottom: [number, number, number];
  flow: number;
  speed: number;
  spread: number;
  accent: number;
};

export const THEMES = {
  ocean: {
    colorTop: [0.6, 0.95, 1.0],
    colorBottom: [0.06, 0.34, 0.55],
    flow: 0,
    speed: 1,
    spread: 1,
    accent: 1.1,
  },
  calm: {
    colorTop: [0.42, 0.74, 0.9],
    colorBottom: [0.04, 0.24, 0.42],
    flow: 0,
    speed: 0.55,
    spread: 0.9,
    accent: 0.95,
  },
  deep: {
    colorTop: [0.3, 0.58, 0.82],
    colorBottom: [0.03, 0.16, 0.34],
    flow: 0,
    speed: 0.45,
    spread: 0.8,
    accent: 0.85,
  },
  racetrack: {
    colorTop: [1.0, 0.82, 0.42],
    colorBottom: [0.4, 0.16, 0.06],
    flow: 1,
    speed: 1.7,
    spread: 1.15,
    accent: 1.3,
  },
  // Venture-page moods (used in Phase 9).
  panels: {
    colorTop: [0.6, 0.85, 0.95],
    colorBottom: [0.05, 0.1, 0.16],
    flow: 2,
    speed: 0.8,
    spread: 1,
    accent: 1.1,
  },
  data: {
    colorTop: [0.75, 0.55, 0.98],
    colorBottom: [0.08, 0.04, 0.18],
    flow: 3,
    speed: 1.1,
    spread: 1.05,
    accent: 1.2,
  },
  workbench: {
    colorTop: [0.95, 0.55, 0.3],
    colorBottom: [0.1, 0.06, 0.05],
    flow: 2,
    speed: 0.9,
    spread: 0.95,
    accent: 1.1,
  },
  clear: {
    colorTop: [0.6, 0.95, 0.85],
    colorBottom: [0.03, 0.14, 0.14],
    flow: 0,
    speed: 0.7,
    spread: 1.1,
    accent: 1,
  },
} as const satisfies Record<string, OceanTheme>;

export type ThemeKey = keyof typeof THEMES;

/* Ordered themes for the one-page scroll journey, aligned to the section order
   in app/page.tsx. Scroll drives a float across this array. */
export const HOME_SEQUENCE: ThemeKey[] = [
  "ocean", // hero
  "calm", // about
  "racetrack", // ventures
  "deep", // notes
  "deep", // resume
  "calm", // certifications
  "calm", // interests
  "ocean", // contact
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function blendThemes(a: OceanTheme, b: OceanTheme, t: number): OceanTheme {
  return {
    colorTop: [
      lerp(a.colorTop[0], b.colorTop[0], t),
      lerp(a.colorTop[1], b.colorTop[1], t),
      lerp(a.colorTop[2], b.colorTop[2], t),
    ],
    colorBottom: [
      lerp(a.colorBottom[0], b.colorBottom[0], t),
      lerp(a.colorBottom[1], b.colorBottom[1], t),
      lerp(a.colorBottom[2], b.colorBottom[2], t),
    ],
    flow: lerp(a.flow, b.flow, t),
    speed: lerp(a.speed, b.speed, t),
    spread: lerp(a.spread, b.spread, t),
    accent: lerp(a.accent, b.accent, t),
  };
}

/* Maps a continuous section position (e.g. 2.4 = 40% from ventures→notes) to a
   blended theme along the given sequence. */
export function themeAt(sequence: ThemeKey[], sectionFloat: number): OceanTheme {
  const clamped = Math.max(0, Math.min(sequence.length - 1, sectionFloat));
  const i = Math.floor(clamped);
  const f = clamped - i;
  const a = THEMES[sequence[i]];
  const b = THEMES[sequence[Math.min(sequence.length - 1, i + 1)]];
  // smootherstep for easing between sections
  const e = f * f * f * (f * (f * 6 - 15) + 10);
  return blendThemes(a, b, e);
}
