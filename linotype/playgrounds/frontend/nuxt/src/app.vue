<template>
  <div>
    <LinotypeHeader/>
    <NuxtPage 
      :transition="{
        name: 'fade',
        mode: 'out-in'
      }"
    />
    <LinotypeFooter/>
  </div>
</template>

<script setup>
const { loadLinotype } = useLinotype()
await loadLinotype()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>