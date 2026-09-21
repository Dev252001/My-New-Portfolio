interface Props {
  width?: number | string;
  height?: number | string;
  variant?: 'portrait' | 'landscape' | 'contact';
  className?: string;
  initials?: string;
  alt?: string;
}

/**
 * Renders a soft-gradient + dot-grid placeholder image.
 * Pass className to control sizing/aspect-ratio on the outer wrapper.
 */
export default function PlaceholderImage({
  variant = 'portrait',
  className = '',
  initials,
  alt = 'Placeholder image',
}: Props) {
  const gradients: Record<string, [string, string]> = {
    portrait: ['#D8D8D8', '#C4C4C4'],
    landscape: ['#E0DDD8', '#CCCAC4'],
    contact: ['#D4D8DC', '#C4C8CC'],
  };
  const [c1, c2] = gradients[variant] ?? gradients.portrait;
  const uid = `ph-${variant}`;

  return (
    <div
      className={`overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <pattern
            id={`dots-${uid}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.07)" />
          </pattern>
        </defs>
        <rect width="400" height="500" fill={`url(#grad-${uid})`} />
        <rect width="400" height="500" fill={`url(#dots-${uid})`} />
        {initials && (
          <text
            x="200"
            y="270"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="80"
            fontWeight="700"
            fill="rgba(0,0,0,0.18)"
            letterSpacing="-2"
          >
            {initials}
          </text>
        )}
      </svg>
    </div>
  );
}
