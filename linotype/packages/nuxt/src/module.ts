import { defineNuxtModule, addServerHandler, addPlugin, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit'
import { defu } from 'defu'
import { fileURLToPath } from 'url'

export interface ModuleOptions {

  /**
   * Linotype environement
   * @default process.env.LINOTYPE_ENV
   * @type string
   */
  env?: string;

  /**
   * Linotype debug mode
   * @default process.env.LINOTYPE_DEBUG
   * @type string
   */
  debug?: string;

  /**
   * Directus API URL
   * @default process.env.LINOTYPE_DIRECTUS_URL
   * @type string
   */
  directus_url?: string;

  /**
   * Directus API URL
   * @default process.env.LINOTYPE_DIRECTUS_TOKEN
   * @type string
   */
  directus_token?: string;
  
}

export default defineNuxtModule<ModuleOptions>({
  
  meta: {
    name: 'linotype',
    configKey: 'linotype',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false
    }
  },
  
  defaults: {
    env: process.env.LINOTYPE_ENV,
    debug: process.env.LINOTYPE_DEBUG,
    directus_url: process.env.LINOTYPE_DIRECTUS_URL,
    directus_token: process.env.LINOTYPE_DIRECTUS_TOKEN,
  },

  setup (options, nuxt) {

    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.linotype = defu(nuxt.options.runtimeConfig.linotype, {
      env: options.env,
      debug: options.debug,
      directus_url: options.directus_url,
      directus_token: options.directus_token,
    })

    addImportsDir(resolver.resolve('./runtime/composables'))
    
    addComponentsDir( { path: resolver.resolve('./runtime/components') } )
    addComponentsDir( { path: '~/linotype', "global": true } )
    
    addPlugin(resolver.resolve('./runtime/plugin'))

    addServerHandler({ route: '/sitemap.xml', handler: resolver.resolve('./runtime/server/routes/sitemap.xml') })

    addServerHandler({ route: '/linotype', handler: resolver.resolve('./runtime/server/routes/linotype') })
  
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

  }

})

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      linotype?: ModuleOptions;
    };
  }
}