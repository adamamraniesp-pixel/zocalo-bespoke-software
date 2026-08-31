type Props = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * Zocalo icon mark: a light accent-blue "Z" — top bar with a gold dot terminus,
 * a steep diagonal that runs into an open accent-blue loop, overlapping a deep
 * steel-blue ring behind it.
 */
export function ZocaloMark({ size = 44, className, title = "Zocalo" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      {/* rear ring — deep steel blue */}
      <circle cx="25" cy="42" r="10" fill="none" stroke="var(--secondary)" strokeWidth="5" />
      {/* Z: top bar + steep diagonal running into the loop */}
      <path
        d="M14 16H44L26 38"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* front loop — accent blue */}
      <circle cx="37" cy="45" r="12" fill="none" stroke="var(--primary)" strokeWidth="5" />
      <circle cx="45.5" cy="15.5" r="3.4" fill="var(--gold)" />
    </svg>
  );
}

export function ZocaloLogo({ size = 44, className }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <ZocaloMark size={size} />
      <span className="text-[1.25rem] font-medium tracking-[-0.02em] lowercase">zocalo</span>
    </span>
  );
}
