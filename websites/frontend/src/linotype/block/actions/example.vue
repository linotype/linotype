<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" class="flex items-center relative w-full isolate overflow-hidden bg-gray-900 py-24 mb-20 sm:py-32 md:pr-[30%]" :data-reference="props.blockData.reference">
    <div v-if="props.blockData?.style === 'diagonal_cut'" class="absolute z-10 left-0 right-0 top-0 h-[5%]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 10" preserveAspectRatio="none" class="absolute top-[-1px] left-0 right-0 bottom-0 fill-white w-full h-full">
        <polygon points="0 10 200 0 0 0" />
      </svg>
    </div>
    <div v-if="props.blockData.gradiant === 'black__bottom_to_top'" class="absolute inset-0 -z-5" style="background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));"></div>
    <div v-else-if="props.blockData.gradiant === 'black__left_to_right'" class="absolute inset-0 -z-5" style="background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));"></div>
    <LinotypeImage
      v-if="props.blockData.image"
      class="relative inset-0 -z-10 h-full w-full"
      class-image="relative inset-0 -z-10 h-full w-full object-cover"
      :sources="[
        {
          source: props.blockData.image,
          size: [2000, 0],
          fit: 'cover',
          quality: 90,
          format: ['webp','jpeg']
        },
        {
          source: props.blockData.image,
          breakpoint: 800,
          size: [800, 0],
          fit: 'cover',
          quality: 90,
          format: ['webp','jpeg']
        },
      ]"
    />
    <div 
      class="relative z-1 mx-auto max-w-[900px] px-8"
      :class="[
        props.blockData?.style === 'diagonal_cut' && 'pt-10',
        ! props.blockData?.theme ||
        props.blockData?.theme === 'dark' && '[&>*]:text-white',
        props.blockData?.theme === 'light' && '[&>*]:text-black',
        props.blockData?.theme === 'primary' && '[&>*]:text-primary',
        props.blockData?.theme === 'secondary' && '[&>*]:text-secondary',
      ]"
    >
      <div class="mx-auto  lg:mx-0">
        <LinotypeThemeUiLabel :title="props.blockData.surtitle" />
        <component :is="`${props.blockData.title_tag || 'h3'}`" class="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          <div v-html="props.blockData.title"/>
        </component>
        <div class="mt-6 text-lg leading-8" v-html="props.blockData.description"/>
        <div v-if="props.blockData.actions" class="mt-10 flex flex-col sm:flex-row gap-5 items-start justify-start gap-x-6">
          <template v-for="actions in props.blockData.actions" :key="actions">
            <LinotypeThemeUiButton :title="actions.title" :link="actions.link" :theme="actions.style" />
          </template>
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
    surtitle: string
    title: string
    title_tag: string
    description: string
    theme: string
    style: string
    gradiant: string
    image: object
    actions: {
      title: string
      link: string
      style: string
    }[]
  }
}>()

</script>
