type Props = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * Zocalo icon mark — pure transparent SVG geometry.
 * Dark-blue ring behind, a thick light-blue continuous "Z"/"3" stroke on top,
 * and a solid orange sphere at the top-right terminus of the Z.
 */
export function ZocaloMark({ size = 44, className, title = "Zocalo" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
    >
      {/* rear ring — dark blue, behind everything */}
      <circle cx="38" cy="66" r="20" stroke="#2A5B84" strokeWidth="9" />

      {/* front loop — light blue, overlapping the ring */}
      <circle cx="58" cy="68" r="24" stroke="#75A7DF" strokeWidth="9" />

      {/* the Z: long top bar running into a steep diagonal, into the loop */}
      <path
        d="M20 22 H78 L44 62"
        stroke="#75A7DF"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* orange sphere at the top-right tip of the Z */}
      <circle cx="80" cy="20" r="7" fill="#D9842B" />
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
