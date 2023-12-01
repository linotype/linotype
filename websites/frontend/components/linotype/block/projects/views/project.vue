<template>
  <div class="bg-white py-24 sm:py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-4xl">
        <LinotypeBlockProjectsPartsProjectFull
          v-if="project?.data[0]"
          :project="project?.data[0]"
          :project-base-path="projectBasePath"
          :category-base-path="categoryBasePath"
          :tag-base-path="tagBasePath"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const route = useRoute()

const props = defineProps<{
  projectBasePath: string
  categoryBasePath: string
  tagBasePath: string
}>()

const selected_project_id = inject('selected_project_id')

const { data: project } = selected_project_id?.key 
  ? await useFetch(`${config.public.linotype.backend_url}/items/projects?filter[id][_eq]=${selected_project_id?.key}`, { key: 'linotype.block.project', params: { fields: ['*.*.*'] } })
  : await useFetch(`${config.public.linotype.backend_url}/items/projects?filter[slug][_eq]=/${route.params.slug}`, { key: 'linotype.block.project', params: { fields: ['*.*.*'] } })

</script>
