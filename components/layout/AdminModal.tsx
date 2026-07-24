"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export function AdminModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Creator access"
      data-testid="admin-modal"
      className="fixed inset-0 z-300 flex items-center justify-center backdrop-blur-[6px]"
      style={{ background: "var(--overlay)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 rounded-2xl p-7 text-center shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
        style={{ background: "var(--card-bg)" }}
      >
        <div className="mb-1.5 text-[11px] font-medium tracking-[0.08em] text-text-dim uppercase">
          Creator access
        </div>
        <div className="mb-[18px] font-display text-xl text-text">
          Sign in to edit
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          data-testid="google-signin"
          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border p-3 text-[13px] font-medium text-text"
          style={{
            background: "var(--button-bg)",
            borderColor: "var(--border)",
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
