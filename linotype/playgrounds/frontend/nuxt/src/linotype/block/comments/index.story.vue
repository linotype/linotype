<template>
  <Story 
    title="Comments"
    group="blocks"
    :layout="{ type: 'single', iframe: true }"
    autoPropsDisabled
  >
  
    <Variant title="all" :init-state="{blockId: 1}">
      <Index
        blockId="1"
        blockType="comments"
        :blockData="{
          reference: reference,
          collection: collection,
          view: 'all',
          form_button_send_label: form_button_send_label
        }"
      />
    </Variant>
    
    <Variant title="Stats">
      <Index
        blockId="1"
        blockType="comments"
        :blockData="{
          reference: reference,
          collection: collection,
          view: 'stats',
          form_button_send_label: form_button_send_label
        }"
      />
    </Variant>
    
    <Variant title="List">
      <Index
        blockId="1"
        blockType="comments"
        :blockData="{
          reference: reference,
          collection: collection,
          view: 'list',
          form_button_send_label: form_button_send_label
        }"
      />
    </Variant>

    <Variant title="Form" >
      <Index
        blockId="1"
        blockType="comments"
        :blockData="{
          reference: reference,
          collection: collection,
          view: 'form',
          form_button_send_label: form_button_send_label
        }"
      />
    </Variant>

    <template #controls>
      <HstText title="Reference" v-model="reference" />
      <HstText title="Collection" v-model="collection" />
      <HstText title="Send Button" v-model="form_button_send_label" />
    </template>

  </Story>
</template>

<docs lang="md">
  # Welcome

  This is a demo book using Vue 3.

  ---

  Learn more about Histoire [here](https://histoire.dev/).
</docs>

<script lang="ts" setup>
import { reactive } from 'vue'
import Index from './index.vue'

const reference = ref('Story for "comments" block')
const collection = ref('comments')
const form_button_send_label = ref('Send')

</script>