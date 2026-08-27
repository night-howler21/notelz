import Link from "next/link";
import { ScalesDoodle, GavelDoodle, QuillDoodle, BookDoodle } from "./Doodles";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Blogs", href: undefined },
  { label: "Services", href: "#services" },
  { label: "Notifications", href: undefined },
  { label: "Notes", href: "#services" },
] as const;

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
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 py-6 sm:px-14 sm:py-10">
      {/* decorative pastel blobs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[6%] top-[12%] h-56 w-56 rounded-full bg-lavender opacity-30 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] right-[6%] h-64 w-64 rounded-full bg-peach opacity-30 blur-3xl"
      />

      {/* law-themed doodles, scattered and faint */}
      <ScalesDoodle className="pointer-events-none absolute left-[4%] top-[38%] hidden h-20 w-20 -rotate-6 text-mercury-ink opacity-[0.12] sm:block" />
      <GavelDoodle className="pointer-events-none absolute right-[6%] top-[30%] hidden h-16 w-16 rotate-12 text-mercury-ink opacity-[0.12] sm:block" />
      <QuillDoodle className="pointer-events-none absolute bottom-[12%] left-[10%] hidden h-20 w-20 rotate-3 text-mercury-ink opacity-[0.12] sm:block" />
      <BookDoodle className="pointer-events-none absolute bottom-[16%] right-[10%] hidden h-16 w-16 -rotate-6 text-mercury-ink opacity-[0.12] sm:block" />

      {/* top bar: brand, nav, and auth all embedded in one header row */}
      <header className="relative z-10 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
        <div className="flex flex-col gap-1">
          <div className="font-serif text-2xl font-semibold tracking-wide text-mercury-ink sm:text-3xl">
            Notelz
          </div>
          <div className="pl-0.5 text-[0.65rem] uppercase tracking-[0.28em] text-mercury-ink/75">
            Est. for the diligent mind
          </div>
        </div>

        <nav className="order-3 col-span-2 justify-self-center lg:order-none lg:col-span-1">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    className="text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-mercury-ink/80 transition hover:text-mercury-ink hover:underline hover:underline-offset-4"
                  >
                    {label}
                  </a>
                ) : (
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-mercury-ink/50">
                    {label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 justify-self-end sm:gap-3">
          <Link
            href="/login"
            className="rounded-full border border-mercury-ink/35 bg-paper/55 px-3.5 py-2.5 text-sm font-medium text-mercury-ink backdrop-blur transition hover:-translate-y-0.5 hover:bg-paper/85 sm:px-5"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-mercury-ink px-3.5 py-2.5 text-sm font-medium text-paper shadow-lg shadow-mercury-ink/20 transition hover:-translate-y-0.5 sm:px-5"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* centre content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-8 text-center">
        <MercuryEmblem />

        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mercury-ink/70">
          Welcome to your notebook
        </p>

        <h1 className="mb-6 max-w-[26ch] font-serif text-3xl leading-tight text-mercury-ink sm:text-5xl md:text-6xl">
          <span className="block sm:whitespace-nowrap">Study with clarity.</span>
          <span className="block sm:whitespace-nowrap">Revise with confidence.</span>
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
          <a
            href="#services"
            className="rounded-full border border-mercury-ink/35 bg-paper/55 px-8 py-3.5 text-sm font-medium text-mercury-ink backdrop-blur transition hover:-translate-y-0.5 hover:bg-paper/85"
          >
            Explore Notelz
          </a>
        </div>

        <a
          href="#about"
          aria-label="Scroll down"
          className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 animate-bounce text-mercury-ink/50 sm:block"
        >
          ↓
        </a>
      </div>
    </div>
  );
}
