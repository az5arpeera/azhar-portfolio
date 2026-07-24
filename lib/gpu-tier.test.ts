import { describe, it, expect, vi, afterEach } from "vitest";
import { detectTier } from "./gpu-tier";

function stubEnv({
  reduce = false,
  small = false,
  cores = 8,
  renderer = "NVIDIA GeForce RTX 4070",
  noWebgl = false,
}: {
  reduce?: boolean;
  small?: boolean;
  cores?: number;
  renderer?: string;
  noWebgl?: boolean;
}) {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: q.includes("reduced-motion") ? reduce : small,
  }));
  vi.stubGlobal("navigator", { hardwareConcurrency: cores });
  const gl = {
    getExtension: () => ({ UNMASKED_RENDERER_WEBGL: 37446 }),
    getParameter: () => renderer,
  };
  vi.stubGlobal("document", {
    createElement: () => ({ getContext: () => (noWebgl ? null : gl) }),
  });
}

afterEach(() => vi.unstubAllGlobals());

describe("detectTier", () => {
  it("returns static when motion is off regardless of hardware", () => {
    stubEnv({});
    expect(detectTier(false)).toBe("static");
  });

  it("returns static when the OS prefers reduced motion", () => {
    stubEnv({ reduce: true });
    expect(detectTier(true)).toBe("static");
  });

  it("returns static when WebGL is unavailable", () => {
    stubEnv({ noWebgl: true });
    expect(detectTier(true)).toBe("static");
  });

  it("returns full on a strong discrete GPU", () => {
    stubEnv({ renderer: "NVIDIA GeForce RTX 4070", cores: 16 });
    expect(detectTier(true)).toBe("full");
  });

  it("downgrades to reduced on a small viewport", () => {
    stubEnv({ small: true, cores: 16 });
    expect(detectTier(true)).toBe("reduced");
  });

  it("downgrades to reduced on weak integrated graphics", () => {
    stubEnv({ renderer: "Intel(R) UHD Graphics 620", cores: 8 });
    expect(detectTier(true)).toBe("reduced");
  });

  it("keeps full on a capable Intel Arc GPU", () => {
    stubEnv({ renderer: "Intel(R) Arc(TM) Graphics", cores: 16 });
    expect(detectTier(true)).toBe("full");
  });

  it("downgrades to reduced on few cores", () => {
    stubEnv({ cores: 4 });
    expect(detectTier(true)).toBe("reduced");
  });
});
