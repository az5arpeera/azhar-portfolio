"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth, isAdmin } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";

const postSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only"),
  title: z.string().trim().min(1).max(200),
  excerpt: z.string().trim().max(600).optional(),
  body: z.string().max(50_000).default(""),
  published: z.boolean().default(false),
});

async function requireAdmin() {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) throw new Error("Not authorized");
  return session!.user!.email!;
}

export async function savePost(input: unknown) {
  await requireAdmin();
  const post = postSchema.parse(input);

  const supabase = createServiceClient();
  const row = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? null,
    body: post.body,
    published: post.published,
    published_at: post.published ? new Date().toISOString() : null,
  };

  const { error } = post.id
    ? await supabase.from("posts").update(row).eq("id", post.id)
    : await supabase.from("posts").insert(row);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deletePost(id: string) {
  await requireAdmin();
  const { error } = await createServiceClient()
    .from("posts")
    .delete()
    .eq("id", z.string().uuid().parse(id));

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function markSubmissionRead(id: string, read: boolean) {
  await requireAdmin();
  const { error } = await createServiceClient()
    .from("contact_submissions")
    .update({ read })
    .eq("id", z.string().uuid().parse(id));

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}
