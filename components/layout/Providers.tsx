"use client";

import { useEffect, useRef } from "react";
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
  const hydrate = usePrefsStore((s) => s.hydrate);
  const theme = usePrefsStore((s) => s.theme);
  const animOn = usePrefsStore((s) => s.animOn);
  const hydrated = useRef(false);

  if (!hydrated.current) {
    usePrefsStore.setState(initialPrefs);
    hydrated.current = true;
  }

  useEffect(() => {
    hydrate(initialPrefs);
  }, [hydrate, initialPrefs]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.motion = animOn ? "on" : "off";
  }, [theme, animOn]);

  return <SessionProvider>{children}</SessionProvider>;
}
