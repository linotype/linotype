<template>
  <picture 
    v-if="data" 
    class="linotype-image block"
  >
    <source
      v-for="(source, index) in data.sources"
      :key="index"
      :type="source.type"
      :srcset="source.srcset"
      :media="source.media"
    >
    <img
      class="linotype-image-img block w-full h-full"
      :class="blockProps.classImage"
      :width="data.img.width"
      :height="data.img.height"
      :type="data.img.type"
      :alt="data.img.alt"
      :src="data.img.src"
      :srcset="data.img.srcset"
    >
  </picture>
</template>

<script lang="ts" setup>
import useLinotype from '../composables/useLinotype'

/*

TODO: 
- def marg top % selon calcule du ratio image reel pour eviter le layout shift
- test reel image with et height dans img atribute pour voir si mieux en Google page speed meme si pas reel


Exemple:

<LinotypeImage :sources="[
  {
    source: directus_file_object,
    size: [2000, 0],
    fit: 'cover',
    quality: 90,
    format: ['webp','jpeg']
  },
  {
    source: directus_file_object,
    breakpoint: 800,
    size: [800, 0],
    fit: 'cover',
    quality: 90,
    format: ['webp','jpeg']
  },
]"/>

*/

const { config } = useLinotype();

const blockProps = defineProps({
  sources: {
    type: Object,
    default: () => { return {} },
    require: true,
  },
  classImage: {
    type: String,
    default: '',
    require: false,
  },
});

const srcGenerator = (item, format = 'jpg', fit = 'contain', quality = 90, xN = 1 ) => {
  return encodeURI( `${config.public.linotype.backend_url}/assets/${item.source.id}?format=${format}&quality=${quality}&transforms=[["resize",{"fit":"${fit}","background":"rgba(0,0,0,0)","width": ${item?.size[0]*xN || null},"height": ${item?.size[1]*xN || null}}]]` )
}

const srcsetGenerator = (item, format = 'jpg', fit = 'contain', quality = 90) => {
  return `${srcGenerator(item, format, fit, quality, 1 )} 1x, ${srcGenerator(item, format, fit, quality, 1.8 )} 2x`
}

const sourcesGenerator = (sources) => {
  const data = []
  for (let i = 0; i < sources.length; i++) {
    for (let j = 0; j < sources[i].format.length; j++) {
      if ( sources[i]?.source?.id ) {
        data.push({
          type: `image/${sources[i].format[j]}${sourceFull.value?.format[0] == 'svg' ? '+xml' : '' }`,
          srcset: srcsetGenerator(sources[i], sources[i].format[j], sources[i].fit, sources[i]?.quality),
          media: sources[i]?.breakpoint ? `(max-width: ${sources[i]?.breakpoint}px)` : ``,
        })
      }
    }
  }
  return data
}

const sourceFull = ref(  blockProps.sources[0] )

const data = computed(() => {
  if ( sourceFull.value?.source?.id ) {
    return {
      img: {
        src: srcGenerator(sourceFull.value, sourceFull.value?.format[0], sourceFull.value?.fit, sourceFull.value?.quality ),
        srcset: srcsetGenerator(sourceFull.value, sourceFull.value?.format[0], sourceFull.value?.fit, sourceFull.value?.quality ),
        alt: sourceFull.value?.description || 'image',
        type: `image/${sourceFull.value?.format[0]}${sourceFull.value?.format[0] == 'svg' ? '+xml' : '' }`,
        width: sourceFull.value?.size[0] ? sourceFull.value?.size[0] : null,
        height: sourceFull.value?.size[1] ? sourceFull.value?.size[1] : null,
        ratio: ( sourceFull.value.height / sourceFull.value.width ) * 100
      },
      sources: sourcesGenerator([...blockProps?.sources as any[]].reverse())
    }
  }
})

</script>