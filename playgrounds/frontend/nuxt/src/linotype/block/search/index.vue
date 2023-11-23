<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <h1>Search for "{{input}}"</h1>
    <input type="text" v-model="input"/>
    <div flex flex-row gap-2 py-2>
      <div v-for="(item, index) in data" :key="index">
        <NuxtLink :to="item?.slug">{{item?.title}}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import { Ref } from 'vue';

const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    title: string
  }
}>()

const route = useRoute()

const input: Ref<string | any> = ref(route.query.query || '')
  
const { getSearch } = useBackend() 
const { data } = await getSearch(input)

watch(route, () => input.value = route.query.query)

</script>
