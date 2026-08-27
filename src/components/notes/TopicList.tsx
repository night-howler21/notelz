"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { TopicSummary } from "@/lib/notes-api";

type NumberedTopic = {
  topic: TopicSummary;
  number: string;
  depth: number;
};

function numberTopics(topics: TopicSummary[]): NumberedTopic[] {
  return topics.flatMap((topic, index) => {
    const number = `${index + 1}`;
    return [
      { topic, number, depth: 0 },
      ...topic.subtopics.flatMap((subtopic, subIndex) => [
        { topic: subtopic, number: `${number}.${subIndex + 1}`, depth: 1 },
        ...subtopic.subtopics.map((nested, nestedIndex) => ({
          topic: nested,
          number: `${number}.${subIndex + 1}.${nestedIndex + 1}`,
          depth: 2,
        })),
      ]),
    ];
  });
}

export default function TopicList({
  topics,
  activeTopicId,
  onOpenTopic,
}: {
  topics: TopicSummary[];
  activeTopicId: number | null;
  onOpenTopic: (id: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<{ topic: TopicSummary; x: number; y: number } | null>(null);
  const numberedTopics = useMemo(() => numberTopics(topics), [topics]);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleTopics = normalizedQuery
    ? numberedTopics.filter(({ topic }) =>
        `${topic.title} ${topic.previewSnippet}`.toLocaleLowerCase().includes(normalizedQuery),
      )
    : numberedTopics;

  return (
    <div className="min-w-0">
      <label className="relative block">
        <span className="sr-only">Search topics</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mercury-ink/50"
        >
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics..."
          className="h-10 w-full rounded-lg border border-mercury-ink/15 bg-paper/75 pl-9 pr-3 font-hand text-base text-ink outline-none transition placeholder:text-ink-soft/55 focus:border-mercury-ink/45 focus:ring-2 focus:ring-mercury/35"
        />
      </label>

      <p className="mb-2 mt-5 px-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-mercury-ink/55">
        Table of contents
      </p>

      <div className="-mx-3 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
        <ol className="flex min-w-max gap-1.5 lg:min-w-0 lg:flex-col lg:gap-0.5">
          {visibleTopics.map(({ topic, number, depth }) => {
            const active = topic.id === activeTopicId;
            return (
              <li key={topic.id} className="relative w-[min(78vw,17rem)] shrink-0 lg:w-auto">
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-mercury-ink"
                  />
                )}
                <button
                  onClick={() => onOpenTopic(topic.id)}
                  onMouseEnter={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    setPreview({ topic, x: rect.right + 12, y: rect.top });
                  }}
                  onMouseLeave={() => setPreview(null)}
                  className={`group min-h-11 w-full rounded-md py-2 pr-2 text-left font-hand text-[15px] leading-snug transition lg:min-h-0 ${
                    depth === 0 ? "pl-3" : depth === 1 ? "pl-7" : "pl-10"
                  } ${
                    active
                      ? "bg-mercury/55 text-mercury-ink"
                      : "text-ink-soft hover:bg-paper/70 hover:text-mercury-ink"
                  }`}
                >
                  <span className="mr-1.5 text-[11px] tabular-nums text-mercury-ink/45">
                    {number}.
                  </span>
                  {topic.title}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {visibleTopics.length === 0 && (
        <p className="px-2 py-8 text-center font-hand text-base text-ink-soft/70">
          No topic matches “{query}”.
        </p>
      )}

      {preview &&
        typeof document !== "undefined" &&
        createPortal(
          <aside
            className="pointer-events-none fixed z-50 hidden w-64 -rotate-1 rounded-lg border border-mercury-ink/15 bg-[#FFFDF6] p-4 shadow-2xl lg:block"
            style={{ left: preview.x, top: preview.y }}
          >
            <span
              aria-hidden="true"
              className="absolute -top-2 left-8 h-4 w-10 -rotate-6 rounded-sm bg-peach/65"
            />
            <p className="font-caveat text-xl leading-snug text-ink-soft">
              {preview.topic.previewSnippet}
            </p>
          </aside>,
          document.body,
        )}
    </div>
  );
}
