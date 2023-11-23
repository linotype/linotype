<template>
  <div class="p-10 divide-y divide-gray-200 overflow-hidden bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
    <div v-for="(category, categoryIdx) in categories.data" :key="category.title" class="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary">
      <div>
        <span
          :class="[category.iconBackground, category.iconForeground, 'inline-flex rounded-lg p-3 ring-4 ring-white']"
          :style="[
            category.color && `background-color:${category.color}`
          ]"
        >
        </span>
      </div>
      <div class="mt-8">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          <NuxtLink
            :to="`${categoryBasePath}${category.slug}`"
            class="focus:outline-none"
          >
            <!-- Extend touch target to entire panel -->
            <span class="absolute inset-0" aria-hidden="true" />
            {{ category.title }}
          </NuxtLink>
        </h3>
        <div class="mt-2 text-sm text-gray-500" v-html="category.description" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  categoryBasePath: string
}>()

const config = useRuntimeConfig()

const { data: categories } = await useFetch(`${config.public.linotype.backend_url}/items/categories`, { 
  key: 'linotype.block.categories', 
  params: { 
    fields: ['*'] 
  } 
})

</script>
