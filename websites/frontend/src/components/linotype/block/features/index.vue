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
    features: {
      title: string
      description: string
      icon: string
      button_label: string
      button_url: string
    }[]
    columns: string
    width: number
  }
}>()

</script>
