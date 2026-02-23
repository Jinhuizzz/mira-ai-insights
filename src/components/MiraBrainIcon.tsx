import { type SVGProps } from "react";

const MiraBrainIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    {/* Lines connecting nodes - forming brain silhouette */}
    <g stroke="currentColor" strokeWidth={0.7} opacity={0.7}>
      {/* Top brain curve */}
      <line x1="8" y1="4" x2="11" y2="3" />
      <line x1="11" y1="3" x2="14.5" y2="3.5" />
      <line x1="14.5" y1="3.5" x2="17" y2="5" />
      <line x1="17" y1="5" x2="19" y2="7.5" />
      {/* Right side */}
      <line x1="19" y1="7.5" x2="19.5" y2="10" />
      <line x1="19.5" y1="10" x2="19" y2="13" />
      <line x1="19" y1="13" x2="17.5" y2="15.5" />
      <line x1="17.5" y1="15.5" x2="15" y2="17" />
      {/* Bottom */}
      <line x1="15" y1="17" x2="12" y2="18" />
      <line x1="12" y1="18" x2="10" y2="19.5" />
      <line x1="10" y1="19.5" x2="9" y2="21" />
      {/* Left side */}
      <line x1="8" y1="4" x2="5.5" y2="5.5" />
      <line x1="5.5" y1="5.5" x2="4.5" y2="8" />
      <line x1="4.5" y1="8" x2="4.5" y2="10.5" />
      <line x1="4.5" y1="10.5" x2="5" y2="13" />
      <line x1="5" y1="13" x2="6.5" y2="15" />
      <line x1="6.5" y1="15" x2="8.5" y2="16.5" />
      <line x1="8.5" y1="16.5" x2="10" y2="19.5" />
      {/* Internal structure lines */}
      <line x1="8" y1="4" x2="10" y2="7" />
      <line x1="11" y1="3" x2="10" y2="7" />
      <line x1="14.5" y1="3.5" x2="13" y2="7" />
      <line x1="17" y1="5" x2="13" y2="7" />
      <line x1="10" y1="7" x2="13" y2="7" />
      <line x1="5.5" y1="5.5" x2="7.5" y2="8.5" />
      <line x1="10" y1="7" x2="7.5" y2="8.5" />
      <line x1="4.5" y1="8" x2="7.5" y2="8.5" />
      <line x1="7.5" y1="8.5" x2="10" y2="10.5" />
      <line x1="13" y1="7" x2="16" y2="9" />
      <line x1="19" y1="7.5" x2="16" y2="9" />
      <line x1="16" y1="9" x2="13.5" y2="11" />
      <line x1="10" y1="10.5" x2="13.5" y2="11" />
      <line x1="19.5" y1="10" x2="16" y2="9" />
      <line x1="4.5" y1="10.5" x2="7" y2="11.5" />
      <line x1="7.5" y1="8.5" x2="7" y2="11.5" />
      <line x1="7" y1="11.5" x2="10" y2="10.5" />
      <line x1="5" y1="13" x2="7" y2="11.5" />
      <line x1="7" y1="11.5" x2="9" y2="14" />
      <line x1="10" y1="10.5" x2="9" y2="14" />
      <line x1="13.5" y1="11" x2="12.5" y2="14" />
      <line x1="13.5" y1="11" x2="16.5" y2="12.5" />
      <line x1="19" y1="13" x2="16.5" y2="12.5" />
      <line x1="16.5" y1="12.5" x2="15.5" y2="15" />
      <line x1="12.5" y1="14" x2="15.5" y2="15" />
      <line x1="9" y1="14" x2="12.5" y2="14" />
      <line x1="6.5" y1="15" x2="9" y2="14" />
      <line x1="9" y1="14" x2="8.5" y2="16.5" />
      <line x1="12.5" y1="14" x2="12" y2="18" />
      <line x1="15.5" y1="15" x2="15" y2="17" />
      <line x1="17.5" y1="15.5" x2="15.5" y2="15" />
      <line x1="8.5" y1="16.5" x2="12" y2="18" />
    </g>
    {/* Nodes - glowing dots */}
    <g fill="currentColor">
      {/* Outer brain shape nodes */}
      <circle cx="8" cy="4" r="1" />
      <circle cx="11" cy="3" r="1" />
      <circle cx="14.5" cy="3.5" r="1" />
      <circle cx="17" cy="5" r="1.1" />
      <circle cx="19" cy="7.5" r="1" />
      <circle cx="19.5" cy="10" r="0.9" />
      <circle cx="19" cy="13" r="1" />
      <circle cx="17.5" cy="15.5" r="1" />
      <circle cx="15" cy="17" r="1" />
      <circle cx="12" cy="18" r="1" />
      <circle cx="10" cy="19.5" r="0.9" />
      <circle cx="9" cy="21" r="0.8" />
      <circle cx="5.5" cy="5.5" r="1" />
      <circle cx="4.5" cy="8" r="1" />
      <circle cx="4.5" cy="10.5" r="0.9" />
      <circle cx="5" cy="13" r="1" />
      <circle cx="6.5" cy="15" r="1" />
      <circle cx="8.5" cy="16.5" r="1" />
      {/* Internal nodes */}
      <circle cx="10" cy="7" r="1.1" />
      <circle cx="13" cy="7" r="1.1" />
      <circle cx="7.5" cy="8.5" r="1" />
      <circle cx="16" cy="9" r="1.1" />
      <circle cx="10" cy="10.5" r="1.1" />
      <circle cx="7" cy="11.5" r="1" />
      <circle cx="13.5" cy="11" r="1.1" />
      <circle cx="16.5" cy="12.5" r="1" />
      <circle cx="9" cy="14" r="1.1" />
      <circle cx="12.5" cy="14" r="1.1" />
      <circle cx="15.5" cy="15" r="1" />
    </g>
  </svg>
);

export default MiraBrainIcon;
