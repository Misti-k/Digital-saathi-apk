import { NextResponse } from "next/server";
import { requireUser, badRequest, serverError, isLanguage, readJsonObject } from "@/utils/api-route";
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from "@/data/settings";

/** Save language + text size. Body: { language: "en" | "hi", fontSize: number | null } */
export async function PUT(request: Request) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, userId } = auth;

  const body = await readJsonObject(request);
  if (!body) return badRequest("Invalid JSON body");
  const { language, fontSize } = body;

  if (!isLanguage(language)) return badRequest("language must be 'en' or 'hi'");
  const fontSizeOk =
    fontSize === null ||
    (typeof fontSize === "number" &&
      Number.isInteger(fontSize) &&
      fontSize >= MIN_FONT_SIZE &&
      fontSize <= MAX_FONT_SIZE);
  if (!fontSizeOk) return badRequest(`fontSize must be null or a whole number ${MIN_FONT_SIZE}-${MAX_FONT_SIZE}`);

  const { error } = await supabase.from("user_preferences").upsert(
    { user_id: userId, language, font_size: fontSize, updated_at: new Date().toISOString() },
    { onConflict: "user_id" },
  );

  if (error) return serverError("PUT /api/preferences", error.message);
  return NextResponse.json({ ok: true });
}
