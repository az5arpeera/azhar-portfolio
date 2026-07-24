"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "home" },
  { href: "/experience", label: "experience" },
  { href: "/ventures", label: "ventures" },
  { href: "/notes", label: "notes" },
  { href: "/contact", label: "contact" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/* Persistent primary navigation. The ocean canvas stays mounted underneath as
   routes change, so moving between pages morphs the world rather than reloading
   it. Hidden on the admin surface. */
export function TopNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 z-40 flex items-center gap-5 px-6 py-5 sm:gap-7 sm:px-8"
    >
      {ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="text-legible group relative text-[13px] tracking-[0.06em] transition-colors duration-300"
            style={{
              color: active ? "var(--ocean-text)" : "var(--ocean-text-dim)",
            }}
          >
            {item.label}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px bg-current transition-all duration-300"
              style={{ width: active ? "100%" : "0%" }}
            />
          </Link>
        );
      })}
    </nav>
  );
}
