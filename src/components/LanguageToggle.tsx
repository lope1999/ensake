import { useLanguage } from "@/lib/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center text-gray-400">
      <Globe size={18} className="mr-1" />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="font-medium bg-transparent outline-none"
      >
        <option value="en">ENG</option>
        <option value="de">DEU</option>
      </select>
    </div>
  );
}
