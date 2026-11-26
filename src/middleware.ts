import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

// NEXT 16+: rename this file to src/proxy.ts and the function to `proxy`.
export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    // Everything except static files, images and the favicon.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
