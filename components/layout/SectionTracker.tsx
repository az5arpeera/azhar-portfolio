"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePrefsStore } from "@/lib/store/usePrefsStore";
import { useScrollStore, type SectionId } from "@/lib/store/useScrollStore";
import { track } from "@/lib/analytics";

/* Watches every <section id> and keeps useScrollStore in sync. Runs regardless
   of the motion setting — the 3D scene, analytics, and later the audio
   crossfade all read active section from here. */
export function SectionTracker() {
  const pathname = usePathname();
  const setActiveSection = useScrollStore((s) => s.setActiveSection);
  const setProgress = useScrollStore((s) => s.setProgress);
  const setSectionFloat = useScrollStore((s) => s.setSectionFloat);
  const consentRef = useRef(usePrefsStore.getState().analyticsConsent);
  const seen = useRef(new Set<string>());

  useEffect(
    () =>
      usePrefsStore.subscribe((s) => {
        consentRef.current = s.analyticsConsent;
      }),
    [],
  );

  // One page view per route navigation.
  useEffect(() => {
    track({ event_type: "page_view" }, consentRef.current);
  }, [pathname]);

  // Re-observe on every route change: each page renders its own sections, so the
  // observer must be rebuilt against the new DOM after client-side navigation.
  useEffect(() => {
    seen.current = new Set<string>();
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
  }, [setActiveSection, pathname]);

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);

      // Continuous section position from real section geometry, so the ocean
      // morph aligns to sections despite their unequal heights. Uses the
      // viewport centre as the reference line.
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section[id]"),
      );
      if (sections.length === 0) return;
      const line = window.scrollY + window.innerHeight / 2;
      let float = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = sections[i];
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (line < top) {
          float = i;
          break;
        }
        if (line >= top && line < bottom) {
          float = i + (line - top) / el.offsetHeight;
          break;
        }
        float = i;
      }
      setSectionFloat(float);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [setProgress, setSectionFloat, pathname]);

  return null;
}
