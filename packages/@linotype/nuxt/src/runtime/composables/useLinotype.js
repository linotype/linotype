import { useRuntimeConfig, useState, useRoute, useRouter, useFetch, createError, onBeforeRouteLeave } from '#app'
import { nextTick, ref, computed, resolveComponent } from 'vue'
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
  
  const app = useNuxtApp()
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
   * Load components
   */
  const load = (components) => {

    Object.entries(components).forEach(([fileName, module]) => {

      const regex = /\/block\/([^/]*)\/index\.vue$/;
      const match = fileName.match(regex);
      const componentName = match ? match[1] : null;
      
      if (componentName) {
        app.vueApp.component(
          `linotype-block-${componentName}`.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''), 
          defineAsyncComponent(() => components[fileName]())
        )
      }
    
    })
  
  }
  
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
    
    return `linotype-block-${id}`.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')

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
    load,
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
