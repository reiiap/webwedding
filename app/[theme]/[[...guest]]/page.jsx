import Script from 'next/script';
import { notFound } from 'next/navigation';
import { readHtmlBody } from '../../../lib/html.js';
import { buildCanonical, buildMetadata, siteName, siteUrl } from '../../../lib/seo.js';
import { themeSlugs, themes } from '../../../lib/themes.js';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return themeSlugs.flatMap((theme) => ([
    { theme, guest: [] },
    { theme, guest: [themes[theme].guest] }
  ]));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const data = themes[resolvedParams.theme];
  if (!data) return {};
  const guestPath = resolvedParams.guest?.length ? `/${resolvedParams.guest.join('/')}` : '';
  const path = `/${resolvedParams.theme}${guestPath}`;
  const title = `${data.theme} — Preview ${data.packageName} | ${siteName}`;
  const description = `${data.description} Buka contoh undangan personal ${data.couple} dari Serenara Studio.`;
  return buildMetadata({ title, description, path, type: 'article' });
}

export default async function ThemePreviewPage({ params }) {
  const resolvedParams = await params;
  const data = themes[resolvedParams.theme];
  if (!data) notFound();

  const guestPath = resolvedParams.guest?.length ? `/${resolvedParams.guest.join('/')}` : '';
  const routePath = `/${resolvedParams.theme}${guestPath}`;
  const html = readHtmlBody(`${resolvedParams.theme}/index.html`);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}${routePath}#preview`,
    url: buildCanonical(routePath),
    name: `${data.theme} — Preview ${data.packageName}`,
    description: data.description,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#business` },
    inLanguage: 'id-ID',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: data.theme, item: buildCanonical(`/${resolvedParams.theme}`) }
      ]
    }
  };

  return (
    <div
      className="preview-page"
      data-preview-root
      data-theme={resolvedParams.theme}
      data-tier={data.tier}
      data-guest="Tamu Undangan"
      data-event-date="2026-12-19T09:00:00+07:00"
    >
      <link rel="stylesheet" href="/shared-preview/preview.css" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/shared-preview/preview.js" strategy="afterInteractive" />
    </div>
  );
}
