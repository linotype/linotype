<template>
  <div 
    :id="`${props.blockType}-${props.blockId}`" class="relative z-1 pb-8" :data-reference="props.blockData?.reference"
    :class="[
      `block--${props.blockType}`,
      props.blockData.theme == 'dark'
        ? 'bg-black [&>*]:text-white'
        : 'bg-white [&>*]:text-black'
    ]"
  >
      <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <div v-if="props.blockData.surtitle" v-html="props.blockData.surtitle" />
        <h1 v-if="props.blockData.title" class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" v-html="props.blockData.title" />
        <div v-if="props.blockData.description" class="mt-10 max-w-full" v-html="props.blockData.description" />
        <div class="flex flex-row w-full justify-center items-center gap-16">
          <NuxtLink v-for="person in props.blockData.people" :key="person.name" :to="person.link" target="_blank" rel="nofollow" class="flex flex-col items-center cursor-pointer">
            <LinotypeImage
              v-if="person.avatar"
              class="relative mb-2"
              :sources="[
                {
                  source: { id: person.avatar },
                  size: [
                    person.avatar_height || 50, 
                    person.avatar_height || 50
                  ],
                  fit: 'cover',
                  quality: 90,
                  format: ['webp','jpeg']
                },
              ]"
            />
            <div>{{ person.name }}</div>
            <div>{{ person.infos }}</div>
          </NuxtLink>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blockId: number;
  blockType: string;
  blockData: {
    reference: string
    theme: string
    surtitle: string
    title: string
    description: string
    people: {
      avatar: string
      avatar_height: number
      name: string
      link: string
    }[]
  }
}>()

</script>
