import { useId } from "react";

/**
 * The society's seal: the tree-and-sun logo inside a ring of lettering, drawn as live SVG so the text follows the
 * ring and stays sharp (the pattern of the festival page's seal). Used where something is being vouched for.
 */
export function Seal({
  className = "",
  top = "Rays of Wisdom Society",
  bottom = "New Delhi · Regd. 54348/80 G",
  label = "Seal of Rays of Wisdom Society",
}: {
  className?: string;
  top?: string;
  bottom?: string;
  label?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={`block h-auto ${className}`} viewBox="0 0 200 200" role="img" aria-label={label}>
      <defs>
        <path id={`${id}-top`} d="M 24 100 A 76 76 0 0 1 176 100" />
        <path id={`${id}-bottom`} d="M 16 100 A 84 84 0 0 0 184 100" />
      </defs>
      <g fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="95" strokeWidth="2.2" />
        <circle cx="100" cy="100" r="90" strokeWidth="0.8" opacity="0.6" />
        <circle cx="100" cy="100" r="68" strokeWidth="1.4" />
      </g>
      <g fill="currentColor" style={{ fontFamily: "var(--font-sans)", fontWeight: 700 }}>
        <text fontSize="9.4" letterSpacing="1">
          <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
            {top.toUpperCase()}
          </textPath>
        </text>
        <text fontSize="9.4" letterSpacing="1">
          <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
            {bottom.toUpperCase()}
          </textPath>
        </text>
        <circle cx="20" cy="100" r="2.2" />
        <circle cx="180" cy="100" r="2.2" />
      </g>
      <image href="/images/brand/rays-mark.png" x="42" y="50" width="116" height="100" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}
