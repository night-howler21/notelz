"use client";

import { motion } from "framer-motion";
import type { SubjectSummary } from "@/lib/notes-api";

const CHALK_COLORS = ["#EAF3E0", "#F5DFA0", "#B9D8E8", "#F0C2CE", "#D9C6EA"];

function Doodle({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`pointer-events-none absolute stroke-white/25 ${className}`}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

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
        className="relative w-full max-w-2xl overflow-hidden rounded-md p-10 sm:p-16"
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

        {/* chalk doodles, scattered and faint */}
        <Doodle className="left-4 top-4 h-10 w-10 -rotate-6">
          <path d="M30 8 L34 22 L48 22 L37 30 L41 44 L30 35 L19 44 L23 30 L12 22 L26 22 Z" />
        </Doodle>
        <Doodle className="right-6 top-6 h-9 w-9 rotate-12">
          <circle cx="30" cy="24" r="14" />
          <path d="M24 40 h12 M26 46 h8" />
          <path d="M30 4 v4 M12 12 l3 3 M48 12 l-3 3" />
        </Doodle>
        <Doodle className="bottom-6 left-6 h-10 w-14 -rotate-3">
          <path d="M6 44 C10 20, 20 14, 30 24 C40 34, 50 28, 54 10" />
        </Doodle>
        <Doodle className="bottom-8 right-8 h-9 w-9 rotate-6">
          <path d="M10 34 Q10 14 30 14 Q50 14 50 30" />
          <path d="M10 34 L10 20 M50 30 L50 44" />
        </Doodle>

        <p className="mb-1 text-center font-hand text-sm text-white/25">Today&apos;s subjects</p>
        <p className="mb-10 text-center font-hand text-xs text-white/20">
          pick one to dig in
        </p>

        <div className="relative flex flex-col items-center gap-8">
          {subjects.map((subject, i) => (
            <button
              key={subject.id}
              onClick={() => onSelect(subject.id)}
              className="font-chalk text-3xl transition hover:scale-105 sm:text-4xl"
              style={{
                color: CHALK_COLORS[i % CHALK_COLORS.length],
                textShadow: "0 0 6px rgba(255,255,255,0.2)",
              }}
            >
              {subject.name}
            </button>
          ))}

          <p className="mt-2 font-hand text-xl text-white/30">··· more subjects soon</p>
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
