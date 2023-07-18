import { useRuntimeConfig, useState, useRoute, useRouter, useFetch, createError, onBeforeRouteLeave } from 'nuxt/app'
import { nextTick, ref, computed } from 'vue'
import useDomain from "./useDomain"


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
  const router = useRouter()
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

    initialized.value = true
    
    loading.value = true
    error.value = false
    
    const { data: dataAPI, error: errorAPI } = await useFetch(`${config.public.linotype.backend_url}/linotype/template`,{
      method: 'GET',
      params: {
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
    
    template.value = dataAPI.value

    nextTick(() => {
      loading.value = false
      refresh.value++
    })

  }

  /**
   * Load Block Component
   *
   * @params id
   * @returns Component
   */
  const loadBlock = (id) => {

    return `linotype-block-${id.replace('_','-')}`

    // return defineAsyncComponent({
    //   // the loader function
    //   loader: () =>  import(`${process.cwd() ? process.cwd() : '.'}/src/linotype/block/${id}/index.vue`),
    
    //   // A component to use while the async component is loading
    //   loadingComponent: LinotypeDefaultBlock,
    //   // Delay before showing the loading component. Default: 200ms.
    //   delay: 200,
    
    //   // A component to use if the load fails
    //   errorComponent: LinotypeDefaultBlock,
    //   // The error component will be displayed if a timeout is
    //   // provided and exceeded. Default: Infinity.
    //   timeout: 3000
    // })
  }

  /**
   * Init linotype
   */
  const initLinotype = async () => {

    onBeforeRouteLeave( async (to, from, next) => {
      await loadTemplate(sanitizeRoute(to?.matched[0]?.path || ''))
      next()
    })

  }

  /**
   * Load linotype
   */
  const loadLinotype = async () => {
    
    if( initialized.value == false ) {
      await loadTemplate(sanitizeRoute(router?.resolve(getCurrentRoute())?.matched[0]?.path || ''))
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
    initLinotype,
    loadLinotype,
    loadTemplate,
    loadBlock,
    website: template.value.website,
    page: template.value.page,
    headers: template.value.headers,
    contents: template.value.contents,
    footers: template.value.footers,
    error,
    loading,
    refresh,
    preview,
    computed,
    ref, 
  }
}

export default useLinotype
