export const dynamic = "force-static";

import { siteUrl } from '../lib/seo.js';
import { themeSlugs, themes } from '../lib/themes.js';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = ['/', '/qris'].map((path) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.6
  }));

  const previewRoutes = themeSlugs.flatMap((slug) => ([
    {
      url: `${siteUrl}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75
    },
    {
      url: `${siteUrl}/${slug}/${themes[slug].guest}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65
    }
  ]));

  return [...staticRoutes, ...previewRoutes];
}
