<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" class="relative z-0" :data-reference="props.blockData?.reference">
    <div v-if="props.blockData?.style === 'diagonal_cut'" class="absolute z-10 left-0 right-0 bottom-0 h-[5%]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 10" preserveAspectRatio="none" class="absolute top-[1px] bottom-0 left-0 right-[10px] fill-white w-full h-full">
        <polygon points="0 0 200 10 0 10" />
      </svg>
    </div>
    <div
      class="flex flex-col items-center justify-center relative isolate overflow-hidden bg-gray-900"
      :class="[
        props.blockData.fullheight && 'min-h-[100vh]'
      ]"
      :style="{
        marginBottom: `${props.blockData?.offset ? 0 - props.blockData?.offset : 0}px`
      }"
    >
      <div class="absolute inset-0 -z-5" style="background: linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));"></div>
      <LinotypeImage
        v-if="props.blockData.background"
        class="absolute inset-0 -z-10 h-full w-full"
        class-image="absolute inset-0 -z-10 h-full w-full object-cover"
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

      <div
        class="relative z-10 flex px-6 lg:px-8"
        :style="{
          paddingBottom: `${props.blockData?.offset || 0}px`
        }"
      >
        <div class="max-w-2xl py-32">
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <LinotypeThemeUiLabel :title="props.blockData?.surtitle" />
          </div>
          <div class="text-center">
            <h1 v-if="props.blockData?.title" class="text-4xl font-bold tracking-tight text-white sm:text-6xl" v-html="props.blockData.title" />
            <div v-if="props.blockData?.description" class="mt-6 text-lg leading-8 text-gray-300" v-html="props.blockData.description" />
            <div v-if="props.blockData?.actions" class="mt-10 flex flex-col sm:flex-row gap-5 items-center justify-center gap-x-6">
              <template v-for="action in props.blockData.actions" :key="action">
                <LinotypeThemeUiButton v-if="action?.title" :title="action.title" :link="action.link" :theme="action.style" />
              </template>
            </div>
          </div>
        </div>
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
    surtitle: string | null
    title: string | null
    description: string | null
    style: string | null
    actions: {
      title: string | null
      link: string
      style: string
    }[]
    background: object
    fullheight: boolean
    offset: number
  };
}>()

</script>
