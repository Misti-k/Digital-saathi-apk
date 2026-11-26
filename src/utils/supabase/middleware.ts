import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth token on every matched request and passes the
 * refreshed cookies on to the server and the browser. Without this, visitors'
 * anonymous sessions would silently expire after about an hour.
 */
export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  // Not configured yet? Let the app run (it falls back to "offline" mode).
  if (!url || !key) return NextResponse.next({ request });

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers?: Record<string, string>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        // Keep CDNs from caching responses that carry auth cookies.
        Object.entries(headers ?? {}).forEach(([k, v]) => supabaseResponse.headers.set(k, v));
      },
    },
  });

  // IMPORTANT: don't put code between createServerClient and this call.
  await supabase.auth.getClaims();

  return supabaseResponse;
}
