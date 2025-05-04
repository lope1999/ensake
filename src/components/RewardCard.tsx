import Image from "next/image";
import { RewardItem } from "@/types/rewards";

interface RewardCardProps {
  reward: RewardItem;
  canClaim: boolean;
  onClaim: () => void;
  disabled?: boolean;
}

export default function RewardCard({
  reward,
  canClaim,
  onClaim,
  disabled,
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
        {reward.claimed
          ? "Claimed"
          : canClaim
          ? "Claim"
          : "Insufficient points"}
      </button>
    </div>
  );
}
