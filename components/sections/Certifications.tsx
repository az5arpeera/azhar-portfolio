import type { Certification } from "@/lib/queries";

export function Certifications({ items }: { items: Certification[] }) {
  return (
    <section
      id="certifications"
      className="min-h-[60vh] px-6 py-[90px]"
      style={{ background: "var(--about-gradient)" }}
    >
      <div className="mx-auto max-w-[900px]">
        <div
          className="mb-[30px] text-xs font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--accent-2)" }}
        >
          Certifications
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              data-testid="certification"
              className="rounded-card-sm border p-5"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="text-[15px] font-medium"
                style={{ color: "var(--text)" }}
              >
                {item.name}
              </div>
              {item.issuer && (
                <div
                  className="mt-1 text-[13px]"
                  style={{ color: "var(--text-dim)" }}
                >
                  {item.issuer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
