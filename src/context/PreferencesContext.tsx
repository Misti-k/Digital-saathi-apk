"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useUserData } from "@/context/UserDataContext";
import { DEFAULT_FONT_SIZE, FONT_STEP, MAX_FONT_SIZE, MIN_FONT_SIZE } from "@/data/settings";
import type { Language } from "@/types";

interface PreferencesValue {
  language: Language;
  toggleLanguage: () => void;
  canIncreaseText: boolean;
  canDecreaseText: boolean;
  increaseText: () => void;
  decreaseText: () => void;
}

const PreferencesContext = createContext<PreferencesValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const { savedPreferences, savePreferences } = useUserData();
  const [language, setLanguage] = useState<Language>("en");
  // `null` = the user has not touched the text-size buttons, so the
  // stylesheet's responsive default (18px, or 17px on small phones) applies.
  const [fontSize, setFontSize] = useState<number | null>(null);
  // If the visitor changes something before the saved settings arrive,
  // their choice wins and the saved settings are not applied over it.
  const userChanged = useRef(false);

  useEffect(() => {
    if (!savedPreferences || userChanged.current) return;
    setLanguage(savedPreferences.language);
    setFontSize(savedPreferences.fontSize);
  }, [savedPreferences]);

  // Keep <html lang> in sync (helps screen readers pick the right voice).
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Same behaviour as the original page: size is applied to <body>.
  useEffect(() => {
    if (fontSize !== null) document.body.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const current = fontSize ?? DEFAULT_FONT_SIZE;

  const toggleLanguage = useCallback(() => {
    userChanged.current = true;
    const next: Language = language === "en" ? "hi" : "en";
    setLanguage(next);
    savePreferences({ language: next, fontSize });
  }, [language, fontSize, savePreferences]);

  const increaseText = useCallback(() => {
    userChanged.current = true;
    const next = Math.min(current + FONT_STEP, MAX_FONT_SIZE);
    setFontSize(next);
    savePreferences({ language, fontSize: next });
  }, [current, language, savePreferences]);

  const decreaseText = useCallback(() => {
    userChanged.current = true;
    const next = Math.max(current - FONT_STEP, MIN_FONT_SIZE);
    setFontSize(next);
    savePreferences({ language, fontSize: next });
  }, [current, language, savePreferences]);

  const value = useMemo<PreferencesValue>(
    () => ({
      language,
      toggleLanguage,
      canIncreaseText: current < MAX_FONT_SIZE,
      canDecreaseText: current > MIN_FONT_SIZE,
      increaseText,
      decreaseText,
    }),
    [language, current, toggleLanguage, increaseText, decreaseText],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): PreferencesValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside <PreferencesProvider>");
  return ctx;
}
