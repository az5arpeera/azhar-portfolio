"use client";

/* App Router re-mounts this on every navigation, so it's where the cross-page
   transition lives. The ocean canvas is outside it (in layout), so it keeps
   morphing continuously while the page content fades/rises in. Motion-off users
   get no animation via the global kill-switch. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
