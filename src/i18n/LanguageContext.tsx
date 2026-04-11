import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import { translations, type Language, type TranslationKey } from "./translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  transitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return saved === "en" ? "en" : "pt";
  });
  const [transitioning, setTransitioning] = useState(false);
  const timeoutRef = useRef<number>();

  const setLang = useCallback((l: Language) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTransitioning(true);
    // Fade out, swap text, fade in
    timeoutRef.current = window.setTimeout(() => {
      setLangState(l);
      localStorage.setItem("lang", l);
      timeoutRef.current = window.setTimeout(() => {
        setTransitioning(false);
      }, 50);
    }, 200);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[key]?.[lang] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, transitioning }}>
      <div className={`transition-opacity duration-200 ${transitioning ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
