import { siteUrl } from '../lib/seo.js';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: []
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
