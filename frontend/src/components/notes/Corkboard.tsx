"use client";

import { motion } from "framer-motion";
import type { SubjectSummary } from "@/lib/notes-api";

function tornBottomClipPath(teeth = 10) {
  const points = ["0% 0%", "100% 0%"];
  for (let i = 0; i <= teeth; i++) {
    const x = 100 - (i / teeth) * 100;
    const y = i % 2 === 0 ? 100 : 91;
    points.push(`${x}% ${y}%`);
  }
  return `polygon(${points.join(", ")})`;
}

const TORN_CLIP = tornBottomClipPath();

function PushPin() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-2.5 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full"
      style={{
        background: "radial-gradient(circle at 35% 30%, #f2a3a3, #c44848 65%, #8f2e2e)",
        boxShadow: "0 2px 3px rgba(0,0,0,0.35)",
      }}
    />
  );
}

function WashiTape({ className, rotate }: { className: string; rotate: number }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-6 w-16 opacity-70 ${className}`}
      style={{
        background:
          "repeating-linear-gradient(45deg, rgba(232,180,192,0.85), rgba(232,180,192,0.85) 6px, rgba(255,255,255,0.5) 6px, rgba(255,255,255,0.5) 12px)",
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
      }}
    />
  );
}

export default function Corkboard({
  subjects,
  onSelect,
}: {
  subjects: SubjectSummary[];
  onSelect: (id: number) => void;
}) {
  return (
    <div
      className="relative rounded-3xl p-3 sm:p-5"
      style={{
        background: "#5A3A24",
        boxShadow: "0 20px 50px rgba(35, 22, 12, 0.35), inset 0 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      <WashiTape className="-left-2 -top-2" rotate={-40} />
      <WashiTape className="-right-2 -top-2" rotate={40} />

      <div
        className="relative overflow-hidden rounded-2xl p-8 sm:p-12"
        style={{
          backgroundColor: "#EDE3CC",
          backgroundImage:
            "radial-gradient(rgba(90,58,36,0.1) 1.4px, transparent 1.4px), radial-gradient(rgba(90,58,36,0.06) 1.4px, transparent 1.4px)",
          backgroundSize: "18px 18px, 18px 18px",
          backgroundPosition: "0 0, 9px 9px",
        }}
      >
        <p className="mb-1 text-center font-hand text-sm uppercase tracking-widest text-[#5A3A24]/70">
          Your notebook
        </p>
        <h2 className="mb-10 text-center font-serif text-3xl text-[#4a2f1c]">
          Pin a subject to open it
        </h2>

        <div className="flex snap-x snap-proximity gap-8 overflow-x-auto px-1 pb-4 sm:justify-center sm:gap-10">
          {subjects.map((subject) => (
            <motion.button
              key={subject.id}
              onClick={() => onSelect(subject.id)}
              whileHover={{ y: -6, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="relative flex h-40 w-40 shrink-0 snap-start flex-col items-center justify-center p-4 pb-6 text-center sm:h-44 sm:w-44"
              style={{
                backgroundColor: subject.colorHex,
                boxShadow: "0 10px 18px rgba(35,22,12,0.35)",
                clipPath: TORN_CLIP,
              }}
            >
              <PushPin />
              <span className="font-hand text-xl leading-snug text-ink">{subject.name}</span>
            </motion.button>
          ))}

          <div
            className="relative flex h-40 w-40 shrink-0 snap-start flex-col items-center justify-center gap-1 p-4 text-center opacity-60 sm:h-44 sm:w-44"
            style={{
              border: "2px dashed rgba(90,58,36,0.4)",
              clipPath: TORN_CLIP,
            }}
          >
            <span className="font-hand text-3xl text-[#5A3A24]">···</span>
            <span className="font-hand text-sm text-[#5A3A24]">more subjects soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
