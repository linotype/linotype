<template>
  <transition name="linotype-loading-fade">
    <div
      v-show="loading"
      class="linotype-loading"
    />
  </transition>
</template>

<script lang="ts" setup>
import useLinotype from "./../composables/useLinotype"
const { loading } = useLinotype();
</script>

<style>
.linotype-loading {
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: 1000;
}

/* .linotype-loading-fade-enter-active, */
.linotype-loading-fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.linotype-loading-fade-enter-from,
.linotype-loading-fade-leave-to {
  opacity: 0;
}

</style>