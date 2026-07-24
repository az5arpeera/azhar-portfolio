import { Hero } from "@/components/sections/Hero";
import { Signature } from "@/components/sections/Signature";
import { SceneRoute } from "@/components/layout/SceneRoute";
import { getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <SceneRoute sequence={["ocean"]} />
      <Hero copy={settings.hero} />
      <Signature />
    </main>
  );
}
