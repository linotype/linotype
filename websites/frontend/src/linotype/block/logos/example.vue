<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" class="relative z-1 pb-8" :data-reference="props.blockData?.reference">
      <div class="flex flex-row w-full justify-center items-center gap-16">
        <NuxtLink v-for="logo in props.blockData.logos" :key="logo.name" :to="logo.link" target="_blank" rel="nofollow" class="flex flex-col items-center cursor-pointer">
          <LinotypeImage
            v-if="logo.icon.key"
            class="relative mb-2"
            :style="{
              width: 'auto',
              height: `${logo.icon_height || 50}px`
            }"
            :sources="[
              {
                source: { id: logo.icon.key },
                size: [800, 500],
                fit: 'cover',
                quality: 90,
                format: ['webp','jpeg']
              },
            ]"
          />
          {{ logo.name }}
        </NuxtLink>
      </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number;
  blockType: string;
  blockData: {
    reference: string
    logos: {
      icon: {
        key: string
        collection: string
      }
      icon_height: number
      name: string
      link: string
    }[]
  }
}>()

</script>
