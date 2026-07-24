"use client";

import { useState } from "react";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { usePrefsStore } from "@/lib/store/usePrefsStore";
import { AdminModal } from "./AdminModal";

export function ControlWidget() {
  const theme = usePrefsStore((s) => s.theme);
  const animOn = usePrefsStore((s) => s.animOn);
  const audioOn = usePrefsStore((s) => s.audioOn);
  const toggleTheme = usePrefsStore((s) => s.toggleTheme);
  const toggleAnim = usePrefsStore((s) => s.toggleAnim);
  const toggleAudio = usePrefsStore((s) => s.toggleAudio);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <>
      <div
        className="fixed top-[18px] right-[18px] z-200 flex items-center gap-2 rounded-full border p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-[14px]"
        style={{
          background: "var(--control-bg)",
          borderColor: "var(--border)",
        }}
      >
        <button
          onClick={toggleTheme}
          title="Light / dark"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          data-testid="theme-toggle"
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border-none text-text"
          style={{ background: "var(--button-bg)" }}
        >
          {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
        </button>

        <button
          onClick={toggleAnim}
          title="Animations on/off"
          aria-pressed={animOn}
          data-testid="motion-toggle"
          className="h-[34px] cursor-pointer rounded-full border-none px-3 text-[11px] font-medium tracking-[0.02em] text-text"
          style={{
            background: animOn
              ? "var(--button-bg-active)"
              : "var(--button-bg)",
          }}
        >
          {animOn ? "Motion on" : "Motion off"}
        </button>

        <button
          onClick={toggleAudio}
          title="Ambient audio"
          aria-pressed={audioOn}
          aria-label={audioOn ? "Mute ambient audio" : "Play ambient audio"}
          data-testid="audio-toggle"
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border-none text-text"
          style={{
            background: audioOn
              ? "var(--button-bg-active)"
              : "var(--button-bg)",
          }}
        >
          {audioOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>

        <div
          className="h-5 w-px"
          style={{ background: "var(--border)" }}
          aria-hidden
        />

        <button
          onClick={() => setShowAdmin(true)}
          title="Creator sign-in"
          aria-label="Creator sign-in"
          data-testid="admin-button"
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border bg-transparent font-display text-xs font-medium text-text-dim"
          style={{ borderColor: "var(--border)" }}
        >
          AP
        </button>
      </div>

      {showAdmin && <AdminModal onClose={() => setShowAdmin(false)} />}
    </>
  );
}
