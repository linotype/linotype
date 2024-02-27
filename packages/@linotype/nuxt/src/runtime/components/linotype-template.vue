<template>
  <slot />
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from "vue";
import { createError } from "#app"
import { useHead, useSeoMeta } from "@unhead/vue"
import useLinotype from "./../composables/useLinotype"

const { config, website, page, error } = useLinotype();

const head_name = computed(() => website.value?.name || '')
const head_title = computed(() => page.value?.seo?.title || website.value?.seo?.title || website.value?.name + ' - ' + page.value?.title || '')
const head_description = computed(() => page.value?.seo?.description || website.value?.seo?.description || '')
const head_image = computed(() => page.value?.seo?.image ? config.public.linotype.backend_url + '/assets/' + page.value.seo.image + '?width=1500&height=780' : '' || website.value?.seo?.image ? config.public.linotype.backend_url + '/assets/' + website.value.seo.image + '?width=1500&height=780' : '')
const head_favicon = computed(() => website.value?.favicon ? config.public.linotype.backend_url + '/assets/' + website.value.favicon + '?width=250&height=250' : '')

useSeoMeta({
  title: head_title,
  ogTitle: head_title,
  description: head_description,
  ogDescription: head_description,
  ogImage: head_image,
  twitterCard: 'summary_large_image',
  appleMobileWebAppTitle: head_title,
  applicationName: head_title,
  msapplicationTileColor: '#1e1d1d',
  themeColor: '#1e1d1d',
})

useHead({
  htmlAttrs: { lang: website.value?.locale || 'en' },
  link: [
    { rel: 'canonical', href: page.value?.url || '' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: head_favicon },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: head_favicon },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: head_favicon },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#1e1d1d' }
  ],
  meta: computed(() => website.value?.metas || []),
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
