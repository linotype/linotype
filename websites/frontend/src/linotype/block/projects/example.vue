<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <component 
      :is="`linotype-block-projects-views-${blockData.view}`"
      :id="`${props.blockType}-${props.blockId}-${blockData.view}`" 
      :class="`block--${props.blockType}-views-${blockData.view}`"
      :featured="blockData.featured_projects"
      :filterBy="blockData.filter_by"
      :limit="blockData.limit"
      :project-base-path="blockData.project_base_path"
      :category-base-path="blockData.category_base_path"
      :tag-base-path="blockData.tag_base_path"
    />
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

provide('selected_project_id', props.blockData.selected_project_id)

</script>
