import { siteCopy } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-[92vh] items-center justify-center px-6 py-[100px]"
      style={{ background: "var(--about-gradient)" }}
    >
      <div className="grid max-w-[900px] items-center gap-14 md:grid-cols-[1fr_1.3fr]">
        <div
          className="flex aspect-4/5 items-center justify-center overflow-hidden rounded-[20px] text-sm"
          style={{
            background: "var(--card-bg)",
            color: "var(--text-dim)",
          }}
        >
          Portrait photo
        </div>
        <div>
          <div
            className="mb-4 text-xs font-medium tracking-[0.2em] uppercase"
            style={{ color: "var(--accent-2)" }}
          >
            About
          </div>
          <h2
            className="mb-[18px] font-display text-[34px] leading-[1.25] font-normal"
            style={{ color: "var(--text)" }}
          >
            {siteCopy.aboutHeadline}
          </h2>
          <p
            className="mb-3.5 text-base leading-[1.7]"
            style={{ color: "var(--text-dim)" }}
          >
            {siteCopy.aboutBody1}
          </p>
          <p
            className="text-base leading-[1.7]"
            style={{ color: "var(--text-dim)" }}
          >
            {siteCopy.aboutBody2}
          </p>
        </div>
      </div>
    </section>
  );
}
