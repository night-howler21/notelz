"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { resetPassword } from "@/lib/api";

const inputClasses =
  "w-full rounded-xl border border-mercury-ink/20 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-mercury-ink/50 focus:ring-2 focus:ring-mercury-ink/15";

function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await resetPassword({ token, newPassword });
      router.push("/login");
    } catch {
      setError("That reset link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Make it something you'll remember this time."
      footer={
        <>
          Back to{" "}
          <Link href="/login" className="font-medium text-mercury-ink underline underline-offset-2">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="newPassword" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            New password
          </label>
          <input
            id="newPassword"
            name="new-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClasses}
            placeholder="At least 8 characters"
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
          disabled={loading || !token}
          className="mt-2 rounded-full bg-mercury-ink px-6 py-3 text-sm font-medium text-paper shadow-lg shadow-mercury-ink/20 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Reset password"}
        </button>
      </form>
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
