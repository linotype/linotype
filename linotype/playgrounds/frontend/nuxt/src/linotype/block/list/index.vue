<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <div flex flex-col gap-2 py-2>
      <div v-for="(item, index) in props.blockData.items" :key="index" bg-gray-200 p-2>
        <h1 v-html="item.title"/>
        <div v-html="item.description"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    title: string
    items: {
      title: string
      description: string
    }[]
  }
}>()
</script>