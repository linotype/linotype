<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" class="bg-white px-6 pt-5 pb-20 lg:px-8" :data-reference="props.blockData.reference">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <div
        v-if="props.blockData.surtitle"
        :class="[
          `flex w-full mb-6`,
          props.blockData.align === 'left' && 'justify-start',
          props.blockData.align === 'center' && 'justify-center',
          props.blockData.align === 'right' && 'justify-end'
        ]"
      >
        <LinotypeThemeUiLabel :title="props.blockData.surtitle" />
      </div>
      <div
        :class="[
          props.blockData.align === 'left' && 'text-left',
          props.blockData.align === 'center' && 'text-center',
          props.blockData.align === 'right' && 'text-right'
        ]"
      >
        <h1 v-if="props.blockData.title" class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" v-html="props.blockData.title" />
        <div v-if="props.blockData.intro" class="mt-6 text-xl leading-8" v-html="props.blockData.intro" />
        <div v-if="props.blockData.contents" class="prose mt-10 max-w-full" v-html="props.blockData.contents" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  blockId: number;
  blockType: string;
  blockData: {
    reference: string
    surtitle: string
    title: string
    intro: string
    contents: string
    align: string
  }
}>()

</script>
