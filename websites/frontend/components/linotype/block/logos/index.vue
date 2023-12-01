<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <!-- start coding here -->
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number;
  blockType: string;
  blockData: {
    reference: string
    logos: {
      icon: {
        key: string
        collection: string
      }
      icon_height: number
      name: string
      link: string
    }[]
  }
}>()

</script>
