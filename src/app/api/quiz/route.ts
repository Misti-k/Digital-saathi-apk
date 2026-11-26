import { NextResponse } from "next/server";
import { requireUser, badRequest, serverError, isLanguage, readJsonObject } from "@/utils/api-route";
import { questions } from "@/data/quiz";

/** Record a finished quiz. Body: { score, total, language } */
export async function POST(request: Request) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;
  const { supabase, userId } = auth;

  const body = await readJsonObject(request);
  if (!body) return badRequest("Invalid JSON body");
  const { score, total, language } = body;

  if (
    typeof score !== "number" ||
    typeof total !== "number" ||
    !Number.isInteger(score) ||
    total !== questions.length ||
    score < 0 ||
    score > total ||
    !isLanguage(language)
  ) {
    return badRequest("Invalid quiz result");
  }

  const { error } = await supabase
    .from("quiz_attempts")
    .insert({ user_id: userId, score, total, language });

  if (error) return serverError("POST /api/quiz", error.message);
  return NextResponse.json({ ok: true }, { status: 201 });
}
