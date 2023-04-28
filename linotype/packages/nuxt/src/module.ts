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
    backend_url: process.env.LINOTYPE_BACKEND_URL,
    backend_token: process.env.LINOTYPE_BACKEND_TOKEN,
  },

  setup (options, nuxt) {

    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.linotype = defu(nuxt.options.runtimeConfig.linotype, {
      env: options.env,
      debug: options.debug,
      backend_url: options.backend_url,
      backend_token: options.backend_token,
    })

    //Composable loader
    addImportsDir(resolver.resolve('./runtime/composables'))
    
    //Componments loader
    addComponentsDir( { path: resolver.resolve('./runtime/components') } )
    addComponentsDir( { path: '~/linotype', prefix: 'linotype', pattern: ['**/index.vue'], ignore: ['**/*.story.vue'], isAsync: true, global: true, watch: true, extensions: ['vue'] } )
    
    //endpoints for backend
    addServerHandler({ method: 'get', route: '/linotype', handler: resolver.resolve('./runtime/server/routes/linotype') })
    addServerHandler({ method: 'post', route: '/linotype/block/sync', handler: resolver.resolve('./runtime/server/routes/sync') })

    //endpoints for frontend
    addServerHandler({ method: 'get', route: '/sitemap.xml', handler: resolver.resolve('./runtime/server/routes/sitemap') })
    
    //linotype loader
    addPlugin({ mode: 'all', src: resolver.resolve('./runtime/plugin') })
    
    // extendPages((pages) => {
    //   pages.push({
    //     name: 'linotype-default',
    //     path: '/:pathMatch(.*)',
    //     file: resolver.resolve('./runtime/components/linotype-content.vue')
    //   })
    // })

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