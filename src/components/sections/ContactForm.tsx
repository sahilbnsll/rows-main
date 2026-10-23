"use client";

import { useRef, useState } from "react";
import { limits, topics, validate, type FieldErrors, type Topic } from "@/lib/contact";
import { org } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "not_configured" | "error";

const fieldClass =
  "mt-1.5 block w-full rounded-xl bg-surface px-4 py-3 text-base text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] transition-shadow placeholder:text-ink-muted/70 focus:shadow-[inset_0_0_0_2px_var(--olive)] focus:outline-none aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--maroon)]";

/**
 * The contact form. It validates on the page, posts to /api/contact and reports exactly what happened: sent, not yet
 * connected to email (with the address to write to instead), or failed (with the same fallback). It never shows a
 * success message unless the server confirmed the message was handed to the email service.
 */
export function ContactForm({ defaultTopic = "general" }: { defaultTopic?: Topic }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  // Built at submit time, so a failed send can offer the visitor their own text in a ready-made email.
  const [mailto, setMailto] = useState(`mailto:${org.email}`);
  const form = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const check = validate(data);
    if (!check.ok) {
      setErrors(check.errors);
      setStatus("idle");
      const first = (Object.keys(check.errors)[0] ?? "name") as string;
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setMailto(`mailto:${org.email}?subject=${encodeURIComponent(`Website enquiry from ${check.value.name}`)}&body=${encodeURIComponent(check.value.message)}`);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        setStatus("sent");
        form.current?.reset();
      } else if (res.status === 503) {
        setStatus("not_configured");
      } else if (res.status === 422) {
        const body = (await res.json().catch(() => ({}))) as { fields?: FieldErrors };
        setErrors(body.fields ?? {});
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const err = (k: keyof FieldErrors) => (errors[k] ? `${k}-error` : undefined);

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="form-note">
      <div>
        <label htmlFor="name" className="text-sm font-semibold">
          Your name <span className="font-normal text-ink-muted">(required)</span>
        </label>
        <input id="name" name="name" type="text" autoComplete="name" maxLength={limits.name + 20} required aria-required="true" aria-invalid={!!errors.name} aria-describedby={err("name")} className={fieldClass} />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-sm font-medium text-maroon">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-semibold">
          Email address <span className="font-normal text-ink-muted">(required)</span>
        </label>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required aria-required="true" aria-invalid={!!errors.email} aria-describedby={err("email")} className={fieldClass} />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm font-medium text-maroon">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="topic" className="text-sm font-semibold">
          What is this about?
        </label>
        <select id="topic" name="topic" defaultValue={defaultTopic} className={fieldClass}>
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold">
          Message <span className="font-normal text-ink-muted">(required)</span>
        </label>
        <textarea id="message" name="message" rows={6} required aria-required="true" aria-invalid={!!errors.message} aria-describedby={err("message")} className={`${fieldClass} resize-y`} />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm font-medium text-maroon">
            {errors.message}
          </p>
        )}
      </div>
      {/* Bots fill every field; people never see this one. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p id="form-note" className="meta max-w-[22rem]">
          We use what you write only to reply to you.
        </p>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {status === "sent" && (
          <p className="rounded-xl bg-sage px-4 py-3 text-[0.98rem] font-medium text-ink">Thank you. Your message has been sent to the Society. We will reply to the email address you gave.</p>
        )}
        {status === "not_configured" && (
          <p className="rounded-xl bg-rose/60 px-4 py-3 text-[0.98rem] text-ink">
            This form is not connected to email yet, so your message has <strong>not</strong> been sent. Please write to us at{" "}
            <a className="prose-link font-semibold" href={mailto}>
              {org.email}
            </a>{" "}
            instead.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-xl bg-rose/60 px-4 py-3 text-[0.98rem] text-ink">
            Sorry, your message could not be sent just now, and has <strong>not</strong> been delivered. Please try again in a few minutes, or write to us at{" "}
            <a className="prose-link font-semibold" href={mailto}>
              {org.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
