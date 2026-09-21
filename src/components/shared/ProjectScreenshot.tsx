/**
 * Inline SVG laptop/browser frame with skeleton UI placeholder.
 * Used as project screenshot until real images are provided.
 */
interface Props {
  className?: string;
  aspectRatio?: '16/9' | '4/5';
  label?: string;
}

export default function ProjectScreenshot({
  className = '',
  aspectRatio = '16/9',
  label = 'Project screenshot placeholder',
}: Props) {
  const h = aspectRatio === '16/9' ? 225 : 500;

  return (
    <svg
      viewBox={`0 0 400 ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={label}
      role="img"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="scr-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4E4E4" />
          <stop offset="100%" stopColor="#D0D0D0" />
        </linearGradient>
      </defs>

      {/* Body */}
      <rect width="400" height={h} fill="url(#scr-grad)" rx="4" />

      {/* Browser chrome bar */}
      <rect width="400" height="28" fill="#C8C8C8" rx="4" />
      <rect y="24" width="400" height="4" fill="#C8C8C8" />

      {/* Chrome dots */}
      <circle cx="16" cy="14" r="5" fill="#E07070" />
      <circle cx="30" cy="14" r="5" fill="#E0C070" />
      <circle cx="44" cy="14" r="5" fill="#70C070" />

      {/* URL bar */}
      <rect x="70" y="8" width="200" height="12" rx="6" fill="rgba(255,255,255,0.5)" />

      {/* Skeleton content */}
      <rect x="20" y="48" width="200" height="16" rx="3" fill="rgba(0,0,0,0.1)" />
      <rect x="20" y="72" width="140" height="10" rx="3" fill="rgba(0,0,0,0.07)" />
      <rect x="20" y="90" width="160" height="10" rx="3" fill="rgba(0,0,0,0.07)" />

      {/* Skeleton image block */}
      <rect x="20" y="114" width="360" height={Math.max(60, h - 150)} rx="4" fill="rgba(0,0,0,0.08)" />
    </svg>
  );
}
