import Script from 'next/script';
import { readHtmlBody } from '../../lib/html.js';
import { buildCanonical, buildMetadata, siteUrl } from '../../lib/seo.js';

export const dynamic = 'force-static';
export const metadata = buildMetadata({
  title: 'Pembayaran QRIS Serenara Studio | Konfirmasi Undangan Digital',
  description: 'Halaman pembayaran QRIS Serenara Studio untuk paket undangan digital online murah dan konfirmasi pemesanan via WhatsApp.',
  path: '/qris'
});

const qrisJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/qris#webpage`,
  url: buildCanonical('/qris'),
  name: 'Pembayaran QRIS Serenara Studio',
  description: 'Konfirmasi pembayaran paket undangan digital Serenara Studio.',
  isPartOf: { '@id': `${siteUrl}/#website` },
  inLanguage: 'id-ID'
};

export default function QrisPage() {
  return (
    <div className="payment-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qrisJsonLd) }} />
      <div dangerouslySetInnerHTML={{ __html: readHtmlBody('qris.html') }} />
      <Script src="/qris.js" strategy="afterInteractive" />
    </div>
  );
}
