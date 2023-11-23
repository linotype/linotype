<template>
  <footer :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" class="bg-secondary text-white relative z-[1000] !max-sm:h-[300px] mt-[100px]" :data-reference="props.blockData.reference">
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8">
          <NuxtLink to="/" class="">
            <span class="sr-only">{{ props.blockData.title }}</span>
            <LinotypeImage
              v-if="props.blockData.logo"
              class="w-full"
              class-image="relative h-full w-full object-contain"
              :style="{
                maxWidth: `${props.blockData.logo_size}px`,
                maxHeight: `${props.blockData.logo_size}px`
              }"
              :sources="[
                {
                  source: props.blockData.logo,
                  size: [props.blockData.logo_size, 0],
                  fit: 'contain',
                  quality: 90,
                  format: ['png', 'webp']
                }
              ]"
            />
          </NuxtLink>

          <div class="flex space-x-6">
            <div class="relative z-1 pb-8">
                <div class="flex flex-row w-full justify-center items-center gap-3">
                  <div v-html="props.blockData.socials_title" />
                  <NuxtLink v-for="social in props.blockData.socials_links" :key="social.name" :to="social.link" target="_blank" rel="nofollow" class="flex flex-col items-center cursor-pointer hover:opacity-70">
                    <LinotypeImage
                      v-if="social.icon"
                      class="relative mb-2"
                      :style="{
                        width: 'auto',
                        height: `${social.icon_height || 30}px`
                      }"
                      :sources="[
                        {
                          source: { id: social.icon },
                          size: [800, 500],
                          fit: 'cover',
                          quality: 90,
                          format: ['webp','jpeg']
                        },
                      ]"
                    />
                    <!-- {{ social.name }} -->
                  </NuxtLink>
                </div>
            </div>
          </div>

        </div>
        <div class="flex flex-col md:flex-row justify-around gap-12 mt-16 xl:col-span-2 xl:mt-0">
          <div v-for="item in props.blockData.links">
            
            <NuxtLink
              v-if="item.url"
              class="text-[36px] font-semibold leading-6 text-white hover:text-primary"
              active-class="text-primary cursor-default"
              :to="item.url"
            >
              {{ item.title }}
            </NuxtLink>
            <div v-else class="text-[36px] font-semibold leading-6 text-white cursor-default">
              {{ item.title }}
            </div>
            <div v-html="item.description"/>
            <ul role="list" class="mt-6 space-y-2">
              <li v-for="link, index in item.list" :key="index">
                <NuxtLink
                  v-if="link.title && link.url"
                  class="text-sm leading-6 text-white hover:text-primary"
                  active-class="text-primary cursor-default"
                  :to="link.url"
                >
                  {{ link.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-16 border-t border-gray-300/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col-reverse md:flex-row gap-10 justify-between">
        <div class="flex">
          <div class="text-xs leading-5 text-gray-500" v-html="props.blockData.infos"/>
        </div>
        <div class="flex flex-col md:flex-row gap-2 md:gap-5">
          <template v-for="link, index in props.blockData.sublinks" :key="index">
            <NuxtLink
              v-if="link.title && link.url"
              class="text-sm leading-6 text-gray-500 hover:text-primary"
              active-class="text-primary cursor-default"
              :to="link.url"
            >
              {{ link.title }}
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </footer>
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
