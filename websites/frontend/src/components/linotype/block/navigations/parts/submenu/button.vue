<template>
  <NuxtLink
    class="flex text-sm font-semibold leading-6 bg-primary hover:bg-primary-400 text-white hover:text-white-600 px-4 py-3"
    active-class="!text-white cursor-default"
    :to="props.menu.url"
    v-html="props.menu.title"
  />
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
  }
}>()

</script>
