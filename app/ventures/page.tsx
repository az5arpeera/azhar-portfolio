import { FutureVentures } from "@/components/sections/FutureVentures";
import { SceneRoute } from "@/components/layout/SceneRoute";
import { getVentures, getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function VenturesPage() {
  const [settings, ventures] = await Promise.all([
    getSiteSettings(),
    getVentures(),
  ]);

  return (
    <main>
      <SceneRoute sequence={["racetrack"]} />
      <FutureVentures
        ventures={ventures}
        headline={settings.sections.venturesHeadline}
      />
    </main>
  );
}
