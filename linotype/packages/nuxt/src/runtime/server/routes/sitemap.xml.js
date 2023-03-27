import { useRuntimeConfig } from '#imports'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  
  const config = useRuntimeConfig()

  const scheme = event?.node?.req?.socket?.encrypted ? 'https' : 'http'
  const domain = event?.node.req?.headers?.host?.split(':')[0] || 'localhost'
  
  const links = await event.$fetch(`${config.public.linotype.backend_url}/linotype/sitemap`,{
    method: 'POST',
    body: {
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
