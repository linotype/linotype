export default defineNuxtConfig({

  modules: [
    //Linotype module declaration
    '@linotype/nuxt'
  ],
  
  // Default Linotype settings
  linotype: {
    env: process.env.LINOTYPE_ENV,
    debug: process.env.LINOTYPE_DEBUG,
    directus_url: process.env.LINOTYPE_DIRECTUS_URL,
    directus_token: process.env.LINOTYPE_DIRECTUS_TOKEN,
  },
  
  //playground
  srcDir: 'src',
  app: {
    rootId: 'linotype',
  }

});
