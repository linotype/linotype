<template>
  <div
    v-if="props.title"
    class="relative inline rounded-full px-3 py-1 text-sm leading-6 text-primary ring-1 ring-primary cursor-default"
  >
    {{ props.title }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string | null;
}>()

</script>
