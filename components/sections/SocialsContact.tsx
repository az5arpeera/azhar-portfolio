import type { Social } from "@/lib/queries";
import { ContactForm } from "./ContactForm";

export function SocialsContact({
  socials,
  headline,
}: {
  socials: Social[];
  headline: string;
}) {
  return (
    <section
      id="contact"
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 py-[100px] text-center"
      style={{ background: "var(--ocean-gradient)" }}
    >
      <div
        className="mb-4 text-xs font-medium tracking-[0.2em] uppercase"
        style={{ color: "var(--ocean-accent)" }}
      >
        Get in touch
      </div>
      <h2
        className="mb-10 max-w-[560px] font-display text-[34px] font-normal"
        style={{ color: "var(--ocean-text)" }}
      >
        {headline}
      </h2>

      <ContactForm />

      <div className="flex gap-7">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="social-link"
            className="text-[13px] font-medium no-underline opacity-85 hover:opacity-100"
            style={{ color: "var(--ocean-text)" }}
          >
            {social.platform}
          </a>
        ))}
      </div>
    </section>
  );
}
