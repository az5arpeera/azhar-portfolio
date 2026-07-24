"use client";

import { useEffect, useRef } from "react";
import { usePrefsStore } from "@/lib/store/usePrefsStore";
import { useScrollStore, type SectionId } from "@/lib/store/useScrollStore";
import { track } from "@/lib/analytics";

/* Watches every <section id> and keeps useScrollStore in sync. Runs regardless
   of the motion setting — the 3D scene, analytics, and later the audio
   crossfade all read active section from here. */
export function SectionTracker() {
  const setActiveSection = useScrollStore((s) => s.setActiveSection);
  const setProgress = useScrollStore((s) => s.setProgress);
  const consentRef = useRef(usePrefsStore.getState().analyticsConsent);
  const seen = useRef(new Set<string>());

  useEffect(
    () =>
      usePrefsStore.subscribe((s) => {
        consentRef.current = s.analyticsConsent;
      }),
    [],
  );

  useEffect(() => {
    track({ event_type: "page_view" }, consentRef.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id as SectionId;
          setActiveSection(id);
          if (!seen.current.has(id)) {
            seen.current.add(id);
            track({ event_type: "section_view", section: id }, consentRef.current);
          }
        }
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setProgress]);

  return null;
}
