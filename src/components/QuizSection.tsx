"use client";

import { useState } from "react";
import { content, formatters } from "@/data/content";
import { questions } from "@/data/quiz";
import { usePreferences } from "@/context/PreferencesContext";
import { useUserData } from "@/context/UserDataContext";

export default function QuizSection() {
  const { language: lang } = usePreferences();
  const { status, quizStats, recordQuizAttempt } = useUserData();
  const c = content.quiz;

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  // Which option the user picked for the current question (null = not answered yet).
  // Keeping this in state means switching language never lets you re-answer.
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const answered = selected !== null;
  const isLast = index === questions.length - 1;
  const gotItRight = answered && selected === question.answer;

  const handleAnswer = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    if (optionIndex === question.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (finished) {
      setIndex(0);
      setScore(0);
      setSelected(null);
      setFinished(false);
      return;
    }
    if (!answered) return;
    if (isLast) {
      setFinished(true);
      void recordQuizAttempt(score, questions.length, lang);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  };

  // ----- derived text -----
  let countText: string;
  let titleText: string;
  let feedbackText = "";
  let feedbackClass = "quiz-feedback";
  let nextLabel: string;

  if (finished) {
    countText = c.complete[lang];
    titleText = formatters.finalScore(lang, score, questions.length);
    feedbackText = score === questions.length ? c.perfect[lang] : c.goodEffort[lang];
    feedbackClass += " good";
    nextLabel = c.tryAgain[lang];
  } else {
    countText = formatters.questionCount(lang, index + 1, questions.length);
    titleText = question.question[lang];
    nextLabel = isLast ? c.seeResult[lang] : c.next[lang];
    if (answered) {
      feedbackText = (gotItRight ? "" : c.wrong[lang]) + question.explanation[lang];
      feedbackClass += gotItRight ? " good" : " bad";
    }
  }

  return (
    <section className="container section" id="quiz">
      <div className="section-heading">
        <p className="eyebrow">{c.eyebrow[lang]}</p>
        <h2>{c.title[lang]}</h2>
        <p>{c.subtitle[lang]}</p>
      </div>
      <div className="quiz-card">
        <p className="question-count" id="questionCount">
          {countText}
        </p>
        <h3 id="questionText">{titleText}</h3>
        <div className="answer-options" id="answerOptions">
          {!finished &&
            question.options.map((option, i) => {
              let stateClass = "";
              if (answered) {
                if (i === question.answer) stateClass = " correct";
                else if (i === selected) stateClass = " incorrect";
              }
              return (
                <button
                  key={i}
                  type="button"
                  className={`answer-button${stateClass}`}
                  disabled={answered}
                  onClick={() => handleAnswer(i)}
                >
                  {option[lang]}
                </button>
              );
            })}
        </div>
        <p className={feedbackClass} id="quizFeedback" aria-live="polite">
          {feedbackText}
        </p>
        {finished && status === "ready" && quizStats.best !== null && (
          <p className="quiz-stats">
            {formatters.quizStats(lang, quizStats.best, questions.length, quizStats.attempts)}
          </p>
        )}
        <div className="quiz-footer">
          <span id="scoreText">{formatters.score(lang, score)}</span>
          <button
            className="button-link button-small"
            id="nextQuestion"
            type="button"
            disabled={!finished && !answered}
            onClick={handleNext}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
