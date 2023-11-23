<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block--${props.blockType}`" class="bg-white pt-16 lg:py-24" :data-reference="props.blockData.reference">
    <div class="bg-primary pb-16 lg:relative lg:z-10 lg:pb-0">
      <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
        <div class="mt-12 lg:col-span-2 lg:m-0 lg:pl-8">
          <div class="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0 lg:py-20">
            <div>
              <svg class="h-12 w-12 text-white opacity-25" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <div class="mt-6 text-2xl font-medium text-white" v-html="props.blockData.quote" />
            </div>
            <div class="mt-6">
              <p class="text-base font-medium text-white">
                {{props.blockData.name}}
              </p>
              <p class="text-base font-medium text-primary-100">
                {{props.blockData.infos}}
              </p>
            </div>
          </div>
        </div>
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
    quote: string
    name: string
    infos: string
  }
}>()

</script>
