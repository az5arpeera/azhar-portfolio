import Image from "next/image";
import type { SiteSettings } from "@/lib/queries";

export function About({ copy }: { copy: SiteSettings["about"] }) {
  return (
    <section
      id="about"
      className="relative flex min-h-[92vh] items-center justify-center px-6 py-[100px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(5,11,20,0.25), rgba(5,11,20,0.68))",
      }}
    >
      <div className="grid max-w-[900px] items-center gap-14 md:grid-cols-[1fr_1.3fr]">
        <div
          className="relative flex aspect-4/5 items-center justify-center overflow-hidden rounded-[20px] text-sm"
          style={{ background: "var(--card-bg)", color: "var(--text-dim)" }}
        >
          {copy.photoUrl ? (
            <Image
              src={copy.photoUrl}
              alt="Azhar Peera"
              fill
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover"
            />
          ) : (
            "Portrait photo"
          )}
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
            {copy.headline}
          </h2>
          <p
            className="mb-3.5 text-base leading-[1.7]"
            style={{ color: "var(--text-dim)" }}
          >
            {copy.body1}
          </p>
          <p
            className="text-base leading-[1.7]"
            style={{ color: "var(--text-dim)" }}
          >
            {copy.body2}
          </p>
        </div>
      </div>
    </section>
  );
}
