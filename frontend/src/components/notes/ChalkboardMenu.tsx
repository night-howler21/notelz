"use client";

import { motion } from "framer-motion";
import type { SubjectSummary } from "@/lib/notes-api";

const CHALK_COLORS = ["#EAF3E0", "#F5DFA0", "#B9D8E8", "#F0C2CE", "#D9C6EA"];

export default function ChalkboardMenu({
  subjects,
  onSelect,
}: {
  subjects: SubjectSummary[];
  onSelect: (id: number) => void;
}) {
  return (
    <div
      className="relative flex min-h-[calc(100vh-96px)] flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: "linear-gradient(to bottom, #E8DCC5 0%, #D8C6A3 100%)" }}
    >
      {/* the sign */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-2xl rounded-md p-10 sm:p-16"
        style={{
          background: "#2F3B2C",
          border: "16px solid #6B4A35",
          boxShadow: "0 30px 50px rgba(35,22,12,0.4)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "7px 7px",
          }}
        />

        <p className="mb-2 text-center font-caveat text-2xl text-white/60">Today&apos;s subjects</p>
        <h2 className="mb-12 text-center font-caveat text-5xl text-white">Pick one to dig in</h2>

        <div className="flex flex-col items-center gap-8">
          {subjects.map((subject, i) => (
            <button
              key={subject.id}
              onClick={() => onSelect(subject.id)}
              className="font-caveat text-5xl transition hover:scale-105"
              style={{
                color: CHALK_COLORS[i % CHALK_COLORS.length],
                textShadow: "0 0 8px rgba(255,255,255,0.15)",
              }}
            >
              {subject.name}
            </button>
          ))}

          <p className="mt-2 font-caveat text-2xl text-white/40">··· more subjects soon</p>
        </div>
      </motion.div>

      {/* A-frame easel legs */}
      <div className="relative h-20 w-full max-w-2xl" aria-hidden="true">
        <div
          className="absolute left-[18%] top-0 h-20 w-4 origin-top rounded-b-sm"
          style={{ background: "#6B4A35", transform: "rotate(10deg)" }}
        />
        <div
          className="absolute right-[18%] top-0 h-20 w-4 origin-top rounded-b-sm"
          style={{ background: "#6B4A35", transform: "rotate(-10deg)" }}
        />
        <div
          className="absolute left-1/2 top-10 h-2 w-40 -translate-x-1/2 rounded-full"
          style={{ background: "#5a3d29" }}
        />
      </div>
    </div>
  );
}
