import { topics, validate } from "@/lib/contact";

/**
 * Contact form delivery. The old site posted to PHP scripts (formindex.php, contactform.php, donateform.php) on its own
 * host; this replaces them with one endpoint that emails the Society through Resend.
 *
 * It never pretends: if the email service is not configured (RESEND_API_KEY, CONTACT_FROM_EMAIL) it answers 503
 * "not_configured" and the form tells the visitor to email directly. Nothing is stored. Secrets stay on the server.
 */

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/** Best-effort rate limit per address; each server instance keeps its own count. */
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  // Browser posts from other sites are refused.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ error: "forbidden" }, 403);

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return json({ error: "rate_limited" }, 429);

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 20_000) return json({ error: "too_large" }, 413);
    body = JSON.parse(text);
  } catch {
    return json({ error: "invalid" }, 400);
  }

  // A hidden field that people never see: if it is filled in, a bot did it. Answer as if it worked.
  if (body && typeof body === "object" && typeof (body as Record<string, unknown>).website === "string" && (body as Record<string, string>).website.length > 0) {
    return json({ ok: true }, 200);
  }

  const result = validate(body);
  if (!result.ok) return json({ error: "validation", fields: result.errors }, 422);

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "raysofwisdom@gmail.com";
  if (!key || !from) return json({ error: "not_configured" }, 503);

  const { name, email, topic, message } = result.value;
  const topicLabel = topics.find((t) => t.value === topic)?.label ?? "General enquiry";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry: ${topicLabel}`,
        text: `From: ${name} <${email}>\nTopic: ${topicLabel}\n\n${message}\n`,
        html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;<br>Topic: ${escapeHtml(topicLabel)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return json({ error: "send_failed" }, 502);
    return json({ ok: true }, 200);
  } catch {
    return json({ error: "send_failed" }, 502);
  }
}

export function GET() {
  return json({ error: "method_not_allowed" }, 405);
}
