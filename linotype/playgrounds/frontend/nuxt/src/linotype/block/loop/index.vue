<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <div flex flex-col gap-2 py-2>
      <div v-for="(item, index) in items" :key="index" bg-gray-200 p-2>
        <div v-html="item.html"/>
        <NuxtLink :to="`/article${item.slug}`">view</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetch, useRuntimeConfig } from 'nuxt/app';
import { ref } from 'vue';

const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    collection: string
    template: string
  }
}>()

const config = useRuntimeConfig()

const items = ref<string[]>([])

const response = await useFetch(`${config.public.linotype.backend_url}/items/${props.blockData.collection}`)

const findReplaceString = (string: string, find: string, replace: string): string => {
  if ((/[a-zA-Z\_]+/g).test(string)) {
    return string.replace(new RegExp('\{\{(?:\\s+)?(' + find + ')(?:\\s+)?\}\}'), replace);
  } else {
    return string
  }
}

for ( const item of response.data?.value?.data ) {
  const ids = Object.keys(item)
  let html: string = props.blockData.template
  for ( const id of ids ) {
    html = findReplaceString(html, id, item[id] )
  }
  items.value.push({
    ...item,
    html: html
  })
}

</script>