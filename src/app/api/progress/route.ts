import { NextResponse } from "next/server";
import { requireUser, badRequest, serverError, isLanguage, isLessonKey, readJsonObject } from "@/utils/api-route";
import type { ProgressResponse } from "@/types";

/** Everything saved for the current visitor: preferences, lessons done, quiz stats. */
export async function GET() {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, userId } = auth;

  const [prefs, progress, lastAttempt, bestAttempt] = await Promise.all([
    supabase.from("user_preferences").select("language, font_size").eq("user_id", userId).maybeSingle(),
    supabase.from("lesson_progress").select("lesson_key").eq("user_id", userId),
    supabase
      .from("quiz_attempts")
      .select("score", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("quiz_attempts")
      .select("score")
      .eq("user_id", userId)
      .order("score", { ascending: false })
      .limit(1),
  ]);

  const failed = [prefs, progress, lastAttempt, bestAttempt].find((r) => r.error);
  if (failed?.error) return serverError("GET /api/progress", failed.error.message);

  const body: ProgressResponse = {
    preferences: prefs.data
      ? {
          language: isLanguage(prefs.data.language) ? prefs.data.language : "en",
          fontSize: typeof prefs.data.font_size === "number" ? prefs.data.font_size : null,
        }
      : null,
    completedLessons: (progress.data ?? [])
      .map((row: { lesson_key: unknown }) => row.lesson_key)
      .filter(isLessonKey),
    quiz: {
      attempts: lastAttempt.count ?? 0,
      last: lastAttempt.data?.[0]?.score ?? null,
      best: bestAttempt.data?.[0]?.score ?? null,
    },
  };
  return NextResponse.json(body);
}

/** Mark a lesson completed (or undo it). Body: { lessonKey, completed } */
export async function POST(request: Request) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, userId } = auth;

  const body = await readJsonObject(request);
  if (!body) return badRequest("Invalid JSON body");
  const { lessonKey, completed } = body;
  if (!isLessonKey(lessonKey) || typeof completed !== "boolean") {
    return badRequest("Expected { lessonKey, completed }");
  }

  const { error } = completed
    ? await supabase
        .from("lesson_progress")
        .upsert(
          { user_id: userId, lesson_key: lessonKey },
          { onConflict: "user_id,lesson_key", ignoreDuplicates: true },
        )
    : await supabase.from("lesson_progress").delete().eq("user_id", userId).eq("lesson_key", lessonKey);

  if (error) return serverError("POST /api/progress", error.message);
  return NextResponse.json({ ok: true });
}
