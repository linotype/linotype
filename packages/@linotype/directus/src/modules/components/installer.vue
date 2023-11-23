<template>
  <v-notice v-if="!isActive" type="danger" :icon="true"> 
    <p>Require linotype install - <router-link to="/linotype/install">go to installer</router-link></p>
  </v-notice>
</template>

<script lang="ts" setup>
import useLinotype from './../composables/useLinotype'
const { isActive } = useLinotype()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'InstallerComponent',
})
</script>

<style scoped>

</style>