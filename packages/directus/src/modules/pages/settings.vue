<template>
  <private-view title="Settings">
    <template #headline>Linotype</template>
    <template #navigation><MenuComponent/></template>

    <div class="page">      
      <div class="grid">

        <InstallerComponent class="full"/>

        <v-divider class="full" large :inline-title="false">Project</v-divider>

        <div class="full">
          <div class="field-label">
            Project path
          </div>
          <v-input
              v-model="projectPath"
              class="monospace"
              db-safe
              placeholder="./"
            />
        </div>

        <v-divider v-if="isActive" class="full" large :inline-title="false">Danger zone</v-divider>

        <div class="full" v-if="isActive">
          <v-button @click="updateLinotype()" :secondary="true">Update/ReInstall</v-button>
          <br/><br/>
          <v-button v-if="isActive" @click="uninstallLinotype()" :danger="true">Uninstall</v-button>
        </div>

      </div>


    </div>

    <template #sidebar>
      <LogsComponent/>
    </template>

  </private-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useLinotype from '../composables/useLinotype'

import InstallerComponent from '../components/installer.vue'
import MenuComponent from '../components/menu.vue'
import LogsComponent from '../components/logs.vue'

const { init, isActive, installLinotype, updateLinotype, uninstallLinotype } = useLinotype()

const projectPath = ref('./')

init()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SettingsPage',
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