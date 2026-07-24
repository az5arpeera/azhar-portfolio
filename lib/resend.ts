import { Resend } from "resend";
import type { ContactInput } from "./contact";

export async function sendContactEmail(input: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true as const };

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: input.email,
    subject: `azharpeera.com — ${input.name}`,
    text: `${input.name} <${input.email}>\n\n${input.message}`,
  });

  if (error) throw new Error(error.message);
  return { skipped: false as const };
}
