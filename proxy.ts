import { NextResponse } from "next/server";
import { auth, isAdmin } from "@/lib/auth";

export default auth((req) => {
  if (!isAdmin(req.auth?.user?.email)) {
    // Clone req.nextUrl so the redirect keeps the real request origin rather
    // than defaulting to the configured auth URL.
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
