export default defineNuxtConfig({

  modules: [
    //Linotype module declaration
    '@linotype/nuxt',
    //for playground tests
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-vitest',
    'nuxt-icon',
    //for playground debug
    '@nuxt/devtools',
  ],
  
  // Default Linotype settings
  linotype: {
    env: process.env.LINOTYPE_ENV,
    debug: process.env.LINOTYPE_DEBUG,
    backend_url: process.env.LINOTYPE_BACKEND_URL,
    backend_token: process.env.LINOTYPE_BACKEND_TOKEN,
  },
  
  //allow linotype route cors
  routeRules: {
    '/linotype/**': { 
      cors: true,
      headers: { 
        'Acess-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Credentials': true,
      }
    }
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
  app: {
    rootId: 'linotype',
  },

  devtools: {
    enabled: true
  }

});
