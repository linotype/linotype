<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <LinotypeHelper :title="`BLOCK: ${props.blockType} / ID: ${props.blockId} / REF: ${props.blockData.reference}`" :data="props.blockData">
      <LinotypeBlockFootersExample v-bind="props"/>
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
    socials_title: string
    socials_links: {
      icon: string
      icon_height: number
      name: string
      link: string
    }[]
    links: {
      title: string
      description: string
      url: string
      list: {
        title: string
        url: string
      }[]
    }[]
    infos: string
    sublinks: {
      title: string
      url: string
    }[]
  }
}>()

</script>
