import { BookDoodle } from "./Doodles";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 sm:px-14">
      <BookDoodle className="pointer-events-none absolute right-[8%] top-[10%] hidden h-24 w-24 rotate-6 text-mercury-ink opacity-[0.1] md:block" />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mercury-ink/60">About Notelz</p>
        <h2 className="mb-8 font-serif text-3xl text-mercury-ink sm:text-4xl">
          Prepared today. Unshaken tomorrow.
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ink-soft">
          Most students don&apos;t need more material — they need it organised, close at hand, and
          ready the moment they are. Notelz keeps your notes, your tutors, and your revision in one
          place, so studying never turns into a last-minute hassle across ten different apps and a
          dozen browser tabs.
        </p>
      </div>
    </section>
  );
}
