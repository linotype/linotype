// import { SitemapStream, streamToPromise } from 'sitemap'
// import { Readable } from 'stream'
// import { defineEventHandler } from 'h3'
// import { Directus } from '@directus/sdk';

// export default defineEventHandler(async (event) => {

//   const config = useRuntimeConfig();

//   const scheme = ( event?.node?.req?.headers['x-forwarded-proto'] || event?.node?.req?.connection?.encrypted ? 'https' : 'http' ).split(/\s*,\s*/)[0]
//   const domain = event?.node.req?.headers?.host?.split(':')[0] || 'localhost'

//   const directus = new Directus(config.public.DIRECTUS_URL);

//   const website = await directus.items('websites').readByQuery({
//     fields: ['robots'],
//     filter: {
//       status: 'online',
//       ["domain_" + config.public.LINOTYPE_ENV] : { _eq: domain || 'localhost' }
//     },
//     limit: 1,
//   });

//   event.node.res.setHeader('Content-Type', 'text/plain');

//   return website?.data[0]?.robots ? website?.data[0]?.robots.replace('{{url}}', `${scheme}://${domain}` ) : `User-agent: * \nSitemap: ${scheme}://${domain}/sitemap.xml`;
// });
