import Link from "next/link";
import type { ReactNode } from "react";
import AuthBoard from "./AuthBoard";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen overflow-hidden px-6 py-12"
      style={{
        background:
          "radial-gradient(120% 120% at 20% 0%, #EAF3E5 0%, #D2E6CB 45%, #B4D3AB 100%)",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[14%] h-56 w-56 rounded-full bg-lavender opacity-30 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] right-[8%] h-64 w-64 rounded-full bg-peach opacity-30 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <AuthBoard />

        <div className="w-full max-w-md justify-self-center lg:justify-self-start">
          <Link
            href="/"
            className="mb-8 block text-center font-serif text-2xl font-semibold text-mercury-ink lg:text-left"
          >
            Notelz
          </Link>

          <div className="rounded-3xl border border-mercury-ink/15 bg-paper/80 p-8 shadow-xl shadow-mercury-ink/10 backdrop-blur">
            <h1 className="mb-1 font-serif text-2xl text-mercury-ink">{title}</h1>
            <p className="mb-6 text-sm text-ink-soft">{subtitle}</p>

            {children}
          </div>

          <div className="mt-6 text-center text-sm text-mercury-ink/80 lg:text-left">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
