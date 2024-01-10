<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" bg-gray-100 m-5 p-5>
    <div class="flex flex-row gap-1">
      <div v-for="ancestor in page.ancestors" :key="ancestor.slug">
        <NuxtLink :to="ancestor.slug">{{ancestor.title}}</NuxtLink>
      </div>
      <div>{{page.title}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { page } = useLinotype()

const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
  }
}>()
</script>