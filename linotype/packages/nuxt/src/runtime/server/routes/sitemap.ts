import { useRuntimeConfig } from '#imports'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  
  const config = useRuntimeConfig()

  const scheme = ( event?.node?.req?.headers['x-forwarded-proto'] || event?.node?.req?.connection?.encrypted ? 'https' : 'http' ).split(/\s*,\s*/)[0]
  const domain = event?.node.req?.headers?.host?.split(':')[0] || 'localhost'

  const links = await event.$fetch(`${config.public.linotype.backend_url}/linotype/sitemap`,{
    method: 'GET',
    params: {
      env: config.public.linotype.env,
      scheme: scheme,
      domain: domain
    }
  })

  const stream = new SitemapStream({ hostname: `${scheme}://${domain}` })
  const sitemapRaw = await streamToPromise(Readable.from(links).pipe(stream))
  const sitemap = sitemapRaw.toString()

  event.node.res.setHeader('Content-Type', 'application/xml')

  return sitemap
})
