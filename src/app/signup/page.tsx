"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { signup } from "@/app/actions/auth";

const inputClasses =
  "w-full rounded-xl border border-mercury-ink/20 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-mercury-ink/50 focus:ring-2 focus:ring-mercury-ink/15";

export default function SignupPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signup({ email, username, password, displayName });
      if (!result.ok) throw new Error(result.message);
      router.push("/notes");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create your notebook"
      subtitle="A single place to study, revise, and keep it all."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-mercury-ink underline underline-offset-2">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="displayName" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Name
          </label>
          <input
            id="displayName"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={inputClasses}
            placeholder="Ada Lovelace"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            minLength={3}
            maxLength={24}
            pattern="[a-zA-Z0-9_]+"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClasses}
            placeholder="ada_lovelace"
          />
        </div>

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

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Password
          </label>
          <input
            id="password"
            name="new-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          disabled={loading}
          className="mt-2 rounded-full bg-mercury-ink px-6 py-3 text-sm font-medium text-paper shadow-lg shadow-mercury-ink/20 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Creating your account…" : "Sign Up"}
        </button>
      </form>
    </AuthShell>
  );
}
