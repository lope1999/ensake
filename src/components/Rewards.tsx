import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken, clearToken } from "@/lib/auth";
import { getDeviceHeader } from "@/lib/device";
import { apiRequest } from "@/lib/api";
import { toast } from "react-toastify";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { Search, Bell } from "lucide-react";
import { RewardItem } from "@/types/rewards";
import { getUser } from "@/lib/auth";
import { calculateValue, handleClaimReward } from "@/lib/utils";
import RewardCard from "@/components/RewardCard";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";
import Head from "next/head";

export default function Rewards() {
  const [points, setPoints] = useState<number | null>(null);
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [userData, setUserData] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [loadingRewardId, setLoadingRewardId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang as "en" | "de"];

  useEffect(() => {
    const fetchRewards = async () => {
      const token = getToken();
      if (!token) {
        toast.error("Session expired. Please log in again.");
        router.push("/");
        return;
      }

      setLoading(true);
      const device = getDeviceHeader();
      const { ok, data, status } = await apiRequest(
        "/rewards",
        "GET",
        token,
        undefined,
        device
      );

      if (ok) {
        setPoints(data.customer_points);
        if (Array.isArray(data.rewards)) {
          setRewards(data.rewards);
        }
        const user = getUser();
        if (user) {
          setUserData({
            name: user.first_name
              ? `${user.first_name} ${user.last_name || ""}`.trim()
              : user.email,
            email: user.email,
          });
        }
      } else if (status === 401) {
        clearToken();
        toast.error("Session expired. Please log in again.");
        router.push("/");
      } else {
        toast.error(data?.message || "Failed to fetch rewards.");
      }
      setLoading(false);
    };

    fetchRewards();
  }, [router]);

  const sortedRewards = [...rewards].sort((a, b) =>
    sortOrder === "asc" ? a.points - b.points : b.points - a.points
  );
  const availableRewards = sortedRewards.filter(
    (reward) => points !== null && points >= reward.points && !reward.claimed
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>Rewards Page</title>
      </Head>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <Image
                    src="/user.svg"
                    alt="User Avatar"
                    width={50}
                    height={40}
                  />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-lg font-semibold text-gray-900">
                  {userData.name || "Welcome Back To Ensake"}
                </h1>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Search size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell size={20} />
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 bg-gray-50 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
              <div className="mb-2 text-sm font-medium">{t.yourPoints}</div>
              <div className="flex items-baseline">
                <div className="text-4xl font-bold">
                  {points !== null ? points?.toLocaleString() : "..."}
                </div>
                <div className="ml-1 text-sm">{t.points}</div>
              </div>
              <div className="mt-1 text-sm">
                # {points !== null ? calculateValue(points) : "0.00"}
              </div>
              <div className="mt-2 text-sm font-medium">
                {t.totalRewards}: {rewards.length}
              </div>
            </div>
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="mr-2">{t.sortBy}</span>
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  {sortOrder === "asc" ? t.pointsAsc : t.pointsDesc}
                </button>
              </div>
              <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                {t.availableRewards} ({availableRewards.length})
              </h2>
              {loading ? (
                <div className="text-center py-6">{t.loading}</div>
              ) : availableRewards.length > 0 ? (
                <div className="space-y-4">
                  {availableRewards.map((reward) => (
                    <RewardCard
                      key={reward.id}
                      reward={reward}
                      canClaim={true}
                      onClaim={() =>
                        handleClaimReward(
                          reward,
                          true,
                          setPoints,
                          setRewards,
                          router,
                          setLoadingRewardId
                        )
                      }
                      isLoading={loadingRewardId === reward.id}
                      disabled={reward.claimed}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-gray-500">{t.noAvailable}</p>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                {t.claimableRewards} ({rewards.length})
              </h2>
              {loading ? (
                <div className="text-center py-6">{t.loading}</div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {sortedRewards.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                      <p className="text-gray-500">{t.noClaimable}</p>
                    </div>
                  )}
                  {sortedRewards.map((reward) => {
                    const canClaim =
                      points !== null &&
                      points >= reward.points &&
                      !reward.claimed;
                    return (
                      <RewardCard
                        key={reward.id}
                        reward={reward}
                        canClaim={canClaim}
                        onClaim={() =>
                          handleClaimReward(
                            reward,
                            canClaim,
                            setPoints,
                            setRewards,
                            router,
                            setLoadingRewardId
                          )
                        }
                        isLoading={loadingRewardId === reward.id}
                        disabled={reward.claimed || !canClaim}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
