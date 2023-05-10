import { defineNuxtModule, addServerHandler, addPlugin, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit'
// import fs from 'fs'
// import path from 'path'
// import YAML from 'yaml'
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

  async setup (options, nuxt) {

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
    addComponentsDir( { path: resolver.resolve('./runtime/components'), isAsync: true, global: true } )
    
    addComponentsDir( { 
      path: '~/linotype', 
      prefix: 'linotype', 
      //pattern: ['**/index.vue'], 
      ignore: ['**/*.story.vue'], 
      // isAsync: true, 
      global: true, 
      watch: true, 
      extensions: ['vue'] 
    } )
    
    //endpoints for backend
    addServerHandler({ method: 'get', route: '/linotype', handler: resolver.resolve('./runtime/server/routes/linotype') })
    addServerHandler({ method: 'post', route: '/linotype/block/sync', handler: resolver.resolve('./runtime/server/routes/sync') })

    //endpoints for frontend
    addServerHandler({ method: 'get', route: '/sitemap.xml', handler: resolver.resolve('./runtime/server/routes/sitemap') })
    
    //linotype loader
    addPlugin({ mode: 'all', src: resolver.resolve('./runtime/plugin') })

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    //load linotype config
    // const config: any = { blocks: [], modules: [], templates: [], themes: [] }
    // const dir = await resolver.resolvePath(`~/linotype/block`)
    // if ( fs.existsSync(dir) ) {
    //   const files = fs.readdirSync(dir)
    //   for (let i = 0; i < files.length; i++) {
    //     const filename = path.join(dir, files[i])
    //     const stat = fs.lstatSync(filename)
    //     if (stat.isDirectory()) {
    //       const configLinotype: string = fs.readFileSync(`${filename}/config.yaml`, 'utf8') as string
    //       config.blocks.push( YAML.parse(configLinotype) )
    //     }
    //   }
    // }
    
  }

})

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      linotype?: ModuleOptions;
    };
  }
}