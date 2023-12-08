<template>
  <div class="bg-white pb-24 sm:pb-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-4xl">
        <div v-if="props.featured?.length">
          <!-- <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured projects
          </h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">
            Our most interesting projects
          </p> -->
          <div class="mt-16 mb-28 space-y-20 lg:mt-20 lg:space-y-20">
            <LinotypeBlockProjectsPartsProjectPreview
              v-for="project in props.featured"
              :key="project?.id"
              :project="project?.projects_id"
              :project-base-path="props.projectBasePath"
              :category-base-path="props.categoryBasePath"
              :tag-base-path="props.tagBasePath"
            />
          </div>
        </div>
        <div v-if="projects?.data">
          <!-- <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest projects
          </h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">
            Our latest projects ordering by date
          </p> -->
          <div class="space-y-20 lg:space-y-20">
            <LinotypeBlockProjectsPartsProjectPreview
              v-for="project in projects?.data"
              :key="project.id"
              :project="project"
              :project-base-path="props.projectBasePath"
              :category-base-path="props.categoryBasePath"
              :tag-base-path="props.tagBasePath"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  featured?: {}[]
  filterBy?: {}[]
  projectBasePath?: string
  categoryBasePath: string
  tagBasePath: string
  limit: number
}>()

const config = useRuntimeConfig()

const filters: any = {}

const features: number[] = props.featured?.map(item => Number(item.projects_id.id)) || []
if ( features?.length ) {
  filters.id = { 
    _nin: features
  } 
}

const categories: number[] = props.filterBy?.filter((item) => item.collection == 'categories').map((item) => Number(item.item.id)) || []
if ( categories?.length ) {
  filters.categories = {
    categories_id: {
      _in: categories
    }
  }
}

const tags: number[] = props.filterBy?.filter((item) => item.collection == 'tags' ).map((item) => Number(item.item.id)) || []
if ( tags?.length ) {
  filters.tags = {
    tags_id: {
      _in: tags
    }
  }
}

const { data: projects } = await useFetch(`${config.public.linotype.backend_url}/items/projects`, {
  key: 'linotype.block.projects',
  params: {
    fields: ['*.*.*.*'],
    filter: filters,
    offset: 0,
    limit: props?.limit || 10
  }
})

</script>
