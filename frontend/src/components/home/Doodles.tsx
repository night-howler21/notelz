type DoodleProps = { className?: string };

const stroke = "currentColor";

export function ScalesDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 10 V80" />
      <path d="M20 24 H80" />
      <path d="M20 24 L8 50 Q20 60 32 50 Z" />
      <path d="M80 24 L68 50 Q80 60 92 50 Z" />
      <path d="M38 90 H62" />
      <path d="M50 80 L50 90" />
    </svg>
  );
}

export function GavelDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="20" width="34" height="16" rx="2" transform="rotate(-35 35 28)" />
      <path d="M42 40 L60 58" />
      <path d="M60 58 L80 78" />
      <path d="M16 84 H60" />
    </svg>
  );
}

export function QuillDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M78 12 C40 20, 20 55, 18 88" />
      <path d="M78 12 C70 22, 55 26, 46 40" />
      <path d="M18 88 L30 74" />
    </svg>
  );
}

export function BookDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 24 C40 16, 20 16, 12 22 V78 C20 72, 40 72, 50 80" />
      <path d="M50 24 C60 16, 80 16, 88 22 V78 C80 72, 60 72, 50 80" />
      <path d="M50 24 V80" />
    </svg>
  );
}
