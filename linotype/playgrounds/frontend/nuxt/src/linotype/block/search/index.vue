<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="props.blockType" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <h1>Search for "{{query}}"</h1>
    <input type="text" v-model="input" @keyup.enter="goSearch"/>
    <div flex flex-row gap-2 py-2>
      <div v-for="(item, index) in results" :key="index">
        <NuxtLink :to="item?.slug">{{item?.title}}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'nuxt/app';
import { ref } from 'vue';

const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    title: string
  }
}>()

const route = useRoute()
const results: ref<Object[]> = ref([])
const query: ref<string> = ref(route.query.query)
const input: ref<string> = ref(query.value)

const search = async () => {
  const { data } = await useFetch('/linotype/search', {
    query: {
      search: input.value
    }
  })
  query.value = input.value
  results.value = data.value
}

const goSearch = async () => {
  navigateTo({
    path: '/search',
    force: true,
    query: {
      query: input.value
    }
  })
}

watch(route, async () => {
  input.value = route.query.query
  query.value = route.query.query
  await search()
})

await search()

</script>
