import { NextResponse } from "next/server";
import { requireUser, badRequest, serverError, isLanguage, readJsonObject } from "@/utils/api-route";
import { MAX_FEEDBACK_LENGTH } from "@/data/settings";

/** Send feedback. Body: { message, rating?: 1-5 | null, language } */
export async function POST(request: Request) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, userId } = auth;

  const body = await readJsonObject(request);
  if (!body) return badRequest("Invalid JSON body");

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (message.length < 1 || message.length > MAX_FEEDBACK_LENGTH) {
    return badRequest(`message must be 1-${MAX_FEEDBACK_LENGTH} characters`);
  }

  const rating = body.rating ?? null;
  if (rating !== null && !(typeof rating === "number" && Number.isInteger(rating) && rating >= 1 && rating <= 5)) {
    return badRequest("rating must be a whole number 1-5");
  }
  if (!isLanguage(body.language)) return badRequest("language must be 'en' or 'hi'");

  const { error } = await supabase
    .from("feedback")
    .insert({ user_id: userId, message, rating, language: body.language });

  if (error) return serverError("POST /api/feedback", error.message);
  return NextResponse.json({ ok: true }, { status: 201 });
}
