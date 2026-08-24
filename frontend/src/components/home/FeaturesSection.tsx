const FEATURES = [
  {
    title: "Subject Notes",
    description:
      "Notebook-style notes for every subject, organised exactly like you'd write them yourself — ruled pages, hover previews, and all.",
    color: "#A9CBA0",
    icon: (
      <path
        d="M8 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V6Z M8 26c0 2-2 2-2 4s2 2 2 2 M14 10h12 M14 16h12 M14 22h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    title: "1-1 Video Sessions",
    description: "Live, one-on-one time with a tutor exactly when you need it most.",
    color: "#A8C8DE",
    icon: (
      <path
        d="M6 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10Z M24 15l8-5v14l-8-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "Find Tutors",
    description: "Browse and book tutors who know your subject inside out.",
    color: "#E8B4C0",
    icon: (
      <path
        d="M18 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z M6 32c0-7 5-11 12-11s12 4 12 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "Last-Minute Revision",
    description:
      "Quick-fire review sessions for when the exam is tomorrow — then Catistor judges how ready you really are.",
    color: "#F0D89A",
    icon: (
      <path
        d="M18 8a10 10 0 1 0 10 10 M18 4v4 M18 12v6l5 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
] as const;

export default function FeaturesSection() {
  return (
    <section
      id="services"
      className="px-6 py-24 sm:px-14"
      style={{
        background:
          "radial-gradient(120% 120% at 80% 100%, #EAF3E5 0%, #D2E6CB 45%, #B4D3AB 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-mercury-ink/60">
          What Notelz gives you
        </p>
        <h2 className="mb-14 text-center font-serif text-3xl text-mercury-ink sm:text-4xl">
          Everything you need, all in one notebook.
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-start rounded-2xl border border-mercury-ink/10 bg-paper/70 p-6 shadow-md shadow-mercury-ink/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: feature.color }}
              >
                <svg viewBox="0 0 36 36" className="h-6 w-6 text-mercury-ink">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="mb-2 font-serif text-lg text-mercury-ink">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
