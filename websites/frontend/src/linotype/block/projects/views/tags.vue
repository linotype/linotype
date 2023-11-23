<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-4xl">
        <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <li v-for="tag in tags.data" :key="tag.name" class="col-span-1 flex rounded-md shadow-sm">
            <NuxtLink
              class="flex w-full"
              :to="`${tagBasePath}${tag.slug}`"
            >
              <div
                class="flex w-2 h-10 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                :style="[
                  tag.color && `background-color:${tag.color}`
                ]"
              />
              <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                <div class="flex-1 truncate px-4 py-2 text-sm">
                  <div
                    class="font-medium text-gray-900 hover:text-gray-600"
                  >
                    #{{ tag.title }}
                  </div>
                  <!-- <p class="text-gray-500">{{ tag.members }} Members</p> -->
                </div>
                <!-- <div class="flex-shrink-0 pr-2">
                  <button type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <span class="sr-only">Open options</span>
                    <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div> -->
              </div>
            </NuxtLink>
          </li>
        </ul>

        <pre>{{ }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()

const props = defineProps<{
  tagBasePath: string
}>()

const { data: tags } = await useFetch(`${config.public.linotype.backend_url}/items/tags`, { key: 'linotype.block.tags', params: { fields: ['*'] } })

</script>
