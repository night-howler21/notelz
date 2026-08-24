"use client";

import type { SubjectSummary } from "@/lib/notes-api";

export default function SubjectTabs({
  subjects,
  activeId,
  onSelect,
}: {
  subjects: SubjectSummary[];
  activeId: number | null;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="flex shrink-0 flex-row gap-3 overflow-x-auto pb-1 lg:w-48 lg:flex-col lg:gap-4 lg:overflow-visible lg:pb-0">
      {subjects.map((subject, i) => {
        const isActive = subject.id === activeId;
        return (
          <button
            key={subject.id}
            onClick={() => onSelect(subject.id)}
            className={`group relative shrink-0 rounded-r-xl rounded-l-sm px-4 py-3 text-left font-hand text-lg text-ink shadow-md transition-all ${
              isActive ? "shadow-lg" : "opacity-75 hover:opacity-100"
            }`}
            style={{
              backgroundColor: subject.colorHex,
              transform: isActive ? "rotate(0deg) scale(1.03)" : `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`,
            }}
          >
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-5 h-3 w-3 rounded-full bg-white/80 shadow-inner"
            />
            {subject.name}
          </button>
        );
      })}
    </div>
  );
}
