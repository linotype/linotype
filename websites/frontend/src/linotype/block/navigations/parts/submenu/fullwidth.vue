<template>
  <Popover>
    <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white ">
      <span v-html="props.menu?.title" />
      <ChevronDownIcon class="h-5 w-5 flex-none text-white" aria-hidden="true" />
    </PopoverButton>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <PopoverPanel class="absolute inset-x-0 top-0 -z-10 bg-secondary pt-14 shadow-lg ring-1 ring-gray-900/5">
        <div class="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
          <div v-for="children in props.menu?.children" :key="children.title" class="group relative rounded-lg p-6 text-sm leading-6 hover:bg-gray-50">
            <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
              <component :is="children.icon" class="h-6 w-6 text-gray-600 group-hover:text-primary" aria-hidden="true" />
            </div>
            <NuxtLink :to="children.url" class="mt-6 block font-semibold text-gray-900">
              <span v-html="children.title" />
              <span class="absolute inset-0" />
            </NuxtLink>
            <div class="mt-1 text-gray-600" v-html="children?.description" />
          </div>
        </div>
        <div class="bg-gray-50">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="grid grid-cols-3 divide-x divide-gray-900/5 border-x border-gray-900/5">
              <!-- <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                  <component :is="item.icon" class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  {{ item.name }}
                </a> -->
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script lang="ts" setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  menu: {
    title: string
    url: string
    page: any
    style: string
    children: {
      title: string
      url: string
      icon: string
      description: string
    }[]
  }
}>()

</script>
