<template>
  <div 
    v-if="svg" 
    class="linotype-svg block" 
    v-html="cleanSVG(svg)" 
  />
</template>

<script lang="ts" setup>
import { defineProps } from '#app'
import useLinotype from '../composables/useLinotype'

const { config, ref } = useLinotype()

const blockProps = defineProps({
  source: { 
    id: String 
  }
})

const svg = ref('')

if ( blockProps.source?.id ) {
  svg.value = await fetch(`${config.public.linotype.backend_url}/assets/${blockProps.source.id}`).then(response => response.text()).then(svg => svg)
}

const cleanSVG = (svgString) => {
  svgString = svgString.replace(/ xmlns(:\w+)?="[^"]*"/g, '')
  svgString = svgString.replace(/ xml:space="[^"]*"/g, '')
  svgString = svgString.replace(/ xmlns:xlink="[^"]*"/g, '')
  svgString = svgString.replace(/<script[\s\S]*?<\/script>/gi, '')
  return svgString
}

</script>