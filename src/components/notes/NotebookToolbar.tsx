"use client";

function ToolIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      {children}
    </svg>
  );
}

export default function NotebookToolbar({
  ruled,
  onToggleRuled,
  textSize,
  onTextSizeChange,
  saved,
  canSave,
  onToggleSaved,
}: {
  ruled: boolean;
  onToggleRuled: () => void;
  textSize: "normal" | "large";
  onTextSizeChange: (size: "normal" | "large") => void;
  saved: boolean;
  canSave: boolean;
  onToggleSaved: () => void;
}) {
  const toolClass =
    "grid h-9 w-9 place-items-center rounded-md text-mercury-ink/65 transition hover:bg-mercury/35 hover:text-mercury-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercury-ink/35";

  return (
    <div className="flex min-h-13 items-center justify-between gap-3 border-b border-mercury-ink/15 bg-paper-warm/65 px-3 sm:px-5">
      <div className="flex items-center gap-1" aria-label="Reading tools">
        <span className="hidden pr-2 font-hand text-sm text-mercury-ink/55 sm:inline">
          Reading mode
        </span>
        <button
          type="button"
          onClick={onToggleRuled}
          title={ruled ? "Hide paper ruling" : "Show paper ruling"}
          aria-pressed={ruled}
          className={`${toolClass} ${ruled ? "bg-mercury/30 text-mercury-ink" : ""}`}
        >
          <ToolIcon>
            <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </ToolIcon>
          <span className="sr-only">Toggle paper ruling</span>
        </button>
        <span className="mx-1 h-5 w-px bg-mercury-ink/15" aria-hidden="true" />
        <button
          type="button"
          onClick={() => onTextSizeChange("normal")}
          title="Regular text"
          aria-pressed={textSize === "normal"}
          className={`${toolClass} font-serif text-sm ${textSize === "normal" ? "bg-mercury/30 text-mercury-ink" : ""}`}
        >
          Aa<span className="sr-only">Regular text size</span>
        </button>
        <button
          type="button"
          onClick={() => onTextSizeChange("large")}
          title="Large text"
          aria-pressed={textSize === "large"}
          className={`${toolClass} font-serif text-lg ${textSize === "large" ? "bg-mercury/30 text-mercury-ink" : ""}`}
        >
          A<span className="sr-only">Large text size</span>
        </button>
      </div>

      <button
        type="button"
        onClick={onToggleSaved}
        disabled={!canSave}
        aria-pressed={saved}
        className="flex min-h-9 items-center gap-2 rounded-md px-2 text-mercury-ink/55 transition hover:bg-mercury/30 hover:text-mercury-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="hidden font-hand text-sm sm:inline">
          {saved ? "Saved to your library" : "Save this note"}
        </span>
        <ToolIcon>
          <path
            d="M7 4.5h10v15l-5-3-5 3z"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </ToolIcon>
        <span className="sr-only">{saved ? "Remove note from library" : "Save note to library"}</span>
      </button>
    </div>
  );
}
