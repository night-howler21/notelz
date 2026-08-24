export default function NotelzMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      {/* left vertical stroke of the N */}
      <path d="M11 30V10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* diagonal stroke */}
      <path d="M11 10L27 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* right stroke, rendered as a pen: shaft + nib */}
      <path d="M27 24V10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M27 24 L23.5 32.5 L27 30.5 L30.5 32.5 Z"
        fill="currentColor"
      />
      <path d="M27 24V31" stroke="var(--color-paper, #F6F1E7)" strokeWidth="0.75" />
    </svg>
  );
}
