type Props = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * Zocalo icon mark: a light accent-blue "Z" whose tail resolves into an open
 * ring, overlapping a deep steel-blue ring, with a gold dot at the top-right
 * terminus of the Z stroke.
 */
export function ZocaloMark({ size = 40, className, title = "Zocalo" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      {/* Z: top bar + diagonal */}
      <path
        d="M15 14H43L27 33"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* rear ring — deep steel blue */}
      <circle
        cx="24"
        cy="40.5"
        r="10.5"
        fill="none"
        stroke="var(--secondary)"
        strokeWidth="5.5"
      />
      {/* front loop — accent blue, continues the Z tail */}
      <circle
        cx="38"
        cy="42"
        r="12.5"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="5.5"
      />
      <circle cx="45.5" cy="13.5" r="3.6" fill="var(--gold)" />
    </svg>
  );
}

export function ZocaloLogo({ size = 40, className }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <ZocaloMark size={size} />
      <span className="text-[1.2rem] font-medium tracking-[-0.02em] lowercase">zocalo</span>
    </span>
  );
}
