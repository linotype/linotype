import { useNuxtApp, useRuntimeConfig, useState, useRoute, useFetch, showError } from '#app'
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
  
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  // const { scheme, domain } = useDomain()
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
  const loadTemplate = async (route) => {
   
    initialized.value = true
    
    loading.value = true
    error.value = false

    let path = '/'

    //check path type
    if ( route?.matched[0]?.path == "/" || route?.matched[0]?.path == "/:slug(.*)*" ) {
      
      //if simple, return route
      path = getSanitizeRoute(route.path)

    } else {
      
      // if Dynamics, return the matched path (or simple on error)
      path = route?.matched[0]?.path || getSanitizeRoute(route.path)
    
    }

    const url = useRequestURL()
    console.log('nuxtApp: url', url)

    

    const params = {
      env: config.public.linotype.env,
      scheme: url.protocol,
      domain: url.hostname,
      route: path
    }

    const { data: dataAPI, error: errorAPI } = await useFetch(`${config.public.linotype.backend_url}/linotype/template`,{
      method: 'GET',
      params: params
    })

    if ( config.public.linotype.debug == 'true' ) {
      console.log('[linotype:nuxt:useLinotype:debug] /linotype/template : request', params )
      console.log('[linotype:nuxt:useLinotype:debug] /linotype/template : response', dataAPI.value )
    }

    if ( errorAPI.value || dataAPI.value?.status == 'error' ) {
      loading.value = false
      error.value = errorAPI.value
      console.log('linotype:nuxt:useLinotype:error', dataAPI.value?.message || errorAPI.value?.message)
      throw showError({ 
        statusCode: 404, 
        fatal: true,
        message: dataAPI.value?.message || errorAPI.value?.message || 'error' 
      })
    }
    
    if ( dataAPI.value.website == null ) {
      loading.value = false
      console.log('linotype:nuxt:useLinotype:error', 'no data founded')
      throw showError({
        statusCode: 404,
        fatal: false,
        message: 'Page not found'
      })
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

  }

  /**
   * Init linotype
   */
  const initLinotype = async () => {

  }



  /**
   * Utils getSanitizeRoute
   */
  const getSanitizeRoute = (route) => {
    let currentRoute = route ? route : '/'
    currentRoute = sanitizeRoute(currentRoute)
    return currentRoute || ''
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
