<template>
  <Story 
    title="Loop"
    group="blocks"
    :layout="{ type: 'single', iframe: true }"
    autoPropsDisabled
  >
  
    <Variant title="default">
      <Index
        blockId="1"
        blockType="loop"
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

const reference = ref('Story for "loop" block')
const collection = ref('loop')

</script>