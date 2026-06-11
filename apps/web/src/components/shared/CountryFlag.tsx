import type { CountrySlug } from "@/lib/country";

function ArgentinaFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 24"
      className={className}
      role="img"
      aria-label="Bandera de Argentina"
    >
      <rect width="36" height="24" fill="#74ACDF" />
      <rect y="8" width="36" height="8" fill="#FFFFFF" />
      <g transform="translate(18 12)">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2="0"
            y2="-3.2"
            stroke="#F6B40E"
            strokeWidth="0.7"
            transform={`rotate(${i * 30})`}
          />
        ))}
        <circle r="2" fill="#F6B40E" />
        <circle r="2" fill="none" stroke="#85340A" strokeWidth="0.25" />
      </g>
    </svg>
  );
}

const STAR_PATH =
  "M0,-1 L0.225,-0.309 L0.951,-0.309 L0.363,0.118 L0.588,0.809 L0,0.382 L-0.588,0.809 L-0.363,0.118 L-0.951,-0.309 L-0.225,-0.309 Z";

function VenezuelaFlag({ className }: { className?: string }) {
  // 8 stars in an arc over the blue stripe
  const stars = Array.from({ length: 8 }).map((_, i) => {
    const angle = Math.PI * (1 + (i + 1) / 9); // arc from left to right
    const cx = 18 + 6.5 * Math.cos(angle);
    const cy = 16.5 + 6.5 * Math.sin(angle);
    return { cx, cy };
  });

  return (
    <svg
      viewBox="0 0 36 24"
      className={className}
      role="img"
      aria-label="Bandera de Venezuela"
    >
      <rect width="36" height="24" fill="#FFCC00" />
      <rect y="8" width="36" height="8" fill="#00247D" />
      <rect y="16" width="36" height="8" fill="#CF142B" />
      {stars.map((s, i) => (
        <path
          key={i}
          d={STAR_PATH}
          fill="#FFFFFF"
          transform={`translate(${s.cx} ${s.cy}) scale(1.05)`}
        />
      ))}
    </svg>
  );
}

export function CountryFlag({
  country,
  className,
}: {
  country: CountrySlug;
  className?: string;
}) {
  if (country === "venezuela") return <VenezuelaFlag className={className} />;
  return <ArgentinaFlag className={className} />;
}
