export default defineNuxtConfig({

  modules: [
    //Linotype module declaration
    '@linotype/nuxt',
    //for minimal playground style
    '@unocss/nuxt',
  ],
  
  // Default Linotype settings
  linotype: {
    env: process.env.LINOTYPE_ENV,
    debug: process.env.LINOTYPE_DEBUG,
    backend_url: process.env.LINOTYPE_BACKEND_URL,
    backend_token: process.env.LINOTYPE_BACKEND_TOKEN,
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
  }

});
