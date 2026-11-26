"use client";

import { content } from "@/data/content";
import { usePreferences } from "@/context/PreferencesContext";

export default function Footer() {
  const { language: lang } = usePreferences();
  const c = content.footer;

  return (
    <footer>
      <div className="container footer-row">
        <p>
          <strong>Digital Saathi</strong> — {c.tagline[lang]}
        </p>
        <p className="footer-note">{c.note[lang]}</p>
      </div>
    </footer>
  );
}
