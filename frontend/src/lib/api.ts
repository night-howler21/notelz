const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export type AuthResponse = {
  token: string;
  email: string;
  username: string;
  displayName: string;
  role: string;
};

export type ForgotPasswordResponse = {
  message: string;
  resetToken: string;
};

async function authRequest<T>(path: string, body: unknown): Promise<T> {
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

export function signup(data: { email: string; username: string; password: string; displayName: string }) {
  return authRequest<AuthResponse>("/signup", data);
}

export function login(data: { identifier: string; password: string }) {
  return authRequest<AuthResponse>("/login", data);
}

export function forgotPassword(data: { email: string }) {
  return authRequest<ForgotPasswordResponse>("/forgot-password", data);
}

export function resetPassword(data: { token: string; newPassword: string }) {
  return authRequest<void>("/reset-password", data);
}
