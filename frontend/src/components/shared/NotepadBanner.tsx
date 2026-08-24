import type { ReactNode } from "react";

export default function NotepadBanner({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="relative flex h-full flex-col overflow-hidden bg-white shadow-md"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
        }}
      >
        {/* spiral binding strip */}
        <div
          className="h-4 shrink-0 w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, transparent 2.4px, #C9BFA0 2.4px, #C9BFA0 3.2px, transparent 3.2px)",
            backgroundSize: "14px 14px",
            backgroundPosition: "7px 3px",
            backgroundRepeat: "repeat-x",
          }}
        />
        <div
          className="flex-1"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 17px, rgba(150,130,90,0.22) 17px, rgba(150,130,90,0.22) 18px)",
          }}
        >
          {children}
        </div>
      </div>

      {/* folded corner */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-3.5 w-3.5"
        style={{
          background: "linear-gradient(135deg, #ddd0ac, #b7a97e)",
          clipPath: "polygon(0 0, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
}
