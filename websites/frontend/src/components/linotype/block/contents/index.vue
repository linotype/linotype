<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">

    <UPage class="max-w-md mx-auto px-5">
      
      <UPageHeader>
        <template #title>
          <div v-html="props.blockData.title"/>
        </template>
        <template #description>
          <div v-html="props.blockData.intro"/>
        </template>
      </UPageHeader>

      <UPageBody prose>
        <div v-html="props.blockData.contents"/>
      </UPageBody>

    </UPage>
    
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
    intro: string
    contents: string
    align: string
  }
}>()

</script>
