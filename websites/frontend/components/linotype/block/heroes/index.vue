<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" class="relative z-0" :data-reference="props.blockData?.reference">
    <ULandingHero>
      
      <template #title>
        <div v-html="props.blockData?.title"/>
      </template>
      
      <template #description>
        <div v-html="props.blockData?.description"/>
      </template>

      <template #default>
        <LinotypeImage
          v-if="props.blockData.image_dark"
          class="hidden dark:block w-full"
          :sources="[
            {
              source: props.blockData.image_dark,
              size: [2000, 0],
              fit: 'cover',
              quality: 90,
              format: ['webp','jpeg']
            },
            {
              source: props.blockData.image_dark,
              breakpoint: 800,
              size: [800, 0],
              fit: 'cover',
              quality: 90,
              format: ['webp','jpeg']
            },
          ]"
        />
        <LinotypeImage
          v-if="props.blockData.image_light"
          class="block dark:hidden w-full"
          :sources="[
            {
              source: props.blockData.image_light,
              size: [2000, 0],
              fit: 'cover',
              quality: 90,
              format: ['webp','jpeg']
            },
            {
              source: props.blockData.image_light,
              breakpoint: 800,
              size: [800, 0],
              fit: 'cover',
              quality: 90,
              format: ['webp','jpeg']
            },
          ]"
        />
      </template>
      
    </ULandingHero>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    surtitle: string | null
    title: string | null
    description: string | null
    style: string | null
    actions: {
      title: string | null
      link: string
      style: string
    }[]
    image_light: object
    image_dark: object
    fullheight: boolean
    offset: number
  };
}>()

</script>
