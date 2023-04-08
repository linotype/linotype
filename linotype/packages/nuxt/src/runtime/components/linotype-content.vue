<template>
  <component
    :is="loadBlock(content.type)"
    v-for="content in contents"
    :key="`${content.type}-${content.id}`"
    :block-id="content.id"
    :block-type="content.type"
    :block-data="content.data || {}"
  />
</template>

<script lang="ts" setup>
import useLinotype from "../composables/useLinotype"
const { contents, loadBlock } = useLinotype()
</script>
