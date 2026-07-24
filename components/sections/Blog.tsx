import { siteCopy, type Note } from "@/lib/content";

export function Blog({ notes }: { notes: Note[] }) {
  return (
    <section
      id="notes"
      className="relative min-h-[92vh] px-6 py-[100px]"
      style={{ background: "var(--notes-gradient)" }}
    >
      <div className="mx-auto max-w-[720px]">
        <div
          className="mb-3.5 text-xs font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--accent-2)" }}
        >
          Personal Notes
        </div>
        <h2
          className="mb-10 font-display text-[34px] font-normal"
          style={{ color: "var(--text)" }}
        >
          {siteCopy.notesHeadline}
        </h2>
        {notes.map((note) => (
          <article
            key={note.slug}
            data-testid="note"
            className="border-t py-[26px]"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="mb-2 text-xs" style={{ color: "var(--text-dim)" }}>
              {note.date}
            </div>
            <h3
              className="mb-2.5 font-display text-[22px] font-normal"
              style={{ color: "var(--text)" }}
            >
              {note.title}
            </h3>
            <p
              className="text-[15px] leading-[1.7]"
              style={{ color: "var(--text-dim)" }}
            >
              {note.excerpt}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
