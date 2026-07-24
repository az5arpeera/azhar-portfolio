"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { usePrefsStore } from "@/lib/store/usePrefsStore";
import type { Prefs } from "@/lib/prefs";

export function Providers({
  initialPrefs,
  children,
}: {
  initialPrefs: Prefs;
  children: React.ReactNode;
}) {
  const theme = usePrefsStore((s) => s.theme);
  const animOn = usePrefsStore((s) => s.animOn);

  // Seeded during the first render, not in an effect, so the widget never
  // paints a frame with the default prefs before the cookie values land.
  useState(() => usePrefsStore.setState(initialPrefs));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.motion = animOn ? "on" : "off";
  }, [theme, animOn]);

  return <SessionProvider>{children}</SessionProvider>;
}
