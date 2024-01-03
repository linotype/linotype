<template>
  <LinotypeTemplate>
    <LinotypeHeader/>
    <h2>{{ error.statusCode }}</h2>
    <button @click="handleError">back</button>
    <LinotypeFooter/>
  </LinotypeTemplate>
</template>

<script setup lang="ts">

const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

</script>