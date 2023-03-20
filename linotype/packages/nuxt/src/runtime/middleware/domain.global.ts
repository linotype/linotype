import useDomain from "./../linotype/composables/useDomain"

export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp();

  const { domain } = useDomain();

  if (process.server) {
    domain.value = nuxtApp.ssrContext?.event?.node?.req?.headers.host?.split(':')[0] || 'undefined';
  } else {
    domain.value = window?.document?.location?.host?.split(':')[0] || 'undefined';
  }

});
