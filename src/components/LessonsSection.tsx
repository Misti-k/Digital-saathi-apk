"use client";

import { useState } from "react";
import { content, formatters } from "@/data/content";
import { lessons } from "@/data/lessons";
import { usePreferences } from "@/context/PreferencesContext";
import { useUserData } from "@/context/UserDataContext";
import LessonCard from "./LessonCard";
import LessonDetail from "./LessonDetail";
import type { Lesson } from "@/types";

export default function LessonsSection() {
  const { language: lang } = usePreferences();
  const { status, completedLessons } = useUserData();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const c = content.lessons;

  return (
    <section className="container section" id="lessons">
      <div className="section-heading">
        <p className="eyebrow">{c.eyebrow[lang]}</p>
        <h2>{c.title[lang]}</h2>
        <p>{c.subtitle[lang]}</p>
      </div>
      {status === "loading" && (
        <p className="progress-summary" aria-hidden="true">
          &nbsp;
        </p>
      )}
      {status === "ready" && (
        <p className="progress-summary" aria-live="polite">
          {formatters.lessonProgress(lang, completedLessons.length, lessons.length)}
        </p>
      )}
      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.key} lesson={lesson} onOpen={setActiveLesson} />
        ))}
      </div>
      <LessonDetail lesson={activeLesson} onClose={() => setActiveLesson(null)} />
    </section>
  );
}
