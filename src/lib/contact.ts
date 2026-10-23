/** Shared by the contact form (browser) and /api/contact (server), so both validate the same way. */

export const topics = [
  { value: "general", label: "General enquiry" },
  { value: "volunteer", label: "Volunteering" },
  { value: "work", label: "Taking part in the festival or an art event" },
  { value: "learn", label: "Yoga workshops or learning Odissi" },
  { value: "chapter", label: "Starting an IAAF in my city" },
  { value: "invite", label: "Inviting the Society to perform" },
  { value: "donate", label: "Donating" },
] as const;

export type Topic = (typeof topics)[number]["value"];

export interface ContactInput {
  name: string;
  email: string;
  topic: Topic;
  message: string;
}

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export const limits = { name: 120, email: 200, message: 4000 };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(raw: unknown): { ok: true; value: ContactInput } | { ok: false; errors: FieldErrors } {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (k: string) => (typeof o[k] === "string" ? (o[k] as string).trim() : "");
  const value = { name: str("name"), email: str("email"), topic: str("topic") as Topic, message: str("message") };
  const errors: FieldErrors = {};
  if (!value.name) errors.name = "Please tell us your name.";
  else if (value.name.length > limits.name) errors.name = `Please keep your name under ${limits.name} characters.`;
  if (!value.email) errors.email = "Please enter your email address so we can reply.";
  else if (value.email.length > limits.email || !emailPattern.test(value.email)) errors.email = "That email address does not look right. Please check it.";
  if (!topics.some((t) => t.value === value.topic)) value.topic = "general";
  if (!value.message) errors.message = "Please write a message.";
  else if (value.message.length > limits.message) errors.message = `Please keep your message under ${limits.message} characters.`;
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}
