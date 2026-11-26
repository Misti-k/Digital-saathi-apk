"use client";

import { content } from "@/data/content";
import { usePreferences } from "@/context/PreferencesContext";

export default function SafetySection() {
  const { language: lang } = usePreferences();
  const c = content.safety;

  return (
    <section className="safety-section" id="safety">
      <div className="container safety-grid">
        <div>
          <p className="eyebrow">{c.eyebrow[lang]}</p>
          <h2>{c.title[lang]}</h2>
          <p>{c.text[lang]}</p>
        </div>
        <ul className="safety-list">
          {c.tips.map((tip, i) => (
            <li key={i}>
              <span aria-hidden="true">✓</span> {tip[lang]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
