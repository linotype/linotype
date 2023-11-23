<template>
  <v-list
    class="content-navigation"
    tabindex="-1"
    :mandatory="false"
    :dense="dense"
    nav
  >
  
    <v-list-item clickable to="/linotype/dashboard">
      <v-list-item-icon>
        <v-icon name="dashboard" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-text-overflow text="Dashboard" />
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item clickable to="/linotype/blocks">
      <v-list-item-icon>
        <v-icon name="view_day" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-text-overflow text="Blocks" />
      </v-list-item-content>
    </v-list-item>

    <v-list-item clickable to="/linotype/settings">
      <v-list-item-icon>
        <v-icon name="settings" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-text-overflow text="Settings" />
      </v-list-item-content>
    </v-list-item>
  
  </v-list>
</template>

<script lang="ts" setup>

</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MenuComponent',
})
</script>

<style scoped>

</style>