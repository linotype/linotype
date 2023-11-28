<template>
  <Disclosure v-slot="{ open }" as="div" class="-mx-3">
    <DisclosureButton class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
      <span v-html="props.menu.title" />
      <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
    </DisclosureButton>

    <DisclosurePanel class="mt-2 space-y-2">
      <DisclosureButton v-for="children in props.menu.children" :key="children.title" as="div">
        <NuxtLink
          class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          active-class="!text-primary"
          :to="children.url"
          v-html="children.title"
        />
      </DisclosureButton>
    </DisclosurePanel>
  </Disclosure>
  <!-- <Popover class="relative">

    <PopoverButton class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
      <span>{{props.menu.title}}</span>
      <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
    </PopoverButton>

    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
      <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
        <div class="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
          <NuxtLink v-for="children in props.menu.children" :key="children.title" :to="children.url" class="block p-2 hover:text-primary" active-class="text-primary">
            <span v-html="children.title"/>
          </NuxtLink>
        </div>
      </PopoverPanel>
    </transition>

  </Popover> -->
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
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
