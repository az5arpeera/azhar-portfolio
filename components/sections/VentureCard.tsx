import Link from "next/link";
import type { Venture } from "@/lib/queries";

export function VentureCard({ venture }: { venture: Venture }) {
  return (
    <Link
      href={`/ventures/${venture.slug}`}
      data-testid="venture-card"
      className="block rounded-card border p-[26px] no-underline transition-transform duration-200 hover:-translate-y-1"
      style={{
        background: "var(--venture-card-bg)",
        borderColor: "var(--venture-card-border)",
      }}
    >
      <div
        className="mb-2.5 text-[11px] font-medium tracking-[0.1em] uppercase"
        style={{ color: "var(--ventures-accent)" }}
      >
        {venture.tag}
      </div>
      <div
        className="mb-2.5 font-display text-[21px] font-normal"
        style={{ color: "var(--ventures-text)" }}
      >
        {venture.title}
      </div>
      <p
        className="text-sm leading-[1.6]"
        style={{ color: "var(--venture-card-dim)" }}
      >
        {venture.blurb}
      </p>
      <div
        className="mt-4 text-xs font-medium"
        style={{ color: "var(--ventures-accent)" }}
      >
        Deep dive →
      </div>
    </Link>
  );
}
