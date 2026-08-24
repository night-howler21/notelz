"use client";

import { useState } from "react";
import type { TopicSummary } from "@/lib/notes-api";

export default function TopicList({
  subjectName,
  topics,
  onOpenTopic,
}: {
  subjectName: string;
  topics: TopicSummary[];
  onOpenTopic: (id: number) => void;
}) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="h-full overflow-y-auto px-8 py-10 sm:px-14">
      <p className="mb-1 font-hand text-sm uppercase tracking-widest text-mercury-ink/60">
        {subjectName}
      </p>
      <h2 className="mb-8 font-serif text-2xl text-mercury-ink sm:text-3xl">
        Pick a topic to read
      </h2>

      <ul className="flex flex-col gap-1">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="relative"
            onMouseEnter={() => setHoveredId(topic.id)}
            onMouseLeave={() => setHoveredId((id) => (id === topic.id ? null : id))}
          >
            <button
              onClick={() => onOpenTopic(topic.id)}
              className="w-full rounded-lg px-3 py-2.5 text-left font-hand text-xl text-ink transition hover:bg-mercury/25"
            >
              {topic.title}
            </button>

            {hoveredId === topic.id && (
              <div className="pointer-events-none absolute left-1/2 top-[calc(100%+4px)] z-20 w-72 -translate-x-1/2 -rotate-2 rounded-md border border-mercury-ink/10 bg-[#FFFDF6] p-4 shadow-xl">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 left-6 h-4 w-9 -rotate-6 rounded-sm bg-peach/70"
                />
                <p className="font-caveat text-lg leading-snug text-ink-soft">
                  {topic.previewSnippet}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
