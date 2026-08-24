const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export type AuthResponse = {
  token: string;
  email: string;
  displayName: string;
  role: string;
};

async function authRequest(path: string, body: unknown): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(message || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export function signup(data: { email: string; password: string; displayName: string }) {
  return authRequest("/signup", data);
}

export function login(data: { email: string; password: string }) {
  return authRequest("/login", data);
}
