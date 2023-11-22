<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <h1>{{props.blockData.title}}</h1>
    <div>{{props.blockData.content}}</div>
    <LinotypeImage 
        v-if="props.blockData.background"
        class="absolute inset-0 -z-10 h-full w-full" 
        classImage="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" 
        :sources="[
          {
            source: props.blockData.background,
            size: [2000, 0],
            fit: 'cover',
            quality: 90,
            format: ['webp','jpeg']
          },
          {
            source: props.blockData.background,
            breakpoint: 800,
            size: [800, 0],
            fit: 'cover',
            quality: 90,
            format: ['webp','jpeg']
          },
        ]"
      />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    title: string
    content: string
  }
}>()
</script>