/* Seed content ported from the design prototype. Consumed by the Supabase seed
   script and used as the fallback when the database is unreachable. */

export type Venture = {
  slug: string;
  tag: string;
  title: string;
  blurb: string;
  themeKey: string;
};

export type Note = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
};

export type ResumeItem = {
  period: string;
  role: string;
  detail: string;
};

export type MediaItem = {
  category: "book" | "music";
  title: string;
  creator?: string;
  blurb?: string;
};

export type Social = {
  platform: string;
  url: string;
};

export const ventures: Venture[] = [
  {
    slug: "energy-storage-stack",
    tag: "Energy",
    title: "Al-Air → Li-ion → Supercap Stack",
    blurb:
      "AI-assisted staged energy storage system for vehicles, sequencing three storage chemistries by discharge profile.",
    themeKey: "racetrack",
  },
  {
    slug: "ai-soldering-machine",
    tag: "Hardware",
    title: "AI Soldering Machine",
    blurb:
      "A learned-vision + parametric control system for automated precision soldering.",
    themeKey: "workbench",
  },
  {
    slug: "clear-cause",
    tag: "Social impact",
    title: "Clear Cause",
    blurb:
      "A donation-matching dashboard connecting givers to verified causes with transparent impact tracking.",
    themeKey: "clear",
  },
  {
    slug: "nano-neo-panels",
    tag: "Hardware",
    title: "Nano / Neo Panels",
    blurb:
      "Modular display panels that stream content in any form factor, reconfigurable on the fly.",
    themeKey: "panels",
  },
  {
    slug: "musiverse",
    tag: "Flagship",
    title: "Musiverse",
    blurb:
      "An invertible encoding scheme mapping arbitrary data into musically valid compositions and back.",
    themeKey: "musiverse",
  },
];

export const notes: Note[] = [
  {
    slug: "on-clean-explanations",
    date: "Jul 2026",
    title: "On clean explanations",
    excerpt:
      'The friction of a "clean" explanation is what it silently omits — system boundaries, entropy, the open questions underneath.',
  },
  {
    slug: "first-principles-by-accident",
    date: "Jun 2026",
    title: "First-principles by accident",
    excerpt:
      "Arriving at Noether's theorem before knowing its name — what that says about how intuition precedes formalism.",
  },
  {
    slug: "convergence-not-distinctiveness",
    date: "May 2026",
    title: "Convergence, not distinctiveness",
    excerpt:
      "What contemplative traditions share may matter more than what makes each one unique.",
  },
];

export const resumeItems: ResumeItem[] = [
  {
    period: "2026 —",
    role: "RF/Autonomy Intern, CACI Federal",
    detail: "Counter-UAS RF systems and drone-building for detection testing.",
  },
  {
    period: "2023 —",
    role: "B.S. Systems Engineering + Mathematics, UVA",
    detail:
      "Self-directed graduate-track math sequence (MIT OCW 18.06 → 18.03 → 18.100A).",
  },
];

export const certifications: string[] = [
  "MIT OCW 18.06 — Linear Algebra",
  "MIT OCW 18.03 — Differential Equations",
  "In progress: 18.100A — Real Analysis",
];

export const mediaItems: MediaItem[] = [
  {
    category: "book",
    title: "Gödel, Escher, Bach",
    creator: "Douglas Hofstadter",
  },
  {
    category: "music",
    title: "Piano",
    blurb:
      "Classical piano, ~2 years in — working toward Rachmaninoff's Piano Concerto No. 2.",
  },
];

export const socials: Social[] = [
  { platform: "Instagram", url: "https://instagram.com/" },
  { platform: "LinkedIn", url: "https://linkedin.com/" },
  { platform: "GitHub", url: "https://github.com/az5arpeera" },
];

export const siteCopy = {
  heroEyebrow: "Azhar Peera",
  heroHeadline: "A journey through frontiers, ideas, and the space between them.",
  heroSub:
    "Scroll down. Each current carries you somewhere different — engineering, music, philosophy, and the ventures forming between them.",
  aboutHeadline: "Systems Engineering & Mathematics, University of Virginia.",
  aboutBody1:
    "I build at the intersection of hardware, software, and first-principles thinking — from counter-UAS RF systems to a long-horizon device meant to help people understand each other more directly than language allows.",
  aboutBody2:
    'What I\'m building toward: projects with real physical, mathematical, and musical density — the kind that don\'t collapse into "another app."',
  venturesHeadline: "The ocean gives way to the track.",
  notesHeadline: "Unfinished thoughts, in progress.",
  resumeHeadline: "Charted so far.",
  contactHeadline: "Partnerships, ideas, ventures — reach out.",
};
