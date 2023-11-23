<template>
  <div id="linotype-toolbar">
    <a
      :href="'/'"
      aria-label="home"
    >Home</a> - {{ domain }}/{{ route.params.slug }}
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "#app"
import useDomain from "./../composables/useDomain"

const route = useRoute();
const { domain } = useDomain();
</script>

<style>
#linotype-toolbar {
  position: relative;
  padding: 1rem;
  margin-bottom: 0.1rem;
  background: #333;
  color: #cdcbcb;
}

#linotype-toolbar a {
  color: #fff;
  text-decoration: none;
}
</style>
