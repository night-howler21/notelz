import type { AuthResponse } from "./api";

const STORAGE_KEY = "notelz_session";

export function saveSession(session: AuthResponse) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getSession(): AuthResponse | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as AuthResponse) : null;
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}
