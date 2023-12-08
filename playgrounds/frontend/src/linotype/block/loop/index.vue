<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" bg-gray-100 m-5 p-5>
    <h1>loop</h1>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <div flex flex-col gap-2 py-2>
      <LinotypeDump title="dump" :data="props" :show="true"/>
      <h2>Featured</h2>
      <div v-for="item in props.blockData.articles" :key="item.id" bg-gray-200 p-2>
        <h1 v-html="item.articles_id.title"/>
        <div v-html="item.articles_id.content"/>
        <!-- <NuxtLink :to="`/article${item.slug}`">view</NuxtLink> -->
      </div>
      <h2>All</h2>
      <div v-for="(item, index) in data.data" :key="index" bg-gray-200 p-2>
        <div v-html="item.title"/>
        <NuxtLink :to="`/blog/article${item.slug}`">view</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetch, useRuntimeConfig } from '#app'

const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    collection: string
    template: string
    articles: object
  }
}>()

const config = useRuntimeConfig()

const { data } = await useFetch(`${config.public.linotype.backend_url}/items/${props.blockData.collection}`)

</script>