<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <div flex flex-row gap-2 py-2>
      <div v-for="menu, index in data" :key="index">
        <NuxtLink :to="menu?.slug">{{menu?.title}}</NuxtLink>
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

const route = useRoute()
const { scheme, domain } = useDomain()
const config = useRuntimeConfig()

const input = ref(route.query.query)

const { data } = await useFetch(`${config.public.linotype.backend_url}/linotype/menu`,{
  method: 'POST',
  body: {
    env: config.public.linotype.env,
    scheme: scheme,
    domain: domain
  }
})

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
