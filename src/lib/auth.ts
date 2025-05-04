const TOKEN_KEY = "ensake_token";
const TOKEN_TIME = "ensake_token_time";
const TTL_MS = 5 * 60 * 1000;
const USER_KEY = "ensake_user";


export function setUser(user: any) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): any | null {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_TIME, Date.now().toString());
}

export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const timestamp = localStorage.getItem(TOKEN_TIME);

  if (token && timestamp) {
    const isValid = Date.now() - parseInt(timestamp) < TTL_MS;
    if (isValid) return token;
    clearToken();
  }
  return null;
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_TIME);
}
