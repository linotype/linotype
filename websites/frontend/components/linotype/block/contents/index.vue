<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700 px-10 py-20">
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
        <div v-if="props.blockData?.actions" class="mt-10 flex flex-col sm:flex-row gap-5 items-center justify-start gap-x-6">
          <template v-for="action in props.blockData.actions" :key="action">
            <LinotypeThemeUiButton v-if="action?.title" :title="action.title" :link="action.link" :theme="action.style" />
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
    intro: string
    contents: string
    align: string
  }
}>()

</script>
