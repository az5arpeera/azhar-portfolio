import type { Venture } from "@/lib/queries";
import { VentureCard } from "./VentureCard";

export function FutureVentures({
  ventures,
  headline,
}: {
  ventures: Venture[];
  headline: string;
}) {
  return (
    <section
      id="ventures"
      className="relative min-h-screen px-6 py-[100px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,7,4,0) 0%, rgba(10,7,4,0.42) 26%, rgba(10,7,4,0.42) 80%, rgba(10,7,4,0) 100%)",
      }}
    >
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
            {headline}
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
