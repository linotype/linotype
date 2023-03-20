<template>
  <component
    :is="loadBlock(props.blockType)"
    :block-id="props.blockId"
    :block-type="props.blockType"
    :block-data="props.blockData"
  />
</template>

<script lang="ts" setup>
import useLinotype from "./../composables/useLinotype"

const { loadBlock } = useLinotype();

const props = defineProps({
  blockId: {
    type: Number || null,
    default: null,
    require: true,
  },
  blockType: {
    type: String || null,
    default: null,
    require: true,
  },
  blockData: {
    type: Object,
    default: () => { return {} },
    require: false,
  },
});
</script>
