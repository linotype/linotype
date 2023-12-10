export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      // script: [
      //   { src: 'https://stats.dinorose.fr/script.js', async: true, 'data-website-id': '76bbda40-7f44-40b6-923b-9b2ddede8c3a' }
      // ],
      // link: [
      //   { rel: 'stylesheet', href: 'https://awesome-lib.css' }
      // ],
      // style: [
      //   { children: ':root { color: red }', type: 'text/css' }
      // ],
      // noscript: [
      //   { children: 'JavaScript is required' }
      // ]
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
      : { driver: 'fs', base: './.linotype/cache' },
    },
  },

  // ssr: true,
  srcDir: 'src',

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

  extends: [
    '@nuxt/ui-pro'
  ],
  
  modules: [
    '@nuxt/ui',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    'nuxt-og-image',
    '@linotype/nuxt'
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

  telemetry: true,
  devtools: { enabled: true },
  typescript: { strict: false }
})
