"use client";

import Link from "next/link";
import { useEffect } from "react";

/** Shown if a page fails while rendering. Visitors see no technical detail. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Logged for the host's monitoring; never shown on the page.
    console.error(error);
  }, [error]);
  return (
    <section className="section">
      <div className="wrap-narrow text-center">
        <h1 className="page-title !text-[clamp(2rem,1.5rem+2vw,3rem)]">Something went wrong</h1>
        <p className="reading mx-auto mt-4">We could not show this page just now. Please try again, or go back to the home page.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-secondary">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
