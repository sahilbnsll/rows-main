import Link from "next/link";
import { org } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, Phone, Pin } from "@/components/ui/Icons";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact and volunteering",
  description: "Contact Rays of Wisdom Society, Nehru Place, New Delhi: volunteer, take part in the festival, learn yoga or Odissi, or invite the Society to perform.",
  path: "/contact",
});

const ways = [
  {
    id: "volunteer",
    title: "Volunteer",
    body: (
      <>
        We actively seek volunteers who can help with our project work, organize events, help raise funds and support campaigns. For any voluntary support, Rays of Wisdom would cover expenses and offer appropriate remuneration. Please write to us with your CV.
      </>
    ),
  },
  {
    id: "work",
    title: "Work with us",
    body: <>To participate in our festival and art events, write to us.</>,
  },
  {
    id: "learn",
    title: "Learn",
    body: (
      <>
        To take part in our{" "}
        <Link href="/yoga" className="prose-link">
          yoga workshops
        </Link>{" "}
        or learn Odissi at the Academy, write to us.
      </>
    ),
  },
  {
    id: "chapter",
    title: "Start an IAAF in your city",
    body: (
      <>
        As the first international event of its kind in New Delhi, the{" "}
        <Link href="/festival" className="prose-link">
          International Ancient Arts Festival
        </Link>{" "}
        has had respected scholars and experts from reputed universities, from fields as diverse as music, dance, poetry, theatre, education and sociology, present their research on the effect of various arts on the human body. Renowned performers from cultures across the world take part. To start a chapter in your city, write to us.
      </>
    ),
  },
  {
    id: "invite",
    title: "Invite us",
    body: (
      <>
        We work with a wide range of international classical and folk artistes on thematic subjects, with variations of duration and number of dancers available for different budgets. To invite us to perform at your event, write to us.
      </>
    ),
  },
  {
    id: "donate",
    title: "Donate",
    body: (
      <>
        Bank details, patron benefits and 80G documents are on the{" "}
        <Link href="/support" className="prose-link">
          Support page
        </Link>
        .
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Get in touch"
        lead="Whether you want to volunteer, learn, take part, or bring the Society to your stage, we would be glad to hear from you."
      />

      <section aria-labelledby="reach-title" className="section-tight">
        <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 id="reach-title" className="sub-title">
                Reach us directly
              </h2>
              <ul className="mt-6 space-y-5 text-[1.05rem]">
                <li className="flex items-start gap-3">
                  <Pin size={22} className="mt-1 shrink-0 text-maroon" />
                  <address className="not-italic">
                    {org.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    <a href={org.address.mapUrl} target="_blank" rel="noopener noreferrer" className="prose-link text-sm">
                      Directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
                    </a>
                  </address>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={22} className="mt-1 shrink-0 text-maroon" />
                  <span>
                    <a className="prose-link" href={`tel:${org.phones.office.tel}`}>
                      {org.phones.office.display}
                    </a>
                    <span className="meta block">Open {org.hours}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={22} className="mt-1 shrink-0 text-maroon" />
                  <a className="prose-link break-all" href={`mailto:${org.email}`}>
                    {org.email}
                  </a>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={90} className="mt-10">
              <MapEmbed src={org.address.mapEmbed} title="Map of Padma Palace, Nehru Place, New Delhi" linkHref={org.address.mapUrl} />
            </Reveal>
          </div>

          <Reveal delay={60} className="card self-start p-6 sm:p-9">
            <h2 className="sub-title">Send us a message</h2>
            <p className="meta mt-2 mb-6">Pick a topic and tell us a little. We reply to the address you give.</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="ways-title" className="section">
        <div className="wrap">
          <h2 id="ways-title" className="section-title max-w-[18ch]">
            Ways to be involved
          </h2>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {ways.map((w) => (
              <Reveal key={w.id} className="grid scroll-mt-28 gap-3 py-8 lg:grid-cols-[16rem_1fr] lg:gap-14">
                <dt id={w.id} className="display scroll-mt-28 text-[1.7rem] leading-tight">
                  {w.title}
                </dt>
                <dd className="reading">{w.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
