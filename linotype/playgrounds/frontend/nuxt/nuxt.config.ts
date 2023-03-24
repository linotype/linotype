export default defineNuxtConfig({

  modules: [
    //Linotype module declaration
    '@linotype/nuxt'
  ],
  
  // Default Linotype settings
  linotype: {
    env: process.env.LINOTYPE_ENV,
    debug: process.env.LINOTYPE_DEBUG,
    backend_url: process.env.LINOTYPE_BACKEND_URL,
    backend_token: process.env.LINOTYPE_BACKEND_TOKEN,
  },
  
  //playground
  srcDir: 'src',
  app: {
    rootId: 'linotype',
  }

});
