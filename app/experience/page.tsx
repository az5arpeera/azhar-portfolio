import { About } from "@/components/sections/About";
import { Resume } from "@/components/sections/Resume";
import { Certifications } from "@/components/sections/Certifications";
import { InterestsMedia } from "@/components/sections/InterestsMedia";
import { SceneRoute } from "@/components/layout/SceneRoute";
import {
  getSiteSettings,
  getResumeItems,
  getCertifications,
  getMediaItems,
} from "@/lib/queries";

export const revalidate = 60;

export default async function ExperiencePage() {
  const [settings, resumeItems, certifications, mediaItems] = await Promise.all([
    getSiteSettings(),
    getResumeItems(),
    getCertifications(),
    getMediaItems(),
  ]);

  return (
    <main>
      <SceneRoute sequence={["calm", "deep", "deep", "calm"]} />
      <About copy={settings.about} />
      <Resume
        items={resumeItems}
        headline={settings.sections.resumeHeadline}
        pdfUrl={settings.resume.pdfUrl}
      />
      <Certifications items={certifications} />
      <InterestsMedia items={mediaItems} />
    </main>
  );
}
