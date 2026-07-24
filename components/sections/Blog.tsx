import type { Post } from "@/lib/queries";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function Blog({
  posts,
  headline,
}: {
  posts: Post[];
  headline: string;
}) {
  return (
    <section
      id="notes"
      className="relative min-h-[92vh] px-6 py-[100px]"
      style={{ background: "rgba(5,11,20,0.66)" }}
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
          {headline}
        </h2>
        {posts.map((post) => (
          <article
            key={post.slug}
            data-testid="note"
            className="border-t py-[26px]"
            style={{ borderColor: "var(--border)" }}
          >
            {post.published_at && (
              <div className="mb-2 text-xs" style={{ color: "var(--text-dim)" }}>
                {dateFormat.format(new Date(post.published_at))}
              </div>
            )}
            <h3
              className="mb-2.5 font-display text-[22px] font-normal"
              style={{ color: "var(--text)" }}
            >
              {post.title}
            </h3>
            <p
              className="text-[15px] leading-[1.7]"
              style={{ color: "var(--text-dim)" }}
            >
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
