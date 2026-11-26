import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { lessons } from "@/data/lessons";
import type { Language, LessonKey } from "@/types";

/**
 * Verifies the visitor's Supabase session for an API route.
 * getClaims() checks the token's signature; it is the recommended server-side
 * check (never trust getSession() on the server).
 */
export async function requireUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || !userId) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Not signed in" }, { status: 401 }),
    };
  }
  return { ok: true as const, supabase, userId };
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function serverError(context: string, detail?: unknown) {
  console.error(`[api] ${context}`, detail);
  return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
}

export function isLanguage(value: unknown): value is Language {
  return value === "en" || value === "hi";
}

export function isLessonKey(value: unknown): value is LessonKey {
  return typeof value === "string" && lessons.some((l) => l.key === value);
}

/** Reads the request body as a JSON object, or returns null if it isn't one. */
export async function readJsonObject(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await request.json();
    return body !== null && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}
