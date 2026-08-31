type GlyphProps = { className?: string };

const base = "text-primary";
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Ringing handset with outbound signal arcs — after-hours answering. */
export function GlyphAnswering({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" className={`${base} ${className ?? ""}`} aria-hidden>
      <path d="M16 20c0 16 12 28 28 28" {...stroke} />
      <path d="M12 16h10l4 9-6 4" {...stroke} />
      <path d="M44 44v8h-8" {...stroke} />
      <path d="M60 22a14 14 0 0 1 0 20" {...stroke} opacity="0.75" />
      <path d="M70 15a24 24 0 0 1 0 34" {...stroke} opacity="0.45" />
      <path d="M80 8a34 34 0 0 1 0 48" {...stroke} opacity="0.2" />
      <circle cx="52" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}

/** Staged pipeline columns with a moving card — CRM. */
export function GlyphPipeline({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" className={`${base} ${className ?? ""}`} aria-hidden>
      <rect x="8" y="12" width="20" height="40" rx="2" {...stroke} opacity="0.5" />
      <rect x="34" y="12" width="20" height="40" rx="2" {...stroke} opacity="0.7" />
      <rect x="60" y="12" width="20" height="40" rx="2" {...stroke} />
      <rect x="12" y="18" width="12" height="7" rx="1.5" fill="currentColor" opacity="0.25" />
      <rect x="38" y="18" width="12" height="7" rx="1.5" fill="currentColor" opacity="0.45" />
      <rect x="64" y="18" width="12" height="7" rx="1.5" fill="currentColor" opacity="0.8" />
      <path d="M84 32h6M86 28l4 4-4 4" {...stroke} />
    </svg>
  );
}

/** Branching intake path with checkpoints — patient workflow. */
export function GlyphWorkflow({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" className={`${base} ${className ?? ""}`} aria-hidden>
      <path d="M8 32h18" {...stroke} />
      <path d="M26 32c10 0 10-16 20-16h14" {...stroke} opacity="0.8" />
      <path d="M26 32c10 0 10 16 20 16h14" {...stroke} opacity="0.5" />
      <circle cx="26" cy="32" r="3.5" {...stroke} />
      <circle cx="62" cy="16" r="3.5" fill="currentColor" opacity="0.8" />
      <circle cx="62" cy="48" r="3.5" {...stroke} opacity="0.6" />
      <path d="M68 16h20M68 48h14" {...stroke} opacity="0.35" />
    </svg>
  );
}

/** Sequential steps ascending — client onboarding. */
export function GlyphOnboarding({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" className={`${base} ${className ?? ""}`} aria-hidden>
      <path d="M8 52h16V40h16V28h16V16h16" {...stroke} />
      <circle cx="24" cy="40" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="40" cy="28" r="2.5" fill="currentColor" opacity="0.55" />
      <circle cx="56" cy="16" r="2.5" fill="currentColor" opacity="0.8" />
      <path d="M72 16h16" {...stroke} opacity="0.35" />
      <path d="M8 8v44" {...stroke} opacity="0.25" />
    </svg>
  );
}

/** Plinth / base diagram used as the Why section's editorial mark. */
export function GlyphPlinth({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 120 80" className={`${base} ${className ?? ""}`} aria-hidden>
      <path d="M10 70h100" {...stroke} />
      <path d="M22 70V52h76v18" {...stroke} opacity="0.75" />
      <path d="M34 52V36h52v16" {...stroke} opacity="0.5" />
      <path d="M46 36V22h28v14" {...stroke} opacity="0.3" />
      <circle cx="60" cy="14" r="3" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
