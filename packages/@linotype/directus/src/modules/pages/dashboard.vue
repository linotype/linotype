<template>
  <private-view title="Dashboard">
    <template #headline>Linotype</template>
    <template #navigation><MenuComponent/></template>

    <div class="page">      
      <div class="grid">

        <InstallerComponent class="full"/>

        <v-divider class="full" large :inline-title="false">Current</v-divider>
  
        <div class="half">
          <div class="count">{{blocksStore.length}} Blocks</div>
        </div>
        <div class="half">
          <div class="count">{{allowedBlocksIds.length}} Active Blocks</div>
        </div>

      </div>
    </div>

    <template #sidebar>
      <LogsComponent/>
    </template>

  </private-view>
</template>

<script lang="ts" setup>
import useLinotype from '../composables/useLinotype'
import useUtils from '../composables/useUtils'

import InstallerComponent from './../components/installer.vue'
import MenuComponent from '../components/menu.vue'
import LogsComponent from '../components/logs.vue'

const { init, isActive, blocksList, collectionsList } = useLinotype()
const { isLinotypeInstalled, linotypeStore, blocksStore, allowedBlocksIds, refresh } = useUtils()

init()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DashboardPage',
  components: {
    InstallerComponent,
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
.count {
  font-size: 30px;
}
</style>