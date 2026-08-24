"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { login } from "@/lib/api";
import { saveSession } from "@/lib/session";

const inputClasses =
  "w-full rounded-xl border border-mercury-ink/20 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-mercury-ink/50 focus:ring-2 focus:ring-mercury-ink/15";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const session = await login({ email, password });
      saveSession(session);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Pick up your notebook right where you left off."
      footer={
        <>
          New to Notelz?{" "}
          <Link href="/signup" className="font-medium text-mercury-ink underline underline-offset-2">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-mercury-ink px-6 py-3 text-sm font-medium text-paper shadow-lg shadow-mercury-ink/20 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log In"}
        </button>
      </form>
    </AuthShell>
  );
}
