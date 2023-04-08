// <template>
//   <div :id="`${props.blockType}-${props.blockId}`" :class="props.blockType" bg-gray-100 m-5 p-5>
//     <div font-bold>[ Linotype block "{{props.blockType}}" / ref: {{props.blockData.reference}} ]</div>
//     <h1>{{props.blockData.title}}</h1>
//     <div>{{props.blockData.content}}</div>
//   </div>
// </template>

// <script lang="ts" setup>
// const props = defineProps<{
//   blockId: number
//   blockType: string
//   blockData: {
//     reference: string
//     title: string
//     content: string
//   }
// }>()
// </script>