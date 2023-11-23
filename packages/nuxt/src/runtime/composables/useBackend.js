import { useRuntimeConfig, useAsyncData } from '#app'
import useDomain from "./useDomain"
import { ofetch } from 'ofetch'

/**
 * @useBackend
 *
 * @description
 * Linotype Nuxt3 engine
 *
 * @author YannickArmspach
 * @since v1
 *
 */
const useBackend = function () {
 
  const config = useRuntimeConfig()
  const { scheme, domain } = useDomain()

  const getMenu = async () => {
    return await useAsyncData('useBackend.menu', () => ofetch(`${config.public.linotype.backend_url}/linotype/menu`, {
      method: 'GET',
      params: {
        env: config.public.linotype.env,
        scheme: scheme.value,
        domain: domain.value
      }
    }))
  }

  const getSearch = async (query) => {
    if ( ! query.value ) return []
    return await useAsyncData('useBackend.search', () => ofetch(`${config.public.linotype.backend_url}/linotype/search`, {
      method: 'GET',
      params: {
        env: config.public.linotype.env,
        scheme: scheme.value,
        domain: domain.value,
        search: query.value
      }
    }), {
      watch: [query]
    })
  }

  const getSitemap = async () => {
    return await useAsyncData('useBackend.sitemap', () => ofetch(`${config.public.linotype.backend_url}/linotype/sitemap`, {
      method: 'GET',
      params: {
        env: config.public.linotype.env,
        scheme: scheme.value,
        domain: domain.value
      }
    }))
  }

  /**
   * returns
   */
  return {
    getMenu,
    getSearch,
    getSitemap
  }
}

export default useBackend
