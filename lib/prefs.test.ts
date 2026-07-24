import { describe, it, expect } from "vitest";
import { DEFAULT_PREFS, parsePrefsCookie, serializePrefs } from "./prefs";

describe("parsePrefsCookie", () => {
  it("returns defaults when the cookie is absent", () => {
    expect(parsePrefsCookie(undefined)).toEqual(DEFAULT_PREFS);
  });

  it("returns defaults for malformed JSON", () => {
    expect(parsePrefsCookie("not json")).toEqual(DEFAULT_PREFS);
  });

  it("returns defaults when a field has the wrong type", () => {
    const bad = JSON.stringify({ ...DEFAULT_PREFS, theme: "purple" });
    expect(parsePrefsCookie(bad)).toEqual(DEFAULT_PREFS);
  });

  it("round-trips a valid prefs object", () => {
    const prefs = {
      theme: "light" as const,
      animOn: false,
      audioOn: true,
      analyticsConsent: true,
    };
    expect(parsePrefsCookie(serializePrefs(prefs))).toEqual(prefs);
  });
});
