<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" :data-reference="props.blockData.reference">
    <LinotypeHelper :title="`BLOCK: ${props.blockType} / ID: ${props.blockId} / REF: ${props.blockData.reference}`" :data="props.blockData">
      <!-- <LinotypeBlockFootersExample v-bind="props"/> -->
    </LinotypeHelper>
    
    <UFooter>
      <template #left>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          Copyright © 2016-{{ new Date().getFullYear() }} Nuxt - <NuxtLink class="hover:underline" to="https://github.com/nuxt/nuxt/blob/main/LICENSE" target="_blank">
            MIT License
          </NuxtLink>
        </p>
      </template>

      <template #right>
        <UButton to="https://x.com/nuxt_js" target="_blank" icon="i-heroicons-x" color="gray" variant="ghost" />
        <UButton to="https://discord.com/invite/ps2h6QT" target="_blank" icon="i-heroicons-discord" color="gray" variant="ghost" />
        <UButton to="https://github.com/nuxt/nuxt" target="_blank" icon="i-heroicons-github" color="gray" variant="ghost" />
      </template>
    </UFooter>
    
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    title: string
    logo: object
    logo_size: number
    socials_title: string
    socials_links: {
      icon: string
      icon_height: number
      name: string
      link: string
    }[]
    links: {
      title: string
      description: string
      url: string
      list: {
        title: string
        url: string
      }[]
    }[]
    infos: string
    sublinks: {
      title: string
      url: string
    }[]
  }
}>()

</script>
