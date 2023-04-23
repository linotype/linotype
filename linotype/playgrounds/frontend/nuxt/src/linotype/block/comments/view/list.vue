<template>
  <div p-2>
    <div flex flex-col gap-2 py-2>
      <div v-for="(comment, index) in comments" :key="index" bg-gray-200 p-2>
        {{comment.content}}
      </div>
      <div v-if="error?.target == 'list'">
        {{error?.message}}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useComments from './../scripts/useComments'

const { comments, error } = useComments()

</script>