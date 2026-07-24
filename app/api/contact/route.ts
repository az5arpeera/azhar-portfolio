import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";
import { createServiceClient } from "@/lib/supabase/server";
import { sendContactEmail } from "@/lib/resend";

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission" },
      { status: 400 },
    );
  }

  const { error } = await createServiceClient()
    .from("contact_submissions")
    .insert(parsed.data);

  if (error) {
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  // The submission is already stored, so a mail failure must not fail the
  // request — it would tell the sender their message was lost when it wasn't.
  try {
    await sendContactEmail(parsed.data);
  } catch (err) {
    console.error("contact email failed", err);
  }

  return NextResponse.json({ ok: true });
}
