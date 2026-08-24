"use client";

import type { SubjectSummary } from "@/lib/notes-api";

function countAll(topics: SubjectSummary["topics"]): number {
  return topics.reduce((sum, t) => sum + 1 + countAll(t.subtopics), 0);
}

export default function SubjectPicker({
  subjects,
  onSelect,
}: {
  subjects: SubjectSummary[];
  onSelect: (id: number) => void;
}) {
  return (
    <div className="p-2 sm:p-4">
      <p className="mb-1 text-center font-hand text-sm uppercase tracking-widest text-mercury-ink/60">
        Your notebook
      </p>
      <h2 className="mb-10 text-center font-serif text-3xl text-mercury-ink">
        Pick a subject
      </h2>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {subjects.map((subject, i) => {
          const total = countAll(subject.topics);
          return (
            <button
              key={subject.id}
              onClick={() => onSelect(subject.id)}
              className="group mb-5 block w-full break-inside-avoid rounded-2xl p-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: subject.colorHex,
                minHeight: i % 3 === 0 ? "220px" : "180px",
              }}
            >
              <h3 className="mb-1 font-serif text-2xl text-ink">{subject.name}</h3>
              <p className="mb-4 text-xs uppercase tracking-wide text-ink/60">
                {total} {total === 1 ? "topic" : "topics"}
              </p>

              <ul className="flex flex-col gap-1.5">
                {subject.topics.slice(0, 4).map((topic) => (
                  <li
                    key={topic.id}
                    className="font-hand text-lg text-ink/80 transition group-hover:text-ink"
                  >
                    · {topic.title}
                  </li>
                ))}
              </ul>

              {subject.topics.length > 4 && (
                <p className="mt-2 text-xs text-ink/50">
                  +{subject.topics.length - 4} more
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
