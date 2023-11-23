<template>
  <div class="overflow-hidden bg-white">
    <div class="relative mx-auto max-w-7xl py-16 px-6 lg:px-8">
      <div class="absolute top-0 bottom-0 left-3/4 hidden w-screen bg-gray-50 lg:block" />
      <div class="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
        <div>
          <h2 v-html="props.blockData?.surtitle"  v-if="props.blockData?.surtitle" class="text-lg font-semibold text-indigo-600"/>
          <h3 v-html="props.blockData?.title"  v-if="props.blockData?.title" class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl"/>
        </div>
      </div>
      <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="relative lg:col-start-2 lg:row-start-1">
          <svg class="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
            <defs>
              <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
          </svg>
          <div class="relative mx-auto max-w-prose text-base lg:max-w-none">
            <figure>
              <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
                <LinotypeImage 
                  v-if="props.blockData.image"
                  classImage="rounded-lg object-cover object-center shadow-lg" 
                  :sources="[
                    {
                      source: props.blockData.image,
                      size: [1000, 1000],
                      fit: 'cover',
                      quality: 90,
                      format: ['webp','jpeg']
                    },
                    {
                      source: props.blockData.image,
                      breakpoint: 800,
                      size: [800, 800],
                      fit: 'cover',
                      quality: 90,
                      format: ['webp','jpeg']
                    },
                  ]"
                />
                <img v-else class="rounded-lg object-cover object-center shadow-lg" src="https://images.unsplash.com/photo-1546913199-55e06682967e?ixlib=rb-1.2.1&auto=format&fit=crop&crop=focalpoint&fp-x=.735&fp-y=.55&w=1184&h=1376&q=80" alt="Whitney leaning against a railing on a downtown street" width="1184" height="1376" />
              </div>
              <figcaption class="mt-3 flex text-sm text-gray-500">
                <CameraIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                <span class="ml-2"><b>{{props.blockData.image?.title}}</b> - {{props.blockData.image?.description}}</span>
              </figcaption>
            </figure>
          </div>
        </div>
        <div class="mt-8 lg:mt-0">
          <!-- <div class="mx-auto max-w-prose text-base lg:max-w-none">
            <p class="text-lg text-gray-500">Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi.</p>
          </div> -->
          <div v-html="props.blockData?.description"  v-if="props.blockData?.description" class="prose prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none"/>
          <div v-else class="prose prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
            <p>Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu viverra donec ut volutpat donec laoreet quam urna.</p>
            <p>Bibendum eu nulla feugiat justo, elit adipiscing. Ut tristique sit nisi lorem pulvinar. Urna, laoreet fusce nibh leo. Dictum et et et sit. Faucibus sed non gravida lectus dignissim imperdiet a.</p>
            <p>Dictum magnis risus phasellus vitae quam morbi. Quis lorem lorem arcu, metus, egestas netus cursus. In.</p>
            <ul role="list">
              <li>Quis elit egestas venenatis mattis dignissim.</li>
              <li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
              <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
            </ul>
            <p>Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies. Vulputate aliquet velit faucibus semper. Pellentesque in venenatis vestibulum consectetur nibh id. In id ut tempus egestas. Enim sit aliquam nec, a. Morbi enim fermentum lacus in. Viverra.</p>
            <h3>How we helped</h3>
            <p>Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam. Montes, magna cursus nulla feugiat dignissim id lobortis amet. Laoreet sem est phasellus eu proin massa, lectus. Diam rutrum posuere donec ultricies non morbi. Mi a platea auctor mi.</p>
            <p>Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi.</p>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CameraIcon } from '@heroicons/vue/20/solid' //build problem

const props = defineProps<{
  blockId: number;
  blockType: string;
  blockData: {
    reference: string;
    title: string;
    description: string;
    image: {}
  };
}>();

</script>