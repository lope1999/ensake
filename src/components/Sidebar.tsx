import Image from "next/image";
import { LayoutGrid, Gift, Clock, QrCode, CheckCircle2 } from "lucide-react";
import { getUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/i18n";

export default function Sidebar() {
  const [user, setUser] = useState<{
    first_name?: string;
    last_name?: string;
    email?: string;
  }>({});
  const { lang } = useLanguage();
  const t = translations[lang as "en" | "de"];

  useEffect(() => {
    const u = getUser();
    setUser(u || {});
  }, []);

  const fullName = user.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : user.email || "";

  return (
    <div className="w-64 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Image
                src="/Ensake.svg"
                alt="Login Page Logo"
                width={50}
                height={50}
              />
            </div>
            <div className="ml-3">
              <div className="font-semibold text-gray-900">Ensake</div>
              <div className="text-xs text-gray-500">{t.sidebar.loyalties}</div>
            </div>
          </div>
          <button className="p-1 w-6 h-6 rounded border border-gray-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-1">
        <div className="p-4 text-sm text-gray-500">{t.sidebar.main}</div>
        <div className="space-y-1">
          <div className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 border-l-4 border-blue-600">
            <LayoutGrid size={18} className="mr-2" />
            <span>{t.sidebar.dashboard}</span>
          </div>
          <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <Gift size={18} className="mr-2" />
            <span>{t.sidebar.rewards}</span>
          </div>
          <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <Clock size={18} className="mr-2" />
            <span>{t.sidebar.transactions}</span>
          </div>
          <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <QrCode size={18} className="mr-2" />
            <span>{t.sidebar.scan}</span>
          </div>
        </div>
      </div>
      {/* User Info at the bottom */}
      <div className="border-t border-gray-200 p-4 mt-auto">
        <div className="flex items-center">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-200 flex items-center justify-center">
            <Image src="/user.svg" alt="User Avatar" width={40} height={40} />
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center">
              <span className="font-semibold text-gray-900 mr-1">
                {fullName}
              </span>
              <Image
                src="/verified-icon.svg"
                alt="Verified Logo"
                width={20}
                height={10}
              />
            </div>
            <div className="text-xs text-gray-500 truncate">{user.email}</div>
          </div>
          <div>
            <svg
              className="w-4 h-4 text-gray-400 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
