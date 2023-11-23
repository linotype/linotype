<template>
  <private-view title="Blocks">
    <template #headline>Linotype</template>
    <template #navigation><MenuComponent/></template>

    <div class="page">      
      <div class="grid">
        
        <InstallerComponent class="full"/>

        <!-- <div v-if="isActive" class="full">
          <v-button @click="installAllBlock()" :primary="true">Install All</v-button> <v-button @click="uninstallAllBlock()" :danger="true">Uninstall All</v-button>
        </div> -->

        <!-- <v-divider class="full" large :inline-title="false">Blocks</v-divider> -->

        <div v-if="isLinotypeInstalled" class="full">
          <v-list>
            <v-list-item v-for="block in blocksStore" :key="block.id">
              <v-list-item-icon>
                <v-icon :name="block?.snapshot?.collections[0]?.meta?.icon || 'check_box_outline_blank'" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-text-overflow :text="block?.id" />
                
                <div class="actions">
                  <!-- <v-button v-if="block.active && !block.updated" @click="block.showDiff ? block.showDiff = false : block.showDiff = true" :secondary="true">Diff</v-button> -->
                  <v-button v-if="block.active && !block.updated" @click="exportBlock(block.id)" small secondary>Export</v-button> 
                  <v-button v-if="block.active && !block.updated" @click="importBlock(block.id)" small secondary>Import</v-button> 
                  <v-button v-if="block.active" @click="deleteBlock(block.id)" small danger>Delete</v-button> 
                  <v-button v-if="!block.active" @click="importBlock(block.id)" small secondary>Import</v-button>
                </div>
                <!-- <div v-if="block.showDiff">
                  <CodeDiff
                  :filename="`${block.id}/config.yaml`"
                  language="yaml"
                  context="5000"
                  :old-string="YAML.stringify(block.snapshot)"
                  :new-string="YAML.stringify(block.snapshotDiff)"
                  output-format="line-by-line"
                  maxHeight="600px"
                  />
                </div> -->
                <!-- <div>
                  <h3>collections</h3>
                  <ul>
                    <li v-for="item in block?.snapshot?.collections" :key="item.collection">
                      {{item.collection}}
                    </li>
                  </ul>
                  <h3>fields</h3>
                  <ul>
                    <li v-for="item in block?.snapshot?.fields" :key="item.field">
                      {{item.collection}}: {{item.field}}
                    </li>
                  </ul>
                  <h3>relations</h3>
                  <ul>
                    <li v-for="item in block?.snapshot?.relations" :key="item.related_collection">
                      {{item.collection}}: {{item.related_collection}}
                    </li>
                  </ul>
                </div> -->
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

      </div>

    </div>

    <template #sidebar>
      <!-- <LogsComponent/> -->
    </template>

  </private-view>
</template>

<script lang="ts" setup>
// import useLinotype from './../composables/useLinotype'
import useBlock from '../composables/useBlock'
import useExport from '../composables/useExport'
import useImport from '../composables/useImport'
import useUtils from '../composables/useUtils'

import InstallerComponent from '../components/installer.vue'
import MenuComponent from '../components/menu.vue'
// import LogsComponent from '../components/logs.vue'

const { isLinotypeInstalled, isBlockInstalled, blocksStore } = useUtils()
const { deleteBlock } = useBlock()
const { exportBlock } = useExport()
const { importBlock } = useImport()

</script>

<script lang="ts">
import { defineComponent } from 'vue'
import YAML from 'yaml'
// import { CodeDiff } from 'v-code-diff'

export default defineComponent({
  name: 'BlocksPage',
  components: {
    InstallerComponent,
    MenuComponent,
    // CodeDiff,
    // LogsComponent
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

.actions {
	display: flex;
	gap: 8px;
}
</style>