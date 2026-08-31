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

/* ------------------------------ SERVICE GLYPHS ---------------------------- */

/** Nested blueprint frames converging on a core — bespoke engineering. */
export function GlyphBespoke({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" className={`${base} ${className ?? ""}`} aria-hidden>
      <rect x="8" y="8" width="80" height="48" rx="2" {...stroke} opacity="0.28" />
      <rect x="20" y="17" width="56" height="30" rx="2" {...stroke} opacity="0.55" />
      <rect x="34" y="25" width="28" height="14" rx="2" {...stroke} />
      <path d="M8 32h12M76 32h12M48 8v9M48 47v9" {...stroke} opacity="0.4" />
      <circle cx="48" cy="32" r="2.5" fill="currentColor" />
    </svg>
  );
}

/** Node-and-stage relationship graph — CRM systems. */
export function GlyphCrm({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" className={`${base} ${className ?? ""}`} aria-hidden>
      <path d="M14 32h20M46 32h18M46 18h18M46 46h18" {...stroke} opacity="0.5" />
      <path d="M34 32c6 0 6-14 12-14M34 32c6 0 6 14 12 14" {...stroke} opacity="0.7" />
      <circle cx="10" cy="32" r="4" {...stroke} />
      <circle cx="68" cy="18" r="3" fill="currentColor" opacity="0.85" />
      <circle cx="68" cy="32" r="3" fill="currentColor" opacity="0.55" />
      <circle cx="68" cy="46" r="3" fill="currentColor" opacity="0.3" />
      <path d="M74 18h14M74 32h10M74 46h6" {...stroke} opacity="0.3" />
    </svg>
  );
}

/** Decision diamond with automated branches — AI automation. */
export function GlyphAi({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" className={`${base} ${className ?? ""}`} aria-hidden>
      <path d="M6 32h18" {...stroke} opacity="0.6" />
      <path d="M38 32l12-12 12 12-12 12z" {...stroke} />
      <path d="M24 32h14" {...stroke} />
      <path d="M62 32h10c6 0 6-14 12-14" {...stroke} opacity="0.7" />
      <path d="M62 32h10c6 0 6 14 12 14" {...stroke} opacity="0.4" />
      <circle cx="50" cy="32" r="2.5" fill="currentColor" />
      <circle cx="88" cy="18" r="2.5" fill="currentColor" opacity="0.8" />
      <circle cx="88" cy="46" r="2.5" {...stroke} opacity="0.5" />
    </svg>
  );
}

/** Modular panel arrangement — internal platforms. */
export function GlyphPlatform({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" className={`${base} ${className ?? ""}`} aria-hidden>
      <rect x="8" y="10" width="34" height="20" rx="2" {...stroke} />
      <rect x="48" y="10" width="40" height="12" rx="2" {...stroke} opacity="0.55" />
      <rect x="48" y="26" width="40" height="28" rx="2" {...stroke} opacity="0.35" />
      <rect x="8" y="34" width="34" height="20" rx="2" {...stroke} opacity="0.7" />
      <path d="M14 18h14M14 42h20M54 34h26M54 42h18" {...stroke} opacity="0.45" />
    </svg>
  );
}

/** Browser frame with performance meter — websites. */
export function GlyphWebsite({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" className={`${base} ${className ?? ""}`} aria-hidden>
      <rect x="8" y="10" width="80" height="44" rx="3" {...stroke} opacity="0.6" />
      <path d="M8 20h80" {...stroke} opacity="0.6" />
      <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.7" />
      <path d="M18 44a22 22 0 0 1 44 0" {...stroke} />
      <path d="M40 44l14-11" {...stroke} />
      <circle cx="40" cy="44" r="2.5" fill="currentColor" />
      <path d="M70 44V30M78 44v-8" {...stroke} opacity="0.4" />
    </svg>
  );
}

/** Cross-connected endpoints — integrations. */
export function GlyphIntegration({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" className={`${base} ${className ?? ""}`} aria-hidden>
      <circle cx="16" cy="16" r="5" {...stroke} />
      <circle cx="16" cy="48" r="5" {...stroke} opacity="0.6" />
      <circle cx="80" cy="16" r="5" {...stroke} opacity="0.6" />
      <circle cx="80" cy="48" r="5" {...stroke} />
      <path d="M21 16h20M55 16h20M21 48h20M55 48h20" {...stroke} opacity="0.4" />
      <path d="M41 16c8 0 6 32 14 32M41 48c8 0 6-32 14-32" {...stroke} opacity="0.55" />
      <circle cx="48" cy="32" r="3" fill="currentColor" />
    </svg>
  );
}
