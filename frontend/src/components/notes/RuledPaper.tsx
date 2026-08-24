import type { ReactNode } from "react";

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
        backgroundColor: "#FBF8F1",
        backgroundImage:
          "linear-gradient(90deg, transparent 54px, rgba(198,108,103,0.4) 55px, transparent 56px), repeating-linear-gradient(180deg, transparent, transparent 31px, rgba(62,91,60,0.16) 32px)",
      }}
    >
      {children}
    </div>
  );
}
