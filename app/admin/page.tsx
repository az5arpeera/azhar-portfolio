import { redirect } from "next/navigation";
import { auth, isAdmin } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) redirect("/");

  const supabase = createServiceClient();
  const [posts, submissions, events] = await Promise.all([
    supabase.from("posts").select("*").order("created_at", { ascending: false }),
    supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("analytics_events")
      .select("event_type, section")
      .limit(1000),
  ]);

  const counts = (events.data ?? []).reduce<Record<string, number>>(
    (acc, e) => ({ ...acc, [e.event_type]: (acc[e.event_type] ?? 0) + 1 }),
    {},
  );

  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "var(--about-gradient)" }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-16">
        <header>
          <div
            className="mb-2 text-xs font-medium tracking-[0.2em] uppercase"
            style={{ color: "var(--accent-2)" }}
          >
            Admin
          </div>
          <h1
            className="font-display text-[34px]"
            style={{ color: "var(--text)" }}
          >
            Signed in as {session!.user!.email}
          </h1>
        </header>

        <PostEditor posts={posts.data ?? []} />

        <section>
          <h2
            className="mb-4 font-display text-2xl"
            style={{ color: "var(--text)" }}
          >
            Contact submissions
          </h2>
          {(submissions.data ?? []).length === 0 ? (
            <p className="text-sm" style={{ color: "var(--text-dim)" }}>
              Nothing yet.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {(submissions.data ?? []).map((s) => (
                <li
                  key={s.id}
                  data-testid="admin-submission"
                  className="rounded-card-sm border p-4"
                  style={{
                    background: "var(--card-bg)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {s.name} · {s.email}
                  </div>
                  <p
                    className="mt-2 text-sm leading-[1.6] whitespace-pre-wrap"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {s.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2
            className="mb-4 font-display text-2xl"
            style={{ color: "var(--text)" }}
          >
            Analytics
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {Object.entries(counts).map(([type, count]) => (
              <div
                key={type}
                className="rounded-card-sm border p-4"
                style={{
                  background: "var(--card-bg)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="text-2xl font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {count}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--text-dim)" }}
                >
                  {type.replace(/_/g, " ")}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
