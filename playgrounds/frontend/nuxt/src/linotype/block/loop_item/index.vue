<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <div v-html="item"/>
  </div>
</template>

<script lang="ts" setup>
import { useFetch, useRuntimeConfig } from 'nuxt/app';
import { ref } from 'vue';
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';

const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    collection: string
    template: string
  }
}>()

const route = useRoute()

const slug = computed( () => route.params.slug )

const config = useRuntimeConfig()

const item = ref<string>('')

if ( props.blockData.collection && slug?.value ) {
  
  const { data } = await useFetch(`${config.public.linotype.backend_url}/items/${props.blockData.collection}?filter[slug][_eq]=/${slug.value}`)
  
  if ( data?.value?.data[0] ) {

    const ids = Object.keys(data?.value?.data[0])
    let html: string = props.blockData.template
    for ( const id of ids ) {
      html = findReplaceString(html, id, data?.value?.data[0][id] )
    }
    item.value = html
  
  }

} else {
  item.value = 'no item'
}

function findReplaceString(string, find, replace) 
{
  if ((/[a-zA-Z\_]+/g).test(string)) {
    return string.replace(new RegExp('\{\{(?:\\s+)?(' + find + ')(?:\\s+)?\}\}'), replace);
  } else {
    return string
  }
}

</script>