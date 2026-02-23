import { type SVGProps } from "react";

const MiraBrainIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Neural network lines */}
    <line x1="5" y1="6" x2="9" y2="9" />
    <line x1="5" y1="12" x2="9" y2="9" />
    <line x1="5" y1="12" x2="9" y2="15" />
    <line x1="5" y1="18" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="7" />
    <line x1="9" y1="9" x2="15" y2="12" />
    <line x1="9" y1="15" x2="15" y2="12" />
    <line x1="9" y1="15" x2="15" y2="17" />
    <line x1="15" y1="7" x2="19" y2="9" />
    <line x1="15" y1="12" x2="19" y2="9" />
    <line x1="15" y1="12" x2="19" y2="15" />
    <line x1="15" y1="17" x2="19" y2="15" />
    {/* Brain silhouette curve (side view) */}
    <path d="M3 12c0-5 3.5-9 8-9 3 0 5.5 1.5 7 4 1.2 2 1.5 4.5.5 7-.8 2-2.5 3.5-4.5 4.5-1.5.7-3 1-4.5 1.5" strokeOpacity={0.25} />
    {/* Nodes */}
    <circle cx="5" cy="6" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="5" cy="18" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="9" cy="15" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="7" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="17" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="9" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="19" cy="15" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export default MiraBrainIcon;
