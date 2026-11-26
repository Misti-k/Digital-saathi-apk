"use client";

import { useCallback, useEffect } from "react";
import { content } from "@/data/content";
import { usePreferences } from "@/context/PreferencesContext";

/** Read-aloud via the browser's Speech Synthesis, in the selected language. */
export function useSpeech() {
  const { language } = usePreferences();

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) {
        alert(content.speech.unsupported[language]);
        return;
      }
      const synth = window.speechSynthesis;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
      utterance.rate = 0.82;

      const wanted = utterance.lang.toLowerCase();
      const voices = synth.getVoices();
      const voice =
        voices.find((v) => v.lang.toLowerCase() === wanted) ??
        voices.find((v) => v.lang.toLowerCase().startsWith(language === "hi" ? "hi" : "en-in"));
      if (voice) utterance.voice = voice;

      synth.speak(utterance);
    },
    [language],
  );

  // Stop talking if the page is left.
  useEffect(() => stop, [stop]);

  return { speak, stop };
}
