import { createPublicClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/database.types";

export type Venture = Tables<"ventures">;
export type Post = Tables<"posts">;
export type ResumeItem = Tables<"resume_items">;
export type Certification = Tables<"certifications">;
export type MediaItem = Tables<"media_items">;
export type Social = Tables<"socials">;

export type SiteSettings = {
  hero: { eyebrow: string; headline: string; sub: string };
  about: {
    headline: string;
    body1: string;
    body2: string;
    photoUrl: string | null;
  };
  sections: {
    venturesHeadline: string;
    notesHeadline: string;
    resumeHeadline: string;
    contactHeadline: string;
  };
  resume: { pdfUrl: string | null };
};

export async function getVentures() {
  const { data } = await createPublicClient()
    .from("ventures")
    .select("*")
    .order("order_index");
  return data ?? [];
}

export async function getVenture(slug: string) {
  const { data } = await createPublicClient()
    .from("ventures")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export async function getPosts() {
  const { data } = await createPublicClient()
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export async function getResumeItems() {
  const { data } = await createPublicClient()
    .from("resume_items")
    .select("*")
    .order("order_index");
  return data ?? [];
}

export async function getCertifications() {
  const { data } = await createPublicClient()
    .from("certifications")
    .select("*")
    .order("order_index");
  return data ?? [];
}

export async function getMediaItems() {
  const { data } = await createPublicClient()
    .from("media_items")
    .select("*")
    .order("order_index");
  return data ?? [];
}

export async function getSocials() {
  const { data } = await createPublicClient()
    .from("socials")
    .select("*")
    .order("order_index");
  return data ?? [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await createPublicClient()
    .from("site_settings")
    .select("key, value");

  return Object.fromEntries(
    (data ?? []).map((row) => [row.key, row.value]),
  ) as unknown as SiteSettings;
}
