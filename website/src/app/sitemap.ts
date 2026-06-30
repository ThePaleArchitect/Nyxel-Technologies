import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nyxeltechnologies.com';
  const routes = [
    '',
    '/charter',
    '/network',
    '/capabilities',
    '/docs/how-we-bill',
    '/vault',
    '/channel',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
