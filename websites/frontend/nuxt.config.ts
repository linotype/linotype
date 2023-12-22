import LinotypeModule from './../../packages/@linotype/nuxt'

export default defineNuxtConfig({
  
  srcDir: 'src',
  
  extends: [
    '@nuxt/ui-pro'
  ],
  
  modules: [
    '@nuxt/ui',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    'nuxt-og-image',
    LinotypeModule
  ],

  ui: {
    icons: ['heroicons', 'simple-icons']
  },

  colorMode: {
    preference: 'light'
  },

  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [400, 500, 600, 700]
    }
  },

  fontMetrics: {
    fonts: ['DM Sans']
  },

  css: [],

  runtimeConfig: {
    public: {
      LINOTYPE_ENV: process.env.LINOTYPE_ENV,
      LINOTYPE_DEBUG: process.env.LINOTYPE_DEBUG,
      NODE_ENV: process.env.NODE_ENV,
      SITE_NAME: process.env.SITE_NAME,
      BASE_URL: process.env.BASE_URL,
      DIRECTUS_URL: process.env.DIRECTUS_URL,
      DIRECTUS_TOKEN: process.env.DIRECTUS_TOKEN,
    },
    private: {
      DIRECTUS_TOKEN: process.env.DIRECTUS_TOKEN,
    }
  },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
    }
  },

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

  devtools: { enabled: true },

  typescript: { strict: false }

})
