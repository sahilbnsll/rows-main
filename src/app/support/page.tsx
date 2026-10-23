import Link from "next/link";
import { org } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { CopyField } from "@/components/ui/CopyField";
import { ArrowRight, Download } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Support our work",
  description: "Become a patron of Rays of Wisdom Society. Donations from Rs 10,000 are fully tax-deductible under 80G. Bank details, benefits for patrons and how to ask questions.",
  path: "/support",
});

const benefits = [
  "Priority seating",
  "Acknowledgement on our website and event announcements",
  "Voting rights for the Ancient Arts Award",
];

/** Bank details are the ones the Society publishes on its own donation page; the client should confirm they are current. */
const bank = [
  { label: "Name of payee", value: "Rays of Wisdom Society (12A)" },
  { label: "Bank", value: "Bank of India, Nehru Place, New Delhi" },
  { label: "Account number", value: "601810110006023" },
  { label: "IFSC code", value: "BKID0006018" },
  { label: "MICR code", value: "110013020" },
  { label: "PAN", value: "AABTR3236L" },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Support" }]}
        title="Join in our efforts to keep the arts alive"
        lead="Arts are essential to the proper functioning of society. Support the arts and the community by becoming a patron of Rays of Wisdom Society."
      />

      <section aria-labelledby="why-title" className="section-tight">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <h2 id="why-title" className="section-title max-w-[16ch]">
              Why the arts need patrons
            </h2>
            <div className="reading prose-flow mt-6">
              <p>The arts are especially important for our children, as they have been shown to balance the nervous system, resulting in children who:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>have better grade point averages,</li>
                <li>score better on standardized tests in reading and math,</li>
                <li>have lower dropout rates.</li>
              </ul>
              <p>Funding for arts programmes has been drastically cut back, and many arts organisations have had to offer fewer productions each season. If you love the arts, join us by becoming a patron of Rays of Wisdom Society. As a patron, your valued donation is fully tax-deductible.</p>
            </div>
          </Reveal>
          <Reveal delay={90} className="card self-start p-7 sm:p-9">
            <p className="display text-[clamp(2.4rem,2rem+2vw,3.4rem)] leading-none text-maroon">Rs 10,000</p>
            <p className="meta mt-2">Minimum patron donation</p>
            <h3 className="sub-title mt-7">Patrons receive</h3>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {benefits.map((b) => (
                <li key={b} className="py-3">
                  {b === "Acknowledgement on our website and event announcements" ? (
                    <>
                      Acknowledgement on{" "}
                      <Link href="/team" className="prose-link">
                        our website
                      </Link>{" "}
                      and event announcements
                    </>
                  ) : b === "Voting rights for the Ancient Arts Award" ? (
                    <>
                      Voting rights for the{" "}
                      <Link href="/festival" className="prose-link">
                        Ancient Arts Award
                      </Link>
                    </>
                  ) : (
                    b
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="bank-title" className="section bg-sage/45">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <h2 id="bank-title" className="section-title max-w-[14ch]">
              How to give
            </h2>
            <p className="reading mt-4">Donations are made by bank transfer. These are the details the Society publishes for donations.</p>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {bank.map((b) => (
                <CopyField key={b.label} label={b.label} value={b.value} />
              ))}
            </dl>
            <p className="meta mt-4">There is no online payment on this site. For anything else about donating, use the contact details beside this list.</p>
          </Reveal>
          <Reveal delay={90}>
            <h3 className="sub-title">Tax exemption and registration</h3>
            <p className="reading mt-3">Donations are exempt from income tax under 80G order no. DEL-RE 24131-03092012.</p>
            <ul className="mt-5 space-y-2">
              <li>
                <a href="/documents/rws-80g-form.pdf" className="link-arrow" target="_blank" rel="noopener noreferrer">
                  <Download size={16} />
                  Form 80G (PDF)
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href="/documents/rws-registration-deed.jpg" className="link-arrow" target="_blank" rel="noopener noreferrer">
                  <Download size={16} />
                  Registration deed (image)
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
            <p className="meta mt-3">Registered as {org.registration}.</p>
            <h3 className="sub-title mt-10">Questions about donating</h3>
            <p className="reading mt-3">
              Please call Savita Bisht on{" "}
              <a className="prose-link" href={`tel:${org.phones.donations.tel}`}>
                {org.phones.donations.display}
              </a>{" "}
              ({org.hours}) or write to{" "}
              <a className="prose-link break-all" href={`mailto:${org.email}`}>
                {org.email}
              </a>
              .
            </p>
            <Link href="/contact" className="link-arrow mt-3">
              Contact form
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
