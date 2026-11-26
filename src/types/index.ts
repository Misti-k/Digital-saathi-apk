export type Language = "en" | "hi";

/** A value that exists in every supported language. */
export type Localized<T = string> = Record<Language, T>;

export type LessonKey = "phone" | "internet" | "email" | "payments" | "scams";

export interface Lesson {
  key: LessonKey;
  icon: string;
  title: Localized;
  summary: Localized;
  steps: Localized<string[]>;
  /** One image per step, in the same order as `steps`. */
  images: string[];
}

export interface QuizQuestion {
  question: Localized;
  options: Localized[];
  /** Index into `options` of the correct answer. */
  answer: number;
  explanation: Localized;
}

/** Saved per user in Supabase (table: user_preferences). */
export interface SavedPreferences {
  language: Language;
  /** null = the user never changed the size, so the stylesheet default applies. */
  fontSize: number | null;
}

export interface QuizStats {
  attempts: number;
  best: number | null;
  last: number | null;
}

/** Response of GET /api/progress */
export interface ProgressResponse {
  preferences: SavedPreferences | null;
  completedLessons: LessonKey[];
  quiz: QuizStats;
}
