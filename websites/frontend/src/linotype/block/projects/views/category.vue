<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 class="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
          {{ route.params.slug }}
        </h2>
        <!-- <p class="mt-2 text-lg leading-8 text-gray-600">
          Our latest projects in {{ route.params.slug }} category
        </p> -->
        <div v-if="projects?.data?.length" class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
          <LinotypeBlockProjectsPartsProjectPreview
            v-for="project in projects?.data"
            :key="project.id"
            :project="project"
            :project-base-path="projectBasePath"
            :category-base-path="categoryBasePath"
            :tag-base-path="tagBasePath"
          />
        </div>
        <div v-else class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
          [no projects]
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const route = useRoute()

const props = defineProps<{
  featured?: {}[] | boolean
  projectBasePath?: string
  categoryBasePath: string
  tagBasePath: string
}>()

const { data: projects } = await useFetch(`${config.public.linotype.backend_url}/items/projects`, {
  key: 'linotype.block.projects',
  params: {
    fields: ['*.*.*'],
    filter: {
      category: {
        slug: {
          _eq: `/${route.params.slug}`
        }
      }
    }
  }
})

</script>
