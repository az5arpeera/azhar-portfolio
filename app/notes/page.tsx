import { NotesList } from "@/components/sections/NotesList";
import { SceneRoute } from "@/components/layout/SceneRoute";
import { getPosts, getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function NotesPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPosts()]);

  return (
    <main>
      <SceneRoute sequence={["deep"]} />
      <section
        id="notes"
        className="relative min-h-screen px-6 py-[120px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,11,20,0) 0%, rgba(5,11,20,0.62) 18%, rgba(5,11,20,0.62) 84%, rgba(5,11,20,0) 100%)",
        }}
      >
        <div className="mx-auto max-w-[760px]">
          <div
            className="mb-3.5 text-xs font-medium tracking-[0.2em] uppercase"
            style={{ color: "var(--accent-2)" }}
          >
            Personal Notes
          </div>
          <h1
            className="mb-12 font-display text-[34px] font-normal"
            style={{ color: "var(--text)" }}
          >
            {settings.sections.notesHeadline}
          </h1>
          <NotesList posts={posts} />
        </div>
      </section>
    </main>
  );
}
