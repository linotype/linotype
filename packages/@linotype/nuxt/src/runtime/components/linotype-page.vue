<template>
  <div class="linotype-page">
    <LinotypeLoading />
    <LinotypeHeader />
    <NuxtPage />
    <LinotypeFooter />
  </div>
</template>

<script lang="ts" setup>
import useLinotype from "./../composables/useLinotype"

const { load } = useLinotype();

const components = import.meta.glob('~/components/linotype/**/*.vue')

load(components)

</script>