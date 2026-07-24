"use client";

import { useState, useTransition } from "react";
import { savePost, deletePost } from "@/app/admin/actions";
import type { Post } from "@/lib/queries";

const empty = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  published: false,
};

export function PostEditor({ posts }: { posts: Post[] }) {
  const [editing, setEditing] = useState<typeof empty & { id?: string }>(empty);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await savePost(editing);
        setEditing(empty);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h2
          className="mb-4 font-display text-2xl"
          style={{ color: "var(--text)" }}
        >
          Notes
        </h2>
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li
              key={post.id}
              data-testid="admin-post-row"
              className="flex items-center justify-between gap-3 rounded-card-sm border p-3"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
              }}
            >
              <div>
                <div
                  className="text-sm font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {post.title}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--text-dim)" }}
                >
                  {post.published ? "Published" : "Draft"} · /{post.slug}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() =>
                    setEditing({
                      id: post.id,
                      slug: post.slug,
                      title: post.title,
                      excerpt: post.excerpt ?? "",
                      body: post.body,
                      published: post.published,
                    })
                  }
                  className="cursor-pointer rounded-full border px-3 py-1 text-xs"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-dim)",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    startTransition(async () => {
                      await deletePost(post.id);
                    })
                  }
                  data-testid="admin-post-delete"
                  className="cursor-pointer rounded-full border px-3 py-1 text-xs text-red-400"
                  style={{ borderColor: "var(--border)" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={submit}
        data-testid="admin-post-form"
        className="flex flex-col gap-3"
      >
        <h2 className="font-display text-2xl" style={{ color: "var(--text)" }}>
          {editing.id ? "Edit note" : "New note"}
        </h2>

        <Field
          label="Title"
          value={editing.title}
          onChange={(title) => setEditing({ ...editing, title })}
          testId="admin-title"
        />
        <Field
          label="Slug"
          value={editing.slug}
          onChange={(slug) => setEditing({ ...editing, slug })}
          testId="admin-slug"
        />
        <Field
          label="Excerpt"
          value={editing.excerpt}
          onChange={(excerpt) => setEditing({ ...editing, excerpt })}
          testId="admin-excerpt"
        />

        <label className="flex flex-col gap-1 text-xs" style={{ color: "var(--text-dim)" }}>
          Body (markdown)
          <textarea
            value={editing.body}
            onChange={(e) => setEditing({ ...editing, body: e.target.value })}
            rows={10}
            data-testid="admin-body"
            className="rounded-[10px] border p-3 text-sm"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
        </label>

        <label
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--text)" }}
        >
          <input
            type="checkbox"
            checked={editing.published}
            onChange={(e) =>
              setEditing({ ...editing, published: e.target.checked })
            }
            data-testid="admin-published"
          />
          Published
        </label>

        {error && (
          <p data-testid="admin-error" className="text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={pending}
            data-testid="admin-save"
            className="cursor-pointer rounded-full border-none px-5 py-2 text-sm font-semibold disabled:opacity-60"
            style={{ background: "var(--ocean-accent)", color: "#04101c" }}
          >
            {pending ? "Saving…" : "Save"}
          </button>
          {editing.id && (
            <button
              type="button"
              onClick={() => setEditing(empty)}
              className="cursor-pointer rounded-full border px-5 py-2 text-sm"
              style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  testId,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  testId: string;
}) {
  return (
    <label
      className="flex flex-col gap-1 text-xs"
      style={{ color: "var(--text-dim)" }}
    >
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={testId}
        className="rounded-[10px] border p-3 text-sm"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
      />
    </label>
  );
}
