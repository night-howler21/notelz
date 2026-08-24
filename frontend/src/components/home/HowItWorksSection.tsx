const STEPS = [
  {
    number: "01",
    title: "Create your notebook",
    description: "Sign up in a minute — no downloads, nothing to install.",
  },
  {
    number: "02",
    title: "Pin a subject",
    description: "Pick from your subjects and open it like a real notebook.",
  },
  {
    number: "03",
    title: "Study, revise, repeat",
    description: "Read your notes, book a tutor, or do a last-minute revision round.",
  },
] as const;

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-24 sm:px-14">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-mercury-ink/60">
          How it works
        </p>
        <h2 className="mb-14 text-center font-serif text-3xl text-mercury-ink sm:text-4xl">
          Three steps, no scramble.
        </h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-mercury-ink/25 font-serif text-lg text-mercury-ink">
                {step.number}
              </div>
              <h3 className="mb-2 font-serif text-lg text-mercury-ink">{step.title}</h3>
              <p className="mx-auto max-w-[26ch] text-sm leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
