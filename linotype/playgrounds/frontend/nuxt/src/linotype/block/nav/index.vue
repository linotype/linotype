<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="props.blockType" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <div flex flex-row gap-2 py-2>
      <div v-for="(item, index) in data" :key="index">
        <NuxtLink :to="item.slug">{{item.title}}</NuxtLink>
      </div>
      <input type="text" @keyup.enter="search" v-model="input"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    title: string
  }
}>()

const { data } = await useFetch('/linotype/menu')

const route = useRoute()
const query = computed( () => route.query.query )
const input = ref(query.value)

const search = () => {
  navigateTo({
    path: '/search',
    query: {
      query: input.value
    }
  })
}

</script>
