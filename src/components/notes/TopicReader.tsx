"use client";

import type { TopicDetail } from "@/lib/notes-api";

export default function TopicReader({
  topic,
  onOpenTopic,
}: {
  topic: TopicDetail;
  onOpenTopic: (id: number) => void;
}) {
  const paragraphs = topic.content.split(/\n\s*\n/);

  return (
    <div className="pb-10 [overflow-wrap:anywhere] sm:pb-16">
      <div className="mb-4 border-b border-mercury-ink/10 pb-3">
        <p className="font-hand text-xs uppercase tracking-widest text-mercury-ink/60">
          {topic.subjectName}
        </p>
        <h2 className="font-serif text-lg text-mercury-ink sm:text-xl">{topic.title}</h2>
      </div>

      {paragraphs.map((paragraph, i) => (
        <p key={i} className="mb-2 font-hand text-[18px] text-ink sm:text-[19px]" style={{ lineHeight: "32px" }}>
          {paragraph.trim()}
        </p>
      ))}

      {topic.relatedTopics.length > 0 && (
        <div className="mt-8 border-t border-dashed border-mercury-ink/20 pt-5">
          <p className="mb-2.5 font-hand text-sm uppercase tracking-wide text-mercury-ink/60">
            See also
          </p>
          <div className="flex flex-wrap gap-2">
            {topic.relatedTopics.map((related) => (
              <button
                key={related.id}
                onClick={() => onOpenTopic(related.id)}
                className="rounded-full border border-mercury-ink/25 bg-mercury/20 px-4 py-1.5 font-hand text-base text-mercury-ink transition hover:bg-mercury/40"
              >
                {related.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
