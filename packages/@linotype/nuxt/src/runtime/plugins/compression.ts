import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { useCompression } from 'h3-compression'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('beforeResponse', async (event, response) => {
    //if (!response.headers?.['content-type'].startsWith('text/html')) return
    await useCompression(event, response)
  })
})