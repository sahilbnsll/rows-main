"use client";

import { useState } from "react";
import { Check } from "./Icons";

/** A labelled value with a button that copies it, and says so. Falls back silently if the clipboard is unavailable. */
export function CopyField({ label, value }: { label: string; value: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.setTimeout(() => setDone(false), 2000);
    } catch {
      /* the value is visible and can be selected by hand */
    }
  };
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 py-3 sm:grid-cols-[11rem_1fr_auto]">
      <dt className="col-span-2 text-sm text-ink-muted sm:col-span-1">{label}</dt>
      <dd className="font-semibold tabular-nums tracking-wide">{value}</dd>
      <dd>
        <button type="button" onClick={copy} className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-maroon-deep transition-colors hover:bg-maroon/8">
          {done ? <Check size={14} /> : null}
          {done ? "Copied" : "Copy"}
          <span className="sr-only"> {label}</span>
        </button>
        <span className="sr-only" role="status" aria-live="polite">
          {done ? `${label} copied` : ""}
        </span>
      </dd>
    </div>
  );
}
