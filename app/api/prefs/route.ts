import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  PREFS_COOKIE,
  PREFS_COOKIE_MAX_AGE,
  prefsSchema,
  serializePrefs,
} from "@/lib/prefs";

export async function POST(request: Request) {
  const parsed = prefsSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid prefs" }, { status: 400 });
  }

  const cookieStore = await cookies();
  cookieStore.set(PREFS_COOKIE, serializePrefs(parsed.data), {
    maxAge: PREFS_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
  });

  return NextResponse.json({ ok: true });
}
