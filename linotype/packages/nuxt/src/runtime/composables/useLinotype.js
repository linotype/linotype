import useDomain from "./useDomain"
import { useRuntimeConfig, useState, useRoute, useFetch, createError, onBeforeRouteLeave } from 'nuxt/app'
import { nextTick, computed } from 'vue'

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
 
  const config = useRuntimeConfig()
  const { scheme, domain } = useDomain()
  const route = useRoute()

  const initialized = useState('useLinotype.initialized', () => false)
  const template = useState('useLinotype.template', () => { return {}})
  const error = useState('useLinotype.error', () => false)
  const loading = useState('useLinotype.loading', () => true)
  const refresh = useState('useLinotype.refresh', () => 0)
  const preview = useState('useLinotype.preview', () => true)

  /**
   * Load Current Page Data
   *
   * @params none
   * @returns none
   */
  const loadTemplate = async (path) => {

    loading.value = true
    error.value = false
    
    const { data: dataAPI, error: errorAPI } = await useFetch(`${config.public.linotype.backend_url}/linotype/template`,{
      method: 'POST',
      body: {
        env: config.public.linotype.env,
        scheme: scheme.value,
        domain: domain.value,
        route: path
      }
    })
    if ( errorAPI.value || dataAPI.value?.status == 'error' ) {
      console.log('error', {
        env: config.public.linotype.env,
        scheme: scheme.value,
        domain: domain.value,
        route: path,
        error: errorAPI.value?.message
      })
      error.value = errorAPI.value
      throw createError({ statusCode: 404, statusMessage: dataAPI.value?.message || errorAPI.value?.message || 'error' })
    }
    
    await nextTick( async () => {
      template.value = dataAPI.value
      // await new Promise(r => setTimeout(r, 300))
      loading.value = false
    })

    refresh.value++

  }

  /**
   * Load Block Component
   *
   * @params id
   * @returns Component
   */
  const loadBlock = (id) => {
    return `block-${id.replace('_','-')}`
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
    
    onBeforeRouteLeave( async (to, from, next) => {
      // await new Promise(r => setTimeout(r, 2000))
      await loadTemplate(sanitizeRoute(to.path))
      next()
    })

    if( initialized.value == false ) {
      await loadTemplate(getCurrentRoute())
      initialized.value = true
    }
    
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
  const sanitizeRoute = (path) => {
    return path.endsWith('/') ? path.slice(0, -1) : path
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
