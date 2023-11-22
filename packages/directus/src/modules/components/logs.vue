<template>
  <v-list v-if="logs">
    <v-list-item v-for="(log, index) in logs" :key="index">
      {{ log }}
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import useLinotype from './../composables/useLinotype'
const { isActive, logs } = useLinotype()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LogsComponent',
})
</script>

<style scoped>

</style>