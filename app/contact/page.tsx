import { SocialsContact } from "@/components/sections/SocialsContact";
import { SceneRoute } from "@/components/layout/SceneRoute";
import { getSocials, getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function ContactPage() {
  const [settings, socials] = await Promise.all([
    getSiteSettings(),
    getSocials(),
  ]);

  return (
    <main>
      <SceneRoute sequence={["ocean"]} />
      <SocialsContact
        socials={socials}
        headline={settings.sections.contactHeadline}
      />
    </main>
  );
}
