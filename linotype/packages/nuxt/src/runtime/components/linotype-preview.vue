<template>
  <div id="linotype-preview">
    <component
      :is="loadBlock(item.type)"
      v-for="item in preview"
      :key="item.id"
      :data-key="route.params.slug + '--' + item.id"
      :block-id="item.id"
      :block-type="item.type"
      :block-data="
        item.data 
          ? typeof item.data !== 'string'
            ? JSON.parse(JSON.stringify(item.data))
            : JSON.parse(item.data)
          : []
      "
    />
  </div>
</template>

<script lang="ts" setup>
import useLinotype from "./../composables/useLinotype"

const { loadPreview, loadBlock, preview } = useLinotype()
const route = useRoute()

const props = defineProps({
  type: {
    type: String,
    default: 'block',
    require: false,
  },
})

await loadPreview(
  props.type,
  route.query.collection,
  +route.query.key,
  route.query.editing == 'true' ? true : false
)
</script>

<style>
#linotype-preview.loading {
  background: #fff;
}
#linotype-preview .linotype-dump {
  /* display: none; */
}
</style>
