import { useRuntimeConfig, getQuery } from '#imports'
import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()

  const query = getQuery(event)

  const scheme = ( event?.node?.req?.headers['x-forwarded-proto'] || event?.node?.req?.connection?.encrypted ? 'https' : 'http' ).split(/\s*,\s*/)[0]
  const domain = event?.node.req?.headers?.host?.split(':')[0] || 'localhost'

  const response = await event.$fetch(`${config.public.linotype.backend_url}/linotype/search`,{
    method: 'POST',
    body: {
      env: config.public.linotype.env,
      scheme: scheme,
      domain: domain,
      search: query?.search
    }
  })

  return response
})
