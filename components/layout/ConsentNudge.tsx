"use client";

import { useState } from "react";
import { usePrefsStore } from "@/lib/store/usePrefsStore";

export function ConsentNudge() {
  const analyticsConsent = usePrefsStore((s) => s.analyticsConsent);
  const setAnalyticsConsent = usePrefsStore((s) => s.setAnalyticsConsent);
  const [dismissed, setDismissed] = useState(false);

  if (analyticsConsent || dismissed) return null;

  return (
    <div
      data-testid="consent-nudge"
      className="fixed bottom-4 left-4 z-200 flex max-w-[340px] flex-col gap-3 rounded-card border p-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-[14px]"
      style={{ background: "var(--control-bg)", borderColor: "var(--border)" }}
    >
      <p className="text-[13px] leading-[1.5]" style={{ color: "var(--text)" }}>
        Your theme, motion, and audio choices are saved on this device either
        way. May I also count anonymous page and section views?
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setAnalyticsConsent(true)}
          data-testid="consent-accept"
          className="cursor-pointer rounded-full border-none px-3.5 py-1.5 text-xs font-medium"
          style={{ background: "var(--button-bg-active)", color: "var(--text)" }}
        >
          Sure
        </button>
        <button
          onClick={() => setDismissed(true)}
          data-testid="consent-decline"
          className="cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium"
          style={{ background: "transparent", borderColor: "var(--border)", color: "var(--text-dim)" }}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
