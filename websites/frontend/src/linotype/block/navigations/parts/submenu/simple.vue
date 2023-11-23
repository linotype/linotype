<template>
  <NuxtLink
    class="text-sm font-semibold leading-6 text-white hover:text-primary"
    active-class="!text-primary cursor-default"
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
