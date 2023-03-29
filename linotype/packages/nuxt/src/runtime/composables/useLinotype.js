import useDomain from "./useDomain"
import { useRuntimeConfig, useState, useRoute, useFetch, createError } from 'nuxt/app'
import { nextTick, watch, computed } from 'vue'

/**
 * @useLinotype
 *
 * @description
 * Linotype Nuxt3 engine
 *
 * @author YannickArmspach
 * @since v1
 *
 */
const useLinotype = function () {
  /**
   * Use config
   */
  const config = useRuntimeConfig()

  /**
   * Use domain
   */
  const { scheme, domain } = useDomain()

  /**
   * Use route
   */
  const route = useRoute()

  /**
   * Store template data
   */
  const template = useState('useLinotype.template', () => {
    return {}
  })

  /**
   * Store error status
   */
  const error = useState('useLinotype.error', () => false)

  /**
   * Store loading status
   */
  const loading = useState('useLinotype.loading', () => true)

  /**
   * Store loading status
   */
  const refresh = useState('useLinotype.refresh', () => 0)

  /**
   * Store preview status
   */
  const preview = useState('useLinotype.preview', () => true)

  /**
   * Load Current Page Data
   *
   * @params none
   * @returns none
   */
  const loadTemplate = async () => {
    loading.value = true
    error.value = false
    
    const { data: dataAPI, error: errorAPI } = await useFetch(`${config.public.linotype.backend_url}/linotype/template`,{
      method: 'POST',
      body: {
        env: config.public.linotype.env,
        scheme: scheme.value,
        domain: domain.value,
        route: getCurrentRoute()
      }
    })
    if ( errorAPI.value || dataAPI.value?.status == 'error' ) {
      console.log('error', {
        env: config.public.linotype.env,
        scheme: scheme.value,
        domain: domain.value,
        route: getCurrentRoute(),
        error: errorAPI.value.message
      })

      throw createError({ statusCode: 404, statusMessage: dataAPI.value?.message || errorAPI.value?.message || 'error' })
      
    }
    template.value = dataAPI.value
    error.value = errorAPI.value

    refresh.value++

    await nextTick( async () => {
      await new Promise(r => setTimeout(r, 300))
      loading.value = false
    })

  }

  /**
   * Load Block Component
   *
   * @params id
   * @returns Component
   */
  const loadBlock = (id) => {
    return `block-${id}`
    // return defineAsyncComponent( async () => {
    //   if ( blocksIds.value.includes(`${id}/${id}`) ) {
    //      const xxx = await import(`${process.cwd() ? process.cwd() : '.'}/src/components/blocks/${id}/${id}.index.vue`)
    //      console.log('xxx',xxx)
    //      return xxx
    //      } else {
    //     return import('./../components/linotype-default.vue')
    //   }
    // })
  }

  /**
   * Load linotype
   */
  const loadLinotype = async () => {
    watch( computed(() => route.path ), async () => {
      await loadTemplate()
    })
    await loadTemplate()
  }

  /**
   * Utils getCurrentRoute
   */
  const getCurrentRoute = () => {
    let currentRoute = route.path ? route.path : '/'
    currentRoute = sanitizeRoute(currentRoute)
    return currentRoute
  }

  /**
   * Utils sanitizeRoute
   */
  const sanitizeRoute = (route) => {
    return route.endsWith('/') ? route.slice(0, -1) : route
  }

  /**
   * returns
   */
  return {
    config,
    loadLinotype,
    loadTemplate,
    loadBlock,
    website: computed(() => template.value.website ),
    page: computed(() => template.value.page ),
    headers: computed(() => template.value.headers ),
    contents: computed(() => template.value.contents ),
    footers: computed(() => template.value.footers ),
    error,
    loading,
    refresh,
    preview,
  }
}

export default useLinotype
