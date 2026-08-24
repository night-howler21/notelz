const NOTES = [
  { color: "#A9CBA0", text: "No one tells you what to study at the last minute — so we will." },
  { color: "#F0D89A", text: "Notebook-style notes for every subject, ready whenever you are." },
  { color: "#A8C8DE", text: "1-1 tutoring, real tutors, no scheduling headaches." },
  { color: "#E8B4C0", text: "Last-minute revision, gamified — Catistor is watching." },
] as const;

function tornBottomClipPath(teeth = 8) {
  const points = ["0% 0%", "100% 0%"];
  for (let i = 0; i <= teeth; i++) {
    const x = 100 - (i / teeth) * 100;
    const y = i % 2 === 0 ? 100 : 90;
    points.push(`${x}% ${y}%`);
  }
  return `polygon(${points.join(", ")})`;
}

const TORN_CLIP = tornBottomClipPath();

function PushPin() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full"
      style={{
        background: "radial-gradient(circle at 35% 30%, #f2a3a3, #c44848 65%, #8f2e2e)",
        boxShadow: "0 2px 3px rgba(0,0,0,0.35)",
      }}
    />
  );
}

export default function AuthBoard() {
  return (
    <div
      className="hidden h-full flex-col justify-center rounded-3xl p-6 lg:flex"
      style={{
        background: "#5A3A24",
        boxShadow: "0 20px 50px rgba(35, 22, 12, 0.35), inset 0 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="relative grid grid-cols-2 gap-6 overflow-hidden rounded-2xl p-8"
        style={{
          backgroundColor: "#EDE3CC",
          backgroundImage:
            "radial-gradient(rgba(90,58,36,0.1) 1.4px, transparent 1.4px), radial-gradient(rgba(90,58,36,0.06) 1.4px, transparent 1.4px)",
          backgroundSize: "18px 18px, 18px 18px",
          backgroundPosition: "0 0, 9px 9px",
        }}
      >
        {NOTES.map((note) => (
          <div
            key={note.text}
            className="relative flex h-36 items-center justify-center p-4 pb-6 text-center"
            style={{
              backgroundColor: note.color,
              boxShadow: "0 10px 18px rgba(35,22,12,0.3)",
              clipPath: TORN_CLIP,
            }}
          >
            <PushPin />
            <p className="font-hand text-base leading-snug text-ink">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
