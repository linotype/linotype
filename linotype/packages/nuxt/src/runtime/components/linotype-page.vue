<template>
  <div class="linotype-page">
    <LinotypeLoading />
    <LinotypeHeader />
    <NuxtPage
      :transition="{
        name: 'fade',
        mode: 'out-in'
      }"
    />
    <LinotypeFooter />
  </div>
</template>

<script setup>
import useLinotype from './../composables/useLinotype'
const { loadLinotype } = useLinotype()
await loadLinotype()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all .3s;
  opacity: 1;
  transform: translateY(0);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>