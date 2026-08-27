"use client";

import type { TopicDetail } from "@/lib/notes-api";

export default function TopicReader({
  topic,
  onOpenTopic,
  textSize = "normal",
}: {
  topic: TopicDetail;
  onOpenTopic: (id: number) => void;
  textSize?: "normal" | "large";
}) {
  const paragraphs = topic.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const bodyParagraphs = paragraphs.slice(0, -1);
  const takeaway = paragraphs.at(-1);
  const bodySize = textSize === "large" ? "text-[20px] sm:text-[21px]" : "text-[17px] sm:text-[18px]";

  return (
    <article className="mx-auto max-w-4xl pb-12 [overflow-wrap:anywhere] sm:pb-16">
      <header className="mb-6">
        <p className="mb-1 font-hand text-[11px] uppercase tracking-[0.18em] text-mercury-ink/55">
          {topic.subjectName}
        </p>
        <h2 className="inline font-caveat text-3xl font-semibold leading-tight text-mercury-ink sm:text-4xl">
          <span className="bg-[linear-gradient(transparent_64%,rgba(195,221,188,0.72)_64%)] px-1">
            {topic.title}
          </span>
        </h2>
      </header>

      <div className="space-y-3">
        {bodyParagraphs.map((paragraph, index) => (
          <p
            key={index}
            className={`relative pl-5 font-hand leading-8 text-ink ${bodySize} before:absolute before:left-0 before:top-0 before:text-mercury-ink before:content-['•']`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {takeaway && (
        <aside className="relative mt-7 rotate-[0.15deg] rounded-md border border-mercury-ink/45 bg-mercury/15 px-4 py-3 shadow-sm sm:px-5">
          <span
            aria-hidden="true"
            className="absolute -right-2.5 -top-3 h-8 w-4 rotate-12 rounded-full border-2 border-mercury-ink/45 border-l-transparent"
          />
          <p className="font-hand text-xs uppercase tracking-[0.18em] text-mercury-ink/60">
            Key takeaway
          </p>
          <p className={`mt-1 font-hand leading-8 text-ink ${bodySize}`}>{takeaway}</p>
        </aside>
      )}

      {topic.relatedTopics.length > 0 && (
        <div className="mt-9 border-t border-dashed border-mercury-ink/25 pt-5">
          <p className="mb-2.5 font-hand text-sm uppercase tracking-wide text-mercury-ink/60">
            Continue reading
          </p>
          <div className="flex flex-wrap gap-2">
            {topic.relatedTopics.map((related) => (
              <button
                key={related.id}
                onClick={() => onOpenTopic(related.id)}
                className="min-h-10 rounded-full border border-mercury-ink/25 bg-paper/70 px-4 py-1.5 font-hand text-base text-mercury-ink transition hover:bg-mercury/40"
              >
                {related.title} →
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
