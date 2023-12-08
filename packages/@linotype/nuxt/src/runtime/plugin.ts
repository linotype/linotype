import { defineNuxtPlugin, useNuxtApp, useRouter, useRuntimeConfig } from '#app'
import useDomain from './composables/useDomain'
import useLinotype from './composables/useLinotype'

export default defineNuxtPlugin( async () => {
  
  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp()
  const router = useRouter()
  const { scheme, domain } = useDomain()
  const { initLinotype, loadLinotype } = useLinotype()

  //define current domain
  if (process.server) {
    scheme.value = ( nuxtApp.ssrContext?.event?.node?.req?.headers['x-forwarded-proto'] || nuxtApp.ssrContext?.event?.node?.req?.connection?.encrypted ? 'https' : 'http' ).split(/\s*,\s*/)[0]
    domain.value = nuxtApp.ssrContext?.event?.node?.req?.headers.host?.split(':')[0] || 'localhost'
  } else {
    scheme.value = location.protocol === 'https:' ? 'https' : 'http'
    domain.value = window?.document?.location?.host?.split(':')[0] || 'localhost'
  }

  //init linotype
  nuxtApp.hook('app:beforeMount', () => initLinotype() )

  //load linotype
  nuxtApp.hook('app:created', async () => await loadLinotype() )

})
