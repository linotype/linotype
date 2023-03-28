
import { defineEventHandler } from 'h3'
import useDomain from '../composables/useDomain'

/*
 *
 * DEV: I can't use useDomain in nitro context, how can I import useDomain ? (temporary load this function in main plugin)
 *
*/

export default defineEventHandler(async (event) => { // export default defineNuxtRouteMiddleware(() => {
 
  const { scheme, domain } = useDomain()

  if (process.server) {
    scheme.value = ( event?.node?.req?.headers['x-forwarded-proto'] || event?.node?.req?.connection?.encrypted ? 'https' : 'http' ).split(/\s*,\s*/)[0]
    domain.value = event?.node?.req?.headers.host?.split(':')[0] || 'localhost'
  } else {
    scheme.value = location.protocol === 'https:' ? 'https' : 'http'
    domain.value = window?.document?.location?.host?.split(':')[0] || 'localhost'
  }

})
