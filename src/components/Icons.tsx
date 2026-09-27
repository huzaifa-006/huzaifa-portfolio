import type { SVGProps } from "react";
import type { SocialIcon } from "@/data/socialLinks";

/**
 * Small inline icon set (no icon library needed).
 * Stroke icons use currentColor, so they inherit text colour.
 */
type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 18): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
});

export const ArrowRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
export const ArrowUp = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
);
export const ArrowUpRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Download = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
);
export const Mail = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>
);
export const MapPin = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const Menu = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Check = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const ShieldCheck = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 3 5 6v5.5c0 4.3 3 8 7 9.5 4-1.5 7-5.2 7-9.5V6l-7-3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></svg>
);
export const FileText = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>
);
export const Sparkle = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
);

export const Sun = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></svg>
);
export const Moon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
);
export const Copy = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><rect x="9" y="9" width="11" height="11" rx="2.5" /><path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9" /></svg>
);
export const ExternalLink = ArrowUpRight;

/* Domain icons (services, skills, pipeline steps) */
export const IconClean = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M4 5h16l-6 7.5V19l-4 1.5v-8L4 5Z" /></svg>
);
export const IconChart = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M4 20V4M4 20h16" /><path d="M8 16v-4M12 16V8M16 16v-6" /></svg>
);
export const IconExplore = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2M8 12.5l2-2.5 2 1.5 2-3" /></svg>
);
export const IconDatabase = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg>
);
export const IconFeatures = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>
);
export const IconModel = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="5" cy="7" r="2" /><circle cx="5" cy="17" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="7" r="2" /><circle cx="19" cy="17" r="2" /><path d="M7 7.8 10.2 11M7 16.2l3.2-3.2M13.8 11 17 7.8M13.8 13l3.2 3.2" /></svg>
);
export const IconBrain = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M9.5 4A2.5 2.5 0 0 0 7 6.5v.2A3 3 0 0 0 4.5 12 3 3 0 0 0 7 17.3v.2A2.5 2.5 0 0 0 12 18V6.5A2.5 2.5 0 0 0 9.5 4Z" /><path d="M14.5 4A2.5 2.5 0 0 1 17 6.5v.2a3 3 0 0 1 2.5 5.3 3 3 0 0 1-2.5 5.3v.2A2.5 2.5 0 0 1 12 18" /></svg>
);
export const IconText = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5 6h14M5 10h14M5 14h9M5 18h6" /></svg>
);
export const IconToken = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M8 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2M16 5h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" /><path d="M9 12h.01M12 12h.01M15 12h.01" strokeWidth="2.6" /></svg>
);
export const IconOutput = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5l-1.9-4.6L5.5 9l4.6-1.4L12 3Z" /><path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15Z" /></svg>
);
export const IconServer = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><rect x="4" y="4" width="16" height="7" rx="2" /><rect x="4" y="13" width="16" height="7" rx="2" /><path d="M8 7.5h.01M8 16.5h.01" strokeWidth="2.6" /></svg>
);
export const IconContainer = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></svg>
);
export const IconApp = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M9 9v11" /></svg>
);
export const IconGlobe = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.6 3.7 5.4 3.7 8.5s-1.2 5.9-3.7 8.5c-2.5-2.6-3.7-5.4-3.7-8.5s1.2-5.9 3.7-8.5Z" /></svg>
);
export const IconCode = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>
);
export const IconCloud = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5H7Z" /></svg>
);

/* Brand marks (filled). Simplified, monochrome. */
export const GitHubIcon = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden focusable={false} {...p}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);
export const LinkedInIcon = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.6h.06c.53-.95 1.84-1.95 3.78-1.95 4.04 0 4.78 2.5 4.78 5.76v5.59h-4v-4.96c0-1.18-.02-2.7-1.73-2.7-1.73 0-2 1.28-2 2.61v5.05h-4v-11Z" />
  </svg>
);
/** Generic monogram badges for Upwork / Fiverr (not the official logos). */
const Monogram = ({ size = 18, text, ...p }: P & { text: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable={false} {...p}>
    <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <text x="12" y="16.2" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor" fontFamily="ui-sans-serif, system-ui, sans-serif">
      {text}
    </text>
  </svg>
);
export const UpworkIcon = (p: P) => <Monogram text="Up" {...p} />;
export const FiverrIcon = (p: P) => <Monogram text="fi" {...p} />;

export const SocialGlyph = ({ icon, size = 18 }: { icon: SocialIcon; size?: number }) => {
  switch (icon) {
    case "github":
      return <GitHubIcon size={size} />;
    case "linkedin":
      return <LinkedInIcon size={size} />;
    case "upwork":
      return <UpworkIcon size={size} />;
    case "fiverr":
      return <FiverrIcon size={size} />;
    default:
      return <Mail size={size} />;
  }
};
