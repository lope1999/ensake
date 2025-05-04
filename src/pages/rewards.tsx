import Rewards from "@/components/Rewards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";

export default function RewardsPage() {
  return (
    <>
      <Rewards />
      <ToastContainer />
    </>
  );
}
