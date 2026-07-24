export type Tier = "full" | "reduced" | "static";

/* Decides how much of the 3D scene to run. "static" mounts no WebGL at all —
   the CSS gradient stands in — and is also what motion-off users always get. */
export function detectTier(animOn: boolean): Tier {
  if (typeof window === "undefined") return "static";
  if (!animOn) return "static";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "static";
  }

  // Coarse pointer + narrow viewport is a strong mobile signal.
  const isSmall = window.matchMedia("(max-width: 820px)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;

  let renderer = "";
  try {
    const gl = document
      .createElement("canvas")
      .getContext("webgl2") as WebGL2RenderingContext | null;
    if (!gl) return "static";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (ext) {
      renderer = String(
        gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? "",
      ).toLowerCase();
    }
  } catch {
    return "static";
  }

  // Known low-power / software renderers never get the full tier. Integrated
  // Intel HD/UHD is weak, but Arc and Iris Xe are capable, so match narrowly.
  const weak =
    /swiftshader|llvmpipe|software|apple gpu|powervr|mali|adreno [1-5]|intel.*(hd|uhd) graphics/.test(
      renderer,
    );

  if (isSmall || cores <= 4 || weak) return "reduced";
  return "full";
}
