import { useRuntimeConfig, useState, useRoute, useFetch } from 'nuxt/app'
import useDomain from "./useDomain"

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
  const route = useRoute()

  const getMenu = async () => {
    return await useAsyncData('useBackend.menu', () => $fetch(`${config.public.linotype.backend_url}/linotype/menu`, {
      method: 'POST',
      body: {
        env: config.public.linotype.env,
        scheme: scheme.value,
        domain: domain.value
      }
    }))
  }

  const getSearch = async (query) => {
    if ( ! query.value ) return []
    return await useAsyncData('useBackend.search', () => $fetch(`${config.public.linotype.backend_url}/linotype/search`, {
      method: 'POST',
      body: {
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
    return await useAsyncData('useBackend.sitemap', () => $fetch(`${config.public.linotype.backend_url}/linotype/sitemap`, {
      method: 'POST',
      body: {
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
