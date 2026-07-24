import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getVenture, getVentures } from "@/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const ventures = await getVentures();
  return ventures.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata(props: PageProps<"/ventures/[slug]">) {
  const { slug } = await props.params;
  const venture = await getVenture(slug);
  if (!venture) return {};
  return {
    title: `${venture.title} — Azhar Peera`,
    description: venture.blurb ?? undefined,
  };
}

export default async function VenturePage(
  props: PageProps<"/ventures/[slug]">,
) {
  const { slug } = await props.params;
  const venture = await getVenture(slug);
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

        {venture.current_work && (
          <section className="mt-14">
            <h2
              className="mb-4 text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: "var(--ventures-accent)" }}
            >
              Where it stands
            </h2>
            <div
              className="prose-sm leading-[1.7]"
              style={{ color: "var(--venture-card-dim)" }}
            >
              <ReactMarkdown>{venture.current_work}</ReactMarkdown>
            </div>
          </section>
        )}

        {venture.long_vision && (
          <section className="mt-14">
            <h2
              className="mb-4 text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: "var(--ventures-accent)" }}
            >
              The long view
            </h2>
            <div
              className="prose-sm leading-[1.7]"
              style={{ color: "var(--venture-card-dim)" }}
            >
              <ReactMarkdown>{venture.long_vision}</ReactMarkdown>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
