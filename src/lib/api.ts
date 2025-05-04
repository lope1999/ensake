const BASE_URL = '/api'

export async function apiRequest(path: string, method: string = "GET", token?: string, body?: any, device?: string) {
  const headers: Record<string, string> = {
    "accept": "application/json",
    "Ensake-Device": device || "",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const json = await res.json();
  return { ok: res.ok, status: res.status, data: json };
}
