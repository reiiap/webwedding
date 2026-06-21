export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://undangan.serenarastudio.com";

export const siteName = "Serenara Studio";
export const defaultTitle = "Serenara Studio — Undangan Digital Premium";
export const defaultDescription =
  "Serenara Studio merancang undangan digital premium yang elegan, personal, ringan, dan siap membantu momen pernikahan terasa lebih berkesan.";

export const seoKeywords = [
  "undangan digital premium",
  "undangan online",
  "undangan digital pernikahan",
  "jasa undangan digital",
  "undangan website wedding",
  "Serenara Studio",
];

export const ogImage = "/assets/hero-preview.svg";

export const buildCanonical = (path = "/") => new URL(path, siteUrl).toString();

export const buildMetadata = ({
  title = defaultTitle,
  description = defaultDescription,
  path = "/",
  images = [ogImage],
  type = "website",
} = {}) => ({
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: seoKeywords,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: buildCanonical(path),
    siteName,
    locale: "id_ID",
    type,
    images: images.map((url) => ({
      url,
      width: 1200,
      height: 630,
      alt: `${siteName} - Undangan Digital Premium`,
    })),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
});

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${siteUrl}/#business`,
  name: siteName,
  url: siteUrl,
  image: `${siteUrl}${ogImage}`,
  logo: `${siteUrl}${ogImage}`,
  description: defaultDescription,
  areaServed: { "@type": "Country", name: "Indonesia" },
  priceRange: "Rp75.000 - Rp649.000",
  sameAs: ["https://wa.me/6281995452717"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+62-819-9545-2717",
      availableLanguage: ["id-ID"],
    },
  ],
  makesOffer: seoKeywords
    .slice(0, 5)
    .map((name) => ({ "@type": "Offer", name })),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: `${siteName} — Undangan Digital Premium`,
  url: siteUrl,
  description: defaultDescription,
  inLanguage: "id-ID",
  publisher: { "@id": `${siteUrl}/#business` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
