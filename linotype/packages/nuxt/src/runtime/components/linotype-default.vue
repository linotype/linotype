<template>
  <div
    :id="'block-' + props.blockId"
    class="block"
    :class="props.blockType"
    :data-ref="props.blockData?.reference"
  >
    <LinotypeDump
      :title="'Block ' + props.blockType + ': Missing block'"
      :data="props.blockData"
      :show="true"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number;
  blockType: string;
  blockData: {
    reference: string;
  };
}>();
</script>
