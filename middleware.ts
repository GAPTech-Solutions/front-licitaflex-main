import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session and trying to access protected routes
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    // Save the original URL the user was trying to access
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If trying to access the base dashboard route, redirect to a specific dashboard
  if (session && req.nextUrl.pathname === "/dashboard") {
    // Try to get the user's profile type
    const { data: profile } = await supabase
      .from("profiles")
      .select("profile_type")
      .eq("id", session.user.id)
      .single();

    const profileType = profile?.profile_type || "citizen";
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = `/dashboard/${profileType}`;
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/profile", "/settings"],
};
