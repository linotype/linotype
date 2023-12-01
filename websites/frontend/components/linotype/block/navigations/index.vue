<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    
    <UHeader :links="menu">
      <template #logo>
        LINOTYPE
      </template>
      
      <template #left>
      </template>

      <template #right>
        <!-- <UDocsSearchButton :label="null" /> -->

        <UColorModeButton />

        <UButton to="https://github.com/linotype" target="_blank" icon="i-simple-icons-github" color="gray" variant="ghost" />
      </template>

      <template #panel>
        <UNavigationTree :links="menu" />
      </template>
    </UHeader>
    
    <ClientOnly>
      <LazyUDocsSearch  />
    </ClientOnly>
    
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

const menu = props.blockData.menu.map(item => {
  if( item.target == '_self' ) {
    delete item.target
  }
  return item
})

</script>



