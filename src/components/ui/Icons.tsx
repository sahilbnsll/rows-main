import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 16, children, ...rest }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  );
}

const stroke = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowRight = (p: P) => (
  <Svg {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" {...stroke} />
  </Svg>
);
export const ArrowLeft = (p: P) => (
  <Svg {...p}>
    <path d="M13 8H3M7 4 3 8l4 4" {...stroke} />
  </Svg>
);
export const ArrowUpRight = (p: P) => (
  <Svg {...p}>
    <path d="M5 11 11 5M6 5h5v5" {...stroke} />
  </Svg>
);
export const ChevronLeft = (p: P) => (
  <Svg {...p}>
    <path d="M10 3 5 8l5 5" {...stroke} />
  </Svg>
);
export const ChevronRight = (p: P) => (
  <Svg {...p}>
    <path d="m6 3 5 5-5 5" {...stroke} />
  </Svg>
);
export const Close = (p: P) => (
  <Svg {...p} viewBox="0 0 18 18">
    <path d="M3 3l12 12M15 3 3 15" {...stroke} strokeWidth={1.8} />
  </Svg>
);
export const Menu = (p: P) => (
  <Svg {...p} viewBox="0 0 20 20">
    <path d="M3 7h14M3 13h14" {...stroke} strokeWidth={1.7} />
  </Svg>
);
export const Play = (p: P) => (
  <Svg {...p}>
    <path d="M5 3.2v9.6a.4.4 0 0 0 .6.35l7.6-4.8a.4.4 0 0 0 0-.7L5.6 2.85a.4.4 0 0 0-.6.35Z" fill="currentColor" />
  </Svg>
);
export const Pause = (p: P) => (
  <Svg {...p}>
    <path d="M5 3v10M11 3v10" {...stroke} strokeWidth={2} />
  </Svg>
);
export const Calendar = (p: P) => (
  <Svg {...p} viewBox="0 0 24 24">
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Svg>
);
export const Pin = (p: P) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
  </Svg>
);
export const Phone = (p: P) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </Svg>
);
export const Mail = (p: P) => (
  <Svg {...p} viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
export const Download = (p: P) => (
  <Svg {...p}>
    <path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13h10" {...stroke} />
  </Svg>
);
export const Check = (p: P) => (
  <Svg {...p}>
    <path d="m3 8.5 3.2 3L13 4.5" {...stroke} strokeWidth={1.9} />
  </Svg>
);
export const Plus = (p: P) => (
  <Svg {...p}>
    <path d="M8 3v10M3 8h10" {...stroke} />
  </Svg>
);

/** Brand glyphs are drawn here because the icon library no longer ships them. */
export const Facebook = (p: P) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8Z" fill="currentColor" />
  </Svg>
);
export const XSocial = (p: P) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="M17.7 3h3.1l-6.8 7.7L22 21h-6.3l-4.9-6.4L5.2 21H2l7.3-8.3L1.9 3h6.4l4.4 5.9L17.7 3Zm-1.1 16.2h1.7L7.5 4.7H5.7l10.9 14.5Z" fill="currentColor" />
  </Svg>
);
export const LinkedIn = (p: P) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="M4.5 9h3.8v11H4.5V9Zm1.9-5.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM10.5 9h3.6v1.5c.6-1 1.8-1.8 3.6-1.8 3.5 0 4.3 2.2 4.3 5.2V20h-3.8v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20h-3.8V9Z" fill="currentColor" />
  </Svg>
);
export const YouTube = (p: P) => (
  <Svg {...p} viewBox="0 0 24 24">
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.6" />
    <path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" />
  </Svg>
);
