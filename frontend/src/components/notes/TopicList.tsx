"use client";

import { useState } from "react";
import type { TopicSummary } from "@/lib/notes-api";

function TopicNode({
  topic,
  depth,
  activeTopicId,
  onOpenTopic,
}: {
  topic: TopicSummary;
  depth: number;
  activeTopicId: number | null;
  onOpenTopic: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = topic.id === activeTopicId;

  return (
    <li
      className="relative"
      style={{ marginLeft: depth * 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => onOpenTopic(topic.id)}
        className={`w-full rounded-lg px-3 py-2.5 text-left font-hand text-xl transition ${
          isActive ? "bg-mercury-ink text-paper" : "text-ink hover:bg-mercury/30"
        }`}
      >
        {depth > 0 && <span className="mr-1.5 opacity-50">↳</span>}
        {topic.title}
      </button>

      {hovered && (
        <div className="pointer-events-none absolute left-[calc(100%+12px)] top-0 z-30 w-96 -rotate-1 rounded-lg border border-mercury-ink/10 bg-[#FFFDF6] p-6 shadow-2xl">
          <span
            aria-hidden="true"
            className="absolute -top-2.5 left-8 h-5 w-12 -rotate-6 rounded-sm bg-peach/70"
          />
          <p className="font-caveat text-2xl leading-snug text-ink-soft">
            {topic.previewSnippet}
          </p>
        </div>
      )}

      {topic.subtopics.length > 0 && (
        <ul className="mt-1 flex flex-col gap-0.5 border-l border-mercury-ink/15 pl-2">
          {topic.subtopics.map((sub) => (
            <TopicNode
              key={sub.id}
              topic={sub}
              depth={depth + 1}
              activeTopicId={activeTopicId}
              onOpenTopic={onOpenTopic}
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
  return (
    <ul className="flex flex-col gap-1">
      {topics.map((topic) => (
        <TopicNode
          key={topic.id}
          topic={topic}
          depth={0}
          activeTopicId={activeTopicId}
          onOpenTopic={onOpenTopic}
        />
      ))}
    </ul>
  );
}
