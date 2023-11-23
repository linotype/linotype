<script lang="ts" setup>
import { computed } from 'vue-demi';

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
    validator: (v: string) =>
      ['primary', 'secondary', 'danger', 'danger-o', 'success'].includes(v),
  },
  paddingClasses: {
    type: [String, Array],
    default: () => ['py-2.5', 'px-5'],
  },
});

const colorClasses = computed(() => {
  switch (props.color) {
    case 'secondary':
      return 'border text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700';
    case 'danger':
      return 'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900';
    case 'danger-o':
      return 'text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900';
    case 'success':
      return 'text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800';
    case 'primary':
      return 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
    default:
      return 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
  }
});
</script>

<template>
  <button
    :class="[colorClasses, paddingClasses]"
    class="text-sm font-medium focus:outline-none rounded-lg focus:z-10 focus:ring-4 transition duration-150 ease-in-out"
    type="button"
  >
    <slot />
  </button>
</template>
