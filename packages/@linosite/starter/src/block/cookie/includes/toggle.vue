<template>
  <label
    :class="{ 'cursor-pointer': !isRequired, 'cursor-not-allowed': isRequired }"
    :for="'toggle_' + value"
    class="inline-flex relative items-center"
  >
    <input
      :id="'toggle_' + value"
      :checked="isEnabled"
      :disabled="isRequired"
      :value="value"
      class="sr-only peer"
      type="checkbox"
      @input="onChange($event.target.value)"
    />

    <div
      class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
    ></div>
  </label>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue-demi';

const emit = defineEmits(['update:checkbox']);

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
});

const isEnabled = ref(false);

onMounted(() => {
  isEnabled.value = true;
  emit('update:checkbox', { value: props.value, isEnabled: true });
});

const onChange = (value) => {
  isEnabled.value = !isEnabled.value;

  emit('update:checkbox', { value: value, isEnabled: isEnabled.value });
};
</script>
