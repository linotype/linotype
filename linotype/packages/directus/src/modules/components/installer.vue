<template>
  <v-notice v-if="!isActive" type="danger" :icon="true"> 
    <p>Require linotype install - <router-link to="/linotype/install">go to installer</router-link></p>
  </v-notice>
</template>

<script lang="ts" setup>
import useLinotype from './../composables/useLinotype'

const { isActive } = useLinotype()

// const props = withDefaults(
// 	defineProps<{
// 		isActive?: boolean | null;
// 	}>(),
// 	{
// 		isActive: true,
// 	}
// );

</script>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'InstallerComponent',
})
</script>

<style scoped>

</style>