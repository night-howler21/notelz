"use client";

import { useRef, useState } from "react";
import type { TopicSummary } from "@/lib/notes-api";

type HoverInfo = { topic: TopicSummary; top: number } | null;

function TopicNode({
  topic,
  depth,
  activeTopicId,
  onOpenTopic,
  onHover,
  containerRef,
}: {
  topic: TopicSummary;
  depth: number;
  activeTopicId: number | null;
  onOpenTopic: (id: number) => void;
  onHover: (info: HoverInfo) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const isActive = topic.id === activeTopicId;

  function handleEnter(e: React.MouseEvent<HTMLButtonElement>) {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const rect = e.currentTarget.getBoundingClientRect();
    if (!containerRect) return;
    onHover({ topic, top: rect.top - containerRect.top });
  }

  return (
    <li className="relative" style={{ marginLeft: depth * 18 }}>
      <button
        onClick={() => onOpenTopic(topic.id)}
        onMouseEnter={handleEnter}
        className={`w-full rounded-lg px-3 py-2.5 text-left font-hand text-xl transition ${
          isActive ? "bg-mercury-ink text-paper" : "text-ink hover:bg-mercury/30"
        }`}
      >
        {depth > 0 && <span className="mr-1.5 opacity-50">↳</span>}
        {topic.title}
      </button>

      {topic.subtopics.length > 0 && (
        <ul className="mt-1 flex flex-col gap-0.5 border-l border-mercury-ink/15 pl-2">
          {topic.subtopics.map((sub) => (
            <TopicNode
              key={sub.id}
              topic={sub}
              depth={depth + 1}
              activeTopicId={activeTopicId}
              onOpenTopic={onOpenTopic}
              onHover={onHover}
              containerRef={containerRef}
            />
          ))}
        </ul>
      )}
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
      <ul className="flex flex-col gap-1">
        {topics.map((topic) => (
          <TopicNode
            key={topic.id}
            topic={topic}
            depth={0}
            activeTopicId={activeTopicId}
            onOpenTopic={onOpenTopic}
            onHover={setHover}
            containerRef={containerRef}
          />
        ))}
      </ul>

      {hover && (
        <div
          className="pointer-events-none absolute left-[calc(100%+16px)] z-30 w-96 -rotate-1 rounded-lg border border-mercury-ink/10 bg-[#FFFDF6] p-6 shadow-2xl transition-[top] duration-100 ease-out"
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
