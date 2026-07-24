import Link from "next/link";
import { notFound } from "next/navigation";
import { ventures } from "@/lib/content";

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export default async function VenturePage(props: PageProps<"/ventures/[slug]">) {
  const { slug } = await props.params;
  const venture = ventures.find((v) => v.slug === slug);
  if (!venture) notFound();

  return (
    <main
      className="min-h-screen px-6 py-[100px]"
      style={{ background: "var(--ventures-gradient)" }}
    >
      <div className="mx-auto max-w-[760px]">
        <Link
          href="/#ventures"
          className="text-[13px] font-medium no-underline"
          style={{ color: "var(--ventures-accent)" }}
        >
          ← Back to ventures
        </Link>
        <div
          className="mt-10 mb-3 text-[11px] font-medium tracking-[0.1em] uppercase"
          style={{ color: "var(--ventures-accent)" }}
        >
          {venture.tag}
        </div>
        <h1
          className="mb-5 font-display text-[clamp(32px,5vw,52px)] leading-[1.1] font-normal"
          style={{ color: "var(--ventures-text)" }}
        >
          {venture.title}
        </h1>
        <p
          className="text-[17px] leading-[1.7]"
          style={{ color: "var(--venture-card-dim)" }}
        >
          {venture.blurb}
        </p>
      </div>
    </main>
  );
}
