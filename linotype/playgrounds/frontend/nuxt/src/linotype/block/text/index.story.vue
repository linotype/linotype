<template>
  <Story 
    title="Text"
    group="blocks"
    :layout="{ type: 'single', iframe: true }"
    autoPropsDisabled
  >
  
    <Variant title="default">
      <Index
        blockId="1"
        blockType="text"
        :blockData="{
          reference: reference,
          title: title,
          content: content
        }"
      />
    </Variant>

    <template #controls>
      <HstText title="Reference" v-model="reference" />
      <HstText title="Title" v-model="title" />
      <HstText title="Content" v-model="content" />
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

const reference = ref('Story for "text" block')
const title = ref('This is the title')
const content = ref('This is the content')

</script>