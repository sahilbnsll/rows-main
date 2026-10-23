import { event } from "@/content/festival-2026";
import { org } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/** Escapes "<" so the JSON can never close its own script tag. */
function Script({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** schema.org Organization, built only from details the society publishes. */
export function OrganizationJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "NGO",
        name: org.name,
        url: siteUrl,
        logo: `${siteUrl}/images/brand/rays-logo.png`,
        description: org.mission,
        email: org.email,
        telephone: org.phones.office.display,
        address: { "@type": "PostalAddress", streetAddress: "5th Floor, 86, Padma Palace, Nehru Place", addressLocality: "New Delhi", postalCode: "110019", addressCountry: "IN" },
        sameAs: org.social.map((s) => s.href),
        foundingLocation: "New Delhi, India",
      }}
    />
  );
}

/** schema.org Event for the 2026 festival: dates, venue and organiser, with no price or ticket claim. */
export function FestivalJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Event",
        name: `${event.edition} ${event.title} 2026`,
        description: event.seoDescription,
        startDate: `${event.startDate}T18:30:00+05:30`,
        endDate: event.endDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: event.venue.name,
          address: { "@type": "PostalAddress", streetAddress: event.venue.address, addressLocality: "New Delhi", addressCountry: "IN" },
        },
        organizer: { "@type": "Organization", name: org.name, url: siteUrl },
        image: [`${siteUrl}${event.poster.src}`],
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${siteUrl}${c.path}` })),
      }}
    />
  );
}
