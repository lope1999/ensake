import { toast } from "react-toastify";

const BASE_URL = "/api";

export async function apiRequest(
  path: string,
  method: string = "GET",
  token?: string | null,
  body?: any,
  device?: string
) {
  const headers: Record<string, string> = {
    accept: "application/json",
    "Ensake-Device": device || "",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const json = await res.json();

    if (res.status === 401 && token) {
      toast.error("Session expired. Please log in again.");
      window.location.href = "/";
      return { ok: false, status: 401, data: null };
    }

    return { ok: res.ok, status: res.status, data: json };
  } catch (error) {
    console.error("API Request Error:", error);
    return { ok: false, status: 500, data: null };
  }
}