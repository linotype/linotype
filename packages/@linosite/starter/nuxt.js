import { defineNuxtModule } from '@nuxt/kit'
import { fileURLToPath } from 'node:url'
export default defineNuxtModule({
  hooks: {
    'components:dirs'(dirs) {
      dirs.push({
        path: fileURLToPath(new URL('./src', import.meta.url)),
        // prefix: 'awesome'
      })
    }
  }
})