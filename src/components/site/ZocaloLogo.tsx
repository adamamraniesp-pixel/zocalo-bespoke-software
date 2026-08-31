type Props = {
  size?: number;
  className?: string;
  title?: string;
  wordmarkClassName?: string;
};

/**
 * Zocalo icon mark: a light-blue rounded "3/Z" stroke with a gold dot at its
 * top-right terminus, interlocking with a deep-blue ring at the lower left.
 */
export function ZocaloMark({ size = 32, className, title = "Zocalo" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      {/* interlocking ring — deep brand blue */}
      <circle
        cx="25.5"
        cy="42"
        r="11.5"
        fill="none"
        stroke="var(--brand-navy)"
        strokeWidth="5.5"
      />
      {/* the "3/Z" stroke — light brand blue, drawn over the ring */}
      <path
        d="M18 14.5H44L25 33.5H29.5A11.2 11.2 0 1 1 21.6 51.5"
        fill="none"
        stroke="var(--brand-blue)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* gold terminus dot */}
      <circle cx="45" cy="14" r="4" fill="var(--brand-dot)" />
    </svg>
  );
}

export function ZocaloLogo({ size = 30, className, wordmarkClassName }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <ZocaloMark size={size} />
      <span
        className={`text-[1.05rem] font-semibold tracking-[-0.02em] lowercase ${wordmarkClassName ?? ""}`}
      >
        zocalo
      </span>
    </span>
  );
}
