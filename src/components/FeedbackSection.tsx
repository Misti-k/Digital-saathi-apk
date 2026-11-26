"use client";

import { useState, type FormEvent } from "react";
import { content } from "@/data/content";
import { MAX_FEEDBACK_LENGTH } from "@/data/settings";
import { usePreferences } from "@/context/PreferencesContext";
import { apiFetch } from "@/utils/api";
import { ensureSession } from "@/utils/supabase/session";

type SendState = "idle" | "sending" | "sent" | "error";

export default function FeedbackSection() {
  const { language: lang } = usePreferences();
  const c = content.feedback;

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");
  const [state, setState] = useState<SendState>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending" || message.trim() === "") return;
    setState("sending");
    try {
      await ensureSession(); // covers a very fast click before sign-in finished
      await apiFetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({
          message,
          rating: rating === "" ? null : Number(rating),
          language: lang,
        }),
      });
      setMessage("");
      setRating("");
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="container section" id="feedback">
      <div className="section-heading">
        <p className="eyebrow">{c.eyebrow[lang]}</p>
        <h2>{c.title[lang]}</h2>
        <p>{c.subtitle[lang]}</p>
      </div>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label htmlFor="feedbackRating">{c.ratingLabel[lang]}</label>
        <select id="feedbackRating" value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">{c.ratingNone[lang]}</option>
          {c.ratings.map((label, i) => (
            <option key={i} value={5 - i}>
              {label[lang]}
            </option>
          ))}
        </select>

        <label htmlFor="feedbackMessage">{c.messageLabel[lang]}</label>
        <textarea
          id="feedbackMessage"
          value={message}
          maxLength={MAX_FEEDBACK_LENGTH}
          required
          onChange={(e) => {
            setMessage(e.target.value);
            if (state === "sent" || state === "error") setState("idle");
          }}
        />

        <button className="button-link" type="submit" disabled={state === "sending"}>
          {state === "sending" ? c.sending[lang] : c.submit[lang]}
        </button>

        <p className={`feedback-message${state === "error" ? " error" : ""}`} role="status">
          {state === "sent" ? c.sent[lang] : state === "error" ? c.error[lang] : ""}
        </p>
      </form>
    </section>
  );
}
