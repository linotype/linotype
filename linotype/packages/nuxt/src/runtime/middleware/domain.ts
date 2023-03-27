import { defineNuxtRouteMiddleware, useNuxtApp } from 'nuxt/app'
import useDomain from "../composables/useDomain"

export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp();

  const { scheme, domain } = useDomain();

  if (process.server) {
    scheme.value = nuxtApp.ssrContext?.event?.node?.req?.socket?.encrypted ? 'https' : 'http'
    domain.value = nuxtApp.ssrContext?.event?.node?.req?.headers.host?.split(':')[0] || 'localhost';
  } else {
    scheme.value = location.protocol === 'https:' ? 'https' : 'http'
    domain.value = window?.document?.location?.host?.split(':')[0] || 'localhost';
  }

});
