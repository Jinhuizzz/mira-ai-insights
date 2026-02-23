import { type SVGProps } from "react";

const MiraBrainIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    {/* Lines connecting all nodes */}
    <g stroke="currentColor" strokeWidth={0.8}>
      {/* Outer edges */}
      <line x1="8" y1="4" x2="11.5" y2="3" />
      <line x1="11.5" y1="3" x2="15" y2="3.5" />
      <line x1="15" y1="3.5" x2="17.5" y2="5" />
      <line x1="17.5" y1="5" x2="19.5" y2="7.5" />
      <line x1="19.5" y1="7.5" x2="20" y2="10.5" />
      <line x1="20" y1="10.5" x2="19" y2="13.5" />
      <line x1="19" y1="13.5" x2="17" y2="16" />
      <line x1="17" y1="16" x2="14.5" y2="17.5" />
      <line x1="14.5" y1="17.5" x2="12" y2="18.5" />
      <line x1="12" y1="18.5" x2="10" y2="20" />
      <line x1="10" y1="20" x2="9.5" y2="21.5" />
      <line x1="8" y1="4" x2="5.5" y2="5.5" />
      <line x1="5.5" y1="5.5" x2="4" y2="8" />
      <line x1="4" y1="8" x2="4" y2="11" />
      <line x1="4" y1="11" x2="5" y2="13.5" />
      <line x1="5" y1="13.5" x2="7" y2="15.5" />
      <line x1="7" y1="15.5" x2="9" y2="17" />
      <line x1="9" y1="17" x2="10" y2="20" />
      {/* Internal cross-connections */}
      <line x1="8" y1="4" x2="10" y2="7" />
      <line x1="11.5" y1="3" x2="10" y2="7" />
      <line x1="11.5" y1="3" x2="13.5" y2="7" />
      <line x1="15" y1="3.5" x2="13.5" y2="7" />
      <line x1="17.5" y1="5" x2="16" y2="8" />
      <line x1="15" y1="3.5" x2="16" y2="8" />
      <line x1="10" y1="7" x2="13.5" y2="7" />
      <line x1="13.5" y1="7" x2="16" y2="8" />
      <line x1="5.5" y1="5.5" x2="7.5" y2="9" />
      <line x1="4" y1="8" x2="7.5" y2="9" />
      <line x1="8" y1="4" x2="7.5" y2="9" />
      <line x1="10" y1="7" x2="7.5" y2="9" />
      <line x1="7.5" y1="9" x2="10" y2="11" />
      <line x1="10" y1="7" x2="10" y2="11" />
      <line x1="19.5" y1="7.5" x2="16" y2="8" />
      <line x1="16" y1="8" x2="14" y2="11" />
      <line x1="20" y1="10.5" x2="17" y2="12" />
      <line x1="16" y1="8" x2="17" y2="12" />
      <line x1="19" y1="13.5" x2="17" y2="12" />
      <line x1="14" y1="11" x2="17" y2="12" />
      <line x1="10" y1="11" x2="14" y2="11" />
      <line x1="13.5" y1="7" x2="14" y2="11" />
      <line x1="4" y1="11" x2="7" y2="12" />
      <line x1="7.5" y1="9" x2="7" y2="12" />
      <line x1="10" y1="11" x2="7" y2="12" />
      <line x1="5" y1="13.5" x2="7" y2="12" />
      <line x1="7" y1="12" x2="9" y2="14.5" />
      <line x1="10" y1="11" x2="9" y2="14.5" />
      <line x1="14" y1="11" x2="13" y2="14.5" />
      <line x1="9" y1="14.5" x2="13" y2="14.5" />
      <line x1="17" y1="12" x2="16" y2="15" />
      <line x1="13" y1="14.5" x2="16" y2="15" />
      <line x1="17" y1="16" x2="16" y2="15" />
      <line x1="19" y1="13.5" x2="16" y2="15" />
      <line x1="5" y1="13.5" x2="9" y2="14.5" />
      <line x1="7" y1="15.5" x2="9" y2="14.5" />
      <line x1="7" y1="15.5" x2="9" y2="17" />
      <line x1="9" y1="14.5" x2="9" y2="17" />
      <line x1="13" y1="14.5" x2="12" y2="18.5" />
      <line x1="16" y1="15" x2="14.5" y2="17.5" />
      <line x1="9" y1="17" x2="12" y2="18.5" />
    </g>
    {/* Nodes */}
    <g fill="currentColor">
      <circle cx="8" cy="4" r="1.1" />
      <circle cx="11.5" cy="3" r="1.1" />
      <circle cx="15" cy="3.5" r="1.1" />
      <circle cx="17.5" cy="5" r="1.1" />
      <circle cx="19.5" cy="7.5" r="1" />
      <circle cx="20" cy="10.5" r="1" />
      <circle cx="19" cy="13.5" r="1" />
      <circle cx="17" cy="16" r="1.1" />
      <circle cx="14.5" cy="17.5" r="1" />
      <circle cx="12" cy="18.5" r="1" />
      <circle cx="10" cy="20" r="0.9" />
      <circle cx="9.5" cy="21.5" r="0.8" />
      <circle cx="5.5" cy="5.5" r="1.1" />
      <circle cx="4" cy="8" r="1" />
      <circle cx="4" cy="11" r="1" />
      <circle cx="5" cy="13.5" r="1.1" />
      <circle cx="7" cy="15.5" r="1" />
      <circle cx="9" cy="17" r="1" />
      <circle cx="10" cy="7" r="1.2" />
      <circle cx="13.5" cy="7" r="1.2" />
      <circle cx="16" cy="8" r="1.1" />
      <circle cx="7.5" cy="9" r="1.1" />
      <circle cx="10" cy="11" r="1.2" />
      <circle cx="14" cy="11" r="1.2" />
      <circle cx="7" cy="12" r="1.1" />
      <circle cx="17" cy="12" r="1.1" />
      <circle cx="9" cy="14.5" r="1.2" />
      <circle cx="13" cy="14.5" r="1.2" />
      <circle cx="16" cy="15" r="1.1" />
    </g>
  </svg>
);

export default MiraBrainIcon;
