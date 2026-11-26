"use client";

import { content } from "@/data/content";
import { usePreferences } from "@/context/PreferencesContext";
import { useUserData } from "@/context/UserDataContext";
import type { Lesson } from "@/types";

interface Props {
  lesson: Lesson;
  onOpen: (lesson: Lesson) => void;
}

export default function LessonCard({ lesson, onOpen }: Props) {
  const { language: lang } = usePreferences();
  const { completedLessons } = useUserData();
  const done = completedLessons.includes(lesson.key);

  return (
    <article className="lesson-card">
      <span className="lesson-icon" aria-hidden="true">
        {lesson.icon}
      </span>
      {done && <span className="lesson-badge">{content.lessons.completedBadge[lang]}</span>}
      <h3>{lesson.title[lang]}</h3>
      <p>{lesson.summary[lang]}</p>
      <button
        className="outline-button lesson-button"
        data-lesson={lesson.key}
        type="button"
        onClick={() => onOpen(lesson)}
      >
        {content.lessons.open[lang]}
      </button>
    </article>
  );
}
