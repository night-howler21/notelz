const JOURNAL_ENTRIES = [
  {
    tag: "Study strategy",
    title: "How to turn a long judgment into a usable case note",
    description: "A calm reading method: issue, rule, reasoning, result, and the one line worth revising.",
  },
  {
    tag: "Exam guidance",
    title: "Revision that starts with questions, not highlighting",
    description: "Build recall around likely prompts, then use your notes to close only the gaps you find.",
  },
  {
    tag: "Legal foundations",
    title: "Doctrine, provision, case: keeping the three layers distinct",
    description: "A simple structure for writing legal answers that stay accurate without becoming mechanical.",
  },
] as const;

export default function SupportingTabsSection() {
  return (
    <section className="px-6 py-24 sm:px-14">
      <div id="journal" className="mx-auto max-w-6xl scroll-mt-8">
        <p className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-mercury-ink/60">
          From the Notelz journal
        </p>
        <h2 className="mb-12 text-center font-serif text-3xl text-mercury-ink sm:text-4xl">
          Thoughtful guidance, without the noise.
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {JOURNAL_ENTRIES.map((entry, index) => (
            <article
              key={entry.title}
              className="rounded-2xl border border-mercury-ink/15 bg-paper/65 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="font-hand text-sm text-mercury-ink/60">0{index + 1} · {entry.tag}</span>
              <h3 className="mt-3 font-serif text-xl leading-snug text-mercury-ink">{entry.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{entry.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div
        id="updates"
        className="mx-auto mt-16 max-w-4xl scroll-mt-8 rounded-2xl border border-mercury-ink/20 bg-mercury/25 px-6 py-8 sm:px-10"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-hand text-sm uppercase tracking-[0.18em] text-mercury-ink/60">Quiet updates</p>
            <h2 className="mt-1 font-serif text-2xl text-mercury-ink">Your notebook is growing.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Starter collections are now available for Constitutional Law, Torts, Contract Law,
              and Family Law. Account-specific reminders and tutor responses will live here when
              those services launch.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-paper/80 px-4 py-2 font-hand text-sm text-mercury-ink">
            4 subjects ready
          </span>
        </div>
      </div>
    </section>
  );
}
