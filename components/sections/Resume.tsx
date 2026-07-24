import { Download } from "lucide-react";
import type { ResumeItem } from "@/lib/queries";

export function Resume({
  items,
  headline,
  pdfUrl,
}: {
  items: ResumeItem[];
  headline: string;
  pdfUrl: string | null;
}) {
  return (
    <section
      id="resume"
      className="relative min-h-[92vh] px-6 py-[100px]"
      style={{ background: "rgba(5,11,20,0.66)" }}
    >
      <div className="mx-auto max-w-[760px]">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div
              className="mb-3.5 text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: "var(--accent-2)" }}
            >
              Resume
            </div>
            <h2
              className="font-display text-[34px] font-normal"
              style={{ color: "var(--text)" }}
            >
              {headline}
            </h2>
          </div>
          {pdfUrl && (
            <a
              href={pdfUrl}
              data-testid="resume-download"
              className="flex items-center gap-2 rounded-full border px-[18px] py-2.5 text-[13px] font-medium no-underline"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              <Download size={14} /> Download PDF
            </a>
          )}
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            data-testid="resume-item"
            className="grid grid-cols-1 gap-5 border-t py-5 sm:grid-cols-[140px_1fr]"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="text-[13px]" style={{ color: "var(--text-dim)" }}>
              {item.period}
            </div>
            <div>
              <div
                className="mb-1 text-[17px] font-medium"
                style={{ color: "var(--text)" }}
              >
                {item.role}
                {item.org && (
                  <span style={{ color: "var(--text-dim)" }}>, {item.org}</span>
                )}
              </div>
              <div
                className="text-sm leading-[1.6]"
                style={{ color: "var(--text-dim)" }}
              >
                {item.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
