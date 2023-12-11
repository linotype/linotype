import { defineNuxtPlugin, useNuxtApp, useRouter, useRuntimeConfig, useFetch, addRouteMiddleware } from '#app'

import useDomain from './composables/useDomain'
import useLinotype from './composables/useLinotype'
import PageIndex from './pages/index.vue'

export default defineNuxtPlugin( async () => {
  
  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp()
  const router = useRouter()
  const { scheme, domain } = useDomain()
  const { loadTemplate } = useLinotype()

  //define current domain
  if (process.server) {
    scheme.value = ( nuxtApp.ssrContext?.event?.node?.req?.headers['x-forwarded-proto'] || nuxtApp.ssrContext?.event?.node?.req?.connection?.encrypted ? 'https' : 'http' ).split(/\s*,\s*/)[0]
    domain.value = nuxtApp.ssrContext?.event?.node?.req?.headers.host?.split(':')[0] || 'localhost'
  } else {
    scheme.value = location.protocol === 'https:' ? 'https' : 'http'
    domain.value = window?.document?.location?.host?.split(':')[0] || 'localhost'
  }

  //load linotype template
  addRouteMiddleware('linotype-middleware', async (to, from) => {
      await loadTemplate(to)
    },
    { global: true }
  )

  //load custom route
  const { data: linotypePagesRoutes, error: errorAPI } = await useFetch(`${config.public.linotype.backend_url}/items/linotype_pages`,{
    method: 'GET',
    params: {
      fields: [
        'id',
        'status',
        'slug',
        'target.domain_' + config.public.linotype.env,
      ],
      filter: {
        status: 'published',
        slug: { 
          _contains: ':' 
        },
        target: { 
          ["domain_" + config.public.linotype.env] : { _eq: domain.value },
        }
      },
      limit: -1,
    }
  })
  if ( errorAPI.value ) {
    console.log('[linotype:error]', errorAPI)
  } else if ( linotypePagesRoutes.value?.data?.length ) {
    for( const item of linotypePagesRoutes.value.data ) {
      router.addRoute({
        name: `linotype-matched-${item.id}`,
        path: item.slug,
        component: PageIndex
      }) 
    }
  }
  
  //log error
  if ( config.public.linotype.debug == 'true' ) {
    console.log('[linotype:debug] is active', config.public.linotype)
    nuxtApp.hook('vue:error', (error, instance, info) => {
      console.log('[linotype:error]', error, instance, info)
    })
  }

})
