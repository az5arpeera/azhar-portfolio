"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contact";

const fieldStyle = {
  background: "var(--card-bg)",
  borderColor: "var(--border)",
  color: "var(--ocean-text)",
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="contact-form"
      noValidate
      className="mb-14 flex w-full max-w-[480px] flex-col gap-3 text-left"
    >
      <div>
        <input
          {...register("name")}
          placeholder="Your name"
          aria-label="Your name"
          data-testid="contact-name"
          className="w-full rounded-[10px] border px-4 py-3.5 text-sm"
          style={fieldStyle}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Your email"
          aria-label="Your email"
          data-testid="contact-email"
          className="w-full rounded-[10px] border px-4 py-3.5 text-sm"
          style={fieldStyle}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="What's on your mind?"
          aria-label="Your message"
          data-testid="contact-message"
          className="w-full resize-y rounded-[10px] border px-4 py-3.5 text-sm"
          style={fieldStyle}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        data-testid="contact-submit"
        className="cursor-pointer rounded-[10px] border-none p-3.5 text-sm font-semibold disabled:opacity-60"
        style={{ background: "var(--ocean-accent)", color: "#04101c" }}
      >
        {isSubmitting ? "Sending…" : "Send"}
      </button>

      {status === "sent" && (
        <p
          data-testid="contact-success"
          className="text-sm"
          style={{ color: "var(--ocean-accent)" }}
        >
          Thanks — I&apos;ll get back to you.
        </p>
      )}
      {status === "error" && (
        <p data-testid="contact-error" className="text-sm text-red-400">
          Something went wrong. Try again, or email me directly.
        </p>
      )}
    </form>
  );
}
