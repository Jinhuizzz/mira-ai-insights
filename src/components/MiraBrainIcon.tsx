import { type SVGProps } from "react";

const MiraBrainIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    {/* Connections */}
    <g stroke="currentColor" strokeWidth={0.9}>
      {/* Upper brain dome */}
      <line x1="7" y1="8" x2="12" y2="4" />
      <line x1="12" y1="4" x2="17" y2="6" />
      <line x1="17" y1="6" x2="19" y2="10" />
      {/* Left curve */}
      <line x1="7" y1="8" x2="5" y2="12" />
      <line x1="5" y1="12" x2="7" y2="16" />
      {/* Right curve */}
      <line x1="19" y1="10" x2="18" y2="14" />
      <line x1="18" y1="14" x2="15" y2="17" />
      {/* Bottom */}
      <line x1="7" y1="16" x2="10" y2="17" />
      <line x1="10" y1="17" x2="11" y2="20" />
      <line x1="15" y1="17" x2="10" y2="17" />
      {/* Internal triangulation */}
      <line x1="7" y1="8" x2="12" y2="9" />
      <line x1="12" y1="4" x2="12" y2="9" />
      <line x1="17" y1="6" x2="12" y2="9" />
      <line x1="12" y1="9" x2="17" y2="10" />
      <line x1="17" y1="6" x2="17" y2="10" />
      <line x1="19" y1="10" x2="17" y2="10" />
      <line x1="7" y1="8" x2="8" y2="12" />
      <line x1="5" y1="12" x2="8" y2="12" />
      <line x1="12" y1="9" x2="8" y2="12" />
      <line x1="12" y1="9" x2="14" y2="13" />
      <line x1="17" y1="10" x2="14" y2="13" />
      <line x1="18" y1="14" x2="14" y2="13" />
      <line x1="8" y1="12" x2="14" y2="13" />
      <line x1="8" y1="12" x2="7" y2="16" />
      <line x1="8" y1="12" x2="10" y2="17" />
      <line x1="14" y1="13" x2="10" y2="17" />
      <line x1="14" y1="13" x2="15" y2="17" />
    </g>
    {/* Nodes */}
    <g fill="currentColor">
      <circle cx="12" cy="4" r="1.4" />
      <circle cx="7" cy="8" r="1.4" />
      <circle cx="17" cy="6" r="1.4" />
      <circle cx="19" cy="10" r="1.3" />
      <circle cx="5" cy="12" r="1.3" />
      <circle cx="12" cy="9" r="1.5" />
      <circle cx="17" cy="10" r="1.3" />
      <circle cx="8" cy="12" r="1.4" />
      <circle cx="14" cy="13" r="1.5" />
      <circle cx="18" cy="14" r="1.3" />
      <circle cx="7" cy="16" r="1.3" />
      <circle cx="10" cy="17" r="1.4" />
      <circle cx="15" cy="17" r="1.3" />
      <circle cx="11" cy="20" r="1.1" />
    </g>
  </svg>
);

export default MiraBrainIcon;
