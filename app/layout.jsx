import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { buildMetadata, organizationJsonLd, websiteJsonLd } from '../lib/seo.js';
import { SpeedInsights } from '@vercel/speed-insights/next';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap'
});

export const metadata = buildMetadata();
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={plusJakartaSans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]) }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
