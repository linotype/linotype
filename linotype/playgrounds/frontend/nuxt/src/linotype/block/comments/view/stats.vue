<template>
  <div p-2 pt-5>
    {{comments?.length || 0}} comments
  </div>
</template>

<script lang="ts" setup>
import useComments from './../scripts/useComments'

const { comments } = useComments()

</script>