import { createContext, useContext, useState } from "react";

export const LanguageContext = createContext({
  lang: "en",
  setLang: (l: string) => {},
});
export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
