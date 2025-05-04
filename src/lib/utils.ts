import { RewardItem } from "@/types/rewards";
import { toast } from "react-toastify";
import { getDeviceHeader } from "./device";
import { apiRequest } from "./api";
import { getToken } from "./auth";
import { setToken, setUser } from "./auth";

export function calculateValue(points: number) {
    return (points * 0.75).toFixed(2);
}

export async function handleLogin(
  email: string,
  password: string,
  router: any
) {
  const device = getDeviceHeader();
  const { ok, data } = await apiRequest(
    "/login",
    "POST",
    null,
    { email, password },
    device
  );

  if (ok) {
    const token = data?.customer?.token;
    const user = data?.customer;

    if (token) {
      setToken(token);
      setUser(user);
      toast.success("Login successful");
      router.push("/rewards");
    } else {
      toast.error("No token received from server.");
    }
  } else {
    toast.error(data?.message || "Invalid email or password");
  }
}
  
export async function handleClaimReward(
    reward: RewardItem,
    canClaim: boolean,
    setPoints: (arg0: any) => void,
    setRewards: (arg0: (prev: any) => any) => void,
    router: any,
    setLoadingRewardId: (arg0: any) => void,
  ) {
    setLoadingRewardId(reward.id); 
    if (!canClaim) {
      toast.error("Insufficient points to claim this reward.");
      return;
    }
    const token = getToken();
    if (!token) {
      toast.error("Session expired. Please log in again.");
      router.push("/");
      return;
    }
    const device = getDeviceHeader();
    const { ok, data } = await apiRequest(
      "/rewards",
      "POST",
      token,
      { reward_id: reward.id },
      device
    );
    if (ok) {
      toast.success("Reward claimed successfully!");
      setPoints(data.customer_points);
      setRewards((prev: any) =>
        prev.map((r: any) => (r.id === reward.id ? { ...r, claimed: true } : r))
      );
    } else {
      toast.error(data?.message || "Failed to claim reward.");
    }
    setLoadingRewardId(null); 
}