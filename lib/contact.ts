import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (10+ characters)")
    .max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
