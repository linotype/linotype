import { defineNuxtPlugin, useNuxtApp } from 'nuxt/app'
import useLinotype from './composables/useLinotype'
import useDomain from './composables/useDomain'

export default defineNuxtPlugin(async () => {
  
  const nuxtApp = useNuxtApp()

  const { scheme, domain } = useDomain()

  if (process.server) {
    scheme.value = ( nuxtApp.ssrContext?.event?.node?.req?.headers['x-forwarded-proto'] || nuxtApp.ssrContext?.event?.node?.req?.connection?.encrypted ? 'https' : 'http' ).split(/\s*,\s*/)[0]
    domain.value = nuxtApp.ssrContext?.event?.node?.req?.headers.host?.split(':')[0] || 'localhost'
  } else {
    scheme.value = location.protocol === 'https:' ? 'https' : 'http'
    domain.value = window?.document?.location?.host?.split(':')[0] || 'localhost'
  }

  const { loadLinotype } = useLinotype()
  
  await loadLinotype()
  
})
