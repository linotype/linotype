<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <div
      class="flex bg-white px-6 pb-0 md:pb-20 lg:px-8"
      :class="[
        props.blockData.position === 'left' && 'flex-col md:flex-row items-center',
        props.blockData.position === 'right' && 'flex-col md:flex-row-reverse items-center',
        props.blockData.position === 'center' && 'flex-col items-center',
      ]"
    >
      <div v-if="props.blockData.position === 'center'" class="flex  flex-1  py-10 md:p-10">
        <div class="flex flex-col mx-auto max-w-3xl text-base leading-7 text-gray-700 items-center justify-center md:justify-start">
          <LinotypeThemeUiLabel v-if="props.blockData.surtitle" :title="props.blockData.surtitle" />
          <h1 v-if="props.blockData.title" class="inline-flex text-center mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" v-html="props.blockData.title" />
        </div>
      </div>

      <div class="flex">
        <LinotypeImage
          v-if="props.blockData.image"
          class="relative"
          :sources="[
            {
              source: props.blockData.image,
              size: [800, 500],
              fit: 'cover',
              quality: 90,
              format: ['webp','jpeg']
            },
            {
              source: props.blockData.image,
              breakpoint: 400,
              size: [400, 250],
              fit: 'cover',
              quality: 90,
              format: ['webp','jpeg']
            },
          ]"
        />
      </div>

      <div class="flex  flex-1 py-10 md:p-10">
        <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700 justify-center md:justify-start">
          <LinotypeThemeUiLabel v-if="props.blockData.surtitle && props.blockData.position !== 'center'" :title="props.blockData.surtitle" />
          <h1 v-if="props.blockData.title && props.blockData.position !== 'center'" class="flex text-center mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" v-html="props.blockData.title" />
          <div v-if="props.blockData.description" class="flex prose mt-5 max-w-2xl" v-html="props.blockData.description" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number;
  blockType: string;
  blockData: {
    reference: string
    image: string
    position: string
    surtitle: string
    title: string
    description: string
  }
}>()

</script>
