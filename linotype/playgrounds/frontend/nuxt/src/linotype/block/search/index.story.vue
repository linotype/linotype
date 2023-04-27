<template>
  <Story 
    title="Search"
    group="blocks"
    :layout="{ type: 'single', iframe: true }"
    autoPropsDisabled
  >
  
    <Variant title="default">
      <Index
        blockId="1"
        blockType="search"
        :blockData="{
          reference: reference,
          collection: collection,
        }"
      />
    </Variant>

    <template #controls>
      <HstText title="Reference" v-model="reference" />
      <HstText title="Collection" v-model="collection" />
    </template>

  </Story>
</template>

<docs lang="md">
  # Welcome

  This is a block book using linotype.

  ---

  Learn more about Histoire [here](https://histoire.dev/).
</docs>

<script lang="ts" setup>
import { reactive } from 'vue'
import Index from './index.vue'

const reference = ref('Story for "search" block')
const collection = ref('search')

</script>