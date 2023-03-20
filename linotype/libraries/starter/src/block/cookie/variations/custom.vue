<template>
  <transition leave-active-class="duration-500">
    <div v-show="showBanner" class="flex fixed inset-5 z-[10000]" >
      
      <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="ease-in duration-200" leave-from-class="opacity-100 translate-y-0 sm:scale-100" leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"> 
        <div v-show="showBanner" class="relative z-[1] flex flex-col items-center space-y-8 w-auto h-auto sm:max-w-[800px] max-h-[100%] bg-white m-auto overflow-y-auto p-[20px]">
          <div class="flex flex-col items-center space-y-6 pt-[20px] sm:pt-[40px]">
            <div class="text-[25px] sm:text-[30px] text-[#143759] text-center font-black leading-[100%]" v-html="props.settings.banner_title"></div>
            <div class="text-[16px] sm:text-[18px] text-[#143759] font-light leading-[120%] px-5 text-center prose" v-html="props.settings.banner_description"></div>
          </div>
          <div class="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-3 sm:space-y-0">
            <div class="text-[14px] text-[#19A7E0] border border-[#19A7E0] rounded-full px-5 py-2 whitespace-nowrap cursor-pointer" @click="handlePreferences">{{ props.settings.preferences_button_label }}</div>
            <div class="text-[14px] text-white bg-[#19A7E0] rounded-full px-5 py-2 whitespace-nowrap cursor-pointer" @click="handleAcceptAll">{{ props.settings.accept_all_button_label }}</div>
          </div>
          <div class="text-[14px] text-[#19A7E0] underline whitespace-nowrap cursor-pointer" v-if="!hasOnlyRequiredCookies" @click="handleDeclineAll">{{props.settings.decline_all_button_label}}</div>
        </div>
      </transition>

      <transition leave-active-class="duration-200">
        <div v-show="showModal" class="absolute z-[3] inset-0 flex items-center">
          
          <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="ease-in duration-200" leave-from-class="opacity-100 translate-y-0 sm:scale-100" leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div v-show="showModal" class="relative z-[3] w-auto h-auto sm:max-w-[800px] max-h-[100%] bg-white m-auto overflow-y-auto p-[20px]">
              
              <div class="flex flex-col items-center space-y-6 pt-[20px] sm:pt-[40px]">
                <div class="text-[25px] sm:text-[30px] text-[#143759] text-center font-black leading-[100%]" v-html="props.settings.modal_title"></div>
                <div class="text-[16px] sm:text-[18px] text-[#143759] font-light leading-[120%] px-5 text-center" v-html="props.settings.modal_description"></div>
                <div class="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-3 sm:space-y-0">
                  <div class="text-[14px] text-[#19A7E0] border border-[#19A7E0] rounded-full px-5 py-2 whitespace-nowrap cursor-pointer" @click="handleSave">{{ props.settings.save_preferences_button_label }}</div>
                  <div class="text-[14px] text-white bg-[#19A7E0] rounded-full px-5 py-2 whitespace-nowrap cursor-pointer" @click="handleAcceptAll">{{ props.settings.accept_all_button_label }}</div>
                </div> 
              </div>
                
                <div class="py-5" v-if="props.settings.cookies">
                  <div v-for="(cookie, index) in props.settings.cookies" :key="index" class="flex flex-col py-3 space-y-2 border-t border-gray-300">
                      <div class="text-[16px] sm:text-[18px] text-[#143759] text-left font-black leading-[120%] px-5">{{ cookie.title }}</div>
                      <div class="text-[12px] sm:text-[14px] text-[#143759] text-left font-light leading-[120%] px-5" v-html="cookie.description"></div>
                      <div v-for="item in cookie.items" :key="item.value" class="flex justify-between items-center hover:bg-black/5 rounded-full p-2">
                        <div class="text-[16px] sm:text-[18px] text-[#143759] text-left font-light leading-[120%] px-5">{{ item.label }}</div>
                        <CookieToggle :is-required="item.required" :value="item.value" @update:checkbox="handleToggleUpdate"></CookieToggle>
                      </div>
                  </div>
                </div>
        
              <!-- <div class="flex flex-col items-center space-y-6 pt-[20px] sm:pt-[40px]">
                  <div class="text-[14px] text-[#19A7E0] underline whitespace-nowrap cursor-pointer" v-if="!hasOnlyRequiredCookies" @click="handleDeclineAll">{{props.settings.decline_all_button_label}}</div>
              </div> -->

              <div class="absolute top-6 right-6 p-0 m-0 cursor-pointer h-[12px] w-[12px]" @click="handleModalClose">
                <svg class="" viewPort="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <line stroke="#E8A44D" stroke-width="2" x1="1" x2="11" y1="11" y2="1"/>
                  <line stroke="#E8A44D" stroke-width="2" x1="1" x2="11" y1="1" y2="11"/>
                </svg>
              </div>
            
            </div>
          </transition>

          <transition enter-active-class="ease-out duration-500" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="ease-in duration-500" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-show="showModal" class="fixed z-[0] inset-0 transform transition-all">
              <div class="absolute inset-0 bg-[#232F7F] opacity-90"/>
            </div>
          </transition>

        </div>
      </transition>

      <transition enter-active-class="ease-out duration-500" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="ease-in duration-500" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-show="showBanner" class="fixed z-[0] inset-0 transform transition-all">
          <div class="absolute inset-0 bg-[#232F7F] opacity-90"/>
        </div>
      </transition>

    </div>
  </transition>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue-demi';

import CookieToggle from './../includes/toggle.vue';

const emit = defineEmits([
  'on-accept-all',
  'on-decline-all',
  'on-save-preferences',
]);

const props = defineProps({
  settings: Object,
});

const showBanner = ref(false);
const showModal = ref(false);
const checkedValues = ref([]);

const requiredCookies = computed(() => {
  return props.settings.cookies
    .map((cookie) =>
      cookie.items.map((item) => (item.required ? item.value : null))
    )
    .flat()
    .filter((n) => n) || [];
});

const allCookies = computed(() => {
  return props.settings.cookies
    .map((cookie) => cookie.items.map((item) => item.value))
    .flat()
    .filter((n) => n);
});

const hasOnlyRequiredCookies = computed(() => {
  return requiredCookies.value.length === props.settings.cookies.length;
});

onMounted(() => {
  if (localStorage.getItem('cookies')) {
    showBanner.value = false;
  } else {
    showBanner.value = true;
  }
});

const handleAcceptAll = () => {
  showBanner.value = false;
  showModal.value = false;

  localStorage.setItem('cookies', JSON.stringify(allCookies.value));

  emit('on-accept-all', allCookies.value);
};

const handleDeclineAll = () => {
  showBanner.value = false;
  showModal.value = false;

  localStorage.setItem('cookies', JSON.stringify(requiredCookies.value));

  emit('on-decline-all', requiredCookies.value);
};

const handleSave = () => {
  showBanner.value = false;
  showModal.value = false;

  localStorage.setItem('cookies', JSON.stringify(checkedValues.value));

  emit('on-save-preferences', checkedValues.value);
};

const handlePreferences = () => {
  showModal.value = true;
};

const handleModalClose = () => {
  showModal.value = false;
};

const handleToggleUpdate = ({ value, isEnabled }) => {
  isEnabled
    ? checkedValues.value.push(value)
    : checkedValues.value.splice(checkedValues.value.indexOf(value), 1);
};
</script>
