<template>
  <private-view title="Blocks">
    <template #headline>Linotype</template>
    <template #navigation><MenuComponent/></template>

    <div class="page">      
      <div class="grid">
        
        <InstallerComponent class="full"/>

        <div v-if="isActive" class="full">
          <v-button @click="installAllBlock()" :primary="true">Install All</v-button> <v-button @click="uninstallAllBlock()" :danger="true">Uninstall All</v-button>
        </div>

        <v-divider v-if="isActive" class="full" large :inline-title="false">Blocks</v-divider>

        <div v-if="isActive" class="full">
          <v-list>
            <v-list-item v-for="block in blocksList" :key="block">
              <v-list-item-icon>
                <v-icon :name="block.config?.snapshot?.collections[0]?.meta?.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-text-overflow :text="block.config?.id" />
                <v-list-actions>
                  <v-button _v-if="block.active" @click="exportBlock(block.config)" :warning="true">Export</v-button>
                  <v-button _v-if="!block.active" @click="importBlock(block.config)" :primary="true">Import</v-button>
                  <v-button _v-else @click="deleteBlock(block.config)" :danger="true">Delete</v-button>
                </v-list-actions>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

      </div>

    </div>

    <template #sidebar>
      <LogsComponent/>
    </template>

  </private-view>
</template>

<script lang="ts" setup>
import useLinotype from './../composables/useLinotype'
import useBlock from '../composables/useBlock'
import useExport from '../composables/useExport'
import useImport from '../composables/useImport'

import InstallerComponent from '../components/installer.vue'
import MenuComponent from '../components/menu.vue'
import LogsComponent from '../components/logs.vue'

const { init, isActive, installAllBlock, uninstallAllBlock, installBlock, uninstallBlock, blocksList } = useLinotype()

const { deleteBlock } = useBlock()
const { exportBlock } = useExport()
const { importBlock } = useImport()

init()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BlocksPage',
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
</style>