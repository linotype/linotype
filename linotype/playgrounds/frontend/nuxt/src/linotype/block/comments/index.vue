<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="props.blockType" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
    <div v-if="props.blockData.view == 'all'">
      <BlockCommentsViewStats/>
      <BlockCommentsViewList/>
      <BlockCommentsViewForm/>
    </div>
    <div v-else>
      <BlockCommentsViewList v-if="props.blockData.view == 'list'"/>
      <BlockCommentsViewForm v-else-if="props.blockData.view == 'form'"/>
      <BlockCommentsViewStats v-else-if="props.blockData.view == 'stats'"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useComments from './composables/useComments'
 
const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    collection: string
    view: string
  }
}>()

const { loadComments, error, comments } = useComments()

// const ViewList = defineAsyncComponent(() =>
//   import('./view/list.vue')
// )
// const ViewForm = defineAsyncComponent(() =>
//   import('./view/form.vue')
// )
// const ViewStats = defineAsyncComponent(() =>
//   import('./view/stats.vue')
// )

loadComments(props)


</script>