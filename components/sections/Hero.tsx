import type { SiteSettings } from "@/lib/queries";

export function Hero({ copy }: { copy: SiteSettings["hero"] }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-10 text-center"
    >
      {/* Feathered radial pool behind the text — lifts contrast with no visible edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-0 h-[560px] w-[880px] max-w-[96vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(3,9,16,0.62) 0%, rgba(3,9,16,0.34) 38%, rgba(3,9,16,0) 72%)",
        }}
      />
      <div className="relative z-2 max-w-[720px]">
        <div
          className="text-legible mb-[22px] text-xs font-medium tracking-[0.25em] uppercase"
          style={{ color: "var(--ocean-accent)" }}
        >
          {copy.eyebrow}
        </div>
        <h1
          className="text-legible mb-5 font-display text-[clamp(38px,6vw,68px)] leading-[1.08] font-normal"
          style={{ color: "var(--ocean-text)" }}
        >
          {copy.headline}
        </h1>
        <p
          className="text-legible mx-auto max-w-[520px] text-base leading-relaxed"
          style={{ color: "oklch(0.9 0.02 220)" }}
        >
          {copy.sub}
        </p>
      </div>

      <div
        data-testid="scroll-cue"
        className="absolute bottom-10 left-1/2 z-2 flex -translate-x-1/2 flex-col items-center"
        style={{ animation: "bob 2.4s ease-in-out infinite" }}
      >
        <div
          className="h-11 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--ocean-accent))",
          }}
        />
        <div
          className="mt-2 text-[10px] font-medium tracking-[0.15em]"
          style={{ color: "var(--ocean-accent)" }}
        >
          SCROLL
        </div>
      </div>
    </section>
  );
}
