import { defineNuxtModule, addPlugin, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'linotype',
    configKey: 'linotype'
  },
  defaults: {

  },
  setup () {
    const resolver = createResolver(import.meta.url)

    addComponentsDir( { path: resolver.resolve('./runtime/components') } )

    addImportsDir(resolver.resolve('./runtime/composables'))
    
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
