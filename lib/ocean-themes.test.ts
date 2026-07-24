import { describe, it, expect } from "vitest";
import { THEMES, blendThemes, themeAt, HOME_SEQUENCE } from "./ocean-themes";

describe("blendThemes", () => {
  it("returns the first theme at t=0 and the second at t=1", () => {
    const a = THEMES.ocean;
    const b = THEMES.racetrack;
    expect(blendThemes(a, b, 0)).toEqual(a);
    expect(blendThemes(a, b, 1).flow).toBeCloseTo(b.flow);
    expect(blendThemes(a, b, 1).colorTop[0]).toBeCloseTo(b.colorTop[0]);
  });

  it("interpolates the midpoint", () => {
    const mid = blendThemes(THEMES.ocean, THEMES.racetrack, 0.5);
    expect(mid.flow).toBeCloseTo((THEMES.ocean.flow + THEMES.racetrack.flow) / 2);
  });
});

describe("themeAt", () => {
  it("returns the exact theme at an integer index", () => {
    const t = themeAt(HOME_SEQUENCE, 2); // ventures = racetrack
    expect(t.flow).toBeCloseTo(THEMES.racetrack.flow);
  });

  it("blends between adjacent sections", () => {
    const t = themeAt(HOME_SEQUENCE, 1.5); // between about(calm) and ventures(racetrack)
    expect(t.flow).toBeGreaterThan(THEMES.calm.flow);
    expect(t.flow).toBeLessThan(THEMES.racetrack.flow);
  });

  it("clamps below and above the sequence range", () => {
    expect(themeAt(HOME_SEQUENCE, -3)).toEqual(THEMES[HOME_SEQUENCE[0]]);
    expect(themeAt(HOME_SEQUENCE, 99)).toEqual(
      THEMES[HOME_SEQUENCE[HOME_SEQUENCE.length - 1]],
    );
  });

  it("has one theme per home section", () => {
    expect(HOME_SEQUENCE).toHaveLength(8);
  });
});
