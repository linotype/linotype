import { useRuntimeConfig } from '#imports'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  
  const config = useRuntimeConfig()

  // const scheme = ( event?.node?.req?.headers['x-forwarded-proto'] || event?.node?.req?.connection?.encrypted ? 'https' : 'http' ).split(/\s*,\s*/)[0]
  // const domain = event?.node.req?.headers?.host?.split(':')[0] || ''

  // const links = await event.$fetch(`${config.public.linotype.backend_url}/linotype/sitemap`,{
  //   method: 'GET',
  //   params: {
  //     env: config.public.linotype.env,
  //     scheme: scheme,
  //     domain: domain
  //   }
  // })

  event.node.res.setHeader('Content-Type', 'text/plain')

  return `User-agent: *`
})
