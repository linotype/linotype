<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="props.blockType" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <div flex flex-row gap-2 py-2>
      <div v-for="(item, index) in props.blockData.menu" :key="index">
        <NuxtLink :to="item.link">{{item.title}}</NuxtLink>
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
    menu: {
      title: string
      link: string
    }[]
  }
}>()
</script>
