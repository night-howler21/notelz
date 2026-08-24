"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthResponse } from "@/lib/api";
import { clearSession, getSession } from "@/lib/session";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthResponse | null | undefined>(undefined);

  useEffect(() => {
    const existing = getSession();
    if (!existing) {
      router.replace("/login");
      return;
    }
    setSession(existing);
  }, [router]);

  if (!session) {
    return null;
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{
        background:
          "radial-gradient(120% 120% at 20% 0%, #EAF3E5 0%, #D2E6CB 45%, #B4D3AB 100%)",
      }}
    >
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-mercury-ink/70">
        Welcome to your notebook
      </p>
      <h1 className="mb-6 font-serif text-4xl text-mercury-ink">
        Good to see you, {session.displayName}.
      </h1>
      <p className="mb-10 max-w-md text-ink-soft">
        Subject notes, tutors, and revision are coming together here next.
      </p>
      <button
        onClick={() => {
          clearSession();
          router.push("/");
        }}
        className="rounded-full border border-mercury-ink/35 bg-paper/70 px-6 py-3 text-sm font-medium text-mercury-ink backdrop-blur transition hover:-translate-y-0.5"
      >
        Log out
      </button>
    </div>
  );
}
