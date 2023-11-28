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

load({
  ...import.meta.glob(['~/components/linotype/**/*.vue', '!**/*.story.vue']), 
  ...import.meta.glob(['~/linotype/**/*.vue', '!**/*.story.vue'])
})

</script>