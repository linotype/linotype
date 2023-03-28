<template>
  <div
    id="linotype"
    class="relative"
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
import { watch } from "vue";
import { useRoute, showError, useHead } from "nuxt/app"
import useLinotype from "./../composables/useLinotype"

const {
  config,
  loadBlock,
  website,
  page,
  headers,
  contents,
  footers,
  error,
} = useLinotype();

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

const seo_title =
  page?.value?.seo?.title ||
  website.value.name + ' - ' + page?.value?.title ||
  'title';
const seo_description = page?.value?.seo?.description || '';
const seo_url = page?.value?.url || '';
const seo_image = page?.value?.seo?.image?.filename_disk
  ? config.public.linotype.backend_url +
    '/assets/' +
    page.value.seo.image.filename_disk +
    '?width=1500&height=780'
  : '';

const favicon = website.value?.infos?.favicon?.filename_disk ? config.public.linotype.backend_url + '/assets/' + website.value?.infos?.favicon?.filename_disk : ''

useHead({
  title: seo_title,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  htmlAttrs: {
    lang: 'fr',
  },
  meta: [  
    { name: 'title', content: seo_title },
    { name: 'description', content: seo_description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: seo_url },
    { property: 'og:title', content: seo_title },
    { property: 'og:description', content: seo_description },
    { property: 'og:image', content: seo_image },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: seo_url },
    { property: 'twitter:title', content: seo_title },
    { property: 'twitter:description', content: seo_description },
    { property: 'twitter:image', content: seo_image },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-title', content: 'linosite' },
    { name: 'application-name', content: 'linosite' },
    { name: 'msapplication-TileColor', content: '#1e1d1d' },
    { name: 'theme-color', content: '#1e1d1d' },
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: favicon },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: favicon },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: favicon },
    // { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#1e1d1d' }
  ]
});

</script>
