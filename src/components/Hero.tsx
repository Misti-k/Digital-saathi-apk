"use client";

import { content } from "@/data/content";
import { usePreferences } from "@/context/PreferencesContext";

export default function Hero() {
  const { language: lang } = usePreferences();
  const c = content.hero;

  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">{c.eyebrow[lang]}</p>
          <h1>{c.title[lang]}</h1>
          <p className="hero-copy">{c.copy[lang]}</p>
          <a className="button-link" href="#lessons">
            {c.cta[lang]}
          </a>
        </div>
        <div className="hero-card" role="group" aria-label={c.cardLabel[lang]}>
          <span className="hero-icon" aria-hidden="true">
            📱
          </span>
          <h2>{c.cardTitle[lang]}</h2>
          <p>{c.cardText[lang]}</p>
        </div>
      </div>
    </section>
  );
}
