"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { login } from "@/lib/api";
import type { AuthResponse } from "@/lib/api";
import { getSession, saveSession } from "@/lib/session";

const inputClasses =
  "w-full rounded-xl border border-mercury-ink/20 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-mercury-ink/50 focus:ring-2 focus:ring-mercury-ink/15";

const OOPS_MESSAGES = [
  "Oops — that combo doesn't ring a bell. Give it another go?",
  "Hmm, that didn't match anything in your notebook. Try again?",
  "Not quite! Even your notes look a little puzzled.",
  "That one's a miss — double-check and give it another shot.",
];

function randomOops() {
  return OOPS_MESSAGES[Math.floor(Math.random() * OOPS_MESSAGES.length)];
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [existingSession, setExistingSession] = useState<AuthResponse | null>(null);

  useEffect(() => {
    setExistingSession(getSession());
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const session = await login({ email, password });
      saveSession(session);
      router.push("/dashboard");
    } catch {
      setError(randomOops());
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
      {existingSession && (
        <div className="mb-5 rounded-xl border border-mercury-ink/15 bg-mercury/25 px-4 py-3 text-sm text-mercury-ink">
          You&apos;re already signed in as <strong>{existingSession.displayName}</strong>.{" "}
          <Link href="/dashboard" className="font-medium underline underline-offset-2">
            Go to your notebook →
          </Link>
          <div className="mt-1 text-xs text-mercury-ink/70">
            Or log in as someone else below.
          </div>
        </div>
      )}

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

        {error && (
          <div className="flex items-start gap-2 rounded-xl bg-peach/30 px-4 py-2.5 text-sm text-mercury-ink">
            <span aria-hidden="true">🐾</span>
            <span>{error}</span>
          </div>
        )}

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
