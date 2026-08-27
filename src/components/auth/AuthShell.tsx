import Link from "next/link";
import type { ReactNode } from "react";

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-12"
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

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-6 block text-center font-serif text-2xl font-semibold text-mercury-ink sm:mb-8"
        >
          Notelz
        </Link>

        <div className="rounded-3xl border border-mercury-ink/15 bg-paper/80 p-6 shadow-xl shadow-mercury-ink/10 backdrop-blur sm:p-8">
          <h1 className="mb-1 font-serif text-2xl text-mercury-ink">{title}</h1>
          <p className="mb-6 text-sm text-ink-soft">{subtitle}</p>

          {children}
        </div>

        <div className="mt-6 text-center text-sm text-mercury-ink/80">{footer}</div>
      </div>
    </div>
  );
}
