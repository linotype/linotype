<template>
  <div>
    Linotype block "test" loaded with success
    <div v-for="(item, index) in props.blockData.items" :key="index">
      <h1 v-html="item.title"/>
      <div v-html="item.description"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    items: {
      title: string
      description: string
    }[]
  }
}>()
</script>
