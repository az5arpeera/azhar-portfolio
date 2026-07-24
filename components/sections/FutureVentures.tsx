import { siteCopy, type Venture } from "@/lib/content";
import { VentureCard } from "./VentureCard";

export function FutureVentures({ ventures }: { ventures: Venture[] }) {
  return (
    <section
      id="ventures"
      className="relative min-h-screen px-6 py-[100px]"
      style={{ background: "var(--ventures-gradient)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-15"
        style={{
          background:
            "repeating-linear-gradient(100deg, transparent 0 60px, var(--ventures-accent) 60px 62px, transparent 62px 140px)",
          backgroundSize: "200% 100%",
          animation: "shimmer 6s linear infinite",
        }}
      />
      <div className="relative z-2 mx-auto max-w-[1100px]">
        <div className="mb-14 text-center">
          <div
            className="mb-3.5 text-xs font-medium tracking-[0.2em] uppercase"
            style={{ color: "var(--ventures-accent)" }}
          >
            Future Ventures
          </div>
          <h2
            className="font-display text-[34px] font-normal"
            style={{ color: "var(--ventures-text)" }}
          >
            {siteCopy.venturesHeadline}
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[22px]">
          {ventures.map((venture) => (
            <VentureCard key={venture.slug} venture={venture} />
          ))}
        </div>
      </div>
    </section>
  );
}
