"use client";

import { motion } from "framer-motion";
import type { SubjectSummary } from "@/lib/notes-api";

const CHALK_COLORS = ["#EAF3E0", "#F5DFA0", "#B9D8E8", "#F0C2CE", "#D9C6EA"];
const UNDERLINE_STYLES: React.CSSProperties["textDecorationStyle"][] = [
  "solid",
  "wavy",
  "dotted",
  "wavy",
  "solid",
];

function SubjectIcon({ index, className, style }: { index: number; className: string; style?: React.CSSProperties }) {
  const shapes = [
    // scales — Constitutional Law
    <g key="scales">
      <path d="M30 6 V38" />
      <path d="M12 14 H48" />
      <path d="M12 14 L4 28 Q12 34 20 28 Z" />
      <path d="M48 14 L40 28 Q48 34 56 28 Z" />
      <path d="M22 44 H38" />
    </g>,
    // gavel — Torts
    <g key="gavel">
      <rect x="8" y="8" width="20" height="10" rx="1.5" transform="rotate(-35 18 13)" />
      <path d="M26 22 L40 36" />
      <path d="M40 36 L54 50" />
      <path d="M8 54 H36" />
    </g>,
    // document + pen — Contract Law
    <g key="contract">
      <rect x="8" y="6" width="32" height="42" rx="2" />
      <path d="M15 18 H33 M15 26 H33 M15 34 H26" />
      <path d="M52 14 L38 28 L35 38 L45 35 L59 21 Z" />
    </g>,
    // family / heart — Family Law
    <g key="family">
      <circle cx="18" cy="16" r="7" />
      <path d="M6 40 C6 28, 30 28, 30 40" />
      <circle cx="38" cy="20" r="5.5" />
      <path d="M28 40 C28 32, 48 32, 48 40" />
      <path d="M44 8 C44 4, 50 4, 50 8 C50 4, 56 4, 56 8 C56 13, 50 17, 50 17 C50 17, 44 13, 44 8 Z" />
    </g>,
  ];

  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes[index % shapes.length]}
    </svg>
  );
}

function HangingLamp() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2">
      <div className="mx-auto h-10 w-0.5 bg-[#1a1512]" />
      <div
        className="h-6 w-16 rounded-b-full"
        style={{ background: "linear-gradient(to bottom, #1a1512, #2b2118)" }}
      />
      <div
        className="absolute left-1/2 top-14 h-64 w-96 -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,224,160,0.22) 0%, transparent 70%)",
        }}
      />
    </div>
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
      className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-10"
      style={{
        backgroundColor: "#4a3128",
        backgroundImage: [
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 2px, transparent 2px, transparent 30px)",
          "repeating-linear-gradient(90deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 2px, transparent 2px, transparent 58px)",
          "linear-gradient(#5a3d30, #4a3128)",
        ].join(", "),
      }}
    >
      <HangingLamp />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-0 w-full max-w-2xl overflow-hidden rounded-md p-8 sm:p-12"
        style={{
          background: "#242b21",
          border: "14px solid #6B4A35",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "7px 7px",
          }}
        />

        <div className="relative mb-3 flex items-center justify-center gap-3">
          <span className="font-hand text-2xl text-white/50">✦</span>
          <h2
            className="text-center font-sans text-4xl font-extrabold uppercase tracking-wide text-white sm:text-5xl"
            style={{ textShadow: "0 0 8px rgba(255,255,255,0.15)" }}
          >
            Your Notebooks
          </h2>
          <span className="font-hand text-2xl text-white/50">✦</span>
        </div>
        <div className="mx-auto mb-10 h-0.5 w-40 rounded-full bg-white/25" />

        <div className="relative mx-auto flex max-w-md flex-col gap-6">
          {subjects.map((subject, i) => {
            const color = CHALK_COLORS[i % CHALK_COLORS.length];
            return (
              <button
                key={subject.id}
                onClick={() => onSelect(subject.id)}
                className="flex items-center gap-4 text-left transition hover:translate-x-1"
              >
                <SubjectIcon index={i} className="h-8 w-8 shrink-0" style={{ color }} />
                <span
                  className="font-chalk text-2xl sm:text-3xl"
                  style={{
                    color,
                    textShadow: "0 0 6px rgba(255,255,255,0.15)",
                    textDecorationLine: "underline",
                    textDecorationStyle: UNDERLINE_STYLES[i % UNDERLINE_STYLES.length],
                    textDecorationColor: `${color}99`,
                    textUnderlineOffset: "6px",
                  }}
                >
                  {subject.name}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
