"use client";

import type { TopicDetail } from "@/lib/notes-api";

export default function TopicReader({
  topic,
  onBack,
}: {
  topic: TopicDetail;
  onBack: () => void;
}) {
  const paragraphs = topic.content.split(/\n\s*\n/);

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 border-b border-mercury-ink/10 bg-[#FBF8F1]/90 px-8 py-4 backdrop-blur sm:px-14">
        <button
          onClick={onBack}
          className="shrink-0 rounded-full border border-mercury-ink/25 bg-white/70 px-4 py-1.5 text-sm font-medium text-mercury-ink transition hover:bg-white"
        >
          ← Back
        </button>
        <div>
          <p className="font-hand text-xs uppercase tracking-widest text-mercury-ink/60">
            {topic.subjectName}
          </p>
          <h2 className="font-serif text-lg text-mercury-ink sm:text-xl">{topic.title}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8 sm:px-14">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="mb-2 font-hand text-[19px] text-ink"
            style={{ lineHeight: "32px" }}
          >
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </div>
  );
}
