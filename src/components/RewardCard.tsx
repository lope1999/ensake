import Image from "next/image";
import { RewardItem } from "@/types/rewards";

interface RewardCardProps {
  reward: RewardItem;
  canClaim: boolean;
  onClaim: () => void;
  disabled?: boolean;
  isLoading: boolean;
}

export default function RewardCard({
  reward,
  canClaim,
  onClaim,
  disabled,
  isLoading,
}: RewardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
          {reward.brand.logo ? (
            <Image
              src={reward.brand.logo}
              alt={reward.brand.name}
              width={36}
              height={36}
              className="object-cover"
            />
          ) : (
            <div className="w-9 h-9 bg-blue-500 rounded-full"></div>
          )}
        </div>
        <div>
          <div className="font-semibold">{reward.brand.name}</div>
          <div className="text-sm text-gray-500">{reward.description}</div>
          <div className="text-xs text-gray-400">{reward.points} pts</div>
        </div>
      </div>
      <button
        disabled={disabled}
        onClick={onClaim}
        className={`px-4 py-1 rounded-full text-sm font-medium ${
          reward.claimed
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : canClaim
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-100 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : reward.claimed ? (
          "Claimed"
        ) : canClaim ? (
          "Claim"
        ) : (
          "Insufficient points"
        )}
      </button>
    </div>
  );
}
