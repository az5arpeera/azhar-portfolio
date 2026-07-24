import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FutureVentures } from "@/components/sections/FutureVentures";
import { Blog } from "@/components/sections/Blog";
import { Resume } from "@/components/sections/Resume";
import { Certifications } from "@/components/sections/Certifications";
import { InterestsMedia } from "@/components/sections/InterestsMedia";
import { SocialsContact } from "@/components/sections/SocialsContact";
import {
  ventures,
  notes,
  resumeItems,
  certifications,
  mediaItems,
  socials,
} from "@/lib/content";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FutureVentures ventures={ventures} />
      <Blog notes={notes} />
      <Resume items={resumeItems} />
      <Certifications items={certifications} />
      <InterestsMedia items={mediaItems} />
      <SocialsContact socials={socials} />
    </main>
  );
}
