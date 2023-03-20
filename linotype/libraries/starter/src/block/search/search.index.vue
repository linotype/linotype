<template>
  <div :id="'block-' + props.blockId" class="block" :class="props.blockType" :data-ref="props.blockData.reference">
    <LinotypeDump :title="'Block ' + props.blockType" :data="props.blockData"/>
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 sm:py-18 py-12 lg:py-20 mt-20">
      <div v-if="query && results.length">
        <h2 class="text-[35px] xl:text-[45px] text-[#19A7E0] pb-[50px]">{{props.blockData.title_success}} "{{query}}"</h2>
        <div v-for="result in results" :key="result.id" class="text-[20px] xl:text-[25px] text-[#143759] pb-[30px] hover:underline">
          <NuxtLink :to="result.slug" aria-label="search">{{result.title}}</NuxtLink>
        </div>
      </div>
      <div v-else >
        <h2 class="text-[35px] xl:text-[45px] text-[#19A7E0] pb-[50px]" v-if="query">{{props.blockData.title_error}} "{{query}}"</h2>
        <p class="text-[20px] xl:text-[25px] text-[#143759] pb-[30px]">{{props.blockData.message_error}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue-demi"
import { useRoute } from "vue-router"


const props = defineProps<{
  blockId: number;
  blockType: string;
  blockData: {
    reference: string;
    title_success: string;
    title_error: string;
    message_error: string;
  };
}>();

const config = useRuntimeConfig();

const { domain } = useDomain();

const { directus } = useLinotype()

const route = useRoute()

const query: ref<string> = ref( route.query.s )

const results = ref([])

try {
  results.value = (await directus.items('pages').readByQuery({ 
    search: query.value,
    fields: ['*.*.*.*.*.*.*'],
    filter: {
      status: 'published',
      target: { ["domain_" + config.LINOTYPE_ENV] : { _eq: domain.value || 'localhost' }}
    },
  }))?.data
} catch(error){
  console.log(error)
}

</script>
