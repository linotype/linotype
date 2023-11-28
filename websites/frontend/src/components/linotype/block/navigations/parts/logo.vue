<template>
  <NuxtLink to="/" class="">
    <span class="sr-only">{{ props.title }}</span>
    <LinotypeImage
      v-if="props.logo"
      class="w-full"
      class-image="relative h-full w-full object-contain"
      :style="{
        maxWidth: `${props.logo_size}px`,
        maxHeight: `${props.logo_size}px`
      }"
      :sources="[
        {
          source: props.logo,
          size: [props.logo_size, 0],
          fit: 'contain',
          quality: 90,
          format: ['png', 'webp']
        }
      ]"
    />
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title: string
    logo: object
    logo_size: number
}>()

</script>
