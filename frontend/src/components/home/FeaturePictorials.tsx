type Props = { className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function NotesPictorial({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...common}>
      <path d="M16 12 L60 10 L62 66 L18 68 Z" />
      <path d="M15 13 L59 11" opacity="0.5" />
      <path d="M24 26 H50 M24 26.8 H48" />
      <path d="M24 38 H52 M24 38.8 H46" />
      <path d="M24 50 H44 M24 50.8 H40" />
    </svg>
  );
}

export function VideoPictorial({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...common}>
      <path d="M12 24 L50 22 L52 58 L14 60 Z" />
      <path d="M52 32 L68 22 L67 58 L52 50" />
      <path d="M13 25 L49 23" opacity="0.5" />
    </svg>
  );
}

export function TutorPictorial({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...common}>
      <circle cx="40" cy="26" r="13" />
      <circle cx="40" cy="26.6" r="13" opacity="0.4" />
      <path d="M14 66 C16 46, 28 40, 40 40 C52 40, 64 46, 66 66" />
      <path d="M30 16 L40 10 L50 16" />
    </svg>
  );
}

export function RevisionPictorial({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...common}>
      <circle cx="38" cy="42" r="24" />
      <circle cx="38" cy="42.6" r="24" opacity="0.35" />
      <path d="M38 26 L38 42 L52 50" />
      <path d="M28 6 H48" />
    </svg>
  );
}
