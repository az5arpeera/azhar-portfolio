"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* The pages form a linear journey, so left/right (arrow keys or the on-screen
   chevrons) step through them in order. Keyboard nav ignores typing in fields.
   Hidden on admin. */
const ORDER = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/ventures", label: "Ventures" },
  { href: "/notes", label: "Notes" },
  { href: "/contact", label: "Contact" },
] as const;

export function PageArrows() {
  const pathname = usePathname();
  const router = useRouter();

  const current = pathname.startsWith("/ventures") ? "/ventures" : pathname;
  const idx = ORDER.findIndex((p) => p.href === current);
  const prev = idx > 0 ? ORDER[idx - 1] : null;
  const next = idx >= 0 && idx < ORDER.length - 1 ? ORDER[idx + 1] : null;
  const hidden = pathname.startsWith("/admin");

  useEffect(() => {
    if (hidden) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      if (e.key === "ArrowRight" && next) router.push(next.href);
      else if (e.key === "ArrowLeft" && prev) router.push(prev.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hidden, next, prev, router]);

  if (hidden) return null;

  return (
    <>
      {prev && (
        <Link
          href={prev.href}
          aria-label={`Previous page: ${prev.label}`}
          className="arrow-nav left-3 sm:left-5"
        >
          <ChevronLeft size={20} strokeWidth={1.5} aria-hidden />
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          aria-label={`Next page: ${next.label}`}
          className="arrow-nav right-3 sm:right-5"
        >
          <ChevronRight size={20} strokeWidth={1.5} aria-hidden />
        </Link>
      )}
    </>
  );
}
