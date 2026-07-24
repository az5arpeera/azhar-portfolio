"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Post } from "@/lib/queries";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/* Each note is a dated row with a short preview; clicking it expands in place to
   reveal the full text and anything embedded in it (links, images). One open at
   a time keeps the list calm. */
export function NotesList({ posts }: { posts: Post[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  if (posts.length === 0) {
    return (
      <p className="text-[15px]" style={{ color: "var(--text-dim)" }}>
        No notes published yet.
      </p>
    );
  }

  return (
    <div>
      {posts.map((post) => {
        const isOpen = openSlug === post.slug;
        return (
          <article
            key={post.slug}
            data-testid="note"
            className="border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              type="button"
              onClick={() => setOpenSlug(isOpen ? null : post.slug)}
              aria-expanded={isOpen}
              className="flex w-full items-baseline gap-4 py-6 text-left"
            >
              <span
                className="hidden w-[128px] shrink-0 text-xs tracking-wide tabular-nums sm:block"
                style={{ color: "var(--accent-2)" }}
              >
                {post.published_at
                  ? dateFormat.format(new Date(post.published_at))
                  : "—"}
              </span>
              <span className="flex-1">
                <span
                  className="mb-1 block text-xs tracking-wide tabular-nums sm:hidden"
                  style={{ color: "var(--accent-2)" }}
                >
                  {post.published_at
                    ? dateFormat.format(new Date(post.published_at))
                    : "—"}
                </span>
                <span
                  className="block font-display text-[22px] leading-snug"
                  style={{ color: "var(--text)" }}
                >
                  {post.title}
                </span>
                {!isOpen && post.excerpt && (
                  <span
                    className="mt-1.5 block text-[15px] leading-relaxed"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {post.excerpt}
                  </span>
                )}
              </span>
              <span
                aria-hidden
                className="mt-1 shrink-0 text-lg transition-transform duration-300"
                style={{
                  color: "var(--text-dim)",
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}
              >
                +
              </span>
            </button>
            <div className="note-reveal" data-open={isOpen}>
              <div className="note-reveal-inner">
                <div className="prose-note pb-9 sm:pl-[144px]">
                  <ReactMarkdown>{post.body}</ReactMarkdown>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
