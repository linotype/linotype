<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <LinotypeHelper :title="`BLOCK: ${props.blockType} / ID: ${props.blockId} / REF: ${props.blockData.reference}`" :data="props.blockData">
      <!-- <LinotypeBlockActionsExample v-bind="props"/> -->
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
    surtitle: string
    title: string
    title_tag: string
    description: string
    theme: string
    style: string
    gradiant: string
    image: object
    actions: {
      title: string
      link: string
      style: string
    }[]
  }
}>()

</script>
