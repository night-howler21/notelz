import {
  NotesPictorial,
  VideoPictorial,
  TutorPictorial,
  RevisionPictorial,
  GamesPictorial,
} from "./FeaturePictorials";
import { GavelDoodle, QuillDoodle } from "./Doodles";

const FEATURES = [
  {
    title: "Subject Notes",
    description:
      "Notebook-style notes for every subject, organised exactly like you'd write them yourself — ruled pages, hover previews, and all.",
    color: "#A9CBA0",
    Pictorial: NotesPictorial,
    ready: true,
  },
  {
    title: "1-1 Video Sessions",
    description: "Live, one-on-one time with a tutor exactly when you need it most.",
    color: "#A8C8DE",
    Pictorial: VideoPictorial,
    ready: false,
  },
  {
    title: "Find Tutors",
    description: "Browse and book tutors who know your subject inside out.",
    color: "#E8B4C0",
    Pictorial: TutorPictorial,
    ready: false,
  },
  {
    title: "Last-Minute Revision",
    description:
      "Quick-fire review sessions for when the exam is tomorrow — then Catistor judges how ready you really are.",
    color: "#F0D89A",
    Pictorial: RevisionPictorial,
    ready: false,
  },
  {
    title: "Revision Games",
    description: "Quick games to test yourself, subject by subject or topic by topic.",
    color: "#D9C6EA",
    Pictorial: GamesPictorial,
    ready: false,
  },
] as const;

function tornBottomClipPath(teeth = 9) {
  const points = ["0% 0%", "100% 0%"];
  for (let i = 0; i <= teeth; i++) {
    const x = 100 - (i / teeth) * 100;
    const y = i % 2 === 0 ? 100 : 92;
    points.push(`${x}% ${y}%`);
  }
  return `polygon(${points.join(", ")})`;
}

const TORN_CLIP = tornBottomClipPath();

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

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
          {FEATURES.map(({ title, description, color, Pictorial, ready }) => (
            <div
              key={title}
              className="relative w-56 pb-6 pt-6 text-center shadow-md shadow-mercury-ink/10 transition hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: color, clipPath: TORN_CLIP }}
            >
              {!ready && (
                <span className="absolute right-3 top-3 rounded-full bg-white/60 px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-ink/60">
                  Coming soon
                </span>
              )}
              <Pictorial className="mx-auto mb-3 h-16 w-16 text-ink/80" />
              <h3 className="mb-2 px-4 font-serif text-lg text-ink">{title}</h3>
              <p className="px-5 text-sm leading-relaxed text-ink/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
