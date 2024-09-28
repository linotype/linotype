<template>
    <slot />
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { createError } from "#app"
import { useHead, useSeoMeta } from "@unhead/vue"
import useLinotype from "./../composables/useLinotype"

const { config, website, page, error } = useLinotype();

const head_title =  page?.seo?.title || website?.seo?.title || website?.name + ' - ' + page?.title || ''
const head_description =  page?.seo?.description || website?.seo?.description || ''
const head_image =  page?.seo?.image ? config.public.linotype.backend_url + '/assets/' + page.seo.image + '?format=jpg&width=1500&height=780' : '' || website?.seo?.image ? config.public.linotype.backend_url + '/assets/' + website.seo.image + '?format=jpg&width=1500&height=780' : ''
const head_favicon =  website?.favicon ? config.public.linotype.backend_url + '/assets/' + website.favicon + '?width=250&height=250' : ''

useSeoMeta({
  title: head_title,
  ogTitle: head_title,
  description: head_description,
  ogDescription: head_description,
  ogImage: head_image,
  ogImageSecureUrl:head_image,
  ogImageType:'image/jpeg',
  ogImageWidth: '1500',
  ogImageHeight: '780',
  ogImageAlt: head_title,
  twitterCard: 'summary_large_image',
  appleMobileWebAppTitle: head_title,
  applicationName: head_title,
  msapplicationTileColor: '#1e1d1d',
  themeColor: '#1e1d1d',
})

useHead({
  htmlAttrs: { lang: website?.locale || 'en' },
  link: [
    { rel: 'canonical', href: page?.url || '' },
    head_favicon && { rel: 'apple-touch-icon', sizes: '180x180', href: head_favicon },
    head_favicon && { rel: 'icon', sizes: '32x32', href: head_favicon },
    head_favicon && { rel: 'icon', sizes: '16x16', href: head_favicon },
  ],
  meta: website?.metas || [],
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
