"use client";

import { useEffect, useRef } from "react";
import { content } from "@/data/content";
import { usePreferences } from "@/context/PreferencesContext";
import { useSpeech } from "@/hooks/useSpeech";
import { useUserData } from "@/context/UserDataContext";
import LessonStepImage from "./LessonStepImage";
import type { Lesson } from "@/types";

interface Props {
  lesson: Lesson | null;
  onClose: () => void;
}

export default function LessonDetail({ lesson, onClose }: Props) {
  const { language: lang } = usePreferences();
  const { speak, stop } = useSpeech();
  const { status, completedLessons, setLessonCompleted } = useUserData();
  const ref = useRef<HTMLDivElement>(null);
  const lessonKey = lesson?.key;
  const done = lessonKey ? completedLessons.includes(lessonKey) : false;

  // Scroll the lesson into view when one is opened (not on every language change).
  useEffect(() => {
    if (!lessonKey) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }, [lessonKey]);

  const handleClose = () => {
    stop();
    onClose();
  };

  return (
    <div className="lesson-detail" id="lessonDetail" ref={ref} hidden={!lesson} aria-live="polite">
      {lesson && (
        <>
          <div className="detail-heading">
            <h3 id="lessonTitle">{lesson.title[lang]}</h3>
            <button
              id="closeLesson"
              className="small-button"
              type="button"
              aria-label={content.lessons.closeLabel[lang]}
              onClick={handleClose}
            >
              {content.lessons.close[lang]}
            </button>
          </div>
          <ol id="lessonSteps">
            {lesson.steps[lang].map((step, index) => (
              <li className="lesson-step" key={`${lesson.key}-${index}`}>
                <p>{step}</p>
                <LessonStepImage
                  src={lesson.images[index]}
                  alt={`${lesson.title[lang]}, ${content.lessons.step[lang]} ${index + 1}: ${step}`}
                />
              </li>
            ))}
          </ol>
          <div className="lesson-actions">
            <button
              id="readLesson"
              className="outline-button"
              type="button"
              onClick={() => speak(`${lesson.title[lang]}. ${lesson.steps[lang].join(" ")}`)}
            >
              {content.lessons.readAloud[lang]}
            </button>
            {status === "ready" && (
              <button
                id="completeLesson"
                className="outline-button"
                type="button"
                aria-pressed={done}
                onClick={() => setLessonCompleted(lesson.key, !done)}
              >
                {done ? content.lessons.completed[lang] : content.lessons.markComplete[lang]}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
