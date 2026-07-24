import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Newsreader, Inter } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import { ControlWidget } from "@/components/layout/ControlWidget";
import { ConsentNudge } from "@/components/layout/ConsentNudge";
import { SectionTracker } from "@/components/layout/SectionTracker";
import { TopNav } from "@/components/layout/TopNav";
import { PageArrows } from "@/components/layout/PageArrows";
import { CrosshairGuides } from "@/components/layout/CrosshairGuides";
import { SceneManager } from "@/components/three/SceneManager";
import { PREFS_COOKIE, parsePrefsCookie } from "@/lib/prefs";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Azhar Peera",
  description:
    "A journey through frontiers, ideas, and the space between them — ventures, notes, and work by Azhar Peera.",
};

/* Only runs when no prefs cookie exists yet: honors the OS reduced-motion
   setting before first paint so motion never flashes for someone opted out. */
const motionDefaultScript = `(function(){try{if(document.cookie.indexOf('${PREFS_COOKIE}=')===-1&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.motion='off'}}catch(e){}})()`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const prefsCookie = cookieStore.get(PREFS_COOKIE)?.value;
  const prefs = parsePrefsCookie(prefsCookie);
  const hadCookie = prefsCookie !== undefined;

  return (
    <html
      lang="en"
      data-theme={prefs.theme}
      data-motion={prefs.animOn ? "on" : "off"}
      className={`${newsreader.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionDefaultScript }} />
      </head>
      <body className="min-h-full">
        <Providers initialPrefs={prefs} hadCookie={hadCookie}>
          <SceneManager />
          <CrosshairGuides />
          <TopNav />
          <PageArrows />
          <ControlWidget />
          <SectionTracker />
          {children}
          <ConsentNudge />
        </Providers>
      </body>
    </html>
  );
}
