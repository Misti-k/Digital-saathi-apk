"use client";

import { content } from "@/data/content";
import { usePreferences } from "@/context/PreferencesContext";
import { useSpeech } from "@/hooks/useSpeech";

export default function Header() {
  const {
    language: lang,
    toggleLanguage,
    increaseText,
    decreaseText,
    canIncreaseText,
    canDecreaseText,
  } = usePreferences();
  const { speak } = useSpeech();
  const c = content.header;

  return (
    <header className="site-header">
      <div className="container header-row">
        <a className="logo" href="#home" aria-label={c.logoLabel[lang]}>
          {c.logo}
        </a>
        <nav aria-label={c.navLabel[lang]}>
          <a href="#lessons">{c.lessons[lang]}</a>
          <a href="#safety">{c.safety[lang]}</a>
          <a href="#quiz">{c.quiz[lang]}</a>
          <a href="#feedback">{c.feedback[lang]}</a>
        </nav>
        <div className="accessibility-controls" role="group" aria-label={c.controlsLabel[lang]}>
          <button
            className="small-button"
            id="smallerText"
            type="button"
            aria-label={c.smaller[lang]}
            onClick={decreaseText}
            disabled={!canDecreaseText}
          >
            A−
          </button>
          <button
            className="small-button"
            id="largerText"
            type="button"
            aria-label={c.larger[lang]}
            onClick={increaseText}
            disabled={!canIncreaseText}
          >
            A+
          </button>
          <button
            className="small-button"
            id="readWelcome"
            type="button"
            onClick={() => speak(content.speech.welcome[lang])}
          >
            {c.read[lang]}
          </button>
          <button
            className="small-button"
            id="languageToggle"
            type="button"
            aria-label={c.switchLanguage[lang]}
            onClick={toggleLanguage}
          >
            {c.languageButton[lang]}
          </button>
        </div>
      </div>
    </header>
  );
}
