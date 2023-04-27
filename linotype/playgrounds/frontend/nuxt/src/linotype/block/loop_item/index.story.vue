<template>
  <Story 
    title="Loop Item"
    group="blocks"
    :layout="{ type: 'single', iframe: true }"
    autoPropsDisabled
  >
  
    <Variant title="default">
      <Index
        blockId="1"
        blockType="loop_item"
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

const reference = ref('Story for "loop_item" block')
const collection = ref('loop_item')

</script>