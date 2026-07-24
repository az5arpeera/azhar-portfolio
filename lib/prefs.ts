import { z } from "zod";

export const PREFS_COOKIE = "ap_prefs";
export const PREFS_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const prefsSchema = z.object({
  theme: z.enum(["dark", "light"]),
  animOn: z.boolean(),
  audioOn: z.boolean(),
  analyticsConsent: z.boolean(),
});

export type Prefs = z.infer<typeof prefsSchema>;

export const DEFAULT_PREFS: Prefs = {
  theme: "dark",
  animOn: true,
  audioOn: false,
  analyticsConsent: false,
};

export function parsePrefsCookie(raw: string | undefined): Prefs {
  if (!raw) return DEFAULT_PREFS;
  try {
    const parsed = prefsSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

export function serializePrefs(prefs: Prefs): string {
  return JSON.stringify(prefs);
}
