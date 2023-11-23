<template>
  <div :id="'block-' + props.blockId" class="block" :class="props.blockType" :data-ref="props.blockData.reference" ref="anchorRef" :style="navHeight ? 'height:' + navHeight + 'px;':'height:auto;'">
    <div :class="isSticky ? 'fixed' : 'relative'" class="z-20 top-0 left-0 right-0" :style="isSticky ? 'top:' + globalOffset + 'px;' : ''">
      <div class="font-circular overflow-auto bg-white" :class="{ 'border-b border-t border-gray-200': isSticky }">
        <div class="mx-auto max-w-7xl sm:px-6">
            <div class="relative" :class="{ 'border-b border-gray-200': !isSticky }">
              <nav class="flex space-x-8 overflow-x-auto overflow-y-hidden px-6 xl:px-0" aria-label="Tabs" ref="anchorNavRef">
                <button
                  v-for="tab in props.blockData.sections"
                  :key="tab.ref"
                  class="whitespace-nowrap border-b-4 py-4 px-1 font-medium"
                  :class="[
                    current == tab.ref
                      ? 'border-secondary text-secondary font-medium'
                      : 'border-transparent font-medium text-[#143759]/50 hover:border-[#143759]/50 hover:text-[#143759]/50',
                  ]"
                  :data-anchor-nav-ref="tab.ref"
                  @click.prevent="scrollToBlockId(tab.ref)"
                  v-html="tab.title"
                  :aria-label="tab.title"
                  href="/"
                >
                </button>
              </nav>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onBeforeUnmount, watch, computed } from 'vue-demi';
import { useElementVisibility, useEventListener } from '@vueuse/core'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  blockId: number;
  blockType: string;
  blockData: {
    reference: string;
    sections: {
      title: string;
      ref: string;
    }[];
  };
}>();

const anchorRef = ref<HTMLElement|any>('anchorRef')
const anchorNavRef = ref<HTMLElement|any>('anchorNavRef')
const current = ref(props.blockData?.sections?.length ? props.blockData?.sections[0]?.ref : '');
const isSticky = ref(false)

const globalOffset = ref(72)

const navHeight = computed(()=> anchorNavRef.value?.clientHeight )

const setSticky = () => {

  if ( !(process as any).server && window ) {

    const offSet = anchorRef.value.offsetTop;

    if (window.pageYOffset > offSet - globalOffset.value - 1) {
      isSticky.value = true;
    } else {
      isSticky.value = false;
    }

  }

}

const setCurrentAnchor = () => {

  if ( !(process as any).server && window ) {

    const document = window.document
    const elements = document.querySelectorAll('[data-ref]')

    if ( elements ) {
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (!el) {
          current.value = ''
        } else {
          const rect = el.getBoundingClientRect()
          if ( rect.top <= ( navHeight.value + globalOffset.value + 1)
              && rect.left <= (window.innerWidth || document.documentElement.clientWidth)
              && rect.bottom >= 0
              && rect.right >= 0 
            ) {
            current.value = el.getAttribute('data-ref') as string
            
          }
        }
      }
    }

  }

}

const scrollToBlockId =  (ref: string) => {
  current.value = ref;
  window?.scrollTo({
    behavior: 'smooth',
    top:
    (document as any)?.querySelector('[data-ref="' + ref + '"]').getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      navHeight.value -
      globalOffset.value
      
  })
};

const scrollToAnchorTab = () => {
  if ( anchorNavRef.value?.querySelector('[data-anchor-nav-ref="' + current.value + '"]') ) {
    anchorNavRef.value?.scrollTo({
      behavior: 'smooth',
      left: anchorNavRef.value?.querySelector('[data-anchor-nav-ref="' + current.value + '"]').offsetLeft - 30
    })
  } else {
    anchorNavRef.value?.scrollTo({
      behavior: 'smooth',
      left: 0
    })
  }

};

const debouncedScroll = useDebounceFn(() => {
  scrollToAnchorTab()
})

if ( !(process as any).server && window ) {
  useEventListener(window, 'scroll', () => { 
    setSticky()
    setCurrentAnchor()
    debouncedScroll()
  } )
}

</script>
