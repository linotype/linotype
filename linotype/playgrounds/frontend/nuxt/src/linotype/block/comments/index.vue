<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" bg-gray-100 m-5 p-5>
    <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
      <div v-if="props.blockData.view == 'all'">
        <LinotypeBlockCommentsViewsStats/>
        <LinotypeBlockCommentsViewsList/>
        <LinotypeBlockCommentsViewsForm/>
      </div>
      <div v-else>
        <LinotypeBlockCommentsViewsStats v-if="props.blockData.view == 'stats'"/>
        <LinotypeBlockCommentsViewsList v-else-if="props.blockData.view == 'list'"/>
        <LinotypeBlockCommentsViewsForm v-else-if="props.blockData.view == 'form'"/>
      </div>
  </div>
</template>

<script lang="ts" setup>
import useComments from './scripts/useComments'
// import LoadingComponent from './parts/loading'
// import ErrorComponent from './parts/error'

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

// const ViewList = defineAsyncComponent({
//   loader: () =>  import('/views/list.vue'),
//   loadingComponent: LoadingComponent,
//   delay: 2000,
//   errorComponent: ErrorComponent,
//   timeout: 3000
// })

// const ViewForm = defineAsyncComponent({
//   loader: () =>  import('./views/form.vue'),
//   loadingComponent: LoadingComponent,
//   delay: 2000,
//   errorComponent: ErrorComponent,
//   timeout: 3000
// })

// const ViewStats = defineAsyncComponent({
//   loader: () =>  import('./views/stats.vue'),
//   loadingComponent: LoadingComponent,
//   delay: 2000,
//   errorComponent: ErrorComponent,
//   timeout: 3000
// })

loadComments(props)


</script>