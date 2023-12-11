import { defineNuxtPlugin, useNuxtApp, useRouter, useRuntimeConfig, useFetch, addRouteMiddleware, useRequestURL } from '#app'

import useDomain from './composables/useDomain'
import useLinotype from './composables/useLinotype'
import PageIndex from './pages/index.vue'

export default defineNuxtPlugin( async () => {
  
  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp()
  const router = useRouter()
  const { loadTemplate } = useLinotype()
  const url = useRequestURL()

  console.log('hoooost1',{
    host: nuxtApp?.ssrContext?.req?.headers?.host,
    host2: nuxtApp?.ssrContext?.event?.node?.req?.headers?.host,
    url: url
  })

  //load linotype template
  addRouteMiddleware('linotype-middleware', async (to, from) => {
    const url = useRequestURL()
    console.log('hoooost2',{
      host: nuxtApp?.ssrContext?.req?.headers?.host,
      host2: nuxtApp?.ssrContext?.event?.node?.req?.headers?.host,
      url: url
    })

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
          ["domain_" + config.public.linotype.env] : { _eq: url.hostname },
        }
      },
      limit: -1,
    }
  })
  if ( errorAPI.value ) {
    console.log('[linotype:nuxt:plugin:error]', errorAPI)
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
      console.log('[linotype:nuxt:plugin:error]', error, instance, info)
    })
  }

})
