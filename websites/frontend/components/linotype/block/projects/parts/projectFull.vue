<template>
  <div class="relative isolate flex flex-col gap-8">
    123
    <!-- <div class="flex flex-col gap-3 justify-center items-center">
      <time :datetime="project?.date_created" class="text-primary text-xs">{{ new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(project?.date_created)) }}</time>
      <h1 class="mb-3 text-6xl text-center font-semibold leading-6xl text-secondary group-hover:text-gray-600">{{ project?.title }}</h1>
      <div class="flex flex-row gap-3">
        <NuxtLink v-if="project?.category" :to="`${categoryBasePath}${project?.category?.slug}`" class="relative z-10 rounded-full bg-primary px-3 py-1.5 font-medium text-secondary hover:bg-primary-400 cursor-pointer">
          {{ project.category?.title }}
        </NuxtLink>
        <NuxtLink
          v-for="tag in project?.tags"
          :key="tag.tags_id.id"
          :to="`${tagBasePath}${tag.tags_id?.slug}`"
          class="inline-flex relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200 cursor-pointer"
        >
          #{{ tag.tags_id.title }}
        </NuxtLink>
      </div>
      <div class="max-w-xl mt-5 text-sm text-center leading-6 text-gray-600" v-html="project?.description || ''" />
    </div>
    <div class="relative aspect-[16/9]">
      <LinotypeImage
        v-if="project?.image"
        class="absolute inset-0 -z-10 h-full w-full"
        class-image="absolute inset-0 -z-10 h-full w-full object-cover"
        :sources="[
          {
            source: project?.image,
            size: [1800, 0],
            fit: 'cover',
            quality: 90,
            format: ['webp','jpeg']
          },
          {
            source: project?.image,
            breakpoint: 800,
            size: [345, 200],
            fit: 'cover',
            quality: 90,
            format: ['webp','jpeg']
          },
        ]"
      />
    </div>
    <div class="mt-5 text-md leading-6 text-gray-600" v-html="project?.content || ''" /> -->
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  project: object
  projectBasePath: string
  categoryBasePath: string
  tagBasePath: string
}>()

</script>
