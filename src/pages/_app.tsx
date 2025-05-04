import { LanguageProvider } from "@/lib/LanguageContext";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getToken, clearToken, clearUser } from "@/lib/auth";
import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      clearToken();
      clearUser();
      router.push("/");
    }
  }, [router]);

  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
