import { defineNuxtPlugin } from 'nuxt/app'
import useLinotype from './composables/useLinotype'

export default defineNuxtPlugin(async () => {
  const { loadLinotype } = useLinotype()
  await loadLinotype()
})
