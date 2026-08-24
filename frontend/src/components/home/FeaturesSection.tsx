import { NotesPictorial, VideoPictorial, TutorPictorial, RevisionPictorial } from "./FeaturePictorials";
import { GavelDoodle, QuillDoodle } from "./Doodles";
import NotepadBanner from "@/components/shared/NotepadBanner";

const FEATURES = [
  {
    title: "Subject Notes",
    description:
      "Notebook-style notes for every subject, organised exactly like you'd write them yourself.",
    Pictorial: NotesPictorial,
    pin: "red",
    ready: true,
  },
  {
    title: "1-1 Video Sessions",
    description: "Live, one-on-one time with a tutor exactly when you need it most.",
    Pictorial: VideoPictorial,
    pin: "blue",
    ready: false,
  },
  {
    title: "Find Tutors",
    description: "Browse and book tutors who know your subject inside out.",
    Pictorial: TutorPictorial,
    pin: "green",
    ready: false,
  },
  {
    title: "Last-Minute Revision",
    description: "Quick-fire review sessions for when the exam is tomorrow.",
    Pictorial: RevisionPictorial,
    pin: "yellow",
    ready: false,
  },
] as const;

export default function FeaturesSection() {
  return (
    <section id="services" className="relative overflow-hidden px-6 py-24 sm:px-14">
      <GavelDoodle className="pointer-events-none absolute right-[5%] top-[6%] hidden h-20 w-20 rotate-12 text-mercury-ink opacity-[0.1] lg:block" />
      <QuillDoodle className="pointer-events-none absolute left-[4%] bottom-[4%] hidden h-24 w-24 -rotate-6 text-mercury-ink opacity-[0.1] lg:block" />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-mercury-ink/60">
          What Notelz gives you
        </p>
        <h2 className="mb-14 text-center font-serif text-3xl text-mercury-ink sm:text-4xl">
          Everything you need, all in one notebook.
        </h2>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
          {FEATURES.map(({ title, description, Pictorial, pin, ready }) => (
            <NotepadBanner key={title} pin={pin} className="w-56 transition hover:-translate-y-1">
              <div className="relative flex h-full flex-col items-center px-4 pb-6 pt-4 text-center">
                {!ready && (
                  <span className="absolute right-1 top-1 rounded-full bg-mercury/40 px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-ink/60">
                    Coming soon
                  </span>
                )}
                <Pictorial className="mb-2 h-14 w-14 text-mercury-ink/80" />
                <h3 className="mb-2 font-serif text-lg text-ink">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
              </div>
            </NotepadBanner>
          ))}
        </div>
      </div>
    </section>
  );
}
