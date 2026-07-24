import { siteCopy } from "@/lib/content";

const waveLayers = [
  { top: "55%", height: "60%", opacity: 0.5, duration: "22s" },
  { top: "65%", height: "55%", opacity: 0.35, duration: "30s" },
  { top: "75%", height: "50%", opacity: 0.5, duration: "18s" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-10 text-center"
      style={{ background: "var(--ocean-gradient)" }}
    >
      {waveLayers.map((layer, i) => (
        <div
          key={i}
          aria-hidden
          data-testid="wave-layer"
          className="absolute left-[-10%] z-1 w-[120%] rounded-[45%]"
          style={{
            top: layer.top,
            height: layer.height,
            background: `radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--ocean-accent) ${
              layer.opacity * 100
            }%, transparent), transparent 70%)`,
            animation: `drift ${layer.duration} ease-in-out infinite`,
          }}
        />
      ))}

      <div className="relative z-2 max-w-[720px]">
        <div
          className="mb-[22px] text-xs font-medium tracking-[0.25em] uppercase"
          style={{ color: "var(--ocean-accent)" }}
        >
          {siteCopy.heroEyebrow}
        </div>
        <h1
          className="mb-5 font-display text-[clamp(38px,6vw,68px)] leading-[1.08] font-normal"
          style={{ color: "var(--ocean-text)" }}
        >
          {siteCopy.heroHeadline}
        </h1>
        <p
          className="mx-auto max-w-[520px] text-base leading-relaxed"
          style={{ color: "var(--ocean-text-dim)" }}
        >
          {siteCopy.heroSub}
        </p>
      </div>

      <div
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
