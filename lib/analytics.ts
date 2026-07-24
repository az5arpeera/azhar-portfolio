import { z } from "zod";

export const analyticsEventSchema = z.object({
  event_type: z.enum(["page_view", "section_view", "venture_click", "contact_submit"]),
  path: z.string().max(512).optional(),
  section: z.string().max(64).optional(),
  session_id: z.string().max(64).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

const SESSION_KEY = "ap_session";

function sessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** No-ops unless the visitor consented. Never blocks or throws. */
export function track(
  event: Omit<AnalyticsEvent, "session_id" | "path">,
  consented: boolean,
) {
  if (!consented || typeof window === "undefined") return;

  const body = JSON.stringify({
    ...event,
    path: window.location.pathname,
    session_id: sessionId(),
  });

  if (navigator.sendBeacon?.("/api/analytics", body)) return;

  void fetch("/api/analytics", {
    method: "POST",
    body,
    keepalive: true,
    headers: { "Content-Type": "application/json" },
  }).catch(() => {});
}
