<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" class="bg-white pb-24 sm:pb-32" :data-reference="props.blockData.reference">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div v-for="features, index in splitArray(props.blockData.features, props.blockData.columns )" :key="index" class="flex flex-col mx-auto pt-16 max-w-2xl sm:pt-20 lg:pt-24 lg:max-w-none">
        <div class="hidden sm:flex sm:flex-row justify-around items-center max-w-xl gap-x-8 gap-y-16 lg:max-w-none">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="columns flex flex-col flex-1 items-center max-sm:!max-w-full"
            :style="{
              // maxWidth: `${100/props.blockData.columns}%`
              maxWidth: `${props.blockData.width}px`
            }"
          >
            <LinotypeImage
              v-if="feature.linotype_block__feature_id.image"
              class="w-full pb-4"
              class-image="relative h-full w-full object-contain"
              :style="{
                maxWidth: `${feature.linotype_block__feature_id.size}px`,
                // maxHeight: `${feature.linotype_block__feature_id.size}px`
              }"
              :sources="[
                {
                  source: feature.linotype_block__feature_id.image,
                  size: [feature.linotype_block__feature_id.size, feature.linotype_block__feature_id.size],
                  fit: 'contain',
                  quality: 90,
                  format: ['png', 'webp']
                }
              ]"
            />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-around max-w-xl gap-x-8 gap-y-16 lg:max-w-none">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="columns flex flex-col flex-1 items-center max-sm:!max-w-full"
            :style="{
              // maxWidth: `${100/props.blockData.columns}%`
              maxWidth: `${props.blockData.width}px`
            }"
          >
            <LinotypeImage
              v-if="feature.linotype_block__feature_id.image"
              class="sm:hidden w-full pb-4"
              class-image="relative h-full w-full object-contain"
              :style="{
                maxWidth: `${feature.linotype_block__feature_id.size}px`,
                // maxHeight: `${feature.linotype_block__feature_id.size}px`
              }"
              :sources="[
                {
                  source: feature.linotype_block__feature_id.image,
                  size: [feature.linotype_block__feature_id.size, feature.linotype_block__feature_id.size],
                  fit: 'contain',
                  quality: 90,
                  format: ['png', 'webp']
                }
              ]"
            />
            <h2 class="flex flex-col items-center text-2xl font-semibold leading-7 text-gray-900 mt-6">
              {{ feature.linotype_block__feature_id.title }}
            </h2>
            <div class="flex flex-auto flex-col items-center text-base leading-7 text-gray-400 mt-4">
              <div class="flex-auto text-center" v-html="feature.linotype_block__feature_id.description" />
              <div v-if="feature.linotype_block__feature_id.actions" class="mt-4 flex items-center justify-center gap-x-6">
                <template v-for="action in feature.linotype_block__feature_id.actions" :key="action">
                  <LinotypeThemeUiButton :title="action.title" :link="action.link" :theme="action.style" mode="light" />
                </template>
              </div>
            </div>
          </div>
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
    features: {
      title: string
      description: string
      icon: string
      button_label: string
      button_url: string
    }[]
    columns: string
    width: number
  }
}>()

const splitArray = (array: any, count: number) => {
  const result = []
  if (array && array.length) {
    for (let i = 0; i < array.length; i += count) {
      result.push(array.slice(i, i + count))
    }
  }
  return result
}

</script>
