<template>
  <component
    :is="loadBlock(header.type)"
    v-for="header in headers"
    :key="`${header.type}-${header.id}`"
    :block-id="header.id"
    :block-type="header.type"
    :block-data="header.data || {}"
  />
</template>

<script lang="ts" setup>
import useLinotype from "../composables/useLinotype"
const { headers, loadBlock } = useLinotype();
</script>
