<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <LinotypeHelper :title="`BLOCK: ${props.blockType} / ID: ${props.blockId} / REF: ${props.blockData.reference}`" :data="props.blockData">
      <LinotypeBlockProjectsExample v-bind="props"/>
    </LinotypeHelper>
    <!-- start coding here -->
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    view: string,
    featured_projects: {}[]
    filter_by: {}[]
    limit: number
    project_base_path: string
    category_base_path: string
    tag_base_path: string
    selected_project_id: string
  }
}>()

</script>
