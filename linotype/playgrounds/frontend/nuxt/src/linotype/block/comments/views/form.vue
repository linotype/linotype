<template>
  <div flex flex-col gap-2 bg-gray-100 p-2 max-w-120>
    <textarea v-model="input" max-w-120></textarea>
    <div>
      <div bg-gray-600 text-white px-3 py-1 cursor-pointer @click="postComment()">{{props.blockData.form_button_send_label}}</div>
    </div>
    <div v-if="error?.target == 'form'">
      {{ error?.message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import useComments from './../scripts/useComments'

const { props, input, postComment, comments, error } = useComments()

</script>