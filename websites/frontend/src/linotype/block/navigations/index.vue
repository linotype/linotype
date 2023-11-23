<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <LinotypeHelper :title="`BLOCK: ${props.blockType} / ID: ${props.blockId} / REF: ${props.blockData.reference}`" :data="props.blockData">
      <LinotypeBlockNavigationsExample v-bind="props"/>
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
    title: string
    logo: object
    logo_size: number
    position: string
    menu: {
      title: string
      url: string
      page: any
      style: string
      children: {
        title: string
        url: string
        icon: string
        description: string
      }[]
    }[]
  }
}>()

</script>
