import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/** Read-only client for public content. Bound by the RLS select policies. */
export function createPublicClient() {
  return createClient<Database>(
    url,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

/** Bypasses RLS. Only call from server code that has already checked the admin
    allowlist, or from routes that write data no client is allowed to read. */
export function createServiceClient() {
  return createClient<Database>(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
