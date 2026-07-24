import { NextResponse } from "next/server";
import { analyticsEventSchema } from "@/lib/analytics";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const parsed = analyticsEventSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const { meta, ...event } = parsed.data;
  await createServiceClient()
    .from("analytics_events")
    .insert({ ...event, meta: (meta ?? {}) as never });

  return NextResponse.json({ ok: true });
}
