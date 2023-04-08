<template>
  <component
    :is="loadBlock(footer.type)"
    v-for="footer in footers"
    :key="`${footer.type}-${footer.id}`"
    :block-id="footer.id"
    :block-type="footer.type"
    :block-data="footer.data || {}"
  />
</template>

<script lang="ts" setup>
import useLinotype from "../composables/useLinotype"
const { footers, loadBlock } = useLinotype();
</script>
