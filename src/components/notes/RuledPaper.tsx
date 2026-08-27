import type { CSSProperties, ReactNode } from "react";

export const ruledPaperStyle: CSSProperties = {
  backgroundColor: "#FBF8EF",
  backgroundImage: [
    // red margin line
    "linear-gradient(to right, transparent 55px, rgba(196,102,96,0.55) 55px, rgba(196,102,96,0.55) 56.5px, transparent 56.5px)",
    // horizontal ruled lines, crisp 1.5px every 32px
    "repeating-linear-gradient(to bottom, transparent, transparent 30.5px, rgba(93,120,90,0.3) 30.5px, rgba(93,120,90,0.3) 32px, transparent 32px)",
  ].join(", "),
};

export default function RuledPaper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        ...ruledPaperStyle,
        boxShadow: "inset 0 1px 3px rgba(62,91,60,0.12)",
      }}
    >
      {children}
    </div>
  );
}
