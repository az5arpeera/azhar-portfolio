"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { usePrefsStore } from "@/lib/store/usePrefsStore";
import type { Prefs } from "@/lib/prefs";

export function Providers({
  initialPrefs,
  hadCookie,
  children,
}: {
  initialPrefs: Prefs;
  hadCookie: boolean;
  children: React.ReactNode;
}) {
  const theme = usePrefsStore((s) => s.theme);
  const animOn = usePrefsStore((s) => s.animOn);

  // Seeded during the first render, not in an effect, so the widget never
  // paints a frame with the default prefs before the cookie values land.
  useState(() => usePrefsStore.setState(initialPrefs));

  useEffect(() => {
    let effectiveAnimOn = animOn;

    // With no saved cookie, the OS reduced-motion setting is the source of
    // truth — matched by the pre-hydration script for the first paint and
    // reconciled into the store here so this effect doesn't clobber it.
    if (
      !hadCookie &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      effectiveAnimOn = false;
      if (animOn) usePrefsStore.setState({ animOn: false });
    }

    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.motion = effectiveAnimOn ? "on" : "off";
  }, [theme, animOn, hadCookie]);

  return <SessionProvider>{children}</SessionProvider>;
}
