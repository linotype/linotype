<template>
  <slot />
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from "vue";
import { createError } from "#app"
import { useHead, useSeoMeta } from "@unhead/vue"
import useLinotype from "./../composables/useLinotype"

const { config, website, page, error } = useLinotype();

const head_name = computed(() => website?.name || '')
const head_title = computed(() => page?.seo?.title || website?.seo?.title || website?.name + ' - ' + page?.title || '')
const head_description = computed(() => page?.seo?.description || website?.seo?.description || '');
const head_image = computed(() => {
  return page?.seo?.image ? config.public.linotype.backend_url + '/assets/' + page.seo.image + '?width=1500&height=780' : ''
      || website?.seo?.image ? config.public.linotype.backend_url + '/assets/' + website.seo.image + '?width=1500&height=780' : ''
});
const head_favicon = computed(() => website?.favicon ? config.public.linotype.backend_url + '/assets/' + website.favicon + '?width=250&height=250' : '')

useHead({
  title: head_title,
  meta: [  
    { name: 'title', content: head_title },
    { name: 'description', content: head_description },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { name: 'charset', content: 'utf-8' },
    { name: 'apple-mobile-web-app-title', content: head_name },
    { name: 'application-name', content: head_name },
    { name: 'msapplication-TileColor', content: '#1e1d1d' },
    { name: 'theme-color', content: '#1e1d1d' },
    ...(website?.metas || [])
  ],
  link: [
    { rel: 'canonical', href: page?.url || '' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: head_favicon },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: head_favicon },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: head_favicon },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#1e1d1d' }
    // { rel: 'manifest', href: '/site.webmanifest' },
  ],
  htmlAttrs: { lang: website?.locale || 'en_EN' }
})

useSeoMeta({
  title: head_title,
  ogTitle: head_title,
  description: head_description,
  ogDescription: head_description,
  ogImage: head_image,
  twitterCard: 'summary_large_image',
})

const checkError = () => {
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: String(error.value),
      fatal: true,
    })
  }
}
watch(error, checkError);
onMounted(() => checkError())

</script>
