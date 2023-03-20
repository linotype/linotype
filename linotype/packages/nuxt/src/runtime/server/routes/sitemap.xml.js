import { Directus } from '@directus/sdk';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { defineEventHandler } from 'h3';
import { useRuntimeConfig } from 'nuxt/app'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const domain = event.req.headers.host;
  const directus = new Directus(config.LINOTYPE_DIRECTUS_URL);

  const allPages = await directus.items('pages').readByQuery({
    fields: [
      'slug',
      'sitemap_enable',
      'sitemap_priority',
      'sitemap_changefreq',
    ],
    filter: {
      status: 'published',
      target: {
        ['domain_' + config.LINOTYPE_ENV]: { _eq: domain || 'localhost' },
      },
    },
    limit: -1,
  });

  const links = allPages.data.map((item) => {
    return item.sitemap_enable
      ? {
          url: item.slug,
          changefreq: item.sitemap_changefreq,
          priority: +item.sitemap_priority,
        }
      : null;
  });

  const stream = new SitemapStream({ hostname: 'https://' + domain });

  const sitemapRaw = await streamToPromise(Readable.from(links).pipe(stream));

  const sitemap = sitemapRaw.toString();

  event.res.setHeader('Content-Type', 'application/xml');

  return sitemap;
});
