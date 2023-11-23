<template>
  <NuxtLink
    v-if="props.title && type == 'button'"
    :to="link"
    class="cursor-pointer bg-primary px-[2.1em] py-[0.6em] text-base font-semibold leading-7 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    {{ props.title }}
  </NuxtLink>

  <NuxtLink
    v-else-if="props.title && type == 'link'"
    :to="link"
    class="cursor-pointer border-2 px-[2em] py-[0.5em] text-base font-semibold leading-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  >
    {{ props.title }}
  </NuxtLink>

  <NuxtLink
    v-else-if="props.title && type == 'more'"
    :to="link"
    class="cursor-pointer px-[2.1em] py-[0.6em] text-base font-semibold leading-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  >
    {{ props.title }} <span aria-hidden="true">→</span>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title: string | null;
  link: string | undefined;
  target?: string;
  type?: string;
}>(), {
  type: 'button',
})

</script>
