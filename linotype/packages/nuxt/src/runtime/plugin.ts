import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
  const { loadLinotype } = useLinotype()
  await loadLinotype()
})
