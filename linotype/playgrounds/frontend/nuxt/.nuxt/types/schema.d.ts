import { NuxtModule } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["linotype"]?: typeof import("@linotype/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("/Users/ynk/.nvm/versions/node/v16.17.0/lib/node_modules/@nuxt/devtools/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@linotype/nuxt", Exclude<NuxtConfig["linotype"], boolean>] | ["/Users/ynk/.nvm/versions/node/v16.17.0/lib/node_modules/@nuxt/devtools/module", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   private: {
      LINOTYPE_DIRECTUS_TOKEN: string,
   },
  }
  interface PublicRuntimeConfig {
   LINOTYPE_ENV: string,

   LINOTYPE_DEBUG: string,

   LINOTYPE_DIRECTUS_URL: string,
  }
}