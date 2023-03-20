export default defineNuxtConfig({

  modules: [
    //load linotype module
    '@linotype/nuxt'
  ],
  
  // default linotype settings
  linotype: {
    
  },
  
  components: {
    dirs: [
    
      // linotype load componment from variable names, you need to import them globaly
      { "path": "~/linotype", "global": true }
    
    ]
  },
  
  runtimeConfig: {
    public: {
      
      //define linotype public env variables
      LINOTYPE_ENV: process.env.LINOTYPE_ENV,
      LINOTYPE_DEBUG: process.env.LINOTYPE_DEBUG,
      LINOTYPE_DIRECTUS_URL: process.env.LINOTYPE_DIRECTUS_URL,
    
    },
    private: {
      
      //define linotype private env variables
      LINOTYPE_DIRECTUS_TOKEN: process.env.LINOTYPE_DIRECTUS_TOKEN,
    
    }
  },

  //custom settings not useful for linotype
  srcDir: 'src',
  app: {
    rootId: 'linotype',
  }

});
