<template>
  <private-view title="Install">
    <template #headline>Linotype</template>
    <template #navigation><MenuComponent/></template>

    <div class="page" v-if="!isActive">      
      <div class="grid">
        <div class="full">
          <v-button @click="installLinotype()">Run install</v-button>
        </div>
        <div class="full">
          <LogsComponent/>
        </div>
      </div>
    </div>
    <div class="page" v-else>      
      <div class="grid">
        <div class="full">
          <h2 class="title type-label">Linotype collections installed</h2>
        </div>
        <div class="full">
          <v-button to="/linotype">Back to dashboard</v-button>
        </div>
      </div>
    </div>

    <template #sidebar></template>

  </private-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useLinotype from '../composables/useLinotype'

import MenuComponent from '../components/menu.vue'
import LogsComponent from '../components/logs.vue'

const { init, isActive, installLinotype } = useLinotype()

init()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'InstallPage',
  components: {
    MenuComponent,
    LogsComponent
  }
})
</script>

<style scoped>
.grid {
  padding: var(--content-padding);
    padding-bottom: var(--content-padding-bottom);
  display: grid;
  grid-template-columns: [start] minmax(0,1fr) [half] minmax(0,1fr) [full];
  gap: var(--form-vertical-gap) var(--form-horizontal-gap);
}
.grid .half, .grid .half-left, .grid .half-space {
  grid-column: start/half;
}
.grid .full {
  grid-column: start/full;
}
.field-label {
  position: relative;
  display: flex;
  margin-bottom: 8px;
  cursor: default;
}
</style>