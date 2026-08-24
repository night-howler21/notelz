export default function Catistor({ className = "h-64 w-64" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden="true">
      {/* tail, black */}
      <path
        d="M148 215 Q195 205 185 145 Q180 118 155 128"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* body, white */}
      <ellipse cx="100" cy="192" rx="56" ry="48" fill="#FFFFFF" stroke="#2B2A27" strokeWidth="2" />

      {/* paws */}
      <ellipse cx="53" cy="215" rx="15" ry="19" fill="#FFFFFF" stroke="#2B2A27" strokeWidth="2" />
      <ellipse cx="147" cy="215" rx="15" ry="19" fill="#FFFFFF" stroke="#2B2A27" strokeWidth="2" />

      {/* advocate's robe, black */}
      <path
        d="M52 158 Q100 140 148 158 L154 236 Q100 254 46 236 Z"
        fill="#1A1A1A"
      />
      {/* robe lapels */}
      <path d="M100 158 L70 170 L86 236 L100 226 Z" fill="#2B2A27" />
      <path d="M100 158 L130 170 L114 236 L100 226 Z" fill="#2B2A27" />

      {/* white shirt front */}
      <path d="M90 165 L110 165 L108 200 L100 208 L92 200 Z" fill="#FFFFFF" />

      {/* barrister bands */}
      <rect x="88" y="196" width="9" height="34" rx="2" fill="#FFFFFF" stroke="#2B2A27" strokeWidth="1.5" />
      <rect x="103" y="196" width="9" height="34" rx="2" fill="#FFFFFF" stroke="#2B2A27" strokeWidth="1.5" />

      {/* gavel in right paw */}
      <g transform="translate(150,206) rotate(25)">
        <rect x="-3" y="-22" width="6" height="26" fill="#8B5A2B" rx="2" />
        <rect x="-13" y="-30" width="26" height="11" fill="#A0672E" rx="2" stroke="#6b4a1e" strokeWidth="1" />
      </g>

      {/* head, white */}
      <circle cx="100" cy="92" r="56" fill="#FFFFFF" stroke="#2B2A27" strokeWidth="2" />

      {/* ears */}
      <path d="M54 62 L43 14 L86 46 Z" fill="#FFFFFF" stroke="#2B2A27" strokeWidth="2" strokeLinejoin="round" />
      <path d="M146 62 L157 14 L114 46 Z" fill="#FFFFFF" stroke="#2B2A27" strokeWidth="2" strokeLinejoin="round" />
      <path d="M57 53 L50 26 L74 45 Z" fill="#F0BFC4" />
      <path d="M143 53 L150 26 L126 45 Z" fill="#F0BFC4" />

      {/* black forehead patch */}
      <path
        d="M68 44 Q100 20 132 44 Q129 74 100 76 Q71 74 68 44 Z"
        fill="#1A1A1A"
      />

      {/* eyes */}
      <ellipse cx="79" cy="97" rx="7.5" ry="9.5" fill="#1A1A1A" />
      <ellipse cx="121" cy="97" rx="7.5" ry="9.5" fill="#1A1A1A" />
      <circle cx="81.5" cy="93.5" r="2.2" fill="#FFFFFF" />
      <circle cx="123.5" cy="93.5" r="2.2" fill="#FFFFFF" />

      {/* nose */}
      <path d="M95 110 L105 110 L100 117 Z" fill="#E8A3A3" />

      {/* mouth */}
      <path
        d="M100 117 Q100 124 90 126 M100 117 Q100 124 110 126"
        fill="none"
        stroke="#2B2A27"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* whiskers */}
      <line x1="36" y1="98" x2="64" y2="101" stroke="#2B2A27" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="110" x2="64" y2="108" stroke="#2B2A27" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="164" y1="98" x2="136" y2="101" stroke="#2B2A27" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="164" y1="110" x2="136" y2="108" stroke="#2B2A27" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
