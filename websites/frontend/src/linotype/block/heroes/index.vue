<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <LinotypeHelper :title="`BLOCK: ${props.blockType} / ID: ${props.blockId} / REF: ${props.blockData.reference}`" :data="props.blockData">
      <LinotypeBlockHeroesExample v-bind="props"/>
    </LinotypeHelper>
    <!-- start coding here -->
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    surtitle: string | null
    title: string | null
    description: string | null
    style: string | null
    actions: {
      title: string | null
      link: string
      style: string
    }[]
    background: object
    fullheight: boolean
    offset: number
  };
}>()

</script>
