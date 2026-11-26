"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ApiError, apiFetch } from "@/utils/api";
import { ensureSession, resetSession } from "@/utils/supabase/session";
import type { Language, LessonKey, ProgressResponse, QuizStats, SavedPreferences } from "@/types";

/**
 * loading: signing in / fetching saved data
 * ready:   saved data loaded; changes are being stored in Supabase
 * offline: Supabase unreachable or not configured; the app still works,
 *          it just doesn't remember anything
 */
export type SyncStatus = "loading" | "ready" | "offline";

interface UserDataValue {
  status: SyncStatus;
  savedPreferences: SavedPreferences | null;
  completedLessons: LessonKey[];
  quizStats: QuizStats;
  setLessonCompleted: (key: LessonKey, completed: boolean) => Promise<void>;
  recordQuizAttempt: (score: number, total: number, language: Language) => Promise<void>;
  savePreferences: (prefs: SavedPreferences) => void;
}

const EMPTY_STATS: QuizStats = { attempts: 0, best: null, last: null };
const SAVE_DELAY_MS = 600;

async function loadProgress(): Promise<ProgressResponse> {
  await ensureSession();
  try {
    return await apiFetch<ProgressResponse>("/api/progress");
  } catch (err) {
    // The cookie held a session the server no longer accepts: start fresh once.
    if (err instanceof ApiError && err.status === 401) {
      await resetSession();
      await ensureSession();
      return apiFetch<ProgressResponse>("/api/progress");
    }
    throw err;
  }
}

const UserDataContext = createContext<UserDataValue | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SyncStatus>("loading");
  const [savedPreferences, setSavedPreferences] = useState<SavedPreferences | null>(null);
  const [completedLessons, setCompletedLessons] = useState<LessonKey[]>([]);
  const [quizStats, setQuizStats] = useState<QuizStats>(EMPTY_STATS);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    loadProgress()
      .then((data) => {
        if (cancelled) return;
        setSavedPreferences(data.preferences);
        setCompletedLessons(data.completedLessons);
        setQuizStats(data.quiz);
        setStatus("ready");
      })
      .catch((err) => {
        console.warn("Digital Saathi: progress will not be saved.", err);
        if (!cancelled) setStatus("offline");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setLessonCompleted = useCallback(
    async (key: LessonKey, completed: boolean) => {
      if (status !== "ready") return;
      // Update the screen immediately, then confirm with the server.
      setCompletedLessons((prev) =>
        completed ? (prev.includes(key) ? prev : [...prev, key]) : prev.filter((k) => k !== key),
      );
      try {
        await apiFetch("/api/progress", {
          method: "POST",
          body: JSON.stringify({ lessonKey: key, completed }),
        });
      } catch (err) {
        console.warn("Could not save lesson progress", err);
        setCompletedLessons((prev) =>
          completed ? prev.filter((k) => k !== key) : prev.includes(key) ? prev : [...prev, key],
        );
      }
    },
    [status],
  );

  const recordQuizAttempt = useCallback(
    async (score: number, total: number, language: Language) => {
      if (status !== "ready") return;
      try {
        await apiFetch("/api/quiz", {
          method: "POST",
          body: JSON.stringify({ score, total, language }),
        });
        setQuizStats((s) => ({
          attempts: s.attempts + 1,
          last: score,
          best: Math.max(s.best ?? 0, score),
        }));
      } catch (err) {
        console.warn("Could not save quiz result", err);
      }
    },
    [status],
  );

  // Debounced so tapping A+ several times sends one request.
  const savePreferences = useCallback(
    (prefs: SavedPreferences) => {
      if (status !== "ready") return;
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        apiFetch("/api/preferences", { method: "PUT", body: JSON.stringify(prefs) }).catch((err) =>
          console.warn("Could not save preferences", err),
        );
      }, SAVE_DELAY_MS);
    },
    [status],
  );

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  const value = useMemo<UserDataValue>(
    () => ({
      status,
      savedPreferences,
      completedLessons,
      quizStats,
      setLessonCompleted,
      recordQuizAttempt,
      savePreferences,
    }),
    [status, savedPreferences, completedLessons, quizStats, setLessonCompleted, recordQuizAttempt, savePreferences],
  );

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}

export function useUserData(): UserDataValue {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData must be used inside <UserDataProvider>");
  return ctx;
}
