import type { ReactNode } from "react";

const PIN_GRADIENTS: Record<string, string> = {
  red: "radial-gradient(circle at 35% 30%, #f2a3a3, #c44848 65%, #8f2e2e)",
  blue: "radial-gradient(circle at 35% 30%, #a3c4f2, #4870c4 65%, #2e4f8f)",
  green: "radial-gradient(circle at 35% 30%, #b7e0ab, #5a9e4a 65%, #3b6e30)",
  yellow: "radial-gradient(circle at 35% 30%, #f7e7a3, #d9b23f 65%, #a9822a)",
};

function PushPin({ color }: { color: keyof typeof PIN_GRADIENTS }) {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-2.5 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full"
      style={{
        background: PIN_GRADIENTS[color],
        boxShadow: "0 2px 3px rgba(0,0,0,0.35)",
      }}
    />
  );
}

export default function NotepadBanner({
  className = "",
  pin,
  children,
}: {
  className?: string;
  pin?: keyof typeof PIN_GRADIENTS;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      {pin && <PushPin color={pin} />}
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
