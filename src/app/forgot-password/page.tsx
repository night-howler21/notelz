"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { forgotPassword } from "@/app/actions/auth";

const inputClasses =
  "w-full rounded-xl border border-mercury-ink/20 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-mercury-ink/50 focus:ring-2 focus:ring-mercury-ink/15";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await forgotPassword({ email });
      if (!result.ok) throw new Error(result.message);
      setResetLink(`${window.location.origin}${result.data.resetPath}`);
    } catch {
      setError("Couldn't find an account with that email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll get you back into your notebook."
      footer={
        <>
          Remembered it after all?{" "}
          <Link href="/login" className="font-medium text-mercury-ink underline underline-offset-2">
            Log in
          </Link>
        </>
      }
    >
      {resetLink ? (
        <div className="flex flex-col gap-3 text-sm text-ink-soft">
          <p>
            Email delivery isn&apos;t wired up yet, so here&apos;s your reset link directly — it
            expires in an hour.
          </p>
          <Link
            href={resetLink}
            className="break-all rounded-xl border border-mercury-ink/20 bg-white/70 px-4 py-2.5 text-sm text-mercury-ink underline"
          >
            {resetLink}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              placeholder="you@example.com"
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
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
