import Script from "next/script";
import { readHtmlBody } from "../lib/html.js";
import {
  buildCanonical,
  buildMetadata,
  defaultDescription,
  defaultTitle,
  siteUrl,
} from "../lib/seo.js";

export const dynamic = "force-static";
export const metadata = buildMetadata({
  title: defaultTitle,
  description: defaultDescription,
  path: "/",
});

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/#home`,
  url: buildCanonical("/"),
  name: defaultTitle,
  description: defaultDescription,
  isPartOf: { "@id": `${siteUrl}/#website` },
  about: { "@id": `${siteUrl}/#business` },
  primaryImageOfPage: `${siteUrl}/assets/hero-preview.svg`,
  inLanguage: "id-ID",
  mainEntity: {
    "@type": "Service",
    name: "Jasa undangan digital premium",
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: "Indonesia",
    serviceType: [
      "undangan digital premium",
      "undangan online",
      "undangan digital pernikahan",
      "undangan website wedding",
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <link rel="stylesheet" href="/styles.css" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: readHtmlBody("index.html") }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
