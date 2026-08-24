"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_TABS = ["About", "Blogs", "Services", "Notifications", "Notes"] as const;

function MercuryEmblem() {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      className="mb-6 h-14 w-14 opacity-90"
      aria-hidden="true"
    >
      <path
        d="M32 18 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0"
        stroke="var(--color-mercury-ink)"
        strokeWidth="2.5"
      />
      <line x1="50" y1="36" x2="50" y2="78" stroke="var(--color-mercury-ink)" strokeWidth="2.5" />
      <line x1="36" y1="60" x2="64" y2="60" stroke="var(--color-mercury-ink)" strokeWidth="2.5" />
      <path d="M40 6 a10 10 0 0 0 20 0" stroke="var(--color-mercury-ink)" strokeWidth="2.5" />
    </svg>
  );
}

export default function CoverPage() {
  const [activeTab, setActiveTab] = useState<(typeof NAV_TABS)[number]>("Notes");

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden px-6 py-10 sm:px-14"
      style={{
        background:
          "radial-gradient(120% 120% at 20% 0%, #EAF3E5 0%, #D2E6CB 45%, #B4D3AB 100%)",
      }}
    >
      {/* decorative pastel blobs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[6%] top-[12%] h-56 w-56 rounded-full bg-lavender opacity-30 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] right-[6%] h-64 w-64 rounded-full bg-peach opacity-30 blur-3xl"
      />

      {/* top bar: brand, nav, and auth all in one integrated header row */}
      <header className="relative z-10 grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-1">
          <div className="font-serif text-2xl font-semibold tracking-wide text-mercury-ink sm:text-3xl">
            Notelz
          </div>
          <div className="pl-0.5 text-[0.65rem] uppercase tracking-[0.28em] text-mercury-ink/75">
            Est. for the diligent mind
          </div>
        </div>

        <nav className="justify-self-center rounded-full border border-mercury-ink/25 bg-paper/55 p-1.5 shadow-lg shadow-mercury-ink/10 backdrop-blur">
          <ul className="flex flex-wrap justify-center gap-0">
            {NAV_TABS.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.09em] transition sm:px-5 ${
                    activeTab === tab
                      ? "bg-mercury-ink text-paper"
                      : "text-mercury-ink hover:bg-mercury-ink/10"
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 justify-self-start lg:justify-self-end">
          <Link
            href="/login"
            className="rounded-full border border-mercury-ink/35 bg-paper/55 px-5 py-2.5 text-sm font-medium text-mercury-ink backdrop-blur transition hover:-translate-y-0.5 hover:bg-paper/85"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-mercury-ink px-5 py-2.5 text-sm font-medium text-paper shadow-lg shadow-mercury-ink/20 transition hover:-translate-y-0.5"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* centre content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center py-8 text-center">
        <MercuryEmblem />

        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mercury-ink/70">
          Welcome to your notebook
        </p>

        <h1 className="mb-6 max-w-[26ch] font-serif text-4xl leading-tight text-mercury-ink sm:text-5xl md:text-6xl">
          <span className="block whitespace-nowrap">Study with clarity.</span>
          <span className="block whitespace-nowrap">Revise with confidence.</span>
        </h1>

        <p className="relative mb-10 max-w-[36ch] pt-6 font-serif text-lg text-ink-soft sm:text-xl">
          <span className="absolute left-1/2 top-0 h-0.5 w-11 -translate-x-1/2 bg-gold" />
          Everything you need to know, exactly when you need to know it.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-full bg-mercury-ink px-8 py-3.5 text-sm font-medium text-paper shadow-lg shadow-mercury-ink/20 transition hover:-translate-y-0.5"
          >
            Open Your Notebook
          </Link>
          <Link
            href="#about"
            className="rounded-full border border-mercury-ink/35 bg-paper/55 px-8 py-3.5 text-sm font-medium text-mercury-ink backdrop-blur transition hover:-translate-y-0.5 hover:bg-paper/85"
          >
            Explore Notelz
          </Link>
        </div>
      </main>

      {/* footer strip */}
      <footer className="relative z-10 flex items-center justify-between pt-6 text-[0.72rem] tracking-wide text-mercury-ink/70">
        <span>
          Notes <span className="mx-2 inline-block h-1 w-1 rounded-full bg-peach align-middle" />
          Tutors <span className="mx-2 inline-block h-1 w-1 rounded-full bg-peach align-middle" />
          Revision <span className="mx-2 inline-block h-1 w-1 rounded-full bg-peach align-middle" />
          Progress
        </span>
        <span>&copy; 2026 Notelz</span>
      </footer>
    </div>
  );
}
