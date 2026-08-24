"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { AuthResponse } from "@/lib/api";
import { clearSession, getSession } from "@/lib/session";

const VARIANTS = [
  { title: "Subject Notes", description: "Notebook-style notes by subject.", href: "/notes", ready: true },
  { title: "Last-Minute Revision", description: "Quick review, then let Catistor judge you.", href: "#", ready: false },
  { title: "Find Tutors", description: "Book a tutor for your subject.", href: "#", ready: false },
  { title: "1-1 Video Sessions", description: "Live tutoring, one on one.", href: "#", ready: false },
] as const;

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
      className="flex min-h-screen flex-col items-center px-6 pb-16 pt-20 text-center"
      style={{
        background:
          "radial-gradient(120% 120% at 20% 0%, #EAF3E5 0%, #D2E6CB 45%, #B4D3AB 100%)",
      }}
    >
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-mercury-ink/70">
        Welcome to your notebook
      </p>
      <h1 className="mb-10 font-serif text-4xl text-mercury-ink">
        Good to see you, {session.displayName}.
      </h1>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {VARIANTS.map((variant) =>
          variant.ready ? (
            <Link
              key={variant.title}
              href={variant.href}
              className="rounded-2xl border border-mercury-ink/15 bg-paper/70 p-6 text-left shadow-lg shadow-mercury-ink/10 backdrop-blur transition hover:-translate-y-1"
            >
              <h2 className="mb-1 font-serif text-lg text-mercury-ink">{variant.title}</h2>
              <p className="text-sm text-ink-soft">{variant.description}</p>
            </Link>
          ) : (
            <div
              key={variant.title}
              className="rounded-2xl border border-mercury-ink/10 bg-paper/40 p-6 text-left opacity-70"
            >
              <div className="mb-1 flex items-center gap-2">
                <h2 className="font-serif text-lg text-mercury-ink">{variant.title}</h2>
                <span className="rounded-full bg-mercury-ink/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-mercury-ink/70">
                  Coming soon
                </span>
              </div>
              <p className="text-sm text-ink-soft">{variant.description}</p>
            </div>
          )
        )}
      </div>

      <button
        onClick={() => {
          clearSession();
          router.push("/");
        }}
        className="mt-12 rounded-full border border-mercury-ink/35 bg-paper/70 px-6 py-3 text-sm font-medium text-mercury-ink backdrop-blur transition hover:-translate-y-0.5"
      >
        Log out
      </button>
    </div>
  );
}
