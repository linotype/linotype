import LinotypeModule from './../../packages/@linotype/nuxt'

export default defineNuxtConfig({

  modules: [
    //Linotype module declaration
    LinotypeModule,
    //for playground
    '@unocss/nuxt',
    '@vueuse/nuxt',
    // '@nuxt/test-utils',
    'nuxt-icon',
    '@nuxt/devtools',
  ],
  
  // Default Linotype settings
  linotype: {
    // src: '~/components/linotype',
    env: process.env.LINOTYPE_ENV,
    debug: process.env.LINOTYPE_DEBUG,
    backend_url: process.env.LINOTYPE_BACKEND_URL,
    backend_token: process.env.LINOTYPE_BACKEND_TOKEN,
  },
  
  //allow linotype route cors
  routeRules: {
    '/**': process.env.LINOTYPE_CACHE == 'true' ? {
      swr: 60*60*24,
      cache: {
        name: 'linotype_cache',
        base: 'linotype_cache',
        group: 'linotype',
      },
    } : {
      cache: false,
    },
    '/linotype/**': {
      cache: false,
      cors: true,
      headers: { 
        'Acess-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Credentials': 'true',
      }
    }
  },

  nitro: {
    compressPublicAssets: { 
      gzip: true, 
      brotli: true 
    },
    storage: {
      linotype_cache: process.env.REDIS 
      ? { driver: 'redis', url: process.env.REDIS }
      : { driver: 'fs', base: './.nuxt/cache' },
    },
  },

  //for minimal playground style
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    shortcuts: [],
    rules: [],
  },

  //playground specials
  srcDir: 'src',
  // app: {
  //   rootId: 'linotype',
  // },

  experimental: {
    componentIslands: true
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  }

});