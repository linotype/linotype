<template>
  <div
    class="linotype-template"
    
  >
    <component
      :is="loadBlock(header.type)"
      v-for="header in headers"
      :key="route.params.slug + '--' + header.id"
      :block-id="header.id"
      :block-type="header.type"
      :block-data="header.data || {}"
    />
    <component
      :is="loadBlock(content.type)"
      v-for="content in contents"
      :key="route.params.slug + '--' + content.id"
      :block-id="content.id"
      :block-type="content.type"
      :block-data="content.data || {}"
    />
    <component
      :is="loadBlock(footer.type)"
      v-for="footer in footers"
      :key="route.params.slug + '--' + footer.id"
      :block-id="footer.id"
      :block-type="footer.type"
      :block-data="footer.data || {}"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { useRoute, showError } from "nuxt/app"
import { useHead } from "@unhead/vue"
import useLinotype from "./../composables/useLinotype"

const {
  loadLinotype,
  config,
  loadBlock,
  website,
  page,
  headers,
  contents,
  refresh,
  footers,
  error,
} = useLinotype();

await loadLinotype()

const checkError = () => {
  if (error.value)
    throw showError({
      statusCode: 404,
      statusMessage: String(error.value),
      fatal: true,
    });
};
watch(error, checkError);
checkError();

const route = useRoute();

// if ( website.value?.name ) {
    
//   const seo_title = computed(() => page?.value?.seo?.title || website.value.name + ' - ' + page?.value?.title || 'title' );
//   const seo_description = computed(() => page?.value?.seo?.description || '');
//   const seo_url = computed(() => page?.value?.url || '');
//   const seo_image = computed(() => page?.value?.seo?.image?.filename_disk ? config.DIRECTUS_URL + '/assets/' + page.value.seo.image.filename_disk + '?width=1500&height=780' : '' );

//   const favicon = computed(() => website.value?.infos?.favicon?.filename_disk ? config.DIRECTUS_URL + '/assets/' + website.value?.infos?.favicon?.filename_disk : '')

//   useHead({
//     title: computed(() => seo_title.value ),
//     htmlAttrs: {
//       lang: 'en',
//     },
//     meta: [  
//       { name: 'title', content: computed(() => seo_title.value ) },
//       { name: 'description', content: computed(() => seo_description.value ) },
//       { property: 'og:type', content: 'website' },
//       { property: 'og:url', content: computed(() => seo_url.value ) },
//       { property: 'og:title', content: computed(() => seo_title.value ) },
//       { property: 'og:description', content: computed(() => seo_description.value ) },
//       { property: 'og:image', content: computed(() => seo_image.value ) },
//       { property: 'twitter:card', content: 'summary_large_image' },
//       { property: 'twitter:url', content: computed(() => seo_url.value ) },
//       { property: 'twitter:title', content: computed(() => seo_title.value ) },
//       { property: 'twitter:description', content: computed(() => seo_description.value ) },
//       { property: 'twitter:image', content: computed(() => seo_image.value ) },
//       { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
//       { name: 'charset', content: 'utf-8' },
//       { name: 'apple-mobile-web-app-title', content: 'lacteol' },
//       { name: 'application-name', content: 'lacteol' },
//       { name: 'msapplication-TileColor', content: '#1e1d1d' },
//       { name: 'theme-color', content: '#1e1d1d' },
//     ],
//     link: [
//       { rel: 'apple-touch-icon', sizes: '180x180', href: computed(() => favicon.value ) },
//       { rel: 'icon', type: 'image/png', sizes: '32x32', href: computed(() => favicon.value ) },
//       { rel: 'icon', type: 'image/png', sizes: '16x16', href: computed(() => favicon.value ) },
//       { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#1e1d1d' }
//       // { rel: 'manifest', href: '/site.webmanifest' },
//     ]
//   })

// }

</script>
