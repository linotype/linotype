<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <LinotypeHelper :title="`BLOCK: ${props.blockType} / ID: ${props.blockId} / REF: ${props.blockData.reference}`" :data="props.blockData">
      <LinotypeBlockFeaturesExample v-bind="props"/>
    </LinotypeHelper>
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
