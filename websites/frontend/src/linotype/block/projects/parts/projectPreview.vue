<template>
  <project class="relative isolate flex flex-col gap-8 lg:flex-row">
    <div class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
      <LinotypeImage
        v-if="project?.image"
        class="absolute inset-0 -z-10 h-full w-full"
        class-image="absolute inset-0 -z-10 h-full w-full object-cover"
        :sources="[
          {
            source: project?.image,
            size: [345, 200],
            fit: 'cover',
            quality: 90,
            format: ['webp','jpeg']
          }
        ]"
      />
    </div>
    <div>
      <div class="flex items-center gap-x-4 text-xs">
        <time :datetime="project?.date_created" class="text-gray-500">{{ new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(project?.date_created)) }}</time>
        <div class="flex flex-row gap-3">
          <NuxtLink
            v-if="project?.category"
            :to="`${categoryBasePath}${project?.category?.slug}`"
            class="relative z-10 rounded-full bg-primary px-3 py-1.5 font-medium text-secondary hover:bg-primary-400 cursor-pointer"
            :class="[
              project?.category?.slug === `/${route.params.slug}` && '!bg-secondary !text-primary'
            ]"
          >
            {{ project.category?.title }}
          </NuxtLink>
          <NuxtLink
            v-for="tag in project?.tags"
            :key="tag.tags_id.id"
            :to="`${tagBasePath}${tag.tags_id?.slug}`"
            class="inline-flex relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200 cursor-pointer"
            :class="[
              tag.tags_id?.slug === `/${route.params.slug}` && '!bg-secondary !text-primary'
            ]"
          >
            #{{ tag.tags_id.title }}
          </NuxtLink>
        </div>
      </div>
      <div class="group max-w-xl">
        
        <h3 class="pt-3">
          <NuxtLink :to="`${projectBasePath}${project?.slug || ''}`" class="text-2xl font-semibold leading-6 text-secondary group-hover:text-secondary">
            <span class="absolute inset-0" />
            {{ project?.title }}
          </NuxtLink>
        </h3>
        <div class="block">
          <span class="inline [&>*]:inline-flex mt-5 text-sm text-gray-600" v-html="project?.description.replace(/<\/?p>/g, '')" /> 
          <NuxtLink to="/" class="inline pl-3 text-sm text-primary">Lire plus</NuxtLink>
        </div>
      </div>
      <!-- <div class="mt-6 flex border-t border-gray-900/5 pt-6">
        <div class="relative flex items-center gap-x-4">
          <img :src="project.author.image" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
          <div class="text-sm leading-6">
            <p class="font-semibold text-gray-900">
              <a :href="project.author.slug">
                <span class="absolute inset-0" />
                {{ project.author.name }}
              </a>
            </p>
            <p class="text-gray-600">{{ project.author.role }}</p>
          </div>
        </div>
      </div> -->
    </div>
  </project>
</template>

<script lang="ts" setup>
const props = defineProps<{
  project: object
  projectBasePath: string
  categoryBasePath: string
  tagBasePath: string
}>()

const route = useRoute()

</script>
