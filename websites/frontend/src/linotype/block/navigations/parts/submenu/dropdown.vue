<template>
  <Popover class="relative" >
    <PopoverButton class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-white hover:text-primary">
      <span>{{ props.menu.title }}</span>
      <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
    </PopoverButton>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <PopoverPanel v-slot="{ close }" class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
        <div class="w-screen max-w-sm flex-auto rounded-3xl bg-white p-4 text-sm leading-6 shadow-lg ring-1 ring-white/5">
          <div v-for="children in props.menu.children" :key="children.title" class="relative rounded-lg p-4 hover:bg-gray-50">
            <NuxtLink :to="children.url" @click="close()" class="font-semibold text-secondary hover:text-primary">
              <span v-html="children.title" />
              <span class="absolute inset-0" />
            </NuxtLink>
            <div class="mt-1 text-gray-600" v-html="children.description" />
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
