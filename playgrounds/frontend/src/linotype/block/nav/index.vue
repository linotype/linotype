<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData?.reference}} ]</div>
    <div flex flex-row gap-2 py-2>
      <template v-for="menu, index in data" :key="index">
        <NuxtLink :to="menu?.slug">{{menu?.title}}</NuxtLink>
      </template>
      <NuxtLink to="/error-url-example">error</NuxtLink>
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

const route = useRoute()
const { getMenu } = useBackend()

const config = useRuntimeConfig()

const input = ref(route.query.query)

const { data } = await getMenu()

const search = () => {
  navigateTo({
    path: '/search',
    force: true,
    query: {
      query: input.value
    }
  })
}

watchEffect(() => {
  input.value = route.query.query
})

</script>
