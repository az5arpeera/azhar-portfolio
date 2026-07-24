import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FutureVentures } from "@/components/sections/FutureVentures";
import { Blog } from "@/components/sections/Blog";
import { Resume } from "@/components/sections/Resume";
import { Certifications } from "@/components/sections/Certifications";
import { InterestsMedia } from "@/components/sections/InterestsMedia";
import { SocialsContact } from "@/components/sections/SocialsContact";
import {
  getVentures,
  getPosts,
  getResumeItems,
  getCertifications,
  getMediaItems,
  getSocials,
  getSiteSettings,
} from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [
    settings,
    ventures,
    posts,
    resumeItems,
    certifications,
    mediaItems,
    socials,
  ] = await Promise.all([
    getSiteSettings(),
    getVentures(),
    getPosts(),
    getResumeItems(),
    getCertifications(),
    getMediaItems(),
    getSocials(),
  ]);

  return (
    <main>
      <Hero copy={settings.hero} />
      <About copy={settings.about} />
      <FutureVentures
        ventures={ventures}
        headline={settings.sections.venturesHeadline}
      />
      <Blog posts={posts} headline={settings.sections.notesHeadline} />
      <Resume
        items={resumeItems}
        headline={settings.sections.resumeHeadline}
        pdfUrl={settings.resume.pdfUrl}
      />
      <Certifications items={certifications} />
      <InterestsMedia items={mediaItems} />
      <SocialsContact
        socials={socials}
        headline={settings.sections.contactHeadline}
      />
    </main>
  );
}
