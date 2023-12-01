<template>
  <div 
    :id="`${props.blockType}-${props.blockId}`" 
    ref="rootRef" 
    class="relative z-[99999] !max-sm:h-[300px]"
    :data-reference="props.blockData.reference"
  >
    <div 
      ref="headerRef" 
      class="relative z-1 top-0 left-0 right-0"
      :class="[
        props.blockData.position === 'fixed' && '!fixed top-0 left-0 right-0'
      ]"
    >
      <header class="relative isolate z-10 bg-transparent">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex">
            <NuxtLink to="/" class="">
              <span class="sr-only">{{ props.blockData.title }}</span>
              <LinotypeBlockNavigationsPartsLogo
                :title="props.blockData.title"
                :logo="props.blockData.logo"
                :logo_size="props.blockData.logo_size"
              />
            </NuxtLink>
          </div>
          <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
              <span class="sr-only">Open main menu</span>
              <Icon name="icon-park-outline:hamburger-button" size="30px" color="black" />
            </button>
          </div>
          <PopoverGroup class="hidden lg:flex lg:gap-x-12">
            <div v-for="(item, index) in props.blockData.menu" :key="index">
              <component :is="`linotype-block-navigations-parts-submenu-${item.style ?? 'small'}`" :menu="item" />
            </div>
          </PopoverGroup>
          <PopoverGroup class="hidden lg:flex lg:gap-x-12">
            <div v-for="(item, index) in props.blockData.menu_right" :key="index">
              <component :is="`linotype-block-navigations-parts-submenu-${item.style ?? 'small'}`" :menu="item" />
            </div>
          </PopoverGroup>
        </nav>

        <ClientOnly>
          <Dialog as="div" class="lg:hidden" :open="mobileMenuOpen" @close="mobileMenuOpen = false">
            <div class="fixed inset-0 z-10">
              <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-transparent px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                  <LinotypeBlockNavigationsPartsLogo 
                    :title="props.blockData.title"
                    :logo="props.blockData.logo"
                    :logo_size="props.blockData.logo_size"
                  />
                  <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                    <span class="sr-only">Close menu</span>
                    <Icon name="icon-park-outline:close" size="30px" color="black" />
                  </button>
                </div>
                <div class="mt-6 flow-root">
                  <div class="-my-6 divide-y divide-gray-500/10">
                    <div class="space-y-2 py-6">
                      <div v-for="(item, index) in props.blockData.menu" :key="index">
                        <NuxtLink
                          v-if="!item?.children?.length"
                          class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                          active-class="text-primary cursor-default"
                          :to="item?.url"
                          v-html="item?.title"
                        />
                        <component :is="`linotype-block-navigations-parts-submenu-mobile`" v-else :menu="item" />
                      </div>
                    </div>
                    <div class="py-6">
                      <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-50">Log in</a>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </ClientOnly>
      </header>
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Dialog, DialogPanel } from '@headlessui/vue'
const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    title: string
    logo: object
    logo_size: number
    position: string
    menu: {
      title: string
      url: string
      page: any
      style: string
      children: {
        title: string
        url: string
        icon: string
        description: string
      }[]
    }[]
  }
}>()

const route = useRoute()

const input = ref(route.query.query)

const mobileMenuOpen = ref(false)

const isIndex = ref(false)
const rootRef = ref()
const headerRef = ref()
const isSticky = ref(false)
const isTop = ref(true)
const placeholder = ref('tracks')
// tracks users hashtags plists location
const mounted = ref(false)

let scrollTrigger: any

const init = async () => {
  gsap.registerPlugin(ScrollTrigger)

  mounted.value = true

  // gsap.set(rootRef.value, {
  //   height: headerRef.value.clientHeight
  // })
  
  // initScroll()

  //force relative for the example
  props.blockData.position = ''

}

const initScroll = async () => {
  

  if (scrollTrigger) { scrollTrigger.scroll(0) }

  scrollTrigger = ScrollTrigger.create({
    start: 'top top',
    end: 99999,
    onUpdate: updateSticky
  })
  
}

const updateSticky = async () => {
  if (!scrollTrigger) { return }

  // if scroll top
  if (scrollTrigger.scroll() === 0) {
    isSticky.value = false
    isTop.value = true

    gsap.set(headerRef.value, {
      yPercent: 0,
      position: 'relative'
    })
  }

  // after header height
  else if (scrollTrigger.scroll() > headerRef.value.clientHeight) {
    isSticky.value = true
    isTop.value = false

    // if scroll up
    if (scrollTrigger.direction === -1) {
      gsap.to(headerRef.value, {
        yPercent: 0,
        position: 'fixed',
        duration: 0.6
      })
    }

    // else scroll down
    else {
      gsap.to(headerRef.value, {
        yPercent: -150,
        duration: 0.6,
        onComplete: () => {
          gsap.to(headerRef.value, {
            position: 'fixed'
          })
        }
      })
    }
  }

  // before header height
  else {
    isSticky.value = false
    isTop.value = false

    // if scroll up
    if (scrollTrigger.direction === -1) {

      // do nothing

    }

    // else scroll down
    else {
      gsap.set(headerRef.value, {
        yPercent: 0,
        position: 'relative'
      })
    }
  }
}

const onRouteChange = async () => {
  if (String(route.name).split('__')[0] === 'index') {
    isIndex.value = true
  } else {
    isIndex.value = false
  }

  await initScroll()
}

const search = () => {
  navigateTo({
    path: '/search',
    force: true,
    query: {
      query: input.value
    }
  })
}

watchEffect(() => {
  input.value = route.query.query
  mobileMenuOpen.value = false
})

watch(route, onRouteChange)

onMounted(init)

</script>
