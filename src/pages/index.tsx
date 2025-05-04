import LoginForm from "@/components/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
      <ToastContainer />
    </div>
  );
}
