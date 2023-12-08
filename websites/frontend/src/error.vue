<template>
  <LinotypeTemplate>
    <LinotypeHeader/>
    <UPageError :error="error" />
    <LinotypeFooter/>
  </LinotypeTemplate>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

</script>