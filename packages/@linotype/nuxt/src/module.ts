import { defineNuxtModule, addServerPlugin, addServerHandler, addPlugin, createResolver, extendPages, addImportsDir } from '@nuxt/kit'
import { defu } from 'defu'
import { fileURLToPath } from 'url'

export interface ModuleOptions {

  /**
   * Linotype environement
   * @default ~/linotype
   * @type string
   */
  src?: string;

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
   * Backend API URL
   * @default process.env.LINOTYPE_BACKEND_URL
   * @type string
   */
  backend_url?: string;

  /**
   * Backend API URL
   * @default process.env.LINOTYPE_BACKEND_TOKEN
   * @type string
   */
  backend_token?: string;
  
}

export default defineNuxtModule<ModuleOptions>({
  
  meta: {
    name: '@linotype/nuxt',
    configKey: 'linotype',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false
    }
  },

  defaults: {
    src: '~/linotype',
    env: process.env.LINOTYPE_ENV,
    debug: process.env.LINOTYPE_DEBUG,
    backend_url: process.env.LINOTYPE_BACKEND_URL,
    backend_token: process.env.LINOTYPE_BACKEND_TOKEN,
  },

  setup (options, nuxt) {

    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.linotype = defu(nuxt.options.runtimeConfig.linotype as any, {
      env: options.env,
      debug: options.debug,
      backend_url: options.backend_url,
      backend_token: options.backend_token,
    })

    //Composable loader
    addImportsDir(resolver.resolve('./runtime/composables'))
    
    //Components loader (use hook to override in default components dir)
    nuxt.hook('components:dirs', (dirs) => {
      
      const { resolve } = createResolver(import.meta.url)

      dirs.unshift({
        path: resolve('./runtime/components')
      })

      dirs.unshift({
        path: options.src, 
        prefix: 'linotype',
        pattern: ['**/*.vue'], 
        ignore: ['**/*.story.vue'],
        isAsync: true,
        global: true,
        watch: true, 
        extensions: ['vue'],
        preload: true
      })
      
    })
    
    //add linotype router
    extendPages((pages) => {
      pages.unshift({
        name: 'linotype-index',
        path: '/',
        file: resolver.resolve('./runtime/pages/index.vue')
       })
       pages.unshift({
        name: 'linotype-fallback',
        path: '/:slug(.*)*',
        file: resolver.resolve('./runtime/pages/index.vue')
       })
    })

    //endpoints for backend
    addServerHandler({ method: 'get', route: '/linotype', handler: resolver.resolve('./runtime/routes/linotype') })
    addServerHandler({ method: 'post', route: '/linotype/block/sync', handler: resolver.resolve('./runtime/routes/sync') })
    addServerHandler({ method: 'get', route: '/linotype/cache', handler: resolver.resolve('./runtime/routes/cache') })

    //endpoints for frontend
    addServerHandler({ method: 'get', route: '/sitemap.xml', handler: resolver.resolve('./runtime/routes/sitemap') })
    addServerHandler({ method: 'get', route: '/robots.txt', handler: resolver.resolve('./runtime/routes/robots') })
    
    //linotype loader
    addPlugin({ mode: 'all', src: resolver.resolve('./runtime/plugins/linotype') })

    //utils
    addPlugin({ mode: 'client', src: resolver.resolve('./runtime/plugins/scroll') })

    //compression
    addServerPlugin(resolver.resolve('./runtime/plugins/compression'))

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