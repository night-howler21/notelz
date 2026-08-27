"use client";

import { useRef, useState } from "react";
import type { TopicSummary } from "@/lib/notes-api";
import NotepadBanner from "@/components/shared/NotepadBanner";

type HoverInfo = { topic: TopicSummary; top: number } | null;

function TopicCard({
  topic,
  activeTopicId,
  onOpenTopic,
  onHover,
  containerRef,
}: {
  topic: TopicSummary;
  activeTopicId: number | null;
  onOpenTopic: (id: number) => void;
  onHover: (info: HoverInfo) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  function handleEnter(hovered: TopicSummary, e: React.MouseEvent<HTMLButtonElement>) {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const rect = e.currentTarget.getBoundingClientRect();
    if (!containerRect) return;
    onHover({ topic: hovered, top: rect.top - containerRect.top });
  }

  const isActive = (id: number) => id === activeTopicId;

  return (
    <li className="w-[min(82vw,19rem)] shrink-0 snap-start lg:w-auto">
      <NotepadBanner>
        <div className="px-3 py-2">
          <button
            onClick={() => onOpenTopic(topic.id)}
            onMouseEnter={(e) => handleEnter(topic, e)}
            className={`min-h-11 w-full rounded px-1.5 py-1 text-left font-hand text-lg transition lg:min-h-0 ${
              isActive(topic.id) ? "bg-mercury-ink text-paper" : "text-ink hover:bg-mercury/25"
            }`}
          >
            {topic.title}
          </button>

          {topic.subtopics.length > 0 && (
            <ul className="mt-0.5 flex flex-col">
              {topic.subtopics.map((sub) => (
                <li key={sub.id}>
                  <button
                    onClick={() => onOpenTopic(sub.id)}
                    onMouseEnter={(e) => handleEnter(sub, e)}
                    className={`min-h-11 w-full rounded px-1.5 py-1 text-left font-hand text-base transition lg:min-h-0 ${
                      isActive(sub.id) ? "bg-mercury-ink text-paper" : "text-ink-soft hover:bg-mercury/25"
                    }`}
                  >
                    <span className="mr-1 opacity-50">↳</span>
                    {sub.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </NotepadBanner>
    </li>
  );
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<HoverInfo>(null);

  return (
    <div ref={containerRef} className="relative" onMouseLeave={() => setHover(null)}>
      <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            activeTopicId={activeTopicId}
            onOpenTopic={onOpenTopic}
            onHover={setHover}
            containerRef={containerRef}
          />
        ))}
      </ul>

      {hover && (
        <div
          className="pointer-events-none absolute left-[calc(100%+16px)] z-30 hidden w-96 -rotate-1 rounded-lg border border-mercury-ink/10 bg-[#FFFDF6] p-6 shadow-2xl transition-[top] duration-100 ease-out lg:block"
          style={{ top: hover.top }}
        >
          <span
            aria-hidden="true"
            className="absolute -top-2.5 left-8 h-5 w-12 -rotate-6 rounded-sm bg-peach/70"
          />
          <p className="font-caveat text-2xl leading-snug text-ink-soft">
            {hover.topic.previewSnippet}
          </p>
        </div>
      )}
    </div>
  );
}
