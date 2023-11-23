<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <LinotypeHelper :title="`BLOCK: ${props.blockType} / ID: ${props.blockId} / REF: ${props.blockData.reference}`" :data="props.blockData">
      <LinotypeBlockTeamsExample v-bind="props"/>
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
    theme: string
    surtitle: string
    title: string
    description: string
    people: {
      avatar: string
      avatar_height: number
      name: string
      link: string
    }[]
  }
}>()

</script>
