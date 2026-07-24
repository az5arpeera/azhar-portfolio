import type { MediaItem } from "@/lib/content";

export function InterestsMedia({ items }: { items: MediaItem[] }) {
  const books = items.filter((i) => i.category === "book");
  const music = items.filter((i) => i.category === "music");

  return (
    <section
      id="interests"
      className="min-h-[70vh] px-6 py-[90px]"
      style={{ background: "var(--notes-gradient)" }}
    >
      <div className="mx-auto grid max-w-[900px] gap-10 md:grid-cols-2">
        <div>
          <div
            className="mb-[18px] text-xs font-medium tracking-[0.2em] uppercase"
            style={{ color: "var(--accent-2)" }}
          >
            Books
          </div>
          {books.map((book) => (
            <div
              key={book.title}
              data-testid="book"
              className="border-t py-2.5 font-display text-base"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              {book.title}
              {book.creator && (
                <span style={{ color: "var(--text-dim)" }}>
                  {" "}
                  — {book.creator}
                </span>
              )}
            </div>
          ))}
        </div>
        <div>
          <div
            className="mb-[18px] text-xs font-medium tracking-[0.2em] uppercase"
            style={{ color: "var(--accent-2)" }}
          >
            Piano
          </div>
          {music.map((item) => (
            <p
              key={item.title}
              className="text-[15px] leading-[1.7]"
              style={{ color: "var(--text-dim)" }}
            >
              {item.blurb}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
