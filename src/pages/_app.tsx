import { LanguageProvider } from "@/lib/LanguageContext";
import type { AppProps } from "next/app";
import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
