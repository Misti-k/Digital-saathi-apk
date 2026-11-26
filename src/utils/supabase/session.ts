import { createClient } from "@/utils/supabase/client";

let pending: Promise<void> | null = null;

/**
 * Makes sure this browser has a Supabase session, creating an anonymous one
 * on the first visit. The promise is shared so that React Strict Mode (which
 * runs effects twice in development) cannot create two anonymous users.
 */
export function ensureSession(): Promise<void> {
  if (!pending) {
    const attempt = (async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
      }
    })();
    pending = attempt;
    attempt.catch(() => {
      if (pending === attempt) pending = null; // allow a retry later
    });
  }
  return pending;
}

/** Drops a stale/invalid local session so ensureSession() starts a fresh one. */
export async function resetSession(): Promise<void> {
  pending = null;
  await createClient().auth.signOut({ scope: "local" });
}
